"use client";
import { motion, useReducedMotion } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { useMounted } from "@/hooks/use-safe-motion";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { Stamp } from "@/components/motion/Stamp";
import type { DEFAULT_SITE } from "@/lib/supabase";

type Site = typeof DEFAULT_SITE;

export default function Hero({ site }: { site: Site }) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const show = mounted && !reduce;
  const sides = (site.hero_side_text || "Design|Build|Create").split("|");
  const words = (site.hero_title || "").split(" ");
  const wordsMobile = (site.hero_title_mobile || site.hero_title || "").split(" ");

  const parent = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const word = {
    hidden: { opacity: 0, y: motionTokens.distance.xl, rotate: 2 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: springs.gentle,
    },
  };

  return (
    <section
      id="home"
      className="relative bg-gradient-to-b from-[#F2EFE8] via-[#F2EFE8] to-[#E8E4D8] text-neutral-900 overflow-hidden"
    >
      {/* Ambient background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] -translate-y-1/2 rounded-full bg-gradient-to-br from-orange/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-cyan/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-1/3 left-1/6 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-emerald/10 via-transparent to-transparent blur-3xl" />
      </div>
      
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-30" />

      <div className="relative grid md:grid-cols-2 min-h-[92vh] md:min-h-[88vh]">
        {/* left */}
        <motion.div
          className="px-5 md:px-12 lg:px-20 pt-20 md:pt-32 lg:pt-40 pb-8 lg:pb-12 flex flex-col justify-center relative z-10"
        >
          {/* Floating decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 md:w-96 md:h-96 opacity-5 hidden lg:block">
            <div className="absolute inset-0 rounded-full border border-orange/20 animate-pulse" />
            <div className="absolute inset-4 rounded-full border border-orange/10 animate-pulse delay-500" />
            <div className="absolute inset-8 rounded-full border border-orange/5 animate-pulse delay-1000" />
          </div>

          <motion.p
            className="text-[10px] md:text-[11px] tracking-[0.2em] text-neutral-500 max-w-[190px] leading-[1.9]"
            initial={show ? { opacity: 0, y: motionTokens.distance.md } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.snappy}
          >
            <span className="text-[#FF6A00] mr-2">01</span> {site.hero_eyebrow}
          </motion.p>
          
          {/* Main headline with gradient text */}
          <motion.h1
            className="hidden md:block font-serif-d text-[52px] leading-[0.95] md:text-[92px] lg:text-[110px] mt-3"
            variants={parent}
            initial={show ? "hidden" : false}
            animate="visible"
          >
            {words.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.22em] last:mr-0"
                variants={word}
                style={{ 
                  background: i === 1 ? "linear-gradient(135deg, #FF6A00 0%, #FF9F1A 100%)" : "transparent",
                  WebkitBackgroundClip: i === 1 ? "text" : "initial",
                  WebkitTextFillColor: i === 1 ? "transparent" : "initial",
                  backgroundClip: i === 1 ? "text" : "initial",
                }}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.h1
            className="md:hidden font-serif-d text-[32px] leading-[1.08] mt-3"
            variants={parent}
            initial={show ? "hidden" : false}
            animate="visible"
          >
            {wordsMobile.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.22em] last:mr-0"
                variants={word}
                style={{ 
                  background: i === 1 ? "linear-gradient(135deg, #FF6A00 0%, #FF9F1A 100%)" : "transparent",
                  WebkitBackgroundClip: i === 1 ? "text" : "initial",
                  WebkitTextFillColor: i === 1 ? "transparent" : "initial",
                  backgroundClip: i === 1 ? "text" : "initial",
                }}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p
            className="mt-4 text-[12.5px] md:text-[13.5px] leading-relaxed text-neutral-600 max-w-[340px]"
            initial={show ? { opacity: 0, y: motionTokens.distance.md } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.gentle, delay: 0.35 }}
          >
            {site.hero_desc}
          </motion.p>
          
          <motion.div
            className="mt-5"
            initial={show ? { opacity: 0, y: motionTokens.distance.md } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.gentle, delay: 0.45 }}
          >
            <Magnetic>
              <a
                href="#works"
                className="inline-flex items-center gap-3 bg-neutral-900 text-white text-[12px] pl-4 pr-1.5 py-1.5 rounded-full
                           hover:bg-neutral-800 hover:shadow-lg hover:shadow-orange/20
                           transition-all duration-300 ease-out"
              >
                {site.hero_cta_text}
                <span className="w-7 h-7 rounded-full bg-gradient-to-r from-orange to-orange-bright flex items-center justify-center text-sm">
                  →
                </span>
              </a>
            </Magnetic>
          </motion.div>
          
          <div className="mt-8 hidden md:flex items-center gap-2 text-[11px] text-neutral-500">
            <motion.span
              className="w-4 h-6 rounded-full border border-neutral-300 flex justify-center pt-1"
              animate={reduce ? undefined : { y: [0, 4, 0] }}
              transition={
                reduce
                  ? undefined
                  : {
                      repeat: Infinity,
                      duration: 1.8,
                      ease: "linear",
                    }
              }
            >
              <span className="w-1 h-1.5 rounded-full bg-neutral-400" />
            </motion.span>
            {site.hero_scroll}
          </div>
          
          {/* mobile hero image */}
          <div className="md:hidden mt-6 -mx-5 lg:mx-0">
            <div className="relative overflow-hidden rounded-2xl">
              <motion.img
                data-preload
                src={site.hero_image_url}
                alt="portrait"
                className="w-full h-[420px] lg:h-[500px] object-cover object-top grayscale"
                initial={show ? { scale: 1.15, opacity: 0.6 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...springs.gentle, duration: motionTokens.duration.slow }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream/50 via-transparent to-transparent" />
            </div>
            <Marquee className="bg-[#0A0A0A] text-neutral-300 text-[10px] tracking-[0.2em] text-center py-2.5 mt-4 rounded-xl">
              <span className="px-4">{site.marquee_text}</span>
            </Marquee>
          </div>
        </motion.div>
        
        {/* right desktop */}
        <div className="hidden md:block relative overflow-hidden">
          <motion.img
            data-preload
            src={site.hero_image_url}
            alt="portrait"
            className="absolute inset-0 w-full h-[115%] object-cover object-top grayscale"
            initial={show ? { scale: 1.12 } : false}
            animate={{ scale: 1 }}
            transition={{ duration: motionTokens.duration.slow, ease: [...motionTokens.easing.smooth] }}
          />
          
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/50 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/50 pointer-events-none" />
          
          {/* Stamp decoration */}
          <Stamp className="absolute left-8 bottom-8 w-24 h-24 hidden md:block z-10" />
          
          {/* Side text */}
          <motion.div
            className="absolute right-10 top-24 text-right text-[11px] leading-5 text-neutral-700"
            initial={show ? { opacity: 0, x: motionTokens.distance.md } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springs.gentle, delay: 0.5 }}
          >
            {sides.map((s) => (
              <div key={s}>{s}</div>
            ))}
            <div className="ml-auto mt-3 w-px h-16 bg-neutral-400" />
            <div className="mt-3 text-neutral-800">
              <span className="font-semibold">01</span>{" "}
              <span className="text-neutral-400">/ 05</span>
            </div>
          </motion.div>
          
          {/* Hero script text */}
          <motion.div
            className="absolute right-10 bottom-16 font-script text-3xl lg:text-4xl text-white/90 -rotate-6"
            initial={show ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: motionTokens.duration.slow }}
          >
            {site.hero_script}
          </motion.div>
          
          {/* Floating decorative elements on right side */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-20 w-2 h-2 rounded-full bg-orange/30 animate-float delay-1000" />
            <div className="absolute top-1/2 right-10 w-1 h-1 rounded-full bg-cyan/30 animate-float delay-2000" />
            <div className="absolute bottom-1/3 right-24 w-1.5 h-1.5 rounded-full bg-emerald/30 animate-float delay-3000" />
          </div>
        </div>
      </div>
      
      {/* mobile side script overlay */}
      <div className="md:hidden absolute top-[420px] lg:top-[500px] right-4 font-script text-2xl text-white/90 -rotate-6 pointer-events-none">
        {site.hero_script}
      </div>
      
      {/* Scroll indicator bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-neutral-500">
        <motion.span
          className="w-4 h-6 rounded-full border border-neutral-400 flex justify-center pt-1"
          animate={reduce ? undefined : { y: [0, 4, 0] }}
          transition={
            reduce
              ? undefined
              : {
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "linear",
                }
          }
        >
          <span className="w-1 h-1.5 rounded-full bg-neutral-500" />
        </motion.span>
        <span className="text-[10px] tracking-[0.2em]">SCROLL</span>
      </div>
    </section>
  );
}