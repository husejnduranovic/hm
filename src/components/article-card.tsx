import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn, formatDateBs, tf } from "@/lib/utils";
import { t } from "@/lib/i18n";
import type { ArticleMeta } from "@/lib/content";
import categoriesData from "@/data/categories.json";
import { ArticleCover } from "@/components/covers";

function categoryColors(slug: string): { color: string; colorDeep: string } {
  const cat = categoriesData.find((c) => c.slug === slug);
  return cat ? { color: cat.color, colorDeep: cat.colorDeep } : { color: "#1b6e52", colorDeep: "#0e4534" };
}

export function ArticleCard({
  article,
  className,
}: {
  article: ArticleMeta;
  className?: string;
}) {
  const { color, colorDeep } = categoryColors(article.category);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-paper-card shadow-card ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <ArticleCover
          seed={article.slug}
          color={color}
          colorDeep={colorDeep}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-paper-card/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur-sm">
          {article.categoryName}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="flex items-center gap-2.5 text-xs text-ink-faint">
          <span>{formatDateBs(article.date)}</span>
          <span aria-hidden className="size-1 rounded-full bg-gold-500" />
          <span>{tf("article.readingTime", { n: article.readingMinutes })}</span>
        </p>

        <h3 className="font-display text-[1.28rem] font-medium leading-snug">
          <Link
            href={`/tekstovi/${article.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-forest-800"
          >
            {article.title}
          </Link>
        </h3>

        <p className="line-clamp-2 text-[0.94rem] leading-relaxed text-ink-soft">
          {article.excerpt}
        </p>

        <p className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-medium text-forest-700">
          {t("common.readArticle")}
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </p>
      </div>
    </article>
  );
}
