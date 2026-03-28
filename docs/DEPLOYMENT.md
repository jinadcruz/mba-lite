# Deployment Guide — MBA Lite

## Environments

| Environment | URL | Branch | Auto-Deploy |
|---|---|---|---|
| Local | `http://localhost:3000` | Any | N/A |
| Preview | `https://mba-lite-*-your-org.vercel.app` | Any PR | Yes (Vercel) |
| Staging | `https://staging.mbalite.app` | `develop` | Yes (Vercel) |
| Production | `https://mbalite.app` | `main` | Yes (Vercel, requires approval) |

## Prerequisites

- AWS account with appropriate IAM roles
- Stripe account (test + production keys)
- Anthropic API key
- Apple Developer account (for iOS distribution)
- Google Play Developer account (for Android distribution)
- Domain name configured with DNS

## Infrastructure Setup

### Database (AWS RDS PostgreSQL)

Provision a Multi-AZ PostgreSQL 16 instance. Recommended instance size for launch: `db.r6g.large` (2 vCPU, 16 GB RAM). Enable automated backups with 30-day retention. Enable encryption at rest. Configure security group to allow access only from the application VPC.

### Redis (AWS ElastiCache)

Provision a Redis 7.x cluster. Recommended instance: `cache.r6g.large`. Used for session management, rate limiting, and daily lesson caching.

### Content CDN (AWS CloudFront + S3)

Create an S3 bucket for lesson content assets (images, diagrams, PDFs). Configure CloudFront distribution with S3 as origin. Enable HTTPS with ACM certificate. Set cache TTL to 24 hours for content assets, 5 minutes for API responses.

### Search (Typesense)

Deploy Typesense Cloud or self-host on an EC2 instance. Recommended: `t3.medium` for launch. Index the case study library on deployment. Re-index on content updates.

## Deployment Process

### Web Application (Next.js on Vercel)

The web app deploys to Vercel (primary) with automatic preview deployments on every PR.

**Vercel deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Environment variables** are configured in the Vercel dashboard under Project Settings → Environment Variables. All variables from `.env.example` must be set for production.

**Preview deployments** are created automatically for every pull request. Each preview gets a unique URL for testing before merge.

### Database Migrations

Migrations are managed by Prisma and run automatically on Vercel deployment via the build command. For manual execution:
```bash
npx prisma migrate dev --name your_migration   # Create & apply migration (dev)
npx prisma migrate deploy                       # Apply pending migrations (production)
npx prisma migrate status                        # Check migration status
npx prisma db seed                               # Seed content data
```

## Monitoring and Alerts

### Error Tracking (Sentry)
- All unhandled exceptions reported to Sentry
- Alert on error rate spike (> 5x baseline)
- P0 errors trigger PagerDuty

### Infrastructure Metrics (Grafana + Prometheus)
- CPU/memory utilization per service
- Database connection pool usage
- Redis memory and hit rate
- API response latency (p50, p95, p99)
- AI tutor response latency

### Business Metrics (PostHog)
- DAU/MAU, retention curves, funnel analysis
- Lesson completion rates, AI tutor usage
- Subscription conversion and churn

### Key Alerts

| Alert | Threshold | Channel |
|---|---|---|
| API error rate > 1% | 5 min sustained | Slack #alerts |
| API p95 latency > 3s | 5 min sustained | Slack #alerts |
| AI tutor error rate > 5% | 5 min sustained | Slack #alerts + PagerDuty |
| Database CPU > 80% | 10 min sustained | Slack #infra |
| RDS storage > 80% | Threshold | Slack #infra |
| Deployment failure | Immediate | Slack #deploys + PagerDuty |

## Rollback Procedure

1. Identify the issue via monitoring/alerts.
2. If the issue is in the latest deployment, revert to the previous ECS task definition or Vercel deployment.
3. If the issue is a database migration, run `npm run db:migrate:rollback` (all migrations must be reversible).
4. If the issue is content-related, revert the content version in S3 and invalidate the CloudFront cache.
5. Post-incident, document the issue in a postmortem.
