"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useTransform } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Stamp } from "@/components/motion/Stamp";
import type { CarouselItem } from "@/components/ProjectCarousel";

/**
 * Fullscreen Case Study — Shared Element Transition (P0)
 * Card image uses layoutId to morph into fullscreen hero.
 * 6-step storytelling scroll (Problem → Research → Structure → Design → Prototype → Result).
 */

const steps = [
  {
    id: "problem",
    no: "01",
    eyebrow: "THE PROBLEM",
    title: "How might we make banking simpler, safer and more human?",
    desc: "Traditional banking apps overwhelm users with dense dashboards, jargon-heavy flows, and fragmented features. Users feel anxious, not empowered.",
    bg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "research",
    no: "02",
    eyebrow: "RESEARCH",
    title: "Understanding real behavior, not assumptions.",
    desc: "12 contextual interviews, 3 diary studies, 200+ survey responses. Key insight: users don't want more features — they want clarity and trust.",
    bg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "structure",
    no: "03",
    eyebrow: "STRUCTURE",
    title: "Information architecture redesigned for confidence.",
    desc: "Flattened 5-level navigation to 3. Introduced progressive disclosure: show only what's needed, when it's needed.",
    bg: "https://images.unsplash.com/photo-1558655146-9f40137ef5d5?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "design",
    no: "04",
    eyebrow: "DESIGN",
    title: "Visual language built for trust and calm.",
    desc: "Soft neutrals, generous whitespace, purposeful acid accents for primary actions. Typography scale optimized for financial legibility.",
    bg: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "prototype",
    no: "05",
    eyebrow: "PROTOTYPE",
    title: "High-fidelity flows tested with real users.",
    desc: "3 rounds of usability testing. Task success rate: 94% (up from 67%). Time-to-complete: -42%. NPS: +31 points.",
    bg: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "result",
    no: "06",
    eyebrow: "RESULT",
    title: "Launched to 2.3M users. Metrics exceeded targets.",
    desc: "Onboarding completion: +38%. Support tickets: -52%. App Store rating: 4.8★. Featured in App Store 'Apps We Love'.",
    bg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80&auto=format&fit=crop",
  },
];

export function CaseStudyFullscreen({
  item,
  onClose,
}: {
  item: CarouselItem | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const scrollYProgress = useTransform(scrollY, [0, 1], [0, 1]);
  const sectionScales = steps.map((_, i) =>
    useTransform(scrollYProgress, [i / steps.length, (i + 1) / steps.length], [1.15, 1])
  );

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    const onScroll = () => {
      if (ref.current) {
        const { top, height } = ref.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (-top + vh) / (height + vh)));
        scrollY.set(progress);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          ref={ref}
          className="fixed inset-0 z-[80] bg-black overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="min-h-screen flex flex-col">
            {/* Hero — shared element image */}
            <motion.div
              layoutId={`case-${item.id}`}
              className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden"
              initial={reduce ? false : { opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={springs.gentle}
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[#B5E332]">{item.category}</p>
                  <p className="font-serif-d text-3xl md:text-4xl mt-1 text-white">{item.title}</p>
                </div>
                <button
                  aria-label="Tutup"
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white text-xl leading-none flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </motion.div>

            {/* Storytelling Scroll */}
            <div className="px-5 md:px-12 pb-20">
              <div className="mt-8 mb-12">
                <Stamp className="w-24 h-24 md:w-32 md:h-32" />
              </div>

              <div className="grid md:grid-cols-[1fr_1fr] gap-8">
                {/* Left: Progress indicator */}
                <div className="hidden md:block sticky top-24">
                  <div className="space-y-3">
                    {steps.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          const el = document.getElementById(s.id);
                          el?.scrollIntoView({ behavior: "auto", block: "start" });
                        }}
                        className="relative w-full text-left flex gap-3 py-2 group"
                      >
                        <span
                          className={`relative z-10 w-2 h-2 rounded-full transition-colors ${
                            i <= 0 ? "bg-[#B5E332]" : "border border-white/30 bg-transparent group-hover:border-white/70"
                          }`}
                        />
                        <span
                          className={`text-[11px] tracking-[0.18em] transition-colors ${
                            i <= 0 ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
                          }`}
                        >
                          {s.no} {s.eyebrow}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Story sections */}
                <div className="space-y-16 md:space-y-20">
                  {steps.map((s, i) => (
                    <section
                      key={s.id}
                      id={s.id}
                      className="relative min-h-[50vh] md:min-h-[60vh] flex items-center"
                    >
                      {/* Background image with scroll parallax */}
                      <motion.div
                        className="absolute inset-0 overflow-hidden"
                        style={{
                          filter: "brightness(0.35)",
                        }}
                      >
                        <motion.img
                          src={s.bg}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{
                            scale: reduce ? 1 : sectionScales[i],
                          }}
                        />
                      </motion.div>

                      {/* Content */}
                      <div className="relative z-10 max-w-2xl">
                        <motion.p
                          className="text-[10px] tracking-[0.2em] text-[#B5E332]"
                          initial={reduce ? false : { opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={springs.gentle}
                        >
                          {s.no} / 06 — {s.eyebrow}
                        </motion.p>
                        <motion.h2
                          className="font-serif-d text-3xl md:text-5xl lg:text-6xl mt-2 leading-[1.05]"
                          initial={reduce ? false : { opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ ...springs.gentle, delay: 0.1 }}
                        >
                          {s.title}
                        </motion.h2>
                        <motion.p
                          className="mt-4 text-[13px] md:text-[15px] text-neutral-300 leading-relaxed max-w-xl"
                          initial={reduce ? false : { opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ ...springs.gentle, delay: 0.2 }}
                        >
                          {s.desc}
                        </motion.p>
                      </div>

                      {/* Step indicator */}
                      <motion.div
                        className="absolute bottom-8 left-0 right-0 flex justify-center gap-2"
                        initial={reduce ? false : { opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.4 }}
                      >
                        {steps.map((_, j) => (
                          <span
                            key={j}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              j <= i ? "bg-[#B5E332]" : "bg-white/20"
                            }`}
                          />
                        ))}
                      </motion.div>
                    </section>
                  ))}
                </div>
              </div>

              {/* Closing CTA */}
              <div className="mt-20 text-center">
                <motion.p
                  className="font-serif-d text-3xl md:text-4xl text-white"
                  initial={reduce ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  "Design is not just what it looks like, but how it works."
                </motion.p>
                <motion.div
                  className="mt-6 flex justify-center gap-3"
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2 }}
                >
                  {item.link_url && item.link_url !== "#" && (
                    <Magnetic>
                      <a
                        href={item.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] font-medium text-neutral-900"
                      >
                        View Live Project
                        <span className="w-6 h-6 rounded-full bg-[#B5E332] flex items-center justify-center text-sm text-white">
                          ↗
                        </span>
                      </a>
                    </Magnetic>
                  )}
                  <Magnetic>
                    <button
                      onClick={onClose}
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[13px] text-white"
                    >
                      Back to Projects
                    </button>
                  </Magnetic>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}