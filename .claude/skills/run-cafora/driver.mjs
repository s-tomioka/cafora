#!/usr/bin/env node
// CAFORA run/smoke driver — launches the Next.js dev server, drives it over
// HTTP, and screenshots it with headless Chrome. No extra deps (Node 22 has
// global fetch; Chrome is used off-the-shelf for screenshots).
//
// Usage:
//   node .claude/skills/run-cafora/driver.mjs            # smoke + screenshots, then exit
//   node .claude/skills/run-cafora/driver.mjs --keep     # leave server running (Ctrl-C to stop)
//   node .claude/skills/run-cafora/driver.mjs --no-shot  # skip screenshots (HTTP only)
//
// Env:
//   PORT=3100                                            # dev server port
//   CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
//   OUT=<dir>                                            # screenshot output dir
//
// Exit code 0 = all checks passed, 1 = a check failed or server never came up.

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const PORT = process.env.PORT || "3100";
const BASE = `http://localhost:${PORT}`;
const KEEP = process.argv.includes("--keep");
const NO_SHOT = process.argv.includes("--no-shot");
const OUT = process.env.OUT || join(tmpdir(), "cafora-shots");
const CHROME =
  process.env.CHROME_BIN ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// Pages that must serve 200
const OK_ROUTES = [
  "/", "/products", "/products/on", "/products/kaku",
  "/faq", "/tokusho", "/privacy", "/company", "/brand", "/barista",
];
// Routes hidden in pre-open: expect 307 -> /
// (When IS_PRE_OPEN=false / IS_JOURNAL_ENABLED=true these change — see SKILL.md)
const REDIRECTS = ["/journal", "/journal/some-post", "/account", "/account/foo", "/design"];
// Substrings expected in the SSR HTML of a given route
const CONTENT = [
  ["/", ["CAFORA", "Our Products", "1,980"]],
  ["/products/on", ["180ml", "240ml", "瀬戸・美濃焼"]],
];

let pass = 0, fail = 0;
const ok = (m) => { console.log(`  ✓ ${m}`); pass++; };
const no = (m) => { console.log(`  ✗ ${m}`); fail++; };

function killPort(port) {
  // best-effort: free the port before/after
  const r = spawnSync("bash", ["-c", `lsof -ti tcp:${port} 2>/dev/null || true`], { encoding: "utf8" });
  const pids = (r.stdout || "").split(/\s+/).filter(Boolean);
  for (const pid of pids) { try { process.kill(Number(pid), "SIGTERM"); } catch {} }
}

async function waitUp(timeoutMs = 90_000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    try {
      const r = await fetch(BASE + "/", { redirect: "manual" });
      if (r.status > 0) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function checkRoutes() {
  console.log("\n[routes] expect 200");
  for (const p of OK_ROUTES) {
    const r = await fetch(BASE + p, { redirect: "manual" });
    r.status === 200 ? ok(`${p} -> 200`) : no(`${p} -> ${r.status} (expected 200)`);
  }
  console.log("\n[redirects] pre-open: expect 307 -> /");
  for (const p of REDIRECTS) {
    const r = await fetch(BASE + p, { redirect: "manual" });
    const loc = r.headers.get("location") || "";
    (r.status === 307 || r.status === 308) && /\/$|\/\?|^\/$|localhost:\d+\/$/.test(loc)
      ? ok(`${p} -> ${r.status} ${loc}`)
      : no(`${p} -> ${r.status} ${loc} (expected 307 -> /)`);
  }
  console.log("\n[content] SSR HTML contains expected strings");
  for (const [p, needles] of CONTENT) {
    const html = await (await fetch(BASE + p)).text();
    for (const n of needles) html.includes(n) ? ok(`${p} contains "${n}"`) : no(`${p} missing "${n}"`);
  }
}

function shot(route, name) {
  if (NO_SHOT) return;
  if (!existsSync(CHROME)) { console.log(`  (skip screenshot: CHROME_BIN not found at ${CHROME})`); return; }
  mkdirSync(OUT, { recursive: true });
  const file = join(OUT, name);
  const r = spawnSync(CHROME, [
    "--headless", "--disable-gpu", "--hide-scrollbars", "--no-sandbox",
    "--virtual-time-budget=8000", "--window-size=1280,1800",
    `--screenshot=${file}`, BASE + route,
  ], { stdio: "ignore" });
  r.status === 0 && existsSync(file) ? ok(`screenshot ${route} -> ${file}`) : no(`screenshot ${route} failed`);
}

let server;
function cleanup() {
  if (server && !server.killed) { try { process.kill(-server.pid, "SIGTERM"); } catch { try { server.kill(); } catch {} } }
  killPort(PORT);
}

async function main() {
  killPort(PORT); // start clean
  console.log(`[launch] next dev on :${PORT}`);
  server = spawn("npx", ["next", "dev", "--turbopack", "-p", PORT], {
    cwd: process.cwd(), detached: true, stdio: "ignore",
  });
  server.on("error", (e) => { console.error("failed to spawn:", e); process.exit(1); });

  if (!(await waitUp())) { console.error("server did not come up"); cleanup(); process.exit(1); }
  console.log("[ready] server is up");

  await checkRoutes();
  console.log("\n[screenshots]");
  shot("/", "cafora-home.png");
  shot("/products/on", "cafora-product-on.png");

  console.log(`\n=== ${pass} passed, ${fail} failed ===`);

  if (KEEP) {
    console.log(`server still running at ${BASE} (Ctrl-C to stop)`);
    return; // leave it; cleanup runs on signal
  }
  cleanup();
  process.exit(fail ? 1 : 0);
}

process.on("SIGINT", () => { cleanup(); process.exit(130); });
process.on("SIGTERM", () => { cleanup(); process.exit(143); });
main();
