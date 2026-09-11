"use client";

import { create } from "zustand";

export type LensState = "default" | "view" | "project" | "drag" | "link" | "external";

interface StoryState {
  introDone: boolean;
  introSkipped: boolean;
  completeIntro: (skipped?: boolean) => void;
  pklEnabled: boolean;
  setPklEnabled: (v: boolean) => void;
  soundOn: boolean;
  toggleSound: () => void;
  lens: { state: LensState; label: string };
  setLens: (state: LensState, label?: string) => void;
}

const LENS_LABEL: Record<LensState, string> = {
  default: "",
  view: "VIEW ↗",
  project: "VIEW PROJECT",
  drag: "↔ DRAG",
  link: "OPEN ↗",
  external: "OPEN ↗",
};

export const useStory = create<StoryState>((set) => ({
  introDone: false,
  introSkipped: false,
  completeIntro: (skipped = false) => set({ introDone: true, introSkipped: skipped }),
  pklEnabled: true,
  setPklEnabled: (v) => set({ pklEnabled: v }),
  soundOn: false,
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  lens: { state: "default", label: "" },
  setLens: (state, label) => set({ lens: { state, label: label ?? LENS_LABEL[state] } }),
}));
