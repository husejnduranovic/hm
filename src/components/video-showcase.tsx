"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { cn, formatDateBs } from "@/lib/utils";
import { t } from "@/lib/i18n";
import { StarGlyph } from "@/components/pattern";
import { VideoCover } from "@/components/covers";

export type Video = {
  id: string;
  title: string;
  lecturer: string;
  duration: string;
  date: string;
  series: string;
  featured: boolean;
};

/**
 * Video "prozor" — stilizovani player s demo sadržajem.
 * TODO(backend): zamijeniti overlay stvarnim embedom (YouTube/Vimeo/vlastiti CDN)
 * kada snimci budu dostupni; struktura podataka u videos.json je već spremna.
 */
export function VideoShowcase({
  videos,
  showAllLink = false,
}: {
  videos: Video[];
  showAllLink?: boolean;
}) {
  const [activeId, setActiveId] = useState(
    () => videos.find((v) => v.featured)?.id ?? videos[0]?.id,
  );
  const [playAttempted, setPlayAttempted] = useState(false);

  const active = videos.find((v) => v.id === activeId) ?? videos[0];
  if (!active) return null;

  const others = videos.filter((v) => v.id !== active.id);

  const switchTo = (id: string) => {
    setActiveId(id);
    setPlayAttempted(false);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
      <figure>
        <div className="group relative aspect-video overflow-hidden rounded-2xl shadow-lift ring-1 ring-paper/10">
          <VideoCover seed={active.id} />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-950/70 to-transparent"
          />

          {playAttempted ? (
            <div className="anim-fade-in absolute inset-0 grid place-items-center bg-forest-950/85 p-8 text-center backdrop-blur-sm">
              <div>
                <StarGlyph className="mx-auto size-5 text-gold-400" />
                <p className="mt-4 font-display text-2xl font-medium text-paper">
                  {t("video.soonTitle")}
                </p>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-paper/60">
                  {t("video.soonText")}
                </p>
                <button
                  onClick={() => setPlayAttempted(false)}
                  className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300 transition-colors hover:text-gold-200"
                >
                  {t("video.back")}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setPlayAttempted(true)}
              aria-label={`${t("video.featured")}: ${active.title}`}
              className="absolute inset-0 grid place-items-center"
            >
              <span className="grid size-16 place-items-center rounded-full bg-paper/95 text-forest-900 shadow-lift transition-transform duration-300 group-hover:scale-110 md:size-20">
                <Play className="size-7 translate-x-0.5 md:size-8" fill="currentColor" aria-hidden />
              </span>
            </button>
          )}

          <span className="absolute bottom-3.5 right-3.5 rounded-md bg-forest-950/85 px-2 py-1 text-[0.7rem] font-medium tabular-nums text-paper backdrop-blur-sm">
            {active.duration}
          </span>
        </div>

        <figcaption className="mt-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
            {t("video.series")}: {active.series}
          </span>
          <h3 className="mt-3 font-display text-xl font-medium text-paper md:text-2xl">
            {active.title}
          </h3>
          <p className="mt-1.5 text-sm text-paper/55">
            {active.lecturer} · {formatDateBs(active.date)}
          </p>
        </figcaption>
      </figure>

      <div className="flex flex-col">
        <p className="kicker mb-4 text-paper/45">{t("video.more")}</p>
        <div className="flex flex-col gap-2">
          {others.map((v) => (
            <button
              key={v.id}
              onClick={() => switchTo(v.id)}
              className="group flex gap-4 rounded-xl p-3 text-left transition-colors hover:bg-paper/5"
            >
              <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg ring-1 ring-paper/10">
                <VideoCover seed={v.id} />
                <span className="absolute inset-0 grid place-items-center bg-forest-950/30 opacity-0 transition-opacity group-hover:opacity-100">
                  <Play className="size-5 text-paper" fill="currentColor" aria-hidden />
                </span>
                <span className="absolute bottom-1 right-1 rounded bg-forest-950/85 px-1 py-0.5 text-[0.58rem] font-medium tabular-nums text-paper">
                  {v.duration}
                </span>
              </span>
              <span className="min-w-0">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-300/80">
                  {v.series}
                </span>
                <span className="mt-1 line-clamp-2 block text-sm font-medium leading-snug text-paper">
                  {v.title}
                </span>
                <span className="mt-1 block text-xs text-paper/50">{v.lecturer}</span>
              </span>
            </button>
          ))}
        </div>

        {showAllLink && (
          <Link
            href="/video"
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold-300 transition-colors hover:text-gold-200"
          >
            {t("sections.videoCta")}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}
