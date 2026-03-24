import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import getDb from '../db/client.js';
import { calculateNextReview } from '@mba-lite/srs-engine';

const completeSchema = z.object({
  knowledgeCheckScore: z.number().int().min(0),
  knowledgeCheckTotal: z.number().int().min(1),
  timeSpentSeconds: z.number().int().min(0),
});

export const lessonRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /lessons/:id
  fastify.get('/lessons/:id', { preHandler: fastify.authenticate }, async (req, reply) => {
    const sql = getDb();
    const { id } = req.params as { id: string };
    const userId = req.user.userId;

    const [lesson] = await sql`
      SELECT l.*, m.title as module_title,
             up.status, up.score, up.completed_at
      FROM lessons l
      JOIN modules m ON m.id = l.module_id
      LEFT JOIN user_progress up ON up.lesson_id = l.id AND up.user_id = ${userId}
      WHERE l.id = ${id}
    `;

    if (!lesson) {
      return reply.code(404).send({
        error: { code: 'LESSON_NOT_FOUND', message: 'The requested lesson does not exist.', status: 404 },
      });
    }

    return reply.send({
      id: lesson.id,
      moduleId: lesson.module_id,
      moduleTitle: lesson.module_title,
      orderNum: lesson.order_num,
      title: lesson.title,
      concept: lesson.concept_content,
      caseStudy: lesson.case_study_content,
      knowledgeCheck: lesson.knowledge_check,
      tutorPrompt: lesson.tutor_prompt,
      difficulty: lesson.difficulty,
      readTimeMinutes: lesson.read_time_minutes,
      userStatus: lesson.status ?? 'not_started',
      userScore: lesson.score ?? null,
      completedAt: lesson.completed_at ?? null,
    });
  });

  // POST /lessons/:id/complete
  fastify.post('/lessons/:id/complete', { preHandler: fastify.authenticate }, async (req, reply) => {
    const sql = getDb();
    const { id } = req.params as { id: string };
    const userId = req.user.userId;

    const body = completeSchema.safeParse(req.body);
    if (!body.success) {
      return reply.code(400).send({
        error: { code: 'VALIDATION_ERROR', message: body.error.message, status: 400 },
      });
    }

    const { knowledgeCheckScore, knowledgeCheckTotal, timeSpentSeconds } = body.data;
    const score = Math.round((knowledgeCheckScore / knowledgeCheckTotal) * 100);

    const [lesson] = await sql`SELECT id, module_id FROM lessons WHERE id = ${id}`;
    if (!lesson) {
      return reply.code(404).send({
        error: { code: 'LESSON_NOT_FOUND', message: 'Lesson not found.', status: 404 },
      });
    }

    // Upsert progress
    await sql`
      INSERT INTO user_progress (user_id, lesson_id, module_id, status, score, time_spent_seconds, completed_at)
      VALUES (${userId}, ${id}, ${lesson.module_id}, 'complete', ${score}, ${timeSpentSeconds}, NOW())
      ON CONFLICT (user_id, lesson_id)
      DO UPDATE SET status = 'complete', score = ${score},
        time_spent_seconds = ${timeSpentSeconds}, completed_at = NOW(), updated_at = NOW()
    `;

    // Update streak
    const today = new Date().toISOString().split('T')[0];
    const [existingStreak] = await sql`SELECT * FROM user_streaks WHERE user_id = ${userId}`;

    let newStreak = 1;
    let streakUpdated = false;

    if (existingStreak) {
      const lastDate = existingStreak.last_activity_date
        ? new Date(existingStreak.last_activity_date).toISOString().split('T')[0]
        : null;

      if (lastDate === today) {
        // Already completed today — no streak change
        newStreak = existingStreak.current_streak;
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastDate === yesterdayStr) {
          newStreak = existingStreak.current_streak + 1;
          streakUpdated = true;
        } else {
          newStreak = 1;
          streakUpdated = true;
        }

        const longest = Math.max(newStreak, existingStreak.longest_streak);
        await sql`
          UPDATE user_streaks
          SET current_streak = ${newStreak},
              longest_streak = ${longest},
              last_activity_date = ${today},
              updated_at = NOW()
          WHERE user_id = ${userId}
        `;
      }
    } else {
      await sql`
        INSERT INTO user_streaks (user_id, current_streak, longest_streak, last_activity_date)
        VALUES (${userId}, 1, 1, ${today})
      `;
      streakUpdated = true;
    }

    // Auto-generate review cards from lesson key points
    const [fullLesson] = await sql`SELECT concept_content FROM lessons WHERE id = ${id}`;
    if (fullLesson?.concept_content?.keyPoints) {
      const keyPoints: string[] = fullLesson.concept_content.keyPoints;
      for (const point of keyPoints.slice(0, 3)) {
        const colonIdx = point.indexOf(':');
        const question = colonIdx > 0
          ? `What is ${point.substring(0, colonIdx).trim()}?`
          : `Explain: ${point.substring(0, 80)}`;
        const answer = colonIdx > 0
          ? point.substring(colonIdx + 1).trim()
          : point;

        const nextReview = calculateNextReview('medium', 1, 2.5, 0);

        await sql`
          INSERT INTO review_cards (user_id, lesson_id, question, answer, next_review_at)
          VALUES (${userId}, ${id}, ${question}, ${answer}, ${nextReview.nextReviewAt.toISOString()})
        `;
      }
    }

    // Find next lesson
    const [nextLesson] = await sql`
      SELECT l.id FROM lessons l
      JOIN modules m ON m.id = l.module_id
      LEFT JOIN user_progress up ON up.lesson_id = l.id AND up.user_id = ${userId}
      WHERE (up.status IS NULL OR up.status != 'complete')
        AND l.id != ${id}
      ORDER BY m.order_num, l.order_num
      LIMIT 1
    `;

    return reply.send({
      completed: true,
      score,
      streakUpdated,
      newStreak,
      badgeEarned: null,
      nextLessonId: nextLesson?.id ?? null,
    });
  });
};
