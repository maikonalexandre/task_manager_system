# 1.
FROM node:22-alpine AS base

# 2.
FROM base AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune @apps/web --docker

# 3.
FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm install

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
RUN npx turbo run build --filter=@apps/web

# 4.
FROM base AS development
WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/apps/web/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
