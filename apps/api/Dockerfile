# Install PNPM
FROM bitnami/node:16 as pnpm
WORKDIR /app/
RUN apt-get install curl && curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY package.json ./

# Install Dependencies
FROM pnpm as deps
WORKDIR /app/
RUN pnpm install -r --offline

# Copy files
FROM deps as files
WORKDIR /app/
COPY src/ ./src
COPY tsconfig.json tsconfig.build.json nest-cli.json ./
RUN pnpm build

# Install prod deps
FROM pnpm as prodDeps
RUN pnpm install -r --offline --production

# Final package
FROM bitnami/node:16 as production
WORKDIR /app/
COPY --from=files /app/dist ./dist
COPY --from=prodDeps /app/node_modules ./node_modules
ENV NODE_ENV production
EXPOSE 80
CMD [ "node", "./dist/main.js" ]
