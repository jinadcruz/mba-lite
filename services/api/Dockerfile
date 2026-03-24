FROM node:20-alpine AS base
RUN corepack enable

FROM base AS deps
WORKDIR /app
COPY package*.json ./
COPY services/api/package.json ./services/api/
COPY packages/shared/package.json ./packages/shared/
COPY packages/ai-tutor/package.json ./packages/ai-tutor/
COPY packages/srs-engine/package.json ./packages/srs-engine/
RUN npm install --workspace=services/api --workspace=packages/shared \
    --workspace=packages/ai-tutor --workspace=packages/srs-engine

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY packages/ ./packages/
COPY services/api/ ./services/api/
COPY tsconfig.json ./
RUN npm run build --workspace=packages/shared \
    && npm run build --workspace=packages/ai-tutor \
    && npm run build --workspace=packages/srs-engine \
    && npm run build --workspace=services/api

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/services/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3001
CMD ["node", "dist/index.js"]
