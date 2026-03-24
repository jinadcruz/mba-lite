-- MBA Lite Database Schema
-- Run via: npm run migrate

-- ─── Extensions ──────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Users ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  timezone VARCHAR(100) NOT NULL DEFAULT 'UTC',
  subscription_tier VARCHAR(20) NOT NULL DEFAULT 'free',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ─── Auth Credentials ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS auth_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(20) NOT NULL DEFAULT 'email',
  provider_id VARCHAR(255),
  password_hash VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, provider)
);

CREATE INDEX IF NOT EXISTS idx_auth_user_id ON auth_credentials(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_provider ON auth_credentials(provider, provider_id);

-- ─── Modules ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS modules (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon VARCHAR(10) NOT NULL DEFAULT '📚',
  order_num INTEGER NOT NULL,
  track VARCHAR(20) NOT NULL DEFAULT 'core',
  lessons_total INTEGER NOT NULL DEFAULT 0,
  prerequisite_module_id VARCHAR(50) REFERENCES modules(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_modules_track ON modules(track);
CREATE INDEX IF NOT EXISTS idx_modules_order ON modules(order_num);

-- ─── Lessons ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lessons (
  id VARCHAR(50) PRIMARY KEY,
  module_id VARCHAR(50) NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  order_num INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  concept_content JSONB NOT NULL DEFAULT '{}',
  case_study_content JSONB NOT NULL DEFAULT '{}',
  knowledge_check JSONB NOT NULL DEFAULT '{"questions":[]}',
  tutor_prompt TEXT NOT NULL DEFAULT '',
  difficulty VARCHAR(20) NOT NULL DEFAULT 'intermediate',
  read_time_minutes INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lessons_module ON lessons(module_id, order_num);

-- ─── User Progress ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id VARCHAR(50) NOT NULL REFERENCES lessons(id),
  module_id VARCHAR(50) NOT NULL REFERENCES modules(id),
  status VARCHAR(20) NOT NULL DEFAULT 'not_started',
  score INTEGER,
  time_spent_seconds INTEGER,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_module ON user_progress(user_id, module_id);

-- ─── User Streaks ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  streak_freeze_count INTEGER NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_streaks_user ON user_streaks(user_id);

-- ─── Review Cards (SRS) ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS review_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id VARCHAR(50) NOT NULL REFERENCES lessons(id),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  next_review_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  interval_days INTEGER NOT NULL DEFAULT 1,
  ease_factor DECIMAL(4,2) NOT NULL DEFAULT 2.50,
  review_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_review_user_date ON review_cards(user_id, next_review_at);
CREATE INDEX IF NOT EXISTS idx_review_lesson ON review_cards(lesson_id);

-- ─── Tutor Conversations ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tutor_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id VARCHAR(50) REFERENCES lessons(id),
  messages JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tutor_user ON tutor_conversations(user_id, created_at DESC);

-- ─── Case Studies ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS case_studies (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  geography VARCHAR(100) NOT NULL,
  flag VARCHAR(10) NOT NULL DEFAULT '🌍',
  industry VARCHAR(100) NOT NULL,
  framework_tags TEXT[] NOT NULL DEFAULT '{}',
  difficulty VARCHAR(20) NOT NULL DEFAULT 'intermediate',
  snippet TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  discussion_questions JSONB NOT NULL DEFAULT '[]',
  sources JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_case_geography ON case_studies(geography);
CREATE INDEX IF NOT EXISTS idx_case_industry ON case_studies(industry);

-- ─── Subscriptions ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  stripe_id VARCHAR(255),
  plan VARCHAR(20) NOT NULL DEFAULT 'free',
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  current_period_end TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sub_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_sub_stripe ON subscriptions(stripe_id);

-- ─── Certificates ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  track VARCHAR(20) NOT NULL,
  title VARCHAR(255) NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verification_code VARCHAR(50) UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  pdf_url TEXT
);

CREATE INDEX IF NOT EXISTS idx_certs_user ON certificates(user_id);
