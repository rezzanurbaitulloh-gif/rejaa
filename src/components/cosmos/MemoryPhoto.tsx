"use client";

/**
 * MEMORY PHOTO — fotografi sebagai memori lingkungan (§12–§13, §34).
 * Bukan kartu: gambar tanpa border, opacity 20–60%, grayscale + tint biru,
 * tepi melebur (mask), grain. Menajam saat kamera mendekat — nilai --focus
 * diwarisi dari Scene terdekat.
 */
export function MemoryPhoto({
  src,
  alt,
  caption,
  ratio = "4/3",
  className = "",
  wide = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: string;
  className?: string;
  /** Melebar melampaui kolom teks (40–60% viewport, §21). */
  wide?: boolean;
}) {
  return (
    <figure className={`memory-photo ${wide ? "memory-wide" : ""} ${className}`}>
      <div className="memory-frame" style={{ aspectRatio: ratio }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" decoding="async" />
        <span className="memory-tint" aria-hidden />
        <span className="photo-shade" aria-hidden />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
