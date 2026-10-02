FROM oven/bun:latest

COPY package.json .
RUN bun install
COPY . .

RUN bunx prisma generate

CMD ["bun", "run", "start"]