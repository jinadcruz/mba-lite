#!/usr/bin/env tsx
/**
 * Database migration runner.
 * Usage:
 *   npm run db:migrate                  — apply schema
 *   npm run db:migrate:status           — check tables
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import postgres from 'postgres';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DATABASE_URL =
  process.env.DATABASE_URL ?? 'postgresql://mba_lite:mba_lite_dev@localhost:5432/mba_lite';

const command = process.argv[2] ?? 'migrate';

async function run() {
  const sql = postgres(DATABASE_URL, { onnotice: () => {} });

  try {
    if (command === 'status') {
      const tables = await sql`
        SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public'
        ORDER BY table_name
      `;
      console.info('Tables in database:');
      tables.forEach((t: { table_name: string }) => console.info(' •', t.table_name));
      return;
    }

    // Default: apply schema
    const schemaPath = join(__dirname, '../services/api/src/db/schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    await sql.unsafe(schema);
    console.info('✓ Database schema applied successfully');
    console.info('  Run `npm run db:seed` to add initial content');
  } finally {
    await sql.end();
  }
}

run().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
