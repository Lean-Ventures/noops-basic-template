import { checkHealth } from "@/lib/health";

export async function GET() {
  return Response.json(await checkHealth());
}
