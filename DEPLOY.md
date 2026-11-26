# Deploy to Cloudflare Pages

## 1. Push to GitHub
```bash
git init && git add . && git commit -m "portfolio"
git branch -M main
git remote add origin https://github.com/<you>/portfolio.git
git push -u origin main
```
(`node_modules`, `.next`, `out` are git-ignored, so the repo is ~1 MB.)

## 2. Create the guestbook database
```bash
npx wrangler login
npx wrangler d1 create portfolio-guestbook
```
Copy the printed `database_id` into `wrangler.toml`, commit, then:
```bash
npm run db:init:remote
```

## 3. Create the Pages project
Cloudflare Dashboard -> Workers & Pages -> Create -> Pages -> Connect to Git -> pick the repo.

| Setting | Value |
|---|---|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Env var `NODE_VERSION` | `22` |
| Env var `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` |

## 4. Bind D1 to the project
Pages project -> Settings -> Bindings -> Add -> D1 database
- Variable name: `DB`
- Database: `portfolio-guestbook`
(Add it for Production, and Preview if you want.) Then redeploy once.

## 5. Custom domain
Pages project -> Custom domains -> Set up a domain. If the domain is on Cloudflare DNS it's automatic.

Every `git push` to `main` redeploys. It runs 24/7 on Cloudflare's CDN, free tier.
