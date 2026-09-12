"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * SCENE — satu waypoint dalam dunia kontinu (§27–§29).
 * Bukan section bertumpuk: lapisan transparan dengan SATU ide visual,
 * ruang negatif besar, dan safe-area teks. Fokus (opacity/blur) mengikuti
 * kedekatan viewport — tanpa pin, tanpa cut.
 */
export function Scene({
  stop,
  label,
  minH = "130svh",
  align = "left",
  children,
}: {
  /** Id stop kamera di universe (diukur otomatis). */
  stop: string;
  label: string;
  minH?: string;
  align?: "left" | "center" | "right";
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fokus = kedekatan ke tengah viewport: 0 jauh … 1 tepat.
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = r.top + r.height / 2;
      const dist = Math.abs(center - vh / 2) / (vh * 0.75);
      const f = Math.max(0, Math.min(1, 1 - dist));
      el.style.setProperty("--focus", f.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const justify = align === "center" ? "justify-center text-center" : align === "right" ? "justify-end text-right" : "justify-start";
  return (
    <section ref={ref} data-stop={stop} aria-label={label} className="scene-waypoint relative" style={{ minHeight: minH }}>
      <div className={`mx-auto flex min-h-[inherit] w-full max-w-6xl items-center px-6 md:px-10 ${justify}`}>
        <div className="scene-body w-full max-w-2xl py-24">{children}</div>
      </div>
    </section>
  );
}
