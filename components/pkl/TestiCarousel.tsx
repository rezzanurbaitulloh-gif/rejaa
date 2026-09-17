"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { springs } from "@/lib/motion-tokens";
import type { PklTestimonial } from "@/lib/pkl";

/**
 * Testimonial carousel (spec bab 44): quote + photo + name +
 * role with 01/0N counter and arrows.
 */
export function TestiCarousel({ items }: { items: PklTestimonial[] }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  if (items.length === 0) return null;

  const go = (d: 1 | -1) => {
    setDir(d);
    setIdx((i) => (i + d + items.length) % items.length);
  };
  const t = items[idx];

  return (
    <div>
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.figure
            key={t.id}
            className="rounded-2xl bg-white/[0.04] backdrop-blur border border-white/10 p-5"
            custom={dir}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -48 }}
            transition={springs.gentle}
          >
            <blockquote className="text-[12.5px] text-neutral-300 leading-relaxed">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              {t.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={t.avatar_url}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/15"
                />
              ) : null}
              <div>
                <p className="text-[12.5px] font-medium">{t.name}</p>
                <p className="text-[11px] text-neutral-500">{t.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-[11px] text-neutral-500 tabular-nums">
          0{idx + 1} / 0{items.length}
        </p>
        <div className="flex gap-2">
          <button
            aria-label="testimoni sebelumnya"
            onClick={() => go(-1)}
            className="w-8 h-8 rounded-full border border-white/20 text-neutral-300 text-sm"
          >
            ←
          </button>
          <button
            aria-label="testimoni berikutnya"
            onClick={() => go(1)}
            className="w-8 h-8 rounded-full border border-white/20 text-neutral-300 text-sm"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
