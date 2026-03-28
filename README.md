# MBA Lite

**Your MBA, 15 Minutes a Day.**

MBA Lite is an AI-powered micro-learning web application that delivers the core MBA curriculum through daily bite-sized lessons, real-world case studies from across the globe, and an adaptive AI tutor — with a specialized track in AI management.

## Why MBA Lite?

A top MBA costs $150K–$230K and demands 2 years of your life. MBA Lite distills the core curriculum taught at Harvard Business School, Wharton, Stanford GSB, INSEAD, and London Business School into 10–15 minute daily lessons you can complete on your commute.

**Core MBA Curriculum** — 8 modules covering finance, strategy, marketing, operations, organizational behavior, economics, entrepreneurship, and leadership.

**AI Management Specialization** — 9 modules on AI strategy, AI product management, foundation model economics, responsible AI governance, and more.

**500+ Global Case Studies** — Real companies, real decisions, from six continents. Not just Silicon Valley.

**Adaptive AI Tutor** — A Socratic AI professor that adapts to your level and challenges your thinking.

## Quick Start

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x or pnpm >= 8.x
- PostgreSQL >= 15
- Redis >= 7.x (optional, for session caching)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/mba-lite.git
cd mba-lite

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database URL, API keys, etc.

# Set up the database
npx prisma migrate dev
npx prisma db seed

# Start the development server
npm run dev
# Open http://localhost:3000
```

### Environment Variables

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `ANTHROPIC_API_KEY` | Anthropic Claude API key (AI Tutor) | Yes |
| `OPENAI_API_KEY` | OpenAI API key (fallback tutor) | No |
| `STRIPE_SECRET_KEY` | Stripe secret key (payments) | Yes (prod) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes (prod) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes (prod) |
| `NEXTAUTH_SECRET` | NextAuth.js session secret | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `S3_BUCKET` | AWS S3 bucket for content assets | Yes |
| `REDIS_URL` | Redis connection string (optional) | No |

## Project Structure

```
mba-lite/
├── docs/                    # Product & technical documentation
│   ├── PRD.md              # Product Requirements Document
│   ├── ARCHITECTURE.md     # Technical architecture deep-dive
│   ├── API.md              # API documentation
│   ├── CONTENT_GUIDE.md    # Content creation style guide
│   ├── DEPLOYMENT.md       # Deployment guide
│   └── mockup.jsx          # Interactive UI mockup (React)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (auth)/         # Auth pages (login, register)
│   │   ├── (dashboard)/    # Dashboard layout group
│   │   │   ├── page.tsx           # Dashboard (Today)
│   │   │   ├── curriculum/        # Curriculum page
│   │   │   ├── library/           # Case study library
│   │   │   ├── tutor/             # AI Tutor page
│   │   │   └── profile/           # Profile & settings
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # NextAuth.js handlers
│   │   │   ├── tutor/      # AI tutor endpoints
│   │   │   ├── lessons/    # Lesson CRUD & completion
│   │   │   ├── review/     # Spaced repetition
│   │   │   ├── library/    # Case study search
│   │   │   └── webhooks/   # Stripe webhooks
│   │   └── layout.tsx      # Root layout
│   ├── components/
│   │   ├── ui/             # Base UI components (shadcn/ui)
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── lesson/         # Lesson viewer, knowledge check
│   │   ├── tutor/          # Chat interface, context panel
│   │   ├── curriculum/     # Module grid, progress rings
│   │   ├── library/        # Case cards, filters, search
│   │   └── layout/         # Sidebar, header, navigation
│   ├── lib/
│   │   ├── ai/             # AI tutor orchestration (LLM calls)
│   │   ├── srs/            # Spaced repetition engine
│   │   ├── db/             # Database client & queries
│   │   ├── auth/           # Auth config & utilities
│   │   ├── stripe/         # Payment utilities
│   │   └── utils/          # Shared helpers
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles, Tailwind config
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── content/                # Lesson & case study content (JSON/MDX)
├── public/                 # Static assets (images, diagrams)
├── scripts/                # Utility scripts
│   ├── seed-content.ts     # Database content seeding
│   ├── generate-certs.ts   # Certificate generation
│   └── import-cases.ts     # Case study bulk import
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/                # Playwright E2E tests
├── .github/
│   ├── workflows/          # CI/CD pipelines
│   ├── ISSUE_TEMPLATE/     # Issue templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
├── .env.example
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── docker-compose.yml
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── package.json
├── tsconfig.json
├── LICENSE
├── CONTRIBUTING.md
├── CHANGELOG.md
└── README.md
```

## Architecture

MBA Lite is a Next.js web application powered by:

- **Next.js 14+ (App Router)** — SSR, React Server Components, API routes
- **Tailwind CSS + shadcn/ui** — Utility-first styling with accessible primitives
- **Prisma + PostgreSQL** — Type-safe ORM with relational database
- **Anthropic Claude API** — AI tutor engine
- **Stripe** — Subscription payments
- **Typesense** — Case study search
- **Vercel** — Hosting, preview deploys, edge functions

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full technical architecture.

## Documentation

| Document | Description |
|---|---|
| [`docs/PRD.md`](docs/PRD.md) | Full Product Requirements Document |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Technical architecture and system design |
| [`docs/API.md`](docs/API.md) | API endpoint documentation |
| [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) | Style guide for lesson and case study content |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Deployment and infrastructure guide |
| [`docs/mockup.jsx`](docs/mockup.jsx) | Interactive UI mockup (React) — all 5 pages |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | How to contribute |
| [`CHANGELOG.md`](CHANGELOG.md) | Version history |

## Development

```bash
# Start dev server with hot reload
npm run dev

# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run E2E tests (Playwright)
npm run test:e2e

# Run linting
npm run lint

# Run type checking
npm run typecheck

# Generate Prisma client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name your_migration_name

# Build for production
npm run build

# Start production server locally
npm start
```

## Roadmap

| Phase | Timeline | Focus |
|---|---|---|
| **MVP** | Months 1–3 | Core learning loop, Module 1 + AI Mgmt Module 1, AI Tutor v1, Next.js web app |
| **Beta** | Months 4–6 | Modules 2–4, SRS, Stripe payments, case study library |
| **Launch** | Months 7–12 | Full curriculum, certificates, enterprise licensing, PWA |
| **Scale** | Months 13–18 | Localization, B2B, industry tracks, voice tutor |

See [`docs/PRD.md`](docs/PRD.md) § Milestones for the full roadmap.

## Contributing

We welcome contributions. Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for details.

Content (lessons, case studies, curriculum) is proprietary and covered under a separate content license. See `docs/CONTENT_LICENSE.md` for terms.
