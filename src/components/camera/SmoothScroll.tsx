"use client";

import { useEffect } from "react";

/**
 * SCROLL = CAMERA — tanpa Lenis. ScrollTrigger scrub (scrub:1 di setiap
 * dunia) sudah memberi gerakan kamera yang buttery; virtual-scroll hanya
 * melawan scroll native (keyboard, scrollbar, anchor, scrollTo) dan
 * menyebabkan halaman terasa stuck. Scroll native = tidak pernah fight.
 * Anchor # ditangani smooth dengan hormat pada reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.style.scrollBehavior = reduced ? "auto" : "smooth";
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
