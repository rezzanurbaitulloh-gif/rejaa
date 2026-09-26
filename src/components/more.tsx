"use client";
// ============================================================
// more.tsx — Works/Experience carousel (Davin), Services,
// GitHub, Certificates, Contact, ProjectModal.
// ============================================================
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Certificate, Experience, Profile, Project, Social } from "@/lib/site";
import { sendInquiry } from "@/lib/site";
import { getLenis, reduced } from "./chrome";

gsap.registerPlugin(ScrollTrigger);

// ---------------- Reveal (Shashank ScrollReveal) ----------------
export function Reveal({ children, dir = "up", delay = 0, className = "", cur = false }: {
  children: React.ReactNode; dir?: "up" | "left" | "right"; delay?: number;
  className?: string; cur?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("reveal-visible"); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`scroll-reveal reveal-${dir} ${className}`}
      style={{ transitionDelay: `${delay}ms` }} {...(cur ? { "data-cur": "" } : {})}>
      {children}
    </div>
  );
}

// ---------------- helpers ----------------
export function blueSVG() {
  return (
    <svg viewBox="0 0 200 120" fill="none" style={{ width: "100%", height: "100%", opacity: 0.8 }}>
      <circle cx="100" cy="60" r="35" fill="rgba(198,93,58,.08)" />
      <circle cx="100" cy="60" r="40" fill="none" stroke="#C65D3A" strokeOpacity=".25" strokeDasharray="3 3" />
      <circle cx="100" cy="60" r="46" fill="none" stroke="#C6A87C" strokeOpacity=".3" />
      <g transform="translate(100,60) rotate(45)">
        <rect x="-2.5" y="0" width="5" height="32" rx="2" fill="#161918" fillOpacity=".45" />
        <rect x="-10" y="-11" width="20" height="9" rx="1.5" fill="#161918" fillOpacity=".85" />
        <rect x="10" y="-9.5" width="3" height="6" fill="#C65D3A" />
      </g>
      <line x1="0" y1="60" x2="200" y2="60" stroke="#161918" strokeOpacity=".08" />
    </svg>
  );
}

function techBadges(ts: string[], max = 3) {
  return (
    <>
      {ts.slice(0, max).map((t) => <span key={t} className="tech-badge">{t}</span>)}
      {ts.length > max && (
        <span className="tech-badge" style={{ borderStyle: "dashed", opacity: 0.6 }}>+{ts.length - max}</span>
      )}
    </>
  );
}

const GRADS = ["c1", "c2", "c3"];
export function coverClass(i: number) {
  return GRADS[i % GRADS.length];
}
function isURL(s: string) {
  return s.startsWith("http") || s.startsWith("/");
}

// ---------------- Carousel shell (Davin SectionWorks pattern) ----------------
function Carousel({ id, children }: { id: string; children: React.ReactNode }) {
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [off, setOff] = useState(0);
  const [max, setMax] = useState(0);
  const calc = () => {
    const v = viewRef.current, t = trackRef.current;
    if (!v || !t) return;
    const m = Math.max(0, t.scrollWidth - v.clientWidth + 10);
    setMax(m);
    setOff((o) => Math.min(o, m));
  };
  useEffect(() => {
    calc();
    const t = setTimeout(calc, 300);
    window.addEventListener("resize", calc);
    return () => { clearTimeout(t); window.removeEventListener("resize", calc); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const go = (d: number) => setOff((o) => {
    const n = d < 0 ? Math.max(0, o - 400) : Math.min(max, o + 400);
    return n;
  });
  useEffect(() => {
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${off}px)`;
  }, [off]);
  return (
    <>
      <div className="warrows">
        <button data-cur aria-label="left" onClick={() => go(-1)}
          className={"wbtn" + (off > 0 ? " visible" : "")} disabled={off <= 0}>←</button>
        <button data-cur aria-label="right" onClick={() => go(1)}
          className={"wbtn" + (off < max ? " visible" : "")} disabled={off >= max}>→</button>
      </div>
      <div className="wview" ref={viewRef}>
        <div className="wtrack" id={id} ref={trackRef}>{children}</div>
      </div>
    </>
  );
}

// ---------------- WORKS ----------------
export function Works({ projects, onOpen, mode }: { projects: Project[]; onOpen: (p: Project) => void; mode: "3d" | "2d" }) {
  const rootRef = useRef<HTMLElement>(null);
  // Entrance kartu ala WorkCard Davin — hanya mode 3D (2D = statis)
  useLayoutEffect(() => {
    if (reduced() || mode !== "3d") return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".work-slide-card").forEach((c, i) => {
        gsap.from(c, {
          opacity: 0, x: 50, y: i % 2 ? 15 : -15, duration: 0.6, ease: "expo.out",
          scrollTrigger: { trigger: c, start: "top 88%", once: true },
        });
      });
    });
    return () => ctx.revert();
  }, [projects, mode]);
  return (
    <section className="block" id="works" ref={rootRef}>
      <div className="whead">
        <div>
          <div className="kicker" data-sec="( 03 )">WORKS</div>
          <h2 className="t" data-zoom>MY PROJECT — Creative Showcases</h2>
          <p className="d">Geser pake panah. Klik kartu → modal detail + link live.</p>
        </div>
      </div>
      <Carousel id="wtrack">
        {projects.map((w, i) => (
          <div key={w.slug || w.id} className="work-slide-card" data-cur tabIndex={0}
            role="button" onClick={() => onOpen(w)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(w); } }}>
            <div className="work-card-header">
              <span className="work-number">{w.num || `0${i + 1}`}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className={`work-status-badge status-${w.status.toLowerCase()}`}>{w.status}</span>
                <span style={{ opacity: 0.3, fontSize: ".7rem" }}>|</span>
                <span className="work-year">{w.year}</span>
              </div>
            </div>
            <div className="work-card-visual">
              {w.images[0] && isURL(w.images[0]) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={w.images[0]} alt={w.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 5 }} />
              ) : w.images[0] ? (
                <div className={`gradcover ${w.images[0]}`}>{w.title}</div>
              ) : (blueSVG())}
            </div>
            <div className="work-card-body">
              <h3>{w.title}</h3>
              <p className="work-category">{w.category}</p>
              <p className="work-details">{w.description}</p>
              <div className="work-tech-badges">{techBadges(w.techStack)}</div>
            </div>
            <div className="work-card-footer">
              <span className="work-explore-link">VIEW DETAILED INFORMATION ↗</span>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}

// ---------------- EXPERIENCE ----------------
export function Experience({ exps, onOpen, mode }: { exps: Experience[]; onOpen: (e: Experience) => void; mode: "3d" | "2d" }) {
  const rootRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (reduced() || mode !== "3d") return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".experience-slide-card").forEach((c, i) => {
        gsap.from(c, {
          opacity: 0, x: 50, y: i % 2 ? 15 : -15, duration: 0.6, ease: "expo.out",
          scrollTrigger: { trigger: c, start: "top 88%", once: true },
        });
      });
    });
    return () => ctx.revert();
  }, [exps, mode]);
  return (
    <section id="exp" ref={rootRef}>
      <div className="block" style={{ maxWidth: 1100 }}>
        <div className="whead">
          <div>
            <div className="kicker" data-sec="( 04 )">EXPERIENCE</div>
            <h2 className="t" data-zoom>MY EXPERIENCE — Professional Journey</h2>
          </div>
        </div>
        <Carousel id="etrack">
          {exps.map((e, i) => (
            <div key={e.id} className="experience-slide-card" data-cur tabIndex={0}
              role="button" onClick={() => onOpen(e)}
              onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); onOpen(e); } }}>
              <div className="experience-card-header">
                <span className="experience-number">{e.num || `0${i + 1}`}</span>
                <span className="experience-year">[{e.year}]</span>
              </div>
              <div className="experience-card-visual">
                {e.images[0] && isURL(e.images[0]) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={e.images[0]} alt={e.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 5 }} />
                ) : e.images[0] ? (
                  <div className={`gradcover ${e.images[0]}`}>{e.title}</div>
                ) : (blueSVG())}
              </div>
              <div className="experience-card-body">
                <h3 style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span>{e.title}</span>
                  <span style={{ fontSize: ".95rem", fontWeight: 500, opacity: 0.8 }}>{e.company}</span>
                </h3>
                <p className="experience-category">{e.category}</p>
                <p className="experience-date">{e.date}</p>
                <p className="experience-details">{e.description}</p>
                <div className="experience-tech-badges">
                  {e.techStack.slice(0, 3).map((t) => <span key={t} className="tech-badge">{t}</span>)}
                </div>
              </div>
              <div className="experience-card-footer">
                <span className="experience-explore-link">VIEW DETAILED INFORMATION ↗</span>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

// ---------------- SERVICES ----------------
const SERVICES: [string, string, string, string[]][] = [
  ["01", "MARKETPLACE & TOKO", "Etalase + checkout + dashboard.",
    ["Katalog & order flow", "Supabase Auth + RLS", "Deploy + serah terima"]],
  ["02", "AI-ASSISTED BUILD", "Ide mentah → prototype cepat.",
    ["Struktur DB + API", "Automasi dokumen", "Rapi + dokumentasi"]],
  ["03", "TOOLS & KONVERTER", "Tool sekali klik di browser.",
    ["Convert pipeline", "Storage aman", "UI awam-friendly"]],
];
export function Services() {
  return (
    <section className="block" id="services" style={{ paddingTop: 0 }}>
      <div className="kicker">DISCIPLINES — Services & Frameworks</div>
      <h2 className="t">Yang bisa gue kerjain.</h2>
      <div className="sgrid">
        {SERVICES.map(([n, name, desc, dels], i) => (
          <Reveal key={n} dir={i === 0 ? "left" : i === 2 ? "right" : "up"} cur>
            <div className="scard">
              <span className="snum">{n}</span><h3>{name}</h3>
              <p style={{ color: "#cfc8b8", fontSize: ".85rem" }}>{desc}</p>
              <ul>{dels.map((d) => <li key={d}>✦ {d}</li>)}</ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ---------------- GITHUB ----------------
export function GitHub({ profile, projects }: { profile: Profile; projects: Project[] }) {
  const user = profile.github && profile.github !== "#"
    ? profile.github.split("/").filter(Boolean).pop() ?? "reja-dev"
    : "reja-dev";
  return (
    <section id="github">
      <div className="block">
        <div className="kicker" data-sec="( 05 )" style={{ color: "var(--gold)" }}>GITHUB STATS / Open Source Telemetry</div>
        <h2 className="t" style={{ color: "#fff" }}>Code-nya hidup di sini.</h2>
        <div className="gh-layout">
          <Reveal dir="left">
            <div className="gh-profile">
              <div className="gh-avatar">{(user[0] || "R").toUpperCase()}</div>
              <b>{user}</b><br />
              <small style={{ color: "#bdb49f" }}>sambungkan token di admin buat live stats</small>
              <div className="langbar">
                <i style={{ width: "55%", background: "var(--gold)" }} />
                <i style={{ width: "30%", background: "var(--terra)" }} />
                <i style={{ width: "15%", background: "#555" }} />
              </div>
              <small style={{ color: "#bdb49f" }}>TS 55% • SQL 30% • lain 15%</small>
            </div>
          </Reveal>
          <div className="repogrid">
            {projects.slice(0, 4).map((p, i) => (
              <Reveal key={p.slug || p.id} dir="up" delay={i * 80}>
                <div className="repocard">
                  <b>{p.slug || p.title.toLowerCase().replace(/\s+/g, "-")}</b><br />
                  <small>{p.description}</small><br />
                  <small style={{ color: "var(--gold)" }}>● {(p.techStack[0] || "TS")}</small>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <p style={{ marginTop: 16 }}>
          <a data-cur href={profile.github} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>
            ⬢ View GitHub →
          </a>
        </p>
      </div>
    </section>
  );
}

// ---------------- CERTIFICATES ----------------
export function Certificates({ certs }: { certs: Certificate[] }) {
  return (
    <section className="block" id="certs">
      <div className="kicker" data-sec="( 06 )">CERTIFICATES / Verified Credentials</div>
      <h2 className="t">Sertifikat, bisa diverifikasi.</h2>
      <div className="cgrid">
        {certs.map((c, i) => (
          <Reveal key={c.id} dir={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"} cur>
            <article className="certificate-card">
              <div className="tech-corner tech-top-left" style={{ top: 6, left: 6 }} />
              <div className="tech-corner tech-top-right" style={{ top: 6, right: 6 }} />
              <div className="tech-corner tech-bottom-left" style={{ bottom: 6, left: 6 }} />
              <div className="tech-corner tech-bottom-right" style={{ bottom: 6, right: 6 }} />
              <div className="certificate-card-header"><span>[ {c.category} ]</span><span>{c.year}</span></div>
              <h3 className="certificate-title">{c.title}</h3>
              <span className="certificate-issuer">{c.issuer}</span>
              <p className="certificate-description">{c.description}</p>
              <a className="certificate-link" data-cur href={c.credentialUrl} target="_blank" rel="noopener noreferrer">
                VERIFY CREDENTIAL ↗
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ---------------- CONTACT ----------------
function useJakartaTime() {
  const [t, setT] = useState({ h24: "00:00:00", h12: "" });
  useEffect(() => {
    const f = () => {
      try {
        const n = new Date();
        setT({
          h24: new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(n),
          h12: "/ " + new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(n),
        });
      } catch { /* abaikan */ }
    };
    f();
    const iv = setInterval(f, 1000);
    return () => clearInterval(iv);
  }, []);
  return t;
}

export function Contact({ profile, socials, live }: { profile: Profile; socials: Social[]; live: boolean }) {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [sent, setSent] = useState<"idle" | "ok" | "fail">("idle");
  const { h24, h12 } = useJakartaTime();
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); } catch { /* abaikan */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    if (!live) {
      window.location.href = `mailto:${profile.email}?subject=Freelance: ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + "\n\n— " + form.contact)}`;
      return;
    }
    setSent(await sendInquiry(form) ? "ok" : "fail");
    if (sent !== "fail") setForm({ name: "", contact: "", message: "" });
  };
  return (
    <div id="contact">
      <section className="block">
        <div className="contact-slide-layout">
          <div className="contact-left-col">
            <span className="contact-subtitle">[ LET&apos;S CONNECT ]</span>
            <div className="email-click-area">
              <div className="contact-mail-link" data-zoom data-cur role="button" tabIndex={0} onClick={copyEmail}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") copyEmail(); }}>
                {profile.email}
              </div>
              <div className="copy-status-indicator">
                <span>{copied ? "[ COPIED TO CLIPBOARD! ]" : "[ CLICK EMAIL TO COPY ]"}</span>
              </div>
            </div>
            <form className="inq-form" onSubmit={submit}>
              <input data-cur placeholder="Nama lu" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input data-cur placeholder="Kontak (WA/email)" value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })} />
              <textarea data-cur placeholder="Ide mentahnya apa?" rows={3} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <button data-cur type="submit" className="btn btn-terra">Ajak Freelance →</button>
              {sent === "ok" && <span className="inq-ok">[ MASUK! Gue hubungin balik. ]</span>}
              {sent === "fail" && <span className="inq-ok" style={{ color: "#e0655a" }}>[ GAGAL — coba email langsung. ]</span>}
            </form>
          </div>
          <div className="contact-right-col">
            <span className="contact-subtitle">[ LOCAL TIME / WIB ]</span>
            <div className="local-time-card">
              <div className="time-row">
                <span className="status-pulse-dot" />
                <span className="time-display">{h24}</span>
                <span className="global-time-display">{h12}</span>
              </div>
              <span className="timezone-label">JAKARTA, INDONESIA (GMT+7)</span>
            </div>
            <span className="contact-subtitle" style={{ display: "block", marginTop: 24 }}>[ CONNECT DIRECTLY ]</span>
            <div className="networks-grid">
              {socials.map((s) => (
                <a key={s.name} data-cur className="network-card" href={s.link} target="_blank" rel="noopener noreferrer">
                  <span className="network-name">{s.name}</span><span className="network-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------------- PROJECT MODAL (Davin ProjectDetailModal) ----------------
export type ModalData =
  | { kind: "p"; item: Project }
  | { kind: "e"; item: Experience };

function toModal(d: ModalData) {
  if (d.kind === "p") {
    const p = d.item;
    return {
      title: p.title, category: p.category, role: p.role, year: p.year,
      gh: p.linkGithub, demo: p.linkDemo, status: p.status,
      images: p.images, overview: p.overview, tech: p.techStack,
      chal: p.challenges, sol: p.solutions,
    };
  }
  const e = d.item;
  return {
    title: `${e.title} — ${e.company}`, category: e.category, role: e.title, year: e.year,
    gh: "#", demo: "#", status: "Deployed" as const,
    images: e.images, overview: e.overview || e.description, tech: e.techStack,
    chal: e.challenges, sol: e.solutions,
  };
}

export function ProjectModal({ data, onClose }: { data: ModalData | null; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    setIdx(0);
    if (!data) return;
    // Kunci scroll belakang modal (Lenis kalau ada, overflow kalau 2D)
    const l = getLenis();
    if (l) l.stop();
    else document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    if (!reduced()) {
      gsap.fromTo(".pm-modal-box",
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "expo.out" });
    }
    return () => {
      window.removeEventListener("keydown", esc);
      const ll = getLenis();
      if (ll) ll.start();
      else document.body.style.overflow = "";
    };
  }, [data, onClose]);
  if (!data) return null;
  const m = toModal(data);
  const slides = m.images.length ? m.images : ["x"];
  return (
    <div id="modal" className="open">
      <div className="bg" id="mBg" onClick={(e) => { if ((e.target as HTMLElement).id === "mBg") onClose(); }} />
      <div className="pm-modal-box">
        <button className="pm-close-btn" onClick={onClose} data-cur>✕</button>
        <div className="pm-scrollable-content" data-lenis-prevent>
          <div className="pm-header">
            <div className="pm-title-section">
              <h1>{m.title}</h1>
              <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
                <span className="pm-category-label">{m.category}</span>
              </div>
            </div>
            <div className="pm-header-meta-actions">
              <div className="pm-meta-grid">
                <div className="pm-meta-box"><span className="pm-meta-lbl">ROLE</span><span className="pm-meta-val">{m.role}</span></div>
                <div className="pm-meta-box"><span className="pm-meta-lbl">TIMELINE</span><span className="pm-meta-val">{m.year}</span></div>
              </div>
              <div className="pm-actions-group">
                <a className="pm-action-btn github" data-cur href={m.gh} target="_blank" rel="noopener noreferrer">
                  VIEW GITHUB CODEBASE ↗
                </a>
                {m.status === "Development" ? (
                  <button disabled className="pm-action-btn demo-disabled"
                    style={{ background: "var(--card-bg)", color: "var(--text-muted)", border: "1px dashed var(--border-color)", cursor: "not-allowed", opacity: 0.6, pointerEvents: "none", userSelect: "none" }}>
                    THE PROJECT IS UNDER DEVELOPMENT
                  </button>
                ) : (
                  <a className="pm-action-btn demo" data-cur href={m.demo} target="_blank" rel="noopener noreferrer">
                    LAUNCH LIVE APPLICATION ↗
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="pm-carousel">
            <div>
              {slides.map((s, i) => (
                <div key={i} className={`pm-slide ${coverClass(i)}${i === idx ? " on" : ""}`}
                  style={isURL(s) ? { background: "none", padding: 0 } : undefined}>
                  {isURL(s) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s} alt={m.title} style={{ width: "100%", height: 240, objectFit: "cover" }} />
                  ) : (<>{m.title} — {i + 1}/{slides.length}</>)}
                </div>
              ))}
            </div>
            <div className="pm-dots">
              {slides.map((_, i) => (
                <i key={i} data-cur className={i === idx ? "on" : ""} onClick={() => setIdx(i)} />
              ))}
            </div>
          </div>
          <div className="pm-body-grid">
            <div className="pm-body-col">
              <h3>PROJECT OVERVIEW</h3>
              <p className="pm-overview-text">{m.overview || "—"}</p>
              <h3>TECHNOLOGY INDEX</h3>
              <div className="pm-tech-grid">
                {m.tech.map((t) => <span key={t} className="pm-tech-badge">{t}</span>)}
              </div>
            </div>
            <div className="pm-body-col">
              <h3>CHALLENGES & ARCHITECTURE</h3>
              {m.chal.length === 0 ? (<p>No challenge logs recorded.</p>) : m.chal.map((c, i) => (
                <div key={i} className="pm-challenge-card">
                  <div className="pm-challenge-header"><span className="pm-icon-tag challenge-icon">▲</span><h4>CHALLENGE 0{i + 1}</h4></div>
                  <p className="pm-challenge-desc">{c}</p>
                  {m.sol[i] && (
                    <div className="pm-solution-block">
                      <div className="pm-solution-header"><span className="pm-icon-tag solution-icon">◆</span><h5>SOLUTION</h5></div>
                      <p className="pm-solution-desc">{m.sol[i]}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
