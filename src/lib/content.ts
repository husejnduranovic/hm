import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import categoriesData from "@/data/categories.json";
import { slugifyHeading } from "@/lib/utils";

/**
 * Sloj sadržaja: tekstovi žive kao Markdown datoteke u /content/tekstovi.
 * Zamjena demo sadržaja stvarnim tekstovima = zamjena .md datoteka,
 * bez ikakvih izmjena u komponentama.
 *
 * Koristiti SAMO u server komponentama (čita datotečni sistem).
 */

export type CategoryMeta = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  colorDeep: string;
};

export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryName: string;
  author: string;
  date: string;
  featured: boolean;
  tags: string[];
  readingMinutes: number;
};

export type Article = ArticleMeta & { body: string };

export type TocItem = { id: string; text: string };

const CONTENT_DIR = path.join(process.cwd(), "content", "tekstovi");

export const categories = categoriesData as CategoryMeta[];

export function getCategory(slug: string): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug);
}

let cache: Article[] | null = null;

export function getArticles(): Article[] {
  if (cache && process.env.NODE_ENV === "production") return cache;

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  const articles = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);

    const categorySlug = String(data.category ?? "");
    const category = getCategory(categorySlug);
    const words = content.split(/\s+/).filter(Boolean).length;

    return {
      slug,
      title: String(data.title ?? slug),
      excerpt: String(data.excerpt ?? ""),
      category: categorySlug,
      categoryName: category?.name ?? categorySlug,
      author: String(data.author ?? "Redakcija"),
      date: String(data.date ?? "2026-01-01"),
      featured: Boolean(data.featured),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      readingMinutes: Math.max(1, Math.ceil(words / 190)),
      body: content.trim(),
    } satisfies Article;
  });

  articles.sort((a, b) => b.date.localeCompare(a.date));
  cache = articles;
  return articles;
}

export function getArticleMetas(): ArticleMeta[] {
  return getArticles().map(({ body: _body, ...meta }) => meta);
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

export function getFeaturedArticles(count = 3): Article[] {
  const all = getArticles();
  const featured = all.filter((a) => a.featured);
  const fill = all.filter((a) => !a.featured);
  return [...featured, ...fill].slice(0, count);
}

export function getRelatedArticles(slug: string, count = 3): ArticleMeta[] {
  const current = getArticle(slug);
  if (!current) return [];
  const rest = getArticleMetas().filter((a) => a.slug !== slug);
  const sameCategory = rest.filter((a) => a.category === current.category);
  const others = rest.filter((a) => a.category !== current.category);
  return [...sameCategory, ...others].slice(0, count);
}

export function getPrevNext(slug: string): {
  prev: ArticleMeta | null;
  next: ArticleMeta | null;
} {
  const all = getArticleMetas(); // sortirano od najnovijeg prema starijem
  const index = all.findIndex((a) => a.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: all[index + 1] ?? null, // stariji tekst
    next: all[index - 1] ?? null, // noviji tekst
  };
}

export type CategoryWithCount = CategoryMeta & { count: number };

export function getCategoriesWithCounts(): CategoryWithCount[] {
  const all = getArticles();
  return categories.map((c) => ({
    ...c,
    count: all.filter((a) => a.category === c.slug).length,
  }));
}

/** Izvlači ## naslove iz Markdown tijela za sadržaj (TOC). */
export function extractToc(body: string): TocItem[] {
  const matches = [...body.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((m) => {
    const text = m[1].trim();
    return { id: slugifyHeading(text), text };
  });
}
