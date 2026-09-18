"use client";
import { motion, useReducedMotion } from "motion/react";
import { springs } from "@/lib/motion-tokens";

/** GPU-friendly bar fill — scaleX instead of width. */
export function SkillBar({ name, percent }: { name: string; percent: number }) {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="flex justify-between text-[12px]">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B5E332]" />
          {name}
        </span>
        <span className="text-[#8A8883]">{percent}%</span>
      </div>
      <div className="mt-1.5 h-1.5 rounded-full bg-neutral-300/70 overflow-hidden">
        <motion.div
          className="h-full w-full rounded-full bg-[#B5E332] origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: Math.min(100, Math.max(0, percent)) / 100 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={reduce ? { duration: 0 } : springs.gentle}
        />
      </div>
    </div>
  );
}
