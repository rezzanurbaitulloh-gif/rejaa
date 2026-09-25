"use client";
// ============================================================
// chrome.tsx — Lenis sync, TargetCursor (Davin), pill nav,
// ViewModeToggle + ThemeToggle, loader & wipe overlay.
// ============================================================
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches;
export const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

// ---------------- Lenis (1 loop dengan GSAP ticker, ala Shashank) ----------------
let lenis: Lenis | null = null;
export function getLenis() {
  return lenis;
}
export function useLenis(active: boolean) {
  useEffect(() => {
    if (reduced() || !active) return;
    if (typeof window === "undefined" || !(window as unknown as { Lenis?: unknown }).Lenis) {
      // lenis di-import langsung, bukan via window — tetap jalan
    }
    const l = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis = l;
    l.on("scroll", ScrollTrigger.update);
    const fn = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(fn);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.config({ ignoreMobileResize: true });
    document.fonts.ready.then(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => {
      clearTimeout(t);
      gsap.ticker.remove(fn);
      l.destroy();
      lenis = null;
    };
  }, [active]);
}

export function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  if (document.body.classList.contains("no3d")) {
    (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
    return;
  }
  const l = getLenis();
  if (l) l.scrollTo(el as HTMLElement, { offset: -70 });
  else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
}

// ---------------- TargetCursor (Davin TargetCursor.tsx) ----------------
const CS = 12;
const REST = [
  { x: -18, y: -18 }, { x: 6, y: -18 }, { x: 6, y: 6 }, { x: -18, y: 6 },
];
export function TargetCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !finePointer() || reduced()) {
      if (wrap) wrap.style.display = "none";
      return;
    }
    document.body.classList.add("hidecursor");
    const corners = Array.from(wrap.querySelectorAll(".tc-corner"));
    gsap.set(wrap, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });
    corners.forEach((c, i) => gsap.set(c, { x: REST[i].x, y: REST[i].y }));
    const spin = gsap.timeline({ repeat: -1 }).to(wrap, { rotation: "+=360", duration: 2, ease: "none" });
    const qx = gsap.quickTo(wrap, "x", { duration: 0.1, ease: "power3.out" });
    const qy = gsap.quickTo(wrap, "y", { duration: 0.1, ease: "power3.out" });
    let activeT: HTMLElement | null = null;
    let leaveFn: (() => void) | null = null;
    let resumeT: ReturnType<typeof setTimeout> | null = null;
    const strength = { v: 0 };
    const tick = () => {
      if (!activeT) return;
      const r = activeT.getBoundingClientRect(), bw = 3;
      const T =
        r.width < 5
          ? REST
          : [
              { x: r.left - bw, y: r.top - bw },
              { x: r.right + bw - CS, y: r.top - bw },
              { x: r.right + bw - CS, y: r.bottom + bw - CS },
              { x: r.left - bw, y: r.bottom + bw - CS },
            ];
      const cx = gsap.getProperty(wrap, "x") as number;
      const cy = gsap.getProperty(wrap, "y") as number;
      corners.forEach((c, i) => {
        const curx = gsap.getProperty(c, "x") as number;
        const cury = gsap.getProperty(c, "y") as number;
        const fx = curx + (T[i].x - cx - curx) * strength.v;
        const fy = cury + (T[i].y - cy - cury) * strength.v;
        gsap.to(c, { x: fx, y: fy, duration: strength.v >= 0.99 ? 0.2 : 0.05, ease: "power1.out", overwrite: "auto" });
      });
    };
    const onMove = (e: MouseEvent) => { qx(e.clientX); qy(e.clientY); };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest?.("[data-cur]") as HTMLElement | null;
      if (!t || t === activeT) return;
      if (activeT && leaveFn) leaveFn();
      if (resumeT) { clearTimeout(resumeT); resumeT = null; }
      activeT = t;
      corners.forEach((c) => gsap.killTweensOf(c));
      gsap.killTweensOf(wrap, "rotation");
      spin.pause();
      gsap.set(wrap, { rotation: 0 });
      const cx = gsap.getProperty(wrap, "x") as number;
      const cy = gsap.getProperty(wrap, "y") as number;
      const r = t.getBoundingClientRect(), bw = 3;
      const T = [
        { x: r.left - bw, y: r.top - bw },
        { x: r.right + bw - CS, y: r.top - bw },
        { x: r.right + bw - CS, y: r.bottom + bw - CS },
        { x: r.left - bw, y: r.bottom + bw - CS },
      ];
      gsap.ticker.add(tick);
      gsap.to(strength, { v: 1, duration: 0.2, ease: "power2.out" });
      corners.forEach((c, i) =>
        gsap.to(c, { x: T[i].x - cx, y: T[i].y - cy, duration: 0.2, ease: "power2.out" })
      );
      leaveFn = () => {
        gsap.ticker.remove(tick);
        gsap.set(strength, { v: 0, overwrite: true });
        activeT = null;
        corners.forEach((c, i) =>
          gsap.to(c, { x: REST[i].x, y: REST[i].y, duration: 0.3, ease: "power3.out" })
        );
        resumeT = setTimeout(() => { if (!activeT) spin.restart(); resumeT = null; }, 50);
        t.removeEventListener("mouseleave", leaveFn as EventListener);
        leaveFn = null;
      };
      t.addEventListener("mouseleave", leaveFn);
    };
    let lastSC = 0;
    const onScroll = () => {
      if (!activeT) return;
      const now = performance.now();
      if (now - lastSC < 60) return; // max ~16fps layout check (spek Davin)
      lastSC = now;
      const cx = gsap.getProperty(wrap, "x") as number;
      const cy = gsap.getProperty(wrap, "y") as number;
      const u = document.elementFromPoint(cx, cy);
      if (!(u && (u === activeT || (u as HTMLElement).closest?.("[data-cur]") === activeT)) && leaveFn) leaveFn();
    };
    const dn = () => gsap.to(wrap, { scale: 0.9, duration: 0.2 });
    const up = () => gsap.to(wrap, { scale: 1, duration: 0.2 });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver, { passive: true } as AddEventListenerOptions);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
      spin.kill();
      document.body.classList.remove("hidecursor");
    };
  }, []);
  return (
    <div className="tc-wrap" id="tcwrap" ref={wrapRef}>
      <div className="tc-dot" />
      <div className="tc-corner tc-tl" />
      <div className="tc-corner tc-tr" />
      <div className="tc-corner tc-br" />
      <div className="tc-corner tc-bl" />
    </div>
  );
}

// ---------------- Pill nav ----------------
const NAV: [string, string][] = [
  ["#hero", "HOME"], ["#about", "ABOUT"], ["#skills", "SKILLS"],
  ["#works", "WORKS"], ["#exp", "EXP"], ["#github", "GITHUB"],
  ["#certs", "CERT"], ["#contact", "CONTACT"],
];
export function PillNav() {
  const [active, setActive] = useState("#hero");
  useEffect(() => {
    const spy = new IntersectionObserver(
      (es) => es.forEach((en) => {
        if (en.isIntersecting) setActive("#" + en.target.id);
      }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(([id]) => {
      const el = document.querySelector(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);
  return (
    <nav className="pillnav">
      <div className="in">
        {NAV.map(([id, label]) => (
          <a
            key={id} href={id} data-cur
            className={active === id ? "active" : ""}
            onClick={(e) => { e.preventDefault(); setActive(id); scrollToId(id); }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ---------------- Toggles ----------------
const ICO_GRID = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square"><rect x="3.5" y="3.5" width="17" height="17" /><line x1="3.5" y1="8.5" x2="20.5" y2="8.5" /><line x1="3.5" y1="13" x2="20.5" y2="13" /><line x1="9" y1="3.5" x2="9" y2="20.5" /><line x1="15" y1="3.5" x2="15" y2="20.5" /></svg>
);
const ICO_CUBE = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square"><path d="M12 2.8 L20.5 7.4 V16.6 L12 21.2 L3.5 16.6 V7.4 Z" /><line x1="12" y1="2.8" x2="12" y2="21.2" /><line x1="3.5" y1="7.4" x2="20.5" y2="7.4" /><line x1="3.5" y1="16.6" x2="20.5" y2="16.6" /><line x1="8" y1="5.1" x2="8" y2="10.5" /><line x1="16" y1="5.1" x2="16" y2="10.5" /></svg>
);
const ICO_MOON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
);
const ICO_SUN = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
);

export type ViewMode = "3d" | "2d";
export function Toggles({ mode, onMode }: { mode: ViewMode; onMode: (m: ViewMode) => void }) {
  const [busy, setBusy] = useState(false);
  const [dark, setDark] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const icoRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const target: ViewMode = mode === "3d" ? "2d" : "3d";
  const switchMode = () => {
    if (busy) return;
    setBusy(true);
    if (btnRef.current)
      gsap.fromTo(btnRef.current, { rotateY: 0 }, { rotateY: 360, duration: 0.6, ease: "expo.out" });
    if (icoRef.current)
      gsap.fromTo(icoRef.current, { rotateY: 90, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 0.35, ease: "easeOut" });
    const ov = document.getElementById("modeOverlay");
    const lab = document.getElementById("modeLabel");
    if (lab) lab.textContent = "ENTERING " + target.toUpperCase() + " MODE";
    const done = () => { onMode(target); setBusy(false); };
    if (!ov || reduced()) { done(); return; }
    gsap.timeline({ onComplete: () => setBusy(false) })
      .set(ov, { pointerEvents: "auto" })
      .fromTo(ov, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.38, ease: "expo.inOut" })
      .add(() => {
        onMode(target);
        window.scrollTo(0, 0);
        getLenis()?.scrollTo(0, { immediate: true });
      })
      .to(ov, { clipPath: "inset(100% 0 0 0)", duration: 0.37, ease: "expo.inOut" }, "+=0.05")
      .set(ov, { pointerEvents: "none" });
  };
  const toggleTheme = () => {
    const r = document.documentElement;
    const d = r.classList.toggle("dark");
    try { localStorage.setItem("theme", d ? "dark" : "light"); } catch { /* abaikan */ }
    setDark(d);
  };
  return (
    <div id="vmWrap">
      <span className="vm-label" id="vmLabel">{target === "2d" ? "2D MODE>" : "3D MODE>"}</span>
      <button ref={btnRef} className="vm-btn" data-cur onClick={switchMode}
        aria-label={`Switch to ${target.toUpperCase()} mode`} title={`Switch to ${target.toUpperCase()} mode`}>
        <span className="vm-ico" ref={icoRef}>{target === "2d" ? ICO_GRID : ICO_CUBE}</span>
      </button>
      <button className="theme-btn" data-cur onClick={toggleTheme} aria-label="Toggle Theme" title="Toggle theme">
        {dark ? ICO_SUN : ICO_MOON}
      </button>
    </div>
  );
}

// ---------------- Loader + overlay ----------------
export function IntroLoader({ done }: { done: () => void }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(100, p + Math.ceil(Math.random() * 14));
      setPct(p);
      if (p >= 100) {
        clearInterval(iv);
        gsap.to("#loader", {
          yPercent: -100, duration: 0.7, ease: "power3.inOut",
          onComplete: () => { setGone(true); done(); },
        });
        gsap.fromTo("#curtain", { y: "100%" }, { y: "-100%", duration: 0.7, ease: "power3.inOut" });
      }
    }, 90);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (gone) return null;
  return (
    <>
      <div id="loader"><div className="big">HELLO</div><div className="pct">{pct}%</div></div>
      <div id="curtain" />
    </>
  );
}

export function ModeOverlay() {
  return (
    <div className="mode-overlay" id="modeOverlay">
      <span className="mo-big" id="modeLabel">ENTERING 2D MODE</span>
      <span className="mo-sub">CREAM EDITORIAL FUSION</span>
    </div>
  );
}
