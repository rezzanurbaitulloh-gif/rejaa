"use client";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { springs } from "@/lib/motion-tokens";
import type { ProcessStep } from "@/lib/supabase";

/**
 * Scroll-spy stepper (spec bab 18): the active dot follows scroll,
 * the connector fills, finished steps become ✓.
 */
export function ProcessSpy({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.45"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  return (
    <div ref={ref}>
      <div className="mt-4 space-y-0">
        {steps.map((s, i) => {
          const done = i < active;
          const now = i === active;
          return (
            <div key={s.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <motion.span
                  className={`w-2.5 h-2.5 rounded-full mt-1 flex items-center justify-center text-[7px] ${
                    now
                      ? "bg-[#FF6A00] text-white"
                      : done
                        ? "bg-[#FF6A00]/70 text-white"
                        : "border border-neutral-600"
                  }`}
                  animate={now && !reduce ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                  transition={{ repeat: now && !reduce ? Infinity : 0, duration: 1.6 }}
                >
                  {done ? "✓" : ""}
                </motion.span>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-white/10 relative overflow-hidden min-h-[14px]">
                    <motion.div
                      className="absolute inset-0 bg-[#FF6A00] origin-top"
                      style={{ scaleY: scrollYProgress }}
                    />
                  </div>
                )}
              </div>
              <div className={`pb-4 text-[12px] transition-colors ${i <= active ? "text-neutral-200" : "text-neutral-500"}`}>
                <p>
                  <span className="text-[#8A8883] mr-2">0{s.step_no.slice(-1)}</span>
                  {s.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
