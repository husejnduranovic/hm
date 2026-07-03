@AGENTS.md

# Hanefijski mezheb — demo/MVP

Frontend-only redesign of a Bosnian-language site about the Hanafi madhhab (reference:
darultahqiq.com, visually modernized). Built for client approval — **design quality is
the deliverable**; backend comes later.

## Tech stack

- **Next.js 16 (App Router, Turbopack)** + TypeScript, `src/` layout, `@/*` alias
- **Tailwind CSS v4** — all design tokens live in `@theme` inside `src/app/globals.css`
  (no tailwind.config)
- `gray-matter` + `react-markdown` + `remark-gfm` — Markdown content pipeline
- `lucide-react` icons, `clsx` for class merging (no tailwind-merge)
- `next/og` (satori) for generated Open Graph images
- Dev-only: `puppeteer-core` (drives installed Edge) → `scripts/shoot.mjs` screenshots

## Commands

- `npm run dev` — dev server (Turbopack, http://localhost:3000)
- `npm run build` — production build (also validates types)
- `node scripts/shoot.mjs <outDir> [baseUrl]` — screenshot all pages + interactions
  (needs dev server running; uses system Edge, no browser download)

## Folder structure

```
content/tekstovi/*.md      ← 11 demo articles (Bosnian, Hanafi fiqh). REAL TEXTS GO HERE.
src/app/                   ← routes: / , /tekstovi, /tekstovi/[slug], /video, /o-mezhebu
  layout.tsx               ← fonts, metadata, header/footer wiring
  globals.css              ← ALL design tokens (@theme) + prose/reveal/anim CSS
  sitemap.ts, robots.ts, icon.svg, opengraph-image.tsx (+ per-article OG in [slug]/)
src/components/            ← UI; "use client" only where interactive
src/data/                  ← categories.json, videos.json, comments.json, about.json, site.ts
src/lib/                   ← content.ts (fs+gray-matter, SERVER ONLY), comments.ts,
                             i18n.ts, utils.ts, og.ts
src/messages/bs.json       ← ALL UI strings (i18n-ready; future: ar.json, en.json)
src/assets/fonts/          ← woff subsets used only by OG image generation
```

## Content model (swap-friendly)

Articles are Markdown files in `content/tekstovi/`. Frontmatter:
`title, excerpt, category (slug from categories.json), author, date (YYYY-MM-DD),
featured (bool), tags (string[])`. Body conventions:

- `##` headings feed the article TOC automatically
- a paragraph containing Arabic script is auto-rendered RTL in Amiri font
- `---` renders an ornament divider; end articles with `**Izvori:** …`
- Reading time is computed (≈190 wpm). Slug = filename.

**Swapping in the client's 10 real texts = replacing these .md files. Nothing else.**

## Design system (decided, keep consistent)

- **Look**: warm "manuscript paper" editorial + deep emerald + gold; Islamic geometry
  (8-point khatam star) as generated SVG art — no stock photos, no purple gradients.
- **Colors** (tokens in globals.css): `paper #faf6ed`, `paper-deep #f1eadb`,
  `paper-card #fffdf6`, `ink #212b26` (+soft/faint), `line #e5ddc8`,
  `forest-950…100` (emerald, primary; 950 `#05231a` for dark bands),
  `gold-700…100` (accent; CTAs use gold-400 on dark, gold-600 text on paper),
  category accents: `clay/azur/plum/sage`.
- **Fonts** (next/font, latin-ext subsets for č ć đ š ž): Fraunces (display),
  Inter (UI), Source Serif 4 (article prose), Amiri (Arabic quotes). CSS vars →
  `font-display / font-sans / font-serif / font-arabic`.
- **Spacing rhythm**: sections `py-18 md:py-24`; container = `.container-site`
  (max-w 76rem, px-5/8). Radii: cards `rounded-2xl`, hero art `rounded-3xl`,
  pills `rounded-full`. Shadows: `shadow-card` / `shadow-lift` / `shadow-dialog`.
- **Section rhythm on home**: dark hero → paper → paper-deep quote band → paper →
  paper-deep → dark video band → paper → dark footer.
- **Micro-interactions**: `Reveal` (IntersectionObserver fade-up, respects
  prefers-reduced-motion), card hover lift + cover zoom, logo rotates 45° on hover,
  Ctrl+K search dialog, reading progress bar on articles.
- All decorative SVG art: `src/components/pattern.tsx` + `covers.tsx` — covers are
  deterministic per slug (hash) so each article keeps its own artwork.

## Conventions

- UI strings: **never hardcode in JSX** — add to `src/messages/bs.json`, use
  `t("path")` / `tf("path", {n})` from `@/lib/i18n`. Bosnian plural via `pluralBs`.
- `src/lib/content.ts` reads the filesystem → import it **only from server
  components**; pass plain data to client components as props.
- Dates: `formatDateBs` ("18. maj 2026."). Search matching: `normalizeText`
  (diacritic-insensitive: š→s, đ→dj…).
- Comment types + mock data access live in `src/lib/comments.ts`.

## Backend attaches later — keep these seams

- **Comments**: `lib/comments.ts` → `getComments()` becomes GET, `submitComment()`
  becomes POST `/api/komentari/[slug]` (same signatures; `CommentsSection` UI already
  does optimistic add + "čeka odobrenje" pending state — do not restructure it).
- **Newsletter**: `NewsletterForm` fake-submits — point it at the real endpoint.
- **Video**: `videos.json` has stable ids; replace the "Snimak uskoro" overlay in
  `VideoShowcase` with a real embed keyed by id.
- **Auth** is entirely absent by design; comment form takes name/email like WP.
- `siteConfig.url` is a placeholder domain — set `NEXT_PUBLIC_SITE_URL` at deploy
  (metadata/sitemap/OG all read it).

## Gotchas

- Writing regex with `\uXXXX` escapes got mangled in this workflow once — prefer
  explicit char classes (see `normalizeText`) or `String.fromCharCode` (see prose.tsx).
- Tailwind v4: custom utilities via `@utility` in globals.css; fractional utilities
  like `py-18`, `size-4.5`, `h-13` are valid (dynamic spacing scale).
- `params`/`searchParams` are **Promises** in Next 16 pages — always `await`.
- The repo may auto-format to prettier-no-semicolons style; don't fight it.
