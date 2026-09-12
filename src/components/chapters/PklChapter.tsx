"use client";

import { useRef } from "react";
import Link from "next/link";
import { CameraWorld } from "@/components/camera/CameraWorld";
import { PhotoBackdrop } from "@/components/media/PhotoBackdrop";
import { ChapterHeading, RuleList } from "./ui";
import { PhotoPanel } from "@/components/media/PhotoPanel";
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
      <CameraWorld id="pkl-intro" label="PKL Intro" durationVh={180}
        moves={[
          { pose: { scale: 1.0 }, focus: ["t"], dur: 1 },
          { pose: { scale: 1.84 }, focus: ["t"], dur: 1.2 },
          { pose: { scale: 2.4 }, focus: [], dur: 0.8 },
        ]}>
        <PhotoBackdrop kind="workspace" opacity={0.55} />
        <div data-f="t" className="absolute inset-0 grid items-center gap-6 px-[8%] md:grid-cols-2 md:px-[10%]">
          <div className="text-left">
            <p className="chapter-label">09 / SEBUAH PENGALAMAN</p>
            <h2 className="display-xl mt-4">PRAKTIK<br />KERJA<br />LAPANGAN</h2>
            <p className="body-lead mt-6">(PKL) — chapter di mana teori bertemu dunia nyata.</p>
          </div>
          <div className="hidden md:block">
            <PhotoPanel kind="office" label="Ruang kerja tempat PKL" ratio="4/3" caption="Lingkungan kerja yang dipelajari dari dalam." />
          </div>
        </div>
      </CameraWorld>

      {/* APA ITU PKL — pan */}
      <CameraWorld id="pkl-apa" label="Apa itu PKL" durationVh={150}
        moves={[
          { pose: { scale: 1.0, xPercent: 4.2 }, focus: ["a"], dur: 1 },
          { pose: { scale: 1.21, xPercent: -4.2 }, focus: ["b"], dur: 1 },
        ]}>
        <div data-f="a" data-depth={0.6} className="absolute left-[8%] top-[20%] max-w-xl md:left-[10%]">
          <ChapterHeading index="10" eyebrow="APA ITU PKL" title={<>PKL</>}
            lede="Praktik Kerja Lapangan: proses pembelajaran yang membawa siswa mengenal lingkungan kerja secara langsung." />
        </div>
        <div data-f="b" data-depth={0.7} className="absolute bottom-[10%] right-[8%] w-[80%] md:right-[10%] md:w-[36%]">
          <PhotoPanel kind="video" label="Dokumentasi lapangan" caption="Praktik Kerja Lapangan merupakan proses pembelajaran yang membawa siswa untuk mengenal lingkungan kerja secara langsung. Lihat dokumentasi →" />
        </div>
      </CameraWorld>

      {/* TUJUAN — push, fokus berpasangan + foto server */}
      {pkl.goals.length > 0 && (
        <CameraWorld id="pkl-tujuan" label="Tujuan PKL" durationVh={160}
          moves={[
            { pose: { scale: 1 }, focus: ["g1"], dur: 1 },
            { pose: { scale: 1.21 }, focus: ["g2"], dur: 1 },
          ]}>
          <div className="absolute inset-0 grid items-center gap-6 px-[8%] md:grid-cols-2 md:px-[10%]">
            <div>
              <p data-f="g1" className="chapter-label">11 / TUJUAN PKL</p>
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
            <div data-f="g2">
              <PhotoPanel kind="server" label="Infrastruktur tempat belajar" ratio="4/3" caption="Lingkungan kerja yang dipelajari dari dalam." />
            </div>
          </div>
        </CameraWorld>
      )}

      {/* ATURAN — slow push hold */}
      {pkl.rules.length > 0 && (
        <CameraWorld id="pkl-aturan" label="Aturan dan Tanggung Jawab" durationVh={140}
          moves={[
            { pose: { scale: 1.0 }, focus: ["r"], dur: 1 },
            { pose: { scale: 1.1 }, focus: ["r"], dur: 1 },
          ]}>
          <div data-f="r" className="absolute inset-0 flex flex-col justify-center px-[8%] md:px-[10%]">
            <ChapterHeading index="12" eyebrow="ATURAN & TANGGUNG JAWAB" title={<>Aturan main.</>} />
            <div className="mt-6 max-h-[46vh] overflow-hidden"><RuleList items={pkl.rules} /></div>
          </div>
        </CameraWorld>
      )}

      {/* TEMPAT — push; stub jujur bila kosong */}
      <CameraWorld id="pkl-tempat" label="Tempat PKL" durationVh={150}
        moves={[
          { pose: { scale: 1.0, yPercent: 2.8 }, focus: ["p"], dur: 1 },
          { pose: { scale: 1.35, yPercent: -2.8 }, focus: ["p"], dur: 1 },
        ]}>
        <div data-f="p" className="absolute inset-0 flex flex-col justify-center px-[8%] md:px-[10%]">
          <ChapterHeading index="13" eyebrow="TEMPAT SAYA BELAJAR" title={<>Tempat PKL</>} />
          {pkl.company ? (
            <div className="panel mt-6 grid gap-5 p-6 md:grid-cols-2">
              <div>
                <p className="font-display text-2xl font-extrabold">{pkl.company}</p>
                <p className="body-muted mt-2 text-sm">{pkl.company_profile}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pkl.division && <span className="chip">{pkl.division}</span>}
                  {pkl.address && <span className="chip">{pkl.address}</span>}
                </div>
                <span className="mt-5 inline-block rounded-full border border-white/25 px-5 py-2 text-[11px] tracking-[0.18em]">LIHAT LOKASI</span>
              </div>
              <div>
                <PhotoPanel kind="office" label={`Gedung ${pkl.company}`} ratio="4/3" />
                <div className="mt-3 grid grid-cols-3 gap-2" aria-hidden>
                  <PhotoPanel kind="meeting" label="Ruang diskusi" ratio="4/3" />
                  <PhotoPanel kind="desk" label="Meja kerja" ratio="4/3" />
                  <PhotoPanel kind="server" label="Ruang teknis" ratio="4/3" />
                </div>
              </div>
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
        <CameraWorld id="pkl-people" label="Pimpinan dan Pembimbing" durationVh={160}
          moves={[
            { pose: { scale: 1.0, xPercent: 3.5 }, focus: ["w1"], dur: 1 },
            { pose: { scale: 1.14, xPercent: -3.5 }, focus: ["w2"], dur: 1 },
          ]}>
          <div className="absolute inset-0 flex flex-col justify-center px-[8%] md:px-[10%]">
            <div data-f="w1"><ChapterHeading index="14" eyebrow="ORANG-ORANG DI BALIKNYA" title={<>Pimpinan & pembimbing.</>} /></div>
            {/* Org chart: pimpinan di atas, dua pembimbing di bawah */}
            <div className="mt-5" data-f="w1">
              {pkl.people.slice(0, 1).map((p) => (
                <div key={p.name} className="mx-auto w-fit max-w-xs text-center">
                  <div className="glass mx-auto flex h-16 w-16 items-center justify-center rounded-full font-display text-xl font-extrabold" aria-hidden>
                    {p.name.charAt(0)}
                  </div>
                  <p className="font-display mt-2 text-sm font-bold">{p.name}</p>
                  <p className="chapter-label mt-1">{p.role}</p>
                </div>
              ))}
              <div className="mx-auto my-2 h-6 w-px bg-white/25" aria-hidden />
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {pkl.people.slice(1).map((p) => (
                <li key={p.name} data-f="w2" className="glass p-4 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 font-display font-extrabold" aria-hidden>
                    {p.name.charAt(0)}
                  </div>
                  <p className="font-display mt-2 text-sm font-bold">{p.name}</p>
                  <p className="chapter-label mt-1">{p.role}</p>
                  <p className="body-muted mt-1 text-xs">{p.note}</p>
                </li>
              ))}
              {pkl.people.length === 1 && (
                <li data-f="w2" className="glass flex items-center justify-center p-4 text-xs text-muted">
                  Struktur lengkap dikelola via CMS.
                </li>
              )}
            </ul>
          </div>
        </CameraWorld>
      )}

      {/* RUTINITAS — waktu menggerakkan kamera + komposisi */}
      {pkl.routine.length > 0 && (
        <CameraWorld id="pkl-hari" label="Hari-hari Saya" durationVh={240}
          moves={[
            { pose: { scale: 1.21 }, focus: ["morn"], dur: 1 },
            { pose: { scale: 1.35 }, focus: ["mid"], dur: 1 },
            { pose: { scale: 1.07 }, focus: ["eve", "cap"], dur: 1 },
          ]}
          onProgress={driveTime}>
          <p ref={timeRef} aria-hidden data-depth={0.2}
            className="font-display absolute left-1/2 top-[8%] -translate-x-1/2 text-[22vw] font-black tabular-nums leading-none text-white/[0.07] md:text-[14vw]">
            {pkl.routine[0].time}
          </p>
          <div className="absolute inset-x-[8%] top-[34%] md:inset-x-[10%]">
            <p data-f="cap" className="chapter-label">15 / SEHARI DI SANA — scroll mengendalikan waktu</p>
            <h2 data-f="cap" className="font-display mt-3 text-3xl font-extrabold uppercase md:text-5xl">Sehari di sana.</h2>
            {/* Timeline horizontal ala ref frame 15 */}
            <ol className="relative mt-8 flex gap-2 overflow-x-auto pb-2 md:gap-4">
              <span aria-hidden className="absolute left-0 right-0 top-[7px] h-px bg-white/20" />
              {pkl.routine.map((r, i) => (
                <li key={r.time} data-f={i < 2 ? "morn" : i < 4 ? "mid" : "eve"} className="relative min-w-[118px] flex-1 pt-6">
                  <span aria-hidden className="absolute left-0 top-[3px] h-2.5 w-2.5 rounded-full bg-accent" style={{ boxShadow: "0 0 12px 1px rgba(43,92,255,.6)" }} />
                  <p className="font-mono text-sm text-cream">{r.time}</p>
                  <p className="font-display mt-1 text-sm font-bold">{r.label}</p>
                  <p className="mt-1 hidden text-[11px] text-muted md:block">{r.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </CameraWorld>
      )}

      {/* AKTIVITAS — pan horizontal sinematik */}
      {pkl.activities.length > 0 && (
        <CameraWorld id="pkl-aktivitas" label="Aktivitas PKL" durationVh={200}
          moves={[
            { pose: { scale: 1.0, xPercent: 0.0 }, focus: ["h", "a0"], dur: 1 },
            { pose: { scale: 1.1, xPercent: -15.4 }, focus: ["a1"], dur: 1.2 },
          ]}>
          <div data-f="h" className="absolute left-[8%] top-[10%] max-w-md md:left-[10%]">
            <ChapterHeading index="16" eyebrow="AKTIVITAS" title={<>Aktivitas.</>} lede="Mempelajari sistem kerja — memahami operasional, alur kerja, dan bagaimana pekerjaan dilakukan langsung di lapangan." />
          </div>
          <div className="absolute top-[38%] flex w-[190%] gap-4 pl-[8%] md:w-[140%] md:pl-[10%]">
            {pkl.activities.map((a, i) => (
              <article key={a.title} data-f={i === 0 ? "a0" : "a1"} className="w-72 shrink-0 md:w-96">
                <PhotoPanel kind={i % 3 === 0 ? "office" : i % 3 === 1 ? "meeting" : "desk"} label={a.title} ratio="16/9" />
                <p className="chip mt-3">{a.tag}</p>
                <h3 className="font-display mt-2 text-lg font-bold">{a.title}</h3>
                <p className="body-muted mt-1 text-sm">{a.body}</p>
              </article>
            ))}
          </div>
        </CameraWorld>
      )}

      {/* PROJECT PKL — frame 17: Sistem Operasional Catering + laptop */}
      <CameraWorld id="pkl-project" label="Project PKL" durationVh={150}
        moves={[
          { pose: { scale: 1.0, xPercent: 4.2 }, focus: ["j"], dur: 1 },
          { pose: { scale: 1.21, xPercent: -4.2 }, focus: ["j2"], dur: 1 },
        ]}>
        <div className="absolute inset-0 grid items-center gap-6 px-[8%] md:grid-cols-2 md:px-[10%]">
          <div data-f="j">
            <p className="chapter-label">17 / PEKERJAAN — PROJECT 01</p>
            <h2 className="font-display mt-4 text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">Sistem Operasional Catering</h2>
            <p className="body-lead mt-4">Saya membantu merancang sistem operasional catering, mulai dari customer hingga admin.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Web-App", "UI/UX", "Database"].map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
            <Link href="/work/catering-os" className="mt-6 inline-block rounded-full bg-cream px-6 py-3 text-xs font-semibold tracking-[0.2em] text-black">
              LIHAT DETAIL →
            </Link>
          </div>
          <div data-f="j2" data-depth={0.6}>
            <span className="device-laptop block">
              <span className="screen block p-3">
                <span className="flex gap-1.5" aria-hidden>
                  <i className="h-2 w-2 rounded-full bg-white/25" />
                  <i className="h-2 w-2 rounded-full bg-white/25" />
                  <i className="h-2 w-2 rounded-full bg-accent/80" />
                </span>
                <span className="font-display mt-3 block text-sm font-extrabold uppercase">Catering OS</span>
                <span className="mt-2 block h-28 rounded-md" aria-hidden
                  style={{ background: "linear-gradient(120deg, rgba(43,92,255,0.5), rgba(245,241,234,0.12))" }} />
                <span className="mt-2 block space-y-1.5" aria-hidden>
                  <i className="block h-1 rounded bg-white/25" />
                  <i className="block h-1 w-2/3 rounded bg-white/15" />
                </span>
              </span>
            </span>
            <span className="device-base block" aria-hidden />
          </div>
        </div>
      </CameraWorld>

      {/* TANTANGAN — frame 18: pipeline horizontal + detail CMS */}
      {pkl.challenges.length > 0 && (
        <CameraWorld id="pkl-tantangan" label="Problem ke Solution" durationVh={170}
          moves={[
            { pose: { scale: 1.0 }, focus: ["c0"], dur: 1 },
            { pose: { scale: 1.28 }, focus: ["c1"], dur: 1 },
          ]}>
          <div className="absolute inset-0 flex flex-col justify-center px-[8%] md:px-[10%]">
            <div data-f="c0"><ChapterHeading index="18" eyebrow="PROBLEM → SOLUTION" title={<>Masalah → proses → solusi.</>} /></div>
            {/* Pipeline ala ref frame 18 */}
            <ol data-f="c0" className="relative mt-6 flex gap-1 overflow-x-auto pb-1" aria-label="Alur problem ke solution">
              <span aria-hidden className="absolute left-0 right-0 top-[19px] h-px bg-white/20" />
              {["Masalah yang ditemukan", "Observe", "Think", "Design", "Mulai membuat", "Mencoba & evaluasi", "Result"].map((s) => (
                <li key={s} className="relative min-w-[96px] flex-1 pt-10 text-center">
                  <span aria-hidden className="absolute left-1/2 top-[12px] flex h-[15px] w-[15px] -translate-x-1/2 items-center justify-center rounded-full border border-accent/70 bg-ink">
                    <i className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <p className="text-[11px] leading-tight text-muted">{s}</p>
                </li>
              ))}
            </ol>
            <div className="mt-5 space-y-3">
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
