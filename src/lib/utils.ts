import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const MONTHS_BS = [
  "januar",
  "februar",
  "mart",
  "april",
  "maj",
  "juni",
  "juli",
  "august",
  "septembar",
  "oktobar",
  "novembar",
  "decembar",
];

export function formatDateBs(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()}. ${MONTHS_BS[d.getMonth()]} ${d.getFullYear()}.`;
}

/** Bosanska množina: pluralBs(3, "tekst", "teksta", "tekstova") → "teksta" */
export function pluralBs(n: number, one: string, few: string, many: string): string {
  const m100 = Math.abs(n) % 100;
  const m10 = m100 % 10;
  if (m100 >= 11 && m100 <= 14) return many;
  if (m10 === 1) return one;
  if (m10 >= 2 && m10 <= 4) return few;
  return many;
}

/** Zamjena {n} i sličnih parametara u prevodima. */
export function tpl(text: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)),
    text,
  );
}

const DIACRITIC_MAP: Record<string, string> = {
  č: "c",
  ć: "c",
  ž: "z",
  š: "s",
  đ: "dj",
};

/**
 * Normalizacija za pretragu bez dijakritika:
 * "Kur'an i džemat" → "kur'an i dzemat"
 */
export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replaceAll("’", "'")
    .replace(/[čćžšđ]/g, (ch) => DIACRITIC_MAP[ch] ?? ch);
}

export function slugifyHeading(text: string): string {
  return normalizeText(text)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
