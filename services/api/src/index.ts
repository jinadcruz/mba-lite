import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { config } from './config.js';
import authPlugin from './plugins/auth.js';
import { authRoutes } from './routes/auth.js';
import { todayRoutes } from './routes/today.js';
import { moduleRoutes } from './routes/modules.js';
import { lessonRoutes } from './routes/lessons.js';
import { tutorRoutes } from './routes/tutor.js';
import { libraryRoutes } from './routes/library.js';
import { reviewRoutes } from './routes/review.js';
import { progressRoutes } from './routes/progress.js';

// Fix: dynamic import for fastify-plugin compatibility
const fp = (await import('fastify-plugin')).default;
const _ = fp; // suppress unused warning

async function buildServer() {
  const fastify = Fastify({
    logger: {
      level: config.isDev ? 'info' : 'warn',
      transport: config.isDev
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
    },
  });

  // ── CORS ────────────────────────────────────────────────────────────────────
  await fastify.register(cors, {
    origin: config.cors.origin,
    credentials: true,
  });

  // ── Rate Limiting ────────────────────────────────────────────────────────────
  await fastify.register(rateLimit, {
    max: 120,
    timeWindow: '1 minute',
    errorResponseBuilder: () => ({
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Please slow down.',
        status: 429,
      },
    }),
  });

  // ── Auth Plugin ──────────────────────────────────────────────────────────────
  await fastify.register(authPlugin);

  // ── Routes (all prefixed /api/v1) ────────────────────────────────────────────
  await fastify.register(
    async (api) => {
      await api.register(authRoutes);
      await api.register(todayRoutes);
      await api.register(moduleRoutes);
      await api.register(lessonRoutes);
      await api.register(tutorRoutes);
      await api.register(libraryRoutes);
      await api.register(reviewRoutes);
      await api.register(progressRoutes);
    },
    { prefix: '/api/v1' }
  );

  // ── Health ──────────────────────────────────────────────────────────────────
  fastify.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  // ── Global Error Handler ────────────────────────────────────────────────────
  fastify.setErrorHandler((error, _req, reply) => {
    fastify.log.error(error);
    if (error.statusCode) {
      return reply.code(error.statusCode).send({
        error: { code: 'SERVER_ERROR', message: error.message, status: error.statusCode },
      });
    }
    return reply.code(500).send({
      error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.', status: 500 },
    });
  });

  return fastify;
}

async function start() {
  try {
    const server = await buildServer();
    await server.listen({ port: config.port, host: config.host });
    console.info(`\n🎓 MBA Lite API running at http://${config.host}:${config.port}`);
    console.info(`   Health: http://localhost:${config.port}/health`);
    console.info(`   API:    http://localhost:${config.port}/api/v1\n`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
