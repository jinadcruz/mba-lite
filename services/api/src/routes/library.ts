import { FastifyPluginAsync } from 'fastify';
import getDb from '../db/client.js';

export const libraryRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /library/search
  fastify.get('/library/search', { preHandler: fastify.authenticate }, async (req, reply) => {
    const sql = getDb();
    const {
      q = '',
      geography,
      industry,
      framework,
      difficulty,
      page = '1',
      per_page = '20',
    } = req.query as Record<string, string>;

    const limit = Math.min(parseInt(per_page, 10), 50);
    const offset = (parseInt(page, 10) - 1) * limit;

    // Build dynamic WHERE conditions
    const conditions: string[] = ['1=1'];
    const params: unknown[] = [];

    if (q) {
      params.push(`%${q.toLowerCase()}%`);
      conditions.push(
        `(LOWER(title) LIKE $${params.length} OR LOWER(company) LIKE $${params.length} OR LOWER(content) LIKE $${params.length})`
      );
    }
    if (geography) {
      params.push(geography);
      conditions.push(`geography = $${params.length}`);
    }
    if (industry) {
      params.push(industry);
      conditions.push(`industry = $${params.length}`);
    }
    if (difficulty) {
      params.push(difficulty);
      conditions.push(`difficulty = $${params.length}`);
    }
    if (framework) {
      params.push(framework);
      conditions.push(`$${params.length} = ANY(framework_tags)`);
    }

    const whereClause = conditions.join(' AND ');

    const results = await sql.unsafe(
      `SELECT id, title, company, geography, flag, industry, framework_tags, difficulty, snippet
       FROM case_studies
       WHERE ${whereClause}
       ORDER BY title
       LIMIT ${limit} OFFSET ${offset}`,
      params
    );

    const [{ total }] = await sql.unsafe(
      `SELECT COUNT(*)::int as total FROM case_studies WHERE ${whereClause}`,
      params
    );

    return reply.send({
      results: results.map((cs: Record<string, unknown>) => ({
        id: cs.id,
        title: cs.title,
        company: cs.company,
        geography: cs.geography,
        flag: cs.flag,
        industry: cs.industry,
        frameworkTags: cs.framework_tags,
        difficulty: cs.difficulty,
        snippet: cs.snippet,
      })),
      total,
      page: parseInt(page, 10),
      perPage: limit,
    });
  });

  // GET /library/:id
  fastify.get('/library/:id', { preHandler: fastify.authenticate }, async (req, reply) => {
    const sql = getDb();
    const { id } = req.params as { id: string };

    const [cs] = await sql`SELECT * FROM case_studies WHERE id = ${id}`;
    if (!cs) {
      return reply.code(404).send({
        error: { code: 'CASE_STUDY_NOT_FOUND', message: 'Case study not found.', status: 404 },
      });
    }

    return reply.send({
      id: cs.id,
      title: cs.title,
      company: cs.company,
      geography: cs.geography,
      flag: cs.flag,
      industry: cs.industry,
      frameworkTags: cs.framework_tags,
      difficulty: cs.difficulty,
      snippet: cs.snippet,
      content: cs.content,
      discussionQuestions: cs.discussion_questions,
      sources: cs.sources,
    });
  });
};
