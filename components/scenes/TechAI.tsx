"use client";

import { TECHNOLOGIES, AI_ORBIT } from "@/data/content";

/**
 * PHASE 07 — Technology Field (gravitational field, not a logo wall)
 * + AI Second Mind (two gravitational bodies).
 */
export default function TechAI() {
  return (
    <>
      <section data-scene="technology" className="scene-travel" aria-label="Medan teknologi">
        <div className="sticky-stage">
          <div className="safe-text">
            <p className="eyebrow reveal">Medan teknologi — bukan skills grid</p>
            <h2 className="display-section reveal mt-6">
              Masalah
              <br />
              <span className="narrative-serif font-normal normal-case">sebagai</span> gravitasi
            </h2>
            <p className="body-editorial reveal mt-6">
              Hanya tools yang benar-benar dipakai yang mengorbit. Objek yang fokus menjadi tajam
              dan kontras; yang jauh memudar menjadi memori.
            </p>
          </div>
          <ul className="relative z-20 mx-auto mt-10 grid w-[min(1060px,92vw)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TECHNOLOGIES.map((t) => (
              <li
                key={t.name}
                data-cursor="view"
                className="reveal border border-white/10 bg-white/[0.02] p-5 backdrop-blur-[2px] transition-all duration-500 hover:border-[#8ea2ff]/50 hover:bg-white/[0.05]"
              >
                <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase">{t.category}</p>
                <h3 className="mt-2 text-lg font-bold">{t.name}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/55">{t.usage}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-scene="ai" className="scene-travel-short" aria-label="AI sebagai pikiran kedua">
        <div className="sticky-stage">
          <div className="grid items-center gap-10 px-[var(--gutter)] lg:grid-cols-2">
            <div className="safe-text !ml-0">
              <p className="eyebrow reveal">AI — second mind</p>
              <h2 className="display-section reveal mt-6">
                Dua tubuh
                <br />
                gravitasi
              </h2>
              <p className="narrative-serif reveal mt-6 text-[clamp(20px,2.6vw,32px)] text-white/85">
                “Bukan untuk menggantikan proses berpikir. Tapi untuk memperluasnya.”
              </p>
              <p className="body-editorial reveal mt-6">
                Manusia memutuskan. AI menemani di setiap orbit: dari ide yang kabur hingga
                keputusan membangun.
              </p>
            </div>
            <ol className="relative z-20 flex flex-wrap gap-3" aria-label="Orbit kerja AI">
              {AI_ORBIT.map((o, i) => (
                <li
                  key={o}
                  data-cursor="view"
                  className="reveal rounded-full border border-white/15 px-5 py-2.5 text-[12px] tracking-[0.24em] text-white/70 transition-colors hover:border-[#8ea2ff]/60 hover:text-white"
                  style={{ marginLeft: `${(i % 3) * 18}px` }}
                >
                  {o}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
