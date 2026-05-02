import { hasDatabase } from "@/lib/db";

export async function GET() {
  return Response.json({
    ok: true,
    databaseConfigured: hasDatabase(),
    timestamp: new Date().toISOString()
  });
}
