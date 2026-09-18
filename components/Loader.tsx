"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";

/**
 * Real-progress loader (spec bab 27): the bar reflects actual
 * milestones — fonts, critical images, window load — never fake.
 * Shown once per session.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("intro-seen") === "1") return;
    setShow(true);
    const t0 = Date.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setPct(100);
      const wait = Math.max(0, (reduce ? 250 : 1000) - (Date.now() - t0));
      setTimeout(() => {
        sessionStorage.setItem("intro-seen", "1");
        setShow(false);
      }, wait);
    };

    let progress = 0;
    const bump = (n: number) => {
      progress = Math.min(99, progress + n);
      setPct(Math.round(progress));
    };

    document.fonts?.ready.then(() => bump(30)).catch(() => bump(30));

    const imgs = [...document.querySelectorAll<HTMLImageElement>("img[data-preload]")];
    if (imgs.length === 0) {
      bump(60);
    } else {
      const share = 60 / imgs.length;
      const one = () => bump(share);
      imgs.forEach((img) => {
        if (img.complete && img.naturalWidth > 0) one();
        else {
          img.addEventListener("load", one, { once: true });
          img.addEventListener("error", one, { once: true });
        }
      });
    }

    if (document.readyState === "complete") bump(10);
    else window.addEventListener("load", () => bump(10), { once: true });

    const guard = setTimeout(finish, reduce ? 600 : 4000);
    const check = setInterval(() => {
      if (progress >= 99) {
        clearInterval(check);
        finish();
      }
    }, 200);
    return () => {
      clearTimeout(guard);
      clearInterval(check);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0A0A0A] text-white flex flex-col items-center justify-center"
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-6%" }}
          transition={{ duration: motionTokens.duration.normal }}
        >
          <p className="text-[12px] tracking-[0.3em] font-semibold">AKUNSTOK</p>
          <div className="mt-5 w-48 h-[2px] bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B5E332] rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-3 text-[11px] text-neutral-500 tabular-nums">{pct}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
