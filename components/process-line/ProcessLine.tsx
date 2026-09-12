"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/lib/camera/scrollStore";

/**
 * PHASE 04 — Process Line: narrative spine.
 * Fixed full-viewport SVG. Draw segment is driven by GSAP scrub
 * (lineProgress = cameraProgress). Nodes activate in sequence:
 * node → draw → follow → pulse → settle → next.
 */
const NODES = [
  { id: "ide", label: "IDE", top: "6%" },
  { id: "proses", label: "PROSES", top: "26%" },
  { id: "pkl", label: "DUNIA NYATA", top: "55%" },
  { id: "karya", label: "KARYA", top: "74%" },
  { id: "lanjut", label: "TERUS", top: "93%" },
];

export default function ProcessLine() {
  const [, force] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      force((v) => (v + 1) % 1000000);
      raf = requestAnimationFrame(tick);
    };
    // lightweight node activation loop (~10fps is enough)
    let last = 0;
    const loop = (t: number) => {
      if (t - last > 120) {
        last = t;
        tick();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const p = scrollStore.progress;
  const activeIdx = p < 0.12 ? 0 : p < 0.4 ? 1 : p < 0.62 ? 2 : p < 0.85 ? 3 : 4;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-10 hidden md:block">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* faint full spine (destination hint) */}
        <path
          d="M 50 0 C 46 18, 54 30, 50 44 C 46 58, 54 70, 50 100"
          className="process-line-path"
          opacity={0.18}
        />
        {/* progressively drawn spine */}
        <path
          id="process-line-draw"
          d="M 50 0 C 46 18, 54 30, 50 44 C 46 58, 54 70, 50 100"
          className="process-line-glow"
          pathLength={2400}
        />
      </svg>
      {NODES.map((n, i) => (
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
  );
}
