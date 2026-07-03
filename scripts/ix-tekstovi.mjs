/** Interakcijski test /tekstovi: pločica cjeline → pretraga → reset. */
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const EDGE_PATHS = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const exe = EDGE_PATHS.find((p) => fs.existsSync(p));
const outDir = process.argv[2] ?? "shots-ix";
fs.mkdirSync(outDir, { recursive: true });
const BASE = "http://localhost:3000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: exe, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE + "/tekstovi", { waitUntil: "networkidle0", timeout: 90000 });
await sleep(600);

// 1) klik na pločicu "Historija" u uredničkom pregledu
const tiles = await page.$$("button");
for (const t of tiles) {
  const txt = await t.evaluate((el) => el.textContent ?? "");
  if (txt.includes("Historija") && txt.includes("Put mezheba")) {
    await t.evaluate((el) => el.scrollIntoView({ block: "center" }));
    await sleep(400);
    await t.click();
    break;
  }
}
await sleep(1200);
await page.screenshot({ path: path.join(outDir, "ix-tile.jpg"), type: "jpeg", quality: 80 });
console.log("URL nakon pločice:", page.url());

// 2) pretraga
await page.click('input[aria-label="Pretraga tekstova"]', { clickCount: 3 });
await page.type('input[aria-label="Pretraga tekstova"]', "zekat", { delay: 40 });
await sleep(800);
await page.screenshot({ path: path.join(outDir, "ix-search.jpg"), type: "jpeg", quality: 80 });
console.log("URL nakon pretrage:", page.url());

// 3) reset → povratak uredničkog pregleda
const resetBtn = await page.$$("button");
for (const b of resetBtn) {
  const txt = await b.evaluate((el) => el.textContent ?? "");
  if (txt.trim() === "Poništi filtere") {
    await b.click();
    break;
  }
}
await sleep(1000);
await page.screenshot({ path: path.join(outDir, "ix-reset.jpg"), type: "jpeg", quality: 80 });
console.log("URL nakon reseta:", page.url());

await browser.close();
console.log("done");
