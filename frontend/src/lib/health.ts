import { Client } from "pg";

export type HealthResponse = {
  service: string;
  status: string;
  database: string;
  time: string;
  database_error?: string;
};

const DATABASE_URL =
  process.env.DATABASE_URL ??
  process.env.NOOPS_POSTGRES_URL ??
  "postgresql://smoke:smoke@localhost:15433/smoke";

export async function checkHealth(): Promise<HealthResponse> {
  let database = "ok";
  let databaseError: string | undefined;
  const client = new Client({
    connectionString: DATABASE_URL,
    connectionTimeoutMillis: 3000,
  });

  try {
    await client.connect();
    await client.query("select 1");
  } catch (error) {
    database = "error";
    databaseError = databaseErrorCode(error);
  } finally {
    await client.end().catch(() => undefined);
  }

  return {
    service: "next-api",
    status: database === "ok" ? "ok" : "degraded",
    database,
    time: new Date().toISOString(),
    ...(databaseError ? { database_error: databaseError } : {}),
  };
}

function databaseErrorCode(error: unknown): string {
  if (typeof error !== "object" || error === null) return "unknown";
  const code = "code" in error ? error.code : undefined;
  if (typeof code === "string" && code) return code;
  const name = "name" in error ? error.name : undefined;
  return typeof name === "string" && name ? name : "unknown";
}
