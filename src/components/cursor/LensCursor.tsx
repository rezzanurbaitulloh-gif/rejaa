"use client";

import { useEffect, useRef } from "react";
import { useStory } from "@/lib/store";

const LABEL: Record<string, string> = {
  default: "",
  view: "VIEW",
  project: "EXPLORE",
  drag: "→",
  link: "OPEN ↗",
  external: "OPEN ↗",
};

const SIZE: Record<string, number> = {
  default: 12,
  view: 76,
  project: 104,
  drag: 88,
  link: 76,
  external: 76,
};

/** CURSOR = LENS. Dot → membesar dengan label sesuai konteks (VIEW/DRAG/OPEN).
 *  Selalu di-render (paritas SSR); visibility diatur CSS via media query. */
export function LensCursor() {
  const lens = useStory((s) => s.lens);
  const dot = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const cur = useRef({ x: -100, y: -100 });

  useEffect(() => {
    document.documentElement.classList.add("lens-cursor");
    let raf = 0;
    const move = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const loop = () => {
      // physical easing
      cur.current.x += (pos.current.x - cur.current.x) * 0.2;
      cur.current.y += (pos.current.y - cur.current.y) * 0.2;
      if (dot.current) {
        dot.current.style.transform = `translate(${cur.current.x}px, ${cur.current.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const size = SIZE[lens.state] ?? 12;
  return (
    <div id="lens" aria-hidden>
      <div ref={dot}>
        <div
          className="lens-ring"
          style={{ width: size, height: size }}
          data-lens-state={lens.state}
        >
          {lens.label || LABEL[lens.state] ? (
            <span className="lens-label">{lens.label || LABEL[lens.state]}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
