"use client";

import { CameraWorld } from "@/components/camera/CameraWorld";
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
      <CameraWorld id="pelajaran" label="Lessons Learned" durationVh={45}
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

      <CameraWorld id="tumbuh" label="Growth" durationVh={60}
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

      <CameraWorld id="kembali" label="Kembali ke Dalam Proses" durationVh={30}
        moves={[{ pose: { scale: 1.15 }, focus: ["k"], dur: 1 }]}>
        <div data-f="k" className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="chapter-label">20 / KEMBALI KE ‘DALAM PROSES’</p>
          <h2 className="font-display mt-6 max-w-3xl text-4xl font-extrabold uppercase md:text-6xl">
            Ternyata ini belum selesai.
          </h2>
          <p className="body-muted mx-auto mt-6 max-w-xl">Dan mungkin memang tidak pernah. Karena belajar tidak selesai ketika PKL berakhir.</p>
        </div>
      </CameraWorld>

      <CameraWorld id="masa-depan" label="Masa Depan" durationVh={45}
        moves={[
          { pose: { scale: 1 }, focus: ["m"], dur: 1 },
          { pose: { scale: 1.4 }, focus: ["m"], dur: 1 },
        ]}>
        <div data-f="m" className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="chapter-label">21 / MASA DEPAN</p>
          <p className="body-lead mt-4">Saya masih ingin belajar, membangun, mencoba.</p>
          <h2 className="display-xl mt-4">Masih dalam proses.</h2>
        </div>
      </CameraWorld>

      <CameraWorld id="ending" label="Ending" durationVh={60}
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

      {/* KONTAK — aliran normal, tanpa pin: cerita sudah kembali ke titik */}
      <section id="kontak" aria-label="Contact" className="relative px-5 pb-24 pt-24 text-center md:px-8">
        <p className="chapter-label">23 / KONTAK</p>
        <h2 className="font-display mt-4 text-3xl font-extrabold uppercase md:text-5xl">Mari membangun sesuatu.</h2>
        <a href={`mailto:${site.contact_email}`} className="mt-6 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white">
          {site.contact_email}
        </a>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="chip hover:text-cream">{s.label} ↗</a>
          ))}
        </div>
        <p className="chapter-label mt-10">© 2026 · DALAM PROSES · Dari ide, menjadi sesuatu yang nyata.</p>
      </section>
    </>
  );
}
