import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarGlyph } from "@/components/pattern";

export function SectionHeading({
  kicker,
  title,
  desc,
  link,
  dark = false,
  center = false,
  className,
}: {
  kicker?: string;
  title: string;
  desc?: string;
  link?: { href: string; label: string };
  dark?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "text-center", className)}>
      {kicker && (
        <p
          className={cn(
            "kicker flex items-center gap-2.5",
            center && "justify-center",
            dark ? "text-gold-300" : "text-gold-600",
          )}
        >
          <StarGlyph className="size-3" />
          {kicker}
        </p>
      )}
      <div
        className={cn(
          "mt-3 flex flex-wrap items-end gap-x-8 gap-y-3",
          center ? "justify-center" : "justify-between",
        )}
      >
        <h2
          className={cn(
            "font-display text-3xl font-medium tracking-tight md:text-4xl",
            dark ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </h2>
        {link && (
          <Link
            href={link.href}
            className={cn(
              "group inline-flex items-center gap-1.5 pb-1.5 text-sm font-medium transition-colors",
              dark ? "text-gold-300 hover:text-gold-200" : "text-forest-700 hover:text-forest-500",
            )}
          >
            {link.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
      {desc && (
        <p
          className={cn(
            "mt-3 max-w-2xl leading-relaxed",
            center && "mx-auto",
            dark ? "text-paper/65" : "text-ink-soft",
          )}
        >
          {desc}
        </p>
      )}
    </div>
  );
}
