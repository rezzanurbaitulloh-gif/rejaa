"use client";

import { Scene } from "@/components/cosmos/Scene";
import { MemoryPhoto } from "@/components/cosmos/MemoryPhoto";
import { useContent } from "@/components/story/StoryProvider";
import { normalizePkl } from "@/data/content";

/**
 * GROWTH + ENDING (§25–§26) — kepadatan diturunkan, kamera melambat,
 * ruang kosong besar. Tiga foto BEFORE/DURING/AFTER menajam bergantian.
 * Di ending, garis berlanjut melampaui viewport — tidak berakhir.
 */
const GROWTH_IMG = ["/mem/desk.jpg", "/mem/devs.jpg", "/mem/meeting.jpg"];

export function ClosingChapter() {
  const { pkl: raw, site } = useContent();
  const pkl = normalizePkl(raw);
  const growth = [pkl.growth.before, pkl.growth.during, pkl.growth.after].filter(Boolean);
  const phases = ["BEFORE", "DURING", "AFTER"];

  return (
    <>
      <Scene stop="growth" label="Lessons Learned" minH="150svh" align="center">
        <p className="eyebrow">21 / SKILL TREE — APA YANG SAYA PELAJARI</p>
        <p className="font-display mt-8 text-xl font-bold md:text-2xl">Saya selalu belajar.</p>
        <ul className="mx-auto mt-8 grid max-w-3xl gap-6 text-left sm:grid-cols-3">
          {(["Desain", "Logika", "Komunikasi"] as const).map((branch, bi) => (
            <li key={branch} className="border-t border-white/15 pt-4">
              <p className="font-display text-sm font-extrabold uppercase">{branch}</p>
              <p className="body-muted mt-2 text-xs leading-relaxed">
                {pkl.lessons[bi] ?? "Cabang ini akan diisi melalui CMS."}
              </p>
              <p className="mt-3 text-[11px] font-semibold text-accent">
                {["Iterasi", "Problem Solving", "Adaptasi"][bi]}
              </p>
            </li>
          ))}
        </ul>
      </Scene>

      <Scene stop="growth" label="Growth" minH="170svh" align="left">
        <p className="chapter-label">22 / PERUBAHAN DIRI</p>
        <div className="mt-10 max-w-xl space-y-12">
          {growth.map((g, i) => (
            <div key={phases[i]}>
              <p className="chapter-label">{phases[i]}</p>
              <p className="body-lead mt-2">{g}</p>
              <MemoryPhoto src={GROWTH_IMG[i % GROWTH_IMG.length]} alt={`Suasana fase ${phases[i].toLowerCase()}`} />
            </div>
          ))}
        </div>
      </Scene>

      <Scene stop="growth" label="Kembali ke Dalam Proses" minH="130svh" align="center">
        <p className="chapter-label">23 / KEMBALI KE ‘DALAM PROSES’</p>
        <h2 className="font-display mx-auto mt-8 max-w-3xl text-4xl font-extrabold uppercase md:text-6xl">
          Ternyata ini belum selesai.
        </h2>
        <p className="body-muted mx-auto mt-8 max-w-xl">Dan mungkin memang tidak pernah. Karena belajar tidak selesai ketika PKL berakhir.</p>
      </Scene>

      <Scene stop="ending" label="Masa Depan" minH="140svh" align="center">
        <p className="eyebrow">24 / MASA DEPAN</p>
        <p className="body-lead mt-6">Saya masih ingin belajar, membangun, mencoba.</p>
        <h2 className="display-xl mt-8">MASIH DALAM<br />PROSES.</h2>
      </Scene>

      <Scene stop="ending" label="Ending" minH="150svh" align="center">
        <p className="chapter-label">25 / ENDING</p>
        <h2 className="font-display mt-6 text-6xl font-extrabold uppercase tracking-tight md:text-8xl">REZZA</h2>
        <p className="chapter-label mt-4">AI ENGINEER · BUILDER · PROBLEM SOLVER</p>
        <p className="body-muted mx-auto mt-8 max-w-md text-sm">Garis ini tidak berakhir — ia berlanjut melampaui viewport, ke dalam gelap.</p>
      </Scene>

      <section id="kontak" aria-label="Contact" className="relative px-6 pb-32 pt-24 md:px-10" data-stop="ending">
        <div className="mx-auto grid max-w-5xl items-center gap-12 text-center md:grid-cols-2 md:text-left">
          <div>
            <p className="eyebrow">25 / ENDING — CONTACT</p>
            <h2 className="font-display mt-6 text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">REZZA</h2>
            <p className="chapter-label mt-4">AI ENGINEER</p>
            <p className="body-muted mt-4 max-w-sm text-sm">Membangun di antara rasa ingin tahu dan kebutuhan.</p>
          </div>
          <div className="text-left">
            <p className="eyebrow">Kontak</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <span className="text-muted">Email</span>
                <a href={`mailto:${site.contact_email}`} className="hover:text-cream">{site.contact_email}</a>
              </li>
              {site.socials.map((s) => (
                <li key={s.label} className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <span className="text-muted">{s.label}</span>
                  <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-cream">{s.href.replace("https://", "")} ↗</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="eyebrow mt-20 text-center">TERIMA KASIH SUDAH MENGIKUTI PERJALANAN INI · © 2026</p>
        <p className="monogram mt-3 text-center text-[10px] text-faint">REZZA — MASIH DALAM PROSES</p>
      </section>
    </>
  );
}
