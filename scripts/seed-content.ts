#!/usr/bin/env tsx
/**
 * Seed initial content by delegating to the API service seed script.
 * Usage: npm run db:seed
 */
import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const seedScript = join(__dirname, '../services/api/src/db/seed.ts');

const child = spawn('tsx', [seedScript], {
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
