# noops-basic-template

Minimal noops-ready Next.js + PostgreSQL app for testing repository onboarding
and deployment flows.

## Services

- `app`: Next.js app on port `3000`
- `db`: PostgreSQL 16, connected through `DATABASE_URL`

## Local Run

```bash
docker compose up --build
```

Open through the local host ports:

- App: http://localhost:13000
- Health: http://localhost:13000/health
- API health: http://localhost:13000/api/health

## Environment

- `DATABASE_URL`: PostgreSQL connection URL
- `NOOPS_POSTGRES_URL`: optional noops-managed alias for `DATABASE_URL`
