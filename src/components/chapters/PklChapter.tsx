"use client";

import { useRef } from "react";
import { CameraWorld } from "@/components/camera/CameraWorld";
import { ChapterHeading, CinematicFrame, RuleList } from "./ui";
import { useContent } from "@/components/story/StoryProvider";
import { normalizePkl } from "@/data/content";
import { useStory } from "@/lib/store";

/**
 * PKL = CHAPTER dalam narasi yang sama — sinematik, bukan laporan.
 * §30: blok faktual (orang, rutinitas, aktivitas) hanya tampil bila CMS
 * menyediakan data; field kosong di-omit anggun, bukan diisi karangan.
 */
export function PklChapter() {
  const { pkl: raw } = useContent();
  const pkl = normalizePkl(raw);
  const pklEnabled = useStory((s) => s.pklEnabled);
  const timeRef = useRef<HTMLParagraphElement>(null);
  if (!pklEnabled) return null;

  const driveTime = (pr: number) => {
    const el = timeRef.current;
    if (!el || !pkl.routine.length) return;
    const i = Math.min(pkl.routine.length - 1, Math.floor(pr * pkl.routine.length));
    el.textContent = pkl.routine[i].time;
  };
  const half = (arr: unknown[]) => Math.ceil(arr.length / 2);

  return (
    <div id="pkl">
      {/* INTRO — push through gerbang chapter */}
      <CameraWorld id="pkl-intro" label="PKL Intro" durationVh={30}
        moves={[
          { pose: { scale: 1 }, focus: ["t"], dur: 1 },
          { pose: { scale: 2.2 }, focus: ["t"], dur: 1.2 },
          { pose: { scale: 3 }, focus: [], dur: 0.8 },
        ]}>
        <div data-f="t" className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="chapter-label">08 / SEBUAH PENGALAMAN</p>
          <h2 className="display-xl mt-4">PRAKTIK<br />KERJA<br />LAPANGAN</h2>
          <p className="body-lead mt-6">(PKL) — chapter di mana teori bertemu dunia nyata.</p>
        </div>
      </CameraWorld>

      {/* APA ITU PKL — pan */}
      <CameraWorld id="pkl-apa" label="Apa itu PKL" durationVh={25}
        moves={[
          { pose: { scale: 1, xPercent: 6 }, focus: ["a"], dur: 1 },
          { pose: { scale: 1.3, xPercent: -6 }, focus: ["b"], dur: 1 },
        ]}>
        <div data-f="a" data-depth={0.6} className="absolute left-[8%] top-[20%] max-w-xl md:left-[10%]">
          <ChapterHeading index="09" eyebrow="APA ITU PKL" title={<>PKL</>}
            lede="Praktik Kerja Lapangan: proses pembelajaran yang membawa siswa mengenal lingkungan kerja secara langsung." />
        </div>
        <div data-f="b" data-depth={0.7} className="absolute bottom-[12%] right-[8%] w-[80%] md:right-[10%] md:w-[38%]">
          <CinematicFrame label="Dokumentasi lapangan" caption="Video/gambar kegiatan — kelola via CMS Media." />
        </div>
      </CameraWorld>

      {/* TUJUAN — push, fokus berpasangan */}
      {pkl.goals.length > 0 && (
        <CameraWorld id="pkl-tujuan" label="Tujuan PKL" durationVh={25}
          moves={[
            { pose: { scale: 1 }, focus: ["g1"], dur: 1 },
            { pose: { scale: 1.3 }, focus: ["g2"], dur: 1 },
          ]}>
          <div className="absolute inset-0 flex flex-col justify-center px-[8%] md:px-[10%]">
            <p data-f="g1" className="chapter-label">10 / TUJUAN PKL</p>
            <ol className="mt-6 space-y-4">
              {pkl.goals.slice(0, half(pkl.goals)).map((g, i) => (
                <li key={g} data-f="g1" className="flex gap-4">
                  <span className="font-display text-2xl font-extrabold text-accent">0{i + 1}</span>
                  <span className="body-lead">{g}</span>
                </li>
              ))}
            </ol>
            <ol className="mt-4 space-y-4">
              {pkl.goals.slice(half(pkl.goals)).map((g, i) => (
                <li key={g} data-f="g2" className="flex gap-4">
                  <span className="font-display text-2xl font-extrabold text-accent">0{half(pkl.goals) + i + 1}</span>
                  <span className="body-lead">{g}</span>
                </li>
              ))}
            </ol>
          </div>
        </CameraWorld>
      )}

      {/* ATURAN — slow push hold */}
      {pkl.rules.length > 0 && (
        <CameraWorld id="pkl-aturan" label="Aturan dan Tanggung Jawab" durationVh={25}
          moves={[
            { pose: { scale: 1 }, focus: ["r"], dur: 1 },
            { pose: { scale: 1.15 }, focus: ["r"], dur: 1 },
          ]}>
          <div data-f="r" className="absolute inset-0 flex flex-col justify-center px-[8%] md:px-[10%]">
            <ChapterHeading index="11" eyebrow="ATURAN & TANGGUNG JAWAB" title={<>Aturan main.</>} />
            <div className="mt-6 max-h-[46vh] overflow-hidden"><RuleList items={pkl.rules} /></div>
          </div>
        </CameraWorld>
      )}

      {/* TEMPAT — push; stub jujur bila kosong */}
      <CameraWorld id="pkl-tempat" label="Tempat PKL" durationVh={25}
        moves={[
          { pose: { scale: 1, yPercent: 4 }, focus: ["p"], dur: 1 },
          { pose: { scale: 1.5, yPercent: -4 }, focus: ["p"], dur: 1 },
        ]}>
        <div data-f="p" className="absolute inset-0 flex flex-col justify-center px-[8%] md:px-[10%]">
          <ChapterHeading index="12" eyebrow="TEMPAT SAYA BELAJAR" title={<>Tempat PKL</>} />
          {pkl.company ? (
            <div className="panel mt-6 grid gap-5 p-6 md:grid-cols-2">
              <div>
                <p className="font-display text-2xl font-extrabold">{pkl.company}</p>
                <p className="body-muted mt-2 text-sm">{pkl.company_profile}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pkl.division && <span className="chip">{pkl.division}</span>}
                  {pkl.address && <span className="chip">{pkl.address}</span>}
                </div>
              </div>
              <CinematicFrame label={pkl.company} ratio="4/3" />
            </div>
          ) : (
            <p className="body-muted mt-6 max-w-md border-l-2 border-accent pl-4">
              Masih dalam proses — detail tempat belajar akan diisi melalui CMS.
            </p>
          )}
        </div>
      </CameraWorld>

      {/* PEOPLE — pan (omit bila kosong) */}
      {pkl.people.length > 0 && (
        <CameraWorld id="pkl-people" label="Pimpinan dan Pembimbing" durationVh={25}
          moves={[
            { pose: { scale: 1, xPercent: 5 }, focus: ["w1"], dur: 1 },
            { pose: { scale: 1.2, xPercent: -5 }, focus: ["w2"], dur: 1 },
          ]}>
          <div className="absolute inset-0 flex flex-col justify-center px-[8%] md:px-[10%]">
            <div data-f="w1"><ChapterHeading index="13" eyebrow="ORANG-ORANG DI BALIKNYA" title={<>Pimpinan & pembimbing.</>} /></div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {pkl.people.map((p, i) => (
                <li key={p.name} data-f={i < half(pkl.people) ? "w1" : "w2"} className="panel p-5 text-center">
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
        </CameraWorld>
      )}

      {/* RUTINITAS — waktu menggerakkan kamera + komposisi */}
      {pkl.routine.length > 0 && (
        <CameraWorld id="pkl-hari" label="Hari-hari Saya" durationVh={30}
          moves={[
            { pose: { scale: 1.3 }, focus: ["morn"], dur: 1 },
            { pose: { scale: 1.5 }, focus: ["mid"], dur: 1 },
            { pose: { scale: 1.1 }, focus: ["eve", "cap"], dur: 1 },
          ]}
          onProgress={driveTime}>
          <p ref={timeRef} aria-hidden data-depth={0.2}
            className="font-display absolute left-1/2 top-[8%] -translate-x-1/2 text-[22vw] font-black tabular-nums leading-none text-white/[0.07] md:text-[14vw]">
            {pkl.routine[0].time}
          </p>
          <div className="absolute inset-x-[8%] top-[34%] md:inset-x-[10%]">
            <p data-f="cap" className="chapter-label">14 / SEHARI DI SANA — scroll mengendalikan waktu</p>
            <ol className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {pkl.routine.map((r, i) => (
                <li key={r.time} data-f={i < 2 ? "morn" : i < 4 ? "mid" : "eve"} className="panel relative p-4">
                  <p className="font-mono text-sm text-accent">{r.time}</p>
                  <p className="font-display mt-1 text-sm font-bold">{r.label}</p>
                  <p className="mt-1 text-xs text-muted">{r.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </CameraWorld>
      )}

      {/* AKTIVITAS — pan horizontal sinematik */}
      {pkl.activities.length > 0 && (
        <CameraWorld id="pkl-aktivitas" label="Aktivitas PKL" durationVh={30}
          moves={[
            { pose: { scale: 1, xPercent: 0 }, focus: ["h", "a0"], dur: 1 },
            { pose: { scale: 1.15, xPercent: -22 }, focus: ["a1"], dur: 1.2 },
          ]}>
          <div data-f="h" className="absolute left-[8%] top-[10%] max-w-md md:left-[10%]">
            <ChapterHeading index="15" eyebrow="AKTIVITAS" title={<>Aktivitas.</>} lede="Kamera bergeser menyusuri galeri." />
          </div>
          <div className="absolute top-[38%] flex w-[190%] gap-4 pl-[8%] md:w-[140%] md:pl-[10%]">
            {pkl.activities.map((a, i) => (
              <article key={a.title} data-f={i === 0 ? "a0" : "a1"} className="panel w-72 shrink-0 p-5 md:w-96">
                <p className="chip">{a.tag}</p>
                <h3 className="font-display mt-3 text-lg font-bold md:text-2xl">{a.title}</h3>
                <p className="body-muted mt-2 text-sm">{a.body}</p>
              </article>
            ))}
          </div>
        </CameraWorld>
      )}

      {/* TANTANGAN — push ke solusi */}
      {pkl.challenges.length > 0 && (
        <CameraWorld id="pkl-tantangan" label="Problem ke Solution" durationVh={25}
          moves={[
            { pose: { scale: 1 }, focus: ["c0"], dur: 1 },
            { pose: { scale: 1.4 }, focus: ["c1"], dur: 1 },
          ]}>
          <div className="absolute inset-0 flex flex-col justify-center px-[8%] md:px-[10%]">
            <div data-f="c0"><ChapterHeading index="16" eyebrow="PROBLEM → SOLUTION" title={<>Masalah → proses → solusi.</>} /></div>
            <div className="mt-6 space-y-3">
              {pkl.challenges.slice(0, 2).map((c, i) => (
                <div key={c.problem} data-f={i === 0 ? "c0" : "c1"} className="panel grid gap-3 p-5 md:grid-cols-3">
                  <div><p className="chapter-label">PROBLEM</p><p className="font-display mt-2 font-bold">{c.problem}</p></div>
                  <div><p className="chapter-label">INVESTIGATE</p><p className="body-muted mt-2 text-sm">{c.investigate}</p></div>
                  <div><p className="chapter-label">SOLUTION</p><p className="mt-2 text-sm">{c.solution}</p></div>
                </div>
              ))}
            </div>
          </div>
        </CameraWorld>
      )}
    </div>
  );
}
