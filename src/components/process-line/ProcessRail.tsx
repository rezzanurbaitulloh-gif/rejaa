"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * PROCESS LINE = VISUAL SPINE. Dot → line → path → nodes → branches → memory → point.
 * Digambar oleh scroll global (scrub): spine 0→1, cabang AI (0.30–0.44),
 * cabang PKL (0.46–0.60), arc karya (0.62–0.78). Node menyala saat terlewati.
 */
const NODES = [
  { at: 0.03, label: "Titik awal", target: "opening" },
  { at: 0.18, label: "Identitas", target: "tentang" },
  { at: 0.3, label: "Proses", target: "berpikir" },
  { at: 0.4, label: "Second mind", target: "ai" },
  { at: 0.54, label: "Dunia nyata", target: "pkl-intro" },
  { at: 0.68, label: "Karya", target: "karya" },
  { at: 0.84, label: "Tumbuh", target: "tumbuh" },
  { at: 0.96, label: "Titik kembali", target: "ending" },
];

export function ProcessRail() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const paths = Array.from(el.querySelectorAll<SVGPathElement>("[data-draw]"));
    const prep = () => {
      for (const p of paths) {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      }
    };
    const paint = (p: number) => {
      const set = (sel: string, from: number, to: number) => {
        const local = Math.min(1, Math.max(0, (p - from) / (to - from)));
        el.querySelectorAll<SVGPathElement>(`[data-draw="${sel}"]`).forEach((path) => {
          const len = path.getTotalLength();
          path.style.strokeDashoffset = `${len * (1 - local)}`;
        });
      };
      set("spine", 0, 1);
      set("branch-ai", 0.3, 0.44);
      set("branch-pkl", 0.46, 0.6);
      set("arc-work", 0.62, 0.78);
      el.querySelectorAll<HTMLElement>("[data-node]").forEach((n) => {
        n.classList.toggle("lit", p >= Number(n.dataset.at ?? 1));
      });
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      prep();
      paint(1);
      return;
    }
    prep();
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: "max",
      scrub: 0.6,
      onUpdate: (self) => paint(self.progress),
    });
    return () => {
      st.kill();
    };
  }, []);

  return (
    <div ref={root} id="process-rail" aria-hidden>
      <svg className="rail-svg" viewBox="0 0 80 1000" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="spine-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5f1ea" />
            <stop offset="100%" stopColor="#2b5cff" />
          </linearGradient>
        </defs>
        <path data-draw="spine" d="M40 0 C 46 200, 34 400, 40 600 C 44 760, 38 880, 40 1000"
          fill="none" stroke="url(#spine-g)" strokeWidth="2" />
        <path data-draw="branch-ai" d="M40 330 C 56 344, 66 360, 74 392"
          fill="none" stroke="#2b5cff" strokeWidth="1.5" opacity="0.8" />
        <path data-draw="branch-pkl" d="M40 500 C 54 514, 62 532, 68 566"
          fill="none" stroke="rgba(245,241,234,0.7)" strokeWidth="1.5" />
        <path data-draw="arc-work" d="M40 680 C 62 696, 62 748, 40 776"
          fill="none" stroke="#2b5cff" strokeWidth="1.5" opacity="0.8" />
      </svg>
      {NODES.map((n) => (
        <button
          key={n.label}
          type="button"
          data-node
          data-at={n.at}
          title={n.label}
          aria-label={`Lompat ke ${n.label}`}
          className="rail-node"
          style={{ top: `${n.at * 100}%` }}
          onClick={() => document.getElementById(n.target)?.scrollIntoView({ behavior: "smooth", block: "start" })}
        />
      ))}
      <style>{`.rail-node.lit{background:var(--color-accent);border-color:var(--color-accent);box-shadow:0 0 16px 2px rgba(43,92,255,.6)}`}</style>
    </div>
  );
}
