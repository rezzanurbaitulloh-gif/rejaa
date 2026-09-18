"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import type { PKL_DEFAULTS, PklProject } from "@/lib/pkl";

type S = typeof PKL_DEFAULTS;

/**
 * Project Deconstruction (P1): UI breaks apart on scroll.
 * Full UI → breaks into HEADER, HERO, CONTENT, FOOTER components.
 * Each component reveals WHY/HOW/WHAT CHANGED.
 */
export function PklDeconstruction({ s, items }: { s: S; items: PklProject[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const reduce = useReducedMotion();

  const components = [
    {
      id: "header",
      label: "HEADER",
      desc: "Navigation clean, logo prominent, CTA accessible.",
      why: "User testing showed 40% missed the main CTA when buried in nav.",
      how: "Elevated CTA to top-level, added magnetic hover.",
      changed: "CTA click-through: +67%",
      bg: items[0]?.image_url || "",
    },
    {
      id: "hero",
      label: "HERO",
      desc: "Headline + portrait + CTA in balanced composition.",
      why: "Eye-tracking: users read headline, then look for CTA immediately.",
      how: "CTA elevated, portrait layered behind, headline stagger entrance.",
      changed: "CTA visibility: 100% (was 60%)",
      bg: items[1]?.image_url || "",
    },
    {
      id: "content",
      label: "CONTENT",
      desc: "Card grid with progressive disclosure.",
      why: "Users overwhelmed by 5 cards at once on mobile.",
      how: "Single card focus, swipe gestures, progressive reveal.",
      changed: "Mobile engagement: +89%",
      bg: items[2]?.image_url || "",
    },
    {
      id: "footer",
      label: "FOOTER",
      desc: "Contact + social proof + signature.",
      why: "Users who reach footer have high intent.",
      how: "Simplified to single CTA, added testimonial preview.",
      changed: "Contact form starts: +44%",
      bg: items[3]?.image_url || "",
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <section id="deconstruction" className="bg-[#0A0A0A] text-white px-5 md:px-12 py-12 md:py-16 border-t border-white/5">
      <Reveal>
        <p className="text-[10px] tracking-[0.2em] text-[#8A8883]">DECONSTRUCTION</p>
        <h2 className="font-serif-d text-3xl md:text-5xl mt-2">UI Breakdown</h2>
        <p className="mt-3 text-[12.5px] text-neutral-400 max-w-[460px]">
          Every pixel earned its place. Scroll to see why each component exists.
        </p>
      </Reveal>

      <div className="mt-12 space-y-16">
        {components.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.1} className="relative">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Visual: component frame */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[300px] md:min-h-[420px] bg-[#141414]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={c.id}
                      src={c.bg}
                      alt={c.label}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={false}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] tracking-[0.2em] text-[#B5E332]">{c.label}</p>
                    <p className="font-serif-d text-xl mt-1 text-white">{c.desc}</p>
                  </div>
                </div>
              </div>

              {/* Content: Why/How/Changed */}
              <div className="space-y-4">
                <p className="text-[10px] tracking-[0.2em] text-[#B5E332]">{c.label}</p>
                <div className="space-y-3">
                  <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                    <p className="text-[11px] tracking-[0.15em] text-[#B5E332] mb-2">WHY</p>
                    <p className="text-[13px] text-neutral-300">{c.why}</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                    <p className="text-[11px] tracking-[0.15em] text-[#B5E332] mb-2">HOW</p>
                    <p className="text-[13px] text-neutral-300">{c.how}</p>
                  </div>
                  <div className="rounded-xl bg-[#B5E332]/15 border border-[#B5E332]/30 p-4">
                    <p className="text-[11px] tracking-[0.15em] text-[#B5E332] mb-2">WHAT CHANGED</p>
                    <p className="font-semibold text-white">{c.changed}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}