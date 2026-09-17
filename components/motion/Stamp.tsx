"use client";
import { useEffect } from "react";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";

/**
 * Rotating stamp badge (poster language: Armaan/Arianna/Romy) —
 * slow spin, pauses when the tab hides or motion is reduced.
 */
export function Stamp({
  text = "OPEN FOR COLLAB • LET'S TALK • ",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const controls = useAnimation();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const play = () =>
      controls.start({
        rotate: 360,
        transition: { repeat: Infinity, duration: 16, ease: [...motionTokens.easing.linear] },
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
  }, [controls, reduce]);

  return (
    <motion.div
      className={`pointer-events-none ${className ?? ""}`}
      initial={{ rotate: 0 }}
      animate={controls}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <path id="stamp-circle" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" fill="none" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="rgba(10,10,10,0.35)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <text className="fill-white/80" style={{ fontSize: 12.5, letterSpacing: 2.5 }}>
          <textPath href="#stamp-circle">{text}</textPath>
        </text>
        <text x="60" y="68" textAnchor="middle" className="fill-[#FF6A00]" style={{ fontSize: 22 }}>
          ✦
        </text>
      </svg>
    </motion.div>
  );
}
