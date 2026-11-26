# Prince Sahani — Portfolio

Next.js 16 + React 19 + Tailwind v4, built as a static site (`out/`) and served by a
**Cloudflare Worker** with static assets. The guestbook API (`worker/index.ts`) uses **Cloudflare D1**.

```bash
npm install
npm run dev            # http://localhost:3000 (no guestbook API)
npm run db:init:local  # once, after D1 is configured
npm run worker:dev     # full site + guestbook at http://localhost:8787
```

See DEPLOY.md to go live. Set the real domain in `src/lib/site.ts` (`site.url`).

## Interactive extras

- **Scroll reveal + page transitions:** `src/app/template.tsx` and the "Motion" block in `globals.css`.
  Everything is disabled automatically for visitors who prefer reduced motion.
- **Cursor glow, card spotlight and tilt:** `src/components/pointer-fx.tsx`. Add the `spotlight` or `tilt`
  class to any card to get the hover effect.
- **Pixel effects (pixelfx):** `src/vendor/pixelfx` holds the library (MIT, see its LICENSE and NOTICE.md).
  `src/lib/fx-registry.ts` lists the effects in use; fire one from anywhere with
  `playFx("confetti", x, y)` from `src/lib/fx-bus.ts`. Clicking empty space fires a spark.
- **Terminal easter egg:** press the backtick key (`), use the `>_ terminal` link in the footer, or enter the
  Konami code. Try `help`, `neofetch`, `fx all` and `sudo hire-me`. Commands live in `src/components/terminal.tsx`.
- **Social preview:** `public/og.png` (1200x630). Replace it any time.
