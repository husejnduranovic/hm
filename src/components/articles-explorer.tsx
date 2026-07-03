"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { Search, X } from "lucide-react"
import { cn, normalizeText, pluralBs } from "@/lib/utils"
import { t, tf } from "@/lib/i18n"
import type { ArticleMeta, CategoryWithCount } from "@/lib/content"
import { ArticleCard } from "@/components/article-card"
import { CategoryIcon } from "@/components/category-icon"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { StarGlyph } from "@/components/pattern"

function chipCls(active: boolean) {
  return cn(
    "rounded-full px-4 py-2 text-[0.85rem] font-medium ring-1 transition-all duration-200",
    active
      ? "bg-forest-800 text-paper ring-forest-800"
      : "bg-paper-card text-ink-soft ring-line hover:text-ink hover:ring-gold-400",
  )
}

function countLabel(n: number) {
  return pluralBs(
    n,
    tf("listing.countOne", { n }),
    tf("listing.countFew", { n }),
    tf("listing.countMany", { n }),
  )
}

/** Pločica tematske cjeline u uredničkom pregledu — klik odmah filtrira. */
function CategoryTile({
  category,
  onSelect,
}: {
  category: CategoryWithCount
  onSelect: (slug: string) => void
}) {
  return (
    <button
      onClick={() => onSelect(category.slug)}
      className="group flex items-start gap-4 rounded-2xl bg-paper-card p-5 text-left shadow-card ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift hover:ring-gold-300"
    >
      <span
        className="grid size-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: `${category.color}1c`, color: category.colorDeep }}
      >
        <CategoryIcon icon={category.icon} className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-3">
          <span className="font-display text-[1.05rem] font-medium text-ink transition-colors group-hover:text-forest-800">
            {category.name}
          </span>
          <span className="shrink-0 text-xs tabular-nums text-ink-faint">
            {countLabel(category.count)}
          </span>
        </span>
        <span className="mt-1 line-clamp-2 block text-[0.84rem] leading-relaxed text-ink-soft">
          {category.description}
        </span>
      </span>
    </button>
  )
}

/** Predstavljanje aktivne tematske cjeline iznad rezultata. */
function CategoryIntro({ category }: { category: CategoryWithCount }) {
  return (
    <div className="flex flex-wrap items-center gap-5 rounded-2xl bg-paper-card p-6 shadow-card ring-1 ring-line md:p-7">
      <span
        className="grid size-13 shrink-0 place-items-center rounded-2xl"
        style={{ backgroundColor: `${category.color}1c`, color: category.colorDeep }}
      >
        <CategoryIcon icon={category.icon} className="size-6" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="kicker text-[0.62rem] text-gold-600">{t("listing.categoryLabel")}</p>
        <h2 className="mt-1 font-display text-2xl font-medium tracking-tight text-ink">
          {category.name}
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-soft">
          {category.description}
        </p>
      </div>
    </div>
  )
}

export function ArticlesExplorer({
  articles,
  categories,
  initialQuery = "",
  initialCategory = "",
  lead,
  archive,
}: {
  articles: ArticleMeta[]
  categories: CategoryWithCount[]
  initialQuery?: string
  initialCategory?: string
  /** Urednički slog (server): veliki uvodni tekst + najnovije kartice. */
  lead?: ReactNode
  /** Urednički slog (server): hronološka arhiva. */
  archive?: ReactNode
}) {
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState(initialCategory)

  // URL uvijek odražava aktivne filtere (dijeljiv link), bez ponovnog renderiranja rute
  useEffect(() => {
    const params = new URLSearchParams()
    if (query.trim()) params.set("q", query.trim())
    if (category) params.set("kategorija", category)
    const qs = params.toString()
    window.history.replaceState(null, "", qs ? `/tekstovi?${qs}` : "/tekstovi")
  }, [query, category])

  const filtered = useMemo(() => {
    const q = normalizeText(query.trim())
    return articles.filter((a) => {
      if (category && a.category !== category) return false
      if (!q) return true
      const haystack = normalizeText(
        `${a.title} ${a.excerpt} ${a.categoryName} ${a.tags.join(" ")}`,
      )
      return haystack.includes(q)
    })
  }, [articles, query, category])

  const hasFilters = Boolean(query.trim() || category)
  const activeCategory = categories.find((c) => c.slug === category)
  const n = filtered.length
  const resultText = pluralBs(
    n,
    tf("listing.resultOne", { n }),
    tf("listing.resultFew", { n }),
    tf("listing.resultMany", { n }),
  )

  const reset = () => {
    setQuery("")
    setCategory("")
  }

  // Odabir iz uredničkog pregleda: filtriraj i vrati pogled na alatnu traku
  const selectCategory = (slug: string) => {
    setCategory(slug)
    requestAnimationFrame(() => {
      document
        .getElementById("biblioteka-alat")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  return (
    <>
      {/* Alatna traka: pretraga "lebdi" preko ruba zaglavlja */}
      <div id="biblioteka-alat" className="container-site scroll-mt-24">
        <div className="relative -mt-7 max-w-2xl">
          <Search
            className="absolute left-5 top-1/2 size-4.5 -translate-y-1/2 text-ink-faint"
            aria-hidden
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            aria-label={t("listing.searchLabel")}
            className="h-14 w-full rounded-full border border-line bg-paper-card pl-13 pr-12 text-[0.95rem] text-ink shadow-lift transition-all placeholder:text-ink-faint focus:border-gold-500 focus:outline-none focus:ring-[3px] focus:ring-gold-200/60"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label={t("listing.reset")}
              className="absolute right-4 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink-faint transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <X className="size-4" aria-hidden />
            </button>
          )}
        </div>

        <div
          className="mt-6 flex flex-wrap gap-2"
          role="group"
          aria-label={t("footer.categories")}
        >
          <button onClick={() => setCategory("")} className={chipCls(category === "")}>
            {t("listing.all")}
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug === category ? "" : c.slug)}
              className={chipCls(category === c.slug)}
            >
              {c.name}
              <span
                className={cn(
                  "ml-1.5 tabular-nums",
                  category === c.slug ? "text-paper/60" : "text-ink-faint",
                )}
              >
                {c.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {!hasFilters ? (
        /* ——— Urednički pregled (bez aktivnih filtera) ——— */
        <>
          {lead}

          <section className="mt-16 border-y border-line bg-paper-deep/60 py-14 md:mt-20 md:py-18">
            <div className="container-site">
              <Reveal>
                <SectionHeading
                  kicker={t("sections.categoriesKicker")}
                  title={t("sections.categoriesTitle")}
                  desc={t("sections.categoriesDesc")}
                />
              </Reveal>
              <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((c, i) => (
                  <Reveal key={c.slug} delay={Math.min(i * 50, 200)} className="h-full">
                    <CategoryTile category={c} onSelect={selectCategory} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {archive}
        </>
      ) : (
        /* ——— Rezultati pretrage / filtera ——— */
        <div className="container-site pb-24 pt-10">
          {activeCategory && (
            <div className="anim-fade-up mb-8">
              <CategoryIntro category={activeCategory} />
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <p className="text-sm text-ink-faint" aria-live="polite">
              {resultText}
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-700 transition-colors hover:text-forest-500"
            >
              <X className="size-3.5" aria-hidden />
              {t("listing.reset")}
            </button>
          </div>

          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="mt-16 pb-10 text-center">
              <StarGlyph className="mx-auto size-6 text-gold-500/50" />
              <h2 className="mt-5 font-display text-xl font-medium text-ink">
                {t("listing.emptyTitle")}
              </h2>
              <p className="mt-2 text-ink-soft">{t("listing.emptyText")}</p>
              <button
                onClick={reset}
                className="mt-7 inline-flex h-11 items-center rounded-full bg-forest-800 px-6 text-sm font-semibold text-paper transition-colors hover:bg-forest-700"
              >
                {t("listing.reset")}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
