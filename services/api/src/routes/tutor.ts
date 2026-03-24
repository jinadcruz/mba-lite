import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import getDb from '../db/client.js';
import { AiTutorService } from '@mba-lite/ai-tutor';
import { config } from '../config.js';
import type { TutorMessage } from '@mba-lite/shared';

const messageSchema = z.object({
  message: z.string().min(1).max(2000),
  lessonId: z.string().optional(),
  conversationId: z.string().uuid().optional(),
});

export const tutorRoutes: FastifyPluginAsync = async (fastify) => {
  const tutorService = new AiTutorService(config.anthropic.apiKey);

  // POST /tutor/message  — supports streaming via SSE
  fastify.post('/tutor/message', { preHandler: fastify.authenticate }, async (req, reply) => {
    const sql = getDb();
    const userId = req.user.userId;

    const body = messageSchema.safeParse(req.body);
    if (!body.success) {
      return reply.code(400).send({
        error: { code: 'VALIDATION_ERROR', message: body.error.message, status: 400 },
      });
    }

    const { message, lessonId, conversationId } = body.data;

    // Free tier: 3 messages/day limit
    const userTier = req.user.tier;
    if (userTier === 'free') {
      const [count] = await sql`
        SELECT COUNT(*)::int as cnt
        FROM tutor_conversations
        WHERE user_id = ${userId}
          AND created_at > NOW() - INTERVAL '24 hours'
      `;
      if (count.cnt >= 3) {
        return reply.code(429).send({
          error: {
            code: 'DAILY_LIMIT_REACHED',
            message: 'Free tier allows 3 AI tutor conversations per day. Upgrade to Pro for unlimited access.',
            status: 429,
          },
        });
      }
    }

    // Load or create conversation
    let conversation;
    if (conversationId) {
      const [existing] = await sql`
        SELECT * FROM tutor_conversations
        WHERE id = ${conversationId} AND user_id = ${userId}
      `;
      conversation = existing;
    }

    if (!conversation) {
      const [created] = await sql`
        INSERT INTO tutor_conversations (user_id, lesson_id, messages)
        VALUES (${userId}, ${lessonId ?? null}, '[]')
        RETURNING *
      `;
      conversation = created;
    }

    const history: TutorMessage[] = conversation.messages ?? [];

    // Load lesson context if provided
    let lesson = null;
    if (lessonId) {
      const [lessonRow] = await sql`SELECT * FROM lessons WHERE id = ${lessonId}`;
      if (lessonRow) {
        lesson = {
          id: lessonRow.id,
          moduleId: lessonRow.module_id,
          orderNum: lessonRow.order_num,
          title: lessonRow.title,
          concept: lessonRow.concept_content,
          caseStudy: lessonRow.case_study_content,
          knowledgeCheck: lessonRow.knowledge_check,
          tutorPrompt: lessonRow.tutor_prompt,
          difficulty: lessonRow.difficulty,
          readTimeMinutes: lessonRow.read_time_minutes,
        };
      }
    }

    // Get user stats for context
    const [user] = await sql`SELECT name, timezone FROM users WHERE id = ${userId}`;
    const [stats] = await sql`
      SELECT
        COUNT(CASE WHEN status = 'complete' THEN 1 END)::int as modules_completed,
        COALESCE(AVG(CASE WHEN score IS NOT NULL THEN score END), 75)::int as avg_score
      FROM user_progress
      WHERE user_id = ${userId}
    `;

    // Stream response via SSE
    reply.raw.setHeader('Content-Type', 'text/event-stream');
    reply.raw.setHeader('Cache-Control', 'no-cache');
    reply.raw.setHeader('Connection', 'keep-alive');
    reply.raw.setHeader('X-Conversation-Id', conversation.id);

    let fullResponse = '';

    await tutorService.streamResponse(message, {
      user: { id: userId, name: user?.name ?? 'Student', timezone: user?.timezone ?? 'UTC' },
      lesson,
      conversationHistory: history,
      avgScore: stats?.avg_score ?? 75,
      modulesCompleted: stats?.modules_completed ?? 0,
    }, {
      onChunk: (text) => {
        reply.raw.write(`data: ${JSON.stringify({ type: 'chunk', text })}\n\n`);
        fullResponse += text;
      },
      onComplete: async (text) => {
        // Persist updated conversation
        const newHistory: TutorMessage[] = [
          ...history,
          { role: 'user', content: message, createdAt: new Date().toISOString() },
          { role: 'tutor', content: text, createdAt: new Date().toISOString() },
        ];

        await sql`
          UPDATE tutor_conversations
          SET messages = ${JSON.stringify(newHistory)}, updated_at = NOW()
          WHERE id = ${conversation.id}
        `;

        reply.raw.write(`data: ${JSON.stringify({
          type: 'done',
          conversationId: conversation.id,
          messageCount: newHistory.length,
        })}\n\n`);
        reply.raw.end();
      },
      onError: (err) => {
        reply.raw.write(`data: ${JSON.stringify({ type: 'error', message: err.message })}\n\n`);
        reply.raw.end();
      },
    });
  });

  // GET /tutor/history
  fastify.get('/tutor/history', { preHandler: fastify.authenticate }, async (req, reply) => {
    const sql = getDb();
    const userId = req.user.userId;
    const { page = '1', per_page = '20', conversation_id } = req.query as Record<string, string>;

    const limit = Math.min(parseInt(per_page, 10), 50);
    const offset = (parseInt(page, 10) - 1) * limit;

    if (conversation_id) {
      const [conv] = await sql`
        SELECT * FROM tutor_conversations
        WHERE id = ${conversation_id} AND user_id = ${userId}
      `;
      if (!conv) return reply.code(404).send({ error: { code: 'NOT_FOUND', message: 'Conversation not found', status: 404 } });
      return reply.send({ conversation: conv });
    }

    const conversations = await sql`
      SELECT id, lesson_id, messages, created_at, updated_at
      FROM tutor_conversations
      WHERE user_id = ${userId}
      ORDER BY updated_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const [{ total }] = await sql`
      SELECT COUNT(*)::int as total FROM tutor_conversations WHERE user_id = ${userId}
    `;

    return reply.send({
      conversations,
      total,
      page: parseInt(page, 10),
      perPage: limit,
    });
  });
};
