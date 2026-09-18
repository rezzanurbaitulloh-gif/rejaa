"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { useMounted } from "@/hooks/use-safe-motion";
import { Magnetic } from "@/components/motion/Magnetic";
import { Stamp } from "@/components/motion/Stamp";
import type { PKL_DEFAULTS } from "@/lib/pkl";

type S = typeof PKL_DEFAULTS;

export default function PklHero({ s }: { s: S }) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const show = mounted && !reduce;
  
  const words = s.hero_title.split(" ");
  const wordsMobile = (s.hero_title_mobile || s.hero_title || "").split(" ").filter(Boolean);
  const openWords = (s.hero_title_mobile || "Belajar. Berkarya. Bertumbuh.").split(".").map(w => w.trim()).filter(Boolean);
  const infos = [
    [s.info1_value, s.info1_label, "◷"],
    [s.info2_value, s.info2_label, "♡"],
    [s.info3_value, s.info3_label, "❖"],
  ];

  // Scroll progress for parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Mouse parallax
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const mImgX = useTransform(mx, [0, 1], [16, -16]);
  const mImgY = useTransform(my, [0, 1], [10, -10]);

  return (
    <section ref={ref} className="relative bg-ink text-white overflow-hidden" onPointerMove={(e) => {
      if (reduce || e.pointerType !== "mouse") return;
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    }}>
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] -translate-y-1/2 rounded-full bg-gradient-to-br from-acid/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-cyan/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div ref={ref} className="relative grid md:grid-cols-2 min-h-[92vh] md:min-h-[90vh]">
        {/* Left column */}
        <motion.div
          className="px-5 md:px-12 lg:px-20 pt-24 md:pt-32 lg:pt-40 pb-8 flex flex-col justify-center relative z-10"
          style={reduce ? undefined : { x: textY }}
        >
          <motion.p
            className="hidden md:block text-[10px] md:text-[11px] tracking-[0.2em] text-neutral-400"
            initial={show ? { opacity: 0, y: motionTokens.distance.md } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.snappy}
          >
            {s.hero_eyebrow}
          </motion.p>
          
          {/* Desktop headline */}
          <motion.h1
            className="hidden md:block font-serif-d text-[44px] leading-[1.02] md:text-[72px] lg:text-[88px] mt-3"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
            initial={show ? "hidden" : false}
            animate="visible"
          >
            {words.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.22em] last:mr-0"
                variants={{
                  hidden: { opacity: 0, y: motionTokens.distance.xl },
                  visible: { opacity: 1, y: 0, transition: springs.gentle },
                }}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Mobile headline - word by word entrance */}
          <motion.h2
            className="md:hidden font-serif-d text-[34px] leading-[1.12] mt-3"
            initial={show ? "hidden" : false}
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } } }}
          >
            {openWords.map((w, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 26 },
                    visible: { opacity: 1, y: 0, transition: springs.gentle },
                  }}
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
                className="inline-flex items-center gap-3 bg-acid text-white text-[12px] pl-4 pr-1.5 py-1.5 rounded-full"
              >
                {s.hero_cta}
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm">→</span>
              </a>
            </Magnetic>
          </motion.div>
          
          {/* Mobile hero image */}
          <motion.div
            className="md:hidden mt-6 -mx-5 overflow-hidden"
            initial={show ? { opacity: 0, scale: 0.98 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springs.gentle, delay: 0.35 }}
          >
            <img data-preload src={s.hero_image} alt="pkl portrait" className="w-full h-[380px] object-cover object-top grayscale" />
          </motion.div>
          
          {/* Info cards */}
          <motion.div
            className="mt-6 grid grid-cols-3 gap-2.5"
            initial={show ? { opacity: 0, y: motionTokens.distance.lg } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.gentle, delay: 0.5 }}
          >
            {infos.map(([v, l, icon]) => (
              <div key={l} className="rounded-xl bg-ink-soft border border-white/10 p-3 md:p-4">
                <p className="text-acid text-sm">{icon}</p>
                <p className="mt-1.5 text-[12px] md:text-[13px] font-medium leading-tight">{v}</p>
                <p className="text-[10px] text-neutral-500 mt-0.5">{l}</p>
              </div>
            ))}
          </motion.div>
          
          {/* Mobile scroll indicator */}
          <div className="mt-5 flex items-center justify-between text-[11px] text-neutral-500 md:hidden">
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-5 rounded-full border border-neutral-600 flex justify-center pt-1">
                <span className="w-0.5 h-1 rounded-full bg-neutral-500" />
              </span>
              {s.hero_scroll}
            </span>
            <span>{s.close_eyebrow}</span>
          </div>
        </motion.div>
        
        {/* Right desktop */}
        <div className="hidden md:block relative overflow-hidden">
          <motion.img
            data-preload
            src={s.hero_image}
            alt="pkl portrait"
            className="absolute inset-0 w-full h-[115%] object-cover object-top grayscale"
            style={reduce ? undefined : { y: imgY, x: useTransform(mx, [0, 1], [-16, 16]) }}
            initial={show ? { scale: 1.12 } : false}
            animate={{ scale: 1 }}
            transition={{ duration: motionTokens.duration.slow, ease: [...motionTokens.easing.smooth] }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-transparent w-48 pointer-events-none" />
          
          <Stamp className="absolute right-8 bottom-8 w-24 h-24 hidden md:block z-10" />
          
          <motion.div
            className="absolute right-10 top-24 text-right text-[11px] leading-5 text-neutral-700"
            initial={show ? { opacity: 0, x: motionTokens.distance.md } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springs.gentle, delay: 0.5 }}
          >
            { (("hero_side_text" in s ? s.hero_side_text : "Learn|Build|Grow") as string).split("|").map((w) => (
              <div key={w}>{w}</div>
            ))}
            <div className="ml-auto mt-3 w-px h-16 bg-neutral-400" />
            <div className="mt-3 text-neutral-800">
              <span className="font-semibold">01</span> <span className="text-neutral-400">/ 05</span>
            </div>
          </motion.div>
          
          <motion.div
            className="absolute right-10 bottom-16 font-script text-3xl lg:text-4xl text-white/90 -rotate-6"
            initial={show ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: motionTokens.duration.slow }}
          >
            {s.hero_script.split(" ").map((w, i) => (
              <div key={i} className={i === 1 ? "text-acid" : ""}>{w}</div>
            ))}
          </motion.div>
          
          {/* Scroll indicator */}
          <div className="hidden md:block absolute bottom-8 left-10 text-[11px] text-neutral-500 flex items-center gap-2">
            <motion.span
              className="w-4 h-6 rounded-full border border-neutral-400 flex justify-center pt-1"
              animate={reduce ? undefined : { y: [0, 4, 0] }}
              transition={reduce ? undefined : { repeat: Infinity, duration: 1.8, ease: "linear" }}
            >
              <span className="w-1 h-1.5 rounded-full bg-neutral-500" />
            </motion.span>
            {s.hero_scroll}
          </div>
        </div>
        
        {/* Mobile side elements */}
        <div className="md:hidden absolute top-[380px] lg:top-[460px] right-4 font-script text-2xl text-white/90 -rotate-6 pointer-events-none">
          {s.hero_script}
        </div>
        
        {/* Mobile scroll indicator bottom */}
        <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500">
          <motion.span
            className="w-4 h-6 rounded-full border border-neutral-400 flex justify-center pt-1"
            animate={reduce ? undefined : { y: [0, 4, 0] }}
            transition={reduce ? undefined : { repeat: Infinity, duration: 1.8, ease: "linear" }}
          >
            <span className="w-1 h-1.5 rounded-full bg-neutral-500" />
          </motion.span>
          <span className="text-[10px] tracking-[0.2em]">SCROLL</span>
        </div>
        
        {/* Mobile opening words */}
        <div className="md:hidden absolute bottom-20 left-5 md:px-12">
          <motion.h2
            className="font-serif-d text-[32px] leading-[1.12] mt-2"
            initial={show ? "hidden" : false}
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } } }}
          >
            {openWords.map((w, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 26 },
                    visible: { opacity: 1, y: 0, transition: springs.gentle },
                  }}
                >
                  {w}.
                </motion.span>
              </span>
            ))}
          </motion.h2>
          
          {/* Mobile scroll indicator in hero */}
          <div className="mt-5 flex items-center justify-between text-[11px] text-neutral-500 md:hidden">
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-5 rounded-full border border-neutral-600 flex justify-center pt-1">
                <span className="w-0.5 h-1 rounded-full bg-neutral-500" />
              </span>
              {s.hero_scroll}
            </span>
            <span>{s.close_eyebrow}</span>
          </div>
        </div>
      </div>
    </section>
  );
}