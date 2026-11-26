# Deploy (Cloudflare Workers, Git-connected)

## 1. Push to GitHub
```bash
git init -b main && git add . && git commit -m "portfolio"
git remote add origin https://github.com/<you>/portfolio.git
git push -u origin main
```

## 2. Create the guestbook database (from your computer, once)
```bash
npm install
npx wrangler login
npx wrangler d1 create portfolio-guestbook
```
Paste the printed `database_id` into `wrangler.toml` (replace REPLACE_WITH_YOUR_DATABASE_ID), then:
```bash
npm run db:init:remote
git add . && git commit -m "add d1 id" && git push
```

## 3. Connect the repo (Workers & Pages -> Create application -> Continue with GitHub)
| Setting | Value |
|---|---|
| Project name | `portfolio` (must match `name` in wrangler.toml) |
| Path | `/` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Variable `NODE_VERSION` | `22` |
| Variable `NEXT_PUBLIC_SITE_URL` | `https://princesahani.site` |

Click Deploy. Every `git push` to `main` redeploys.

## 4. Custom domain
Project -> Settings -> Domains & Routes -> Add -> Custom domain -> `princesahani.site`, then `www.princesahani.site`.
(Delete the old A/AAAA/CNAME records for @ and www first; keep MX and TXT.)
