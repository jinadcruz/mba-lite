#!/usr/bin/env tsx
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import getDb from './client.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const sql = getDb();
  console.info('Running MBA Lite database migrations...');

  try {
    const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
    await sql.unsafe(schema);
    console.info('✓ Schema applied successfully');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

migrate();
