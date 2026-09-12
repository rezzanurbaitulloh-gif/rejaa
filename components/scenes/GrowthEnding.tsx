"use client";

import { GROWTH, ASSET_CREDITS } from "@/data/content";

/**
 * PHASE 10 — Growth (sunyi, slow camera) + Ending (continuation, bukan footer).
 */
export default function GrowthEnding() {
  return (
    <>
      <section data-scene="growth" className="scene-travel" aria-label="Pertumbuhan">
        <div className="sticky-stage">
          <div className="safe-text">
            <p className="eyebrow reveal">Pertumbuhan — lebih sunyi</p>
            <h2 className="display-section reveal mt-6">
              Pelan,
              <br />
              tapi nyata.
            </h2>
          </div>
          <div className="relative z-20 mx-auto mt-12 grid w-[min(1000px,92vw)] gap-10 md:grid-cols-3">
            {(
              [
                ["Before", GROWTH.before],
                ["During", GROWTH.during],
                ["After", GROWTH.after],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="reveal border-t border-white/15 pt-5" data-cursor="view">
                <p className="text-[11px] tracking-[0.3em] text-white/40 uppercase">{k}</p>
                <p className="narrative-serif mt-3 text-[clamp(18px,2vw,26px)] leading-snug text-white/85">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-scene="ending" className="scene-travel" aria-label="Penutup">
        <div className="sticky-stage items-center text-center">
          <div className="relative z-20 mx-auto w-[min(820px,94vw)]">
            <p className="eyebrow reveal">Kembali ke cosmic space — objek lama muncul lagi</p>
            <p className="narrative-serif reveal mt-10 text-[clamp(24px,3.4vw,44px)] leading-snug text-white/90">
              Ternyata ini belum selesai.
            </p>
            <p className="narrative-serif reveal mt-4 text-[clamp(20px,2.6vw,34px)] text-white/60">
              Dan mungkin memang tidak pernah.
            </p>
            <p className="body-editorial reveal mx-auto mt-6 text-center">
              Karena belajar tidak selesai ketika PKL berakhir.
            </p>
            <h2 className="display-mega reveal mt-12 text-[clamp(56px,12vw,180px)]" data-cursor="view">
              Rezza
            </h2>
            <p className="reveal mt-4 text-[13px] tracking-[0.5em] text-[#8ea2ff] uppercase">
              Masih dalam proses
            </p>
            <div className="reveal mx-auto mt-10 h-24 w-px bg-gradient-to-b from-white/60 to-transparent" aria-hidden />
            <nav className="reveal mt-8 flex flex-wrap items-center justify-center gap-6 text-[12px] tracking-[0.24em] uppercase" aria-label="Kontak">
              <a href="mailto:halo@dalamproses.id" className="border-b border-white/30 pb-1 text-white/75 hover:border-white hover:text-white" data-cursor="open">
                Email ↗
              </a>
              <a href="#opening" className="border-b border-white/30 pb-1 text-white/75 hover:border-white hover:text-white" data-cursor="next">
                Putar ulang perjalanan ↑
              </a>
            </nav>
            <details className="reveal mx-auto mt-12 max-w-xl text-left text-[12px] leading-relaxed text-white/40">
              <summary className="cursor-pointer tracking-[0.2em] uppercase" data-cursor="open">Kredit asset & lisensi</summary>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                {ASSET_CREDITS.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
