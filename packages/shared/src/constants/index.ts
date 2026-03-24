// ─── Pricing ──────────────────────────────────────────────────────────────────
export const PRICING = {
  MONTHLY: 19.99,
  ANNUAL: 149.99,
  ANNUAL_MONTHLY_EQUIV: 12.5,
} as const;

// ─── Free Tier Limits ─────────────────────────────────────────────────────────
export const FREE_TIER = {
  TUTOR_MESSAGES_PER_DAY: 3,
  FREE_MODULES: ['mod_fin_acct'], // Module 1 is free
} as const;

// ─── SRS ─────────────────────────────────────────────────────────────────────
export const SRS = {
  INITIAL_INTERVAL: 1,
  INITIAL_EASE_FACTOR: 2.5,
  MIN_EASE_FACTOR: 1.3,
  EASY_BONUS: 1.3,
  HARD_PENALTY: 0.8,
  MAX_INTERVAL: 365,
  REVIEW_CARDS_PER_DAY: 5,
} as const;

// ─── Streak ───────────────────────────────────────────────────────────────────
export const STREAK = {
  FREEZE_PER_WEEK: 1,
  GRACE_HOURS: 24,
} as const;

// ─── Curriculum ──────────────────────────────────────────────────────────────
export const MODULE_IDS = {
  // Core MBA
  FIN_ACCT: 'mod_fin_acct',
  CORP_FIN: 'mod_corp_fin',
  MARKETING: 'mod_marketing',
  OPERATIONS: 'mod_operations',
  ORG_BEHAVIOR: 'mod_org_behavior',
  ECONOMICS: 'mod_economics',
  STRATEGY: 'mod_strategy',
  ENTREPRENEURSHIP: 'mod_entrepreneurship',
  // AI Management
  AI_STRATEGY: 'mod_ai_strategy',
  AI_PM: 'mod_ai_pm',
  FOUNDATION_MODELS: 'mod_foundation_models',
  AI_TEAMS: 'mod_ai_teams',
  AI_GOVERNANCE: 'mod_ai_governance',
  AI_PROCUREMENT: 'mod_ai_procurement',
  AI_TRANSFORMATION: 'mod_ai_transformation',
  HUMAN_AI: 'mod_human_ai',
  AI_REGULATION: 'mod_ai_regulation',
} as const;

// ─── Rate Limits ──────────────────────────────────────────────────────────────
export const RATE_LIMITS = {
  FREE_RPM: 60,
  SUBSCRIBER_RPM: 120,
  ENTERPRISE_RPM: 300,
} as const;

// ─── AI Tutor ─────────────────────────────────────────────────────────────────
export const AI_TUTOR = {
  MAX_CONTEXT_MESSAGES: 20,
  MAX_LESSON_CONTEXT_TOKENS: 4000,
  DAILY_TOKEN_BUDGET: 20000,
} as const;
