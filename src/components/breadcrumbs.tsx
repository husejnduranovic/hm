import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Navigacijski put">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight aria-hidden className="size-3.5 opacity-50" />}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-forest-700">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink-soft">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
