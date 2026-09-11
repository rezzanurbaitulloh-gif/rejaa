"use client";

import { useEffect, useState } from "react";
import { Scene } from "@/components/camera/Scene";
import { useStory } from "@/lib/store";
import { useReducedMotion } from "@/lib/device";

/** PRELOADER + OPENING — rasa penasaran, dengan LEWATI INTRO. */
export function Opening() {
  const completeIntro = useStory((s) => s.completeIntro);
  const introDone = useStory((s) => s.introDone);
  const reduced = useReducedMotion();
  const [count, setCount] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 100
      : 0,
  );

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

  return (
    <>
      {!introDone && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          role="status"
          aria-label="Memuat cerita"
        >
          <div className="accent-dot mb-6" aria-hidden style={{ width: 14, height: 14 }} />
          <p className="font-display text-sm font-bold tracking-[0.35em]">DALAM PROSES</p>
          <p className="chapter-label mt-2">MEMUAT CERITA… {String(count).padStart(2, "0")}–100</p>
          <div className="mt-6 h-px w-52 bg-white/10" aria-hidden>
            <div className="h-px bg-accent transition-all" style={{ width: `${count}%` }} />
          </div>
          <button
            type="button"
            onClick={() => completeIntro(true)}
            className="chip mt-8 hover:text-cream"
          >
            LEWATI INTRO →
          </button>
          {count >= 100 && (
            <button
              type="button"
              onClick={() => completeIntro(false)}
              autoFocus
              className="mt-4 rounded-full bg-cream px-6 py-2 text-xs font-semibold tracking-[0.2em] text-black"
            >
              MULAI ↓
            </button>
          )}
        </div>
      )}

      <Scene id="opening" label="Opening" preset="blur-focus" node={0} className="scene-cinematic flex items-center">
        <div className="mx-auto max-w-6xl px-5 pt-28 md:px-8" data-exit>
          <p className="chapter-label" data-reveal>01 / OPENING</p>
          <h1 className="font-display mt-6 max-w-4xl text-3xl font-extrabold uppercase leading-tight md:text-6xl" data-reveal>
            Saya tidak selalu tahu bagaimana sesuatu harus dibuat.
          </h1>
          <p className="body-muted mt-6 max-w-xl" data-reveal>Scroll.</p>
          <h2 className="font-display mt-6 max-w-4xl text-3xl font-extrabold uppercase leading-tight md:text-6xl" data-reveal>
            Tapi saya tahu bagaimana <span className="text-accent">memulainya.</span>
          </h2>
          <div className="mt-10 flex flex-wrap gap-3" data-reveal>
            <a href="#hero" className="rounded-full bg-cream px-6 py-3 text-xs font-semibold tracking-[0.2em] text-black">
              MULAI PERJALANAN ↓
            </a>
            <button type="button" onClick={() => completeIntro(true)} className="chip hover:text-cream">
              LEWATI INTRO →
            </button>
          </div>
        </div>
      </Scene>

      <Scene id="hero" label="DALAM PROSES" preset="zoom-out" intensity={2} node={0} className="scene-cinematic flex items-center">
        <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
          <p className="chapter-label" data-reveal>Sebuah perjalanan tentang belajar, mencoba, membangun, dan bertumbuh.</p>
          <p className="display-xl mt-4" data-reveal>
            DALAM
            <br />
            PROSES
          </p>
          <p className="body-lead mt-6 max-w-xl" data-reveal>
            Dari ide, menjadi sesuatu yang nyata.
          </p>
          <p className="chapter-label mt-10" data-reveal>Scroll untuk memulai ↓</p>
        </div>
      </Scene>
    </>
  );
}
