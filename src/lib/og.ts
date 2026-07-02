import fs from "node:fs/promises";
import path from "node:path";

/**
 * Zajednički resursi za generisanje Open Graph slika (next/og · satori).
 * WOFF fontovi su lokalno u src/assets/fonts (latin + latin-ext radi
 * ispravnog prikaza č, ć, đ, š, ž u naslovima).
 */

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_COLORS = {
  bg: "#05231a",
  paper: "#faf6ed",
  paperSoft: "rgba(250, 246, 237, 0.65)",
  gold: "#cfac55",
  goldSoft: "rgba(207, 172, 85, 0.45)",
};

type OgFont = {
  name: string;
  data: Buffer;
  weight: 500 | 600;
  style: "normal";
};

export async function loadOgFonts(): Promise<OgFont[]> {
  const dir = path.join(process.cwd(), "src", "assets", "fonts");
  const [frauncesExt, fraunces, interExt, inter] = await Promise.all([
    fs.readFile(path.join(dir, "fraunces-latin-ext-600.woff")),
    fs.readFile(path.join(dir, "fraunces-latin-600.woff")),
    fs.readFile(path.join(dir, "inter-latin-ext-500.woff")),
    fs.readFile(path.join(dir, "inter-latin-500.woff")),
  ]);
  return [
    { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
    { name: "Fraunces", data: frauncesExt, weight: 600, style: "normal" },
    { name: "Inter", data: inter, weight: 500, style: "normal" },
    { name: "Inter", data: interExt, weight: 500, style: "normal" },
  ];
}
