// src/lib/db.ts

// Use CommonJS require + any to avoid TypeScript needing @types/pg on Vercel
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Pool } = require('pg') as any;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<{ rows: T[] }> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return { rows: res.rows as T[] };
  } finally {
    client.release();
  }
}

export default pool;
