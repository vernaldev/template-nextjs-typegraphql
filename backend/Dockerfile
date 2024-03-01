##### Build Image #####
FROM node:18.12 AS builder

WORKDIR /app/backend

# Copy dependencies
COPY package.json yarn.lock ./

# Install all dependencies
RUN yarn --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client and TypeGraphQL schema and resolvers
RUN yarn generate:prisma && yarn generate:schema

# Build server
RUN yarn build

##### Runtime Image #####
FROM node:18.12

# Set to non-root user
USER node

WORKDIR /app/backend

ENV NODE_ENV=production

# Copy dependencies
COPY package.json yarn.lock ./

# Install production dependencies
RUN yarn --prod --frozen-lockfile

# Copy production build from builder
COPY --from=builder /app/backend/node_modules/@generated/ ./node_modules/@generated/
COPY --from=builder /app/backend/node_modules/.prisma/ ./node_modules/.prisma/
COPY --from=builder /app/backend/prisma/ ./prisma/
COPY --from=builder /app/backend/dist/ ./dist/
COPY --from=builder /app/schema.graphql ../schema.graphql

# Apply migrations and start server
CMD ["sh", "-c", "yarn db:migrate:prod && yarn prod"]
