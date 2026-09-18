"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { springs } from "@/lib/motion-tokens";

/**
 * Contextual custom cursor (spec bab 25): dot + trailing ring,
 * label follows UX meaning — VIEW ↗ on projects, DRAG on the
 * carousel, → on links. Fine pointers only, never on touch.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [on, setOn] = useState(false);
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, springs.gentle);
  const ry = useSpring(y, springs.gentle);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setOn(true);
    document.body.classList.add("has-custom-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const tagged = t?.closest?.("[data-cursor]");
      if (tagged) setLabel(tagged.getAttribute("data-cursor") ?? "");
      else if (t?.closest?.("a,button")) setLabel("→");
      else setLabel("");
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
    };
  }, [reduce, x, y]);

  if (!on) return null;

  return (
    <>
      {/* dot follows instantly */}
      <motion.div
        className="fixed top-0 left-0 z-[90] pointer-events-none w-2 h-2 rounded-full bg-[#B5E332]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* ring trails + carries the label */}
      <motion.div
        className="fixed top-0 left-0 z-[90] pointer-events-none flex items-center justify-center rounded-full border border-white/40 bg-black/30 backdrop-blur-[2px]"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 72 : 32,
          height: label ? 72 : 32,
          scale: down ? 0.85 : 1,
          opacity: 1,
        }}
        transition={springs.snappy}
      >
        {label ? (
          <span className="text-[9px] tracking-[0.12em] text-white whitespace-nowrap px-1">
            {label}
          </span>
        ) : null}
      </motion.div>
    </>
  );
}
