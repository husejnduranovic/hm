import type { Metadata } from "next";
import { t } from "@/lib/i18n";
import { getArticleMetas, getCategoriesWithCounts } from "@/lib/content";
import { ArticlesExplorer } from "@/components/articles-explorer";
import { GeoPattern, StarGlyph } from "@/components/pattern";

export const metadata: Metadata = {
  title: t("listing.title"),
  description: t("listing.desc"),
  alternates: { canonical: "/tekstovi" },
};

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

  return (
    <div>
      <header className="relative overflow-hidden border-b border-line bg-paper-deep/70">
        <GeoPattern id="listing-pat" className="absolute inset-0 text-gold-600 opacity-[0.04]" />
        <div className="container-site relative py-14 md:py-18">
          <p className="kicker flex items-center gap-2.5 text-gold-600">
            <StarGlyph className="size-3" />
            {t("listing.kicker")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
            {t("listing.title")}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{t("listing.desc")}</p>
        </div>
      </header>

      <ArticlesExplorer
        key={`${q}|${kategorija}`}
        articles={articles}
        categories={categories}
        initialQuery={q}
        initialCategory={kategorija}
      />
    </div>
  );
}
