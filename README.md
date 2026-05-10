# ScanOrder AI

Production-grade AI-powered scan-to-order SaaS starter for restaurants, cafes, university cafeterias, food courts, and small businesses in Pakistan.

## What is included

- Next.js 15 customer QR ordering PWA and premium restaurant dashboard UI.
- Express API with feature modules, Zod validation, Prisma schema, Redis-ready caching/queues, Socket.io realtime gateway, payment abstraction, and AI queue endpoints.
- Shared TypeScript contracts for customer ordering and menu data.
- Architecture documentation covering system design, tenancy, authentication, realtime flow, deployment, PWA strategy, and roadmap.

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

The API expects PostgreSQL and Redis. The frontend runs on Vercel-compatible Next.js and points to `NEXT_PUBLIC_API_URL`.
