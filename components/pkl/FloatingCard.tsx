"use client";
import { motion, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { springs } from "@/lib/motion-tokens";

/**
 * Floating card (spec bab 16): drifts with the cursor at its own
 * depth so sibling cards move at different speeds. Mouse only.
 */
export function FloatingCard({
  children,
  depth = 1,
  className,
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springs.gentle);
  const sy = useSpring(y, springs.gentle);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * depth * 22);
        y.set(((e.clientY - r.top) / r.height - 0.5) * depth * 18);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
