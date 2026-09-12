"use client";

import { useRef } from "react";
import { CameraWorld } from "@/components/camera/CameraWorld";
import type { Move } from "@/components/camera/cameraRig";
import { PhotoPanel } from "@/components/media/PhotoPanel";

/**
 * FRAME 5 — CARA SAYA BERPIKIR: diagram IDE (oval) + 4 node
 * (MASALAH/KEBUTUHAN/KEMUNGKINAN/SOLUSI). Kamera menyusuri simpul.
 * FRAME 6 — CARA SAYA BEKERJA: pipeline + 7 kartu foto.
 */
const NODES = [
  { id: "n1", t: "Masalah", d: "Apa yang rusak / hilang?", x: "8%", y: "52%" },
  { id: "n2", t: "Kebutuhan", d: "Siapa yang butuh?", x: "30%", y: "62%" },
  { id: "n3", t: "Kemungkinan", d: "Jalur apa yang mungkin?", x: "54%", y: "62%" },
  { id: "n4", t: "Solusi", d: "Langkah terkecil yang diuji.", x: "76%", y: "52%" },
];

const MOVES: Move[] = [
  { pose: { scale: 1.08, yPercent: 4 }, focus: ["ide", "n1"], dur: 1 },
  { pose: { scale: 1.14, yPercent: 0 }, focus: ["n2", "n3"], dur: 1 },
  { pose: { scale: 1.14, yPercent: -4 }, focus: ["n4", "q"], dur: 1 },
  { pose: { scale: 1, yPercent: -2 }, focus: ["lede", "q"], dur: 1 },
];

const STEPS = ["Ide", "Research", "Think", "Design", "Build", "Test", "Iterate"];
const CARDS = [
  { t: "Ide", d: "Menangkap masalah.", k: "blueprint" },
  { t: "Research", d: "Memahami konteks.", k: "desk" },
  { t: "Think", d: "Menyusun alur.", k: "blueprint" },
  { t: "Design", d: "Membentuk rupa.", k: "desk" },
  { t: "Build", d: "Membangun nyata.", k: "server" },
  { t: "Test", d: "Menguji langsung.", k: "meeting" },
  { t: "Iterate", d: "Mempertajam.", k: "office" },
] as const;

export function ThinkingWorld() {
  const path = useRef<SVGPathElement>(null);

  const draw = (p: number) => {
    const el = path.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len * (1 - p)}`;
  };

  return (
    <>
      <CameraWorld id="berpikir" label="Cara Saya Berpikir" durationVh={150} moves={MOVES} onProgress={draw} mobileStatic>
        <div data-f="lede" data-depth={0.4} className="absolute left-[8%] top-[4%] max-w-xl md:left-[10%]">
          <p className="eyebrow">02 / CARA SAYA BERPIKIR</p>
        </div>

        {/* Oval IDE */}
        <div data-f="ide" data-depth={0.6} className="absolute left-1/2 top-[16%] -translate-x-1/2 text-center">
          <div className="rounded-[50%] border border-white/25 bg-white/[0.03] px-12 py-5 backdrop-blur-sm md:px-16 md:py-6">
            <p className="font-display text-2xl font-extrabold uppercase tracking-wide md:text-4xl">IDE</p>
          </div>
        </div>

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <path ref={path} d="M50 24 C 40 34, 30 44, 22 56 M50 24 C 60 34, 70 44, 78 56 M22 62 V70 M42 66 V72 M62 66 V72 M80 62 V70"
            fill="none" stroke="#2b5cff" strokeWidth="0.35" opacity="0.7" />
        </svg>

        {NODES.map((n) => (
          <div key={n.id} data-f={n.id} data-depth={0.7}
            className="absolute w-32 text-center md:w-44" style={{ left: n.x, top: n.y }}>
            <span className="mx-auto block w-fit rounded-full border border-white/20 bg-ink/80 px-4 py-1.5 font-display text-xs font-bold uppercase md:text-sm">
              {n.t}
            </span>
            <p className="mt-1 text-[11px] text-muted md:text-xs">{n.d}</p>
          </div>
        ))}

        <p data-f="q" data-depth={0.65} className="body-muted absolute bottom-[4%] left-[8%] right-[8%] mx-auto max-w-2xl text-center text-xs md:text-sm">
          Saya selalu memulai dengan pertanyaan sederhana: apa yang sebenarnya ingin diselesaikan?
        </p>
      </CameraWorld>

      <CameraWorld id="bekerja" label="Cara Saya Bekerja" durationVh={130} mobileStatic
        moves={[
          { pose: { scale: 1, xPercent: 0 }, focus: ["pipe", "c0"], dur: 1 },
          { pose: { scale: 1.08, xPercent: -8 }, focus: ["c1"], dur: 1.2 },
        ]}>
        <div data-f="pipe" className="absolute left-[8%] top-[8%] right-[8%] md:left-[10%]">
          <p className="eyebrow">03 / CARA SAYA BEKERJA</p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5" aria-label="Alur kerja">
            {STEPS.map((s, i) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className="chip !text-cream !border-accent/60">{s}</span>
                {i < STEPS.length - 1 && <span className="text-accent" aria-hidden>→</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="drift-track absolute top-[34%] flex w-[200%] gap-4 pl-[8%] md:w-[150%] md:pl-[10%]">
          {CARDS.map((c, i) => (
            <article key={c.t} data-f={i < 3 ? "c0" : "c1"} className="w-60 shrink-0 md:w-72">
              <PhotoPanel kind={c.k} label={`${c.t} — ${c.d}`} ratio="4/3" />
              <p className="chapter-label mt-2">0{i + 1} / {c.t.toUpperCase()}</p>
              <p className="text-xs text-muted">{c.d}</p>
            </article>
          ))}
        </div>
      </CameraWorld>
    </>
  );
}
