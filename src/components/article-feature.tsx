import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatDateBs } from "@/lib/utils"
import { t, tf } from "@/lib/i18n"
import type { ArticleMeta } from "@/lib/content"
import categoriesData from "@/data/categories.json"
import { ArticleCover } from "@/components/covers"
import { Avatar } from "@/components/avatar"

/**
 * Veliki uvodni tekst sekcije /tekstovi — otvoreni "magazinski" slog
 * (naslovnica lijevo, slog desno), bez kartice.
 */
export function ArticleFeature({ article }: { article: ArticleMeta }) {
  const cat = categoriesData.find((c) => c.slug === article.category)

  return (
    <article className="group relative grid items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,3fr)] lg:gap-14">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-card ring-1 ring-line">
        <ArticleCover
          seed={article.slug}
          color={cat?.color ?? "#1b6e52"}
          colorDeep={cat?.colorDeep ?? "#0e4534"}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-5 top-5 rounded-full bg-paper-card/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur-sm">
          {article.categoryName}
        </span>
      </div>

      <div>
        <p className="flex items-center gap-2.5 text-[0.82rem] tabular-nums text-ink-faint">
          <span>{formatDateBs(article.date)}</span>
          <span aria-hidden className="size-1 rounded-full bg-gold-500" />
          <span>{tf("article.readingTime", { n: article.readingMinutes })}</span>
        </p>

        <h2 className="mt-4 font-display text-3xl font-medium leading-[1.12] tracking-tight text-ink md:text-[2.45rem]">
          <Link
            href={`/tekstovi/${article.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-forest-800"
          >
            {article.title}
          </Link>
        </h2>

        <p className="mt-5 line-clamp-3 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">
          {article.excerpt}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="flex items-center gap-2.5">
            <Avatar name={article.author} size="sm" />
            <span className="text-sm font-medium text-ink">{article.author}</span>
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-forest-700">
            {t("common.readArticle")}
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </article>
  )
}
