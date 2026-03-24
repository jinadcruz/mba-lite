import { FastifyPluginAsync } from 'fastify';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import getDb from '../db/client.js';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(100),
  timezone: z.string().default('UTC'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  const sql = getDb();

  // POST /auth/register
  fastify.post('/auth/register', async (req, reply) => {
    const body = registerSchema.safeParse(req.body);
    if (!body.success) {
      return reply.code(400).send({
        error: { code: 'VALIDATION_ERROR', message: body.error.message, status: 400 },
      });
    }

    const { email, password, name, timezone } = body.data;

    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      return reply.code(409).send({
        error: { code: 'EMAIL_TAKEN', message: 'An account with this email already exists.', status: 409 },
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [user] = await sql`
      INSERT INTO users (email, name, timezone)
      VALUES (${email}, ${name}, ${timezone})
      RETURNING id, email, name, timezone, subscription_tier, created_at
    `;

    await sql`
      INSERT INTO auth_credentials (user_id, provider, password_hash)
      VALUES (${user.id}, 'email', ${passwordHash})
    `;

    // Create default streak record
    await sql`
      INSERT INTO user_streaks (user_id) VALUES (${user.id})
      ON CONFLICT (user_id) DO NOTHING
    `;

    // Create default subscription (free)
    await sql`
      INSERT INTO subscriptions (user_id) VALUES (${user.id})
      ON CONFLICT (user_id) DO NOTHING
    `;

    const token = fastify.jwt.sign({
      userId: user.id,
      email: user.email,
      tier: user.subscription_tier,
    });

    return reply.code(201).send({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        timezone: user.timezone,
        subscriptionTier: user.subscription_tier,
        createdAt: user.created_at,
      },
      token,
    });
  });

  // POST /auth/login
  fastify.post('/auth/login', async (req, reply) => {
    const body = loginSchema.safeParse(req.body);
    if (!body.success) {
      return reply.code(400).send({
        error: { code: 'VALIDATION_ERROR', message: body.error.message, status: 400 },
      });
    }

    const { email, password } = body.data;

    const [user] = await sql`
      SELECT u.id, u.email, u.name, u.timezone, u.subscription_tier, u.created_at,
             ac.password_hash
      FROM users u
      JOIN auth_credentials ac ON ac.user_id = u.id AND ac.provider = 'email'
      WHERE u.email = ${email}
    `;

    if (!user || !user.password_hash) {
      return reply.code(401).send({
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.', status: 401 },
      });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return reply.code(401).send({
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.', status: 401 },
      });
    }

    const token = fastify.jwt.sign({
      userId: user.id,
      email: user.email,
      tier: user.subscription_tier,
    });

    return reply.send({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        timezone: user.timezone,
        subscriptionTier: user.subscription_tier,
        createdAt: user.created_at,
      },
      token,
    });
  });

  // GET /auth/me
  fastify.get('/auth/me', { preHandler: fastify.authenticate }, async (req, reply) => {
    const sql = getDb();
    const [user] = await sql`
      SELECT id, email, name, timezone, subscription_tier, created_at
      FROM users WHERE id = ${req.user.userId}
    `;
    if (!user) return reply.code(404).send({ error: { code: 'NOT_FOUND', message: 'User not found', status: 404 } });
    return reply.send({
      id: user.id,
      email: user.email,
      name: user.name,
      timezone: user.timezone,
      subscriptionTier: user.subscription_tier,
      createdAt: user.created_at,
    });
  });
};
