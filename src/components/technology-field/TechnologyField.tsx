"use client";

import { useEffect, useMemo, useRef } from "react";
import { useChoreo, useDeviceTier, useReducedMotion } from "@/lib/device";
import { useContent } from "@/components/story/StoryProvider";

/**
 * TECHNOLOGY FIELD — field atmosferik, BUKAN skill wall.
 * Logo adalah material yang menemani perjalanan: floating, slow drift,
 * depth-based opacity, ambient halo. Bukan neon, bukan bouncing sinkron.
 */
export function TechnologyField({ compact = false }: { compact?: boolean }) {
  const { tech } = useContent();
  const tier = useDeviceTier();
  const choreo = useChoreo();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    const list = tech.filter((t) => t.in_field);
    const max = choreo === "mobile" ? 8 : tier === "low" ? 8 : tier === "medium" ? 16 : 24;
    return list.slice(0, Math.min(list.length, compact ? Math.min(8, max) : max));
  }, [tech, tier, choreo, compact]);

  useEffect(() => {
    if (reduced || !ref.current) return;
    let raf = 0;
    const t0 = performance.now();
    const els = Array.from(ref.current.querySelectorAll("[data-drift]")) as HTMLElement[];
    const loop = (t: number) => {
      const s = (t - t0) / 1000;
      els.forEach((el, i) => {
        const depth = Number(el.dataset.depth ?? 0.5);
        const speed = choreo === "mobile" ? 0.12 : 0.22;
        const y = Math.sin(s * speed + i * 1.7) * (10 + depth * 14);
        const x = Math.cos(s * speed * 0.7 + i * 2.3) * (6 + depth * 10);
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, choreo, items.length]);

  return (
    <div ref={ref} className="relative" aria-label="Technology field">
      <div className="tech-halo" aria-hidden />
      <ul className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {items.map((t, i) => {
          const depth = 0.25 + ((i * 37) % 70) / 100;
          return (
            <li
              key={t.id}
              data-drift
              data-depth={depth.toFixed(2)}
              className="tech-chip px-4 py-3 text-center"
              style={{ opacity: 0.55 + depth * 0.45 }}
            >
              <p className="font-display text-sm font-bold tracking-tight">{t.name}</p>
              <p className="mt-1 max-w-44 text-[11px] leading-snug text-muted">{t.usage}</p>
              <p className="chapter-label mt-2">{t.category}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
