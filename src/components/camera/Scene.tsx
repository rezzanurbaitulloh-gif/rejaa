"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AnimationPreset } from "@/data/types";

gsap.registerPlugin(ScrollTrigger);

interface SceneProps {
  id: string;
  label?: string;
  preset?: AnimationPreset;
  intensity?: 0 | 1 | 2;
  className?: string;
  children: React.ReactNode;
  /** node process-line yang ikut menyala saat scene aktif */
  node?: number;
}

/**
 * SCENE ENGINE — lifecycle: ENTER → ESTABLISH → FOCUS → REVEAL → HOLD → TRANSITION → EXIT.
 * Setiap gerakan kamera punya preset dengan makna (lihat MASTER SPEC §6).
 * Reduced-motion: tidak ada transform kamera, hanya opacity editorial.
 */
export function Scene({
  id,
  label,
  preset = "establish",
  intensity = 1,
  className = "",
  children,
  node,
}: SceneProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll("[data-reveal]");
      if (reduced) {
        gsap.set(targets, { clearProps: "all", opacity: 1, filter: "blur(0px)" });
        return;
      }
      const k = intensity === 0 ? 0.5 : intensity === 2 ? 1.6 : 1;
      // ESTABLISH + REVEAL per preset kamera
      const from: gsap.TweenVars = { opacity: 0, ease: "power3.out", duration: 1 };
      if (preset === "zoom-in") {
        Object.assign(from, { scale: 1 - 0.06 * k, filter: "blur(10px)" });
      } else if (preset === "zoom-out") {
        Object.assign(from, { scale: 1 + 0.08 * k, filter: "blur(6px)" });
      } else if (preset === "pan") {
        Object.assign(from, { x: 60 * k });
      } else if (preset === "blur-focus") {
        Object.assign(from, { filter: "blur(14px)", scale: 1 - 0.02 * k });
      } else if (preset === "fast-cut") {
        from.duration = 0.45;
        Object.assign(from, { y: 26 * k });
      } else {
        // establish / hold: gerakan minimal, editorial
        Object.assign(from, { y: 34 * k });
      }
      gsap.fromTo(
        targets,
        from,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: from.duration ?? 1.1,
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        },
      );
      // TRANSITION → EXIT: parallax depth keluar (bukan fade-up generik)
      if (preset !== "hold") {
        gsap.to(el.querySelector("[data-exit]") ?? el, {
          yPercent: preset === "zoom-in" ? -4 * k : -2 * k,
          scale: preset === "zoom-in" ? 1 + 0.03 * k : 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }
      // FOCUS: tandai node process-line yang aktif
      if (node !== undefined) {
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            const rail = document.querySelector(`[data-rail-node="${node}"]`);
            if (self.isActive) {
              rail?.classList.add("lit");
              document.dispatchEvent(new CustomEvent("dp:scene", { detail: { id, label } }));
            } else {
              rail?.classList.remove("lit");
            }
          },
        });
      }
    }, el);
    return () => ctx.revert();
  }, [id, label, preset, intensity, node]);

  return (
    <section
      ref={ref}
      id={id}
      aria-label={label ?? id}
      data-scene={id}
      className={`scene ${className}`}
    >
      {children}
    </section>
  );
}
