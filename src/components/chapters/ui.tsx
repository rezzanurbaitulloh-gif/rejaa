import { AlarmClock, ClipboardCheck, Scale, HardHat, MessagesSquare, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function ChapterHeading({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <p className="chapter-label" data-reveal>
        {index} / {eyebrow}
      </p>
      <h2 className="font-display mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl" data-reveal>
        {title}
      </h2>
      {lede && (
        <p className="body-lead mt-5 max-w-2xl" data-reveal>
          {lede}
        </p>
      )}
    </div>
  );
}

/** Bingkai sinematik tanpa mengorbankan readability: gradient + focal point. */
export function CinematicFrame({
  label,
  caption,
  ratio = "16/9",
  children,
}: {
  label: string;
  caption?: string;
  ratio?: string;
  children?: ReactNode;
}) {
  return (
    <figure className="panel overflow-hidden" data-reveal>
      <div
        className="relative flex items-center justify-center bg-ink"
        style={{ aspectRatio: ratio }}
        role="img"
        aria-label={label}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 20% 10%, rgba(43,92,255,0.22), transparent 55%), radial-gradient(100% 100% at 85% 90%, rgba(245,241,234,0.08), transparent 60%), linear-gradient(180deg, #14171c, #0a0b0d)",
          }}
        />
        <div aria-hidden className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(245,241,234,0.05) 1px, transparent 1px)", backgroundSize: "100% 44px" }} />
        <div className="relative px-6 text-center">
          {children ?? <p className="chapter-label">{label}</p>}
        </div>
      </div>
      {caption && <figcaption className="px-5 py-3 text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}

const RULE_ICONS: { match: RegExp; icon: LucideIcon }[] = [
  { match: /disiplin/i, icon: AlarmClock },
  { match: /tanggung/i, icon: ClipboardCheck },
  { match: /etika/i, icon: Scale },
  { match: /selamat|keselamatan/i, icon: HardHat },
  { match: /komunikasi/i, icon: MessagesSquare },
];

export function RuleList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((r) => {
        const Icon = RULE_ICONS.find((x) => x.match.test(r.title))?.icon ?? ClipboardCheck;
        return (
          <li key={r.title} className="glass p-5 text-center" data-reveal-none>
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5" aria-hidden>
              <Icon className="h-5 w-5 text-cream" />
            </span>
            <p className="mt-3 text-xs font-semibold tracking-wide">{r.title}</p>
            <p className="body-muted mt-1 hidden text-[11px] md:block">{r.body}</p>
          </li>
        );
      })}
    </ul>
  );
}
