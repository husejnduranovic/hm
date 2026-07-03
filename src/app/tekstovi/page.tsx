import type { Metadata } from "next";
import { t, tf } from "@/lib/i18n";
import { formatDateBs, formatMonthYearBs, pluralBs } from "@/lib/utils";
import { getArticleMetas, getCategoriesWithCounts, type ArticleMeta } from "@/lib/content";
import { ArticlesExplorer } from "@/components/articles-explorer";
import { ArticleFeature } from "@/components/article-feature";
import { ArticleCard } from "@/components/article-card";
import { ArticleRow } from "@/components/article-row";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { GeoPattern, StarGlyph } from "@/components/pattern";

export const metadata: Metadata = {
  title: t("listing.title"),
  description: t("listing.desc"),
  alternates: { canonical: "/tekstovi" },
};

/** Grupisanje (već sortiranih) tekstova po mjesecu objave. */
function groupByMonth(items: ArticleMeta[]): { label: string; items: ArticleMeta[] }[] {
  const groups: { label: string; items: ArticleMeta[] }[] = [];
  for (const article of items) {
    const label = formatMonthYearBs(article.date);
    const last = groups[groups.length - 1];
    if (last?.label === label) last.items.push(article);
    else groups.push({ label, items: [article] });
  }
  return groups;
}

export default async function TekstoviPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const kategorija = typeof sp.kategorija === "string" ? sp.kategorija : "";

  const articles = getArticleMetas();
  const categories = getCategoriesWithCounts();

  // Urednički slog: najnoviji tekst kao uvodni, tri sljedeća kao kartice,
  // ostatak u hronološkoj arhivi — bez ponavljanja.
  const [lead, ...rest] = articles;
  const recent = rest.slice(0, 3);
  const archiveGroups = groupByMonth(rest.slice(3));

  const libraryMeta = [
    countLabel(articles.length),
    `${categories.length} ${pluralBs(categories.length, t("stats.catOne"), t("stats.catFew"), t("stats.catMany"))}`,
    lead ? tf("listing.lastPublished", { d: formatDateBs(lead.date) }) : null,
  ].filter(Boolean) as string[];

  return (
    <div>
      <header className="relative overflow-hidden border-b border-line bg-paper-deep/70">
        <GeoPattern id="listing-pat" className="absolute inset-0 text-gold-600 opacity-[0.04]" />
        <div className="container-site relative pb-16 pt-14 md:pb-20 md:pt-18">
          <p className="kicker flex items-center gap-2.5 text-gold-600">
            <StarGlyph className="size-3" />
            {t("listing.kicker")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
            {t("listing.title")}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{t("listing.desc")}</p>

          <p className="mt-7 flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[0.82rem] font-medium tabular-nums text-ink-faint">
            {libraryMeta.map((item, i) => (
              <span key={item} className="flex items-center gap-3.5">
                {i > 0 && <StarGlyph className="size-2 text-gold-500/70" />}
                {item}
              </span>
            ))}
          </p>
        </div>
      </header>

      <ArticlesExplorer
        key={`${q}|${kategorija}`}
        articles={articles}
        categories={categories}
        initialQuery={q}
        initialCategory={kategorija}
        lead={
          lead ? (
            // key: element putuje kroz RSC granicu i završava u nizu djece fragmenta
            <section key="najnovije" className="container-site pt-12 md:pt-16">
              <Reveal>
                <p className="kicker flex items-center gap-2.5 text-gold-600">
                  <StarGlyph className="size-3" />
                  {t("listing.leadKicker")}
                </p>
                <div className="mt-8">
                  <ArticleFeature article={lead} />
                </div>
              </Reveal>

              {recent.length > 0 && (
                <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
                  {recent.map((article, i) => (
                    <Reveal key={article.slug} delay={i * 80} className="h-full">
                      <ArticleCard article={article} className="h-full" />
                    </Reveal>
                  ))}
                </div>
              )}
            </section>
          ) : null
        }
        archive={
          archiveGroups.length > 0 ? (
            <section key="arhiva" className="container-site pb-24 pt-16 md:pt-20">
              <Reveal>
                <SectionHeading
                  kicker={t("listing.archiveKicker")}
                  title={t("listing.archiveTitle")}
                  desc={t("listing.archiveDesc")}
                />
              </Reveal>
              <div className="mt-8 md:mt-10">
                {archiveGroups.map((group, gi) => (
                  <Reveal key={group.label} delay={Math.min(gi * 50, 150)}>
                    <div className="lg:grid lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-12">
                      <p className="kicker pt-7 text-ink-faint lg:sticky lg:top-24 lg:self-start">
                        {group.label}
                      </p>
                      <div className="mt-2 lg:mt-0">
                        {group.items.map((article) => (
                          <ArticleRow key={article.slug} article={article} />
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          ) : null
        }
      />
    </div>
  );
}

function countLabel(n: number): string {
  return pluralBs(
    n,
    tf("listing.countOne", { n }),
    tf("listing.countFew", { n }),
    tf("listing.countMany", { n }),
  );
}
