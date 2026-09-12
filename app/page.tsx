"use client";

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

// CosmicCanvas: single WebGL context, client-only, lazy
const CosmicCanvas = dynamic(() => import("@/components/cosmic/CosmicCanvas"), {
  ssr: false,
  loading: () => <div aria-hidden className="fixed inset-0 z-0 bg-[#050607]" />,
});

export default function Home() {
  return (
    <>
      <Hud />
      <CosmicCanvas />
      <ProcessLine />
      <CursorLens />
      <SmoothScroll />
      <main id="isi" className="relative z-10">
        <div id="opening">
          <Opening />
        </div>
        <IdentityThinking />
        <TechAI />
        <RealPKL />
        <Projects />
        <GrowthEnding />
      </main>
    </>
  );
}
