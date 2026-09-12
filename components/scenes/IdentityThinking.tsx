"use client";

import { useEffect, useRef, useState } from "react";
import MemoryPhoto from "@/components/media/MemoryPhoto";
import { THINKING_NODES } from "@/data/content";

/**
 * §11 Identity — spatial typography + ONE environmental visual (no profile card,
 * no fabricated personal photo).
 * §12 Thinking — PROBLEM → … → ITERASI as a real orbital journey:
 * camera-era nodes on an elliptical path; the traveler advances with scroll;
 * the next segment only draws while traveling; active node changes focus,
 * microcopy, and material. Mobile: vertical timeline (own choreography).
 */

function NodeGlyph({ id, active }: { id: string; active: boolean }) {
  const base = "block transition-all duration-500";
  const glow = active ? "shadow-[0_0_18px_rgba(244,241,234,0.8)]" : "";
  switch (id) {
    case "problem": // dark / minimal — hollow square
      return <span className={`${base} h-3 w-3 border border-white/70 bg-transparent ${glow}`} />;
    case "ide": // light point — bright dot
      return <span className={`${base} h-2.5 w-2.5 rounded-full bg-white ${glow}`} />;
    case "riset": // fragments — three specks
      return (
        <span className={`${base} relative h-4 w-4`}>
          <i className="absolute left-0 top-0 h-1 w-1 bg-white/80" />
          <i className="absolute right-0 top-1 h-1 w-1 bg-white/50" />
          <i className="absolute bottom-0 left-1 h-1 w-1 bg-white/65" />
        </span>
      );
    case "design": // wireframe — diamond outline
      return <span className={`${base} h-3 w-3 rotate-45 border border-[#8ea2ff]/80 bg-transparent ${glow}`} />;
    case "build": // interface fragments — stacked bars
      return (
        <span className={`${base} flex h-4 w-3 flex-col gap-[3px]`}>
          <i className="h-[3px] w-full bg-white/85" />
          <i className="h-[3px] w-2/3 bg-white/50" />
          <i className="h-[3px] w-full bg-white/70" />
        </span>
      );
    case "test": // branches — forked dots
      return (
        <span className={`${base} relative h-4 w-5`}>
          <i className="absolute left-0 top-[7px] h-[3px] w-[3px] rounded-full bg-white/80" />
          <i className="absolute right-0 top-0 h-[3px] w-[3px] rounded-full bg-white/50" />
          <i className="absolute bottom-0 right-0 h-[3px] w-[3px] rounded-full bg-white/50" />
        </span>
      );
    default: // iterasi — looping double ring
      return (
        <span className={`${base} relative h-4 w-4`}>
          <i className={`absolute inset-0 rounded-full border border-white/70 ${glow}`} />
          <i className="absolute inset-[4px] rounded-full border border-[#8ea2ff]/70" />
        </span>
      );
  }
}

function ThinkingOrbit() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [local, setLocal] = useState(0);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const el = wrapRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when section below viewport, 1 when passed
        const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height * 0.9)));
        setLocal((prev) => (Math.abs(prev - p) > 0.002 ? p : prev));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const active = Math.min(6, Math.floor(local * 7));
  const node = THINKING_NODES[active];
  const CX = 500;
  const CY = 180;
  const RX = 430;
  const RY = 118;
  const angle = (i: number) => -Math.PI / 2 + (i / 7) * Math.PI * 2;
  const px = (i: number) => CX + RX * Math.cos(angle(i));
  const py = (i: number) => CY + RY * Math.sin(angle(i));
  const ta = -Math.PI / 2 + local * Math.PI * 2;
  const tx = CX + RX * Math.cos(ta);
  const ty = CY + RY * Math.sin(ta);

  return (
    <div ref={wrapRef} className="relative z-20 mx-auto w-[min(960px,94vw)]">
      <div className="relative hidden aspect-[1000/360] md:block" data-cursor="view">
        <svg viewBox="0 0 1000 360" className="absolute inset-0 h-full w-full" aria-hidden>
          <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="rgba(244,241,234,0.12)" strokeWidth={1} />
          <ellipse
            cx={CX}
            cy={CY}
            rx={RX}
            ry={RY}
            fill="none"
            stroke="rgba(142,162,255,0.75)"
            strokeWidth={1.5}
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={100 - local * 100}
            strokeLinecap="round"
            transform={`rotate(0 ${CX} ${CY})`}
          />
        </svg>
        {/* traveler */}
        <span
          aria-hidden
          className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_16px_rgba(244,241,234,0.9)]"
          style={{ left: `${(tx / 1000) * 100}%`, top: `${(ty / 360) * 100}%`, transform: "translate(-50%,-50%)" }}
        />
        {THINKING_NODES.map((n, i) => {
          const isActive = i === active;
          const reached = i / 7 <= local + 0.001;
          return (
            <div
              key={n.id}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 transition-all duration-500"
              style={{
                left: `${(px(i) / 1000) * 100}%`,
                top: `${(py(i) / 360) * 100}%`,
                opacity: reached ? 1 : 0.25,
                transform: `translate(-50%,-50%) scale(${isActive ? 1.5 : 1})`,
              }}
            >
              <NodeGlyph id={n.id} active={isActive} />
              <span
                className={`text-[10px] tracking-[0.28em] ${isActive ? "text-white" : "text-white/45"}`}
              >
                {n.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* mobile: vertical timeline — own choreography */}
      <ol className="relative mt-2 space-y-0 border-l border-white/15 pl-6 md:hidden">
        {THINKING_NODES.map((n, i) => {
          const isActive = i === active;
          const reached = i / 7 <= local + 0.001;
          return (
            <li key={n.id} className="relative py-4" style={{ opacity: reached ? 1 : 0.35 }}>
              <span className="absolute -left-[31px] top-5">
                <NodeGlyph id={n.id} active={isActive} />
              </span>
              <p className={`text-[12px] font-bold tracking-[0.2em] ${isActive ? "text-white" : "text-white/60"}`}>
                0{i + 1} — {n.label}
              </p>
              {isActive && <p className="mt-1 text-sm leading-relaxed text-white/70">{n.micro}</p>}
            </li>
          );
        })}
      </ol>

      {/* active node readout — focus changes microcopy + material */}
      <div className="mt-5 hidden min-h-[96px] border-t border-white/10 pt-4 md:block" aria-live="polite">
        <p className="text-[11px] tracking-[0.3em] text-[#8ea2ff]">
          0{active + 1} / 07 — {node.label}
        </p>
        <p className="narrative-serif mt-2 max-w-2xl text-[clamp(19px,2.2vw,28px)] leading-snug text-white/90">
          {node.micro}
        </p>
        <p className="mt-2 text-[12px] tracking-[0.18em] text-white/60 uppercase">Material: {node.material}</p>
      </div>
      <p className="mt-4 hidden text-[12px] tracking-[0.2em] text-white/55 uppercase md:block">
        Segmen berikutnya baru tergambar saat perjalanan berlangsung
      </p>
    </div>
  );
}

export default function IdentityThinking() {
  return (
    <>
      <section data-scene="identity" className="scene-travel-short" aria-label="Identitas">
        <div className="sticky-stage">
          <div className="grid items-center gap-10 px-[var(--gutter)] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="safe-text !ml-0">
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
            <MemoryPhoto
              src="/memory/memory-city.jpg"
              alt="Lanskap kota malam — visual lingkungan, bukan foto personal"
              caption="Lingkungan — tempat proses terjadi"
              credit="Lorem Picsum"
              className="reveal mx-auto w-[min(440px,86vw)]"
              ratio="aspect-[4/5]"
            />
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
          <div className="mt-10">
            <ThinkingOrbit />
          </div>
        </div>
      </section>
    </>
  );
}
