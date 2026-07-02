/**
 * Screenshot QA: slika sve stranice (desktop + mobile, po segmentima)
 * i ključne interakcije. Koristi instalirani Edge preko puppeteer-core.
 *
 * Upotreba:  node scripts/shoot.mjs <izlazni-dir> [baseUrl]
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
  console.error("Edge nije pronađen.");
  process.exit(1);
}

const outDir = process.argv[2] ?? "shots";
const BASE = process.argv[3] ?? "http://localhost:3000";
fs.mkdirSync(outDir, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const VP = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2 },
};

const JOBS = [
  { name: "home", url: "/", vps: ["desktop", "mobile"], maxSegs: { desktop: 5, mobile: 4 } },
  { name: "tekstovi", url: "/tekstovi", vps: ["desktop", "mobile"], maxSegs: { desktop: 3, mobile: 3 } },
  {
    name: "clanak",
    url: "/tekstovi/namaz-po-hanefijskom-mezhebu",
    vps: ["desktop", "mobile"],
    maxSegs: { desktop: 6, mobile: 4 },
  },
  { name: "video", url: "/video", vps: ["desktop"], maxSegs: { desktop: 2 } },
  { name: "o-mezhebu", url: "/o-mezhebu", vps: ["desktop"], maxSegs: { desktop: 5 } },
  { name: "404", url: "/nepostojeca-stranica", vps: ["desktop"], maxSegs: { desktop: 1 } },
];

async function shootPage(browser, job, vpName) {
  const page = await browser.newPage();
  await page.setViewport(VP[vpName]);
  await page.goto(BASE + job.url, { waitUntil: "networkidle0", timeout: 90000 });
  await sleep(800);

  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = VP[vpName].height;
  const step = vh - 90;
  const segs = Math.min(Math.max(1, Math.ceil((total - vh) / step) + 1), job.maxSegs[vpName] ?? 4);

  for (let i = 0; i < segs; i++) {
    const y = Math.min(i * step, Math.max(0, total - vh));
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await sleep(750);
    await page.screenshot({
      path: path.join(outDir, `${job.name}-${vpName}-${i + 1}.jpg`),
      type: "jpeg",
      quality: 80,
    });
  }
  await page.close();
  console.log(`OK ${job.name} (${vpName}) — ${segs} segmenata`);
}

async function shootInteractions(browser) {
  // 1) Search dialog (Ctrl+K + upit)
  let page = await browser.newPage();
  await page.setViewport(VP.desktop);
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await page.keyboard.down("Control");
  await page.keyboard.press("k");
  await page.keyboard.up("Control");
  await sleep(400);
  await page.keyboard.type("namaz", { delay: 50 });
  await sleep(600);
  await page.screenshot({ path: path.join(outDir, "ix-search.jpg"), type: "jpeg", quality: 80 });
  await page.close();
  console.log("OK ix-search");

  // 2) Mobilni meni
  page = await browser.newPage();
  await page.setViewport(VP.mobile);
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await page.click('button[aria-label="Otvori meni"]');
  await sleep(800);
  await page.screenshot({ path: path.join(outDir, "ix-mobile-menu.jpg"), type: "jpeg", quality: 80 });
  await page.close();
  console.log("OK ix-mobile-menu");

  // 3) Slanje komentara (optimistički prikaz + "čeka odobrenje")
  page = await browser.newPage();
  await page.setViewport(VP.desktop);
  await page.goto(BASE + "/tekstovi/namaz-po-hanefijskom-mezhebu", { waitUntil: "networkidle0" });
  await page.evaluate(() => document.getElementById("kom-ime")?.scrollIntoView({ block: "center" }));
  await sleep(500);
  await page.type("#kom-ime", "Vaš Klijent", { delay: 15 });
  await page.type("#kom-email", "klijent@example.com", { delay: 10 });
  await page.type(
    "#kom-tekst",
    "Selam! Ovo je probni komentar — provjera kako izgleda slanje. Odličan tekst, radujem se nastavku serijala.",
    { delay: 5 },
  );
  await page.click('form button[type="submit"]');
  await sleep(1400);
  await page.evaluate(() => document.getElementById("komentari")?.scrollIntoView());
  await sleep(400);
  await page.screenshot({ path: path.join(outDir, "ix-comment.jpg"), type: "jpeg", quality: 80 });
  await page.close();
  console.log("OK ix-comment");

  // 4) Video overlay ("Snimak uskoro")
  page = await browser.newPage();
  await page.setViewport(VP.desktop);
  await page.goto(BASE + "/video", { waitUntil: "networkidle0" });
  await page.evaluate(() => window.scrollTo({ top: 420, behavior: "instant" }));
  await sleep(400);
  const playBtn = await page.$('button[aria-label^="Izdvojeno"]');
  if (playBtn) await playBtn.click();
  await sleep(600);
  await page.screenshot({ path: path.join(outDir, "ix-video.jpg"), type: "jpeg", quality: 80 });
  await page.close();
  console.log("OK ix-video");

  // 5) OG slike (site + članak)
  for (const [name, url] of [
    ["og-site", "/opengraph-image"],
    ["og-clanak", "/tekstovi/namaz-po-hanefijskom-mezhebu/opengraph-image"],
  ]) {
    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(BASE + url, { waitUntil: "networkidle0", timeout: 90000 });
    await sleep(300);
    await page.screenshot({ path: path.join(outDir, `${name}.jpg`), type: "jpeg", quality: 85 });
    await page.close();
    console.log(`OK ${name}`);
  }
}

const browser = await puppeteer.launch({ executablePath: exe, headless: true });
try {
  for (const job of JOBS) {
    for (const vp of job.vps) {
      await shootPage(browser, job, vp);
    }
  }
  await shootInteractions(browser);
} finally {
  await browser.close();
}
console.log("Gotovo →", path.resolve(outDir));
