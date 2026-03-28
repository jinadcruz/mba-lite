# Technical Architecture — MBA Lite

## Overview

MBA Lite uses a modular monorepo architecture optimized for content delivery, AI inference, and desktop-first web performance. This document covers system design, data flow, infrastructure, and key engineering decisions.

## System Architecture

```
                    ┌──────────────────────────────┐
                    │         CLIENTS               │
                    │                               │
                    │  Next.js Web App   Admin CMS  │
                    │  (SSR + SPA)      (Internal)  │
                    └───────────┬──────────────────┘
                                │
                                ▼
                    ┌──────────────────────────────┐
                    │      API GATEWAY              │
                    │  (Kong / AWS API Gateway)     │
                    │                               │
                    │  • Rate limiting               │
                    │  • JWT validation              │
                    │  • Request routing             │
                    │  • Response caching            │
                    └───────────┬──────────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                  ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
    │ User Service  │  │Content Svc   │  │  AI Tutor Svc    │
    │               │  │              │  │                  │
    │ • Auth/SSO    │  │ • Lessons    │  │ • Context build  │
    │ • Profile     │  │ • Cases      │  │ • LLM routing    │
    │ • Progress    │  │ • SRS engine │  │ • Response stream│
    │ • Streaks     │  │ • Search     │  │ • Conversation   │
    │ • Payments    │  │ • Library    │  │   history        │
    └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘
           │                 │                    │
           ▼                 ▼                    ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
    │  PostgreSQL   │  │ PostgreSQL   │  │  LLM Providers   │
    │  (Users, Sub) │  │ + S3 (CDN)   │  │                  │
    │               │  │              │  │ Claude (primary)  │
    │  Redis        │  │ Typesense    │  │ GPT-4o (fallback)│
    │  (Sessions)   │  │ (Search)     │  │                  │
    └──────────────┘  └──────────────┘  └──────────────────┘
```

## Service Breakdown

### User Service

Handles authentication, user profiles, progress tracking, streak management, and subscription/payment processing. Integrates with Stripe for web payments and Apple/Google for in-app purchases.

Key responsibilities: JWT token management, OAuth 2.0 flows (Google, Apple), progress aggregation, streak calculation (timezone-aware), certificate generation, and subscription lifecycle management.

### Content Service

Manages the lesson delivery pipeline, case study library, spaced repetition engine, and content search. Content is authored in the CMS, stored as structured JSON in PostgreSQL, and served via CloudFront CDN for static assets (images, diagrams).

Key responsibilities: lesson sequencing based on prerequisites and user progress, knowledge check scoring, SRS interval calculation (modified SM-2 algorithm), full-text search via Typesense, and content versioning for quarterly updates.

### AI Tutor Service

Orchestrates the AI tutoring experience. Builds context from the user's current lesson, progress history, and conversation history, then routes to the appropriate LLM provider.

Key responsibilities: context assembly (user + lesson + conversation), system prompt construction with pedagogical instructions, model tier routing (Haiku for simple Q&A, Sonnet for tutoring, Opus for capstones), response streaming, conversation persistence, and fallback handling.

## Data Architecture

### Primary Database: PostgreSQL

All transactional data lives in PostgreSQL. Key schema design decisions:

- **JSONB for flexible content** — Lesson content, knowledge check questions, and tutor conversation messages use JSONB columns for schema flexibility while retaining query capability.
- **Partitioned tables for scale** — `user_progress` and `review_cards` partitioned by `user_id` range for query performance at scale.
- **Soft deletes** — All user-facing data supports soft deletion for GDPR compliance.

### Caching: Redis

- Session tokens (15-minute TTL)
- Daily lesson pre-computation (computed overnight, cached per user)
- AI tutor prompt cache (lesson context, refreshed daily)
- Rate limiting counters

### Search: Typesense

- Case study library full-text search
- Faceted filtering (geography, industry, framework, difficulty)
- Typo-tolerant search with relevance ranking

### Content Storage: AWS S3 + CloudFront

- Lesson diagrams, images, and charts stored in S3
- Served via CloudFront CDN with edge caching
- Versioned content for rollback capability

## AI Tutor Architecture (Detail)

### Request Flow

```
User Message
     │
     ▼
┌─────────────────────────┐
│  1. Context Assembly     │
│                          │
│  • Current lesson text   │
│  • Module progress       │
│  • Last 10 quiz scores   │
│  • Last 20 messages      │
│  • User preferences      │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  2. Prompt Construction  │
│                          │
│  • System prompt         │
│  • Pedagogical rules     │
│  • Difficulty adaptation │
│  • Guardrails            │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  3. Model Routing        │
│                          │
│  Simple Q&A → Haiku      │
│  Tutoring   → Sonnet     │
│  Capstone   → Opus       │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  4. LLM API Call         │
│                          │
│  Primary: Claude API     │
│  Fallback: GPT-4o API   │
│  Streaming response      │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  5. Response Processing  │
│                          │
│  • Stream to client      │
│  • Persist to DB         │
│  • Log for analytics     │
└─────────────────────────┘
```

### Cost Optimization Strategy

- **Prompt caching** — Lesson context (system prompt + lesson content) is identical for all users on the same lesson on the same day. Cache the prompt prefix.
- **Tiered models** — Route simple questions to lower-cost models; reserve high-capability models for complex interactions.
- **Token budgets** — Enforce per-user daily token limits to prevent abuse; free tier gets 3 conversations/day.
- **Batch processing** — Review card generation and progress summaries run as overnight batch jobs using the batch API.

## Infrastructure

### Hosting

- **Compute**: AWS ECS Fargate (containerized services) or Vercel (Next.js web app)
- **Database**: AWS RDS PostgreSQL (Multi-AZ) or Supabase
- **Cache**: AWS ElastiCache (Redis)
- **CDN**: AWS CloudFront
- **Search**: Typesense Cloud or self-hosted on EC2
- **Monitoring**: Sentry (errors), Grafana + Prometheus (metrics), PostHog (product analytics)

### CI/CD Pipeline

```
Push to branch
     │
     ▼
GitHub Actions
     │
     ├── Lint (ESLint + Prettier)
     ├── Type Check (tsc)
     ├── Unit Tests (Jest)
     ├── Integration Tests (Supertest)
     ├── Build (Next.js + React Native)
     │
     ▼
Merge to main
     │
     ├── Deploy to staging (auto)
     ├── E2E tests (Playwright / Detox)
     │
     ▼
Release tag
     │
     ├── Deploy to production (manual approval)
     ├── App Store / Play Store submission (mobile)
     └── Notify stakeholders
```

### Environments

| Environment | Purpose | Database | LLM Provider |
|---|---|---|---|
| `local` | Developer machines | Local PostgreSQL | Claude API (dev key, rate-limited) |
| `staging` | Pre-production testing | RDS (staging instance) | Claude API (staging key) |
| `production` | Live users | RDS (Multi-AZ, production) | Claude API (production key) |

## Security

- All traffic encrypted via TLS 1.3
- Database encryption at rest (AES-256)
- Secrets managed via AWS Secrets Manager or Doppler
- OAuth 2.0 / OIDC for authentication; JWTs for session management
- Row-level security in PostgreSQL for multi-tenant data isolation
- AI tutor conversations encrypted at rest; user can request deletion
- SOC 2 Type II audit planned within 12 months of launch
- Annual third-party penetration testing

## Scaling Considerations

- **Horizontal scaling** — All services are stateless and can scale horizontally behind a load balancer.
- **Database read replicas** — Read-heavy workloads (lesson content, case study search) served from replicas.
- **AI tutor auto-scaling** — The AI tutor service scales independently based on request queue depth. Peak hours (7–9 AM, 12–1 PM, 8–10 PM in major timezones) pre-warm additional capacity.
- **CDN for content** — All static lesson content (text, images, diagrams) served from edge CDN. API only handles dynamic data (progress, tutor, SRS).

## Technology Decisions Log

| Decision | Choice | Rationale | Alternatives Considered |
|---|---|---|---|
| Frontend framework | Next.js 14+ (App Router) | SSR for SEO, React Server Components, Vercel deployment, industry standard | Remix, SvelteKit, Astro |
| Styling | Tailwind CSS + shadcn/ui | Utility-first for speed; shadcn gives accessible primitives | Styled Components, CSS Modules |
| API framework | Next.js API Routes (MVP) → Fastify (scale) | Start simple; extract if needed | Express, NestJS, FastAPI |
| Primary database | PostgreSQL | JSONB for flexible content, mature, well-tooled | MongoDB, DynamoDB |
| ORM | Prisma | Type-safe, great DX, migration management | Drizzle, Knex, TypeORM |
| AI provider (primary) | Anthropic Claude | Best reasoning for education, Socratic dialogue quality | OpenAI, Google Gemini |
| Search engine | Typesense | Fast, typo-tolerant, easy to deploy, open-source | Meilisearch, Algolia, Elasticsearch |
| Payments | Stripe | Industry standard web payments, subscriptions, customer portal | Paddle, Lemonsqueezy |
| Authentication | NextAuth.js (Auth.js) | Native Next.js integration, OAuth 2.0, session management | Clerk, Auth0, Supabase Auth |
| Analytics | PostHog | Privacy-respecting, self-hostable, full-featured | Mixpanel, Amplitude |
| Deployment | Vercel | Native Next.js host, preview deployments, edge functions, analytics | AWS Amplify, Railway, Render |
