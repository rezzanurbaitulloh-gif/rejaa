"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * 3D phone mockups (spec bab 8): rotateY follows scroll,
 * -15° → 0° → +15° across panel visibility.
 */
export function CasePhones() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotL = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 8]);
  const rotR = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 15]);

  const phones = [
    { r: rotL, cls: "-mt-4" },
    { r: rotR, cls: "mt-10" },
  ];

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-center justify-center gap-4"
      style={{ perspective: 800 }}
    >
      {phones.map((p, i) => (
        <motion.div
          key={i}
          className={`w-[130px] md:w-[150px] rounded-[24px] bg-black border border-white/15 p-3 shadow-2xl ${p.cls}`}
          style={reduce ? undefined : { rotateY: p.r, transformStyle: "preserve-3d" }}
        >
          <p className="text-[8px] text-neutral-500">Balance</p>
          <p className="text-[14px] font-semibold">Rp 25.000.000</p>
          <div className="mt-2 rounded-lg bg-[#FF6A00] text-white text-[9px] text-center py-1.5">
            Transfer
          </div>
          {[1, 2, 3].map((r) => (
            <div key={r} className="mt-1.5 h-8 rounded-lg bg-white/5" />
          ))}
        </motion.div>
      ))}
    </div>
  );
}
