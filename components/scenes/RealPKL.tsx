"use client";

import MemoryPhoto from "@/components/media/MemoryPhoto";
import { DAILY_ROUTINE, PKL } from "@/data/content";

/**
 * §15 Digital → Real World (transition fisik: pull back → point → follow →
 * expand → photograph) + §16 PKL (real data only).
 * Definitional content (apa/tujuan/aturan) is general knowledge, written
 * editorially. Company/people/work facts stay CMS empty-states — never faked.
 */
function EmptyState({ label }: { label: string }) {
  return (
    <div className="border border-dashed border-white/20 bg-white/[0.02] p-5">
      <p className="text-[11px] tracking-[0.24em] text-white/60 uppercase">CMS · {label}</p>
      <p className="mt-2 text-sm text-white/55">
        Belum diisi — hubungkan Supabase untuk menampilkan {label.toLowerCase()} yang nyata.
      </p>
    </div>
  );
}

const PKL_GOALS = [
  "Menghubungkan teori sekolah dengan kerja nyata di lapangan.",
  "Belajar ritme profesional: datang tepat waktu, tanggung jawab, komunikasi.",
  "Menyentuh alur kerja sungguhan — dari brief hingga hasil yang dipakai.",
  "Menemukan cara berpikir lewat masalah nyata, bukan soal latihan.",
];

const PKL_RULES = [
  "Hadir dan tepat waktu — kehadiran adalah bentuk pertama tanggung jawab.",
  "Jaga etika dan kerahasiaan tempat belajar.",
  "Catat setiap pekerjaan — proses yang terdokumentasi bisa dievaluasi.",
  "Bertanya saat buntu lebih dari 30 menit; bawa selalu satu usulan solusi.",
  "Serahkan hasil dalam keadaan rapi dan bisa dijelaskan ulang.",
];

export default function RealPKL() {
  return (
    <>
      <section data-scene="transition" className="scene-travel-short" aria-label="Transisi ke dunia nyata">
        <div className="sticky-stage items-center text-center">
          <div className="relative z-20 mx-auto w-[min(720px,92vw)]">
            <p className="eyebrow reveal">Transisi fisik — cosmic pull-back</p>
            {/* the point that expands into reality */}
            <div className="reveal relative mx-auto mt-10 h-24" aria-hidden>
              <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_24px_rgba(244,241,234,0.9)]" />
              <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-white/50 [animation-duration:2.8s]" />
              <span className="absolute bottom-0 left-1/2 h-14 w-px -translate-x-1/2 bg-gradient-to-b from-white/60 to-transparent" />
            </div>
            <h2 className="display-mega reveal mt-4 text-[clamp(48px,10vw,150px)]">Dunia nyata</h2>
            <p className="narrative-serif reveal mt-4 text-[clamp(20px,3vw,36px)] text-white/80">
              Praktik Kerja Lapangan
            </p>
          </div>
        </div>
      </section>

      <section data-scene="pkl" className="flow-section" aria-label="PKL">
        <div>
          <div className="safe-text">
            <p className="eyebrow reveal">Real-world chapter — kamera memasuki kenyataan</p>
            <h2 className="display-section reveal mt-6">
              Praktik,
              <br />
              bukan teori.
            </h2>
          </div>

          {/* Apa itu PKL — definitional, editorial */}
          <div className="relative z-20 mx-auto mt-10 grid w-[min(1120px,94vw)] gap-10 lg:grid-cols-2">
            <div className="reveal">
              <h3 className="text-[11px] tracking-[0.3em] text-white/45 uppercase">Apa itu PKL</h3>
              <p className="narrative-serif mt-3 text-[clamp(19px,2.4vw,30px)] leading-snug text-white/90">
                Praktik Kerja Lapangan adalah masa di mana ruang kelas diganti ruang kerja —
                dan nilai diganti kepercayaan.
              </p>
              <p className="body-editorial mt-4">
                Bukan magang pajangan. Selama PKL, pelajar ditempatkan di lingkungan profesional
                untuk bekerja, diobservasi, dinilai, dan dibentuk oleh ritme dunia nyata.
              </p>
            </div>
            <MemoryPhoto
              src="/memory/memory-desk.jpg"
              alt="Suasana meja kerja — foto memori atmosfer (ganti via CMS)"
              caption="Memori atmosfer — ganti foto nyata via CMS"
              credit="Lorem Picsum / Unsplash"
            />
          </div>

          {/* Tujuan + Aturan */}
          <div className="relative z-20 mx-auto mt-10 grid w-[min(1120px,94vw)] gap-10 lg:grid-cols-2">
            <div className="reveal">
              <h3 className="text-[11px] tracking-[0.3em] text-white/45 uppercase">Tujuan PKL</h3>
              <ol className="mt-4 space-y-3">
                {PKL_GOALS.map((g, i) => (
                  <li key={g} className="flex gap-4 border-t border-white/10 pt-3 text-[15px] leading-relaxed text-white/75">
                    <span className="font-mono text-[#8ea2ff]">0{i + 1}</span> {g}
                  </li>
                ))}
              </ol>
            </div>
            <div className="reveal">
              <h3 className="text-[11px] tracking-[0.3em] text-white/45 uppercase">Aturan & tanggung jawab</h3>
              <ol className="mt-4 space-y-3">
                {PKL_RULES.map((r, i) => (
                  <li key={r} className="flex gap-4 border-t border-white/10 pt-3 text-[15px] leading-relaxed text-white/75">
                    <span className="font-mono text-[#8ea2ff]">§{i + 1}</span> {r}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="relative z-20 mx-auto mt-10 w-[min(1120px,94vw)]">
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
                  <p className="mt-1 text-[11px] text-white/55">{d.pace}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {PKL.company ? <p>{PKL.company}</p> : <EmptyState label="Tempat PKL" />}
              {PKL.activities.length ? <p>{PKL.activities.join(", ")}</p> : <EmptyState label="Aktivitas & pekerjaan" />}
              {PKL.lessons.length ? <p>{PKL.lessons.join(", ")}</p> : <EmptyState label="Pelajaran & pertumbuhan" />}
            </div>
            <p className="mt-6 text-[12px] leading-relaxed tracking-[0.08em] text-white/60">{PKL.note}</p>
          </div>
        </div>
      </section>
    </>
  );
}
