"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface Pose {
  scale?: number;
  x?: number;
  y?: number;
  xPercent?: number;
  yPercent?: number;
  rotate?: number;
}

export interface Move {
  /** Pose kamera di akhir move ini. */
  pose: Pose;
  /** Selector [data-f] yang FOKUS (tajam, foreground) selama move ini. */
  focus?: string[];
  /** Panjang relatif move (default 1). */
  dur?: number;
}

interface RigOpts {
  /** Panjang pin dalam viewport-heights. */
  durationVh: number;
  moves: Move[];
  onProgress?: (p: number) => void;
  /** Matikan pin di mobile (fallback: flow normal + focus penuh). */
  disablePinOnMobile?: boolean;
}

const LIVE = { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "none" as const };
const DIM_BLUR = { opacity: 0.3, scale: 0.94, filter: "blur(5px)", duration: 0.6, ease: "none" as const };
const DIM_FLAT = { opacity: 0.45, scale: 0.96, filter: "blur(0px)", duration: 0.6, ease: "none" as const };

/**
 * CAMERA RIG — pinned + scrubbed.
 * outer: h-screen, di-pin. stage: absolute inset-0, di-transform sebagai KAMERA.
 * moves: pose kamera per segmen + daftar fokus. Semua scrub-driven (reversibel),
 * sehingga lolos brutal test: tanpa opacity pun perjalanan spasial tetap ada
 * (scale/translate/pin/depth).
 */
export function createRig(outer: HTMLElement, stage: HTMLElement, opts: RigOpts) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  const lowTier = document.documentElement.dataset.tier === "low";
  const DIM = lowTier ? DIM_FLAT : DIM_BLUR;

  const focusables = Array.from(outer.querySelectorAll<HTMLElement>("[data-f]"));
  const layers = Array.from(outer.querySelectorAll<HTMLElement>("[data-depth]"));
  // Mobile: koreografi sendiri yang lebih jinak — redam amplitudo kamera
  // agar konten tidak terdorong keluar viewport kecil.
  const damp = (n: number) => (mobile ? n * 0.55 : n);
  const dampPose = (pose: Pose): Pose => ({
    scale: pose.scale === undefined ? undefined : 1 + (pose.scale - 1) * (mobile ? 0.55 : 1),
    x: pose.x === undefined ? undefined : damp(pose.x),
    y: pose.y === undefined ? undefined : damp(pose.y),
    xPercent: pose.xPercent === undefined ? undefined : damp(pose.xPercent),
    yPercent: pose.yPercent === undefined ? undefined : damp(pose.yPercent),
    rotate: pose.rotate,
  });

  if (reduced || (mobile && opts.disablePinOnMobile)) {
    // Editorial statis: semua konten utuh & fokus, tanpa pin.
    gsap.set(stage, { clearProps: "transform" });
    gsap.set(focusables, { opacity: 1, scale: 1, filter: "blur(0px)" });
    gsap.set(layers, { clearProps: "transform" });
    opts.onProgress?.(1);
    return () => {};
  }

  gsap.set(stage, { transformOrigin: "50% 50%", willChange: "transform" });
  // State awal: kamera di pose "sebelum move pertama" = identitas; fokus move[0].
  applyFocus(opts.moves[0]?.focus);

  const total = opts.moves.reduce((a, m) => a + (m.dur ?? 1), 0);
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: outer,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * opts.durationVh)}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => opts.onProgress?.(self.progress),
    },
  });

  let t = 0;
  for (const move of opts.moves) {
    const d = move.dur ?? 1;
    tl.to(stage, { ...poseDefaults(dampPose(move.pose)), duration: d }, t);
    // FOCUS PULL tersinkron kamera: yang fokus → live, sisanya recede.
    for (const el of focusables) {
      const name = el.dataset.f ?? "";
      const live = !move.focus || move.focus.includes(name);
      tl.to(el, { ...(live ? LIVE : DIM), duration: d, overwrite: "auto" }, t);
    }
    t += d;
  }
  // DEPTH: foreground/midground/background bergerak dengan kecepatan beda.
  for (const layer of layers) {
    const depth = Number(layer.dataset.depth ?? 0.5); // 0 jauh … 1 dekat
    tl.fromTo(
      layer,
      { yPercent: (0.5 - depth) * -30 },
      { yPercent: (0.5 - depth) * 30, duration: total, ease: "none" },
      0,
    );
  }

  function applyFocus(focus?: string[]) {
    for (const el of focusables) {
      const live = !focus || focus.includes(el.dataset.f ?? "");
      gsap.set(el, live ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0.3, scale: 0.94, filter: lowTier ? "blur(0px)" : "blur(5px)" });
    }
  }

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
    gsap.set([stage, ...focusables, ...layers], { clearProps: "all" });
  };
}

function poseDefaults(pose: Pose) {
  return {
    scale: pose.scale ?? 1,
    x: pose.x ?? 0,
    y: pose.y ?? 0,
    xPercent: pose.xPercent ?? 0,
    yPercent: pose.yPercent ?? 0,
    rotate: pose.rotate ?? 0,
  };
}
