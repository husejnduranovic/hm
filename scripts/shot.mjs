/**
 * Quick single-page screenshot helper (desktop + optional mobile, segments).
 * Usage: node shot.mjs <url-path> <outPrefix> [segments=3] [mobile=0] [clickSel]
 */
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const EDGE_PATHS = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const exe = EDGE_PATHS.find((p) => fs.existsSync(p));
if (!exe) {
  console.error("Edge not found");
  process.exit(1);
}

const urlPath = process.argv[2] ?? "/tekstovi";
const outPrefix = process.argv[3] ?? "shot";
const segments = Number(process.argv[4] ?? 3);
const mobile = process.argv[5] === "1";
const BASE = "http://localhost:3000";

const outDir = path.dirname(path.resolve(outPrefix));
fs.mkdirSync(outDir, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: exe, headless: true });
try {
  const vps = mobile
    ? [{ name: "m", width: 390, height: 844, deviceScaleFactor: 2 }]
    : [{ name: "d", width: 1440, height: 900 }];
  for (const vp of vps) {
    const page = await browser.newPage();
    await page.setViewport(vp);
    await page.goto(BASE + urlPath, { waitUntil: "networkidle0", timeout: 90000 });
    await sleep(900);
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    const step = vp.height - 90;
    const segs = Math.min(Math.max(1, Math.ceil((total - vp.height) / step) + 1), segments);
    for (let i = 0; i < segs; i++) {
      const y = Math.min(i * step, Math.max(0, total - vp.height));
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      await sleep(700);
      await page.screenshot({ path: `${outPrefix}-${vp.name}${i + 1}.jpg`, type: "jpeg", quality: 80 });
    }
    await page.close();
    console.log(`OK ${urlPath} (${vp.name}) — ${segs} segs, height ${total}`);
  }
} finally {
  await browser.close();
}
