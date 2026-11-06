// ============================================================
// site.ts — types (cermin Davin portfolio.types), fallback data,
// Supabase client (graceful tanpa env), dan fetchers.
// Dinamis penuh: kalau env Supabase ada → live; kalau tidak → fallback.
// ============================================================
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { VERCEL_PROJECTS } from "./vercel-projects";

export type ProjectStatus = "Development" | "Deployed";

export interface Project {
  id: number; slug: string; num: string; title: string;
  category: string; year: string; status: ProjectStatus;
  description: string; techStack: string[]; images: string[];
  linkGithub: string; linkDemo: string; role: string;
  overview: string; challenges: string[]; solutions: string[];
  /** Status preview live: ok = screenshot tersedia, protected/down = tile pengganti */
  preview?: "ok" | "protected" | "down";
}
export interface Experience {
  id: number; num: string; title: string; company: string;
  category: string; date: string; year: string;
  description: string; techStack: string[]; images: string[];
  overview: string; challenges: string[]; solutions: string[];
}
export interface Certificate {
  id: number; title: string; issuer: string; year: string;
  category: string; description: string; credentialUrl: string;
}
export interface SkillCoin { name: string; icon: string }
export interface Social { name: string; icon: string; link: string }
export interface Profile {
  name: string; role: string; bio: string; photo: string;
  status: string; location: string; cv_url: string;
  email: string; spin_text: string; github: string; instagram: string;
}
export interface Inquiry { name: string; contact: string; message: string }

export interface SiteData {
  profile: Profile; skills: SkillCoin[]; projects: Project[];
  experiences: Experience[]; certificates: Certificate[];
  socials: Social[]; live: boolean;
  /** Static copy (label UI) — diisikan dari tabel `statics` Supabase;
    FALLBACK siap pakai kalau admin belum mengatur / env belum ada. */
  texts: Record<string, string>;
}

// ------------------------- FALLBACK (dummy siap-ganti) -------------------------
export const FALLBACK: SiteData = {
  live: false,
  profile: {
    name: "Reja.", role: "Full-Stack Web Developer",
    bio: "Gue biasa bikin marketplace, web penjualan, dan konverter dokumen — dari ide mentah sampai jalan. Fokus di fungsi, pengalaman pengguna, dan detail implementasi.",
    photo: "", status: "Open freelance", location: "Indonesia • remote ok",
    cv_url: "#", email: "rejaa6541@gmail.com",
    spin_text: "NEXT • SUPABASE • TYPESCRIPT • CLEAN • RAPII •",
    github: "#", instagram: "#",
  },
  skills: [
    { name: "Next.js", icon: "nextjs" }, { name: "Supabase", icon: "supabase" },
    { name: "Node.js", icon: "nodejs" }, { name: "JavaScript", icon: "javascript" },
    { name: "TypeScript", icon: "typescript" }, { name: "Git", icon: "git" },
    { name: "CSS", icon: "css" }, { name: "Vercel", icon: "vercel" },
  ],
  projects: [
    {
      id: 1, slug: "marketplace-mini", num: "01", title: "Marketplace Mini",
      category: "Marketplace Platform", year: "2025", status: "Deployed",
      description: "Etalase rapi + checkout, gantiin jualan numpang chat.",
      techStack: ["Next.js", "Supabase", "Tailwind", "Storage"], images: ["c1", "c2"],
      linkGithub: "#", linkDemo: "#", role: "Full-Stack Developer",
      overview: "Web marketplace kecil: katalog, keranjang, checkout, dan dashboard order. Auth + RLS per peran, upload gambar via Storage.",
      challenges: ["Katalog & order berantakan di chat.", "Stok harus aman saat order barengan."],
      solutions: ["Alur etalase → checkout + dashboard order yang rapi.", "Transaksi aman + RLS, stok konsisten."],
    },
    {
      id: 2, slug: "web-penjualan", num: "02", title: "Web Penjualan",
      category: "Sales Dashboard", year: "2025", status: "Deployed",
      description: "Stok & order manual jadi dashboard + rekap.",
      techStack: ["Next.js", "Supabase", "Auth"], images: ["c2"],
      linkGithub: "#", linkDemo: "#", role: "Full-Stack Developer",
      overview: "Dashboard penjualan: stok, order, rekap harian. Struktur tabel dan query rekap didesain dari kebutuhan pemilik toko.",
      challenges: ["Catatan stok manual sering selisih.", "Butuh rekap cepat tanpa ngoding."],
      solutions: ["Dashboard + rekap otomatis per hari.", "Struktur DB rapi, gampang dikembangkan."],
    },
    {
      id: 3, slug: "konverter-dokumen", num: "03", title: "Konverter Dokumen",
      category: "Browser Tool", year: "2026", status: "Development",
      description: "Convert ribet jadi 1 klik di browser.",
      techStack: ["Next.js", "Supabase", "WASM", "Storage"], images: [],
      linkGithub: "#", linkDemo: "#", role: "Frontend + Pipeline",
      overview: "Tool konversi dokumen sekali klik di browser. Masih development — pipeline convert + antrean file.",
      challenges: ["Convert manual makan waktu & rawan bocor.", "File besar berat di browser."],
      solutions: ["Pipeline 1-klik + progres jelas.", "Antrean + storage aman (on progress)."],
    },
  ],
  experiences: [
    {
      id: 1, num: "01", title: "Freelance Web Developer", company: "Remote • Indonesia",
      category: "Freelance", date: "2024 — now", year: "2025",
      description: "Marketplace, web penjualan, konverter dokumen — ide mentah sampai deploy.",
      techStack: ["Next.js", "Supabase", "Tailwind"], images: ["c1"],
      overview: "Mengerjakan web freelance end-to-end: diskusi ide, struktur DB, UI, deploy, serah terima.",
      challenges: ["Brief client mentah & berubah-ubah."], solutions: ["Prototype cepat biar revisi murah."],
    },
    {
      id: 2, num: "02", title: "Eksperimen Produk Mandiri", company: "Eksperimen Mandiri",
      category: "R&D", date: "2025 — now", year: "2026",
      description: "Eksperimen produk mandiri: tool konversi dokumen, eksplorasi UI.",
      techStack: ["Next.js", "Supabase", "Automation"], images: [],
      overview: "Membangun tool kecil end-to-end buat nguji ide cepat: struktur DB, UI, dan automasi convert dokumen.",
      challenges: ["Waktu terbatas, ide banyak."], solutions: ["Scope kecil, dikerjain satu-satu sampai jalan."],
    },
  ],
  certificates: [
    { id: 1, title: "Web Development Foundations", issuer: "Provider — via admin", year: "2024", category: "WEB", description: "Dasar web development + deploy.", credentialUrl: "#" },
    { id: 2, title: "Next + Supabase Shipping", issuer: "Provider — via admin", year: "2025", category: "WEB", description: "Marketplace & dashboard live.", credentialUrl: "#" },
    { id: 3, title: "Database Design Basics", issuer: "Provider — via admin", year: "2025", category: "DATA", description: "RLS + relasi rapi.", credentialUrl: "#" },
  ],
  socials: [
    { name: "INSTAGRAM", icon: "instagram", link: "https://www.instagram.com/rejaa1995" },
    { name: "GITHUB", icon: "github", link: "https://github.com/rezzanurbaitulloh-gif" },
    { name: "LINKEDIN", icon: "linkedin", link: "https://www.linkedin.com/in/rejaa" },
  ],
  // Static copy (label UI) — dari tabel `statics` Supabase; fallback siap pakai
  // kalau admin belum mengisi atau env Supabase belum ada.
  texts: {
    nav_home: "HOME", nav_about: "ABOUT", nav_skills: "SKILLS",
    nav_works: "WORKS", nav_github: "GITHUB", nav_contact: "CONTACT",
    mode_enter: "ENTERING ", mode_toggle: "TOGGLE THEME", mode_sub: "CREAM EDITORIAL FUSION",
    mode_2d: "Switch to 2D mode", mode_3d: "Switch to 3D mode",
    mode_theme_dark: "Switch to dark theme", mode_theme_light: "Switch to light theme",
    ai_orch: "Software development",
    quick_facts: "Quick facts",
    capability_index: "Capability index",
    engage: "Build & serah terima",
    selected_works: "Selected Works",
    oss_telemetry: "Open source telemetry",
    gh_title: "GitHub",
    establish_link: "Establish link",
    ed_connect: "Connect directly",
    ed_localtime: "Local time / WIB",
    ed_role: "Full-Stack Web Developer",
    ed_role_head: "Full-Stack Web Developer",
    ed_subline: "ngubah ide mentah jadi produk yang kepake.",
    ed_tags: "Next.js / Supabase / TypeScript / Clean Shipping",
    ed_focus: "Next + Supabase",
    ed_since: "2024",
    ed_role_short: "Full-Stack",
    hero_eyebrow: "( 00 ) Intro — personal index",
    marquee: "FULL-STACK DEVELOPMENT + SOFTWARE ENGINEERING + SOFTWARE DEVELOPMENT + NEXT.JS + SUPABASE + ",
    footer_copy: "© PORTOJA",
    footer_stack: "[ Next.js / Supabase / TypeScript ]",
    ed_return: "Return to 3D mode",
    // --- 2D editorial: copy lanjutan ---
    ed_portrait_cap: "Portrait / 2026",
    ed_chips: "Web Development\nUI/UX Implementation\nFull-Stack Development",
    ed_logs_title: "Activity logs",
    ed_logs_projects: "Projects shipped",
    ed_logs_deployed: "Deployed & live",
    ed_logs_years: "Years building",
    ed_logs_resp: "Response time",
    ed_prose: "Fokus: arsitektur yang masuk akal, database yang aman (RLS), dan UI yang orang awam ngerti. Dikerjain end-to-end — dari brief, struktur data, antarmuka, sampai deploy dan serah terima.",
    skill_title: "Skills",
    works_label: "Project archive",
    ed_engage_title: "Menyesuaikan keinginan client",
    ed_engage_copy: "Sesuai kebutuhan spesifik klien — dari ide mentah sampai deploy, tanpa template yang dipaksain.",
    ed_engage: "Diskusi brief & prototype\nBuild & serah terima\nDokumentasi + dukungan",
    contact_title: "Contact",
    ed_avail: "Availability",
    ed_avail_copy: "Terbuka untuk project freelance — diskusi brief dulu, lalu build. Respon biasanya di bawah 24 jam.",
    // --- GitHub 2D: label stat & status ---
    ed_gh_public: "Public repos",
    ed_gh_followers: "Followers",
    ed_gh_stars: "Total stars",
    ed_gh_lastpush: "Last push",
    ed_gh_dist: "Code distribution",
    ed_gh_sync: "Syncing",
    ed_gh_norepo: "No public repo",
    ed_repo_nod: "No description.",
    // --- Works / Experience / Services / Contact / ProjectModal (more.tsx) ---
    works_kicker: "WORKS",
    works_h2: "SELECTED WORKS",
    works_copy: "Geser pake panah. Klik kartu → modal detail + link live.",
    view_project_link: "VIEW DETAILED INFORMATION ↗",
    exp_kicker: "EXPERIENCE",
    exp_h2: "MY EXPERIENCE — Professional Journey",
    services_kicker: "DISCIPLINES — Services & Frameworks",
    services_h2: "Yang bisa gue kerjain.",
    services_name: "WEBSITE & WEB APP DEVELOPMENT",
    services_desc: "Website, aplikasi web, dan solusi digital custom — dari struktur data sampai deploy.",
    services_del: "Website Development\nWeb Application Development\nUI Implementation\nCustom Digital Solutions",
    contact_sub_let: "[ LET'S CONNECT ]",
    contact_copy_ok: "[ COPIED TO CLIPBOARD! ]",
    contact_copy_hint: "[ CLICK EMAIL TO COPY ]",
    contact_ph_name: "Nama lu",
    contact_ph_contact: "Kontak (WA/email)",
    contact_ph_idea: "Ide mentahnya apa?",
    contact_btn: "Ajak Freelance →",
    contact_ok: "[ MASUK! Gue hubungin balik. ]",
    contact_fail: "[ GAGAL — coba email langsung. ]",
    contact_localtime: "[ LOCAL TIME / WIB ]",
    contact_tz: "JAKARTA, INDONESIA (GMT+7)",
    contact_connect: "[ CONNECT DIRECTLY ]",
    pm_role: "ROLE",
    pm_timeline: "TIMELINE",
    pm_view_github: "VIEW GITHUB CODEBASE ↗",
    pm_under_dev: "THE PROJECT IS UNDER DEVELOPMENT",
    pm_launch: "LAUNCH LIVE APPLICATION ↗",
    pm_preview_locked: "PREVIEW DILINDUNGI / BELUM TERSEDIA",
    pm_overview: "PROJECT OVERVIEW",
    pm_tech: "TECHNOLOGY INDEX",
    pm_chal: "CHALLENGES & ARCHITECTURE",
    pm_no_chal: "No challenge logs recorded.",
    pm_sol: "SOLUTION",
    pm_chal_label: "CHALLENGE",
    // --- 3D About panels (meters/stack/stats/logs) + spec + marquee ---
    spec_name: "NAME",
    spec_role: "ROLE",
    spec_focus: "FOCUS",
    spec_base: "BASE",
    spec_status: "STATUS",
    about_tags: "NEXT + SUPABASE\nPRODUCT DEVELOPMENT\nCLEAN SHIPPING",
    activity_logs: "ACTIVITY LOGS",
    more_card: "+N",
    meters_labels: "NEXT.JS & SUPABASE\nBACKEND & DATABASE\nAPI & INTEGRATION\nUI & MOTION",
    stack1_name: "FRONTEND & WEB",
    stack1_items: "Next.js\nReact 19\nTypeScript\nTailwind CSS\nGSAP / Lenis",
    stack2_name: "BACKEND & DATA",
    stack2_items: "Supabase\nPostgreSQL\nAuth + RLS\nStorage\nREST API",
    stack3_name: "WORKFLOW & DEPLOYMENT",
    stack3_items: "Git & version control\nVercel deployment\nREST API integration\nDokumentasi",
    stats_vals: "3+\n100%\n2+\n24H",
    stats_labels: "PRODUK JALAN\nDEPLOYED & LIVE\nTAHUN NGODING\nRESPON CEPAT",
    logs_dates: "2026-01-12\n2025-11-03\n2025-08-20\n2025-06-01",
    logs_texts: "SHIPPED KONVERTER MVP v0.1\nDEPLOYED WEB PENJUALAN + RLS\nSHIPPED MARKETPLACE MINI\nMULAI FREELANCE FULL-STACK",
    logs_file: "system_activity.log",
    marquee3d: "MARKETPLACE • PENJUALAN • KONVERTER • NEXT • SUPABASE • TYPESCRIPT •",
    works_preview_locked: "Preview terkunci",
    works_preview_sub: "Dilindungi Vercel Authentication",
    // --- 3D content: hero / manifesto / about / skills ---
    hero_kicker: "ABOUTME — NEXT + SUPABASE",
    tag_fullstack: "Full-Stack",
    tag_nxt: "Next + Supabase",
    tag_ai: "Product-minded",
    hero_scroll: "DESCEND ↓",
    art_ig_tag: "LIVE", art_ig_foot: "● Active", art_ig_go: "Follow ↗", art_ig_sub: "personal + views",
    art_gh_tag: "OPEN SOURCE", art_gh_foot: "repos: live", art_gh_go: "Open ↗", art_gh_sub: "Next • Supabase",
    art_in_tag: "AVAILABLE", art_in_foot: "respon < 24 jam", art_in_go: "Hire ↗", art_in_sub: "freelance: open",
    ai_assisted_building: "Product development",
    ticker2d: "NEXT.JS ✦ SUPABASE ✦ TYPESCRIPT ✦ CLEAN SHIPPING ✦ ",
    manifesto: "Ide bagus sayang kalo cuma jadi obrolan. Mending jadiin produk yang bisa dibuka dan dipake.",
    about_kicker: "ABOUT",
    about_h2: "Kenalan, versi rapi.",
    about_focus_label: "FOKUS",
    about_focus_val: "Next + Supabase",
    about_status: "STATUS",
    m_sw_title: "SOFTWARE", m_sw_sub: "ENGINEERING",
    m_ai_title: "PRODUCT", m_ai_sub: "DEVELOPMENT",
    m_fs_title: "FULL-STACK", m_fs_sub: "DEVELOPMENT",
    about_tag_nxt: "NEXT + SUPABASE", about_tag_ai: "PRODUCT DEVELOPMENT", about_tag_cs: "CLEAN SHIPPING",
    about_panel_skills: "Technical Skill Indices",
    about_panel_stack: "Technical Stacks & Tools",
    about_panel_stats: "Production Telemetry Stats",
    about_panel_work: "Professional Work Experience",
    about_panel_logs: "System Activity Logs",
    about_subtitle: "ngubah ide jadi produk digital yang kepake",
    skills_sub: "COIN • HOVER = FLIP • EDIT VIA /admin",
    skills_center: "Merancang dan membangun solusi digital — dari ide sampai sistem end-to-end yang beneran kepake.",
  },
};

// ------------------------- SUPABASE -------------------------
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export function supa(): SupabaseClient | null {
  if (!URL || !ANON) return null;
  return createClient(URL, ANON);
}

const arr = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(String) : typeof v === "string" && v ? [v] : [];

async function table<T>(sb: SupabaseClient, name: string, orderCol = "sort"): Promise<T[] | null> {
  const q = sb.from(name).select("*");
  // order hanya kalau kolom sort ada — coba, gagal → tanpa order
  const r1 = await q.order(orderCol as never);
  if (!r1.error) return (r1.data ?? []) as T[];
  const r2 = await sb.from(name).select("*");
  if (r2.error) return null;
  return (r2.data ?? []) as T[];
}

export async function getSiteData(): Promise<SiteData> {
  const sb = supa();
  if (!sb) return FALLBACK;
  try {
    const [prof, skills, projects, exps, certs, socials, statics] = await Promise.all([
      table<Record<string, unknown>>(sb, "profiles"),
      table<Record<string, unknown>>(sb, "skills"),
      table<Record<string, unknown>>(sb, "projects"),
      table<Record<string, unknown>>(sb, "experiences"),
      table<Record<string, unknown>>(sb, "certificates"),
      table<Record<string, unknown>>(sb, "socials"),
      table<Record<string, unknown>>(sb, "statics"),
    ]);
    const texts: Record<string, string> = { ...FALLBACK.texts };
    for (const row of statics ?? []) {
      const r = row as Record<string, unknown>;
      const k = String(r.key ?? r.id ?? "");
      const v = String(r.value ?? r.copy ?? r.label ?? "");
      if (k && v) texts[k] = v;
    }
    if (!prof || !prof.length) return { ...FALLBACK, live: true };
    const p = prof[0];
    const fb = FALLBACK;
    // Merge per-tabel: tabel DB yang masih kosong → pakai fallback,
    // jadi web tetap penuh sebelum admin diisi.
    const use = <T,>(db: T[] | null, fallback: T[]): T[] =>
      db && db.length ? db : fallback;
    const skillsMapped: SkillCoin[] = (skills ?? []).map((s, i) => ({
      name: String(s.name ?? `Skill ${i + 1}`),
      icon: String(s.icon ?? "?"),
    }));
    // VERCEL_PROJECTS adalah single source of truth untuk mana saja project yang
    // ditampilkan di carousel #works (6 card, tanpa rejaa/portoja/starbound-nomad).
    // DB digunake sebagai override untuk overview/challenges/solutions supaya
    // admin tetap bisa mengedit isi kartu lewat /admin dan otomatis terlihat di web.
    const vcBySlug = new Map(VERCEL_PROJECTS.map((v) => [v.slug, v]));
    const projectsMapped: Project[] = (projects ?? [])
      .filter((r) => vcBySlug.has(String(r.slug)))
      .map((r) => {
        const slug = String(r.slug);
        const vc = vcBySlug.get(slug)!;
        return {
          id: Number(r.id ?? vc.id),
          slug,
          num: String(r.num ?? vc.num),
          title: String(r.title ?? vc.title),
          category: String(r.category ?? vc.category),
          year: String(r.year ?? vc.year),
          status: (r.status === "Development" ? "Development" : vc.status === "Development" ? "Development" : "Deployed") as ProjectStatus,
          description: String(r.description ?? vc.description),
          techStack: arr(r.tech_stack ?? r.techStack).length ? arr(r.tech_stack ?? r.techStack) : vc.techStack,
          images: arr(r.images).length ? arr(r.images) : vc.images,
          linkGithub: String(r.link_github ?? r.linkGithub ?? vc.linkGithub ?? "#"),
          linkDemo: String(r.link_demo ?? r.linkDemo ?? vc.linkDemo ?? "#"),
          role: String(r.role ?? vc.role),
          overview: String(r.overview ?? vc.overview),
          challenges: arr(r.challenges).length ? arr(r.challenges) : vc.challenges,
          solutions: arr(r.solutions).length ? arr(r.solutions) : vc.solutions,
          preview: vc.preview,
        };
      })
      // Urutkan sesuai urutan VERCEL_PROJECTS.
      .sort((a, b) => {
        const ia = [...vcBySlug.keys()].indexOf(a.slug);
        const ib = [...vcBySlug.keys()].indexOf(b.slug);
        return ia - ib;
      });
    const experiencesMapped: Experience[] = (exps ?? []).map((r, i) => ({
      id: Number(r.id ?? i), num: String(r.num ?? `0${i + 1}`),
      title: String(r.title ?? "Untitled"), company: String(r.company ?? ""),
      category: String(r.category ?? "Experience"), date: String(r.date ?? ""),
      year: String(r.year ?? "2025"), description: String(r.description ?? ""),
      techStack: arr(r.tech_stack ?? r.techStack), images: arr(r.images),
      overview: String(r.overview ?? ""), challenges: arr(r.challenges), solutions: arr(r.solutions),
    }));
    const certificatesMapped: Certificate[] = (certs ?? []).map((r, i) => ({
      id: Number(r.id ?? i), title: String(r.title ?? "Untitled"),
      issuer: String(r.issuer ?? ""), year: String(r.year ?? ""),
      category: String(r.category ?? "CERTIFIED"), description: String(r.description ?? ""),
      credentialUrl: String(r.credential_url ?? r.credentialUrl ?? "#"),
    }));
    const socialsMapped: Social[] = (socials ?? []).map((s) => ({
      name: String(s.name ?? "?"), icon: String(s.icon ?? "?"), link: String(s.link ?? "#"),
    }));
    return {
      live: true,
      texts,
      profile: {
        name: String(p.name ?? fb.profile.name),
        role: String(p.role ?? fb.profile.role),
        bio: String(p.bio ?? fb.profile.bio),
        photo: String(p.photo ?? ""),
        status: String(p.status ?? fb.profile.status),
        location: String(p.location ?? fb.profile.location),
        cv_url: String(p.cv_url ?? "#"),
        email: String(p.email ?? fb.profile.email),
        spin_text: String(p.spin_text ?? fb.profile.spin_text),
        github: String(p.github ?? "#"),
        instagram: String(p.instagram ?? "#"),
      },
      skills: use(skillsMapped, fb.skills),
      projects: use(projectsMapped, fb.projects),
      experiences: use(experiencesMapped, fb.experiences),
      certificates: use(certificatesMapped, fb.certificates),
      socials: use(socialsMapped, fb.socials),
    };
  } catch {
    return FALLBACK;
  }
}

export async function sendInquiry(i: Inquiry): Promise<boolean> {
  const sb = supa();
  if (!sb) return false;
  const { error } = await sb.from("inquiries").insert(i);
  return !error;
}
