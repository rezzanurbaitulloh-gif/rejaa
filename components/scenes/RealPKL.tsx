"use client";

import MemoryPhoto from "@/components/media/MemoryPhoto";
import { DAILY_ROUTINE, PKL } from "@/data/content";

/**
 * PHASE 08 — Digital → Real World (transition fisik) + PKL (real data only).
 * Missing data = CMS empty state, bukan fakta buatan.
 */
function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-none border border-dashed border-white/20 bg-white/[0.02] p-5">
      <p className="text-[11px] tracking-[0.24em] text-white/40 uppercase">CMS · {label}</p>
      <p className="mt-2 text-sm text-white/55">
        Belum diisi — hubungkan Supabase untuk menampilkan {label.toLowerCase()} yang nyata.
      </p>
    </div>
  );
}

export default function RealPKL() {
  return (
    <>
      <section data-scene="transition" className="scene-travel-short" aria-label="Transisi ke dunia nyata">
        <div className="sticky-stage items-center text-center">
          <div className="relative z-20 mx-auto w-[min(720px,92vw)]">
            <p className="eyebrow reveal">Transisi fisik — cosmic pull-back</p>
            <h2 className="display-mega reveal mt-6 text-[clamp(48px,10vw,150px)]">Dunia nyata</h2>
            <p className="narrative-serif reveal mt-4 text-[clamp(20px,3vw,36px)] text-white/80">
              Praktik Kerja Lapangan
            </p>
            <div className="reveal mx-auto mt-8 h-16 w-px bg-gradient-to-b from-white/70 to-transparent" aria-hidden />
          </div>
        </div>
      </section>

      <section data-scene="pkl" className="scene-travel" aria-label="PKL">
        <div className="sticky-stage">
          <div className="safe-text">
            <p className="eyebrow reveal">Real-world chapter — kamera memasuki kenyataan</p>
            <h2 className="display-section reveal mt-6">
              Praktik,
              <br />
              bukan teori.
            </h2>
            <p className="body-editorial reveal mt-6">{PKL.note}</p>
          </div>

          <div className="relative z-20 mx-auto mt-10 grid w-[min(1120px,94vw)] gap-8 lg:grid-cols-2">
            <MemoryPhoto
              src="/memory/memory-desk.jpg"
              alt="Suasana meja kerja — foto memori atmosfer (ganti via CMS)"
              caption="Memori atmosfer — ganti foto nyata via CMS"
              credit="Lorem Picsum / Unsplash"
            />
            <MemoryPhoto
              src="/memory/workspace-1.jpg"
              alt="Ruang kerja dengan laptop — foto memori (ganti via CMS)"
              caption="Rutina harian — dokumentasi nyata via CMS"
              credit="Unsplash"
            />
          </div>

          <div className="relative z-20 mx-auto mt-10 w-[min(1120px,94vw)]">
            <h3 className="text-[11px] tracking-[0.3em] text-white/45 uppercase">Rutinitas harian — kamera mengikuti waktu</h3>
            <ol className="mt-4 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
              {DAILY_ROUTINE.map((d) => (
                <li key={d.time} className="reveal bg-[#050607]/90 p-4" data-cursor="view">
                  <p className="font-mono text-lg text-[#8ea2ff]">{d.time}</p>
                  <p className="mt-1 text-sm text-white/80">{d.label}</p>
                  <p className="mt-1 text-[11px] text-white/35">{d.pace}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {PKL.company ? <p>{PKL.company}</p> : <EmptyState label="Tempat PKL" />}
              {PKL.activities.length ? <p>{PKL.activities.join(", ")}</p> : <EmptyState label="Aktivitas & pekerjaan" />}
              {PKL.lessons.length ? <p>{PKL.lessons.join(", ")}</p> : <EmptyState label="Pelajaran & pertumbuhan" />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
