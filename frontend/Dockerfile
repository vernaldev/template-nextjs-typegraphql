##### Build Image #####
FROM node:18 AS builder

WORKDIR /app/frontend

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

##### Runtime Image #####
FROM node:18

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/next.config.mjs ./next.config.mjs
COPY --from=builder /app/frontend/.next/ ./.next
COPY --from=builder /app/frontend/node_modules/ ./node_modules
COPY --from=builder /app/frontend/package.json/ ./package.json

CMD ["sh", "-c",  "yarn prisma migrate deploy && yarn start"]
