"use client";
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useMotionTemplate,
  useTransform,
} from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { Reveal } from "@/components/motion/Reveal";
import type { PKL_DEFAULTS } from "@/lib/pkl";

type S = typeof PKL_DEFAULTS;

/**
 * Blueprint draw-on (spec bab 10): the wireframe draws itself
 * stroke by stroke when scrolled into view.
 */
function WireframeDraw() {
  const reduce = useReducedMotion();
  const tr = (i: number) =>
    reduce
      ? { duration: 0 }
      : {
          duration: motionTokens.duration.normal,
          delay: i * 0.09,
          ease: [...motionTokens.easing.smooth] as const,
        };
  const init = reduce ? ({} as const) : { pathLength: 0, opacity: 0 };
  let k = 0;
  const R: { x: number; y: number; w: number; h: number; rx?: number; accent?: boolean }[] = [
    { x: 16, y: 16, w: 368, h: 268 },
    { x: 32, y: 30, w: 336, h: 22, rx: 11 },
    { x: 32, y: 64, w: 210, h: 90, accent: true },
    { x: 44, y: 116, w: 72, h: 20, rx: 10, accent: true },
    { x: 254, y: 64, w: 114, h: 186 },
    { x: 32, y: 166, w: 100, h: 84 },
    { x: 142, y: 166, w: 100, h: 84 },
    { x: 252, y: 166, w: 100, h: 84, accent: true },
  ];
  const L: { x1: number; y1: number; x2: number; y2: number; accent?: boolean }[] = [
    { x1: 250, y1: 41, x2: 352, y2: 41 },
    { x1: 44, y1: 84, x2: 180, y2: 84 },
    { x1: 44, y1: 98, x2: 150, y2: 98 },
    { x1: 266, y1: 88, x2: 356, y2: 88 },
    { x1: 266, y1: 104, x2: 356, y2: 104 },
    { x1: 266, y1: 120, x2: 320, y2: 120 },
    { x1: 32, y1: 268, x2: 368, y2: 268 },
  ];
  const C: { cx: number; cy: number; r: number; accent?: boolean }[] = [
    { cx: 48, cy: 41, r: 4, accent: true },
    { cx: 62, cy: 41, r: 4 },
  ];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto" fill="none" role="img" aria-label="Animasi blueprint wireframe">
      {R.map((s) => {
        const i = k++;
        return (
          <motion.rect
            key={`r${i}`}
            x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx ?? 0}
            stroke={s.accent ? "#FF6A00" : "#8A8883"}
            strokeWidth={s.accent ? 2.5 : 1.5}
            initial={init}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={tr(i)}
          />
        );
      })}
      {L.map((s) => {
        const i = k++;
        return (
          <motion.line
            key={`l${i}`}
            x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
            stroke={s.accent ? "#FF6A00" : "#8A8883"}
            strokeWidth={1.5}
            initial={init}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={tr(i)}
          />
        );
      })}
      {C.map((s) => {
        const i = k++;
        return (
          <motion.circle
            key={`c${i}`}
            cx={s.cx} cy={s.cy} r={s.r}
            stroke={s.accent ? "#FF6A00" : "#8A8883"}
            strokeWidth={2}
            initial={init}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={tr(i)}
          />
        );
      })}
    </svg>
  );
}

/**
 * Before/after comparison slider (spec bab 11): drag the handle
 * to wipe between wireframe and final UI. Pointer-driven.
 */
function CompareSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const reduce = useReducedMotion();
  const pct = useMotionValue(50);
  const inv = useTransform(pct, (v) => 100 - v);
  const clip = useMotionTemplate`inset(0 ${inv}% 0 0)`;
  const left = useMotionTemplate`${pct}%`;

  const update = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    pct.set(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden border border-white/10 select-none"
      style={{ touchAction: "pan-y", cursor: "ew-resize" }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) update(e.clientX);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={before} alt={beforeLabel} draggable={false} className="block w-full h-[300px] md:h-[420px] object-cover pointer-events-none" />
      <motion.div className="absolute inset-0" style={{ clipPath: reduce ? undefined : clip }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after} alt={afterLabel} draggable={false} className="block w-full h-[300px] md:h-[420px] object-cover pointer-events-none" />
      </motion.div>
      <motion.div className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)]" style={{ left }}>
        <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10 rounded-full bg-[#FF6A00] text-white text-sm flex items-center justify-center font-bold">
          ↔
        </span>
      </motion.div>
      <span className="absolute top-3 left-3 text-[10px] tracking-[0.15em] px-2.5 py-1 rounded-md bg-black/60 border border-white/20 text-neutral-200">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 text-[10px] tracking-[0.15em] px-2.5 py-1 rounded-md bg-black/60 border border-white/20 text-neutral-200">
        {afterLabel}
      </span>
    </div>
  );
}

export function PklWireframe({ s }: { s: S }) {
  const [tab, setTab] = useState<"wf" | "ui">("wf");
  const reduce = useReducedMotion();

  return (
    <section id="wireframe" className="bg-[#0A0A0A] text-white px-5 md:px-12 py-12 md:py-16 border-t border-white/5">
      <Reveal>
        <p className="text-[10px] tracking-[0.2em] text-[#8A8883]">{s.wf_eyebrow}</p>
        <h2 className="font-serif-d text-3xl md:text-5xl mt-2">{s.wf_title}</h2>
        <p className="mt-3 text-[12.5px] text-neutral-400 max-w-[460px] leading-relaxed">{s.wf_desc}</p>
      </Reveal>

      {/* tabs (spec bab 40) */}
      <Reveal delay={0.08}>
        <div className="mt-6 inline-flex rounded-full border border-white/15 p-1 gap-1">
          {(
            [
              ["wf", "Wireframe"],
              ["ui", "UI Design"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative text-[12px] px-5 py-2 rounded-full transition-colors ${tab === key ? "text-white" : "text-neutral-400"}`}
            >
              {tab === key && (
                <motion.span
                  layoutId="wf-tab"
                  className="absolute inset-0 rounded-full bg-[#FF6A00]"
                  transition={reduce ? { duration: 0 } : springs.snappy}
                />
              )}
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          {tab === "wf" ? (
            <motion.div
              key="wf"
              className="grid md:grid-cols-2 gap-4"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={springs.gentle}
            >
              <div className="rounded-2xl bg-[#141414] border border-white/10 p-5 md:p-8">
                <WireframeDraw />
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[260px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.wireframe_image} alt={s.wireframe_caption} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-3 left-4 text-[12px] text-neutral-200">{s.wireframe_caption}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ui"
              className="grid md:grid-cols-2 gap-4"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={springs.gentle}
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[260px] md:min-h-[320px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.detail_image} alt={s.ui_caption} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-3 left-4 text-[12px] text-neutral-200">Final Design</p>
              </div>
              <div className="rounded-2xl bg-[#FF6A00] text-white p-6 md:p-8 flex flex-col justify-center">
                <p className="font-serif-d text-2xl md:text-3xl leading-snug">“{s.ui_caption}”</p>
                <p className="mt-3 text-[12px] text-white/80">Klik tab Wireframe untuk melihat titik awalnya.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* before / after */}
      <Reveal delay={0.1} className="mt-6">
        <CompareSlider
          before={s.wireframe_image}
          after={s.detail_image}
          beforeLabel="WIREFRAME"
          afterLabel="FINAL"
        />
      </Reveal>
    </section>
  );
}
