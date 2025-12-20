# 1.
FROM node:22-alpine AS base

# 2.
FROM base AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune @apps/auth-service --docker

# 3.
FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm install

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
RUN npx turbo run build --filter=@apps/auth-service

# 4.
FROM base AS development
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/auth-service/dist ./apps/auth-service/dist
COPY --from=builder /app/apps/auth-service/package.json ./apps/auth-service/package.json

EXPOSE 3000

CMD ["node", "apps/auth-service/dist/main.js"]
