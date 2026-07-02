import type { Metadata, Viewport } from "next";
import { Amiri, Fraunces, Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { t } from "@/lib/i18n";
import { siteConfig } from "@/data/site";
import { getArticleMetas, getCategoriesWithCounts } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "hanefijski mezheb",
    "fikh",
    "islamsko pravo",
    "Ebu Hanife",
    "ibadet",
    "Bosna i Hercegovina",
  ],
  openGraph: {
    type: "website",
    locale: "bs_BA",
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf6ed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchDocs = getArticleMetas().map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    categoryName: a.categoryName,
  }));
  const categories = getCategoriesWithCounts().map((c) => ({ slug: c.slug, name: c.name }));

  return (
    <html
      lang="bs"
      className={`${inter.variable} ${fraunces.variable} ${sourceSerif.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <a
          href="#glavni-sadrzaj"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest-800 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper"
        >
          {t("nav.skipToContent")}
        </a>
        <SiteHeader searchDocs={searchDocs} categories={categories} />
        <main id="glavni-sadrzaj" className="flex-1">
          {children}
        </main>
        <SiteFooter categories={categories} />
      </body>
    </html>
  );
}
