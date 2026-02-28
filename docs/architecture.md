# Gearfall Architecture

## Deployment topology (authoritative)

Gearfall deploys as two Vercel projects from this monorepo:

1. **Vercel Project A: `gearfall-web`**
   - Root directory: `apps/web`
   - Delivers the mobile-first PWA build.
2. **Vercel Project B: `gearfall-api`**
   - Root directory: `apps/api`
   - Delivers Node.js Serverless Functions exposed via `/api/*`.

## Runtime assumptions

- Production uses hosted infrastructure only.
- Postgres must be hosted (Vercel Postgres or external managed Postgres).
- Docker Compose is **not required** for the production path.
- Local development is optional and secondary to Vercel deployment validation.

## API function model

- API routes are implemented as files in `apps/api/api/**`.
- No production `listen()` server is required or expected.
- Shared wrapper `apps/api/lib/handler.js` handles:
  - CORS
  - method checking
  - admin authentication
  - consistent error responses
- Shared DB connection is provided by `apps/api/lib/db.js`.
