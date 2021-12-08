# Install PNPM
FROM bitnami/node:16 as pnpm
WORKDIR /app/
RUN apt-get install curl && curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY package.json ./


# Install dependencies only when needed
FROM pnpm AS deps
WORKDIR /app/
RUN pnpm install -r --offline

# Rebuild the source code only when needed
FROM deps AS builder
ARG API_URI
WORKDIR /app
COPY . .
ENV API_URI $API_URI
RUN pnpm build

# Install prod deps
FROM pnpm as prodDeps
RUN pnpm install -r --offline --production

# Production image, copy all the files and run next
FROM bitnami/node:16 AS production
WORKDIR /app

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
ENV NODE_ENV production
ENV PORT 3000

CMD ["node_modules/.bin/next", "start"]
