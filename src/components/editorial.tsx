"use client";
// ============================================================
// editorial.tsx — dunia 2D (monochrome editorial).
// Dipisah total dari pohon 3D: nav sendiri, section sendiri,
// footer sendiri. Semua warna via --ed-* (di-scope body.no3d).
// ============================================================
import { Fragment, useCallback, useEffect, useState } from "react";
import type { Profile, Project, SkillCoin, Social } from "@/lib/site";
import { VERCEL_PROJECTS } from "@/lib/vercel-projects";
import { getLenis } from "./chrome";

const NAV: [string, string][] = [
  ["#hero", "HOME"], ["#about", "ABOUT"], ["#skills", "SKILLS"],
  ["#works", "WORKS"], ["#github", "GITHUB"], ["#contact", "CONTACT"],
];
const NAV_KEY: Record<string, string> = {
  "#hero": "nav_home", "#about": "nav_about", "#skills": "nav_skills",
  "#works": "nav_works", "#github": "nav_github", "#contact": "nav_contact",
};
const T = (texts: Record<string, string> | undefined, key: string, fallback: string) =>
  texts && texts[key] ? texts[key] : fallback;

// ---------------- helpers ----------------
function jumpTo(id: string) {
  const el = document.querySelector(id) as HTMLElement | null;
  if (!el) return;
  const l = getLenis();
  if (l) l.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "smooth" });
}

function useClock() {
  const [t, setT] = useState({ hms: "00:00:00", ampm: "00:00:00 AM" });
  useEffect(() => {
    const f = () => {
      try {
        const n = new Date();
        setT({
          hms: new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit",
            second: "2-digit", hour12: false,
          }).format(n),
          ampm: new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit",
            second: "2-digit", hour12: true,
          }).format(n),
        });
      } catch { /* biarkan */ }
    };
    f();
    const iv = setInterval(f, 1000);
    return () => clearInterval(iv);
  }, []);
  return t;
}

// ---------------- section head ----------------
// Format referensi: { 03 }  Selected Works  PROJECT ARCHIVE ─────────
function Head({ n, label, title }: { n: string; label: string; title: string }) {
  return (
    <div className="ed-head">
      <span className="ed-num">&#123; {n} &#125;</span>
      <h2 className="ed-title">{title}</h2>
      <span className="ed-sec-label">{label}</span>
      <span className="ed-head-line" />
    </div>
  );
}

const ICO_MOON = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const ICO_SUN = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
  </svg>
);
const ICO_GLOBE = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.3 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.3-3.6-8.5S9.6 5.9 12 3.5z" />
  </svg>
);

// ---------------- nav ----------------
export function EditorialNav({ onMode, texts }: { onMode: (m: "3d" | "2d") => void; texts?: Record<string, string> }) {
  const [active, setActive] = useState("#hero");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const spy = new IntersectionObserver(
      (es) => es.forEach((en) => { if (en.isIntersecting) setActive("#" + en.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach(([id]) => {
      const el = document.querySelector(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  // Nav mini — scroll turun > threshold: wordmark + link hilang,
  // tombol CTA/3D tetap terlihat. Scroll kembali ke atas: full nav.
  useEffect(() => {
    const nav = document.querySelector(".ed-nav");
    if (!nav) return;
    const t = 110;
    let prev = 0;
    const f = () => {
      const y = window.scrollY;
      if (y > t && prev < y) nav.classList.add("is-min");
      else nav.classList.remove("is-min");
      prev = y;
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const d = root.classList.toggle("dark");
    try { localStorage.setItem("theme", d ? "dark" : "light"); } catch { /* biarkan */ }
    setDark(d);
  };

  const idx = Math.max(0, NAV.findIndex(([id]) => id === active));
  const railLabel = idx >= 0 ? T(texts, NAV_KEY[NAV[idx][0]] ?? "", NAV[idx][1]) : "HOME";

  return (
    <>
      <nav className="ed-nav" aria-label="Primary">
        <div className="ed-nav-in">
          <a className="ed-wordmark" href="#hero"
            onClick={(e) => { e.preventDefault(); setActive("#hero"); jumpTo("#hero"); }}>
            REJA<span className="ed-wordmark-mark">®</span>
          </a>
          <div className="ed-nav-links">
            {NAV.map(([id, label]) => (
              <a key={id} href={id} className={active === id ? "active" : ""}
                onClick={(e) => { e.preventDefault(); setActive(id); jumpTo(id); }}>
                {T(texts, NAV_KEY[id] ?? "", label)}
              </a>
            ))}
          </div>
          <div className="ed-nav-actions">
            <a className="ed-round" href="#contact" aria-label={T(texts, "nav_contact", "CONTACT")}
              onClick={(e) => { e.preventDefault(); setActive("#contact"); jumpTo("#contact"); }}>
              {ICO_GLOBE}
            </a>
            <button className="ed-round" type="button" onClick={toggleTheme}
              aria-label={dark ? T(texts, "mode_theme_light", "Switch to light theme") : T(texts, "mode_theme_dark", "Switch to dark theme")}>
              {dark ? ICO_SUN : ICO_MOON}
            </button>
            <button className="ed-round ed-round-3d" type="button" onClick={() => onMode("3d")}
              aria-label={T(texts, "mode_3d", "Switch to 3D mode")} title={T(texts, "mode_3d", "Switch to 3D mode")}>3D</button>
          </div>
        </div>
      </nav>
      <div className="ed-rail" aria-hidden="true">
        <span className="ed-rail-num">{String(idx).padStart(2, "0")}</span>
        <span className="ed-rail-line" />
        <span className="ed-rail-label">{railLabel}</span>
      </div>
    </>
  );
}

// ---------------- hero ----------------
const MARQUEE =
  "FULL-STACK DEVELOPMENT + SOFTWARE ENGINEERING + AI ORCHESTRATION + NEXT.JS + SUPABASE + ";

export function Hero2D({ profile, texts }: { profile: Profile; texts?: Record<string, string> }) {
  const first = profile.name.replace(/\.\s*$/, "");
  const marquee = T(texts, "marquee", MARQUEE);
  const spec: [string, string][] = [
    ["Name", profile.name],
    ["Role", profile.role],
    ["Focus", T(texts, "ai_orch", "AI orchestration")],
    ["Base", profile.location],
    ["Status", profile.status],
  ];
  return (
    <header className="ed-hero" id="hero">
      <div className="ed-wrap ed-hero-grid">
        <div className="ed-hero-left">
          <div className="ed-hero-eyebrow">
            {T(texts, "hero_eyebrow", "( 00 ) Intro \u2014 personal index")}{" "}
            <span className="ed-eyebrow-sep">/</span>
          </div>
          <h1 className="ed-display">Hi<span className="ed-display-mark">!</span></h1>
          <div className="ed-dotgrid" aria-hidden="true">
            <span /><span /><span /><span /><span />
          </div>
          <h1 className="ed-display ed-display-i">
            I&apos;m {first}<span className="ed-display-mark">.</span>
          </h1>
          <p className="ed-lede">{profile.bio}</p>
        </div>
        <aside className="ed-spec" aria-label={T(texts, "quick_facts", "Quick facts")}>
          {spec.map(([k, v]) => (
            <div key={k} className="ed-spec-row">
              <span className="ed-k">{k}</span>
              <span className="ed-dots" />
              <span className="ed-spec-v">{v}</span>
            </div>
          ))}
        </aside>
      </div>
      <div className="ed-marquee" aria-hidden="true">
        <div className="ed-marquee-track">
          <span>{marquee}{marquee}</span>
          <span>{marquee}{marquee}</span>
        </div>
      </div>
    </header>
  );
}

// ---------------- about ----------------
export function About2D({ profile, projectCount, texts }: { profile: Profile; projectCount: number; texts?: Record<string, string> }) {
  const first = profile.name.replace(/\.\s*$/, "");
  return (
    <section className="ed-sec ed-sec-bare" id="about">
      <div className="ed-wrap">
        <div className="ed-about">
          <div className="ed-about-rail">
            <div className="ed-portrait">
              {profile.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photo} alt={profile.name} loading="lazy" />
              ) : (
                <div className="ed-portrait-ph" aria-hidden="true">{first.charAt(0)}</div>
              )}
              <span className="ed-tick ed-tick-tl" />
              <span className="ed-tick ed-tick-tr" />
              <span className="ed-tick ed-tick-bl" />
              <span className="ed-tick ed-tick-br" />
              <div className="ed-portrait-cap">
                <span>{T(texts, "ed_portrait_cap", "Portrait / 2026")}</span>
                <b>{profile.name}</b>
              </div>
            </div>
            <div className="ed-statgrid">
              <div className="ed-statcell">
                <span className="ed-k">Role</span>
                <b>{T(texts, "ed_role_short", "Full-Stack")}</b>
              </div>
              <div className="ed-statcell">
                <span className="ed-k">Since</span>
                <b>{T(texts, "ed_since", "2024")}</b>
              </div>
            </div>
            <div className="ed-chiprow">
              {(texts?.ed_chips ? texts.ed_chips : "Software Engineering\nAI Orchestration\nFull-Stack Development")
                .split("\n").map((c) => c.trim()).filter(Boolean)
                .map((c, i) => (
                  <span className="ed-chip" key={i}>{c.split(" ").map((w, j) => (<Fragment key={j}>{j > 0 && <br />}{w}</Fragment>))}</span>
                ))}
            </div>
          </div>

          <div className="ed-about-body">
            <span className="ed-eyebrow">&mdash; 01 / Profile</span>
            <h3 className="ed-role">
              {T(texts, "ed_role_head", "Full-Stack Web Developer")
                .split(" ")
                .map((w, i, arr) => (
                  <Fragment key={i}>{i > 0 && <br />}{w}</Fragment>
                ))}
            </h3>
            <p className="ed-subline">{T(texts, "ed_subline", "ngubah ide mentah jadi produk yang kepake.")}</p>
            <p className="ed-tags">{T(texts, "ed_tags", "Next.js / Supabase / AI-Assisted / Clean Shipping")}</p>

            <div className="ed-metarow">
              <div className="ed-metacell">
                <span className="ed-k">Location</span>
                <span>{profile.location}</span>
              </div>
              <div className="ed-metacell">
                <span className="ed-k">Status</span>
                <span>{profile.status}</span>
              </div>
              <div className="ed-metacell">
                <span className="ed-k">Focus</span>
                <span>{T(texts, "ed_focus", "Next + Supabase")}</span>
              </div>
            </div>

            <div className="ed-prose">
              <p>{profile.bio}</p>
              <p>
                <span>{T(texts, "ed_prose", "Fokus: arsitektur yang masuk akal, database yang aman (RLS), dan UI yang orang awam ngerti. Dikerjain end-to-end — dari brief, struktur data, antarmuka, sampai deploy dan serah terima.")}</span>
              </p>
            </div>

            <div className="ed-logs">
              <span className="ed-eyebrow">{T(texts, "ed_logs_title", "Activity logs")}</span>
              <div className="ed-loggrid">
                <div className="ed-logbox"><b>{String(projectCount).padStart(2, "0")}</b><span>{T(texts, "ed_logs_projects", "Projects shipped")}</span></div>
                <div className="ed-logbox"><b>100%</b><span>{T(texts, "ed_logs_deployed", "Deployed & live")}</span></div>
                <div className="ed-logbox"><b>02+</b><span>{T(texts, "ed_logs_years", "Years building")}</span></div>
                <div className="ed-logbox"><b>&lt;24H</b><span>{T(texts, "ed_logs_resp", "Response time")}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- skills ----------------
const LEVELS: Record<string, number> = {
  "next.js": 94, "react": 90, "typescript": 88, "javascript": 90,
  "tailwind css": 92, "supabase": 90, "postgresql": 86, "gsap / lenis": 82,
  "vercel": 90, "git": 84, "css": 90, "ai / ml": 86, "ai": 86,
};

export function Skills2D({ skills, texts }: { skills: SkillCoin[]; texts?: Record<string, string> }) {
  const rows = skills.length ? skills : [{ name: "Next.js", icon: "nextjs" }];
  return (
    <section className="ed-sec" id="skills">
      <div className="ed-wrap">
        <Head n="02" label={T(texts, "capability_index", "Capability index")} title={T(texts, "skill_title", "Skills")} />
        <div className="ed-skill-list">
          {rows.map((s, i) => {
            const lvl = LEVELS[s.name.toLowerCase()] ?? 80;
            return (
              <div key={s.name + i} className="ed-skill-row">
                <span className="ed-skill-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="ed-skill-name">{s.name}</span>
                <span className="ed-skill-dots" aria-hidden="true" />
                <span className="ed-skill-bar" aria-hidden="true">
                  <i style={{ width: `${lvl}%` }} />
                </span>
                <span className="ed-skill-pct">{lvl}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------- works ----------------
const ENGAGE = [
  "Diskusi brief & prototype",
  "Build & serah terima",
  "Dokumentasi + dukungan",
];

export function Works2D({ projects, onOpen, texts }: {
  projects: Project[]; onOpen: (p: Project) => void; texts?: Record<string, string>;
}) {
  const list = VERCEL_PROJECTS.map(
    (v) => projects.find((p) => p.slug === v.slug) ?? v
  );
  return (
    <section className="ed-sec" id="works">
      <div className="ed-wrap">
        <Head n="03" label={T(texts, "works_label", "Project archive")} title={T(texts, "selected_works", "Selected Works")} />
        <div className="ed-work-list">
          {list.map((w, i) => (
            <button key={w.slug || w.id} type="button" className="ed-work"
              onClick={() => onOpen(w)}>
              <span className="ed-work-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="ed-work-main">
                <span className="ed-work-title">{w.title}</span>
                <span className="ed-work-desc">{w.description}</span>
                <span className="ed-work-tech">{w.techStack.join(" / ")}</span>
              </span>
              <span className="ed-work-side">
                <span className="ed-work-cat">{w.category}</span>
                <span>{w.year}</span>
                <span className={"ed-pill" + (w.status === "Deployed" ? " on" : "")}>{w.status}</span>
              </span>
              <span className="ed-arrow" aria-hidden="true">&#8599;</span>
            </button>
          ))}
        </div>

        <div className="ed-engage">
          <div>
            <span className="ed-eyebrow">&mdash; Engagement</span>
            <h3>{T(texts, "ed_engage_title", "Menyesuaikan keinginan client")}</h3>
            <p>{T(texts, "ed_engage_copy", "Sesuai kebutuhan spesifik klien — dari ide mentah sampai deploy, tanpa template yang dipaksain.")}</p>
          </div>
          <ul>
            {(texts?.ed_engage ? texts.ed_engage : ENGAGE.join("\n")).split("\n").map((d) => d.trim()).filter(Boolean).map((d, i) => (
              <li key={i}><span className="ed-k">{String(i + 1).padStart(2, "0")}</span>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ---------------- github ----------------
const GH_USER = "rezzanurbaitulloh-gif";
const GH_CACHE = "ed:gh:" + GH_USER;

type GHRepo = {
  name: string; description: string | null; html_url: string;
  stargazers_count: number; forks_count?: number;
  language: string | null; fork: boolean; pushed_at: string;
};
type GHData = {
  name: string; login: string; bio: string | null; avatar_url: string;
  public_repos: number; followers: number; following: number;
  repos: GHRepo[]; offline?: boolean;
};

function fallbackGH(): GHData {
  return {
    name: "Reja", login: GH_USER,
    bio: "Full-stack web developer — Next.js, Supabase, AI-assisted building.",
    avatar_url: `https://github.com/${GH_USER}.png?size=240`,
    public_repos: 1, followers: -1, following: -1,
    offline: true, repos: [],
  };
}


export function GitHub2D({ texts }: { texts?: Record<string, string> }) {
  const [data, setData] = useState<GHData>(fallbackGH);
  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    let dead = false;
    try {
      const raw = sessionStorage.getItem(GH_CACHE);
      if (raw) {
        const parsed = JSON.parse(raw) as { t: number; d: GHData };
        if (parsed && Date.now() - parsed.t < 10 * 60 * 1000) {
          setData(parsed.d);
          setSyncing(false);
          return;
        }
      }
    } catch { /* biarkan */ }

    const opts = { headers: { Accept: "application/vnd.github+json" } };
    Promise.all([
      fetch(`https://api.github.com/users/${GH_USER}`, opts).then((r) => (r.ok ? r.json() : Promise.reject(new Error("user")))),
      fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`, opts).then((r) => (r.ok ? r.json() : Promise.reject(new Error("repos")))),
    ]).then((res) => {
      if (dead) return;
      const u = res[0] as Record<string, unknown>;
      const repos = (Array.isArray(res[1]) ? res[1] : []) as GHRepo[];
      const next: GHData = {
        name: String(u.name ?? "Reja"),
        login: String(u.login ?? GH_USER),
        bio: (u.bio as string | null) ?? "Full-stack web developer.",
        avatar_url: String(u.avatar_url ?? fallbackGH().avatar_url),
        public_repos: Number(u.public_repos ?? repos.length),
        followers: Number(u.followers ?? -1),
        following: Number(u.following ?? -1),
        repos,
      };
      setData(next);
      setSyncing(false);
      try { sessionStorage.setItem(GH_CACHE, JSON.stringify({ t: Date.now(), d: next })); } catch { /* biarkan */ }
    }).catch(() => {
      if (dead) return;
      setData(fallbackGH());
      setSyncing(false);
    });

    return () => { dead = true; };
  }, []);

  const repos = (data.repos || [])
    .filter((r) => !r.fork)
    .slice()
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
  const stars = repos.reduce((n, r) => n + (r.stargazers_count > 0 ? r.stargazers_count : 0), 0);
  const lastPush = repos[0]?.pushed_at
    ? new Date(repos[0].pushed_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" })
    : "—";

  const langs = new Map<string, number>();
  repos.forEach((r) => {
    if (r.language) langs.set(r.language, (langs.get(r.language) || 0) + 1);
  });
  const langTotal = [...langs.values()].reduce((a, b) => a + b, 0) || 1;
  const dist = [...langs.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, n]) => ({ name, pct: Math.round((n / langTotal) * 100) }));

  const show = (n: number) => (n >= 0 ? String(n) : "—");

  return (
    <section className="ed-sec" id="github">
      <div className="ed-wrap">
        <Head n="04" label={T(texts, "oss_telemetry", "Open source telemetry")} title={T(texts, "gh_title", "GitHub")} />
        <div className="ed-gh">
          <div className="ed-gh-rail">
            <div className="ed-gh-id">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ed-gh-avatar" src={data.avatar_url} alt={`${data.name} avatar`} loading="lazy" />
              <div>
                <div className="ed-gh-name">{data.name}</div>
                <div className="ed-gh-handle">@{data.login}</div>
              </div>
            </div>
            <p className="ed-gh-bio">{data.bio}</p>
            <div className="ed-gh-stats">
              <div className="ed-gh-stat"><span>{T(texts, "ed_gh_public", "Public repos")}</span><span className="ed-dots" /><b>{show(data.public_repos)}</b></div>
              <div className="ed-gh-stat"><span>{T(texts, "ed_gh_followers", "Followers")}</span><span className="ed-dots" /><b>{show(data.followers)}</b></div>
              <div className="ed-gh-stat"><span>{T(texts, "ed_gh_stars", "Total stars")}</span><span className="ed-dots" /><b>{data.offline ? "—" : show(stars)}</b></div>
              <div className="ed-gh-stat"><span>{T(texts, "ed_gh_lastpush", "Last push")}</span><span className="ed-dots" /><b>{lastPush}</b></div>
            </div>
            <div className="ed-dist">
              <span className="ed-eyebrow">{T(texts, "ed_gh_dist", "Code distribution")}</span>
              {dist.length ? dist.map((d) => (
                <div key={d.name} className="ed-dist-row">
                  <span>{d.name}</span><span>{d.pct}%</span>
                  <span className="ed-dist-bar"><i style={{ width: `${d.pct}%` }} /></span>
                </div>
              )) : (
                <div className="ed-dist-row">
                  <span>{syncing ? T(texts, "ed_gh_sync", "Syncing") : T(texts, "ed_gh_norepo", "No public repo")}</span><span>—</span>
                  <span className="ed-dist-bar"><i style={{ width: 0 }} /></span>
                </div>
              )}
            </div>
          </div>

          <div className="ed-repos">
            {repos.map((r, i) => (
              <a key={r.name + i} className="ed-repo" href={r.html_url || "#"}
                target="_blank" rel="noopener noreferrer">
                <span className="ed-work-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="ed-repo-main">
                  <span className="ed-repo-name">{r.name}</span>
                  <span className="ed-repo-desc">{r.description || T(texts, "ed_repo_nod", "No description.")}</span>
                </span>
                <span className="ed-repo-meta">
                  <span>{r.language || "—"}</span>
                  <span>{r.pushed_at ? new Date(r.pushed_at).getFullYear() : "—"}</span>
                  {!data.offline && <span>&#9733; {r.stargazers_count}</span>}
                </span>
                <span className="ed-repo-arrow" aria-hidden="true">&#8599;</span>
                <span className="ed-repo-go">Visit &#8599;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- contact ----------------
export function Contact2D({ profile, socials, texts }: { profile: Profile; socials: Social[]; texts?: Record<string, string> }) {
  const { hms, ampm } = useClock();
  const [copied, setCopied] = useState(false);
  const copyHint = copied ? T(texts, "copied", "[ COPIED TO CLIPBOARD ]") : T(texts, "copy_click", "[ CLICK EMAIL TO COPY ]");

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = profile.email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* biarkan */ }
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [profile.email]);

  return (
    <section className="ed-sec" id="contact">
      <div className="ed-wrap">
        <Head n="05" label={T(texts, "establish_link", "Establish link")} title={T(texts, "contact_title", "Contact")} />
        <div className="ed-contact">
          <div className="ed-contact-main">
            <button type="button" className="ed-mail" onClick={copy}
              aria-label={`Copy email ${profile.email}`}>
              {profile.email}
            </button>
            <div className="ed-copyhint" role="status" aria-live="polite">
              {copyHint}
            </div>
            <div className="ed-connectlabel">{T(texts, "ed_connect", "Connect directly")}</div>
            <div className="ed-connect">
              <a className="ed-btn ed-btn-ghost" href={`mailto:${profile.email}`}>
                Email <span aria-hidden="true">&#8599;</span>
              </a>
              {socials.map((s) => (
                <a key={s.name} className="ed-btn ed-btn-ghost" href={s.link}
                  target="_blank" rel="noopener noreferrer">
                  {s.name} <span aria-hidden="true">&#8599;</span>
                </a>
              ))}
            </div>
          </div>

          <div className="ed-contact-side">
            <span className="ed-eyebrow">{T(texts, "ed_localtime", "Local time / WIB")}</span>
            <div className="ed-clockrow">
              <span className="ed-live" aria-hidden="true" />
              <span className="ed-clock">{hms}</span>
              <span className="ed-clock-alt">/ {ampm}</span>
            </div>
            <div className="ed-k ed-tz">Jakarta, Indonesia (GMT+7)</div>
            <div className="ed-avail">
              <span className="ed-eyebrow">{T(texts, "ed_avail", "Availability")}</span>
              <div className="ed-avail-line">
                <span className="ed-live" aria-hidden="true" />
                <span>{profile.status}</span>
              </div>
              <p className="ed-avail-copy">
                {T(texts, "ed_avail_copy", "Terbuka untuk project freelance — diskusi brief dulu, lalu build. Respon biasanya di bawah 24 jam.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- footer ----------------
export function Footer2D({ onMode, texts }: { onMode: (m: "3d" | "2d") => void; texts?: Record<string, string> }) {
  return (
    <footer className="ed-footer">
      <div className="ed-wrap ed-footer-in">
        <span>{T(texts, "footer_copy", "\u00A9 PORTOJA")}</span>
        <span className="ed-footer-mid">{T(texts, "footer_stack", "[ Next.js / Supabase / AI-Assisted ]")}</span>
        <button type="button" onClick={() => onMode("3d")}>
          {T(texts, "ed_return", "Return to 3D mode")} <span className="ed-blink" aria-hidden="true">&#8612;</span>
        </button>
      </div>
    </footer>
  );
}
