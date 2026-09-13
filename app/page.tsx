"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/camera/SmoothScroll";
import ProcessLine from "@/components/process-line/ProcessLine";
import CursorLens from "@/components/cursor/CursorLens";
import Hud from "@/components/Hud";
import Opening from "@/components/scenes/Opening";
import IdentityThinking from "@/components/scenes/IdentityThinking";
import TechAI from "@/components/scenes/TechAI";
import RealPKL from "@/components/scenes/RealPKL";
import Projects from "@/components/scenes/Projects";
import GrowthEnding from "@/components/scenes/GrowthEnding";
import { getSnapshot, localSnapshot, type CMSnapshot } from "@/lib/cms";

// CosmicCanvas: single WebGL context, client-only, lazy
const CosmicCanvas = dynamic(() => import("@/components/cosmic/CosmicCanvas"), {
  ssr: false,
  loading: () => <div aria-hidden className="fixed inset-0 z-0 bg-[#050607]" />,
});

/**
 * One continuous world. CMS snapshot loads client-side with local fallback,
 * so prerender never breaks. `pkl_experience_enabled` OFF hides the PKL
 * chapter + its process-line branch with no gaps (§14 MASTER SPEC / §21 PRD).
 */
export default function Home() {
  const [snap, setSnap] = useState<CMSnapshot>(localSnapshot);

  useEffect(() => {
    let alive = true;
    getSnapshot().then((s) => {
      if (alive) setSnap(s);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <Hud />
      <CosmicCanvas />
      <ProcessLine pklEnabled={snap.pklEnabled} />
      <CursorLens />
      <SmoothScroll />
      <main className="relative z-10">
        <div id="opening">
          <Opening />
        </div>
        <div id="isi">
          <IdentityThinking />
        </div>
        <TechAI technologies={snap.technologies} />
        {snap.pklEnabled && <RealPKL />}
        <Projects projects={snap.projects} />
        <GrowthEnding technologies={snap.technologies} projects={snap.projects} />
      </main>
    </>
  );
}
