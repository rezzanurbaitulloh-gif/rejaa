"use client";
// ============================================================
// Site.tsx — komposisi 8 blok + state global (loader, mode, modal)
// ============================================================
import { useCallback, useEffect, useState } from "react";
import {
  IntroLoader, ModeOverlay, PillNav, TargetCursor, Toggles,
  useLenis, type ViewMode,
} from "./chrome";
import { About, Hero, Manifesto, Skills } from "./sections";
import {
  Certificates, Contact, Experience, GitHub, ProjectModal,
  Services, Works, type ModalData,
} from "./more";
import type { Experience as Exp, Project, SiteData } from "@/lib/site";

export default function Site({ data }: { data: SiteData }) {
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<ViewMode>("3d");
  const [modal, setModal] = useState<ModalData | null>(null);
  useLenis(true);

  // Lock 2D di HP ala Davin (VIEW_MODE_CUTOFF 768)
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setMode("2d");
      document.body.classList.add("no3d");
    }
  }, []);

  const onMode = useCallback((m: ViewMode) => {
    setMode(m);
    document.body.classList.toggle("no3d", m === "2d");
    import("./chrome").then(({ getLenis }) => {
      const l = getLenis();
      if (m === "2d") l?.stop();
      else l?.start();
    });
    import("gsap").then(({ default: gsap }) =>
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => ScrollTrigger.refresh())
    );
  }, []);

  const openProject = useCallback((p: Project) => setModal({ kind: "p", item: p }), []);
  const openExp = useCallback((e: Exp) => setModal({ kind: "e", item: e }), []);
  const closeModal = useCallback(() => setModal(null), []);

  return (
    <>
      <div className="noise" />
      <TargetCursor />
      <IntroLoader done={() => setReady(true)} />
      <ModeOverlay />
      <PillNav />
      <Toggles mode={mode} onMode={onMode} />
      <main style={{ visibility: ready ? "visible" : "hidden" }}>
        <Hero profile={data.profile} socials={data.socials} />
        <Manifesto />
        <About
          profile={data.profile}
          experiences={data.experiences}
          projectTitles={data.projects.map((p) => p.title)}
        />
        <Skills skills={data.skills} />
        <Works projects={data.projects} onOpen={openProject} />
        <Services />
        <Experience exps={data.experiences} onOpen={openExp} />
        <GitHub profile={data.profile} projects={data.projects} />
        <Certificates certs={data.certificates} />
        <Contact profile={data.profile} socials={data.socials} live={data.live} />
        <footer>
          {data.live ? "● LIVE Supabase" : "○ DUMMY (isi env Supabase buat live)"}
          {" • "}cream editorial fusion{" • "}
          <a data-cur href="/admin" style={{ color: "inherit" }}>admin</a>
        </footer>
      </main>
      {modal && <ProjectModal data={modal} onClose={closeModal} />}
    </>
  );
}
