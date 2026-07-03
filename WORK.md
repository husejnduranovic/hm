# WORK LOG — Hanefijski mezheb demo

## Status: v1 demo complete — ready for client review

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
- [x] `npm run build` green: 32 static pages (11 articles + 11 OG images + core).
- [x] Visual QA round 1 (scripts/shoot.mjs → 40+ screenshots, desktop/mobile/
      interactions). Verified: hero/arch art, covers, quote band, search dialog,
      comment optimistic submit + "čeka odobrenje", video overlay, mobile menu,
      OG images with č/ć/š diacritics, TOC active state, reading progress.
- [x] QA fixes: prose ul/ol bullets restored (Tailwind preflight strips list-style),
      logo tagline hidden <sm (wrapped in mobile header), devIndicators off.
      Build errors fixed along the way: tf imported from wrong module (4 files),
      lucide-react removed brand icons → local brand-icons.tsx.

### Next (when client approves)
- Drop the 10 real texts into content/tekstovi/ (same frontmatter).
- Real video embeds (VideoShowcase overlay → player, ids in videos.json).
- Comments API (lib/comments.ts seam ready), newsletter service.
- Set NEXT_PUBLIC_SITE_URL to the real domain; deploy (Vercel or Node host).

### Open questions for client
- Final brand name/wordmark ("Hanefijski mezheb" is a working title).
- Real domain (placeholder: hanefijski-mezheb.ba).
- Social profile links for footer icons.
