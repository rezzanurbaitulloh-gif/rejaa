"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** CAMERA DIVE — masuk ke dunia project: dari jauh/blur ke tajam, lalu pan antar blok. */
export function useProjectDive() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      // DIVE IN (satu-satunya enter transition — kehadiran kamera, bukan fade hiasan)
      gsap.fromTo("[data-dive]", { scale: 1.18, filter: "blur(10px)", opacity: 0.4 },
        { scale: 1, filter: "blur(0px)", opacity: 1, duration: 1.2, ease: "power3.out" });
      // Perjalanan antar blok: pan bergantian + pullback hasil
      gsap.utils.toArray<HTMLElement>("[data-leg]").forEach((leg, i) => {
        gsap.fromTo(leg, { x: i % 2 ? 40 : -40 }, {
          x: 0, ease: "none",
          scrollTrigger: { trigger: leg, start: "top bottom", end: "top 40%", scrub: 1 },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return root;
}
