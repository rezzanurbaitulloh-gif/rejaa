"use client";
// ============================================================
// Site.tsx — komposisi 8 blok + state global (loader, mode, modal)
// ============================================================
import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IntroLoader, ModeOverlay, PillNav, TargetCursor, Toggles,
  useLenis, type ViewMode,
} from "./chrome";
import { About, Hero, Manifesto, Skills } from "./sections";
import {
  Contact, ProjectModal,
  Services, Works, type ModalData,
} from "./more";
import type { Project, SiteData } from "@/lib/site";

export default function Site({ data }: { data: SiteData }) {
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<ViewMode>("3d");
  const [modal, setModal] = useState<ModalData | null>(null);
  // Lenis hidup TERUS di kedua mode (persis useLenisScroll Davin).
  // stop() hanya dipakai saat modal terbuka (di ProjectModal).
  useLenis(true);

  // Zoom scrub ala preview — hanya mode 3D (2D = final state)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || mode !== "3d") {
      gsap.set("[data-zoom]", { scale: 1, opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
        gsap.fromTo(el, { scale: 0.92, opacity: 0.5 }, {
          scale: 1, opacity: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 92%", end: "top 55%", scrub: true },
        });
      });
    });
    return () => ctx.revert();
  }, [mode]);

  // Default 3D di semua ukuran (HP dapat 3D-lite: scrub tanpa pin).
  // Toggle 2D selalu tersedia sebagai mode statis-cepat.

  const onMode = useCallback((m: ViewMode) => {
    // Bersihkan semua ScrollTrigger lama SEBELUM ganti mode — kalau Hero
    // beralih 3D↔2D, subtree-nya di-unmount/di-ganti React. Pin-spacer yang
    // masih melekat ke DOM lama akan bikin React removeChild gagal
    // ("node is not a child of this node") → crash halaman.
    ScrollTrigger.getAll().forEach((t) => t.kill());
    setMode(m);
    document.body.classList.toggle("no3d", m === "2d");
    window.scrollTo(0, 0);
    // Biarkan useLayoutEffect tiap komponen yang re-create ScrollTrigger
    // sesuai mode setelah layout settle. Jangan refresh() agresif di sini.
  }, []);

  const openProject = useCallback((p: Project) => setModal({ kind: "p", item: p }), []);
  const closeModal = useCallback(() => setModal(null), []);

  return (
    <>
      <div className="noise" />
      <div className="p2d-watermark" aria-hidden="true">
        {data.profile.name.replace(/\.\s*$/, "").toUpperCase()}
      </div>
      <TargetCursor />
      <IntroLoader done={() => setReady(true)} />
      <ModeOverlay />
      <PillNav />
      <Toggles mode={mode} onMode={onMode} />
      <main style={{ visibility: ready ? "visible" : "hidden" }}>
        <Hero profile={data.profile} socials={data.socials} mode={mode} />
        <Manifesto mode={mode} />
        <About
          profile={data.profile}
          experiences={data.experiences}
          projectTitles={data.projects.map((p) => p.title)}
        />
        <Skills skills={data.skills} mode={mode} />
        <Works projects={data.projects} onOpen={openProject} mode={mode} />
        <Services />
        <Contact profile={data.profile} socials={data.socials} live={data.live} />
        {mode === "2d" ? (
          <footer className="p2d-footer">
            <span>© PORTOJA</span>
          </footer>
        ) : (
          <footer>
            <span>© PORTOJA</span>
          </footer>
        )}
      </main>
      {modal && <ProjectModal data={modal} onClose={closeModal} />}
    </>
  );
}
