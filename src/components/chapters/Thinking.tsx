"use client";

import { useRef } from "react";
import { CameraWorld } from "@/components/camera/CameraWorld";
import type { Move } from "@/components/camera/cameraRig";

/**
 * THINKING — spatial path, bukan kartu statis. Kamera berjalan menyusuri
 * PROBLEM → IDEA → RESEARCH → DESIGN → BUILD → TEST → ITERATE;
 * setiap node fokus saat kamera tiba. Path digambar oleh progress kamera.
 */
const NODES = [
  { id: "n1", t: "Problem", d: "Apa yang rusak / hilang?", x: "18%", y: "6%" },
  { id: "n2", t: "Idea", d: "Jalur apa yang mungkin?", x: "62%", y: "16%" },
  { id: "n3", t: "Research", d: "Apa yang sudah diketahui?", x: "24%", y: "30%" },
  { id: "n4", t: "Design", d: "Bagaimana bentuknya?", x: "60%", y: "44%" },
  { id: "n5", t: "Build", d: "Wujudkan yang terkecil.", x: "26%", y: "58%" },
  { id: "n6", t: "Test", d: "Uji ke dunia nyata.", x: "58%", y: "72%" },
  { id: "n7", t: "Iterate", d: "Ulangi lebih tajam.", x: "30%", y: "86%" },
];

const MOVES: Move[] = [
  { pose: { scale: 1.1, yPercent: 8 }, focus: ["n1", "n2"], dur: 1 },
  { pose: { scale: 1.2, yPercent: 2 }, focus: ["n3", "n4"], dur: 1 },
  { pose: { scale: 1.2, yPercent: -4 }, focus: ["n5", "n6"], dur: 1 },
  { pose: { scale: 1, yPercent: -4 }, focus: ["n7", "lede"], dur: 1 },
];

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
    <CameraWorld id="berpikir" label="Cara Saya Berpikir" durationVh={380} moves={MOVES} onProgress={draw}>
      <div data-f="lede" data-depth={0.4} className="absolute left-[8%] top-[2%] max-w-xl md:left-[10%]">
        <p className="chapter-label">04 / CARA SAYA BERPIKIR</p>
        <p className="body-lead mt-2">Mulai dari masalah. Ikuti jalurnya.</p>
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <path ref={path} d="M22 8 C 55 14, 60 22, 30 32 C 45 42, 58 46, 62 50 C 40 58, 30 62, 30 66 C 48 72, 55 76, 56 80 C 45 86, 36 88, 32 92"
          fill="none" stroke="#2b5cff" strokeWidth="0.28" opacity="0.55" />
      </svg>
      {NODES.map((n, i) => (
        <div key={n.id} data-f={n.id} data-depth={0.7}
          className="absolute w-40 md:w-56" style={{ left: n.x, top: n.y }}>
          <div className="flex items-center gap-2">
            <span className="accent-dot" aria-hidden />
            <p className="font-mono text-[10px] tracking-[0.2em] text-faint">0{i + 1}</p>
          </div>
          <p className="font-display mt-1 text-xl font-extrabold uppercase md:text-2xl">{n.t}</p>
          <p className="text-xs text-muted md:text-sm">{n.d}</p>
        </div>
      ))}

      {/* CARA BEKERJA — siklus sebagai orbit kecil, bukan strip kartu */}
      <div data-f="lede" data-depth={0.65} className="absolute bottom-[1%] left-[8%] right-[8%] md:left-[10%]">
        <p className="chapter-label">05 / CARA SAYA BEKERJA</p>
        <p className="font-display mt-2 text-lg font-bold uppercase tracking-tight md:text-2xl" aria-label="Siklus kerja: ide, riset, desain, bangun, uji, iterasi">
          Ide → Riset → Desain → Bangun → Uji → <span className="text-accent">Iterasi ↻</span>
        </p>
      </div>
    </CameraWorld>
  );
}
