"use client";

import { Scene } from "@/components/cosmos/Scene";

/**
 * AI SECOND MIND (§19) — bukan dua kartu statis. HUMAN dan AI adalah dua
 * badan gravitasi (di dunia 3D) yang saling memengaruhi; satelit
 * IDE / RESEARCH / EXPLORE / DESIGN / DECIDE mengorbit di sekitarnya.
 */
const SATELLITES = ["IDE", "RESEARCH", "EXPLORE", "ANALYZE", "DESIGN", "DECIDE"];

export function AIWorld() {
  return (
    <Scene stop="ai" label="AI sebagai Partner" minH="170svh" align="left">
      <p className="eyebrow">07 / AI — SECOND MIND</p>
      <div className="pair-labels mt-10 flex max-w-md items-center justify-between" aria-label="Human dan AI">
        <div>
          <div className="mx-auto h-2.5 w-2.5 rounded-full bg-cream" aria-hidden />
          <p className="font-display mt-3 text-xl font-extrabold uppercase md:text-2xl">Human</p>
          <p className="mt-1 text-xs text-muted">Intuisi, konteks, keputusan akhir.</p>
        </div>
        <div className="pair-tether" aria-hidden />
        <div className="text-right">
          <div className="ml-auto h-2.5 w-2.5 rounded-full bg-accent" aria-hidden style={{ boxShadow: "0 0 18px 2px rgba(43,92,255,.55)" }} />
          <p className="font-display mt-3 text-xl font-extrabold uppercase md:text-2xl">AI</p>
          <p className="mt-1 text-xs text-muted">Eksplorasi, riset, rencana, iterasi.</p>
        </div>
      </div>
      <ul className="mt-8 flex max-w-md flex-wrap gap-2" aria-label="Satelit proses">
        {SATELLITES.map((s) => (
          <li key={s} className="satellite">{s}</li>
        ))}
      </ul>
      <p className="body-lead mt-10 max-w-md text-base md:text-lg">
        Bukan untuk menggantikan proses berpikir. <span className="text-accent">Tapi untuk memperluasnya.</span>
      </p>
    </Scene>
  );
}
