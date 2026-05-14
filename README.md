# Noops E2E Smoke App

Minimal Next.js + FastAPI + PostgreSQL app for testing repository onboarding and deployment flows.

## Services

- `frontend`: Next.js app on port `3000`
- `backend`: FastAPI app on port `8000`
- `db`: PostgreSQL 16

## Local Run

```bash
docker compose up --build
```

Open through the local host ports:

- Frontend: http://localhost:13000
- Backend health: http://localhost:18000/api/health

## Environment

Frontend:

- `BACKEND_URL`: server-side URL for the FastAPI service
- `NEXT_PUBLIC_API_URL`: browser-visible API URL

Backend:

- `DATABASE_URL`: PostgreSQL connection URL
