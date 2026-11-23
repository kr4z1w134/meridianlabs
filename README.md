# Meridian Webapp

Full-stack web application for the Meridian Labs platform. Handles user management, issue tracking, CI/CD orchestration, and deployment workflows.

## Stack

- **Frontend**: Next.js 15, React 19, Radix UI
- **Backend**: Express, Prisma ORM, PostgreSQL
- **Cache**: Redis (ioredis)
- **Auth**: JWT (jose) + bcrypt

## Setup

```bash
cp .env.example .env
npm install
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `JWT_SECRET` | Signing key for auth tokens |
| `DEPLOY_TOKEN` | CI/CD deploy token (GitHub) |
| `NPM_PUBLISH_TOKEN` | npm registry auth token |
| `SENTRY_DSN` | Error tracking endpoint |
| `STRIPE_SECRET_KEY` | Payment processing key |

## Deployment

Production deploys are handled by the CI pipeline (`.github/workflows/ci.yml`). Manual deploys:

```bash
npm run deploy
```

Requires the `DEPLOY_TOKEN` environment variable and appropriate IAM permissions.

## Team

- **Platform**: `@meridian/platform-team`
- **Frontend**: `@meridian/frontend`
- **Infrastructure**: `@meridian/infra`
