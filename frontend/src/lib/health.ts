import { Client } from "pg";

export type HealthResponse = {
  service: string;
  status: string;
  database: string;
  time: string;
};

const DATABASE_URL =
  process.env.DATABASE_URL ??
  process.env.NOOPS_POSTGRES_URL ??
  "postgresql://smoke:smoke@localhost:15433/smoke";

export async function checkHealth(): Promise<HealthResponse> {
  let database = "ok";
  const client = new Client({
    connectionString: DATABASE_URL,
    connectionTimeoutMillis: 3000,
  });

  try {
    await client.connect();
    await client.query("select 1");
  } catch {
    database = "error";
  } finally {
    await client.end().catch(() => undefined);
  }

  return {
    service: "next-api",
    status: database === "ok" ? "ok" : "degraded",
    database,
    time: new Date().toISOString(),
  };
}
