import os
from datetime import UTC, datetime

import psycopg
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://smoke:smoke@localhost:5433/smoke")

app = FastAPI(title="Noops E2E Smoke API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict[str, str]:
    db_status = "ok"
    try:
        with psycopg.connect(DATABASE_URL, connect_timeout=3) as connection:
            with connection.cursor() as cursor:
                cursor.execute("select 1")
                cursor.fetchone()
    except Exception:
        db_status = "error"

    return {
        "service": "backend",
        "status": "ok" if db_status == "ok" else "degraded",
        "database": db_status,
        "time": datetime.now(UTC).isoformat(),
    }

