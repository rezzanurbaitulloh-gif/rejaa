"use client";
import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { springs } from "@/lib/motion-tokens";

const Ctx = createContext<{ go: (href: string) => void }>({ go: () => {} });
export const usePageTransition = () => useContext(Ctx);

/**
 * Cinematic route transition Portfolio ↔ PKL (spec level 6):
 * acid leading edge + black wipe covers, route swaps mid-cover,
 * wipe lifts to reveal the new scene.
 */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<"idle" | "cover" | "gone">("idle");
  const busy = useRef(false);

  const go = useCallback(
    (href: string) => {
      if (busy.current) return;
      busy.current = true;
      if (reduce) {
        router.push(href);
        busy.current = false;
        return;
      }
      setStage("cover");
      setTimeout(() => {
        router.push(href);
        window.scrollTo(0, 0);
        setTimeout(() => setStage("gone"), 250);
        setTimeout(() => {
          setStage("idle");
          busy.current = false;
        }, 900);
      }, 550);
    },
    [router, reduce]
  );

  return (
    <Ctx.Provider value={{ go }}>
      {children}
      <AnimatePresence>
        {stage !== "idle" && (
          <motion.div
            key="wipe"
            className="fixed inset-0 z-[80] pointer-events-none"
            initial={false}
            animate={stage === "cover" ? { y: "0%" } : { y: "-100%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{ y: "100%" }}
          >
            <div className="absolute inset-0 bg-[#0A0A0A]" />
            <div className="absolute inset-x-0 top-0 h-[6px] bg-[#B5E332]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-serif-d text-3xl text-white/90">AKUNSTOK</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
