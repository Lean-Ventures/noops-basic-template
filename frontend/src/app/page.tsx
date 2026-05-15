import { checkHealth } from "@/lib/health";

export const dynamic = "force-dynamic";

export default async function Home() {
  const health = await checkHealth();

  return (
    <main className="page">
      <section className="panel">
        <p className="eyebrow">Noops E2E Smoke</p>
        <h1>Next.js + PostgreSQL are wired together.</h1>
        <p>
          This small app exists to verify repository import, service deployment,
          environment variables, and public routing on noops.sh.
        </p>

        <div className="status">
          <div className="row">
            <span>API service</span>
            <span className="value">{health.service}</span>
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
            <span className="value">{health.time}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
