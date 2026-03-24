// ─── User & Auth ─────────────────────────────────────────────────────────────

export type SubscriptionTier = 'free' | 'monthly' | 'annual' | 'enterprise';

export interface User {
  id: string;
  email: string;
  name: string;
  timezone: string;
  subscriptionTier: SubscriptionTier;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ─── Curriculum ──────────────────────────────────────────────────────────────

export type ModuleTrack = 'core' | 'ai_management';
export type ModuleStatus = 'locked' | 'available' | 'in_progress' | 'complete';

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  orderNum: number;
  track: ModuleTrack;
  lessonsTotal: number;
  lessonsCompleted: number;
  status: ModuleStatus;
  prerequisiteModuleId?: string;
}

export type LessonDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface ConceptContent {
  text: string;
  formula?: string;
  diagramUrl?: string;
  keyPoints: string[];
}

export interface CaseStudyContent {
  title: string;
  company: string;
  geography: string;
  flag: string;
  industry: string;
  content: string;
  discussionPrompt: string;
  sources?: string[];
}

export interface KnowledgeCheckOption {
  label: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface KnowledgeCheckQuestion {
  id: string;
  question: string;
  options: KnowledgeCheckOption[];
  correctExplanation: string;
}

export interface KnowledgeCheck {
  questions: KnowledgeCheckQuestion[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  orderNum: number;
  title: string;
  concept: ConceptContent;
  caseStudy: CaseStudyContent;
  knowledgeCheck: KnowledgeCheck;
  tutorPrompt: string;
  difficulty: LessonDifficulty;
  readTimeMinutes: number;
}

// ─── Progress ─────────────────────────────────────────────────────────────────

export type ProgressStatus = 'not_started' | 'in_progress' | 'complete';

export interface UserProgress {
  userId: string;
  lessonId: string;
  moduleId: string;
  status: ProgressStatus;
  score?: number;
  timeSpentSeconds?: number;
  completedAt?: string;
}

export interface Streak {
  current: number;
  longest: number;
  lastActivityDate?: string;
  freezeCount: number;
}

export interface ProgressStats {
  modulesCompleted: number;
  modulesTotal: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  currentStreak: number;
  longestStreak: number;
  averageScore: number;
  reviewCardsDue: number;
  certificates: Certificate[];
}

// ─── Review Cards (SRS) ───────────────────────────────────────────────────────

export type ReviewConfidence = 'easy' | 'medium' | 'hard';

export interface ReviewCard {
  id: string;
  userId: string;
  lessonId: string;
  moduleTitle: string;
  question: string;
  answer: string;
  nextReviewAt: string;
  intervalDays: number;
  easeFactor: number;
  reviewCount: number;
}

// ─── AI Tutor ─────────────────────────────────────────────────────────────────

export type TutorRole = 'user' | 'tutor';

export interface TutorMessage {
  role: TutorRole;
  content: string;
  createdAt: string;
}

export interface TutorConversation {
  id: string;
  userId: string;
  lessonId?: string;
  messages: TutorMessage[];
  createdAt: string;
  updatedAt: string;
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  geography: string;
  flag: string;
  industry: string;
  frameworkTags: string[];
  difficulty: LessonDifficulty;
  snippet: string;
  content: string;
  discussionQuestions: string[];
  sources: string[];
}

// ─── Certificates ─────────────────────────────────────────────────────────────

export interface Certificate {
  id: string;
  userId: string;
  track: ModuleTrack;
  title: string;
  completedAt: string;
  verificationCode: string;
  pdfUrl?: string;
}

// ─── Subscription ─────────────────────────────────────────────────────────────

export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'trialing';
export type SubscriptionPlan = 'free' | 'monthly' | 'annual' | 'enterprise';

export interface Subscription {
  id: string;
  userId: string;
  stripeId?: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodEnd?: string;
  trialEnd?: string;
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface TodayResponse {
  lesson: Lesson;
  reviewCards: ReviewCard[];
  streak: Streak;
}

export interface ModulesResponse {
  core: Module[];
  aiManagement: Module[];
}

export interface LessonCompleteRequest {
  knowledgeCheckScore: number;
  knowledgeCheckTotal: number;
  timeSpentSeconds: number;
}

export interface LessonCompleteResponse {
  completed: boolean;
  score: number;
  streakUpdated: boolean;
  newStreak: number;
  badgeEarned: string | null;
  nextLessonId: string | null;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    status: number;
  };
}
