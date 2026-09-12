"use client";

import { Scene } from "@/components/cosmos/Scene";
import { MemoryPhoto } from "@/components/cosmos/MemoryPhoto";

/**
 * DIGITAL → REAL (§20). Kamera pullback: dunia digital mengecil,
 * satu titik terang membesar — foto dunia nyata muncul dan menajam.
 * Meninggalkan semesta digital, memasuki realitas: PKL.
 */
export function TransitionWorld() {
  return (
    <>
      <Scene stop="transition" label="Transisi ke Dunia Nyata" minH="140svh" align="center">
        <p className="body-muted mx-auto max-w-md">Tapi semua itu tidak berarti jika hanya berhenti di dalam layar.</p>
        <h2 className="font-display mx-auto mt-10 max-w-3xl text-4xl font-extrabold uppercase md:text-6xl">
          Lalu saya masuk<br /><span className="text-accent">ke dunia nyata.</span>
        </h2>
      </Scene>

      <Scene stop="transition" label="Realitas muncul" minH="130svh" align="center">
        <p className="chapter-label">MEMASUKI CHAPTER BARU</p>
        <MemoryPhoto
          wide
          src="/mem/facade.jpg"
          alt="Gedung tempat PKL berlangsung"
          caption="Dunia nyata — tempat teori diuji."
        />
      </Scene>
    </>
  );
}
