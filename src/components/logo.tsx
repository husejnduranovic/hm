import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="10.5" y="10.5" width="27" height="27" stroke="currentColor" strokeWidth="2.6" />
      <rect
        x="10.5"
        y="10.5"
        width="27"
        height="27"
        stroke="currentColor"
        strokeWidth="2.6"
        transform="rotate(45 24 24)"
      />
      <circle cx="24" cy="24" r="4" fill="#b8933b" />
    </svg>
  );
}

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${siteConfig.name} — početna`}
    >
      <LogoMark
        className={cn(
          "size-9 shrink-0 transition-transform duration-500 ease-out group-hover:rotate-45",
          dark ? "text-gold-300" : "text-forest-800",
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.18rem] font-semibold tracking-tight",
            dark ? "text-paper" : "text-ink",
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            "mt-1 hidden text-[0.6rem] font-medium uppercase tracking-[0.28em] sm:block",
            dark ? "text-paper/50" : "text-ink-faint",
          )}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  );
}
