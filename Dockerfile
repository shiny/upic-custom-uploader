FROM oven/bun:1 AS runner
WORKDIR /app

ENV BUN_ENV=production
COPY . /app
RUN bun install --frozen-lockfile

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["bun", "run", "index.ts"]
