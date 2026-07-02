import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { t } from "@/lib/i18n";
import aboutData from "@/data/about.json";
import { Prose } from "@/components/prose";
import { SectionHeading } from "@/components/section-heading";
import { GeoPattern, StarGlyph } from "@/components/pattern";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: t("aboutPage.title"),
  description: t("sections.aboutText1"),
  alternates: { canonical: "/o-mezhebu" },
};

export default function OMezhebuPage() {
  return (
    <div>
      <header className="relative overflow-hidden border-b border-line bg-paper-deep/70">
        <GeoPattern id="about-pat" className="absolute inset-0 text-gold-600 opacity-[0.04]" />
        <div className="container-site relative py-14 md:py-18">
          <p className="kicker flex items-center gap-2.5 text-gold-600">
            <StarGlyph className="size-3" />
            {t("aboutPage.kicker")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
            {t("aboutPage.title")}
          </h1>
        </div>
      </header>

      {/* Uvod + činjenice */}
      <section className="container-site grid gap-12 py-14 md:py-18 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <Prose markdown={aboutData.intro.join("\n\n")} className="max-w-[44rem]" />

        <aside>
          <div className="sticky top-24 rounded-2xl bg-paper-card p-6 shadow-card ring-1 ring-line">
            <p className="kicker flex items-center gap-2 text-gold-600">
              <StarGlyph className="size-3" />
              {t("aboutPage.factsTitle")}
            </p>
            <dl className="mt-5 space-y-4">
              {aboutData.facts.map((fact) => (
                <div key={fact.label} className="border-b border-line pb-4 last:border-0 last:pb-0">
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-[0.95rem] font-medium leading-snug text-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>

      {/* Izvori i metod */}
      <section className="border-y border-line bg-paper-deep/60 py-16 md:py-20">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              kicker={t("aboutPage.principlesKicker")}
              title={t("aboutPage.principlesTitle")}
              desc={t("aboutPage.principlesDesc")}
            />
          </Reveal>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {aboutData.principles.map((principle, i) => (
              <li key={principle.title}>
                <Reveal delay={i * 60} className="h-full">
                  <div className="h-full rounded-2xl bg-paper-card p-6 shadow-card ring-1 ring-line">
                    <span className="font-display text-3xl font-medium text-gold-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-medium text-ink">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{principle.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Vremenska linija */}
      <section className="container-site py-16 md:py-20">
        <SectionHeading
          kicker={t("aboutPage.timelineKicker")}
          title={t("aboutPage.timelineTitle")}
          center
        />
        <ol className="relative mx-auto mt-14 max-w-2xl space-y-11 border-l-2 border-line pl-10">
          {aboutData.timeline.map((item, i) => (
            <li key={item.year} className="relative">
              <Reveal delay={i * 40}>
                <span className="absolute -left-[53px] top-0.5 grid size-6 place-items-center rounded-full bg-paper ring-2 ring-gold-500">
                  <StarGlyph className="size-3 text-gold-600" />
                </span>
                <p className="kicker text-gold-600">{item.year}</p>
                <h3 className="mt-1.5 font-display text-xl font-medium text-ink">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Česta pitanja */}
      <section className="border-t border-line">
        <div className="container-site py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionHeading kicker={t("aboutPage.faqKicker")} title={t("aboutPage.faqTitle")} center />
            <div className="mt-10">
              {aboutData.faq.map((item) => (
                <details key={item.q} className="group border-b border-line py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-display text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDown
                      className="size-5 shrink-0 text-gold-600 transition-transform duration-300 group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-3 max-w-[42rem] leading-relaxed text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Poziv */}
      <section className="relative overflow-hidden bg-forest-950">
        <GeoPattern id="about-cta-pat" className="absolute inset-0 text-gold-300 opacity-[0.045]" />
        <div className="container-site relative py-16 text-center md:py-20">
          <h2 className="font-display text-3xl font-medium text-paper md:text-4xl">
            {t("aboutPage.ctaTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-paper/65">
            {t("aboutPage.ctaText")}
          </p>
          <Link
            href="/tekstovi"
            className="group mt-9 inline-flex h-13 items-center gap-2.5 rounded-full bg-gold-400 px-8 text-[0.95rem] font-semibold text-forest-950 transition-colors hover:bg-gold-300"
          >
            {t("aboutPage.ctaButton")}
            <ArrowRight
              className="size-4.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
