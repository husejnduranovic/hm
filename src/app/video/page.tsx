import type { Metadata } from "next";
import { t } from "@/lib/i18n";
import videosData from "@/data/videos.json";
import { VideoShowcase, type Video } from "@/components/video-showcase";
import { GeoPattern, StarGlyph } from "@/components/pattern";

export const metadata: Metadata = {
  title: t("video.pageTitle"),
  description: t("video.pageDesc"),
  alternates: { canonical: "/video" },
};

export default function VideoPage() {
  const videos = videosData as Video[];

  return (
    <div>
      <header className="relative overflow-hidden border-b border-line bg-paper-deep/70">
        <GeoPattern id="video-page-pat" className="absolute inset-0 text-gold-600 opacity-[0.04]" />
        <div className="container-site relative py-14 md:py-18">
          <p className="kicker flex items-center gap-2.5 text-gold-600">
            <StarGlyph className="size-3" />
            {t("video.pageKicker")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
            {t("video.pageTitle")}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{t("video.pageDesc")}</p>
        </div>
      </header>

      <section className="relative overflow-hidden bg-forest-950">
        <GeoPattern id="video-dark-pat" className="absolute inset-0 text-gold-300 opacity-[0.04]" />
        <div className="container-site relative py-14 md:py-20">
          <VideoShowcase videos={videos} />
        </div>
      </section>
    </div>
  );
}
