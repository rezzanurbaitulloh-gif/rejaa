"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { scrollStore } from "@/lib/camera/scrollStore";
import { prefersReducedMotion } from "@/lib/device";

gsap.registerPlugin(ScrollTrigger);

/**
 * PHASE 03 — Camera Engine: SCROLL = CAMERA.
 * One master ScrollTrigger maps page scroll → scrollStore.progress (0..1).
 * Per-scene triggers set scrollStore.scene + sceneProgress and drive
 * physical reveals (clip/blur/scale via scrub — never generic fade-up).
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;

    if (!reduced) {
      lenis = new Lenis({
        duration: 1.25,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    // master journey progress
    const master = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollStore.progress = self.progress;
      },
    });

    // per-scene activation + physical reveals
    const sections = gsap.utils.toArray<HTMLElement>("[data-scene]");
    const triggers: ScrollTrigger[] = [];
    sections.forEach((el) => {      const id = el.dataset.scene ?? "unknown";
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) scrollStore.scene = id;
          },
          onUpdate: (self) => {
            if (scrollStore.scene === id) scrollStore.sceneProgress = self.progress;
          },
        })
      );

      // physical reveal: elements enter with depth, not fade-up
      const items = el.querySelectorAll(".reveal");
      items.forEach((item) => {
        gsap.fromTo(
          item as HTMLElement,
          { y: 60, opacity: 0, filter: "blur(10px)", scale: 0.985, clipPath: "inset(8% 4% 8% 4%)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.out",
            duration: reduced ? 0.01 : 1.1,
            scrollTrigger: { trigger: item as HTMLElement, start: "top 88%", toggleActions: "play none none reverse" },
          }
        );
      });

      // memory photos: distant → approach → focus → leaving
      const photos = el.querySelectorAll<HTMLElement>(".memory-photo");
      photos.forEach((photo) => {
        ScrollTrigger.create({
          trigger: photo,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            photo.dataset.focus = p < 0.25 ? "distant" : p < 0.5 ? "approach" : p < 0.75 ? "focus" : "leaving";
          },
        });
      });

      // foreground-coupled dolly: sticky stage breathes with camera travel
      // (zoom is felt because the text you read grows, not just background)
      if (!reduced) {
        const stage = el.querySelector<HTMLElement>(".sticky-stage");
        if (stage) {
          gsap.fromTo(
            stage,
            { scale: 1 },
            {
              scale: 1.12,
              transformOrigin: "50% 50%",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
            }
          );
        }
      }
      // exit-memory (§10G): as the camera passes, the landmark recedes —
      // scale down + blur + fade into memory while the line continues.
      // Generic: any [data-exit-memory] inside a scene gets this treatment.
      if (!reduced) {
        const mem = el.querySelector<HTMLElement>("[data-exit-memory]");
        if (mem) {
          gsap.fromTo(
            mem,
            { scale: 1, opacity: 1, filter: "blur(0px)" },
            {
              scale: 0.86,
              opacity: 0.28,
              filter: "blur(6px)",
              ease: "none",
              scrollTrigger: { trigger: el, start: "bottom bottom", end: "bottom top", scrub: 0.6 },
            }
          );
        }
      }
    });

    // process line draw: lineProgress = cameraProgress
    const lineEl: unknown = document.querySelector("#process-line-draw");
    if (lineEl instanceof SVGGeometryElement) {
      const len = 2400;
      gsap.fromTo(
        lineEl,
        { strokeDasharray: len, strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.8 },
        }
      );
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Home") scrollStore.progress = 0;
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      triggers.forEach((t) => t.kill());
      master.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (lenis && raf) {
        gsap.ticker.remove(raf);
        lenis.destroy();
      }
    };
  }, []);

  return null;
}
