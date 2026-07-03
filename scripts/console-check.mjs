/** Ispis console poruka (warn/error) sa punim argumentima za zadanu stranicu. */
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EDGE_PATHS = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const exe = EDGE_PATHS.find((p) => fs.existsSync(p));
const urlPath = process.argv[2] ?? "/";
const BASE = "http://localhost:3000";

const browser = await puppeteer.launch({ executablePath: exe, headless: true });
const page = await browser.newPage();
page.on("console", async (msg) => {
  const type = msg.type();
  if (type === "warning" || type === "error") {
    const args = await Promise.all(
      msg.args().map((a) => a.evaluate((v) => String(v)).catch(() => "<?>")),
    );
    console.log(`[${type}]`, args.join(" | "), "\n---");
  }
});
await page.goto(BASE + urlPath, { waitUntil: "networkidle0", timeout: 90000 });
await new Promise((r) => setTimeout(r, 1500));
await browser.close();
console.log("done");
