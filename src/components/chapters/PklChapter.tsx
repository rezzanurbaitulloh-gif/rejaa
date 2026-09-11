"use client";

import { Scene } from "@/components/camera/Scene";
import { ChapterHeading, CinematicFrame, RuleList } from "./ui";
import { useContent } from "@/components/story/StoryProvider";
import { useStory } from "@/lib/store";

/**
 * PKL = CHAPTER, bukan website terpisah.
 * Seluruh chapter ini hilang elegan saat PKL OFF (tanpa copy "PKL disabled",
 * tanpa route kosong, navigasi menyesuaikan).
 */
export function PklChapter() {
  const { pkl } = useContent();
  const pklEnabled = useStory((s) => s.pklEnabled);
  if (!pklEnabled) return null;

  return (
    <div id="pkl">
      <Scene id="pkl-intro" label="PKL Intro" preset="zoom-out" node={4} className="scene-cinematic flex items-center">
        <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
          <p className="chapter-label" data-reveal>08 / SEBUAH PENGALAMAN</p>
          <h2 className="display-xl mt-4" data-reveal>
            PRAKTIK
            <br />
            KERJA
            <br />
            LAPANGAN
          </h2>
          <p className="body-lead mt-6 max-w-xl" data-reveal>(PKL) — chapter di mana teori bertemu dunia nyata.</p>
        </div>
      </Scene>

      <Scene id="pkl-apa" label="Apa itu PKL" preset="blur-focus" className="scene-editorial">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-2 md:px-8" data-exit>
          <ChapterHeading index="09" eyebrow="APA ITU PKL" title={<>PKL</>} lede="Praktik Kerja Lapangan: proses pembelajaran yang membawa siswa untuk mengenal lingkungan kerja secara langsung." />
          <CinematicFrame label="Dokumentasi lapangan" caption="Video/gambar kegiatan — kelola via CMS Media (desktop + mobile asset)." />
        </div>
      </Scene>

      <Scene id="pkl-tujuan" label="Tujuan PKL" preset="pan" className="scene-editorial">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-2 md:px-8" data-exit>
          <div>
            <ChapterHeading index="10" eyebrow="TUJUAN PKL" title={<>Tujuan PKL</>} />
            <ol className="mt-8 space-y-4">
              {pkl.goals.map((g, i) => (
                <li key={g} className="flex gap-4" data-reveal>
                  <span className="font-display text-2xl font-extrabold text-accent">0{i + 1}</span>
                  <span className="body-lead">{g}</span>
                </li>
              ))}
            </ol>
          </div>
          <CinematicFrame label="Lingkungan kerja" caption="Establishing shot tempat belajar." />
        </div>
      </Scene>

      <Scene id="pkl-aturan" label="Aturan dan Tanggung Jawab" preset="establish" className="scene-editorial">
        <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
          <ChapterHeading index="11" eyebrow="ATURAN & TANGGUNG JAWAB" title={<>Aturan main.</>} lede="Interactive handbook: lima hal yang saya pegang selama PKL." />
          <div className="mt-8">
            <RuleList items={pkl.rules} />
          </div>
        </div>
      </Scene>

      <Scene id="pkl-tempat" label="Tempat PKL" preset="zoom-in" className="scene-editorial">
        <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
          <ChapterHeading index="12" eyebrow="TEMPAT SAYA BELAJAR" title={<>Tempat PKL</>} />
          <div className="panel mt-8 grid gap-6 p-6 md:grid-cols-2 md:p-8">
            <div data-reveal>
              <p className="font-display text-2xl font-extrabold">{pkl.company}</p>
              <p className="body-muted mt-2 text-sm">{pkl.company_profile}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip">{pkl.division}</span>
                <span className="chip">{pkl.address}</span>
              </div>
            </div>
            <div data-reveal>
              <CinematicFrame label={`Gedung ${pkl.company}`} ratio="4/3" />
            </div>
          </div>
        </div>
      </Scene>

      <Scene id="pkl-people" label="Pimpinan dan Pembimbing" preset="establish" className="scene-editorial">
        <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
          <ChapterHeading index="13" eyebrow="ORANG-ORANG DI BALIKNYA" title={<>Pimpinan & pembimbing.</>} />
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {pkl.people.map((p) => (
              <li key={p.name} className="panel p-5 text-center" data-reveal>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border hairline font-display text-lg font-extrabold" aria-hidden>
                  {p.name.charAt(0)}
                </div>
                <p className="font-display mt-3 font-bold">{p.name}</p>
                <p className="chapter-label mt-1">{p.role}</p>
                <p className="body-muted mt-2 text-sm">{p.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </Scene>

      <Scene id="pkl-hari" label="Hari-hari Saya" preset="pan" className="scene-editorial">
        <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
          <ChapterHeading index="14" eyebrow="SEHARI DI SANA" title={<>Sehari di sana.</>} lede="Scroll mengendalikan waktu." />
          <ol className="mt-10 grid gap-2 md:grid-cols-6" aria-label="Rutinitas harian">
            {pkl.routine.map((r) => (
              <li key={r.time} className="panel relative p-4 pt-6" data-reveal>
                <span className="accent-dot absolute left-4 top-3" aria-hidden />
                <p className="font-mono text-sm text-accent">{r.time}</p>
                <p className="font-display mt-1 text-sm font-bold">{r.label}</p>
                <p className="mt-1 text-xs text-muted">{r.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </Scene>

      <Scene id="pkl-aktivitas" label="Aktivitas PKL" preset="pan" className="scene-editorial">
        <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
          <ChapterHeading index="15" eyebrow="AKTIVITAS" title={<>Aktivitas.</>} lede="Horizontal cinematic gallery — geser untuk menjelajah." />
          <div className="no-scrollbar mt-8 flex snap-x gap-4 overflow-x-auto pb-2">
            {pkl.activities.map((a) => (
              <article key={a.title} className="panel min-w-72 max-w-80 snap-start p-5" data-reveal tabIndex={0}>
                <p className="chip">{a.tag}</p>
                <h3 className="font-display mt-3 text-lg font-bold">{a.title}</h3>
                <p className="body-muted mt-2 text-sm">{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Scene>

      <Scene id="pkl-tantangan" label="Problem ke Solution" preset="zoom-in" className="scene-editorial">
        <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
          <ChapterHeading index="16" eyebrow="PROBLEM → SOLUTION" title={<>Masalah → proses → solusi.</>} />
          <div className="mt-8 space-y-4">
            {pkl.challenges.map((c, i) => (
              <div key={c.problem} className="panel grid gap-3 p-5 md:grid-cols-3 md:p-6" data-reveal>
                <div>
                  <p className="chapter-label">0{i + 1} / PROBLEM</p>
                  <p className="font-display mt-2 font-bold">{c.problem}</p>
                </div>
                <div>
                  <p className="chapter-label">INVESTIGATE</p>
                  <p className="body-muted mt-2 text-sm">{c.investigate}</p>
                </div>
                <div>
                  <p className="chapter-label">SOLUTION</p>
                  <p className="mt-2 text-sm">{c.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Scene>
    </div>
  );
}
