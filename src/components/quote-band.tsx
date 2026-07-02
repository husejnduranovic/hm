import { t } from "@/lib/i18n";
import { GeoPattern } from "@/components/pattern";

export function QuoteBand() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-paper-deep">
      <GeoPattern id="quote-pat" className="absolute inset-0 text-gold-600 opacity-[0.05]" />
      <div className="container-site relative py-16 text-center md:py-20">
        <div className="mx-auto max-w-3xl">
          <p dir="rtl" lang="ar" className="font-arabic text-2xl leading-relaxed text-forest-800/90 md:text-[1.8rem]">
            الْفِقْهُ مَعْرِفَةُ النَّفْسِ مَا لَهَا وَمَا عَلَيْهَا
          </p>
          <blockquote className="mt-6 font-display text-[1.55rem] italic leading-snug text-ink md:text-[1.9rem]">
            „{t("quote.text")}“
          </blockquote>
          <div className="mt-7 flex items-center justify-center gap-4">
            <span aria-hidden className="h-px w-10 bg-gold-500/60" />
            <cite className="kicker not-italic text-gold-700">{t("quote.author")}</cite>
            <span aria-hidden className="h-px w-10 bg-gold-500/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
