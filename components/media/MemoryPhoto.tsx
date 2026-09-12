"use client";

import Image from "next/image";

/**
 * Photography as environmental memory — never a card.
 * Focus state is driven by scroll (data-focus set in SmoothScroll):
 * distant → approach → focus → leaving.
 */
export default function MemoryPhoto({
  src,
  alt,
  caption,
  credit,
  className = "",
  ratio = "aspect-[16/10]",
}: {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <figure className={`memory-frame ${className}`}>
      <div className={`memory-photo overflow-hidden ${ratio}`} data-focus="distant" data-cursor="view">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={750}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-full w-full object-cover"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[11px] tracking-[0.18em] text-white/40 uppercase">
          <span>{caption}</span>
          {credit && <span className="shrink-0">{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
