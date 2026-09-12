"use client";

import { useMemo } from "react";

export type BackdropKind = "space" | "dusk-city" | "workspace" | "mountains" | "plain";

/**
 * PHOTO BACKDROP — latar sinematik prosedural (tanpa aset eksternal):
 * space (starfield + earth glow), dusk-city (skyline + jendela), workspace
 * (lampu hangat), mountains (ridge lapis + langit senja). Selalu di belakang
 * konten (aria-hidden) + vignette agar tipografi tetap terbaca.
 */
export function PhotoBackdrop({ kind, opacity = 1 }: { kind: BackdropKind; opacity?: number }) {
  const stars = useMemo(() => {
    if (kind !== "space") return "";
    const pts: string[] = [];
    let seed = 42;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    for (let i = 0; i < 130; i++) {
      pts.push(`${(rnd() * 100).toFixed(1)}vw ${(rnd() * 100).toFixed(1)}vh 0 ${(rnd() * 1.2 + 0.3).toFixed(1)}px rgba(255,255,255,${(rnd() * 0.5 + 0.2).toFixed(2)})`);
    }
    return pts.join(",");
  }, [kind]);

  return (
    <div className="photo-backdrop" aria-hidden style={{ opacity }}>
      {kind === "space" && (
        <>
          <div className="absolute inset-0" style={{ boxShadow: stars, borderRadius: "50%" }} />
          <div className="absolute -right-[20%] -top-[30%] h-[80vmax] w-[80vmax] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(64,110,255,0.28), rgba(20,40,120,0.12) 55%, transparent 72%)" }} />
          <div className="absolute -left-[30%] bottom-[-40%] h-[70vmax] w-[70vmax] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(120,160,255,0.14), transparent 70%)" }} />
        </>
      )}
      {kind === "dusk-city" && (
        <>
          <div className="absolute inset-0" style={{
            background: "linear-gradient(180deg, #0a0b16 0%, #1b1a33 34%, #5a2f3d 58%, #c96b3f 72%, #141020 88%, #0a0b0d 100%)",
          }} />
          <div className="absolute left-1/2 top-[46%] h-[26vmin] w-[26vmin] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(255,190,120,0.85), rgba(255,150,90,0.25) 60%, transparent 75%)" }} />
          <div className="absolute inset-x-0 bottom-0 top-[26%]" style={{
            background: `linear-gradient(180deg, transparent 0%, rgba(5,6,10,0.35) 55%, rgba(7,8,12,0.92) 100%), repeating-linear-gradient(90deg, transparent 0 90px, rgba(6,7,13,0.78) 90px 168px, transparent 168px 260px, rgba(6,7,13,0.85) 260px 318px)`,
            filter: "blur(3px)",
          }} />
          <div className="absolute inset-x-0 bottom-0 top-[38%]" style={{
            background: `repeating-linear-gradient(90deg, transparent 0 150px, rgba(4,5,10,0.8) 150px 235px, transparent 235px 400px)`,
            filter: "blur(5px)",
          }} />
          <div className="absolute inset-x-0 bottom-0 top-[30%] opacity-50" style={{
            background: "repeating-linear-gradient(0deg, transparent 0 11px, rgba(255,190,120,0.10) 11px 12px)",
            maskImage: "linear-gradient(180deg, transparent 30%, black 80%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 30%, black 80%)",
          }} />
        </>
      )}
      {kind === "workspace" && (
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #08090d 0%, #0d0f16 55%, #06070b 100%)" }} />
          <div className="absolute right-[8%] top-[6%] h-[46vmin] w-[46vmin] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(255,176,102,0.22), transparent 70%)" }} />
          <div className="absolute bottom-0 left-[4%] right-[4%] top-[62%] rounded-t-3xl"
            style={{ background: "linear-gradient(180deg, rgba(52,40,30,0.5), rgba(16,12,9,0.9))" }} />
        </>
      )}
      {kind === "mountains" && (
        <>
          <div className="absolute inset-0" style={{
            background: "linear-gradient(180deg, #070912 0%, #232347 38%, #7a3f4d 60%, #e08a52 74%, #1a1626 90%, #0a0b0d 100%)",
          }} />
          <svg className="absolute inset-x-0 bottom-0 h-[46%] w-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
            <path d="M0 220 L120 140 L240 210 L360 110 L480 200 L600 130 L720 205 L840 120 L960 200 L1080 140 L1200 210 L1320 150 L1440 200 L1440 400 L0 400 Z"
              fill="#14121f" opacity="0.9" />
            <path d="M0 290 L160 210 L320 280 L480 200 L640 285 L800 215 L960 290 L1120 220 L1280 285 L1440 230 L1440 400 L0 400 Z"
              fill="#0b0a13" />
          </svg>
          <div className="absolute left-1/2 top-[52%] h-[10vmin] w-[10vmin] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(255,200,140,0.7), transparent 70%)" }} />
        </>
      )}
      {/* vignette sinematik */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 100% at 50% 42%, transparent 55%, rgba(4,5,8,0.72) 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(180deg, transparent, rgba(4,5,8,0.8))" }} />
    </div>
  );
}
