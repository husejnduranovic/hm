/**
 * Sastavlja demo DUGOG teksta (10–20 stranica) isključivo od postojećih
 * tekstova — radi provjere strukture čitanja (TOC, napredak, navigacija).
 * Pokretanje: node scripts/make-demo-long.mjs
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content", "tekstovi");
const SOURCES = [
  "namaz-po-hanefijskom-mezhebu.md",
  "abdest-i-cistoca.md",
  "post-ramazana-hanefijske-specificnosti.md",
  "deset-pitanja-iz-fikha.md",
  "temelji-hanefijskog-usula.md",
  "razlike-medju-mezhebima.md",
];
const OUT = "veliki-vodic-demo-dugog-teksta.md";

const bodies = SOURCES.map((file, i) => {
  const { content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  let body = content.trim();
  // Svi osim posljednjeg: odbaci završni blok "--- / **Izvori:**"
  if (i < SOURCES.length - 1) {
    const cut = body.lastIndexOf("\n---\n");
    if (cut !== -1) body = body.slice(0, cut).trim();
  }
  return body;
});

const frontmatter = `---
title: "Veliki vodič kroz hanefijski fikh: namaz, čistoća, post i usul (demo dugog teksta)"
excerpt: "Tehnički demo strukture čitanja za tekstove od 10–20 stranica — sastavljen isključivo od postojećih tekstova biblioteke, bez novog sadržaja."
category: "ibadet"
author: "Redakcija"
date: "2026-01-05"
featured: false
tags: ["demo"]
---

`;

fs.writeFileSync(path.join(DIR, OUT), frontmatter + bodies.join("\n\n---\n\n") + "\n");
const words = bodies.join(" ").split(/\s+/).length;
console.log(`OK → ${OUT} (${words} riječi, ~${Math.ceil(words / 190)} min)`);
