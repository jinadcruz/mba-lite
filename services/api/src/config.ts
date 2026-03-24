// ─── Config / Environment ─────────────────────────────────────────────────────

function required(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

function optional(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

export const config = {
  nodeEnv: optional('NODE_ENV', 'development'),
  port: parseInt(optional('API_PORT', '3001'), 10),
  host: optional('API_HOST', '0.0.0.0'),

  db: {
    url: optional('DATABASE_URL', 'postgresql://mba_lite:mba_lite_dev@localhost:5432/mba_lite'),
  },

  jwt: {
    secret: optional('JWT_SECRET', 'dev_secret_change_in_production_min_32_chars!!'),
    expiresIn: optional('JWT_EXPIRES_IN', '7d'),
  },

  cors: {
    origin: optional('CORS_ORIGIN', 'http://localhost:3000'),
  },

  anthropic: {
    apiKey: optional('ANTHROPIC_API_KEY', ''),
  },

  stripe: {
    secretKey: optional('STRIPE_SECRET_KEY', ''),
    webhookSecret: optional('STRIPE_WEBHOOK_SECRET', ''),
    priceMonthly: optional('STRIPE_PRICE_MONTHLY', ''),
    priceAnnual: optional('STRIPE_PRICE_ANNUAL', ''),
  },

  isDev: optional('NODE_ENV', 'development') === 'development',
  isProd: optional('NODE_ENV', 'development') === 'production',
} as const;
