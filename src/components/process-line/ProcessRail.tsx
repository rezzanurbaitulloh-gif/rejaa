"use client";

import { useEffect, useRef } from "react";

/** PROCESS LINE = NARRATIVE THREAD. Rail kiri: dot → line → nodes per chapter. */
const NODES = [
  { at: 0.04, scene: "opening" },
  { at: 0.16, scene: "tentang" },
  { at: 0.28, scene: "berpikir" },
  { at: 0.38, scene: "ai" },
  { at: 0.5, scene: "pkl" },
  { at: 0.66, scene: "karya" },
  { at: 0.82, scene: "tumbuh" },
  { at: 0.95, scene: "ending" },
];

export function ProcessRail() {
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="process-rail" aria-hidden>
      <div className="rail-track" />
      <div ref={fill} className="rail-fill" style={{ height: "100%", transform: "scaleY(0)" }} />
      {NODES.map((n, i) => (
        <span
          key={n.scene}
          data-rail-node={i}
          className="rail-node"
          style={{ top: `${n.at * 100}%` }}
        />
      ))}
    </div>
  );
}
