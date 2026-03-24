// ─── Design Tokens (ported from mockup.jsx) ──────────────────────────────────

export const colors = {
  bg: '#0B1120',
  bgCard: '#111827',
  bgCardHover: '#1A2332',
  bgSurface: '#162032',

  accent: '#F59E0B',
  accentGlow: 'rgba(245, 158, 11, 0.15)',
  accentSoft: '#78350F',

  green: '#10B981',
  greenSoft: 'rgba(16, 185, 129, 0.12)',
  red: '#EF4444',

  blue: '#3B82F6',
  blueSoft: 'rgba(59, 130, 246, 0.12)',
  purple: '#A78BFA',
  purpleSoft: 'rgba(167, 139, 250, 0.12)',

  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',

  border: '#1E293B',
  borderLight: '#334155',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 12,
  xl: 14,
  xxl: 16,
  full: 9999,
} as const;

export const fontSize = {
  xs: 11,
  sm: 12,
  md: 13,
  base: 14,
  lg: 15,
  xl: 16,
  xxl: 18,
  xxxl: 22,
  h2: 26,
  h1: 30,
} as const;
