"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { cn, normalizeText } from "@/lib/utils";
import { t } from "@/lib/i18n";
import { StarGlyph } from "@/components/pattern";

export type SearchDoc = {
  slug: string;
  title: string;
  excerpt: string;
  categoryName: string;
};

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-line bg-paper-card px-1.5 py-0.5 font-sans text-[0.62rem] font-medium">
      {children}
    </kbd>
  );
}

export function SearchDialog({
  open,
  onClose,
  docs,
}: {
  open: boolean;
  onClose: () => void;
  docs: SearchDoc[];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = normalizeText(query.trim());
    if (q.length < 2) return [];
    return docs
      .map((doc) => {
        const title = normalizeText(doc.title);
        let score = 0;
        if (title.includes(q)) score += title.startsWith(q) ? 5 : 3;
        if (normalizeText(doc.categoryName).includes(q)) score += 2;
        if (normalizeText(doc.excerpt).includes(q)) score += 1;
        return { doc, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.doc);
  }, [query, docs]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const select = (slug: string) => {
    onClose();
    router.push(`/tekstovi/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      select(results[active].slug);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80]"
      role="dialog"
      aria-modal="true"
      aria-label={t("search.title")}
      onKeyDown={handleKeyDown}
    >
      <div
        className="anim-fade-in absolute inset-0 bg-forest-950/45 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />
      <div className="anim-pop relative mx-auto mt-[10vh] w-[min(640px,92vw)] overflow-hidden rounded-2xl bg-paper-card shadow-dialog ring-1 ring-line">
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search className="size-4.5 shrink-0 text-ink-faint" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            aria-label={t("search.title")}
            className="h-14 w-full bg-transparent text-[1.02rem] text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <button
            onClick={onClose}
            className="rounded-md border border-line px-2 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-ink-faint transition-colors hover:text-ink"
          >
            Esc
          </button>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {query.trim().length < 2 ? (
            <div className="px-4 py-9 text-center">
              <StarGlyph className="mx-auto size-4 text-gold-500" />
              <p className="mt-3 text-sm text-ink-soft">{t("search.hint")}</p>
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-ink">
                <span className="font-medium">{t("search.empty")}</span> „{query}“
              </p>
              <p className="mt-2 text-sm text-ink-faint">{t("search.emptyHint")}</p>
              <Link
                href="/tekstovi"
                onClick={onClose}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-forest-700 transition-colors hover:text-forest-500"
              >
                {t("search.viewAll")}
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          ) : (
            <ul role="listbox" aria-label={t("search.title")}>
              {results.map((doc, i) => (
                <li key={doc.slug} role="option" aria-selected={i === active}>
                  <button
                    onClick={() => select(doc.slug)}
                    onMouseEnter={() => setActive(i)}
                    data-active={i === active}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors",
                      i === active && "bg-forest-100/80",
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-600">
                        {doc.categoryName}
                      </span>
                      <span className="mt-0.5 block truncate font-display text-[1.02rem] text-ink">
                        {doc.title}
                      </span>
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "size-4 shrink-0",
                        i === active ? "text-forest-700" : "text-ink-faint",
                      )}
                      aria-hidden
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="hidden items-center justify-between border-t border-line bg-paper px-5 py-2.5 text-[0.68rem] text-ink-faint sm:flex">
          <span className="flex gap-4">
            <span className="flex items-center gap-1.5">
              <Kbd>↑↓</Kbd> {t("search.navigate")}
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>Enter</Kbd> {t("search.open")}
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>Esc</Kbd> {t("search.close").toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
