"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";
import { Logo } from "@/components/logo";
import { GeoPattern } from "@/components/pattern";
import { SearchDialog, type SearchDoc } from "@/components/search-dialog";

const NAV = [
  { href: "/", key: "nav.pocetna" },
  { href: "/tekstovi", key: "nav.tekstovi" },
  { href: "/video", key: "nav.video" },
  { href: "/o-mezhebu", key: "nav.oMezhebu" },
] as const;

type CategoryLink = { slug: string; name: string };

export function SiteHeader({
  searchDocs,
  categories,
}: {
  searchDocs: SearchDoc[];
  categories: CategoryLink[];
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Zatvori mobilni meni pri promjeni rute
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-line bg-paper/90 shadow-[0_2px_24px_-12px_rgb(33_43_38/0.25)] backdrop-blur-md"
            : "border-transparent bg-paper/75 backdrop-blur-sm",
        )}
      >
        <div className="container-site flex h-16 items-center justify-between gap-4 md:h-[74px]">
          <Logo />

          <nav aria-label="Glavna navigacija" className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-forest-100 text-forest-900"
                    : "text-ink-soft hover:bg-ink/5 hover:text-ink",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden h-10 items-center gap-2 rounded-full border border-line bg-paper-card px-4 text-sm text-ink-soft shadow-sm transition-all hover:border-gold-400 hover:text-ink sm:inline-flex"
            >
              <Search className="size-4" aria-hidden />
              <span>{t("nav.pretraga")}</span>
              <kbd className="ml-1 hidden rounded border border-line bg-paper px-1.5 py-0.5 text-[0.62rem] font-medium text-ink-faint lg:inline-block">
                Ctrl K
              </kbd>
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t("nav.pretraga")}
              className="grid size-10 place-items-center rounded-full border border-line bg-paper-card text-ink-soft transition-colors hover:text-ink sm:hidden"
            >
              <Search className="size-4.5" aria-hidden />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label={t("nav.otvoriMeni")}
              className="grid size-10 place-items-center rounded-full border border-line bg-paper-card text-ink-soft transition-colors hover:text-ink md:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <MobileMenu
          categories={categories}
          onClose={() => setMobileOpen(false)}
          onSearch={() => setSearchOpen(true)}
        />
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} docs={searchDocs} />
    </header>
  );
}

function MobileMenu({
  categories,
  onClose,
  onSearch,
}: {
  categories: CategoryLink[];
  onClose: () => void;
  onSearch: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="anim-fade-in fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-forest-950 text-paper md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Meni"
    >
      <GeoPattern id="mobile-menu-pat" className="absolute inset-0 text-gold-300 opacity-[0.04]" />

      <div className="relative flex items-center justify-between px-5 py-3.5">
        <Logo dark />
        <button
          onClick={onClose}
          aria-label={t("nav.zatvoriMeni")}
          className="grid size-10 place-items-center rounded-full border border-paper/20 text-paper/80 transition-colors hover:border-gold-300 hover:text-gold-300"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <nav className="relative mt-6 flex flex-col px-5" aria-label="Mobilna navigacija">
        {NAV.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="anim-fade-up border-b border-paper/10 py-4 font-display text-3xl text-paper/90 transition-colors hover:text-gold-300"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {t(item.key)}
          </Link>
        ))}
      </nav>

      <div className="anim-fade-up relative mt-9 px-5" style={{ animationDelay: "280ms" }}>
        <p className="kicker text-paper/40">{t("nav.menuCategories")}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/tekstovi?kategorija=${c.slug}`}
              onClick={onClose}
              className="rounded-full border border-paper/20 px-4 py-2 text-sm text-paper/80 transition-colors hover:border-gold-300 hover:text-gold-300"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="anim-fade-up relative mt-auto px-5 pb-8 pt-12" style={{ animationDelay: "340ms" }}>
        <button
          onClick={() => {
            onClose();
            onSearch();
          }}
          className="flex w-full items-center gap-3 rounded-full border border-paper/20 px-5 py-3.5 text-sm text-paper/70 transition-colors hover:border-gold-300 hover:text-gold-300"
        >
          <Search className="size-4.5" aria-hidden />
          {t("search.placeholder")}
        </button>
      </div>
    </div>
  );
}
