"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { useMounted } from "@/hooks/use-safe-motion";
import { Magnetic } from "@/components/motion/Magnetic";
import type { PKL_DEFAULTS } from "@/lib/pkl";

type S = typeof PKL_DEFAULTS;

export default function PklHero({ s }: { s: S }) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  /* opening words ignite one by one with scroll (spec bab 13) */
  const wY = useTransform(scrollYProgress, [0, 0.35], [26, 0]);
  const wOp0 = useTransform(scrollYProgress, [0, 0.12], [0.12, 1]);
  const wOp1 = useTransform(scrollYProgress, [0.1, 0.24], [0.12, 1]);
  const wOp2 = useTransform(scrollYProgress, [0.2, 0.36], [0.12, 1]);
  const wOps = [wOp0, wOp1, wOp2];
  const openWords = (s.hero_title_mobile || "").split(".").map((w) => w.trim()).filter(Boolean);
  const show = mounted && !reduce;

  const words = s.hero_title.split(" ");
  const infos = [
    [s.info1_value, s.info1_label, "◷"],
    [s.info2_value, s.info2_label, "♡"],
    [s.info3_value, s.info3_label, "❖"],
  ];

  return (
    <section ref={ref} className="relative bg-[#0A0A0A] text-white overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[92vh] md:min-h-[90vh]">
        <div className="px-5 md:px-12 pt-24 md:pt-28 pb-8 flex flex-col justify-center">
          <motion.p
            className="hidden md:block text-[10px] md:text-[11px] tracking-[0.2em] text-neutral-400"
            initial={show ? { opacity: 0, y: motionTokens.distance.md } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.snappy}
          >
            {s.hero_eyebrow}
          </motion.p>
          <motion.h1
            className="hidden md:block font-serif-d text-[44px] leading-[1.02] md:text-[72px] mt-3"
            initial={show ? "hidden" : false}
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          >
            {words.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.22em]"
                variants={{
                  hidden: { opacity: 0, y: motionTokens.distance.xl },
                  visible: { opacity: 1, y: 0, transition: springs.gentle },
                }}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="md:hidden text-[10px] tracking-[0.18em] text-[#8A8883]"
            initial={show ? { opacity: 0, y: motionTokens.distance.md } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.snappy}
          >
            {s.hero_eyebrow_mobile}
          </motion.p>
          <motion.h2
            className="md:hidden font-serif-d text-[34px] leading-[1.12] mt-2"
            initial={show ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={springs.gentle}
          >
            {openWords.map((w, i) => (
              <span key={i} className="block">
                <motion.span
                  className="inline-block"
                  style={reduce ? undefined : { opacity: wOps[i % wOps.length], y: wY }}
                >
                  {w}.
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <motion.p
            className="mt-4 text-[12.5px] md:text-[13.5px] text-neutral-400 max-w-[360px] leading-relaxed"
            initial={show ? { opacity: 0, y: motionTokens.distance.md } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.gentle, delay: 0.3 }}
          >
            {s.hero_desc}
          </motion.p>
          <motion.div
            className="mt-5"
            initial={show ? { opacity: 0, y: motionTokens.distance.md } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.gentle, delay: 0.4 }}
          >
            <Magnetic>
              <a
                href="#intro"
                className="inline-flex items-center gap-3 bg-[#FF6A00] text-white text-[12px] pl-4 pr-1.5 py-1.5 rounded-full"
              >
                {s.hero_cta}
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm">→</span>
              </a>
            </Magnetic>
          </motion.div>
          {/* mobile portrait */}
          <motion.div
            className="md:hidden mt-6 -mx-5 overflow-hidden"
            initial={show ? { opacity: 0, scale: 0.98 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springs.gentle, delay: 0.35 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.hero_image} alt="pkl portrait" className="w-full h-[380px] object-cover object-top grayscale" />
          </motion.div>
          {/* info cards */}
          <motion.div
            className="mt-6 grid grid-cols-3 gap-2.5"
            initial={show ? { opacity: 0, y: motionTokens.distance.lg } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.gentle, delay: 0.5 }}
          >
            {infos.map(([v, l, icon]) => (
              <div key={l} className="rounded-xl bg-[#141414] border border-white/10 p-3 md:p-4">
                <p className="text-[#FF6A00] text-sm">{icon}</p>
                <p className="mt-1.5 text-[12px] md:text-[13px] font-medium leading-tight">{v}</p>
                <p className="text-[10px] text-[#8A8883] mt-0.5">{l}</p>
              </div>
            ))}
          </motion.div>
          <div className="mt-5 flex items-center justify-between text-[11px] text-[#8A8883] md:hidden">
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-5 rounded-full border border-neutral-600 flex justify-center pt-1">
                <span className="w-0.5 h-1 rounded-full bg-neutral-500" />
              </span>
              {s.hero_scroll}
            </span>
            <span>{s.close_eyebrow}</span>
          </div>
        </div>
        <div className="hidden md:block relative overflow-hidden">
          <motion.img
            src={s.hero_image}
            alt="pkl portrait"
            className="absolute inset-0 w-full h-[115%] object-cover object-top grayscale"
            style={reduce ? undefined : { y: imgY }}
            initial={show ? { scale: 1.12 } : false}
            animate={{ scale: 1 }}
            transition={{ duration: motionTokens.duration.slow, ease: [...motionTokens.easing.smooth] }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent w-48 pointer-events-none" />
          <motion.div
            className="absolute right-10 bottom-24 text-right font-script text-3xl text-white/85 leading-snug"
            initial={show ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: motionTokens.duration.slow }}
          >
            {s.hero_script.split(" ").map((w, i) => (
              <div key={i} className={i === 1 ? "text-[#ff8a3d]" : ""}>{w}</div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
