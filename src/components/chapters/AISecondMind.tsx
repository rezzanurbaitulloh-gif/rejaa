"use client";

import { CameraWorld } from "@/components/camera/CameraWorld";

/**
 * AI — SECOND MIND. Bukan robot, bukan orb. Diagram relasi spasial:
 * kamera mendekati IDEA → split ke HUMAN lalu AI → orbit kecil →
 * converge ke DECIDE → push ke BUILD.
 */
export function AIWorld() {
  return (
    <CameraWorld
      id="ai"
      label="AI sebagai Partner"
      durationVh={50}
      moves={[
        { pose: { scale: 1.2, yPercent: 8 }, focus: ["idea"], dur: 1 },
        { pose: { scale: 1.25, yPercent: 3, xPercent: 8 }, focus: ["human"], dur: 1 },
        { pose: { scale: 1.25, yPercent: 3, xPercent: -8 }, focus: ["ai"], dur: 1 },
        { pose: { scale: 1.4, yPercent: -4 }, focus: ["decide", "claim"], dur: 1.2 },
        { pose: { scale: 1.8, yPercent: -8 }, focus: ["build"], dur: 1 },
      ]}
    >
      <p data-f="idea" data-depth={0.4} className="chapter-label absolute left-0 right-0 top-[4%] text-center">
        07 / AI — SECOND MIND
      </p>

      <div data-f="idea" data-depth={0.6} className="absolute left-1/2 top-[10%] -translate-x-1/2 text-center">
        <div className="mx-auto h-2.5 w-2.5 rounded-full bg-cream" aria-hidden />
        <p className="font-display mt-2 text-2xl font-extrabold uppercase tracking-tight md:text-4xl">Idea</p>
      </div>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <path d="M50 16 C 38 26, 32 32, 30 44 M50 16 C 62 26, 68 32, 70 44 M30 52 C 38 60, 44 64, 50 68 M70 52 C 62 60, 56 64, 50 68 M50 74 L50 86"
          fill="none" stroke="rgba(245,241,234,0.35)" strokeWidth="0.35" />
      </svg>

      <div data-f="human" data-depth={0.7} className="absolute left-[8%] top-[38%] max-w-[36%] md:left-[14%]">
        <div className="h-2.5 w-2.5 rounded-full bg-cream" aria-hidden />
        <p className="font-display mt-2 text-xl font-extrabold uppercase md:text-3xl">Human</p>
        <p className="mt-1 text-xs text-muted md:text-sm">Intuisi, konteks, keputusan akhir.</p>
      </div>

      <div data-f="ai" data-depth={0.7} className="absolute right-[8%] top-[38%] max-w-[36%] text-right md:right-[14%]">
        <div className="ml-auto h-2.5 w-2.5 rounded-full bg-accent" aria-hidden style={{ boxShadow: "0 0 18px 2px rgba(43,92,255,.55)" }} />
        <p className="font-display mt-2 text-xl font-extrabold uppercase md:text-3xl">AI</p>
        <p className="mt-1 text-xs text-muted md:text-sm">Eksplorasi, riset, rencana, iterasi.</p>
      </div>

      <div data-f="decide" data-depth={0.75} className="absolute left-1/2 top-[62%] -translate-x-1/2 text-center">
        <div className="mx-auto h-3 w-3 rounded-full bg-accent" aria-hidden style={{ boxShadow: "0 0 18px 2px rgba(43,92,255,.55)" }} />
        <p className="font-display mt-2 text-2xl font-extrabold uppercase md:text-4xl">Decide</p>
      </div>

      <p data-f="claim" data-depth={0.65} className="body-lead absolute left-[8%] right-[8%] top-[74%] mx-auto max-w-2xl text-center">
        Bukan untuk menggantikan proses berpikir. <span className="text-accent">Tapi untuk memperluasnya.</span>
      </p>

      <div data-f="build" data-depth={0.8} className="absolute bottom-[3%] left-0 right-0 text-center">
        <p className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-6xl">↓ Build</p>
      </div>
    </CameraWorld>
  );
}
