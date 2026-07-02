import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { t } from "@/lib/i18n";
import { getArticleMetas, getCategoriesWithCounts, getFeaturedArticles } from "@/lib/content";
import videosData from "@/data/videos.json";
import aboutData from "@/data/about.json";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { ArticleCard } from "@/components/article-card";
import { ArticleRow } from "@/components/article-row";
import { CategoryCard } from "@/components/category-card";
import { QuoteBand } from "@/components/quote-band";
import { VideoShowcase, type Video } from "@/components/video-showcase";
import { GeoPattern, StarGlyph } from "@/components/pattern";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  const articles = getArticleMetas();
  const featured = getFeaturedArticles(3);
  const categories = getCategoriesWithCounts();
  const videos = videosData as Video[];
  const latest = articles.slice(0, 5);
  const timelinePreview = [0, 3, 5, 6].map((i) => aboutData.timeline[i]).filter(Boolean);

  return (
    <>
      <Hero
        featured={featured[0]}
        stats={{ texts: articles.length, cats: categories.length, videos: videos.length }}
      />

      {/* Izdvojeni tekstovi */}
      <section className="container-site py-18 md:py-24">
        <Reveal>
          <SectionHeading
            kicker={t("sections.featuredKicker")}
            title={t("sections.featuredTitle")}
            desc={t("sections.featuredDesc")}
            link={{ href: "/tekstovi", label: t("sections.viewAll") }}
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((article, i) => (
            <Reveal key={article.slug} delay={i * 80} className="h-full">
              <ArticleCard article={article} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      <QuoteBand />

      {/* Tematske cjeline */}
      <section className="container-site py-18 md:py-24">
        <Reveal>
          <SectionHeading
            kicker={t("sections.categoriesKicker")}
            title={t("sections.categoriesTitle")}
            desc={t("sections.categoriesDesc")}
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal key={category.slug} delay={i * 60} className="h-full">
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Najnoviji tekstovi */}
      <section className="border-t border-line bg-paper-deep/50">
        <div className="container-site py-18 md:py-24">
          <Reveal>
            <SectionHeading
              kicker={t("sections.latestKicker")}
              title={t("sections.latestTitle")}
              link={{ href: "/tekstovi", label: t("sections.viewAll") }}
            />
          </Reveal>
          <div className="mt-8">
            {latest.map((article, i) => (
              <Reveal key={article.slug} delay={i * 50}>
                <ArticleRow article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video predavanja */}
      <section className="relative overflow-hidden bg-forest-950">
        <GeoPattern id="home-video-pat" className="absolute inset-0 text-gold-300 opacity-[0.04]" />
        <div className="container-site relative py-18 md:py-24">
          <Reveal>
            <SectionHeading
              dark
              kicker={t("sections.videoKicker")}
              title={t("sections.videoTitle")}
              desc={t("sections.videoDesc")}
            />
          </Reveal>
          <div className="mt-12">
            <Reveal delay={100}>
              <VideoShowcase videos={videos} showAllLink />
            </Reveal>
          </div>
        </div>
      </section>

      {/* O mezhebu */}
      <section className="container-site grid gap-14 py-18 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal>
          <p className="kicker flex items-center gap-2.5 text-gold-600">
            <StarGlyph className="size-3" />
            {t("sections.aboutKicker")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
            {t("sections.aboutTitle")}
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">{t("sections.aboutText1")}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{t("sections.aboutText2")}</p>
          <Link
            href="/o-mezhebu"
            className="group mt-8 inline-flex h-12 items-center gap-2.5 rounded-full bg-forest-800 px-6 text-sm font-semibold text-paper transition-colors hover:bg-forest-700"
          >
            {t("sections.aboutCta")}
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <ol className="space-y-9 border-l-2 border-line pl-8">
            {timelinePreview.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[42px] grid size-5 place-items-center rounded-full bg-paper ring-2 ring-gold-500">
                  <StarGlyph className="size-2.5 text-gold-600" />
                </span>
                <p className="kicker text-gold-600">{item.year}</p>
                <h3 className="mt-1 font-display text-lg font-medium text-ink">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>
    </>
  );
}
