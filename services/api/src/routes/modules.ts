import { FastifyPluginAsync } from 'fastify';
import getDb from '../db/client.js';

export const moduleRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /modules
  fastify.get('/modules', { preHandler: fastify.authenticate }, async (req, reply) => {
    const sql = getDb();
    const userId = req.user.userId;

    const modules = await sql`
      SELECT m.*,
        COUNT(DISTINCT l.id) as lessons_total,
        COUNT(DISTINCT CASE WHEN up.status = 'complete' THEN up.lesson_id END) as lessons_completed
      FROM modules m
      LEFT JOIN lessons l ON l.module_id = m.id
      LEFT JOIN user_progress up ON up.module_id = m.id AND up.user_id = ${userId}
      GROUP BY m.id
      ORDER BY m.track, m.order_num
    `;

    // Determine status for each module based on prerequisites and progress
    const moduleMap = new Map(modules.map((m: Record<string, unknown>) => [m.id, m]));

    const withStatus = modules.map((m: Record<string, unknown>) => {
      const completed = Number(m.lessons_completed);
      const total = Number(m.lessons_total);

      let status: string;
      if (completed === total && total > 0) {
        status = 'complete';
      } else if (completed > 0) {
        status = 'in_progress';
      } else if (m.prerequisite_module_id) {
        const prereq = moduleMap.get(m.prerequisite_module_id);
        const prereqCompleted = prereq
          ? Number((prereq as Record<string, unknown>).lessons_completed) ===
            Number((prereq as Record<string, unknown>).lessons_total)
          : false;
        status = prereqCompleted ? 'available' : 'locked';
      } else {
        status = 'available';
      }

      return {
        id: m.id,
        title: m.title,
        description: m.description,
        icon: m.icon,
        orderNum: m.order_num,
        track: m.track,
        lessonsTotal: total,
        lessonsCompleted: completed,
        status,
        prerequisiteModuleId: m.prerequisite_module_id ?? undefined,
      };
    });

    const core = withStatus.filter((m: Record<string, unknown>) => m.track === 'core');
    const aiManagement = withStatus.filter((m: Record<string, unknown>) => m.track === 'ai_management');

    return reply.send({ core, aiManagement });
  });

  // GET /modules/:id/lessons
  fastify.get('/modules/:id/lessons', { preHandler: fastify.authenticate }, async (req, reply) => {
    const sql = getDb();
    const userId = req.user.userId;
    const { id } = req.params as { id: string };

    const [module_] = await sql`SELECT * FROM modules WHERE id = ${id}`;
    if (!module_) {
      return reply.code(404).send({
        error: { code: 'MODULE_NOT_FOUND', message: 'Module not found.', status: 404 },
      });
    }

    const lessons = await sql`
      SELECT l.id, l.order_num, l.title, l.difficulty, l.read_time_minutes,
             up.status, up.score, up.completed_at
      FROM lessons l
      LEFT JOIN user_progress up ON up.lesson_id = l.id AND up.user_id = ${userId}
      WHERE l.module_id = ${id}
      ORDER BY l.order_num
    `;

    return reply.send({
      module: {
        id: module_.id,
        title: module_.title,
        description: module_.description,
        track: module_.track,
      },
      lessons: lessons.map((l: Record<string, unknown>) => ({
        id: l.id,
        orderNum: l.order_num,
        title: l.title,
        difficulty: l.difficulty,
        readTimeMinutes: l.read_time_minutes,
        status: l.status ?? 'not_started',
        score: l.score ?? null,
        completedAt: l.completed_at ?? null,
      })),
    });
  });
};
