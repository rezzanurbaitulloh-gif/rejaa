"use client";
import { useEffect } from "react";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";

/** Seamless infinite marquee — pauses when tab hidden or reduced motion. */
export function Marquee({
  children,
  className,
  duration = 22,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}) {
  const controls = useAnimation();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const play = () =>
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          repeat: Infinity,
          duration,
          ease: [...motionTokens.easing.linear],
        },
      });
    const onVis = () => {
      if (document.visibilityState === "hidden") controls.stop();
      else void play();
    };
    void play();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      controls.stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [controls, duration, reduce]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div className="flex w-max" initial={{ x: "0%" }} animate={controls}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
