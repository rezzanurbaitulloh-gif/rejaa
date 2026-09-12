"use client";

import { useEffect, useRef } from "react";
import { isCoarsePointer } from "@/lib/device";

/** PHASE 19 — Cursor = Lens. Desktop states, touch uses native. */
export default function CursorLens() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isCoarsePointer()) return;
    document.body.classList.add("lens-on");

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement | null;
      const mode = t?.closest?.("[data-cursor]")?.getAttribute("data-cursor");
      el.dataset.mode = mode ?? "dot";
      const label = el.querySelector("#lens-ring");
      if (label) {
        label.textContent =
          mode === "view" ? "VIEW ↗" : mode === "open" ? "OPEN ↗" : mode === "drag" ? "↔ DRAG" : mode === "next" ? "NEXT →" : mode === "project" ? "VIEW PROJECT" : "";
      }
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      el.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("lens-on");
    };
  }, []);

  return (
    <div id="lens" ref={ref} data-mode="dot" aria-hidden>
      <div id="lens-dot" />
      <div id="lens-ring" />
    </div>
  );
}
