import type { MetadataRoute } from "next";
import { getArticleMetas } from "@/lib/content";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tekstovi`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/video`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/o-mezhebu`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = getArticleMetas().map((a) => ({
    url: `${base}/tekstovi/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...articleRoutes];
}
