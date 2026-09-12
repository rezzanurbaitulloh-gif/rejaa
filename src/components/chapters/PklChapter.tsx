"use client";

import Link from "next/link";
import { Scene } from "@/components/cosmos/Scene";
import { MemoryPhoto } from "@/components/cosmos/MemoryPhoto";
import { useContent } from "@/components/story/StoryProvider";
import { normalizePkl } from "@/data/content";
import { useStory } from "@/lib/store";

/**
 * PKL WORLD (§21–§22) — bukan koleksi kartu. Foto lingkungan sebagai
 * lapisan dunia (40–60% viewport), teks terpisah, kamera melayang.
 * Garis kosmik berlanjut samar sebagai benang penghubung.
 */
const RULE_META: Record<string, string> = {
  Disiplin: "Tepat waktu, catat progres.",
  "Tanggung jawab": "Ada pemilik & definisi selesai.",
  Etika: "Jaga data & komunikasi.",
  Keselamatan: "Ikuti prosedur ruang kerja.",
  Komunikasi: "Blokir > sehari → angkat.",
};

export function PklChapter() {
  const { pkl: raw } = useContent();
  const pkl = normalizePkl(raw);
  const pklEnabled = useStory((s) => s.pklEnabled);
  if (!pklEnabled) return null;

  return (
    <div id="pkl">
      <Scene stop="pkl" label="PKL Intro" minH="150svh" align="left">
        <p className="chapter-label">09 / SEBUAH PENGALAMAN</p>
        <h2 className="display-xl mt-6">PRAKTIK<br />KERJA<br />LAPANGAN</h2>
        <p className="body-lead mt-8 max-w-md">(PKL) — chapter di mana teori bertemu dunia nyata.</p>
      </Scene>

      <Scene stop="pkl" label="Apa itu PKL" minH="130svh" align="left">
        <p className="chapter-label">10 / APA ITU PKL</p>
        <h2 className="font-display mt-6 text-4xl font-extrabold uppercase md:text-6xl">PKL</h2>
        <p className="body-lead mt-6 max-w-xl">
          Praktik Kerja Lapangan merupakan proses pembelajaran yang membawa siswa untuk mengenal lingkungan kerja secara langsung.
        </p>
        <MemoryPhoto src="/mem/meeting.jpg" alt="Suasana diskusi di tempat PKL" caption="Dokumentasi lapangan." />
      </Scene>

      {pkl.goals.length > 0 && (
        <Scene stop="pkl" label="Tujuan PKL" minH="140svh" align="left">
          <p className="chapter-label">11 / TUJUAN PKL</p>
          <ol className="mt-10 space-y-6">
            {pkl.goals.map((g, i) => (
              <li key={g} className="flex items-baseline gap-5">
                <span className="font-display text-2xl font-extrabold text-accent">0{i + 1}</span>
                <span className="body-lead">{g}</span>
              </li>
            ))}
          </ol>
          <MemoryPhoto src="/mem/server.jpg" alt="Infrastruktur yang dipelajari dari dalam" caption="Lingkungan kerja yang dipelajari dari dalam." />
        </Scene>
      )}

      {pkl.rules.length > 0 && (
        <Scene stop="pkl" label="Aturan dan Tanggung Jawab" minH="140svh" align="center">
          <p className="chapter-label">12 / ATURAN &amp; TANGGUNG JAWAB</p>
          <h2 className="font-display mt-6 text-4xl font-extrabold uppercase md:text-6xl">Aturan main.</h2>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-x-10 gap-y-5 text-left sm:grid-cols-2">
            {pkl.rules.map((r) => (
              <li key={r.title} className="border-l border-white/15 pl-5">
                <p className="font-display text-sm font-bold uppercase tracking-wide">{r.title}</p>
                <p className="body-muted mt-1 text-xs">{RULE_META[r.title] ?? r.body}</p>
              </li>
            ))}
          </ul>
        </Scene>
      )}

      <Scene stop="pkl2" label="Tempat PKL" minH="150svh" align="left">
        <p className="chapter-label">13 / TEMPAT SAYA BELAJAR</p>
        <h2 className="font-display mt-6 text-4xl font-extrabold uppercase md:text-6xl">Tempat PKL</h2>
        {pkl.company ? (
          <div className="mt-8 max-w-xl">
            <p className="font-display text-2xl font-extrabold">{pkl.company}</p>
            <p className="body-muted mt-3 text-sm">{pkl.company_profile}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {pkl.division && <span className="chip">{pkl.division}</span>}
              {pkl.address && <span className="chip">{pkl.address}</span>}
            </div>
          </div>
        ) : (
          <p className="body-muted mt-8 max-w-md border-l-2 border-accent pl-4">
            Masih dalam proses — detail tempat belajar akan diisi melalui CMS.
          </p>
        )}
        <MemoryPhoto wide src="/mem/office-loft.jpg" alt={pkl.company ? `Lingkungan ${pkl.company}` : "Lingkungan kerja"} />
      </Scene>

      {pkl.people.length > 0 && (
        <Scene stop="pkl3" label="Pimpinan dan Pembimbing" minH="140svh" align="center">
          <p className="chapter-label">14 / ORANG-ORANG DI BALIKNYA</p>
          <h2 className="font-display mt-6 text-3xl font-extrabold uppercase md:text-5xl">Pimpinan &amp; pembimbing.</h2>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-8 sm:grid-cols-3">
            {pkl.people.map((p) => (
              <li key={p.name}>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 font-display text-lg font-extrabold" aria-hidden>
                  {p.name.charAt(0)}
                </div>
                <p className="font-display mt-3 text-sm font-bold">{p.name}</p>
                <p className="chapter-label mt-1">{p.role}</p>
                <p className="body-muted mt-1 text-xs">{p.note}</p>
              </li>
            ))}
          </ul>
        </Scene>
      )}

      {pkl.routine.length > 0 && (
        <Scene stop="routine" label="Hari-hari Saya" minH="160svh" align="left">
          <p className="chapter-label">15 / SEHARI DI SANA</p>
          <h2 className="font-display mt-6 text-4xl font-extrabold uppercase md:text-6xl">Sehari di sana.</h2>
          {/* Timeline = journey line yang menjadi waktu (§22). */}
          <ol className="relative mt-10 max-w-xl space-y-0 border-l border-white/20">
            {pkl.routine.map((r) => (
              <li key={r.time} className="relative py-4 pl-8">
                <span aria-hidden className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-accent" style={{ boxShadow: "0 0 12px 1px rgba(43,92,255,.6)" }} />
                <p className="font-mono text-sm text-cream">{r.time} <span className="ml-3 font-display font-bold">{r.label}</span></p>
                <p className="mt-1 text-xs text-muted">{r.detail}</p>
              </li>
            ))}
          </ol>
        </Scene>
      )}

      {pkl.activities.length > 0 && (
        <Scene stop="pkl3" label="Aktivitas PKL" minH="140svh" align="left">
          <p className="chapter-label">16 / AKTIVITAS</p>
          <h2 className="font-display mt-6 text-4xl font-extrabold uppercase md:text-5xl">Aktivitas.</h2>
          <p className="body-lead mt-4 max-w-xl">Mempelajari sistem kerja — memahami operasional, alur kerja, dan bagaimana pekerjaan dilakukan langsung di lapangan.</p>
          <MemoryPhoto wide src="/mem/team.jpg" alt="Aktivitas bersama tim" />
          <ul className="mt-8 space-y-4">
            {pkl.activities.map((a) => (
              <li key={a.title} className="flex items-baseline gap-4">
                <span className="chip">{a.tag}</span>
                <div>
                  <p className="font-display font-bold">{a.title}</p>
                  <p className="body-muted text-sm">{a.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Scene>
      )}

      <Scene stop="project" label="Project PKL" minH="140svh" align="left">
        <p className="chapter-label">17 / PEKERJAAN — PROJECT 01</p>
        <h2 className="font-display mt-6 text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">Sistem Operasional Catering</h2>
        <p className="body-lead mt-6 max-w-xl">Saya membantu merancang sistem operasional catering, mulai dari customer hingga admin.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Web-App", "UI/UX", "Database"].map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        <Link href="/work/catering-os" className="mt-8 inline-block rounded-full bg-cream px-6 py-3 text-xs font-semibold tracking-[0.2em] text-black">
          LIHAT DETAIL →
        </Link>
      </Scene>

      {pkl.challenges.length > 0 && (
        <Scene stop="project" label="Problem ke Solution" minH="140svh" align="left">
          <p className="chapter-label">18 / PROBLEM → SOLUTION</p>
          <h2 className="font-display mt-6 text-4xl font-extrabold uppercase md:text-5xl">Masalah → proses → solusi.</h2>
          <ol className="relative mt-10 max-w-xl space-y-0 border-l border-white/20">
            {["Masalah yang ditemukan", "Observe", "Think", "Design", "Mulai membuat", "Mencoba & evaluasi", "Result"].map((s) => (
              <li key={s} className="relative py-2.5 pl-8 text-sm text-muted">
                <span aria-hidden className="absolute -left-[4px] top-4 h-2 w-2 rounded-full border border-accent bg-void" />
                {s}
              </li>
            ))}
          </ol>
          <div className="mt-8 max-w-xl space-y-4">
            {pkl.challenges.slice(0, 2).map((c) => (
              <div key={c.problem} className="border-l-2 border-accent pl-5">
                <p className="font-display font-bold">{c.problem}</p>
                <p className="body-muted mt-1 text-sm">{c.investigate} → {c.solution}</p>
              </div>
            ))}
          </div>
        </Scene>
      )}
    </div>
  );
}
