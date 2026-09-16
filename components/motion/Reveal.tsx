"use client";
import { motion } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { useMounted, useSafeMotion } from "@/hooks/use-safe-motion";

export function Reveal({
  children,
  y = motionTokens.distance.lg,
  delay = 0,
  className,
  once = true,
}: {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const mounted = useMounted();
  const safe = useSafeMotion(y);
  if (!mounted) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={safe.initial}
      whileInView={safe.animate}
      viewport={{ once, margin: "-80px" }}
      transition={{ ...springs.gentle, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  const mounted = useMounted();
  if (!mounted) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = motionTokens.distance.md,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const safe = useSafeMotion(y);
  return (
    <motion.div
      className={className}
      variants={{
        hidden: safe.initial,
        visible: { ...safe.animate, transition: springs.gentle },
      }}
    >
      {children}
    </motion.div>
  );
}
