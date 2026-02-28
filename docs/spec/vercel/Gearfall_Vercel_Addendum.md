# Gearfall Vercel Deployment Addendum

## 1) Two-project Vercel setup

Create two Vercel projects from the same repo:

- `gearfall-web`
  - Root Directory: `apps/web`
- `gearfall-api`
  - Root Directory: `apps/api`

## 2) Install/build commands (pnpm monorepo)

Recommended Vercel settings:

- Install Command: `pnpm install --frozen-lockfile`
- Web Build Command: `pnpm --filter @gearfall/web build`
- API Build Command: default Vercel function build (or `pnpm --filter @gearfall/api build`)

## 3) Environment variable checklist

### Web (`apps/web`)
- `VITE_API_BASE_URL`

### API (`apps/api`)
- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_TOKEN`

## 4) Rewrites/proxy recommendation

Preferred: configure frontend to call API via `VITE_API_BASE_URL`.

Optional same-origin pattern: set `VITE_API_BASE_URL=/api` and place web and API behind one domain with Vercel rewrites/proxy.

## 5) CORS guidance

If web and API are on different domains, set API `CORS_ORIGIN` to the web domain (for example `https://gearfall-web.vercel.app`).

## 6) Migration + seed procedure (implemented)

Use protected endpoints (Option A):

- `POST /api/admin/migrate`
- `POST /api/admin/seed`

Both require header:

- `x-admin-token: <ADMIN_TOKEN>`

After initial provisioning, rotate/disable the admin token.

## 7) Verification checklist

1. `GET /api/health` returns `200` and `{ "status": "ok" }`
2. `POST /api/admin/migrate` returns success with prisma output.
3. `POST /api/admin/seed` returns success with seed output.
4. Web app loads and displays configured API base URL.

## 8) Common failure modes

- **Database connection failure**: invalid `DATABASE_URL`, SSL/network restrictions.
- **Unauthorized admin calls**: missing or mismatched `x-admin-token` header.
- **Missing env vars**: `JWT_SECRET` or `DATABASE_URL` not defined in Vercel project.
- **Function path mismatch**: API routes must be in `apps/api/api/**` for Vercel `/api/*`.

## Codex-friendly PNG export workflow

When this addendum changes:
1. Update this markdown file.
2. Export page PNGs into `docs/spec/vercel/images/` with deterministic names:
   - `Gearfall_Vercel_Addendum_Page_01.png`
   - `Gearfall_Vercel_Addendum_Page_02.png`
   - etc.
3. Commit markdown + PNG exports in the same PR.
