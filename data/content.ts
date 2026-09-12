/**
 * DALAM PROSES — Story Engine content (local CMS seed).
 * Rule: no fabricated personal/company/project facts.
 * Missing data renders as CMS empty-state, never fake facts.
 */

export const SITE = {
  title: "DALAM PROSES",
  tagline: "Dari ide, menjadi sesuatu yang nyata.",
  author: "Rezza",
  lang: "id",
};

export type ThinkingNode = {
  id: string;
  label: string;
  micro: string;
  material: string;
};

export const THINKING_NODES: ThinkingNode[] = [
  { id: "problem", label: "PROBLEM", micro: "Mulai dari masalah yang nyata, bukan dari solusi yang keren.", material: "dark / minimal — ruang kosong, satu titik." },
  { id: "ide", label: "IDE", micro: "Satu titik terang. Belum bentuk, tapi sudah arah.", material: "light point — titik cahaya tunggal." },
  { id: "riset", label: "RISET", micro: "Mengumpulkan pecahan: referensi, data, percakapan.", material: "fragments — kepingan tersebar." },
  { id: "design", label: "DESIGN", micro: "Memberi struktur pada yang kabur: alur, hierarki, keputusan.", material: "wireframe — garis struktur." },
  { id: "build", label: "BUILD", micro: "Membangun yang bisa disentuh, bukan yang sempurna.", material: "interface fragments — potongan nyata." },
  { id: "test", label: "TEST", micro: "Diuji oleh dunia nyata. Selalu ada yang patah.", material: "branches — jalur bercabang." },
  { id: "iterasi", label: "ITERASI", micro: "Kembali dengan pemahaman baru. Lingkaran, bukan garis lurus.", material: "looping path — jalur melingkar." },
];

export type TechItem = {
  name: string;
  category: string;
  usage: string; // actual usage only
};

export const TECHNOLOGIES: TechItem[] = [
  { name: "Next.js", category: "Framework", usage: "App Router untuk situs ini — routing, SSR, dan build produksi." },
  { name: "React", category: "UI", usage: "Komponen scene, state lokal, komposisi spatial." },
  { name: "TypeScript", category: "Bahasa", usage: "Kontrak tipe untuk camera engine & story engine." },
  { name: "GSAP + ScrollTrigger", category: "Motion", usage: "Timeline scrub: kamera mengikuti scroll, line menggambar." },
  { name: "Lenis", category: "Motion", usage: "Smooth scroll damped agar velocity kamera terasa fisik." },
  { name: "Three.js / R3F", category: "3D", usage: "Hanya untuk planet & starfield — satu WebGL context." },
  { name: "Supabase", category: "CMS/Data", usage: "Chapters, scenes, media, projects (story engine)." },
  { name: "Tailwind", category: "Styling", usage: "Design tokens & layout editorial." },
];

export const AI_ORBIT = ["IDE", "RESEARCH", "EXPLORE", "ANALYZE", "DESIGN", "DECIDE", "BUILD"];

export const DAILY_ROUTINE: { time: string; label: string; pace: string }[] = [
  { time: "07:00", label: "Datang & orientasi", pace: "slow — arrival" },
  { time: "08:00", label: "Briefing & rencana hari", pace: "steady" },
  { time: "10:00", label: "Kerja inti", pace: "deep — kamera menahan" },
  { time: "12:00", label: "Ishoma", pace: "pause — negative space" },
  { time: "13:00", label: "Lanjutan & revisi", pace: "iterative" },
  { time: "16:00", label: "Review & pulang", pace: "slow pull-back" },
];

/** PKL — all nullable. Null = CMS empty state in UI. */
export const PKL = {
  enabled: true,
  company: null as string | null,
  profile: null as string | null,
  people: [] as { name: string; role: string }[],
  supervisors: [] as { name: string; role: string }[],
  activities: [] as string[],
  work: [] as string[],
  challenges: [] as string[],
  lessons: [] as string[],
  note: "Data PKL terhubung ke CMS. Bagian yang belum diisi tampil sebagai empty-state — bukan data buatan.",
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  context: string | null;
  problem: string | null;
  think: string | null;
  design: string | null;
  build: string | null;
  result: string | null;
  reflection: string | null;
  technologies: string[];
  featured?: boolean;
};

/** Seed jujur: proyek situs ini sendiri + slot CMS. Bukan perusahaan fiktif. */
export const PROJECTS: Project[] = [
  {
    slug: "dalam-proses",
    title: "DALAM PROSES",
    summary: "Dokumenter personal sinematik interaktif — dunia yang dijelajahi kamera.",
    context: "Situs ini: eksibisi digital tentang ide, proses, PKL, dan pertumbuhan.",
    problem: "Portfolio biasa terasa seperti tumpukan kartu, bukan perjalanan.",
    think: "SCROLL = CAMERA. Process line sebagai narrative spine.",
    design: "Near-black editorial, negative space besar, tipografi spasial.",
    build: "Next.js + GSAP + Lenis + satu canvas Three.js untuk planet nyata.",
    result: "Satu dunia kontinu dari ide hingga masa depan.",
    reflection: "Kemewahan datang dari restraint, bukan dari menambah elemen.",
    technologies: ["Next.js", "GSAP", "Lenis", "Three.js"],
    featured: true,
  },
  {
    slug: "slot-2",
    title: "Slot Proyek 02",
    summary: "Terhubung ke CMS — tambah proyek nyata dari dashboard.",
    context: null, problem: null, think: null, design: null,
    build: null, result: null, reflection: null,
    technologies: [],
  },
  {
    slug: "slot-3",
    title: "Slot Proyek 03",
    summary: "Terhubung ke CMS — tambah proyek nyata dari dashboard.",
    context: null, problem: null, think: null, design: null,
    build: null, result: null, reflection: null,
    technologies: [],
  },
];

export const GROWTH = {
  before: "Tidak selalu tahu bagaimana sesuatu harus dibuat.",
  during: "Belajar memulai: riset, desain, bangun, uji, iterasi.",
  after: "Masih dalam proses — dan mungkin memang tidak pernah selesai.",
};

export const ASSET_CREDITS = [
  "Planet: NASA Blue Marble (public domain) via three-globe sample imagery.",
  "Foto memori: Cholong — ganti dengan foto nyata via CMS (Media.caption + credit).",
  "Foto workspace: Unsplash (lisensi Unsplash) — lihat Media.credit di CMS.",
];
