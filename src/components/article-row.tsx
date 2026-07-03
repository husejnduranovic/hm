import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { formatDateBs } from "@/lib/utils"
import { tf } from "@/lib/i18n"
import type { ArticleMeta } from "@/lib/content"

export function ArticleRow({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/tekstovi/${article.slug}`}
      className="group -mx-3 grid grid-cols-[1fr_auto] items-center gap-5 rounded-xl border-b border-line px-3 py-5 transition-colors hover:bg-paper-deep/60 sm:grid-cols-[7rem_1fr_auto] sm:gap-8"
    >
      <span className="hidden text-xs tabular-nums text-ink-faint sm:block">
        {formatDateBs(article.date)}
      </span>

      <span className="min-w-0">
        <span className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-600">
          {article.categoryName}
          <span
            aria-hidden
            className="hidden size-1 rounded-full bg-line sm:inline-block"
          />
          <span className="hidden font-normal normal-case tracking-normal text-ink-faint sm:inline">
            {tf("article.readingTime", { n: article.readingMinutes })}
          </span>
        </span>
        <span className="mt-1.5 block font-display text-lg font-medium leading-snug text-ink transition-colors group-hover:text-forest-800">
          {article.title}
        </span>
        <span className="mt-1 hidden text-sm leading-relaxed text-ink-soft md:line-clamp-1">
          {article.excerpt}
        </span>
      </span>

      <ArrowUpRight
        className="size-5 shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-600"
        aria-hidden
      />
    </Link>
  )
}
