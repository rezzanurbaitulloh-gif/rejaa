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
          <div className="absolute -right-[20%] -top-[30%] h-[45vmax] w-[45vmax] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(64,110,255,0.10), rgba(20,40,120,0.05) 55%, transparent 72%)" }} />
          <div className="absolute -left-[30%] bottom-[-40%] h-[40vmax] w-[40vmax] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(120,160,255,0.05), transparent 70%)" }} />
        </>
      )}
      {kind === "dusk-city" && (
        <>
          <div className="absolute inset-0" style={{
            background: "linear-gradient(180deg, #0a0b16 0%, #1b1a33 34%, #5a2f3d 58%, #c96b3f 72%, #141020 88%, #0a0b0d 100%)",
          }} />
          <div className="absolute left-1/2 top-[46%] h-[26vmin] w-[26vmin] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(255,190,120,0.85), rgba(255,150,90,0.25) 60%, transparent 75%)" }} />
          {/* Bokeh lampu kota — tanpa geometri gedung agar tidak jadi jeruji */}
          <div className="absolute inset-x-0 bottom-0 top-[34%]" style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(5,6,10,0.4) 55%, rgba(7,8,12,0.94) 100%)",
          }} />
          <div className="absolute inset-x-0 bottom-0 top-[34%]" style={{
            backgroundImage: "radial-gradient(rgba(255,196,130,0.5) 1.2px, transparent 1.6px), radial-gradient(rgba(150,180,255,0.4) 1px, transparent 1.4px), radial-gradient(rgba(255,150,110,0.35) 1.8px, transparent 2.2px)",
            backgroundSize: "137px 61px, 89px 47px, 211px 83px",
            backgroundPosition: "0 0, 30px 12px, 70px 25px",
            maskImage: "linear-gradient(180deg, transparent 25%, black 70%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 25%, black 70%)",
            filter: "blur(1px)",
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
