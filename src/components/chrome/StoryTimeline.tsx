"use client";

import { useEffect, useRef, useState } from "react";

/**
 * STORY TIMELINE (ref1) — garis chapter di bawah: counter "03 / 09",
 * progress fill, dan dot yang bisa diklik untuk lompat chapter.
 * Menggantikan rail kiri: satu navigasi, sejajar bahasa storyboard.
 */
const CHAPTERS = [
  { id: "opening", label: "Opening" },
  { id: "tentang", label: "Identity" },
  { id: "berpikir", label: "Thinking" },
  { id: "technology-field", label: "Skills" },
  { id: "ai", label: "AI" },
  { id: "pkl-intro", label: "PKL" },
  { id: "karya", label: "Projects" },
  { id: "tumbuh", label: "Growth" },
  { id: "kontak", label: "Contact" },
];

/** Semua world → chapter terdekat (dunia PKL/refleksi menumpang chapter induk). */
const WORLD_CHAPTER: Record<string, number> = {
  opening: 0,
  tentang: 1, "bukan-stack": 1,
  berpikir: 2,
  "technology-field": 3,
  ai: 4, transisi: 4,
  "pkl-intro": 5, "pkl-apa": 5, "pkl-tujuan": 5, "pkl-aturan": 5, "pkl-tempat": 5,
  "pkl-people": 5, "pkl-hari": 5, "pkl-aktivitas": 5, "pkl-project": 5, "pkl-tantangan": 5,
  karya: 6,
  pelajaran: 7, tumbuh: 7, kembali: 7, "masa-depan": 7, ending: 7,
  kontak: 8,
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

    // Chapter aktif = dunia yang menempati tengah viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = (e.target as HTMLElement).id;
          const i = WORLD_CHAPTER[id];
          if (i !== undefined) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    document.querySelectorAll("[data-world], #kontak").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

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
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`tl-dot ${i <= active ? "lit" : ""}`}
              aria-label={`Ke ${c.label}`}
              aria-current={i === active ? "true" : undefined}
            >
              <span className="dot" />
              <span className="lbl">{c.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
