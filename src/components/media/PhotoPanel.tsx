"use client";

import { Play } from "lucide-react";

export type PhotoKind =
  | "silhouette" // sosok + ransel menatap kota (frame 4)
  | "office" // ruang kerja / transisi (frame 8-9)
  | "desk" // meja kerja malam (frame 3/16)
  | "video" // thumbnail dokumentasi + tombol play (frame 10)
  | "server" // rak server / teknis (frame 11)
  | "meeting" // diskusi tim (frame 13/16)
  | "blueprint"; // sketsa proses (frame 6)

/**
 * PHOTO PANEL — "foto" sinematik prosedural sesuai frame storyboard ref2.
 * Tanpa aset eksternal; komposisi + caption mengikuti frame aslinya.
 */
export function PhotoPanel({
  kind,
  label,
  caption,
  ratio = "16/9",
  className = "",
}: {
  kind: PhotoKind;
  label: string;
  caption?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-white/12 bg-ink ${className}`} data-reveal-none>
      <div className="relative w-full" style={{ aspectRatio: ratio }} role="img" aria-label={label}>
        <Scene kind={kind} />
        <div className="photo-shade" />
        {kind === "video" && (
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/45 backdrop-blur-sm" aria-hidden>
            <Play className="h-5 w-5 fill-cream text-cream" />
          </span>
        )}
      </div>
      {caption && <figcaption className="px-4 py-2.5 text-[11px] leading-snug text-muted">{caption}</figcaption>}
    </figure>
  );
}

function Scene({ kind }: { kind: PhotoKind }) {
  if (kind === "silhouette") {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sil-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#080a14" /><stop offset="48%" stopColor="#2c2138" />
            <stop offset="72%" stopColor="#b25a36" /><stop offset="88%" stopColor="#3a2430" />
            <stop offset="100%" stopColor="#0c0a12" />
          </linearGradient>
          <radialGradient id="sil-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe0b0" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#ffb877" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ff9a5c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sil-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8fb4ff" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffd9a8" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect width="400" height="225" fill="url(#sil-sky)" />
        <ellipse cx="292" cy="152" rx="72" ry="52" fill="url(#sil-sun)" />
        <circle cx="292" cy="152" r="22" fill="#ffe2b8" />
        {/* gedung jauh — atmosferik, lebih terang */}
        <g fill="#2b2338" opacity="0.9">
          <rect x="200" y="118" width="34" height="107" /><rect x="240" y="132" width="26" height="93" />
          <rect x="330" y="122" width="30" height="103" />
        </g>
        {/* gedung dekat — gelap */}
        <g fill="#07080e">
          <rect x="0" y="150" width="42" height="75" /><rect x="52" y="128" width="36" height="97" />
          <rect x="98" y="158" width="48" height="67" /><rect x="352" y="140" width="48" height="85" />
        </g>
        <g fill="#ffcf96" opacity="0.75">
          {Array.from({ length: 20 }).map((_, i) => (
            <rect key={i} x={56 + (i % 5) * 8} y={136 + Math.floor(i / 5) * 18} width="3" height="4" />
          ))}
        </g>
        <g fill="#ffd9a8" opacity="0.4">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={204 + (i % 4) * 9} y={126 + Math.floor(i / 4) * 20} width="3" height="4" />
          ))}
        </g>
        {/* tanah */}
        <rect y="200" width="400" height="25" fill="#05060b" />
        {/* sosok + ransel dengan rim-light senja */}
        <g>
          <path d="M118 225 V160 Q118 128 150 128 Q182 128 182 160 V225 Z" fill="#04050a" />
          <ellipse cx="150" cy="118" rx="23" ry="25" fill="#04050a" />
          <rect x="176" y="145" width="34" height="52" rx="10" fill="#04050a" />
          <rect x="150" y="148" width="30" height="10" rx="5" fill="#0a0c14" />
          <path d="M181 132 Q186 160 181 200" fill="none" stroke="url(#sil-rim)" strokeWidth="2.5" opacity="0.8" />
          <ellipse cx="150" cy="118" rx="23" ry="25" fill="none" stroke="#c96b3f" strokeWidth="1.2" opacity="0.5" />
        </g>
      </svg>
    );
  }
  if (kind === "office") {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="225" fill="#0b0d13" />
        {/* jendela senja jauh */}
        <rect x="230" y="30" width="140" height="70" rx="3" fill="#1a2130" />
        <rect x="230" y="30" width="140" height="34" rx="3" fill="#c96b3f" opacity="0.28" />
        <ellipse cx="70" cy="60" rx="90" ry="46" fill="#ffbe78" opacity="0.14" />
        {/* strip lampu langit-langit */}
        <rect x="40" y="18" width="120" height="5" rx="2.5" fill="#ffe2b8" opacity="0.5" />
        <ellipse cx="100" cy="26" rx="90" ry="22" fill="#ffcf96" opacity="0.08" />
        <rect y="120" width="400" height="105" fill="#11141c" />
        <rect y="120" width="400" height="14" fill="#0a0c11" />
        <rect x="30" y="150" width="130" height="10" fill="#1d2230" />
        <rect x="30" y="160" width="8" height="40" fill="#1d2230" /><rect x="152" y="160" width="8" height="40" fill="#1d2230" />
        <rect x="200" y="90" width="150" height="80" rx="4" fill="#161b28" stroke="#2a3350" />
        <rect x="210" y="100" width="90" height="8" fill="#2b5cff" opacity="0.7" />
        <rect x="210" y="114" width="130" height="5" fill="#39415a" /><rect x="210" y="124" width="110" height="5" fill="#39415a" />
        <rect x="210" y="134" width="120" height="5" fill="#39415a" />
        <ellipse cx="70" cy="60" rx="90" ry="46" fill="#ffbe78" opacity="0.14" />
        <rect x="52" y="96" width="36" height="54" rx="2" fill="#0e1420" stroke="#2a3350" />
        <rect x="58" y="130" width="24" height="4" fill="#2b5cff" opacity="0.6" />
      </svg>
    );
  }
  if (kind === "desk") {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="225" fill="#07080d" />
        <ellipse cx="320" cy="50" rx="110" ry="60" fill="#ffb066" opacity="0.16" />
        <rect y="170" width="400" height="55" fill="#141019" />
        <rect x="120" y="70" width="170" height="100" rx="6" fill="#10141f" stroke="#2a3350" />
        <rect x="130" y="82" width="150" height="60" fill="#0a1830" />
        <rect x="140" y="92" width="60" height="7" fill="#2b5cff" opacity="0.8" />
        <rect x="140" y="104" width="110" height="5" fill="#3b4763" /><rect x="140" y="114" width="90" height="5" fill="#3b4763" />
        <rect x="60" y="120" width="40" height="50" rx="3" fill="#10141f" stroke="#2a3350" />
        <circle cx="330" cy="150" r="14" fill="#1a2030" stroke="#2a3350" />
      </svg>
    );
  }
  if (kind === "video") {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="225" fill="#0a0c12" />
        <rect x="90" y="40" width="220" height="145" rx="8" fill="#131826" stroke="#2a3350" />
        <rect x="110" y="60" width="90" height="60" fill="#1c2740" />
        <rect x="210" y="60" width="80" height="14" fill="#2b5cff" opacity="0.7" />
        <rect x="210" y="80" width="80" height="6" fill="#3b4763" /><rect x="210" y="92" width="60" height="6" fill="#3b4763" />
        <rect x="110" y="130" width="180" height="8" fill="#222a42" />
        <rect x="110" y="130" width="120" height="8" fill="#2b5cff" />
        <ellipse cx="200" cy="112" rx="150" ry="80" fill="#8fb4ff" opacity="0.06" />
      </svg>
    );
  }
  if (kind === "server") {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="225" fill="#07090e" />
        {Array.from({ length: 5 }).map((_, c) => (
          <g key={c}>
            <rect x={28 + c * 70} y="20" width="56" height="185" rx="4" fill="#10141d" stroke="#232c44" />
            {Array.from({ length: 6 }).map((_, r) => (
              <g key={r}>
                <rect x={34 + c * 70} y={30 + r * 28} width="44" height="18" rx="2" fill="#161c2b" />
                <circle cx={40 + c * 70} cy={39 + r * 28} r="2.4" fill={r % 3 === 0 ? "#2b5cff" : "#3ddc84"} />
                <rect x={48 + c * 70} y={37 + r * 28} width="24" height="4" fill="#2c3550" />
              </g>
            ))}
          </g>
        ))}
      </svg>
    );
  }
  if (kind === "meeting") {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="225" fill="#0a0c12" />
        <ellipse cx="200" cy="60" rx="160" ry="60" fill="#ffbe78" opacity="0.1" />
        <rect x="60" y="150" width="280" height="12" rx="6" fill="#1c2233" />
        <rect x="140" y="60" width="120" height="70" rx="4" fill="#141b2c" stroke="#2a3350" />
        <rect x="150" y="70" width="60" height="8" fill="#2b5cff" opacity="0.7" />
        <rect x="150" y="84" width="100" height="5" fill="#3b4763" /><rect x="150" y="94" width="80" height="5" fill="#3b4763" />
        <g fill="#04050a">
          <ellipse cx="90" cy="130" rx="20" ry="22" /><path d="M62 205 V168 Q62 142 90 142 Q118 142 118 168 V205 Z" />
          <ellipse cx="310" cy="130" rx="20" ry="22" /><path d="M282 205 V168 Q282 142 310 142 Q338 142 338 168 V205 Z" />
        </g>
      </svg>
    );
  }
  // blueprint
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="225" fill="#0a0f1c" />
      <g stroke="#2b5cff" opacity="0.5" fill="none">
        <rect x="40" y="60" width="90" height="60" rx="4" strokeDasharray="6 5" />
        <rect x="170" y="60" width="90" height="60" rx="4" strokeDasharray="6 5" />
        <rect x="300" y="60" width="60" height="60" rx="30" strokeDasharray="6 5" />
        <path d="M130 90 H170 M260 90 H300 M90 120 V160 H320 V120" />
      </g>
      <g fill="#8fb4ff" opacity="0.8">
        <circle cx="85" cy="90" r="5" /><circle cx="215" cy="90" r="5" /><circle cx="330" cy="90" r="5" />
      </g>
    </svg>
  );
}
