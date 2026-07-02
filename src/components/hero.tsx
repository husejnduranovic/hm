import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { t } from "@/lib/i18n";
import { formatDateBs, pluralBs, tf } from "@/lib/utils";
import type { ArticleMeta } from "@/lib/content";
import { ArchFrame, GeoPattern, StarGlyph } from "@/components/pattern";

export function Hero({
  featured,
  stats,
}: {
  featured: ArticleMeta;
  stats: { texts: number; cats: number; videos: number };
}) {
  const statItems = [
    { n: stats.texts, label: pluralBs(stats.texts, t("stats.textOne"), t("stats.textFew"), t("stats.textMany")) },
    { n: stats.cats, label: pluralBs(stats.cats, t("stats.catOne"), t("stats.catFew"), t("stats.catMany")) },
    { n: stats.videos, label: pluralBs(stats.videos, t("stats.videoOne"), t("stats.videoFew"), t("stats.videoMany")) },
  ];

  return (
    <section className="relative overflow-hidden bg-forest-950 text-paper">
      <GeoPattern id="hero-pat" className="absolute inset-0 text-gold-300 opacity-[0.05]" />
      <div
        aria-hidden
        className="absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(42,138,103,0.35) 0%, rgba(42,138,103,0) 70%)" }}
      />
      <div
        aria-hidden
        className="absolute -right-52 bottom-0 h-[40rem] w-[40rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(14,69,52,0.7) 0%, rgba(14,69,52,0) 70%)" }}
      />

      <div className="container-site relative grid items-center gap-14 py-16 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <p className="kicker flex items-center gap-2.5 text-gold-300">
            <StarGlyph className="size-3.5" />
            {t("hero.kicker")}
          </p>

          <h1 className="mt-6 font-display text-[2.6rem] font-medium leading-[1.06] tracking-tight md:text-6xl xl:text-[4.3rem]">
            {t("hero.titleA")}{" "}
            <em className="italic text-gold-300">{t("hero.titleEm")}</em>
          </h1>

          <p className="mt-7 max-w-[36rem] text-[1.05rem] leading-relaxed text-paper/70 md:text-lg">
            {t("hero.lede")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Link
              href="/tekstovi"
              className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-gold-400 px-7 text-[0.95rem] font-semibold text-forest-950 shadow-lg transition-colors hover:bg-gold-300"
            >
              {t("hero.ctaPrimary")}
              <ArrowRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/o-mezhebu"
              className="inline-flex h-13 items-center rounded-full px-7 text-[0.95rem] font-medium text-paper/90 ring-1 ring-paper/25 transition-all hover:bg-paper/5 hover:ring-paper/50"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </div>

          <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-5 border-t border-paper/10 pt-8">
            {statItems.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-medium text-gold-300">{s.n}</dd>
                <dd className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-paper/50">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden lg:block">
          <ArchFrame id="hero-arch" className="mx-auto w-full max-w-[400px] drop-shadow-2xl" />

          <div className="absolute -left-4 bottom-10 w-[300px] rounded-2xl bg-paper-card p-5 text-ink shadow-lift ring-1 ring-line xl:-left-8">
            <p className="kicker text-[0.62rem] text-gold-600">{t("hero.featuredLabel")}</p>
            <h2 className="mt-2.5 font-display text-[1.08rem] font-medium leading-snug">
              <Link
                href={`/tekstovi/${featured.slug}`}
                className="transition-colors after:absolute after:inset-0 hover:text-forest-800"
              >
                {featured.title}
              </Link>
            </h2>
            <p className="mt-3 flex items-center gap-3 text-xs text-ink-faint">
              <span>{formatDateBs(featured.date)}</span>
              <span aria-hidden className="size-1 rounded-full bg-gold-500" />
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden />
                {tf("article.readingTime", { n: featured.readingMinutes })}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
