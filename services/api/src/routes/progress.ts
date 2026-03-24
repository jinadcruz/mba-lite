import { FastifyPluginAsync } from 'fastify';
import getDb from '../db/client.js';

export const progressRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /progress/stats
  fastify.get('/progress/stats', { preHandler: fastify.authenticate }, async (req, reply) => {
    const sql = getDb();
    const userId = req.user.userId;

    const [streak] = await sql`
      SELECT current_streak, longest_streak FROM user_streaks WHERE user_id = ${userId}
    `;

    const [lessonStats] = await sql`
      SELECT
        COUNT(DISTINCT CASE WHEN up.status = 'complete' THEN up.lesson_id END)::int as lessons_completed,
        COALESCE(AVG(CASE WHEN up.score IS NOT NULL THEN up.score END), 0)::int as avg_score
      FROM user_progress up
      WHERE up.user_id = ${userId}
    `;

    const [moduleStats] = await sql`
      SELECT COUNT(DISTINCT m.id)::int as modules_total,
        COUNT(DISTINCT CASE
          WHEN (
            SELECT COUNT(*) FROM lessons l2 WHERE l2.module_id = m.id
          ) = (
            SELECT COUNT(*) FROM user_progress up2
            WHERE up2.user_id = ${userId} AND up2.module_id = m.id AND up2.status = 'complete'
          ) AND (SELECT COUNT(*) FROM lessons l2 WHERE l2.module_id = m.id) > 0
          THEN m.id END
        )::int as modules_completed
      FROM modules m
    `;

    const [lessonTotal] = await sql`SELECT COUNT(*)::int as total FROM lessons`;

    const [reviewDue] = await sql`
      SELECT COUNT(*)::int as total FROM review_cards
      WHERE user_id = ${userId} AND next_review_at <= NOW()
    `;

    const certificates = await sql`
      SELECT id, track, title, completed_at, verification_code, pdf_url
      FROM certificates WHERE user_id = ${userId}
    `;

    return reply.send({
      modulesCompleted: moduleStats?.modules_completed ?? 0,
      modulesTotal: moduleStats?.modules_total ?? 17,
      lessonsCompleted: lessonStats?.lessons_completed ?? 0,
      lessonsTotal: lessonTotal?.total ?? 380,
      currentStreak: streak?.current_streak ?? 0,
      longestStreak: streak?.longest_streak ?? 0,
      averageScore: lessonStats?.avg_score ?? 0,
      reviewCardsDue: reviewDue?.total ?? 0,
      certificates: certificates.map((c: Record<string, unknown>) => ({
        id: c.id,
        track: c.track,
        title: c.title,
        completedAt: c.completed_at,
        verificationCode: c.verification_code,
        pdfUrl: c.pdf_url,
      })),
    });
  });
};
