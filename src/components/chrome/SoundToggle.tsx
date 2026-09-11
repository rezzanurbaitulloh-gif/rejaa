"use client";

import { useStory } from "@/lib/store";

/** SOUND — optional, default OFF, tidak pernah jadi syarat memahami cerita. */
export function SoundToggle() {
  const soundOn = useStory((s) => s.soundOn);
  const toggleSound = useStory((s) => s.toggleSound);
  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-pressed={soundOn}
      aria-label={soundOn ? "Matikan suara" : "Nyalakan suara"}
      className="fixed bottom-5 right-5 z-[80] chip bg-void/70 backdrop-blur hover:text-cream"
    >
      <span className="accent-dot" style={{ opacity: soundOn ? 1 : 0.25 }} />
      SOUND {soundOn ? "ON" : "OFF"}
    </button>
  );
}
