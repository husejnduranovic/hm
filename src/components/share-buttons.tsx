"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FacebookIcon, XIcon } from "@/components/brand-icons";
import { t } from "@/lib/i18n";

const CIRCLE =
  "grid size-10 place-items-center rounded-full text-ink-soft ring-1 ring-line transition-all hover:text-forest-800 hover:ring-gold-400";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // clipboard nedostupan — ignoriši
    }
  };

  const openShare = (template: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(
      template.replace("{u}", url).replace("{t}", text),
      "_blank",
      "noopener,noreferrer,width=640,height=520",
    );
  };

  return (
    <div className="flex items-center gap-2.5">
      <button onClick={copy} aria-label={t("article.copyLink")} className={CIRCLE}>
        {copied ? (
          <Check className="size-4 text-forest-600" aria-hidden />
        ) : (
          <Link2 className="size-4" aria-hidden />
        )}
      </button>
      <button
        onClick={() => openShare("https://www.facebook.com/sharer/sharer.php?u={u}")}
        aria-label="Podijeli na Facebooku"
        className={CIRCLE}
      >
        <FacebookIcon className="size-4" />
      </button>
      <button
        onClick={() => openShare("https://x.com/intent/post?url={u}&text={t}")}
        aria-label="Podijeli na X-u"
        className={CIRCLE}
      >
        <XIcon className="size-3.5" />
      </button>
      <span
        aria-live="polite"
        className="min-w-0 text-xs font-medium text-forest-700"
      >
        {copied ? t("article.copied") : ""}
      </span>
    </div>
  );
}
