"use client";

import { useEffect, useState } from "react";
import { CameraWorld } from "@/components/camera/CameraWorld";
import type { Move } from "@/components/camera/cameraRig";
import { PhotoBackdrop } from "@/components/media/PhotoBackdrop";
import { useStory } from "@/lib/store";
import { useReducedMotion } from "@/lib/device";

/**
 * OPENING (ref1 #01) — kehampaan luar angkasa, satu titik, monogram,
 * SCROLL TO BEGIN. Kamera dolly ke titik → pernyataan ditemukan karena
 * kamera mendekat → pullback → push ke DALAM PROSES → THROUGH.
 */
const MOVES: Move[] = [
  { pose: { scale: 1, yPercent: 0 }, focus: ["dot", "tag"], dur: 1 },
  { pose: { scale: 1.7, yPercent: 8 }, focus: ["dot", "s1"], dur: 1.4 },
  { pose: { scale: 1.7, yPercent: -8 }, focus: ["s2"], dur: 1.4 },
  { pose: { scale: 1, yPercent: 0 }, focus: ["s1", "s2"], dur: 1.2 },
  { pose: { scale: 2, yPercent: 0 }, focus: ["hero"], dur: 1.4 },
  { pose: { scale: 3.2, yPercent: 0 }, focus: [], dur: 1 },
];

export function Opening() {
  const completeIntro = useStory((s) => s.completeIntro);
  const introDone = useStory((s) => s.introDone);
  const reduced = useReducedMotion();
  // Selalu 0 di render pertama (paritas SSR); reduced di-derive, bukan state.
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (introDone || reduced) return;
    let v = 0;
    const t = setInterval(() => {
      v += Math.ceil(Math.random() * 9);
      if (v >= 100) {
        v = 100;
        clearInterval(t);
      }
      setCount(v);
    }, 90);
    return () => clearInterval(t);
  }, [introDone, reduced]);

  // reduced-motion: langsung 100 tanpa state (paritas SSR, tanpa animasi).
  const shown = reduced ? 100 : count;

  return (
    <>
      {!introDone && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void" role="status" aria-label="Memuat cerita">
          <p className="monogram text-2xl">RZ</p>
          <p className="eyebrow mt-6">MEMUAT CERITA… {String(shown).padStart(2, "0")}–100</p>
          <div className="mt-6 h-px w-52 bg-white/10" aria-hidden>
            <div className="h-px bg-accent transition-all" style={{ width: `${shown}%` }} />
          </div>
          <button type="button" onClick={() => completeIntro(true)} className="chip mt-8 hover:text-cream">
            LEWATI INTRO →
          </button>
          {shown >= 100 && (
            <button type="button" onClick={() => completeIntro(false)} autoFocus
              className="mt-4 rounded-full bg-cream px-6 py-2 text-xs font-semibold tracking-[0.2em] text-black">
              MULAI ↓
            </button>
          )}
        </div>
      )}

      <CameraWorld id="opening" label="Opening" durationVh={75} moves={MOVES}>
        <PhotoBackdrop kind="space" opacity={0.9} />
        <p data-depth={0.2} className="eyebrow absolute left-[8%] top-[11%] md:left-[10%]">01 / OPENING</p>

        {/* DOT — satu titik di kehampaan */}
        <div data-f="dot" data-depth={0.9} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="mx-auto h-3 w-3 rounded-full bg-cream" aria-hidden />
          <div className="mx-auto -mt-3 h-3 w-3 animate-ping rounded-full bg-accent/60" aria-hidden />
        </div>
        <p data-f="tag" data-depth={0.5} className="eyebrow absolute bottom-[12%] left-0 right-0 text-center">
          SCROLL TO BEGIN ↓
        </p>

        {/* Pernyataan 1 — kamera menemukan karena MENDEKAT */}
        <div data-f="s1" data-depth={0.6} className="absolute left-[8%] right-[8%] top-[13%] md:left-[10%] md:max-w-3xl">
          <p className="font-display mt-4 text-3xl font-extrabold uppercase leading-[1.02] md:text-6xl">
            Saya tidak selalu tahu bagaimana sesuatu harus dibuat.
          </p>
        </div>

        {/* Pernyataan 2 — kamera PAN ke sini */}
        <div data-f="s2" data-depth={0.6} className="absolute bottom-[16%] left-[8%] right-[8%] md:left-[10%] md:max-w-3xl">
          <p className="font-display mt-4 text-3xl font-extrabold uppercase leading-[1.02] md:text-6xl">
            Tapi saya tahu bagaimana <span className="text-accent">memulainya.</span>
          </p>
        </div>

        {/* HERO — monogram + judul, ada lebih jauh di depan */}
        <div data-f="hero" data-depth={0.3} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="monogram text-lg text-cream/80">RZ</p>
          <p className="display-xl mt-4">DALAM<br />PROSES</p>
          <p className="body-lead mt-6 max-w-xl">Dari ide, menjadi sesuatu yang nyata.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#tentang" className="rounded-full bg-cream px-6 py-3 text-xs font-semibold tracking-[0.2em] text-black">
              MULAI PERJALANAN ↓
            </a>
            <button type="button" onClick={() => completeIntro(true)} className="chip hover:text-cream">
              LEWATI INTRO →
            </button>
          </div>
        </div>
      </CameraWorld>
    </>
  );
}
