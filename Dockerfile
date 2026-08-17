# -----------------------------------------------------------------------------
# 1. Base Image mit Bun
# -----------------------------------------------------------------------------
FROM oven/bun:1-alpine AS base
WORKDIR /app

# -----------------------------------------------------------------------------
# 2. Dependencies installieren
# -----------------------------------------------------------------------------
FROM base AS deps
COPY package.json bun.lockb* bun.lock* ./
RUN bun install --frozen-lockfile

# -----------------------------------------------------------------------------
# 3. Next.js App bauen
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js Telemetrie während des Builds deaktivieren
ENV NEXT_TELEMETRY_DISABLED=1

# Next.js App mit Bun bauen
RUN bun run build

# -----------------------------------------------------------------------------
# 4. Production Runner Image
# -----------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Non-root Benutzer für mehr Sicherheit anlegen
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Nur die benötigten Standalone-Dateien & static Assets kopieren
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Starten des Standalone-Servers mit Bun
CMD ["bun", "run", "server.js"]