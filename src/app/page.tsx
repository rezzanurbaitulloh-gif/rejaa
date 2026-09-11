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
 * SATU DUNIA BERKELANJUTAN — setiap world adalah pin kamera.
 * POINT (opening) → IDENTITAS → PROSES → MATERIAL → SECOND MIND →
 * TRANSISI → DUNIA NYATA (PKL) → KARYA → REFLEKSI → POINT (ending).
 */
export default function Home() {
  return (
    <>
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
