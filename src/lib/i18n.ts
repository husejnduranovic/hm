import bs from "@/messages/bs.json";
import { tpl } from "@/lib/utils";

/**
 * Minimalni i18n sloj: svi UI stringovi žive u src/messages/bs.json.
 * Za buduće jezike (arapski, engleski) dodati messages/<lang>.json
 * i proširiti ovu funkciju odabirom aktivnog jezika.
 */
export function t(path: string): string {
  const value = path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined,
      bs,
    );
  return typeof value === "string" ? value : path;
}

/** t() s parametrima: tf("article.readingTime", { n: 7 }) */
export function tf(path: string, vars: Record<string, string | number>): string {
  return tpl(t(path), vars);
}
