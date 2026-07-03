"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { t } from "@/lib/i18n"

/** Plutajuće dugme "na vrh" — pojavljuje se nakon dubljeg skrolanja dugih tekstova. */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.5)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <button
      onClick={toTop}
      aria-label={t("article.backToTop")}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-6 right-5 z-40 grid size-11 place-items-center rounded-full bg-paper-card text-ink-soft shadow-lift ring-1 ring-line transition-all duration-300 hover:text-forest-800 hover:ring-gold-300 md:bottom-8 md:right-8",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="size-5" aria-hidden />
    </button>
  )
}
