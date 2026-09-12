"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/lib/camera/scrollStore";

/** HUD: progress tulang punggung + penanda chapter + skip intro (a11y). */
export default function Hud() {
  const [p, setP] = useState(0);
  const [scene, setScene] = useState("opening");

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      if (t - last > 150) {
        last = t;
        setP(scrollStore.progress);
        setScene(scrollStore.scene);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <a
        href="#isi"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Lewati intro — langsung ke isi
      </a>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[var(--gutter)] py-5 mix-blend-difference">
        <a href="#opening" className="text-[12px] font-bold tracking-[0.34em] text-white" data-cursor="next">
          DALAM PROSES
        </a>
        <p className="hidden text-[11px] tracking-[0.3em] text-white/70 uppercase sm:block" aria-live="polite">
          {scene}
        </p>
        <p className="text-[11px] tracking-[0.3em] text-white/70 tabular-nums" aria-hidden>
          {String(Math.round(p * 100)).padStart(2, "0")} / 100
        </p>
      </header>
      <div className="fixed inset-x-0 top-0 z-40 h-px bg-white/10" aria-hidden>
        <div className="h-full bg-white/70" style={{ width: `${p * 100}%` }} />
      </div>
    </>
  );
}
