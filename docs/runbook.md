# Gearfall Runbook

## Primary path (cloud-first, production-like)

1. Deploy `apps/api` to Vercel project `gearfall-api`.
2. Set API env vars in Vercel:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `ADMIN_TOKEN`
3. Deploy `apps/web` to Vercel project `gearfall-web`.
4. Set web env var:
   - `VITE_API_BASE_URL` (e.g. `https://gearfall-api.vercel.app`)
5. Run initial DB provisioning (one-time) through protected admin functions:
   - `POST https://<api-domain>/api/admin/migrate`
   - `POST https://<api-domain>/api/admin/seed`
   - header: `x-admin-token: <ADMIN_TOKEN>`
6. Verify service:
   - `GET https://<api-domain>/api/health` returns `{ "status": "ok" }`.
   - Web app loads and displays configured API base URL.

After first successful provisioning, rotate or disable `ADMIN_TOKEN`.

## Secondary path (optional local dev)

```bash
pnpm install
pnpm dev:api
pnpm dev:web
```

Local development is optional and should not replace cloud-first verification.
