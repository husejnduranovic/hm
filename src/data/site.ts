/**
 * Globalne postavke stranice.
 * NAPOMENA: `url` je privremena domena za demo — zamijeniti stvarnom pri lansiranju.
 */
export const siteConfig = {
  name: "Hanefijski mezheb",
  tagline: "Islamska pravna tradicija",
  description:
    "Tekstovi, video predavanja i odgovori iz hanefijskog fikha — jasno, pouzdano i na bosanskom jeziku. Stranica posvećena najstarijoj pravnoj školi ehli-sunneta.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hanefijski-mezheb.ba",
  domainLabel: "hanefijski-mezheb.ba",
  email: "info@hanefijski-mezheb.ba",
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
  },
} as const;

/** Kratke biografije autora (privremeni podaci za demo). */
export const authorBios: Record<string, string> = {
  "mr. Emin Karahodžić":
    "Magistar islamskih nauka. Piše o historiji mezheba i islamskoj pravnoj tradiciji Balkana.",
  "dr. Tarik Mulahalilović":
    "Doktor šerijatskog prava. Bavi se usuli-fikhom i primjenom klasične metodologije na savremena pitanja.",
  "hfz. Amina Spahić":
    "Hafiza i profesorica fikha. Autorica praktičnih vodiča kroz propise ibadeta.",
  Redakcija:
    "Uređivački tim stranice — priprema odgovore na pitanja čitalaca i prati nove objave.",
};
