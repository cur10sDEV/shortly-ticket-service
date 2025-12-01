# ------------------- Dependencies stage ------------------- #
FROM node:22-alpine AS deps

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

WORKDIR /app

COPY package*.json .

RUN npm ci --silent
# ------------------- Dependencies stage ------------------- #

# ------------------- Builder stage ------------------- #
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NODE_ENV=production

RUN npm run build
# ------------------- Builder stage ------------------- #

# ------------------- Runtime stage ------------------- #
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# create non-root user
RUN addgroup -S app && adduser -S -G app app

# copy only what's needed
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# copy built output if present
COPY --from=builder /app/dist ./dist

USER app

EXPOSE 3000

CMD ["npm", "start"]
# ------------------- Runtime stage ------------------- #
