import { Opening } from "@/components/chapters/Opening";
import { CoreNarrative } from "@/components/chapters/CoreNarrative";
import { AiChapter } from "@/components/chapters/AiChapter";
import { PklChapter } from "@/components/chapters/PklChapter";
import { WorkChapter } from "@/components/chapters/WorkChapter";
import { ClosingChapter } from "@/components/chapters/ClosingChapter";

/**
 * STORY ARCHITECTURE (§4 MASTER SPEC):
 * Preloader → Opening → DALAM PROSES → Tentang → Bukan stack →
 * Berpikir → Bekerja → Technology Field → AI Second Mind →
 * Transisi → PKL chapter → Work Constellation → Project Detail →
 * Lessons → Growth → Kembali → Future → Ending → Contact.
 */
export default function Home() {
  return (
    <>
      <Opening />
      <CoreNarrative />
      <AiChapter />
      <PklChapter />
      <WorkChapter />
      <ClosingChapter />
    </>
  );
}
