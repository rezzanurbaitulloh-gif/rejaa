"use client";

import { Scene } from "@/components/camera/Scene";
import { ChapterHeading } from "./ui";
import { useContent } from "@/components/story/StoryProvider";

/** CLOSING — lessons, growth, kembali, future, ending, contact. */
export function ClosingChapter() {
  const { pkl, site } = useContent();

  return (
    <>
      <Scene id="pelajaran" label="Lessons Learned" preset="zoom-out" node={6} className="scene-editorial">
        <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
          <ChapterHeading index="18" eyebrow="APA YANG SAYA PELAJARI" title={<>Skill tree.</>} lede="Insight tree: pelajaran yang bercabang dari pengalaman." />
          <ul className="mt-8 grid gap-3 md:grid-cols-3">
            {pkl.lessons.map((l, i) => (
              <li key={l} className="panel p-5" data-reveal>
                <p className="chapter-label">INSIGHT 0{i + 1}</p>
                <p className="mt-2 leading-relaxed">{l}</p>
              </li>
            ))}
          </ul>
        </div>
      </Scene>

      <Scene id="tumbuh" label="Growth" preset="pan" node={6} className="scene-editorial">
        <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
          <ChapterHeading index="19" eyebrow="PERUBAHAN DIRI" title={<>Dulu → sekarang.</>} />
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              { t: "DULU", d: pkl.growth.before },
              { t: "SELAMA", d: pkl.growth.during },
              { t: "SEKARANG", d: pkl.growth.after },
            ].map((g) => (
              <div key={g.t} className="panel p-6" data-reveal>
                <p className="chapter-label">{g.t}</p>
                <p className="body-lead mt-3">{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      <Scene id="kembali" label="Kembali ke Dalam Proses" preset="hold" className="scene-cinematic flex items-center">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8" data-exit>
          <p className="chapter-label" data-reveal>20 / KEMBALI KE ‘DALAM PROSES’</p>
          <h2 className="font-display mt-6 text-4xl font-extrabold uppercase md:text-6xl" data-reveal>
            Ternyata ini belum selesai.
          </h2>
          <p className="body-muted mx-auto mt-6 max-w-xl" data-reveal>
            Dan mungkin memang tidak pernah. Karena belajar tidak selesai ketika PKL berakhir.
          </p>
        </div>
      </Scene>

      <Scene id="masa-depan" label="Masa Depan" preset="zoom-out" node={7} className="scene-cinematic flex items-center">
        <div className="mx-auto max-w-6xl px-5 text-center md:px-8" data-exit>
          <p className="chapter-label" data-reveal>21 / MASA DEPAN</p>
          <p className="body-lead mt-4" data-reveal>Saya masih ingin belajar, membangun, mencoba.</p>
          <h2 className="display-xl mt-4" data-reveal>Masih dalam proses.</h2>
        </div>
      </Scene>

      <Scene id="ending" label="Ending" preset="blur-focus" node={7} className="scene-cinematic flex items-center">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8" data-exit>
          <p className="chapter-label" data-reveal>22 / ENDING</p>
          <h2 className="font-display mt-6 text-5xl font-extrabold uppercase tracking-tight md:text-7xl" data-reveal>
            REZZA
          </h2>
          <p className="chapter-label mt-3" data-reveal>AI ENGINEER · BUILDER · PROBLEM SOLVER</p>
          <p className="body-muted mx-auto mt-6 max-w-md" data-reveal>
            Terima kasih sudah mengikuti perjalanan ini. Fragmen process line di sisi
            layar adalah journey yang sama dari opening — kini membentuk identitas.
          </p>
        </div>
      </Scene>

      <Scene id="kontak" label="Contact" preset="establish" className="scene-editorial">
        <div className="mx-auto max-w-4xl px-5 pb-24 text-center md:px-8" data-exit>
          <p className="chapter-label" data-reveal>23 / KONTAK</p>
          <h2 className="font-display mt-4 text-3xl font-extrabold uppercase md:text-5xl" data-reveal>
            Mari membangun sesuatu.
          </h2>
          <a
            href={`mailto:${site.contact_email}`}
            className="mt-6 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white"
            data-reveal
          >
            {site.contact_email}
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-2" data-reveal>
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="chip hover:text-cream">
                {s.label} ↗
              </a>
            ))}
          </div>
          <p className="chapter-label mt-10" data-reveal>© 2026 · DALAM PROSES · Dari ide, menjadi sesuatu yang nyata.</p>
        </div>
      </Scene>
    </>
  );
}
