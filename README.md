# Prince Sahani — Portfolio

Next.js 16 + React 19 + Tailwind v4, built as a **static site** and hosted on **Cloudflare Pages**.
The guestbook runs as a Pages Function (`functions/api/guestbook.ts`) backed by **Cloudflare D1**.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000 (guestbook API is NOT available here)
```

Test the full thing (static site + guestbook function + local D1):

```bash
npx wrangler d1 create portfolio-guestbook   # once; paste database_id into wrangler.toml
npm run db:init:local
npm run pages:dev                            # http://localhost:8788
```

## Deploy

See DEPLOY.md.

## Customize

Almost everything lives in `src/lib/site.ts` (name, links, experience, projects, avatars).
Set the real domain in `site.url` (or via the `NEXT_PUBLIC_SITE_URL` env var in Cloudflare).
