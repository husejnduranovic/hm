import { ChevronDown } from "lucide-react"
import { t } from "@/lib/i18n"
import type { TocItem } from "@/lib/content"
import { StarGlyph } from "@/components/pattern"

/**
 * Sklopivi sadržaj za uske ekrane (native <details>, bez JS) —
 * na dugim tekstovima jedina navigacija po poglavljima ispod lg.
 */
export function TocMobile({ items }: { items: TocItem[] }) {
  return (
    <details className="group rounded-2xl border border-line bg-paper-card px-5 py-4 lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
        <span className="kicker flex items-center gap-2 text-gold-600">
          <StarGlyph className="size-3" />
          {t("article.toc")}
        </span>
        <ChevronDown
          className="size-4 text-ink-faint transition-transform duration-300 group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <ol className="mt-4 space-y-1 border-t border-line pt-3">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex gap-3 rounded-lg px-2 py-1.5 text-[0.92rem] leading-snug text-ink-soft transition-colors hover:bg-paper-deep/60 hover:text-forest-800"
            >
              <span className="w-5 shrink-0 text-right text-[0.8rem] tabular-nums text-gold-600">
                {i + 1}.
              </span>
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  )
}
