"use client";

import { CameraWorld } from "@/components/camera/CameraWorld";
import { PhotoBackdrop } from "@/components/media/PhotoBackdrop";
import { useContent } from "@/components/story/StoryProvider";
import { normalizePkl } from "@/data/content";

/**
 * CLOSING — kamera melambat, depth menyusut, tipografi dominan.
 * Ending: pullback + memory convergence (fragmen tech/project/node kembali),
 * garis proses menyusut ke satu titik — cerminan opening. POINT→…→POINT.
 */
export function ClosingChapter() {
  const { pkl: raw, site, tech, projects } = useContent();
  const pkl = normalizePkl(raw);
  const memTech = tech.filter((t) => t.in_field).slice(0, 5);

  return (
    <>
      <CameraWorld id="pelajaran" label="Lessons Learned" durationVh={25}
        moves={[
          { pose: { scale: 1 }, focus: ["l0"], dur: 1 },
          { pose: { scale: 1.2 }, focus: ["l1"], dur: 1 },
        ]}>
        <div className="absolute inset-0 flex flex-col justify-center px-[8%] md:px-[12%]">
          <p data-f="l0" className="chapter-label">18 / APA YANG SAYA PELAJARI</p>
          <ul className="mt-6 max-w-3xl space-y-5">
            {pkl.lessons.slice(0, 3).map((l, i) => (
              <li key={l} data-f={i < 2 ? "l0" : "l1"}>
                <p className="chapter-label">INSIGHT 0{i + 1}</p>
                <p className="body-lead mt-1">{l}</p>
              </li>
            ))}
          </ul>
        </div>
      </CameraWorld>

      <CameraWorld id="tumbuh" label="Growth" durationVh={30}
        moves={[
          { pose: { scale: 1.1, yPercent: 6 }, focus: ["b"], dur: 1 },
          { pose: { scale: 1.1, yPercent: -2 }, focus: ["d"], dur: 1 },
          { pose: { scale: 1.1, yPercent: -10 }, focus: ["a"], dur: 1 },
        ]}>
        <p data-depth={0.3} className="chapter-label absolute left-[8%] top-[10%] md:left-[12%]">19 / PERUBAHAN DIRI</p>
        {[
          { f: "b", t: "Dulu", d: pkl.growth.before, top: "22%" },
          { f: "d", t: "Selama", d: pkl.growth.during, top: "46%" },
          { f: "a", t: "Sekarang", d: pkl.growth.after, top: "70%" },
        ].filter((g) => g.d).map((g) => (
          <div key={g.t} data-f={g.f} data-depth={0.6} className="absolute left-[8%] max-w-2xl md:left-[12%]" style={{ top: g.top }}>
            <p className="chapter-label">{g.t.toUpperCase()}</p>
            <p className="body-lead mt-1">{g.d}</p>
          </div>
        ))}
      </CameraWorld>

      <CameraWorld id="kembali" label="Kembali ke Dalam Proses" durationVh={25}
        moves={[{ pose: { scale: 1.15 }, focus: ["k"], dur: 1 }]}>
        <div data-f="k" className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="chapter-label">20 / KEMBALI KE ‘DALAM PROSES’</p>
          <h2 className="font-display mt-6 max-w-3xl text-4xl font-extrabold uppercase md:text-6xl">
            Ternyata ini belum selesai.
          </h2>
          <p className="body-muted mx-auto mt-6 max-w-xl">Dan mungkin memang tidak pernah. Karena belajar tidak selesai ketika PKL berakhir.</p>
        </div>
      </CameraWorld>

      <CameraWorld id="masa-depan" label="Masa Depan" durationVh={25}
        moves={[
          { pose: { scale: 1 }, focus: ["m"], dur: 1 },
          { pose: { scale: 1.4 }, focus: ["m"], dur: 1 },
        ]}>
        <PhotoBackdrop kind="mountains" opacity={0.9} />
        <div data-f="m" className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="eyebrow">08 / FINAL STATEMENT</p>
          <p className="body-lead mt-4">Saya masih ingin belajar, membangun, mencoba.</p>
          <h2 className="display-xl mt-4">Better digital<br />experiences.</h2>
        </div>
      </CameraWorld>

      <CameraWorld id="ending" label="Ending" durationVh={30}
        moves={[
          { pose: { scale: 1.5 }, focus: ["mem"], dur: 1 },
          { pose: { scale: 1.1 }, focus: ["rezza"], dur: 1.2 },
          { pose: { scale: 0.55 }, focus: ["point"], dur: 1 },
        ]}>
        {/* MEMORY — fragmen perjalanan kembali */}
        <div data-f="mem" data-depth={0.5} className="absolute inset-0" aria-hidden>
          {memTech.map((t, i) => (
            <span key={t.id} className="chip absolute text-[10px]"
              style={{ left: `${8 + ((i * 41) % 78)}%`, top: `${12 + ((i * 53) % 70)}%` }}>{t.name}</span>
          ))}
          {projects.slice(0, 3).map((p, i) => (
            <span key={p.id} className="chapter-label absolute" style={{ left: `${14 + ((i * 47) % 66)}%`, top: `${22 + ((i * 61) % 60)}%` }}>
              {p.title}
            </span>
          ))}
        </div>
        <div data-f="rezza" className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="chapter-label">22 / ENDING</p>
          <h2 className="font-display mt-4 text-6xl font-extrabold uppercase tracking-tight md:text-8xl">REZZA</h2>
          <p className="chapter-label mt-3">AI ENGINEER · BUILDER · PROBLEM SOLVER</p>
        </div>
        <div data-f="point" data-static-hide className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-2.5 w-2.5 rounded-full bg-cream" aria-hidden style={{ boxShadow: "0 0 40px 10px rgba(245,241,234,.3)" }} />
        </div>
      </CameraWorld>

      {/* KONTAK (ref1 #09 + ref2 #25) — kartu Get in Touch + monogram */}
      <section id="kontak" aria-label="Contact" className="relative overflow-hidden px-5 pb-28 pt-24 md:px-8">
        <PhotoBackdrop kind="mountains" opacity={0.35} />
        <div className="relative mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:text-left text-center items-center">
          <div>
            <p className="eyebrow">09 / CONTACT — ENDING</p>
            <h2 className="font-display mt-4 text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">
              Let&rsquo;s<br />Build<br />Something<br />Great
            </h2>
            <p className="monogram mt-6 text-sm text-cream/80">RZ</p>
          </div>
          <div className="glass p-6 text-left">
            <p className="eyebrow">Get in Touch</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                <span className="text-muted">Email</span>
                <a href={`mailto:${site.contact_email}`} className="hover:text-cream">{site.contact_email}</a>
              </li>
              {site.socials.map((s) => (
                <li key={s.label} className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <span className="text-muted">{s.label}</span>
                  <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-cream">{s.href.replace("https://", "")} ↗</a>
                </li>
              ))}
            </ul>
            <a href={`mailto:${site.contact_email}`} className="mt-5 inline-block rounded-full border border-white/25 px-6 py-2.5 text-xs font-semibold tracking-[0.2em] hover:bg-cream hover:text-black">
              CONTACT ME →
            </a>
          </div>
        </div>
        <p className="eyebrow relative mt-14 text-center">TERIMA KASIH SUDAH MENGIKUTI PERJALANAN INI · © 2026</p>
        <p className="monogram relative mt-3 text-center text-[10px] text-faint">REZZA — MASIH DALAM PROSES</p>
      </section>
    </>
  );
}
