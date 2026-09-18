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
 * Sticky scrollytelling journey (spec: scroll stuck di sini sampai
 * linenya selesai): a tall stage pins the viewport while scroll
 * drives the active month. No scroll-hijack — back-scroll, touch
 * and keyboard keep working, same stuck-until-done feeling.
 */
export function PklJourney({ s, items }: { s: S; items: PklTimeline[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce || items.length === 0) return;
    setActive(Math.min(items.length - 1, Math.max(0, Math.floor(v * items.length))));
  });

  const jumpTo = (i: number) => {
    const el = outerRef.current;
    if (!el || items.length === 0) return;
    if (reduce) {
      setActive(i);
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + ((i + 0.5) / items.length) * el.offsetHeight - window.innerHeight * 0.35;
    window.scrollTo({ top: y, behavior: "auto" });
  };

  if (items.length === 0) return null;
  const cur = items[active] ?? items[0];

  return (
    <section className="relative bg-[#0A0A0A] text-white px-5 md:px-12 pt-12 md:pt-16 pb-4 border-t border-white/5 overflow-hidden">
      <span
        aria-hidden
        className="text-outline font-serif-d absolute top-6 right-0 text-[100px] md:text-[160px] leading-none pointer-events-none select-none hidden sm:block"
      >
        JOURNEY
      </span>
      <Reveal>
        <p className="text-[10px] tracking-[0.2em] text-[#8A8883]">{s.journey_eyebrow}</p>
        <h2 className="font-serif-d text-3xl md:text-5xl mt-2">{s.journey_title}</h2>
        <p className="mt-3 text-[12.5px] text-neutral-400 max-w-[420px]">{s.journey_desc}</p>
      </Reveal>

      <div
        ref={outerRef}
        className="relative"
        style={{ height: `${Math.max(280, items.length * 85)}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden py-6">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 w-full items-center">
            {/* desktop rail */}
            <div className="relative pl-1 hidden md:block">
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-white/10" />
              <motion.div
                className="absolute left-[5px] top-2 bottom-2 w-px bg-[#B5E332] origin-top"
                style={{ scaleY: reduce ? 1 : scrollYProgress }}
              />
              {items.map((m, i) => {
                const done = i < active;
                const now = i === active;
                return (
                  <button
                    key={m.id}
                    onClick={() => jumpTo(i)}
                    className="relative w-full text-left flex gap-4 py-3 group"
                  >
                    <span
                      className={`relative z-10 mt-1 w-2.5 h-2.5 shrink-0 rounded-full ${
                        now ? "bg-[#B5E332]" : done ? "bg-[#B5E332]/60" : "border border-neutral-600 bg-[#0A0A0A]"
                      }`}
                    />
                    <span>
                      <span className={`text-[11px] tracking-[0.2em] ${now ? "text-[#B5E332]" : "text-[#8A8883]"}`}>
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

            {/* mobile month chips */}
            <div className="md:hidden flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {items.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => jumpTo(i)}
                  className={`shrink-0 text-[11px] px-4 py-2 rounded-full border transition-colors ${
                    i === active
                      ? "bg-[#B5E332] border-[#B5E332] text-white"
                      : "border-white/15 text-neutral-400"
                  }`}
                >
                  {m.month_label}
                </button>
              ))}
            </div>

            {/* photo panel */}
            <div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[280px] md:min-h-[420px] bg-[#141414]">
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
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-[10px] tracking-[0.2em] text-[#B5E332]">{cur.month_label}</p>
                  <div className="flex items-end justify-between gap-3">
                    <p className="font-serif-d text-xl mt-0.5">{cur.title}</p>
                    <p className="text-[11px] text-neutral-300 tabular-nums shrink-0">
                      0{active + 1} / 0{items.length}
                    </p>
                  </div>
                  <p className="md:hidden mt-1 text-[11.5px] text-neutral-400 leading-relaxed">
                    {cur.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
