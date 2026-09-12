"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/lib/camera/scrollStore";

/**
 * §5 Process Line — narrative spine.
 * Rules: node appears → path draws → camera follows → pulse → settle → next.
 * NEVER a pre-rendered full line: only the drawn segment + active nodes exist.
 * lineProgress = cameraProgress (GSAP scrub in SmoothScroll).
 * Mobile (§17.6): dedicated vertical narrative line at left edge.
 */
export default function ProcessLine({ pklEnabled = true }: { pklEnabled?: boolean }) {
  const [, force] = useState(0);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      if (t - last > 140) {
        last = t;
        force((v) => (v + 1) % 1000000);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const nodes = [
    { id: "ide", label: "IDE", top: "6%" },
    { id: "proses", label: "PROSES", top: "26%" },
    ...(pklEnabled ? [{ id: "pkl", label: "DUNIA NYATA", top: "55%" }] : []),
    { id: "karya", label: "KARYA", top: "74%" },
    { id: "lanjut", label: "TERUS", top: "93%" },
  ];
  const p = scrollStore.progress;
  const cuts = pklEnabled ? [0.12, 0.4, 0.62, 0.85] : [0.15, 0.45, 0.85];
  const activeIdx = cuts.filter((c) => p >= c).length;

  return (
    <>
      {/* desktop ≥1280px: spatial S-spine, drawn segment only.
          Below 1280 the centered spine would collide with 560px safe text,
          so narrow viewports use the left-edge vertical line instead. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-10 hidden min-[1280px]:block">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            id="process-line-draw"
            d="M 50 0 C 46 18, 54 30, 50 44 C 46 58, 54 70, 50 100"
            className="process-line-glow"
            pathLength={2400}
          />
        </svg>
        {nodes.map((n, i) => (
          <div
            key={n.id}
            className="process-node absolute left-1/2 flex -translate-x-1/2 items-center gap-3"
            style={{ top: n.top }}
            data-active={i <= activeIdx}
          >
            <span className="node-ping absolute h-[9px] w-[9px] rounded-full border border-white/40" />
            <span className="node-dot" />
            <span className="text-[10px] tracking-[0.3em] text-white/60">{n.label}</span>
          </div>
        ))}
      </div>
      {/* narrow: vertical narrative line at left edge */}
      <div aria-hidden className="pointer-events-none fixed inset-y-0 left-[7px] z-10 w-px min-[1280px]:hidden">
        <div className="absolute inset-0 bg-white/10" />
        <div
          id="process-line-draw-mobile"
          className="absolute inset-x-0 top-0 bg-[#8ea2ff]/70"
          style={{ height: `${Math.round(p * 100)}%` }}
        />
        {nodes.map((n, i) => (
          <div
            key={n.id}
            className="process-node absolute -left-[3px] flex items-center gap-2"
            style={{ top: n.top }}
            data-active={i <= activeIdx}
          >
            <span className="node-dot mobile-dot" />
          </div>
        ))}
      </div>
    </>
  );
}
