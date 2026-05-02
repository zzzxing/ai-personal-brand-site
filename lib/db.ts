import { neon } from "@neondatabase/serverless";

let sqlClient: ReturnType<typeof neon> | null = null;
let tableReady = false;

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export function getSql() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!sqlClient) {
    sqlClient = neon(process.env.DATABASE_URL);
  }

  return sqlClient;
}

export async function ensureContentTable() {
  const sql = getSql();
  if (!sql || tableReady) {
    return;
  }

  await sql`
    create table if not exists site_content (
      id text primary key,
      data jsonb not null,
      updated_at timestamptz not null default now()
    )
  `;
  tableReady = true;
}
