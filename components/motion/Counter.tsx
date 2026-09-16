"use client";
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";

/** Animated number that counts up when scrolled into view. e.g. "20+" */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const text = (v: number) => `${prefix}${Math.round(v)}${suffix}`;

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = text(value);
      return;
    }
    const controls = animate(0, value, {
      duration: motionTokens.duration.crawl,
      ease: [...motionTokens.easing.smooth],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = text(v);
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix, reduce]);

  return (
    <span ref={ref} className={className}>
      {reduce ? text(value) : text(0)}
    </span>
  );
}
