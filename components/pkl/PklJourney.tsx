"use client";
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { Reveal } from "@/components/motion/Reveal";
import type { PKL_DEFAULTS, PklTimeline } from "@/lib/pkl";

type S = typeof PKL_DEFAULTS;

/**
 * Interactive 6-month journey (spec bab 15): scrolling advances
 * the active month, its photo crossfades in the sticky panel.
 */
export function PklJourney({ s, items }: { s: S; items: PklTimeline[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.55"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce || items.length === 0) return;
    setActive(Math.min(items.length - 1, Math.max(0, Math.floor(v * items.length))));
  });

  if (items.length === 0) return null;
  const cur = items[active] ?? items[0];

  return (
    <section className="bg-[#0A0A0A] text-white px-5 md:px-12 py-12 md:py-16 border-t border-white/5">
      <Reveal>
        <p className="text-[10px] tracking-[0.2em] text-[#8A8883]">{s.journey_eyebrow}</p>
        <h2 className="font-serif-d text-3xl md:text-5xl mt-2">{s.journey_title}</h2>
        <p className="mt-3 text-[12.5px] text-neutral-400 max-w-[420px]">{s.journey_desc}</p>
      </Reveal>

      <div ref={ref} className="mt-8 grid md:grid-cols-2 gap-8 items-start">
        {/* rail */}
        <div className="relative pl-1">
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-white/10" />
          <motion.div
            className="absolute left-[5px] top-2 bottom-2 w-px bg-[#FF6A00] origin-top"
            style={{ scaleY: reduce ? 1 : scrollYProgress }}
          />
          {items.map((m, i) => {
            const done = i < active;
            const now = i === active;
            return (
              <button
                key={m.id}
                onClick={() => setActive(i)}
                className="relative w-full text-left flex gap-4 py-4 group"
              >
                <span
                  className={`relative z-10 mt-1 w-2.5 h-2.5 shrink-0 rounded-full ${
                    now ? "bg-[#FF6A00]" : done ? "bg-[#FF6A00]/60" : "border border-neutral-600 bg-[#0A0A0A]"
                  }`}
                />
                <span>
                  <span className={`text-[11px] tracking-[0.2em] ${now ? "text-[#FF6A00]" : "text-[#8A8883]"}`}>
                    {m.month_label}
                  </span>
                  <span className={`block mt-0.5 text-[15px] font-medium transition-colors ${now || done ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"}`}>
                    {m.title}
                  </span>
                  <AnimatePresence initial={false}>
                    {now && m.description ? (
                      <motion.span
                        className="block mt-1 text-[12px] text-neutral-400 leading-relaxed overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={reduce ? { duration: 0 } : springs.gentle}
                      >
                        {m.description}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </span>
              </button>
            );
          })}
        </div>

        {/* sticky photo */}
        <div className="md:sticky md:top-24">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[300px] md:min-h-[420px] bg-[#141414]">
            <AnimatePresence mode="wait">
              <motion.img
                key={cur.id}
                src={cur.image_url}
                alt={cur.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0 }}
                transition={{ duration: motionTokens.duration.normal, ease: [...motionTokens.easing.smooth] }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-[#FF6A00]">{cur.month_label}</p>
                <p className="font-serif-d text-xl mt-0.5">{cur.title}</p>
              </div>
              <p className="text-[11px] text-neutral-300 tabular-nums">
                0{active + 1} / 0{items.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
