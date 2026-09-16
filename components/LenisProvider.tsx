"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/** Butter-smooth wheel physics + anchor navigation (spec: Lenis). */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: Lenis | null = null;
    let raf = 0;
    try {
      lenis = new Lenis({ anchors: true, lerp: 0.1, smoothWheel: true });
    } catch {
      return;
    }
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
  return <>{children}</>;
}
