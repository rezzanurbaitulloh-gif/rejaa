"use client";

import { Scene } from "@/components/camera/Scene";
import { ChapterHeading, CinematicFrame } from "./ui";
import { TechnologyField } from "@/components/technology-field/TechnologyField";

/** AI = SECOND MIND + transisi ke dunia nyata. AI bukan robot/gimmick. */
export function AiChapter() {
  return (
    <>
      <Scene id="ai" label="AI sebagai Partner" preset="zoom-in" intensity={2} node={3} className="scene-cinematic flex items-center">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2 md:px-8" data-exit>
          <div>
            <p className="chapter-label" data-reveal>07 / AI — SECOND MIND</p>
            <h2 className="display-xl mt-4" data-reveal>AI</h2>
            <p className="body-lead mt-4" data-reveal>
              Saya menggunakan AI sebagai partner dalam proses berpikir, merancang,
              dan membangun sesuatu.
            </p>
            <ul className="body-muted mt-6 space-y-1 text-sm" data-reveal>
              {["Mengembangkan ide", "Eksplorasi & riset", "Menganalisis masalah", "Menyusun rencana", "Menguji kemungkinan", "Membantu desain", "Mempercepat implementasi", "Iterasi dan evaluasi"].map((x) => (
                <li key={x}>Untuk: {x.toLowerCase()}.</li>
              ))}
            </ul>
            <p className="body-lead mt-6" data-reveal>
              Bukan untuk menggantikan proses berpikir. <span className="text-accent">Tapi untuk memperluasnya.</span>
            </p>
          </div>
          <div data-reveal>
            <CinematicFrame label="Second mind — intelligence layer" caption="IDEA ↓ THINK ↓ EXPLORE → AI + HUMAN → DECIDE ↓ BUILD">
              <div className="font-mono text-xs leading-loose text-cream/90">
                <p>IDEA ↓ THINK ↓ EXPLORE</p>
                <p>↙ ↘</p>
                <p className="font-display text-lg font-extrabold">AI&nbsp;&nbsp;&nbsp;HUMAN</p>
                <p>↘ ↙</p>
                <p>DECIDE ↓ BUILD</p>
              </div>
            </CinematicFrame>
            <div className="mt-4 opacity-70">
              <TechnologyField compact />
            </div>
          </div>
        </div>
      </Scene>

      <Scene id="transisi" label="Transisi ke Dunia Nyata" preset="fast-cut" className="scene-cinematic flex items-center">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8" data-exit>
          <p className="body-muted" data-reveal>Tapi semua itu tidak berarti jika hanya berhenti di dalam layar.</p>
          <h2 className="font-display mt-6 text-4xl font-extrabold uppercase md:text-6xl" data-reveal>
            Lalu saya masuk <span className="text-accent">ke dunia nyata.</span>
          </h2>
        </div>
      </Scene>
    </>
  );
}

/** Re-export agar ChapterHeading tetap tree-shakable dari satu pintu. */
export { ChapterHeading };
