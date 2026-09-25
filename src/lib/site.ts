// ============================================================
// site.ts — types (cermin Davin portfolio.types), fallback data,
// Supabase client (graceful tanpa env), dan fetchers.
// Dinamis penuh: kalau env Supabase ada → live; kalau tidak → fallback.
// ============================================================
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type ProjectStatus = "Development" | "Deployed";

export interface Project {
  id: number; slug: string; num: string; title: string;
  category: string; year: string; status: ProjectStatus;
  description: string; techStack: string[]; images: string[];
  linkGithub: string; linkDemo: string; role: string;
  overview: string; challenges: string[]; solutions: string[];
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
}

// ------------------------- FALLBACK (dummy siap-ganti) -------------------------
export const FALLBACK: SiteData = {
  live: false,
  profile: {
    name: "Reja.", role: "Full-Stack Web Developer",
    bio: "Gue biasa bikin marketplace, web penjualan, dan konverter dokumen — dari ide mentah sampai deploy, dipercepat AI tapi hasilnya rapi dan bisa dipake.",
    photo: "", status: "Open freelance", location: "Indonesia • remote ok",
    cv_url: "#", email: "HALO@REJA.DEV",
    spin_text: "NEXT • SUPABASE • AI • CLEAN • RAPII •",
    github: "#", instagram: "#",
  },
  skills: [
    { name: "Next.js", icon: "N" }, { name: "Supabase", icon: "S" },
    { name: "AI / ML", icon: "AI" }, { name: "JavaScript", icon: "JS" },
    { name: "TypeScript", icon: "TS" }, { name: "Git", icon: "G" },
    { name: "CSS", icon: "C" }, { name: "Vercel", icon: "V" },
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
      overview: "Dashboard penjualan: stok, order, rekap harian. Dibantu AI untuk struktur tabel dan query rekap.",
      challenges: ["Catatan stok manual sering selisih.", "Butuh rekap cepat tanpa ngoding."],
      solutions: ["Dashboard + rekap otomatis per hari.", "Struktur DB rapi hasil iterasi AI-assisted."],
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
      challenges: ["Brief client mentah & berubah-ubah."], solutions: ["Prototype cepat AI-assisted biar revisi murah."],
    },
    {
      id: 2, num: "02", title: "AI-assisted Builder", company: "Eksperimen Mandiri",
      category: "R&D", date: "2025 — now", year: "2026",
      description: "Eksperimen AI: prompt-to-prototype, automasi dokumen.",
      techStack: ["LLM", "RAG", "Supabase"], images: [],
      overview: "Eksperimen pipeline AI: struktur DB dari brief, draft UI, automasi convert dokumen.",
      challenges: ["Output AI mentah tidak konsisten."], solutions: ["Template + review loop sampai rapi."],
    },
  ],
  certificates: [
    { id: 1, title: "AI Builder Foundations", issuer: "Provider — via admin", year: "2148", category: "AI", description: "Lolos pipeline AI-assisted + deploy.", credentialUrl: "#" },
    { id: 2, title: "Next + Supabase Shipping", issuer: "Provider — via admin", year: "0312", category: "WEB", description: "Marketplace & dashboard live.", credentialUrl: "#" },
    { id: 3, title: "Database Design Basics", issuer: "Provider — via admin", year: "0770", category: "DATA", description: "RLS + relasi rapi.", credentialUrl: "#" },
  ],
  socials: [
    { name: "INSTAGRAM", icon: "◈ IG", link: "#" },
    { name: "GITHUB", icon: "⬢ GH", link: "#" },
    { name: "LINKEDIN", icon: "✉ IN", link: "#" },
  ],
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
    const [prof, skills, projects, exps, certs, socials] = await Promise.all([
      table<Record<string, unknown>>(sb, "profiles"),
      table<Record<string, unknown>>(sb, "skills"),
      table<Record<string, unknown>>(sb, "projects"),
      table<Record<string, unknown>>(sb, "experiences"),
      table<Record<string, unknown>>(sb, "certificates"),
      table<Record<string, unknown>>(sb, "socials"),
    ]);
    if (!prof || !prof.length) return { ...FALLBACK, live: true };
    const p = prof[0];
    const fb = FALLBACK;
    // Merge per-tabel: tabel DB yang masih kosong → pakai fallback,
    // jadi web tetap penuh sebelum admin diisi.
    const use = <T,>(db: T[] | null, fallback: T[]): T[] =>
      db && db.length ? db : fallback;
    const skillsMapped: SkillCoin[] = (skills ?? []).map((s, i) => ({
      name: String(s.name ?? `Skill ${i + 1}`),
      icon: String(s.icon ?? String(s.name ?? "?").slice(0, 2).toUpperCase()),
    }));
    const projectsMapped: Project[] = (projects ?? []).map((r, i) => ({
      id: Number(r.id ?? i), slug: String(r.slug ?? `p-${i}`),
      num: String(r.num ?? `0${i + 1}`), title: String(r.title ?? "Untitled"),
      category: String(r.category ?? "Project"), year: String(r.year ?? "2025"),
      status: (r.status === "Development" ? "Development" : "Deployed") as ProjectStatus,
      description: String(r.description ?? ""), techStack: arr(r.tech_stack ?? r.techStack),
      images: arr(r.images), linkGithub: String(r.link_github ?? r.linkGithub ?? "#"),
      linkDemo: String(r.link_demo ?? r.linkDemo ?? "#"),
      role: String(r.role ?? "Full-Stack Developer"),
      overview: String(r.overview ?? ""), challenges: arr(r.challenges), solutions: arr(r.solutions),
    }));
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
