"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import type { PklRule } from "@/lib/pkl";

/**
 * Progressive disclosure accordion (spec bab 36):
 * long rules stay collapsed until tapped. Same component
 * desktop + mobile (keputusan user: samakan dua-duanya).
 */
export function RulesAccordion({ rules }: { rules: PklRule[] }) {
  const [open, setOpen] = useState<number>(0);
  const reduce = useReducedMotion();

  return (
    <div>
      {rules.map((r, i) => {
        const isOpen = open === i;
        return (
          <div key={r.id} className="border-b border-white/10">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-4 py-3.5 text-left"
            >
              <span className="text-[12px] text-[#B5E332] font-medium w-6 shrink-0">
                {r.label}
              </span>
              <span className="flex-1 text-[13.5px] font-medium text-neutral-100">
                {r.title}
              </span>
              <motion.span
                className="w-7 h-7 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-sm text-neutral-300"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={reduce ? { duration: 0 } : springs.snappy}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    reduce
                      ? { duration: motionTokens.duration.instant }
                      : { ...springs.gentle, duration: motionTokens.duration.normal }
                  }
                  className="overflow-hidden"
                >
                  <p className="pb-4 pl-10 pr-4 text-[12px] text-neutral-400 leading-relaxed">
                    {r.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
