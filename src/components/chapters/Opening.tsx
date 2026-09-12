"use client";

import { useEffect, useState } from "react";
import { Scene } from "@/components/cosmos/Scene";
import { useStory } from "@/lib/store";
import { useReducedMotion } from "@/lib/device";

/**
 * OPENING (§14) — minimal. Ruang gelap, planet mengintip dari tepi kanan
 * (di dunia 3D), teks jauh di kiri. Kamera mendekat perlahan.
 * Judul DALAM PROSES = landmark spasial, membesar karena kamera mendekat.
 */
export function Opening() {
  const completeIntro = useStory((s) => s.completeIntro);
  const introDone = useStory((s) => s.introDone);
  const reduced = useReducedMotion();
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

  const shown = reduced ? 100 : count;

  return (
    <>
      {!introDone && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void" role="status" aria-label="Memuat cerita">
          <p className="font-display text-xl font-extrabold uppercase tracking-[0.35em]">DALAM PROSES</p>
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

      <Scene stop="opening" label="Opening" minH="150svh" align="left">
        <p className="eyebrow">01 / OPENING</p>
        <p className="font-display mt-6 max-w-xl text-2xl font-extrabold uppercase leading-[1.08] md:text-4xl">
          Saya tidak selalu tahu bagaimana sesuatu harus dibuat.
        </p>
        <p className="font-display mt-10 max-w-xl text-2xl font-extrabold uppercase leading-[1.08] md:text-4xl">
          Tapi saya tahu bagaimana <span className="text-accent">memulainya.</span>
        </p>
        <p className="eyebrow mt-14">SCROLL TO BEGIN ↓</p>
      </Scene>

      <Scene stop="hero" label="Dalam Proses" minH="140svh" align="center">
        <p className="eyebrow">DALAM PROSES</p>
        <h1 className="display-xl mt-6">DALAM<br />PROSES</h1>
        <p className="body-lead mx-auto mt-8 max-w-xl">Sebuah perjalanan tentang belajar, mencoba, membangun, dan bertumbuh.</p>
        <p className="eyebrow mt-10">SCROLL UNTUK MEMULAI ↓</p>
      </Scene>
    </>
  );
}
