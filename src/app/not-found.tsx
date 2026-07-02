import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { t } from "@/lib/i18n";
import { GeoPattern, StarGlyph } from "@/components/pattern";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <GeoPattern id="nf-pat" className="absolute inset-0 text-gold-600 opacity-[0.04]" />
      <div className="container-site relative flex flex-col items-center py-28 text-center md:py-36">
        <StarGlyph className="size-9 text-gold-500/70" />
        <p className="kicker mt-7 text-gold-600">{t("notFound.kicker")}</p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
          {t("notFound.title")}
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-ink-soft">{t("notFound.text")}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          <Link
            href="/"
            className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-forest-800 px-7 text-sm font-semibold text-paper transition-colors hover:bg-forest-700"
          >
            {t("notFound.cta")}
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
          <Link
            href="/tekstovi"
            className="inline-flex h-12 items-center rounded-full px-7 text-sm font-medium text-ink ring-1 ring-line transition-all hover:ring-gold-400"
          >
            {t("notFound.ctaSearch")}
          </Link>
        </div>
      </div>
    </section>
  );
}
