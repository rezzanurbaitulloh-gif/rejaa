"use client";

import { THINKING_NODES } from "@/data/content";

/**
 * PHASE 06 — Identity (spatial typography, no profile card)
 * + Thinking (orbital journey PROBLEM → ITERASI).
 */
export default function IdentityThinking() {
  return (
    <>
      <section data-scene="identity" className="scene-travel-short" aria-label="Identitas">
        <div className="sticky-stage">
          <div className="safe-text">
            <p className="eyebrow reveal">Identitas — objek spasial</p>
            <h2 className="display-mega reveal mt-6 text-[clamp(56px,10.5vw,148px)]">
              Saya
              <br />
              Rezza.
            </h2>
            <p className="body-editorial reveal mt-8">
              Bukan kartu profil. Satu suara di ruang yang luas — seseorang yang belajar membangun
              dengan berpikir, mencoba, dan mengulang.
            </p>
          </div>
        </div>
      </section>

      <section data-scene="thinking" className="scene-travel" aria-label="Cara berpikir">
        <div className="sticky-stage">
          <div className="safe-text">
            <p className="eyebrow reveal">Cara berpikir — orbital journey</p>
            <h2 className="display-section reveal mt-6">
              Problem
              <br />
              <span className="narrative-serif font-normal normal-case">menjadi</span> Iterasi
            </h2>
          </div>
          <ol className="relative z-20 mx-auto mt-12 grid w-[min(1060px,92vw)] grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4 lg:grid-cols-7">
            {THINKING_NODES.map((n, i) => (
              <li
                key={n.id}
                className="reveal group bg-[#050607]/85 p-5 backdrop-blur-sm transition-colors hover:bg-[#0b0e14]"
                data-cursor="view"
              >
                <p className="text-[10px] tracking-[0.3em] text-[#8ea2ff]">0{i + 1}</p>
                <h3 className="mt-3 text-sm font-bold tracking-[0.14em]">{n.label}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/55">{n.micro}</p>
                <p className="mt-3 border-t border-white/10 pt-2 text-[11px] text-white/35">{n.material}</p>
              </li>
            ))}
          </ol>
          <p className="relative z-20 mx-auto mt-6 w-[min(1060px,92vw)] text-[12px] tracking-[0.2em] text-white/35 uppercase">
            Jalur berikutnya baru tergambar saat kamera tiba — lineProgress = cameraProgress
          </p>
        </div>
      </section>
    </>
  );
}
