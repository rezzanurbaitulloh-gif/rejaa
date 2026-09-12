"use client";

import { useEffect, useRef, useState } from "react";
import { AI_ORBIT } from "@/data/content";
import type { TechItem } from "@/data/content";

/**
 * §13 Technology Field — gravitational field, never a logo wall.
 * Problem is the gravitational center; real tools orbit on two slow rings
 * (independent time scales, never synchronized). Drag rotates the field
 * (CURSOR = DRAG, honest). Click focuses: sharp/scale/contrast; rest recede.
 * §14 AI Second Mind — human + AI as two gravitational bodies, orbit nodes
 * circle both. No robot/chatbot/brain/orb gimmick.
 */

function TechnologyField({ items }: { items: TechItem[] }) {
  const ringA = useRef<HTMLDivElement>(null);
  const ringB = useRef<HTMLDivElement>(null);
  const st = useRef({ a: 0, b: 140, dragging: false, lastX: 0, lastFocus: 0 });
  const [focus, setFocus] = useState(0);
  const shown = items.slice(0, 8);
  const current = shown[focus % shown.length];

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      const s = st.current;
      if (!s.dragging) {
        s.a += dt * 4; // deg/sec — independent time scales
        s.b -= dt * 2.6;
      }
      if (ringA.current) ringA.current.style.transform = `rotate(${s.a}deg)`;
      if (ringB.current) ringB.current.style.transform = `rotate(${s.b}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - st.current.lastFocus > 8000) setFocus((f) => (f + 1) % shown.length);
    }, 4500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown.length]);

  const onDown = (e: React.PointerEvent) => {
    st.current.dragging = true;
    st.current.lastX = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    s.lastX = e.clientX;
    s.a += dx * 0.25;
    s.b += dx * 0.15;
  };
  const onUp = () => {
    st.current.dragging = false;
  };

  const place = (i: number, n: number, r: number) => {
    const a = (i / n) * Math.PI * 2;
    return { left: `${50 + r * Math.cos(a)}%`, top: `${50 + r * Math.sin(a)}%` };
  };

  return (
    <div className="relative z-20 mx-auto w-[min(680px,94vw)]">
      <div
        className="relative aspect-square select-none [touch-action:pan-y]"
        data-cursor="drag"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        role="group"
        aria-label="Medan teknologi — seret untuk memutar, klik untuk fokus"
      >
        {/* orbit paths */}
        <div aria-hidden className="absolute inset-[16%] rounded-full border border-white/10" />
        <div aria-hidden className="absolute inset-[3%] rounded-full border border-white/10" />
        {/* gravitational center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span aria-hidden className="absolute -inset-10 animate-ping rounded-full border border-white/10 [animation-duration:3.5s]" />
          <p className="text-[10px] tracking-[0.34em] text-white/50 uppercase">Gravitasi</p>
          <p className="display-mega mt-1 text-[clamp(22px,4vw,38px)]">Masalah</p>
          <p className="narrative-serif mt-1 text-[15px] text-white/60">mulai dari sini</p>
        </div>
        {/* ring A */}
        <div ref={ringA} className="absolute inset-0 will-change-transform">
          {shown.slice(0, 4).map((t, i) => {
            const fi = i;
            const isF = fi === focus % shown.length;
            return (
              <button
                key={t.name}
                onClick={() => {
                  setFocus(fi);
                  st.current.lastFocus = Date.now();
                }}
                data-cursor="view"
                aria-pressed={isF}
                className="absolute -translate-x-1/2 -translate-y-1/2 border px-4 py-2 text-[12px] font-bold tracking-[0.12em] backdrop-blur-[2px] transition-all duration-500"
                style={{
                  ...place(i, 4, 34),
                  borderColor: isF ? "rgba(142,162,255,0.8)" : "rgba(255,255,255,0.15)",
                  background: isF ? "rgba(10,14,24,0.92)" : "rgba(5,6,7,0.72)",
                  opacity: isF ? 1 : 0.55,
                  filter: isF ? "blur(0)" : "blur(0.6px)",
                  scale: isF ? "1.18" : "1",
                }}
              >
                {t.name}
              </button>
            );
          })}
        </div>
        {/* ring B */}
        <div ref={ringB} className="absolute inset-0 will-change-transform">
          {shown.slice(4, 8).map((t, i) => {
            const fi = i + 4;
            const isF = fi === focus % shown.length;
            return (
              <button
                key={t.name}
                onClick={() => {
                  setFocus(fi);
                  st.current.lastFocus = Date.now();
                }}
                data-cursor="view"
                aria-pressed={isF}
                className="absolute -translate-x-1/2 -translate-y-1/2 border px-3 py-1.5 text-[11px] tracking-[0.1em] backdrop-blur-[2px] transition-all duration-500"
                style={{
                  ...place(i, 4, 47),
                  borderColor: isF ? "rgba(142,162,255,0.8)" : "rgba(255,255,255,0.12)",
                  background: isF ? "rgba(10,14,24,0.92)" : "rgba(5,6,7,0.6)",
                  opacity: isF ? 1 : 0.4,
                  filter: isF ? "blur(0)" : "blur(1px)",
                  scale: isF ? "1.18" : "0.94",
                }}
              >
                {t.name}
              </button>
            );
          })}
        </div>
      </div>
      {/* focus readout */}
      <div className="mx-auto mt-2 min-h-[86px] max-w-md text-center" aria-live="polite">
        {current && (
          <>
            <p className="text-[11px] tracking-[0.3em] text-[#8ea2ff] uppercase">
              {current.category} — fokus
            </p>
            <p className="mt-1 text-lg font-bold">{current.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/60">{current.usage}</p>
          </>
        )}
      </div>
      <p className="mt-2 text-center text-[11px] tracking-[0.24em] text-white/60 uppercase">
        ↔ seret untuk memutar · klik untuk fokus
      </p>
    </div>
  );
}

function AIBodies() {
  return (
    <div className="relative z-20 mx-auto w-[min(880px,94vw)]">
      {/* desktop: two bodies + shared orbit */}
      <div className="relative hidden h-[380px] md:block" data-cursor="view">
        <div aria-hidden className="absolute left-1/2 top-1/2 h-[74%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/12" />
        {/* HUMAN */}
        <div className="absolute left-[16%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="mx-auto block h-20 w-20 rounded-full border border-white/40 bg-white/[0.03]" aria-hidden />
          <p className="mt-3 text-[12px] font-bold tracking-[0.3em]">MANUSIA</p>
          <p className="narrative-serif text-sm text-white/55">memutuskan</p>
        </div>
        {/* AI */}
        <div className="absolute left-[84%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span
            className="mx-auto block h-20 w-20 rounded-full border border-[#8ea2ff]/60 bg-[#2b4eff]/[0.07] shadow-[0_0_50px_rgba(43,78,255,0.25)]"
            aria-hidden
          />
          <p className="mt-3 text-[12px] font-bold tracking-[0.3em] text-[#8ea2ff]">AI</p>
          <p className="narrative-serif text-sm text-white/55">memperluas</p>
        </div>
        {AI_ORBIT.map((o, i) => {
          const a = (i / AI_ORBIT.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <span
              key={o}
              className="absolute -translate-x-1/2 -translate-y-1/2 border border-white/15 bg-[#050607]/85 px-4 py-1.5 text-[11px] tracking-[0.22em] text-white/70 transition-colors hover:border-[#8ea2ff]/60 hover:text-white"
              style={{ left: `${50 + 44 * Math.cos(a)}%`, top: `${50 + 37 * Math.sin(a)}%` }}
            >
              {o}
            </span>
          );
        })}
      </div>
      {/* mobile: vertical stack */}
      <ol className="space-y-0 border-l border-white/15 pl-6 md:hidden" aria-label="Orbit kerja AI">
        <li className="py-2 text-[12px] font-bold tracking-[0.3em]">MANUSIA — memutuskan</li>
        {AI_ORBIT.map((o) => (
          <li key={o} className="py-2 text-sm tracking-[0.2em] text-white/70">
            {o}
          </li>
        ))}
        <li className="py-2 text-[12px] font-bold tracking-[0.3em] text-[#8ea2ff]">AI — memperluas</li>
      </ol>
    </div>
  );
}

export default function TechAI({ technologies }: { technologies: TechItem[] }) {
  return (
    <>
      <section data-scene="technology" className="flow-section" aria-label="Medan teknologi">
        <div>
          <div className="safe-text">
            <p className="eyebrow reveal">Medan teknologi — bukan skills grid</p>
            <h2 className="display-section reveal mt-6">
              Saya tidak selalu
              <br />
              memulai dari teknologi.
            </h2>
            <p className="body-editorial reveal mt-6">
              Saya memulai dari masalah. Lalu saya memilih alat — <em className="narrative-serif">bukan sebaliknya.</em> Hanya
              yang benar-benar dipakai yang mengorbit.
            </p>
          </div>
          <div className="reveal mt-6">
            <TechnologyField items={technologies} />
          </div>
        </div>
      </section>

      <section data-scene="ai" className="scene-travel-short" aria-label="AI sebagai pikiran kedua">
        <div className="sticky-stage">
          <div className="safe-text">
            <p className="eyebrow reveal">AI — second mind</p>
            <h2 className="display-section reveal mt-6">
              Dua tubuh
              <br />
              gravitasi
            </h2>
            <p className="narrative-serif reveal mt-6 text-[clamp(20px,2.6vw,32px)] text-white/85">
              “Bukan untuk menggantikan proses berpikir. Tapi untuk memperluasnya.”
            </p>
          </div>
          <div className="reveal mt-8">
            <AIBodies />
          </div>
        </div>
      </section>
    </>
  );
}
