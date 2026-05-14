type HealthResponse = {
  service?: string;
  status?: string;
  database?: string;
  time?: string;
};

async function getHealth(): Promise<HealthResponse> {
  const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8000";

  try {
    const response = await fetch(`${backendUrl}/api/health`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { status: "error", database: "unknown" };
    }

    return response.json();
  } catch {
    return { status: "error", database: "unreachable" };
  }
}

export default async function Home() {
  const health = await getHealth();

  return (
    <main className="page">
      <section className="panel">
        <p className="eyebrow">Noops E2E Smoke</p>
        <h1>Next.js + FastAPI + PostgreSQL are wired together.</h1>
        <p>
          This small app exists to verify repository import, service deployment,
          environment variables, and public routing on noops.sh.
        </p>

        <div className="status">
          <div className="row">
            <span>API service</span>
            <span className="value">{health.service ?? "backend"}</span>
          </div>
          <div className="row">
            <span>API status</span>
            <span className="value">{health.status ?? "unknown"}</span>
          </div>
          <div className="row">
            <span>Postgres</span>
            <span className="value">{health.database ?? "unknown"}</span>
          </div>
          <div className="row">
            <span>Checked at</span>
            <span className="value">{health.time ?? "not available"}</span>
          </div>
        </div>
      </section>
    </main>
  );
}

