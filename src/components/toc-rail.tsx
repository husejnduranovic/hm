"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";
import type { TocItem } from "@/lib/content";
import { StarGlyph } from "@/components/pattern";

export function TocRail({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-100px 0px -66% 0px" },
    );
    headings.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={t("article.toc")}>
      <p className="kicker flex items-center gap-2 text-gold-600">
        <StarGlyph className="size-3" />
        {t("article.toc")}
      </p>
      <ul className="mt-4 space-y-0.5 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors",
                activeId === item.id
                  ? "border-gold-500 font-medium text-forest-800"
                  : "border-transparent text-ink-soft hover:text-ink",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
