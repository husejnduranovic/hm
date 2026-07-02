# WORK LOG — Hanefijski mezheb demo

## Status: build in progress

### Done
- [x] Studied reference (darultahqiq.com): fetched HTML structure + headless screenshot.
      Kept features: article listing, categories, header search, comments, videos,
      newsletter. Rejected: dated magazine layout, sidebar clutter, red accent theme.
- [x] Design direction decided: warm paper editorial + emerald/gold, Fraunces/Inter/
      Source Serif 4 + Amiri, generated khatam-star SVG art (no stock imagery).
- [x] Next.js 16 + Tailwind v4 scaffold; deps (gray-matter, react-markdown, remark-gfm,
      lucide-react, clsx, puppeteer-core dev).
- [x] Design tokens + prose/animation CSS (globals.css).
- [x] i18n layer: messages/bs.json + t()/tf() helpers; Bosnian plural + date utils.
- [x] Content pipeline: content/tekstovi/*.md → lib/content.ts (metas, related,
      prev/next, TOC extraction, reading time, category counts).
- [x] 11 Bosnian demo articles (Hanafi fiqh, realistic, with sources/quotes/Arabic).
- [x] Data files: categories (6), videos (5), mock comments, about page content.
- [x] Components: header (sticky + mobile menu), Ctrl+K search dialog, footer +
      newsletter, hero with arch art, article card/row, category cards, quote band,
      video showcase (switchable, "uskoro" overlay), comments section (optimistic
      submit + pending badge), prose renderer, TOC rail, share buttons, reading
      progress, reveal animations, breadcrumbs, avatars, SVG pattern/cover art.
- [x] Pages: home, /tekstovi (search+filter, URL-synced), /tekstovi/[slug],
      /video, /o-mezhebu (facts, principles, timeline, FAQ), custom 404.
- [x] SEO: metadata + OG tags (bs_BA), generated OG images (site + per-article,
      diacritic-safe fonts), sitemap.ts, robots.ts, favicon (icon.svg).

### In progress
- [ ] First full build + visual QA loop via screenshots (scripts/shoot.mjs).

### Next
- [ ] Fix whatever QA reveals (spacing/contrast/geometry).
- [ ] Final commit, screenshot gallery artifact for client review.

### Later (post-approval, out of scope now)
- Real 10 texts (drop into content/tekstovi/), real video embeds, comments API +
  moderation, newsletter service, real domain in NEXT_PUBLIC_SITE_URL, analytics.
