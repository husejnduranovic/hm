"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { t } from "@/lib/i18n";

/**
 * Prijava na bilten — samo UI (demo).
 * TODO(backend): povezati na servis za slanje biltena (POST /api/bilten).
 */
export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("done");
  };

  return (
    <div>
      {status === "done" ? (
        <p className="flex items-center gap-2.5 rounded-2xl border border-gold-300/30 bg-paper/5 px-5 py-4 text-sm text-gold-200">
          <CheckCircle2 className="size-5 shrink-0 text-gold-300" aria-hidden />
          {t("newsletter.success")}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-2.5 sm:flex-row">
          <label htmlFor="bilten-email" className="sr-only">
            {t("newsletter.placeholder")}
          </label>
          <input
            id="bilten-email"
            type="email"
            required
            placeholder={t("newsletter.placeholder")}
            className="h-12 flex-1 rounded-full border border-paper/20 bg-paper/10 px-5 text-sm text-paper placeholder:text-paper/40 transition-colors focus:border-gold-300 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="h-12 shrink-0 rounded-full bg-gold-400 px-6 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
          >
            {status === "loading" ? "Šaljemo…" : t("newsletter.button")}
          </button>
        </form>
      )}
      <p className="mt-3 text-xs text-paper/40">{t("newsletter.privacy")}</p>
    </div>
  );
}
