"use client";

import { CameraWorld } from "@/components/camera/CameraWorld";

/**
 * AI — SECOND MIND (ref frame 7). Komposisi editorial 2 kolom yang aman
 * di-zoom: teks kiri selalu terbaca, globe kanan sebagai environment.
 * Node (IDEA/HUMAN/AI/DECIDE/BUILD) mengelilingi globe — tanpa garis
 * konektor raksasa yang menabrak viewport.
 */
export function AIWorld() {
  return (
    <CameraWorld
      id="ai"
      label="AI sebagai Partner"
      durationVh={260}
      moves={[
        { pose: { scale: 1.0 }, focus: ["idea", "claim"], dur: 1 },
        { pose: { scale: 1.08, xPercent: 2 }, focus: ["human", "claim"], dur: 1 },
        { pose: { scale: 1.08, xPercent: -2 }, focus: ["ai", "claim"], dur: 1 },
        { pose: { scale: 1.18, xPercent: 2, yPercent: -2 }, focus: ["decide", "claim"], dur: 1.2 },
        { pose: { scale: 1.25, xPercent: 4, yPercent: -3 }, focus: ["build"], dur: 1 },
      ]}
    >
      <p data-f="idea" data-depth={0.4} className="chapter-label absolute left-[7%] top-[9%] md:left-[10%]">
        07 / AI — SECOND MIND
      </p>

      {/* Kolom teks kiri —paring dengan frame 7 */}
      <div data-f="claim" data-depth={0.65} className="absolute left-[7%] top-[19%] w-[44%] min-w-[220px] max-w-[300px] md:left-[10%] md:top-1/2 md:w-[300px] md:-translate-y-1/2">
        <p className="font-display text-4xl font-extrabold md:text-6xl">AI</p>
        <p className="body-muted mt-2 text-xs md:text-sm">Saya menggunakan AI sebagai partner dalam proses.</p>
        <ul className="mt-3 space-y-1 text-[11px] text-muted md:text-xs">
          <li><span className="text-cream">Untuk:</span> mengembangkan ide</li>
          <li>Mengeksplorasi kemungkinan</li>
          <li>Membantu menyusun rancangan</li>
          <li>Mempercepat eksekusi</li>
          <li>Melihat masalah dari sudut berbeda</li>
        </ul>
        <p className="body-lead mt-3 text-xs md:text-sm">Bukan untuk menggantikan proses berpikir. <span className="text-accent">Tapi untuk memperluasnya.</span></p>
      </div>

      {/* Globe — environment kanan, bukan robot */}
      <div data-depth={0.3} className="absolute left-1/2 top-[60%] -translate-x-1/2 md:left-[62%] md:top-1/2 md:-translate-y-1/2" aria-hidden>
        <svg className="h-[30vmin] w-[30vmin] opacity-70 md:h-[40vmin] md:w-[40vmin]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(245,241,234,0.3)" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="62" ry="24" fill="none" stroke="rgba(245,241,234,0.22)" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="24" ry="62" fill="none" stroke="rgba(245,241,234,0.22)" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="62" ry="62" fill="none" stroke="rgba(43,92,255,0.5)" strokeWidth="1" strokeDasharray="4 6" />
          {[[100,38],[138,62],[138,138],[100,162],[62,138],[62,62]].map(([x,y],i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill={i % 2 ? "#2b5cff" : "#f5f1ea"} />
              <circle cx={x} cy={y} r="8" fill="none" stroke="rgba(245,241,234,0.25)" strokeWidth="1" />
            </g>
          ))}
        </svg>
      </div>
      <div data-depth={0.35} className="absolute right-[4%] top-[24%] hidden text-right font-mono text-[10px] tracking-[0.2em] text-faint md:block" aria-hidden>
        <p>IDE</p><p className="mt-6">RESEARCH</p><p className="mt-6">DESIGN</p><p className="mt-6">BUILD</p>
      </div>

      {/* Node di sekitar globe */}
      <div data-f="idea" data-depth={0.6} className="absolute left-0 right-0 top-[8%] text-center md:left-[42%] md:right-[4%] md:top-[13%]">
        <div className="mx-auto h-2.5 w-2.5 rounded-full bg-cream" aria-hidden />
        <p className="font-display mt-2 text-lg font-extrabold uppercase tracking-tight md:text-2xl">Idea</p>
      </div>

      <div data-f="human" data-depth={0.7} className="absolute left-[38%] top-[42%] hidden w-32 text-right md:block">
        <div className="ml-auto h-2.5 w-2.5 rounded-full bg-cream" aria-hidden />
        <p className="font-display mt-2 text-lg font-extrabold uppercase">Human</p>
        <p className="mt-1 text-[11px] text-muted">Intuisi, konteks, keputusan akhir.</p>
      </div>

      <div data-f="ai" data-depth={0.7} className="absolute left-[76%] top-[42%] hidden w-32 md:block">
        <div className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden style={{ boxShadow: "0 0 18px 2px rgba(43,92,255,.55)" }} />
        <p className="font-display mt-2 text-lg font-extrabold uppercase">AI</p>
        <p className="mt-1 text-[11px] text-muted">Eksplorasi, riset, rencana, iterasi.</p>
      </div>

      <div data-f="decide" data-depth={0.75} className="absolute bottom-[16%] left-0 right-0 text-center md:bottom-auto md:left-[42%] md:right-[4%] md:top-[74%]">
        <div className="mx-auto h-3 w-3 rounded-full bg-accent" aria-hidden style={{ boxShadow: "0 0 18px 2px rgba(43,92,255,.55)" }} />
        <p className="font-display mt-2 text-xl font-extrabold uppercase md:text-3xl">Decide</p>
      </div>

      <div data-f="build" data-depth={0.8} className="absolute bottom-[4%] left-0 right-0 text-center">
        <p className="font-display text-2xl font-extrabold uppercase tracking-tight md:text-5xl">↓ Build</p>
      </div>
    </CameraWorld>
  );
}
