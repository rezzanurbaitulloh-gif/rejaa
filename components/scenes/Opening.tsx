"use client";

/**
 * PHASE 05 — Opening choreography: FAR SPACE → statements → push → line → title → exit.
 * Text is a spatial object inside .safe-text; planet lives right of frame (camera keys).
 */
export default function Opening() {
  return (
    <section data-scene="opening" className="scene-travel" aria-label="Pembuka">
      <div className="sticky-stage">
        <div className="safe-text">
          <p className="eyebrow reveal">Sebuah dokumenter personal interaktif</p>
          <h1 className="display-mega reveal mt-6 text-[clamp(40px,7.5vw,110px)]">
            Saya tidak
            <br />
            selalu tahu
            <br />
            <span className="narrative-serif font-normal normal-case tracking-tight text-[clamp(30px,4.6vw,68px)]">bagaimana sesuatu</span>
            <br />
            harus dibuat.
          </h1>
        </div>
        <div className="pointer-events-none absolute right-[6vw] top-1/2 hidden -translate-y-1/2 text-right lg:block">
          <p className="text-[11px] tracking-[0.3em] text-white/55 uppercase">Scroll — kamera bergerak</p>
          <p className="mt-2 text-[11px] tracking-[0.3em] text-white/55 uppercase">01 / Far space</p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden>
          <div className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>

      <div className="sticky-stage">
        <div className="safe-text">
          <p className="eyebrow reveal">Camera push — mendekat</p>
          <h2 className="display-mega reveal mt-6 text-[clamp(38px,6.8vw,100px)]">
            Tapi saya tahu
            <br />
            bagaimana
            <br />
            <span className="text-[#8ea2ff]">memulainya.</span>
          </h2>
          <p className="body-editorial reveal mt-8">
            Sebuah titik berdenyut. Sebuah garis mulai menggambar dirinya sendiri. Kamera mengikuti.
            Inilah <em className="narrative-serif">process line</em> — tulang punggung narasi.
          </p>
        </div>
      </div>

      <div className="sticky-stage">
        <div className="safe-text">
          <p className="eyebrow reveal">Landmark — bukan sekadar font besar</p>
          <h2 className="display-mega reveal mt-6 text-[clamp(56px,10.5vw,148px)]" data-cursor="view">
            Dalam
            <br />
            Proses
          </h2>
          <p className="body-editorial reveal mt-8">Dari ide, menjadi sesuatu yang nyata. — REZZA</p>
        </div>
      </div>
    </section>
  );
}
