---
name: run-cafora
description: Build, run, smoke-test, and screenshot CAFORA — the Next.js 16 pre-open e-commerce site (custom cafe ceramics). Use when asked to run/start/launch/preview/build/screenshot/smoke-test/drive the CAFORA shop locally, or to verify routes, pre-open redirects, or product pricing render correctly.
---

# Run CAFORA

CAFORA is a **Next.js 16 (App Router, Turbopack)** server-rendered shop. The
meaningful behavior is HTTP-observable — page routes, **pre-open redirects**
(`/journal`, `/account`, `/design` → `/`), and **SSR pricing** — so the driver
is a Node script that launches `next dev`, drives it over `fetch`, and
screenshots it with headless Google Chrome. No browser-automation deps needed
(Node 22 has global `fetch`; Chrome is used off-the-shelf).

All paths below are relative to the repo root (`<unit>/` = this directory).
The driver lives at `.claude/skills/run-cafora/driver.mjs`.

## Prerequisites

- **Node 22** (verified with `v22.20.0`) and npm.
- **Google Chrome** for screenshots. macOS default path is auto-detected:
  `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. On other
  machines set `CHROME_BIN=/path/to/chrome` (or pass `--no-shot` to skip).
- No `.env` is required to launch — `RESEND_API_KEY` (contact form) and
  `NEXT_PUBLIC_GA_ID` (analytics) are read lazily / are optional.

## Build

```bash
npm install
npm run build   # runs `npx prisma generate` then `next build`; emits 28 static/SSR routes
```

`npm run build` is the real correctness gate (type-checks + generates Prisma
client + builds all routes). Expect: `✓ Compiled successfully` and
`✓ Generating static pages ... (28/28)`.

## Run (agent path) — the driver

One command launches the dev server, runs 23 HTTP/content checks, screenshots
the homepage + a product page, then tears the server down:

```bash
node .claude/skills/run-cafora/driver.mjs
```

Expected tail: `=== 23 passed, 0 failed ===` and exit code 0. It checks:
- 10 routes return **200** (`/`, `/products`, `/products/on`, `/faq`, `/tokusho`, `/privacy`, `/company`, `/brand`, `/barista`, …)
- 5 **pre-open redirects** return **307 → /** (`/journal`, `/journal/:slug*`, `/account`, `/account/:slug*`, `/design`)
- SSR HTML contains expected strings (`CAFORA`, `Our Products`, `1,980`, `180ml`, `瀬戸・美濃焼`)

Useful variants:

```bash
# choose a port / output dir for screenshots
PORT=3100 OUT=/tmp/cafora-shots node .claude/skills/run-cafora/driver.mjs

# leave the server running to poke it yourself (Ctrl-C stops it)
node .claude/skills/run-cafora/driver.mjs --keep

# HTTP checks only, no Chrome
node .claude/skills/run-cafora/driver.mjs --no-shot
```

Screenshots default to `$TMPDIR/cafora-shots/` (`cafora-home.png`,
`cafora-product-on.png`). The homepage shot shows the pre-open black banner
("2026年7月 販売開始予定"), nav without ジャーナル/account icons, and
size-based prices (ON ¥1,980〜 / KAKU ¥2,420〜).

### Driving it by hand (after `--keep`, or any running server)

```bash
# routes & redirects
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3100/products/on      # 200
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" http://localhost:3100/account  # 307 -> /

# one-off screenshot with headless Chrome
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --hide-scrollbars --virtual-time-budget=8000 --window-size=1280,1800 \
  --screenshot=/tmp/home.png http://localhost:3100/
```

## Pre-open vs launch flags

Visibility is controlled by `src/flags.ts` (also imported by `next.config.ts`
to generate redirects). Current state is **pre-open** (`IS_PRE_OPEN = true`).
The driver's redirect expectations assume pre-open. If you flip flags
(`IS_PRE_OPEN = false`, `IS_JOURNAL_ENABLED = true`), `/account` and `/journal`
stop redirecting — update expectations or just confirm the new behavior:

```bash
node .claude/skills/run-cafora/driver.mjs --keep
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3100/account   # now 200, not 307
```

## Run (human path)

```bash
npm run dev   # next dev --turbopack on :3000, hot reload, Ctrl-C to stop
```

Opens a long-running server at http://localhost:3000. Fine for interactive
work; useless for automated/headless verification — use the driver instead.

## Test / lint

There is **no unit-test suite**. `npm run lint` exists but currently reports
~23 pre-existing problems (e.g. `react-hooks/refs` in `hero-carousel`); these
do **not** block `next build`. Treat `npm run build` as the gate, not lint.

## Gotchas

- **Below-the-fold content is invisible in static screenshots.** Pages use
  scroll-reveal animations (`FadeUp` / IntersectionObserver, `opacity:0` until
  scrolled in). A headless screenshot of e.g. `/products/on` shows the header
  but a near-blank body — the content IS there (the HTTP content check proves
  it), it just hasn't animated in. Trust the homepage shot (above-the-fold) +
  the content assertions for product pages.
- **`next dev --turbopack` compiles on first request**, so the very first
  route fetch takes ~1–1.5s. The driver polls up to 90s before giving up.
- **`npm run build` runs `prisma generate` first** (via `prisma.config.ts`).
  It needs `prisma/schema.prisma` but **no live database** — the shop pages use
  constants/microCMS, not Prisma, at runtime.
- **Redirects come from `next.config.ts`**, which imports `src/flags.ts`. They
  are evaluated at build/start — changing a flag requires restarting the server
  (the driver restarts each run, so it always reflects the current flags).
- **Port reuse:** the driver kills any process on `PORT` before starting and on
  exit (via `lsof`), so re-runs don't collide.

## Troubleshooting

- **`screenshot ... failed` / "CHROME_BIN not found"** — Chrome isn't at the
  macOS default path. Set `CHROME_BIN=/path/to/chrome`, or run with `--no-shot`.
- **"server did not come up"** — another process may hold the port, or the
  first compile is slow. Check the dev log; retry with a different `PORT=`.
- **Redirect checks fail with 200 instead of 307** — flags were flipped to
  launch mode (`IS_PRE_OPEN=false` / `IS_JOURNAL_ENABLED=true`). That's expected
  post-launch; the pre-open assertions no longer apply.
