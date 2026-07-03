"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, X } from "lucide-react"
import { cn, normalizeText, pluralBs } from "@/lib/utils"
import { t, tf } from "@/lib/i18n"
import type { ArticleMeta, CategoryWithCount } from "@/lib/content"
import { ArticleCard } from "@/components/article-card"
import { StarGlyph } from "@/components/pattern"

function chipCls(active: boolean) {
  return cn(
    "rounded-full px-4 py-2 text-[0.85rem] font-medium ring-1 transition-all",
    active
      ? "bg-forest-800 text-paper ring-forest-800"
      : "bg-paper-card text-ink-soft ring-line hover:text-ink hover:ring-gold-400",
  )
}

export function ArticlesExplorer({
  articles,
  categories,
  initialQuery = "",
  initialCategory = "",
}: {
  articles: ArticleMeta[]
  categories: CategoryWithCount[]
  initialQuery?: string
  initialCategory?: string
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

  return (
    <div className="container-site pb-24 pt-10">
      <div className="relative max-w-xl">
        <Search
          className="absolute left-4.5 top-1/2 size-4.5 -translate-y-1/2 text-ink-faint"
          aria-hidden
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search.placeholder")}
          aria-label={t("listing.searchLabel")}
          className="h-13 w-full rounded-full border border-line bg-paper-card pl-12 pr-11 text-[0.95rem] text-ink shadow-sm transition-colors placeholder:text-ink-faint focus:border-gold-500 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label={t("listing.reset")}
            className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink-faint transition-colors hover:bg-ink/5 hover:text-ink"
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
        <button
          onClick={() => setCategory("")}
          className={chipCls(category === "")}
        >
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
                "ml-1.5",
                category === c.slug ? "text-paper/60" : "text-ink-faint",
              )}
            >
              {c.count}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <p className="text-sm text-ink-faint" aria-live="polite">
          {resultText}
        </p>
        {hasFilters && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-700 transition-colors hover:text-forest-500"
          >
            <X className="size-3.5" aria-hidden />
            {t("listing.reset")}
          </button>
        )}
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
  )
}
