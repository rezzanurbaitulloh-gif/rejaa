"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { springs } from "@/lib/motion-tokens";

/**
 * Sticky chapter indicator for the PKL story (spec bab 23):
 * 01/09 → 09/09. Mobile only (desktop keeps the navbar).
 */
export function PklChapters({ items }: { items: { id: string; label: string }[] }) {
  const [current, setCurrent] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = items.findIndex((c) => c.id === e.target.id);
            if (i >= 0) setCurrent(i);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    const els = items
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el);
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  const label = items[current]?.label ?? "";

  return (
    <div className="md:hidden sticky top-0 z-30 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/10">
      <div className="px-5 py-2.5 flex items-center justify-between">
        <motion.p
          key={current}
          className="text-[11px] tracking-[0.18em] text-neutral-300"
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.snappy}
        >
          <span className="text-[#B5E332]">0{current + 1}</span>
          <span className="text-neutral-500"> / 0{items.length}</span>
          <span className="ml-2.5">{label}</span>
        </motion.p>
        <span className="text-[10px] text-neutral-500">← swipe →</span>
      </div>
      <div className="h-[2px] bg-white/10">
        <div
          className="h-full bg-[#B5E332] transition-all duration-300"
          style={{ width: `${((current + 1) / items.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
