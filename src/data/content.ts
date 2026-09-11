import type { PklProfile, Project, SiteSettings, Technology } from "./types";

/**
 * FALLBACK CONTENT — dipakai saat Supabase belum dikonfigurasi.
 * Seluruh string di sini BISA dan HARUS diubah melalui /admin (Story Engine).
 * Jangan menganggap isi ini sebagai fakta final; ini placeholder editorial
 * yang mengikuti struktur referensi alurweb.png agar narasi tetap nyambung.
 */

export const siteSettingsFallback: SiteSettings = {
  title: "DALAM PROSES",
  tagline: "Dari ide, menjadi sesuatu yang nyata.",
  intro_skip_enabled: true,
  sound_default_on: false,
  pkl_experience_enabled: true,
  contact_email: "halo@dalamproses.id",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
  ],
};

export const technologiesFallback: Technology[] = [
  { id: "t-next", name: "Next.js", category: "framework", usage: "Rangka aplikasi web: routing, rendering, dan API.", in_field: true, order: 1 },
  { id: "t-react", name: "React", category: "framework", usage: "Komposisi UI per scene.", in_field: true, order: 2 },
  { id: "t-ts", name: "TypeScript", category: "framework", usage: "Kontrak tipe antar scene dan CMS.", in_field: true, order: 3 },
  { id: "t-tailwind", name: "Tailwind", category: "framework", usage: "Design tokens dan spacing editorial.", in_field: true, order: 4 },
  { id: "t-gsap", name: "GSAP", category: "tooling", usage: "Kamera scroll-driven dan lifecycle scene.", in_field: true, order: 5 },
  { id: "t-lenis", name: "Lenis", category: "tooling", usage: "Smooth scroll yang stabil.", in_field: true, order: 6 },
  { id: "t-supabase", name: "Supabase", category: "data", usage: "Postgres + Auth + Storage untuk Story Engine.", in_field: true, order: 7 },
  { id: "t-postgres", name: "PostgreSQL", category: "data", usage: "Sumber kebenaran konten.", in_field: true, order: 8 },
  { id: "t-vercel", name: "Vercel", category: "deploy", usage: "Deployment dan preview.", in_field: true, order: 9 },
  { id: "t-ai", name: "AI Partner", category: "ai", usage: "Eksplorasi, riset, rencana, dan iterasi.", in_field: true, order: 10 },
];

export const projectsFallback: Project[] = [
  {
    id: "p-catering",
    slug: "catering-os",
    title: "Catering OS",
    summary: "Sistem operasional catering: pesanan, menu, dan inventori dalam satu alur.",
    context: "Operasional catering yang masih tersebar di chat dan spreadsheet.",
    problem: "Pesanan, jadwal masak, dan stok tidak saling terhubung.",
    think: "Petakan alur dari pesanan masuk hingga jadi laporan.",
    design: "Satu dasbor dengan status yang bisa dibaca sekilas.",
    build: "Web app + database dengan peran admin dan dapur.",
    result: "Alur tercatat rapi; admin tidak lagi menyalin data antar aplikasi.",
    reflection: "Proses yang terlihat membuat keputusan lebih tenang.",
    technologies: ["Next.js", "Supabase", "PostgreSQL"],
    links: [{ label: "Lihat Project", href: "#" }],
    featured: true,
    visible: true,
    order: 1,
  },
  {
    id: "p-arunika",
    slug: "arunika",
    title: "Arunika",
    summary: "Eksperimen narasi sinematik: scroll sebagai kamera.",
    context: "Kebutuhan mempresentasikan karya tanpa slide.",
    problem: "Portfolio biasa tidak menyampaikan proses berpikir.",
    think: "Perlakukan setiap karya sebagai adegan, bukan kartu.",
    design: "Constellation: karya aktif di tengah, sisanya mengorbit.",
    build: "Scene engine + focus system + process line.",
    result: "Pengunjung mengikuti cerita, bukan sekadar mengklik.",
    reflection: "Kamera yang punya makna mengalahkan efek yang ramai.",
    technologies: ["React", "GSAP"],
    links: [{ label: "Lihat Project", href: "#" }],
    featured: false,
    visible: true,
    order: 2,
  },
  {
    id: "p-takarkita",
    slug: "takarkita",
    title: "TakarKita",
    summary: "Pencatat operasional kecil dengan laporan yang jujur.",
    context: "Usaha kecil butuh angka yang bisa dipercaya.",
    problem: "Rekap manual sering selisih dan terlambat.",
    think: "Buat input semudah chat, output sejelas struk.",
    design: "Form cepat + ringkasan harian yang tenang.",
    build: "CRUD + rekap + ekspor.",
    result: "Rekap harian selesai dalam hitungan menit.",
    reflection: "Kesederhanaan adalah fitur.",
    technologies: ["Next.js", "PostgreSQL"],
    links: [{ label: "Lihat Project", href: "#" }],
    featured: false,
    visible: true,
    order: 3,
  },
];

export const pklFallback: PklProfile = {  enabled: true,
  company: "PT Solusi Digital Nusantara",
  company_profile:
    "Perusahaan teknologi yang membangun solusi digital untuk operasional bisnis.",
  division: "Divisi Engineering",
  address: "Jakarta, Indonesia",
  goals: [
    "Mengenal dunia kerja profesional",
    "Menerapkan pembelajaran ke masalah nyata",
    "Mengembangkan ketrampilan kolaborasi",
    "Membentuk sikap profesional",
  ],
  rules: [
    { title: "Disiplin", body: "Hadir tepat waktu dan mencatat progres harian." },
    { title: "Tanggung jawab", body: "Setiap tugas ada pemilik dan definisi selesai." },
    { title: "Etika", body: "Jaga data dan komunikasi internal." },
    { title: "Keselamatan", body: "Ikuti prosedur ruang kerja dan perangkat." },
    { title: "Komunikasi", body: "Blokir lebih dari sehari wajib diangkat ke pembimbing." },
  ],
  people: [
    { name: "Pembimbing Lapangan", role: "Supervisor", note: "Mengarahkan tugas dan standar hasil." },
    { name: "Lead Tim", role: "Director", note: "Menjaga arah dan prioritas." },
    { name: "Rekan Magang", role: "Peer", note: "Teman diskusi dan review." },
  ],
  routine: [
    { time: "07:00", label: "Berangkat", detail: "Persiapan dan perjalanan." },
    { time: "08:00", label: "Memulai aktivitas", detail: "Daily check dan rencana hari." },
    { time: "10:00", label: "Pekerjaan", detail: "Fokus blok 1: build & riset." },
    { time: "12:00", label: "Istirahat", detail: "Jeda dan refleksi singkat." },
    { time: "13:00", label: "Melanjutkan", detail: "Fokus blok 2: review & iterasi." },
    { time: "16:00", label: "Selesai", detail: "Log harian dan rencana besok." },
  ],
  activities: [
    { title: "Mempelajari sistem kerja", body: "Observasi alur dari hulu ke hilir sebelum menyentuh kode.", tag: "Observe" },
    { title: "Membangun fitur kecil", body: "Tugas vertikal tipis: satu alur selesai penuh.", tag: "Build" },
    { title: "Review bersama", body: "Kode dibaca bareng; keputusan dicatat.", tag: "Review" },
  ],
  challenges: [
    {
      problem: "Alur yang tidak terdokumentasi",
      investigate: "Telusuri kode dan tanya pemilik proses.",
      solution: "Buat peta alur + checklist validasi.",
    },
    {
      problem: "Data tidak konsisten",
      investigate: "Bandingkan sumber dan waktu tulis.",
      solution: "Satu sumber kebenaran + constraint database.",
    },
  ],
  lessons: [
    "Proses yang terlihat menenangkan keputusan.",
    "AI mempercepat eksplorasi; verifikasi tetap manual.",
    "Tugas kecil yang selesai mengalahkan rencana besar yang mandek.",
  ],
  growth: {
    before: "Fokus pada hasil; alat sebagai jalan pintas.",
    during: "Memahami proses; mencatat keputusan.",
    after: "AI sebagai partner berpikir; proses sebagai identitas.",
  },
};

/**
 * §30 honesty: CMS boleh mengembalikan profil PKL parsial/minimal.
 * Normalisasi menjamin struktur aman (array/string default) TANPA mengarang
 * isi — field kosong di-omit oleh komponen, bukan diisi karangan.
 */
export function normalizePkl(p: Partial<PklProfile> | null | undefined): PklProfile {
  return {
    enabled: p?.enabled ?? true,
    company: p?.company ?? "",
    company_profile: p?.company_profile ?? "",
    division: p?.division ?? "",
    address: p?.address ?? "",
    goals: p?.goals ?? [],
    rules: p?.rules ?? [],
    people: p?.people ?? [],
    routine: p?.routine ?? [],
    activities: p?.activities ?? [],
    challenges: p?.challenges ?? [],
    lessons: p?.lessons ?? [],
    growth: {
      before: p?.growth?.before ?? "",
      during: p?.growth?.during ?? "",
      after: p?.growth?.after ?? "",
    },
  };
}
