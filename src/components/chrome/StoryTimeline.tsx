"use client";

import { useEffect, useRef, useState } from "react";

/**
 * STORY TIMELINE (ref1) — garis chapter di bawah: counter "03 / 09",
 * progress fill, dan dot yang bisa diklik untuk lompat chapter.
 * Menggantikan rail kiri: satu navigasi, sejajar bahasa storyboard.
 */
const CHAPTERS = [
  { id: "opening", label: "Opening" },
  { id: "identity", label: "Identity" },
  { id: "thinking", label: "Thinking" },
  { id: "tech", label: "Skills" },
  { id: "ai", label: "AI" },
  { id: "pkl", label: "PKL" },
  { id: "constellation", label: "Projects" },
  { id: "growth", label: "Growth" },
  { id: "kontak", label: "Contact" },
];

/** Setiap stop kamera → chapter terdekat (dunia PKL/refleksi menumpang induk). */
const STOP_CHAPTER: Record<string, number> = {
  opening: 0, hero: 0,
  identity: 1,
  thinking: 2,
  tech: 3,
  ai: 4, transition: 4,
  pkl: 5, pkl2: 5, pkl3: 5, routine: 5, project: 5,
  constellation: 6,
  growth: 7, ending: 7,
};

export function StoryTimeline() {
  const fill = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (fill.current) fill.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Chapter aktif = stop yang menempati tengah viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = (e.target as HTMLElement).dataset.stop;
          const i = id !== undefined ? STOP_CHAPTER[id] : undefined;
          if (i !== undefined) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    document.querySelectorAll("[data-stop]").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const jump = (id: string) => {
    const el = document.querySelector(`[data-stop="${id}"]`) ?? document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cur = CHAPTERS[Math.min(active, CHAPTERS.length - 1)];
  return (
    <div id="story-timeline" aria-hidden={false}>
      <div className="tl-inner">
        <div className="mb-2 flex items-baseline justify-between">
          <p className="eyebrow" aria-live="polite">
            {String(active + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")} — {cur.label}
          </p>
          <p className="monogram hidden text-[10px] text-faint sm:block">REZZA</p>
        </div>
        <div className="tl-track">
          <div ref={fill} className="tl-fill" style={{ transform: "scaleX(0)" }} />
        </div>
        <nav className="tl-dots" aria-label="Lompat chapter">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => jump(c.id)}
              className={`tl-dot ${i <= active ? "lit" : ""}`}
              aria-label={`Ke ${c.label}`}
              aria-current={i === active ? "true" : undefined}
            >
              <span className="dot" />
              <span className="lbl">{c.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
