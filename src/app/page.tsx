import { CosmosCanvas } from "@/components/cosmos/CosmosCanvas";
import { Opening } from "@/components/chapters/Opening";
import { AboutWorld } from "@/components/chapters/About";
import { ThinkingWorld } from "@/components/chapters/Thinking";
import { TechFieldWorld } from "@/components/chapters/TechField";
import { AIWorld } from "@/components/chapters/AISecondMind";
import { TransitionWorld } from "@/components/chapters/Transition";
import { PklChapter } from "@/components/chapters/PklChapter";
import { WorkChapter } from "@/components/chapters/WorkChapter";
import { ClosingChapter } from "@/components/chapters/Closing";

/**
 * SATU DUNIA BERKELANJUTAN — bukan section bertumpuk.
 * CosmosCanvas = dunia; Scene = waypoint kamera di dalamnya.
 * Scroll = kamera terbang mengikuti journey line. Tanpa pin, tanpa cut.
 */
export default function Home() {
  return (
    <>
      <CosmosCanvas />
      <Opening />
      <AboutWorld />
      <ThinkingWorld />
      <TechFieldWorld />
      <AIWorld />
      <TransitionWorld />
      <PklChapter />
      <WorkChapter />
      <ClosingChapter />
    </>
  );
}
