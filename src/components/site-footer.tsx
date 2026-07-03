import Link from "next/link"
import { Mail, MapPin } from "lucide-react"
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/brand-icons"
import { t } from "@/lib/i18n"
import { siteConfig } from "@/data/site"
import { Logo } from "@/components/logo"
import { GeoPattern, StarGlyph } from "@/components/pattern"
import { NewsletterForm } from "@/components/newsletter-form"

const SOCIALS = [
  { icon: FacebookIcon, label: "Facebook", href: siteConfig.social.facebook },
  { icon: InstagramIcon, label: "Instagram", href: siteConfig.social.instagram },
  { icon: YoutubeIcon, label: "YouTube", href: siteConfig.social.youtube },
]

function FooterCol({
  title,
  links,
}: {
  title: string
  links: Array<{ href: string; label: string }>
}) {
  return (
    <div>
      <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-paper/80">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm text-paper/60 transition-colors hover:text-gold-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter({
  categories,
}: {
  categories: Array<{ slug: string; name: string }>
}) {
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-paper">
      <GeoPattern
        id="footer-pat"
        className="absolute inset-0 text-gold-300 opacity-[0.035]"
      />

      <div className="container-site relative">
        {/* Bilten */}
        <div className="grid gap-8 border-b border-paper/10 py-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="kicker flex items-center gap-2.5 text-gold-300">
              <StarGlyph className="size-3" />
              {t("newsletter.kicker")}
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium md:text-3xl">
              {t("newsletter.title")}
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/60">
              {t("newsletter.desc")}
            </p>
          </div>
          <div className="w-full max-w-md lg:justify-self-end">
            <NewsletterForm />
          </div>
        </div>

        {/* Kolone */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
              {t("footer.desc")}
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-paper/15 text-paper/60 transition-colors hover:border-gold-300 hover:text-gold-300"
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title={t("footer.nav")}
            links={[
              { href: "/", label: t("nav.pocetna") },
              { href: "/tekstovi", label: t("nav.tekstovi") },
              { href: "/video", label: t("nav.video") },
              { href: "/o-mezhebu", label: t("nav.oMezhebu") },
            ]}
          />

          <FooterCol
            title={t("footer.categories")}
            links={categories.map((c) => ({
              href: `/tekstovi?kategorija=${c.slug}`,
              label: c.name,
            }))}
          />

          <div>
            <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-paper/80">
              {t("footer.contact")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-paper/60">
              <li className="flex items-center gap-2.5">
                <Mail
                  className="size-4 shrink-0 text-gold-300/70"
                  aria-hidden
                />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-paper"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin
                  className="size-4 shrink-0 text-gold-300/70"
                  aria-hidden
                />
                {t("footer.location")}
              </li>
            </ul>
          </div>
        </div>

        {/* Dno */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-paper/10 py-7 text-xs text-paper/45 md:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {t("footer.rights")}
          </p>
          <p className="hidden text-paper/35 lg:block">
            {t("footer.madeWith")}
          </p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-paper/80">
              {t("footer.privacy")}
            </a>
            <a href="#" className="transition-colors hover:text-paper/80">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
