---
name: Portfolio Blog Platform
description: Next.js 16 full-stack blog + portfolio migration — architecture, branch, and setup status
type: project
---

Migrated from Vite SPA → Next.js 16 App Router on the `blog` branch. The `main` branch preserves the original working Vite portfolio.

**Why:** Add blog (MDX posts, SSR/SEO), admin panel (write/publish), Neon PostgreSQL backend.

**Stack:** Next.js 16, TypeScript, Prisma + Neon PostgreSQL, NextAuth v5, next-mdx-remote v6, Cloudinary, Zod, CodeMirror 6.

**To run locally:**
1. Copy `.env.example` → `.env.local`, fill in DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, Cloudinary vars
2. `npx prisma migrate dev --name init`
3. `npm run db:seed`
4. `npm run dev`

**Key routes:** `/about` (portfolio), `/blog` (listing), `/blog/[slug]` (post), `/admin` (protected dashboard).

**How to apply:** When working on this project, check if `DATABASE_URL` is set before running any Prisma/db commands.
