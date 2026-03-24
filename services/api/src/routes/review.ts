import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import getDb from '../db/client.js';
import { calculateNextReview } from '@mba-lite/srs-engine';
import type { ReviewConfidence } from '@mba-lite/shared';

const submitSchema = z.object({
  cardId: z.string().uuid(),
  confidence: z.enum(['easy', 'medium', 'hard']),
});

export const reviewRoutes: FastifyPluginAsync = async (fastify) => {
  // POST /review/submit
  fastify.post('/review/submit', { preHandler: fastify.authenticate }, async (req, reply) => {
    const sql = getDb();
    const userId = req.user.userId;

    const body = submitSchema.safeParse(req.body);
    if (!body.success) {
      return reply.code(400).send({
        error: { code: 'VALIDATION_ERROR', message: body.error.message, status: 400 },
      });
    }

    const { cardId, confidence } = body.data;

    const [card] = await sql`
      SELECT * FROM review_cards WHERE id = ${cardId} AND user_id = ${userId}
    `;
    if (!card) {
      return reply.code(404).send({
        error: { code: 'CARD_NOT_FOUND', message: 'Review card not found.', status: 404 },
      });
    }

    const result = calculateNextReview(
      confidence as ReviewConfidence,
      card.interval_days,
      parseFloat(card.ease_factor),
      card.review_count
    );

    await sql`
      UPDATE review_cards
      SET interval_days = ${result.intervalDays},
          ease_factor = ${result.easeFactor},
          next_review_at = ${result.nextReviewAt.toISOString()},
          review_count = review_count + 1
      WHERE id = ${cardId}
    `;

    return reply.send({
      nextReviewAt: result.nextReviewAt.toISOString(),
      intervalDays: result.intervalDays,
      easeFactor: result.easeFactor,
    });
  });
};
