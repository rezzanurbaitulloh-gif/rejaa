"use client";
// ============================================================
// sections.tsx — Hero (Shashank), Manifesto, About (Davin),
// Skills orbit + portal zoom (Shashank Skills.jsx).
// ============================================================
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Profile, SkillCoin, Social, Experience } from "@/lib/site";
import { BrandLogo } from "./BrandLogo";
import { finePointer, isMobile, reduced } from "./chrome";

gsap.registerPlugin(ScrollTrigger);

const T = (texts: Record<string, string> | undefined, key: string, fallback: string) =>
  texts && texts[key] ? texts[key] : fallback;

// ---------------- HERO ----------------
const POOL = "⠁⠂⠃⠆⠇⠉⠊⠋⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯";

function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv || reduced()) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const CH = "010101ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const FS = 15;
    let cols = 0, drops: number[] = [], act: boolean[] = [];
    const init = () => {
      const hero = document.getElementById("hero");
      cv.width = window.innerWidth;
      cv.height = hero ? hero.clientHeight : window.innerHeight;
      cols = Math.floor(cv.width / FS);
      drops = []; act = [];
      for (let x = 0; x < cols; x++) { act[x] = Math.random() > 0.95; drops[x] = Math.random() * -100; }
    };
    init();
    window.addEventListener("resize", init);
    const iv = setInterval(() => {
      if (document.body.classList.contains("no3d")) return;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,.1)";
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.globalCompositeOperation = "source-over";
      const darkMode = document.documentElement.classList.contains("dark");
      ctx.fillStyle = darkMode ? "rgba(216,201,168,.5)" : "rgba(60,50,35,.55)";
      ctx.font = FS + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        if (act[i]) ctx.fillText(CH[(Math.random() * CH.length) | 0], i * FS, drops[i] * FS);
        if (drops[i] * FS > cv.height && Math.random() > 0.975) {
          ctx.clearRect(i * FS, 0, FS, cv.height);
          drops[i] = 0; act[i] = Math.random() > 0.95;
        }
        drops[i]++;
      }
    }, 60);
    return () => { clearInterval(iv); window.removeEventListener("resize", init); };
  }, []);
  return <canvas id="matrix" ref={ref} />;
}

function Scramble({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const fire = () => {
    const el = ref.current;
    if (!el || busy.current || reduced()) return;
    busy.current = true;
    let it = 0;
    const t = setInterval(() => {
      el.innerHTML = text.split("").map((ch, i) => {
        if (ch === " ") return " ";
        if (i < Math.floor(it)) return ch;
        return `<span class="scrambled-char">${POOL[(Math.random() * POOL.length) | 0]}</span>`;
      }).join("");
      it += 0.4;
      if (it >= text.length) { clearInterval(t); el.textContent = text; busy.current = false; }
    }, 40);
  };
  return <span className="name" ref={ref} onMouseEnter={fire}>{text}</span>;
}

const ART_META = (texts?: Record<string, string>) => [
  { tag: T(texts, "art_ig_tag", "LIVE"), foot: T(texts, "art_ig_foot", "● Active"), go: T(texts, "art_ig_go", "Follow ↗"), sub: T(texts, "art_ig_sub", "personal + views") },
  { tag: T(texts, "art_gh_tag", "OPTIMIZED"), foot: T(texts, "art_gh_foot", "repos: live"), go: T(texts, "art_gh_go", "Open ↗"), sub: T(texts, "art_gh_sub", "Next • Supabase") },
  { tag: T(texts, "art_in_tag", "SECURED"), foot: T(texts, "art_in_foot", "respon < 2 hari"), go: T(texts, "art_in_go", "Hire ↗"), sub: T(texts, "art_in_sub", "freelance: open") },
];

// Hero versi 2D editorial ala Hero2D Davin: kicker nomor, serif raksasa,
// spec-sheet, marquee. Render kondisional (tanpa canvas/parallax/pin).
function Hero2DView({ profile, texts }: { profile: Profile; texts?: Record<string, string> }) {
  const first = profile.name.replace(/\.\s*$/, "");
  const rows: [string, string][] = [
    [T(texts, "spec_name", "NAME"), `${first} — Indonesia`],
    [T(texts, "spec_role", "ROLE"), profile.role],
    [T(texts, "spec_focus", "FOCUS"), T(texts, "ai_assisted_building", "Product development")],
    [T(texts, "spec_base", "BASE"), profile.location],
    [T(texts, "spec_status", "STATUS"), profile.status],
  ];
  const ticker = T(texts, "ticker2d", "NEXT.JS ✦ SUPABASE ✦ TYPESCRIPT ✦ CLEAN SHIPPING ✦ ");
  return (
    <header id="hero" className="p2d-hero">
      <div className="p2d-hero-grid">
        <div>
          <span className="p2d-kicker">{T(texts, "p2d_kicker", "( 00 ) / INTRO — PERSONAL INDEX")}</span>
          <h1 className="p2d-h1" style={{ animationDelay: ".35s" }}>Hi!</h1>
          <h1 className="p2d-h1 p2d-italic" style={{ animationDelay: ".5s" }}>I&apos;m {first}</h1>
          <p className="p2d-lede" style={{ animationDelay: ".65s" }}>{profile.bio}</p>
        </div>
        <div className="p2d-spec" style={{ animationDelay: ".7s" }}>
          {rows.map(([k, v]) => (
            <div key={k} className="p2d-spec-row">
              <span className="p2d-spec-k">{k}</span>
              <span className="p2d-spec-dots" />
              <span className="p2d-spec-v">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p2d-marquee" aria-hidden="true">
        <div className="p2d-marquee-track"><span>{ticker}{ticker}</span><span>{ticker}{ticker}</span></div>
      </div>
    </header>
  );
}

export function Hero({ profile, socials, mode, texts }: {
  profile: Profile; socials: Social[]; mode: "3d" | "2d"; texts?: Record<string, string>;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const a1 = useRef<HTMLAnchorElement>(null);
  const a2 = useRef<HTMLAnchorElement>(null);
  const a3 = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (!finePointer() || reduced()) return;
    const onMove = (e: MouseEvent) => {
      if (document.body.classList.contains("no3d")) return; // 2D = diam
      const xp = (e.clientX / window.innerWidth - 0.5) * 2;
      const yp = (e.clientY / window.innerHeight - 0.5) * 2;
      const arts: [React.RefObject<HTMLAnchorElement | null>, number][] = [[a1, 30], [a2, 50], [a3, -25]];
      arts.forEach(([r, d]) => {
        if (r.current) gsap.to(r.current, { x: xp * d * 0.6, y: yp * d * 0.6, duration: 1, ease: "power2.out", overwrite: "auto" });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  useEffect(() => {
    const els = [a1.current, a2.current, a3.current].filter(Boolean) as HTMLAnchorElement[];
    // Mode 2D = kartu medsos statis total ( kayak Fallback2D Davin )
    // killTweensOf WAJIB: tween parallax (efek sebelah) masih hidup & nulis ulang tiap tick
    if (reduced() || mode !== "3d") {
      gsap.killTweensOf(els);
      gsap.set(els, { clearProps: "all" });
      return;
    }
    const floats = [a1, a2, a3];
    const tweens = floats.map((r) => {
      if (!r.current) return null;
      const loop = (): gsap.core.Tween => gsap.to(r.current, {
        yPercent: gsap.utils.random(-8, 8), xPercent: gsap.utils.random(-4, 4),
        rotation: gsap.utils.random(-3, 3), duration: gsap.utils.random(3, 6),
        ease: "sine.inOut", onComplete: () => { loop(); },
      });
      return loop();
    });
    return () => { tweens.forEach((t) => t?.kill()); };
  }, [mode]);
  useLayoutEffect(() => {
    if (reduced() || !contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("#heroContent",
        { opacity: 0, y: 15, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out", delay: 0.9 });
      // Pin sinematik ala preview — hanya mode 3D (2D = statis, native scroll)
      if (mode === "3d" && window.innerWidth >= 900) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "#hero", start: "top top", end: "+=150%", pin: true, scrub: 1 },
        });
        tl.to("#heroContent h1", { yPercent: -12, opacity: 0.25, ease: "none" }, 0)
          .to("#heroContent p, #heroContent .tags", { yPercent: -20, opacity: 0, ease: "none" }, 0);
      }
    });
    return () => ctx.revert();
  }, [mode]);
  const arts = [a1, a2, a3];
  const ids = ["a-ig", "a-gh", "a-in"];
  const metas = ART_META(texts);
  // Mode 2D = pohon editorial terpisah (ala Portfolio2D Davin)
  if (mode === "2d") return <Hero2DView profile={profile} />;
  return (
    <header id="hero">
      <MatrixRain />
      <div className="spot spot-1" />
      <div className="spot spot-2" />
      {socials.slice(0, 3).map((s, i) => (
        <a key={s.name} className="artifact" id={ids[i]} data-cur
          href={s.link} target="_blank" rel="noopener noreferrer"
          ref={arts[i] as React.Ref<HTMLAnchorElement>}>
          <span className="rim" />
          <div className="pad">
            <div className="hd"><span>{s.name}</span><span>{metas[i].tag}</span></div>
            <div className="logo-big">
              <BrandLogo name={s.icon} size={56} />
            </div>
            <div className="hd"><span>{metas[i].sub}</span></div>
            <div className="ft"><span>{metas[i].foot}</span><span className="go">{metas[i].go}</span></div>
          </div>
        </a>
      ))}
      <div className="hero-content" id="heroContent" ref={contentRef}>
        <p className="kicker">{T(texts, "hero_kicker", "ABOUTME — NEXT + SUPABASE")}</p>
        <h1 className="greet">
          <span className="hi">Hi, I&apos;m</span>
          <Scramble text={profile.name} />
        </h1>
        <p className="hero-desc">{profile.bio}</p>
        <div className="tags">
          <span className="tag"><i />{T(texts, "tag_fullstack", "Full-Stack")}</span>
          <span className="tag"><i />{T(texts, "tag_nxt", "Next + Supabase")}</span>
          <span className="tag"><i />{T(texts, "tag_ai", "Product-minded")}</span>
        </div>
      </div>
      <div className="scrolldown">{T(texts, "hero_scroll", "DESCEND ↓")}</div>
    </header>
  );
}

// ---------------- MANIFESTO ----------------
export function Manifesto({ mode, texts }: { mode: "3d" | "2d"; texts?: Record<string, string> }) {
  const manifesto = T(texts, "manifesto", "Ide bagus sayang kalo cuma jadi obrolan. Mending jadiin produk yang bisa dibuka dan dipake.");
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = manifesto.trim().split(" ").map((w) => `<span class="w">${w}</span>`).join(" ");
    // Mode 2D = teks final terlihat penuh, tanpa scrub
    if (reduced() || mode !== "3d") {
      gsap.set("#maniText .w", { opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to("#maniText .w", {
        opacity: 1, stagger: 0.06, ease: "none",
        scrollTrigger: { trigger: "#manifesto", start: "top 75%", end: "bottom 55%", scrub: true },
      });
    });
    return () => ctx.revert();
  }, [mode]);
  const mq = T(texts, "marquee3d", "MARKETPLACE • PENJUALAN • KONVERTER • NEXT • SUPABASE • TYPESCRIPT •") + "\u00A0";
  return (
    <>
      <div id="manifesto"><div className="mani" id="maniText" ref={ref}>
        {manifesto}
      </div></div>
      <div className="marquee"><span>{mq}</span><span>{mq}</span></div>
    </>
  );
}

// ---------------- ABOUT (Davin) ----------------
const METERS: [string, number][] = [
  ["NEXT.JS & SUPABASE", 90], ["BACKEND & DATABASE", 88],
  ["API & DATABASE DESIGN", 85], ["UI & MOTION", 78],
];
const STACKS: [string, string[]][] = [
  ["FRONTEND & WEB", ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "GSAP / Lenis"]],
  ["BACKEND & DATA", ["Supabase", "PostgreSQL", "Auth + RLS", "Storage", "REST API"]],
  ["WORKFLOW & DEPLOYMENT", ["Git & version control", "Vercel deployment", "REST API integration", "Dokumentasi"]],
];
const STATS: [string, string][] = [
  ["3+", "PRODUK JALAN"], ["100%", "DEPLOYED & LIVE"],
  ["2+", "TAHUN NGODING"], ["24H", "RESPON CEPAT"],
];
const LOGS: [string, string][] = [
  ["2026-01-12", "SHIPPED KONVERTER MVP v0.1"],
  ["2025-11-03", "DEPLOYED WEB PENJUALAN + RLS"],
  ["2025-08-20", "SHIPPED MARKETPLACE MINI"],
  ["2025-06-01", "MULAI FREELANCE FULL-STACK"],
];
// Multi-value: 1 key = beberapa baris (newline). Kosong/absen → default.
const lines = (v: string | undefined, fb: string[]) =>
  v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : fb;
const TABS = ["ABOUT", "SKILLS", "STACK", "STATS", "WORK", "LOGS"] as const;

export function About({ profile, experiences, projectTitles, texts }: {
  profile: Profile; experiences: Experience[]; projectTitles: string[]; texts?: Record<string, string>;
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("ABOUT");
  const stacks = [1, 2, 3].map((i) => ({
    name: T(texts, "stack" + i + "_name", STACKS[i - 1]?.[0] ?? ""),
    items: lines(texts?.["stack" + i + "_items"], STACKS[i - 1]?.[1] ?? []),
  })).filter((s) => s.name);
  const statVals = lines(texts?.stats_vals, STATS.map((s) => s[0]));
  const statLabels = lines(texts?.stats_labels, STATS.map((s) => s[1]));
  const logDates = lines(texts?.logs_dates, LOGS.map((l) => l[0]));
  const logTexts = lines(texts?.logs_texts, LOGS.map((l) => l[1]));
  return (
    <section className="block" id="about">
      <div className="kicker" data-sec="( 01 )">{T(texts, "about_kicker", "ABOUT")}</div>
      <h2 className="t">{T(texts, "about_h2", "Kenalan, versi rapi.")}</h2>
      <div className="about-slide-layout">
        <div className="profile-column">
          <div className="profile-photo-container" data-cur>
            <div className="hud-corner hud-top-left" />
            {profile.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.photo} alt={profile.name} className="profile-photo" />
            ) : (
              <div className="photo-dummy">FOTO<br /><small style={{ fontSize: 13 }}>ganti via admin (avatar)</small></div>
            )}
          </div>
          <div className="profile-details-grid">
            <div className="detail-box">
              <span className="detail-label">{T(texts, "about_focus_label", "FOKUS")}</span>
              <span className="detail-value"><span className="university-logo">N</span><span className="university-name">{T(texts, "about_focus_val", "Next + Supabase")}</span></span>
            </div>
            <div className="detail-box">
              <span className="detail-label">{T(texts, "about_status", "STATUS")}</span>
              <span className="detail-value">{profile.status}</span>
            </div>
          </div>
          <div className="profile-mindset-row">
            <div className="mindset-card"><span className="mindset-title">{T(texts, "m_sw_title", "SOFTWARE")}</span><span className="mindset-subtitle">{T(texts, "m_sw_sub", "ENGINEERING")}</span></div>
            <div className="mindset-card"><span className="mindset-title">{T(texts, "m_ai_title", "PRODUCT")}</span><span className="mindset-subtitle">{T(texts, "m_ai_sub", "DEVELOPMENT")}</span></div>
            <div className="mindset-card"><span className="mindset-title">{T(texts, "m_fs_title", "FULL-STACK")}</span><span className="mindset-subtitle">{T(texts, "m_fs_sub", "DEVELOPMENT")}</span></div>
          </div>
        </div>
        <div className="about-right-content-area">
          <div className="atabs">
            {TABS.map((t) => (
              <button key={t} data-cur onClick={() => setTab(t)}
                className={"atab" + (tab === t ? " on" : "")}>{T(texts, "tab_" + t.toLowerCase(), t)}</button>
            ))}
          </div>
          {tab === "ABOUT" && (
            <div className="apanel on">
              <h2 className="about-title">{profile.role}</h2>
              <h4 className="about-subtitle-text">{T(texts, "about_subtitle", "ngubah ide jadi produk digital yang kepake")}</h4>
              <div className="about-tags-row">
                {lines(texts?.about_tags, ["NEXT + SUPABASE", "PRODUCT DEVELOPMENT", "CLEAN SHIPPING"]).map((t, i) => (
                  <Fragment key={i}>{i > 0 && <span className="separator">/</span>}<span>{t}</span></Fragment>
                ))}
              </div>
              <div className="about-description"><p>{profile.bio}</p>
                <p>{T(texts, "ed_prose", "Fokus: arsitektur yang masuk akal, database yang aman (RLS), dan UI yang orang awam ngerti.")}</p></div>
              <div className="about-focus-section"><span className="focus-label">{T(texts, "activity_logs", "ACTIVITY LOGS")}</span>
                <div className="focus-cards-grid">
                  {projectTitles.slice(0, 3).map((t) => <div key={t} className="focus-card">{t.toUpperCase().slice(0, 12)}</div>)}
                  <div className="focus-card more-card">{T(texts, "more_card", "+N")}</div>
                </div>
              </div>
            </div>
          )}
          {tab === "SKILLS" && (
            <div className="apanel on"><h3 className="tab-title">{T(texts, "about_panel_skills", "Technical Skill Indices")}</h3>
              {lines(texts?.meters_labels, METERS.map((m) => m[0])).map((n, i) => (
                <div key={n} className="skill-meter-row">
                  <div className="skill-meter-header"><span>{n}</span><span className="skill-meter-percent">{METERS[i]?.[1] ?? 70}%</span></div>
                  <div className="skill-meter-track"><div className="skill-meter-fill" style={{ width: `${METERS[i]?.[1] ?? 70}%` }} /></div>
                </div>
              ))}
            </div>
          )}
          {tab === "STACK" && (
            <div className="apanel on"><h3 className="tab-title">{T(texts, "about_panel_stack", "Technical Stacks & Tools")}</h3>
              <div className="stacks-grid">
                {stacks.map(({ name, items }, i) => (
                  <div key={name + i} className="stack-category-card">
                    <span className="stack-category-title">{name}</span>
                    <div>{items.map((it) => <span key={it} className="stack-item-tag">{it}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "STATS" && (
            <div className="apanel on"><h3 className="tab-title">{T(texts, "about_panel_stats", "Production Telemetry Stats")}</h3>
              <div className="stats-grid-row">
                {statVals.map((v, i) => (
                  <div key={v + i} className="stat-telemetry-box">
                    <span className="stat-value-hud">{v}</span><span className="stat-label-hud">{statLabels[i] ?? ""}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "WORK" && (
            <div className="apanel on"><h3 className="tab-title">{T(texts, "about_panel_work", "Professional Work Experience")}</h3>
              {experiences.map((e) => (
                <div key={e.id} className="work-timeline-item">
                  <div className="work-item-header"><h4 className="work-item-role">{e.title}</h4><span className="work-item-period">{e.date}</span></div>
                  <span className="work-item-company">{e.company}</span>
                  <p className="work-item-desc">{e.description}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "LOGS" && (
            <div className="apanel on"><h3 className="tab-title">{T(texts, "about_panel_logs", "System Activity Logs")}</h3>
              <div className="terminal-logs-container">
                <div className="terminal-header"><span className="terminal-dot red" /><span className="terminal-dot yellow" /><span className="terminal-dot green" /><span className="terminal-title">{T(texts, "logs_file", "system_activity.log")}</span></div>
                <div className="terminal-body">
                  {logDates.map((t, i) => (
                    <div key={t + i} className="terminal-line"><span className="log-timestamp">[{t}]</span><span className="log-action"> {logTexts[i] ?? ""}</span></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------------- SKILLS orbit (Shashank Skills.jsx) ----------------
export function Skills({ skills, mode, texts }: { skills: SkillCoin[]; mode: "3d" | "2d"; texts?: Record<string, string> }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (reduced() || mode !== "3d") {
      gsap.set("#portal", { display: "none" });
      gsap.set("#orbitSys, #skillsHead, #orbitCenter", { opacity: 1, scale: 1, y: 0, rotation: 0 });
      return;
    }
    // HP: zoom ringan TANPA pin (pin 120% terlalu berat di touch)
    if (isMobile()) {
      const mctx = gsap.context(() => {
        gsap.set("#portal", { display: "", scale: 0, xPercent: -50, yPercent: -50 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 75%", end: "bottom 35%", scrub: 1,
          },
        });
        tl.fromTo("#orbitSys", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, ease: "none" }, 0)
          .to("#orbitWrap", { scale: 2.4, ease: "none" }, 0.4)
          .to("#orbitCenter, #skillsHead", { opacity: 0, ease: "none" }, 0.5)
          .to("#portal", { scale: 1.4, ease: "none" }, 0.55);
      });
      return () => mctx.revert();
    }
    const ctx = gsap.context(() => {
      gsap.set("#portal", { scale: 0, xPercent: -50, yPercent: -50 });
      const ent = gsap.timeline({
        scrollTrigger: { trigger: ".skills-container", start: "top 70%", toggleActions: "play none none reverse" },
      });
      ent.fromTo("#skillsHead",
        { opacity: 0, y: -30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" })
        .fromTo("#orbitSys",
          { opacity: 0, scale: 0.5, rotation: -45 },
          { opacity: 1, scale: 1, rotation: 0, duration: 2.2, ease: "expo.out" }, "-=0.8");
      const zoom = gsap.timeline({
        scrollTrigger: { trigger: ".skills-container", start: "center 45%", end: "+=120%", pin: true, scrub: 0.8 },
      });
      zoom.to("#orbitCenter", { opacity: 0, duration: 0.5, ease: "power2.out" }, 0)
        .to("#orbitWrap", { scale: 15, duration: 2, ease: "power2.in" }, 0)
        .to("#skillsHead", { y: -100, opacity: 0, duration: 0.5 }, 0.5)
        .to("#orbitSys", { opacity: 0, duration: 0.5 }, 1.5)
        .to("#portal", { scale: 1.5, duration: 0.3, ease: "power2.in" }, 1.2);
    });
    return () => ctx.revert();
  }, [mode]);
  const coins = skills.length ? skills : [{ name: "?", icon: "?" }];
  return (
    <div className="skills-container" id="skills" ref={wrapRef}>
      <div className="cream-portal" id="portal" />
      <div className="ambient" />
      <div className="glitch"><i /><i /><i /></div>
      <div className="skills-header" id="skillsHead">
        <h2 className="skills-title" data-text="Skills">{T(texts, "skill_title", "Skills")}</h2>
        <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".15em" }}>
          {coins.length} {T(texts, "skills_sub", "COIN • HOVER = FLIP • EDIT VIA /admin")}
        </p>
      </div>
      <div className="skills-orbit-wrap" id="orbitWrap">
        <div className="orbit-system" id="orbitSys">
          <div className="orbit-center" id="orbitCenter">
            <p>{T(texts, "skills_center", "Merancang dan membangun solusi digital — dari ide sampai sistem end-to-end yang beneran kepake.")}</p>
          </div>
          <div className="orbit-ring" id="orbitRing">
            {coins.map((s, i) => (
              <div key={s.name + i} className="coin-pos" data-cur
                style={{ ["--angle" as string]: `${(i * 360) / coins.length}deg` }}>
                <div className="coin-tilt"><div className="skill-coin">
                  <div className="coin-glare" />
                  <div className="coin-content">
                    <div className="coin-icon"><BrandLogo name={s.icon} size={32} /></div>
                    <span className="coin-name">{s.name}</span>
                  </div>
                </div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
