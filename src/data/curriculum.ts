// ─── Curriculum Modules ──────────────────────────────────────

export type ModuleStatus = 'complete' | 'active' | 'available' | 'locked';

export interface CurriculumModule {
  id: number;
  title: string;
  icon: string;
  lessons: number;
  done: number;
  status: ModuleStatus;
  school: string;
}

export const coreModules: CurriculumModule[] = [
  { id: 1, title: 'Financial Accounting & Reporting', icon: '📊', lessons: 25, done: 25, status: 'complete', school: 'HBS FRC' },
  { id: 2, title: 'Corporate Finance & Valuation', icon: '💰', lessons: 25, done: 18, status: 'active', school: 'Wharton FNCE 601' },
  { id: 3, title: 'Marketing Strategy', icon: '📣', lessons: 25, done: 0, status: 'locked', school: 'Kellogg MKTG' },
  { id: 4, title: 'Operations Management', icon: '⚙️', lessons: 25, done: 0, status: 'locked', school: 'HBS TOM' },
  { id: 5, title: 'Org Behavior & Leadership', icon: '🧠', lessons: 25, done: 0, status: 'locked', school: 'Stanford GSB OB' },
  { id: 6, title: 'Micro & Macroeconomics', icon: '📈', lessons: 25, done: 0, status: 'locked', school: 'HBS BGIE' },
  { id: 7, title: 'Corporate Strategy', icon: '♟️', lessons: 30, done: 0, status: 'locked', school: 'HBS Strategy' },
  { id: 8, title: 'Entrepreneurship & Innovation', icon: '🚀', lessons: 20, done: 0, status: 'locked', school: 'Stanford GSB' },
];

export const aiModules: CurriculumModule[] = [
  { id: 9, title: 'AI Strategy & Competitive Dynamics', icon: '🎯', lessons: 20, done: 20, status: 'complete', school: 'AI Mgmt' },
  { id: 10, title: 'AI Product Management', icon: '🤖', lessons: 20, done: 12, status: 'active', school: 'AI Mgmt' },
  { id: 11, title: 'Economics of Foundation Models', icon: '⚡', lessons: 20, done: 0, status: 'available', school: 'AI Mgmt' },
  { id: 12, title: 'Managing AI Teams', icon: '👥', lessons: 20, done: 0, status: 'available', school: 'AI Mgmt' },
  { id: 13, title: 'AI Governance & Responsible AI', icon: '🛡️', lessons: 20, done: 0, status: 'locked', school: 'AI Mgmt' },
  { id: 14, title: 'AI Procurement & Vendor Eval', icon: '🔍', lessons: 15, done: 0, status: 'locked', school: 'AI Mgmt' },
  { id: 15, title: 'AI Org Transformation', icon: '🔄', lessons: 20, done: 0, status: 'locked', school: 'AI Mgmt' },
  { id: 16, title: 'Human-AI Collaboration', icon: '🤝', lessons: 20, done: 0, status: 'locked', school: 'AI Mgmt' },
  { id: 17, title: 'AI Regulation & Policy', icon: '📜', lessons: 25, done: 0, status: 'locked', school: 'AI Mgmt' },
];

// ─── Case Studies ────────────────────────────────────────────

export interface CaseStudy {
  title: string;
  company: string;
  geo: string;
  flag: string;
  industry: string;
  framework: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  desc: string;
}

export const caseStudies: CaseStudy[] = [
  { title: "Jio's Zero-Price Disruption", company: 'Reliance Jio', geo: 'India', flag: '🇮🇳', industry: 'Telecom', framework: 'Disruptive Innovation', difficulty: 'Intermediate', desc: "How Mukesh Ambani's $35B bet on free data reshaped an entire nation's digital economy and displaced incumbents in 18 months." },
  { title: 'M-Pesa: Mobile Money Revolution', company: 'Safaricom', geo: 'Kenya', flag: '🇰🇪', industry: 'Fintech', framework: 'Financial Inclusion', difficulty: 'Beginner', desc: 'The SMS-based payment system that brought banking to 40M unbanked Kenyans and became a model for emerging markets worldwide.' },
  { title: "ByteDance's Recommendation Moat", company: 'ByteDance', geo: 'China', flag: '🇨🇳', industry: 'Tech', framework: 'AI Strategy', difficulty: 'Advanced', desc: "How TikTok's parent built the world's most powerful recommendation engine and turned it into an unassailable competitive advantage." },
  { title: "Spotify's Squad Model", company: 'Spotify', geo: 'Sweden', flag: '🇸🇪', industry: 'Tech', framework: 'Org Design', difficulty: 'Intermediate', desc: 'The organizational framework that let Spotify scale from 50 to 5,000 engineers while maintaining startup agility.' },
  { title: "Nubank's AI Credit Scoring", company: 'Nubank', geo: 'Brazil', flag: '🇧🇷', industry: 'Fintech', framework: 'AI Product Mgmt', difficulty: 'Advanced', desc: "How Latin America's largest digital bank used ML to extend credit to 80M customers traditional banks rejected." },
  { title: 'Grab vs GoTo: Superapp War', company: 'Grab / GoTo', geo: 'Indonesia', flag: '🇮🇩', industry: 'Platform', framework: 'Platform Strategy', difficulty: 'Intermediate', desc: 'Two superapps, one market of 270M people. A case study in platform competition, consolidation, and bundling economics.' },
  { title: 'Toyota Production System → AI', company: 'Toyota', geo: 'Japan', flag: '🇯🇵', industry: 'Auto', framework: 'Operations + AI', difficulty: 'Intermediate', desc: "The evolution of lean manufacturing's gold standard from kanban boards to AI-augmented production lines." },
  { title: 'UAE National AI Strategy', company: 'UAE Government', geo: 'UAE', flag: '🇦🇪', industry: 'Gov', framework: 'AI Policy', difficulty: 'Advanced', desc: 'How a small Gulf state positioned itself as a global AI hub through strategic investment, regulation, and talent acquisition.' },
];

// ─── Review Cards ────────────────────────────────────────────

export interface ReviewCard {
  q: string;
  a: string;
  module: string;
}

export const reviewCards: ReviewCard[] = [
  { q: 'What is the accounting equation?', a: 'Assets = Liabilities + Equity', module: 'Financial Accounting' },
  { q: "Name Porter's Five Forces", a: 'Rivalry, New Entrants, Substitutes, Buyer Power, Supplier Power', module: 'AI Strategy' },
  { q: 'What is a data network effect?', a: 'More users → more data → better product → more users', module: 'AI Strategy' },
];

// ─── Tutor Messages ──────────────────────────────────────────

export interface TutorMessage {
  role: 'user' | 'tutor';
  text: string;
}

export const initialTutorMessages: TutorMessage[] = [
  { role: 'user', text: 'Can you explain DCF valuation in simpler terms?' },
  { role: 'tutor', text: 'Great question! Before I explain, let me ask you this — if I offered to give you $100 today or $100 one year from now, which would you prefer and why?' },
  { role: 'user', text: "I'd take the $100 today because I could invest it and have more than $100 in a year." },
  { role: 'tutor', text: "Exactly! You've just articulated the core principle behind DCF — the time value of money. A dollar today is worth more than a dollar tomorrow.\n\nDCF works by taking all the future cash flows a company is expected to generate, and \"discounting\" them back to today's value. Think of it as asking: \"What would I pay TODAY for the right to receive all these future payments?\"\n\nNow here's the challenge — what factors do you think would make that discount rate higher or lower for a company like Spotify versus a utility company?" },
];

// ─── Quiz Data ───────────────────────────────────────────────

export const sampleQuiz = {
  question: "Netflix's shift from DVDs to streaming is best explained by which framework?",
  options: ['Blue Ocean Strategy', 'Disruptive Innovation (Christensen)', 'First-Mover Advantage', 'Resource-Based View'],
  correct: 1,
  explanation: "Christensen's Disruptive Innovation explains how Netflix entered at the low end with DVD-by-mail and migrated upmarket as streaming technology matured — exactly the pattern of disruption from below.",
};
