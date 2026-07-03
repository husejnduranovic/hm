# Hanefijski mezheb — demo

Moderni redizajn stranice o hanefijskom mezhebu (bosanski jezik). Frontend demo za
odobrenje klijenta — sadržaj je ogledni, backend (komentari, bilten, video) se
priključuje kasnije.

## Pokretanje

```bash
npm install
npm run dev        # http://localhost:3000
```

## Ključno

- **Next.js 16 (App Router) + Tailwind CSS v4**, TypeScript
- Tekstovi žive kao Markdown u `content/tekstovi/` — zamjena demo sadržaja stvarnim
  tekstovima je zamjena datoteka, bez izmjena koda
- Svi UI stringovi u `src/messages/bs.json` (spremno za buduće jezike)
- SEO: meta + Open Graph (generisane slike), `sitemap.xml`, `robots.txt`
- Vizuelna provjera: `node scripts/shoot.mjs <dir>` (screenshotovi svih stranica,
  koristi instalirani Edge)

Detaljna dokumentacija: [CLAUDE.md](CLAUDE.md) · dnevnik rada: [WORK.md](WORK.md)
