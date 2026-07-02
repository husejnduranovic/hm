import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, MessageCircle } from "lucide-react";
import { t, tf } from "@/lib/i18n";
import { cn, formatDateBs, pluralBs } from "@/lib/utils";
import {
  extractToc,
  getArticle,
  getArticles,
  getPrevNext,
  getRelatedArticles,
  type ArticleMeta,
} from "@/lib/content";
import { getComments } from "@/lib/comments";
import { authorBios } from "@/data/site";
import categoriesData from "@/data/categories.json";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Avatar } from "@/components/avatar";
import { ArticleCover } from "@/components/covers";
import { ArticleCard } from "@/components/article-card";
import { Prose } from "@/components/prose";
import { TocRail } from "@/components/toc-rail";
import { ShareButtons } from "@/components/share-buttons";
import { ReadingProgress } from "@/components/reading-progress";
import { CommentsSection } from "@/components/comments-section";
import { SectionHeading } from "@/components/section-heading";
import { GeoPattern, StarGlyph } from "@/components/pattern";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: t("notFound.title") };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/tekstovi/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/tekstovi/${article.slug}`,
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

function PrevNextCard({
  article,
  direction,
}: {
  article: ArticleMeta;
  direction: "prev" | "next";
}) {
  const next = direction === "next";
  return (
    <Link
      href={`/tekstovi/${article.slug}`}
      className={cn(
        "group rounded-2xl border border-line bg-paper-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card",
        next && "sm:text-right",
      )}
    >
      <p
        className={cn(
          "flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-faint",
          next && "sm:justify-end",
        )}
      >
        {!next && <ArrowLeft className="size-3.5" aria-hidden />}
        {next ? t("article.next") : t("article.prev")}
        {next && <ArrowRight className="size-3.5" aria-hidden />}
      </p>
      <p className="mt-2 line-clamp-2 font-display text-[1.02rem] font-medium leading-snug text-ink transition-colors group-hover:text-forest-800">
        {article.title}
      </p>
    </Link>
  );
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const toc = extractToc(article.body);
  const comments = getComments(slug);
  const commentCount = comments.reduce((sum, c) => sum + 1 + (c.replies?.length ?? 0), 0);
  const related = getRelatedArticles(slug);
  const { prev, next } = getPrevNext(slug);
  const category = categoriesData.find((c) => c.slug === article.category);
  const bio = authorBios[article.author] ?? t("article.authorBioFallback");

  return (
    <>
      <ReadingProgress />
      <article>
        {/* Zaglavlje teksta */}
        <header className="relative overflow-hidden border-b border-line bg-paper-deep/70">
          <GeoPattern id="article-pat" className="absolute inset-0 text-gold-600 opacity-[0.04]" />
          <div className="container-site relative py-10 md:py-14">
            <Breadcrumbs
              items={[
                { label: t("nav.pocetna"), href: "/" },
                { label: t("nav.tekstovi"), href: "/tekstovi" },
                {
                  label: article.categoryName,
                  href: `/tekstovi?kategorija=${article.category}`,
                },
              ]}
            />
            <h1 className="mt-7 max-w-4xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink md:text-[3.2rem]">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {article.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm text-ink-soft">
              <span className="flex items-center gap-2.5">
                <Avatar name={article.author} size="sm" />
                <span>
                  <span className="block text-[0.62rem] font-semibold uppercase tracking-wider text-ink-faint">
                    {t("article.authorLabel")}
                  </span>
                  <span className="font-medium text-ink">{article.author}</span>
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4 text-ink-faint" aria-hidden />
                {formatDateBs(article.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4 text-ink-faint" aria-hidden />
                {tf("article.readingTime", { n: article.readingMinutes })}
              </span>
              <a
                href="#komentari"
                className="flex items-center gap-1.5 transition-colors hover:text-forest-700"
              >
                <MessageCircle className="size-4 text-ink-faint" aria-hidden />
                {pluralBs(
                  commentCount,
                  tf("article.commentOne", { n: commentCount }),
                  tf("article.commentFew", { n: commentCount }),
                  tf("article.commentMany", { n: commentCount }),
                )}
              </a>
            </div>
          </div>
        </header>

        {/* Naslovna grafika */}
        <div className="container-site mt-10">
          <div className="aspect-[21/8] overflow-hidden rounded-3xl shadow-card ring-1 ring-line">
            <ArticleCover
              seed={article.slug}
              color={category?.color ?? "#1b6e52"}
              colorDeep={category?.colorDeep ?? "#0e4534"}
            />
          </div>
        </div>

        {/* Tijelo + bočna traka */}
        <div className="container-site grid gap-14 pb-20 pt-12 md:pt-16 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <div className="max-w-[42rem]">
            <Prose markdown={article.body} />

            {article.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  {t("article.tagsLabel")}:
                </span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-paper-card px-3.5 py-1.5 text-xs font-medium text-ink-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-12 flex gap-5 rounded-2xl bg-paper-deep/60 p-6 ring-1 ring-line">
              <Avatar name={article.author} size="lg" />
              <div>
                <p className="kicker text-[0.62rem] text-gold-600">{t("article.authorLabel")}</p>
                <p className="mt-1 font-display text-lg font-medium text-ink">{article.author}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{bio}</p>
              </div>
            </div>

            <nav className="mt-10 grid gap-4 sm:grid-cols-2" aria-label="Susjedni tekstovi">
              {prev ? <PrevNextCard article={prev} direction="prev" /> : <span className="hidden sm:block" />}
              {next && <PrevNextCard article={next} direction="next" />}
            </nav>

            <div className="mt-10 lg:hidden">
              <p className="kicker mb-3.5 flex items-center gap-2 text-gold-600">
                <StarGlyph className="size-3" />
                {t("article.share")}
              </p>
              <ShareButtons title={article.title} />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-10">
              {toc.length >= 2 && <TocRail items={toc} />}
              <div>
                <p className="kicker flex items-center gap-2 text-gold-600">
                  <StarGlyph className="size-3" />
                  {t("article.share")}
                </p>
                <div className="mt-4">
                  <ShareButtons title={article.title} />
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Povezani tekstovi */}
        {related.length > 0 && (
          <section className="border-y border-line bg-paper-deep/60 py-16 md:py-20">
            <div className="container-site">
              <SectionHeading
                kicker={t("article.relatedKicker")}
                title={t("article.related")}
              />
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Komentari */}
        <div className="container-site">
          <div className="mx-auto max-w-[46rem] py-16 md:py-20">
            <CommentsSection slug={article.slug} initialComments={comments} />
          </div>
        </div>
      </article>
    </>
  );
}
