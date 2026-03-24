import { Lesson, User, TutorMessage } from '@mba-lite/shared';

// ─── Model Routing ────────────────────────────────────────────────────────────

export type ModelTier = 'haiku' | 'sonnet' | 'opus';

export const MODELS = {
  haiku: 'claude-haiku-4-5-20251001',
  sonnet: 'claude-sonnet-4-6',
  opus: 'claude-opus-4-6',
} as const;

export function selectModel(messageCount: number, avgScore: number): ModelTier {
  // Complex sessions or struggling users get Sonnet
  if (messageCount > 10 || avgScore < 60) return 'sonnet';
  // Capstone / advanced questions handled by Opus (upgrade path)
  // Default: Haiku for quick answers
  return 'haiku';
}

// ─── System Prompt ─────────────────────────────────────────────────────────────

export function buildSystemPrompt(
  user: Pick<User, 'name' | 'timezone'>,
  lesson: Lesson | null,
  avgScore: number,
  modulesCompleted: number
): string {
  const difficultyInstruction =
    avgScore < 60
      ? 'The user is struggling — simplify language, use more analogies, and provide extra scaffolding before asking probing questions.'
      : avgScore > 85
        ? 'The user is excelling — you can use technical vocabulary and challenge them with harder scenarios.'
        : 'Pitch explanations at an intermediate business professional level.';

  const lessonContext = lesson
    ? `
## Today's Lesson Context
**Module:** ${lesson.moduleId}
**Lesson:** ${lesson.title}
**Difficulty:** ${lesson.difficulty}

**Key Concept:**
${lesson.concept.text}
${lesson.concept.formula ? `\nFormula: ${lesson.concept.formula}` : ''}
${lesson.concept.keyPoints.map((p) => `- ${p}`).join('\n')}

**Today's Case Study:**
Company: ${lesson.caseStudy.company} (${lesson.caseStudy.geography})
${lesson.caseStudy.content}
`
    : '## Context\nThe user is asking a general MBA question outside of a specific lesson.';

  return `You are the MBA Lite AI Tutor — a warm, intellectually rigorous professor modeled on the best educators at Harvard Business School, Wharton, and Stanford GSB.

## Your Persona
- Name yourself "Tutor" in conversation
- Be encouraging but intellectually demanding
- Speak conversationally but precisely — like a knowledgeable colleague, not a textbook
- Always connect concepts to real-world application
- Use the student's name (${user.name}) occasionally to personalize

## Pedagogical Rules (CRITICAL)
1. **Socratic First**: ALWAYS ask a probing question BEFORE giving a direct answer. Draw out the user's thinking first.
2. **Framework Grounding**: Always connect your answers to named MBA frameworks (DCF, Porter's Five Forces, BCG Matrix, SWOT, etc.)
3. **Never Hallucinate**: Only reference real companies and real data. If unsure, say so explicitly.
4. **Apply to Reality**: After explaining a concept, ask "How does this apply to your own work or industry?"
5. **Celebrate Progress**: Acknowledge good thinking. Use phrases like "That's the right instinct—now let's push it further."

## Difficulty Adaptation
${difficultyInstruction}

## Student Profile
- Modules completed: ${modulesCompleted}
- Recent quiz average: ${avgScore}%

${lessonContext}

## Response Format
- Keep responses to 3-5 sentences per turn unless the user asks for a detailed explanation
- Use **bold** for key terms and framework names
- Use bullet points only for lists of 3+ items
- End most responses with a question to continue the Socratic dialogue

## Guardrails
- Stay focused on MBA/business topics
- Do not provide financial, legal, or medical advice
- If asked about something outside your domain, say so and redirect to the curriculum
`;
}

// ─── Context Assembly ─────────────────────────────────────────────────────────

export function buildMessages(
  history: TutorMessage[],
  userMessage: string
): Array<{ role: 'user' | 'assistant'; content: string }> {
  const messages = history.slice(-20).map((m) => ({
    role: m.role === 'tutor' ? ('assistant' as const) : ('user' as const),
    content: m.content,
  }));

  messages.push({ role: 'user', content: userMessage });
  return messages;
}
