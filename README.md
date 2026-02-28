# Gearfall Monorepo

Gearfall is a mobile-first, web-first PWA deployed with **two Vercel projects** from one monorepo:

- **Project A (`gearfall-web`)** → `apps/web`
- **Project B (`gearfall-api`)** → `apps/api`

Production defaults to hosted infrastructure:
- Frontend hosted on Vercel.
- API hosted on Vercel Serverless Functions under `/api/*`.
- Postgres is hosted (Vercel Postgres or external provider).

## Repository layout

- `apps/web` – PWA frontend
- `apps/api` – Vercel Functions API (`apps/api/api/**`)
- `packages/core` – shared domain logic/types
- `packages/ui` – shared UI primitives
- `docs/spec` – product/spec source and exported images
- `docs/spec/vercel` – Vercel deployment addendum

## Deployment flow (cloud-first)

1. Create Vercel project **gearfall-web** with root directory `apps/web`.
2. Create Vercel project **gearfall-api** with root directory `apps/api`.
3. Configure environment variables:
   - Web: `VITE_API_BASE_URL`
   - API: `DATABASE_URL`, `JWT_SECRET`, `ADMIN_TOKEN`
4. Deploy API first, then web.
5. Run initial provisioning by calling:
   - `POST https://<api-domain>/api/admin/migrate`
   - `POST https://<api-domain>/api/admin/seed`
   Include header: `x-admin-token: <ADMIN_TOKEN>`
6. Verify health endpoint and web integration.

## Local development (optional)

```bash
pnpm install
pnpm dev:api
pnpm dev:web
```

Local mode is optional; production/runbook assumes Vercel deployment first.

## Binary spec assets

PDF/PNG files under `docs/spec/vercel/` are tracked with Git LFS so binary artifacts remain versioned without breaking code review tooling that cannot render binary diffs.
