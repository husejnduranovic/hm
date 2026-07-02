"use client";

import { useEffect, useState } from "react";

/** Zlatna traka napretka čitanja uz gornji rub ekrana. */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document.documentElement;
        const max = el.scrollHeight - el.clientHeight;
        setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        className="h-full origin-left bg-gradient-to-r from-gold-600 via-gold-500 to-gold-300"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
