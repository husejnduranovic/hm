import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  Landmark,
  MessagesSquare,
  Moon,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";
import { pluralBs } from "@/lib/utils";
import type { CategoryWithCount } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  moon: Moon,
  scale: Scale,
  users: Users,
  landmark: Landmark,
  compass: Compass,
  messages: MessagesSquare,
};

export function CategoryCard({ category }: { category: CategoryWithCount }) {
  const Icon = ICONS[category.icon] ?? Compass;

  return (
    <Link
      href={`/tekstovi?kategorija=${category.slug}`}
      className="group relative flex flex-col gap-4 rounded-2xl bg-paper-card p-6 shadow-card ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-gold-300"
    >
      <span
        className="inline-flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: `${category.color}1c`, color: category.colorDeep }}
      >
        <Icon className="size-5" aria-hidden />
      </span>

      <span className="flex items-start justify-between gap-3">
        <span className="font-display text-[1.15rem] font-medium text-ink transition-colors group-hover:text-forest-800">
          {category.name}
        </span>
        <ArrowUpRight
          className="mt-1 size-4 shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-600"
          aria-hidden
        />
      </span>

      <span className="-mt-2.5 text-sm leading-relaxed text-ink-soft">{category.description}</span>

      <span className="mt-auto pt-1 text-xs font-medium text-ink-faint">
        {category.count} {pluralBs(category.count, "tekst", "teksta", "tekstova")}
      </span>
    </Link>
  );
}
