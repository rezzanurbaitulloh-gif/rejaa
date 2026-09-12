"use client";

import type { CSSProperties } from "react";
import { Scene } from "@/components/cosmos/Scene";

/**
 * THINKING (§17) — proses sebagai sistem orbital. Satu jalur melengkung
 * yang tergambar mengikuti fokus, node = benda langit kecil.
 * Kamera berjalan di sepanjang jalur, bukan zoom acak.
 */
const NODES = [
  { t: "Masalah", d: "Apa yang rusak / hilang?" },
  { t: "Ide", d: "Jalur apa yang mungkin?" },
  { t: "Riset", d: "Memahami konteks." },
  { t: "Desain", d: "Membentuk rupa." },
  { t: "Build", d: "Membangun nyata." },
  { t: "Test", d: "Menguji langsung." },
  { t: "Iterasi", d: "Mempertajam, lalu mengulang." },
];

export function ThinkingWorld() {
  return (
    <>
      <Scene stop="thinking" label="Cara Saya Berpikir" minH="140svh" align="left">
        <p className="eyebrow">02 / CARA SAYA BERPIKIR</p>
        <div className="mt-8 inline-block rounded-full border border-white/25 bg-white/[0.03] px-10 py-4 backdrop-blur-sm">
          <p className="font-display text-2xl font-extrabold uppercase tracking-wide md:text-3xl">IDE</p>
        </div>
        <p className="body-muted mt-8 max-w-md text-sm">
          Saya selalu memulai dengan pertanyaan sederhana: apa yang sebenarnya ingin diselesaikan?
        </p>
      </Scene>

      <Scene stop="thinking" label="Orbital proses" minH="170svh" align="center">
        <p className="eyebrow">03 / CARA SAYA BEKERJA — lintasan</p>
        <ol className="orbit-path mx-auto mt-10 max-w-2xl">
          {NODES.map((n, i) => (
            <li key={n.t} className="orbit-node" style={{ "--i": i } as CSSProperties}>
              <span className="orbit-dot" aria-hidden />
              <div>
                <p className="font-display text-lg font-extrabold uppercase md:text-xl">
                  <span className="mr-3 font-mono text-xs font-normal text-accent">0{i + 1}</span>{n.t}
                </p>
                <p className="mt-1 text-xs text-muted md:text-sm">{n.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Scene>
    </>
  );
}
