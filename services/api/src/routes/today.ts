import { FastifyPluginAsync } from 'fastify';
import getDb from '../db/client.js';

export const todayRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /today
  fastify.get('/today', { preHandler: fastify.authenticate }, async (req, reply) => {
    const sql = getDb();
    const userId = req.user.userId;

    // Get user's current module progress to find the next lesson
    const completedLessonIds = await sql`
      SELECT lesson_id FROM user_progress
      WHERE user_id = ${userId} AND status = 'complete'
    `;
    const completedIds = completedLessonIds.map((r: { lesson_id: string }) => r.lesson_id);

    // Find the next lesson in sequence (first incomplete lesson)
    let lesson;
    if (completedIds.length === 0) {
      const [first] = await sql`
        SELECT l.*, m.title as module_title
        FROM lessons l
        JOIN modules m ON m.id = l.module_id
        ORDER BY m.order_num, l.order_num
        LIMIT 1
      `;
      lesson = first;
    } else {
      // Find the module the user is currently in
      const [current] = await sql`
        SELECT l.module_id, m.order_num as module_order
        FROM user_progress up
        JOIN lessons l ON l.id = up.lesson_id
        JOIN modules m ON m.id = l.module_id
        WHERE up.user_id = ${userId} AND up.status = 'complete'
        ORDER BY m.order_num DESC, l.order_num DESC
        LIMIT 1
      `;

      const [nextLesson] = await sql`
        SELECT l.*, m.title as module_title
        FROM lessons l
        JOIN modules m ON m.id = l.module_id
        WHERE l.id != ALL(${completedIds})
        ORDER BY m.order_num, l.order_num
        LIMIT 1
      `;
      lesson = nextLesson;
    }

    if (!lesson) {
      return reply.code(404).send({
        error: { code: 'NO_LESSON_AVAILABLE', message: 'No lessons available. Check back soon!', status: 404 },
      });
    }

    // Get due review cards (up to 5)
    const reviewCards = await sql`
      SELECT rc.id, rc.question, rc.answer, rc.lesson_id,
             l.module_id, m.title as module_title
      FROM review_cards rc
      JOIN lessons l ON l.id = rc.lesson_id
      JOIN modules m ON m.id = l.module_id
      WHERE rc.user_id = ${userId}
        AND rc.next_review_at <= NOW()
      ORDER BY rc.next_review_at ASC
      LIMIT 5
    `;

    // Get streak
    const [streak] = await sql`
      SELECT current_streak, longest_streak, streak_freeze_count
      FROM user_streaks
      WHERE user_id = ${userId}
    `;

    return reply.send({
      lesson: {
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
      },
      reviewCards: reviewCards.map((rc: Record<string, unknown>) => ({
        id: rc.id,
        lessonId: rc.lesson_id,
        moduleTitle: rc.module_title,
        question: rc.question,
        answer: rc.answer,
      })),
      streak: streak
        ? {
            current: streak.current_streak,
            longest: streak.longest_streak,
            freezeCount: streak.streak_freeze_count,
          }
        : { current: 0, longest: 0, freezeCount: 1 },
    });
  });
};
