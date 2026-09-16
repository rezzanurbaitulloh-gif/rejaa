"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from "motion/react";
import { springs, motionTokens, swipeThresholds } from "@/lib/motion-tokens";
import { motionConfig } from "@/lib/motion-config";
import { CaseModal, type CaseItem } from "@/components/CaseModal";
import type { Project, DEFAULT_SITE } from "@/lib/supabase";

type Site = typeof DEFAULT_SITE;

const GAP = 20;
const AUTOPLAY_MS = 4500;
/* coverflow geometry (spec bab 11–12) */
const SIDE_ROTATE = 18;

/** Signed coverflow state: ACTIVE / PREV / NEXT / HIDDEN */
function coverState(offset: number) {
  if (offset === 0)
    return { scale: 1.07, opacity: 1, y: 0, z: 100, rotateY: 0, zIndex: 10 };
  if (offset === -1)
    return { scale: 0.82, opacity: 0.85, y: 14, z: 0, rotateY: SIDE_ROTATE, zIndex: 5 };
  if (offset === 1)
    return { scale: 0.82, opacity: 0.85, y: 14, z: 0, rotateY: -SIDE_ROTATE, zIndex: 5 };
  if (offset < -1)
    return { scale: 0.7, opacity: 0.4, y: 30, z: 0, rotateY: SIDE_ROTATE, zIndex: 1 };
  return { scale: 0.7, opacity: 0.4, y: 30, z: 0, rotateY: -SIDE_ROTATE, zIndex: 1 };
}

/**
 * Layered 3D tilt (spec bab 3): cursor moves → card rotates,
 * image drifts slower, text slowest. Mouse pointers only.
 */
function TiltInner({
  children,
  enabled,
  reduce,
}: {
  children: React.ReactNode;
  enabled: boolean;
  reduce: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rX = useSpring(useTransform(py, [0, 1], [4, -4]), springs.snappy);
  const rY = useSpring(useTransform(px, [0, 1], [-7, 7]), springs.snappy);
  const imgX = useSpring(useTransform(px, [0, 1], [10, -10]), springs.gentle);
  const imgY = useSpring(useTransform(py, [0, 1], [8, -8]), springs.gentle);

  if (!enabled || reduce) return <div className="h-full">{children}</div>;

  return (
    <motion.div
      ref={ref}
      className="h-full"
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      whileHover={{ y: -8, transition: { duration: 0.45, ease: [...motionTokens.easing.smooth] } }}
    >
      {/* image layer drifts on its own depth */}
      <motion.div className="h-full" style={{ x: imgX, y: imgY, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

function BankingMock({ reduce }: { reduce: boolean }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00] via-[#7a1e00] to-black p-3">
      <motion.div
        className="mx-auto w-[130px] rounded-[22px] bg-black border border-white/15 p-2.5 shadow-2xl"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={
          reduce
            ? undefined
            : { repeat: Infinity, duration: 4, ease: [...motionTokens.easing.linear] }
        }
      >
        <p className="text-[8px] text-neutral-400">Hello, Rizky</p>
        <p className="text-[13px] font-semibold">Rp 25.000.000</p>
        <div className="mt-2 space-y-1.5">
          {["Transfer", "Top Up", "Bills"].map((t) => (
            <div
              key={t}
              className="flex justify-between bg-white/5 rounded-md px-2 py-1.5 text-[8px] text-neutral-300"
            >
              <span>{t}</span>
              <span>›</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function FeaturedProjects({
  site,
  projects,
}: {
  site: Site;
  projects: Project[];
}) {
  const n = projects.length;
  const [idx, setIdx] = useState(() => Math.min(2, Math.max(0, n - 1)));
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [metrics, setMetrics] = useState({ container: 0, card: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wheelAcc = useRef(0);
  const wheelLock = useRef(false);
  const reduce = useReducedMotion();
  const suppressClick = useRef(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const items: CaseItem[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    subtitle: p.subtitle,
    image_url: p.image_url,
    link_url: p.link_url,
    num: p.num_label,
  }));

  const go = useCallback((dir: 1 | -1) => setIdx((i) => (i + dir + n) % n), [n]);

  useEffect(() => {
    const measure = () => {
      const c = containerRef.current?.offsetWidth ?? 0;
      const card = trackRef.current?.children?.[0] as HTMLElement | undefined;
      setMetrics({ container: c, card: card?.offsetWidth ?? 0 });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [n]);

  /* autoplay — paused on hover/drag/hidden tab/reduced motion */
  useEffect(() => {
    if (reduce || paused || dragging || n < 2) return;
    const onVis = () => setPaused(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVis);
    const t = setInterval(() => setIdx((i) => (i + 1) % n), AUTOPLAY_MS);
    return () => {
      clearInterval(t);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce, paused, dragging, n]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setDragging(false);
    if (Math.abs(info.offset.x) > 10) suppressClick.current = true;
    const { offset, velocity } = info;
    if (offset.x < -swipeThresholds.offset || velocity.x < -swipeThresholds.velocity) go(1);
    else if (offset.x > swipeThresholds.offset || velocity.x > swipeThresholds.velocity) go(-1);
  };

  /**
   * Horizontal wheel navigates (trackpads / shift+wheel).
   * Vertical wheel is deliberately NOT hijacked — page scroll must never trap.
   */
  const onWheel = (e: React.WheelEvent) => {
    if (reduce || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    if (wheelLock.current) return;
    wheelAcc.current += e.deltaX;
    if (Math.abs(wheelAcc.current) > 60) {
      go(wheelAcc.current > 0 ? 1 : -1);
      wheelAcc.current = 0;
      wheelLock.current = true;
      setTimeout(() => (wheelLock.current = false), 500);
    }
  };

  const step = metrics.card + GAP;
  const targetX =
    metrics.container && metrics.card
      ? (metrics.container - metrics.card) / 2 - idx * step
      : 0;

  const transition = reduce
    ? { duration: motionTokens.duration.instant }
    : springs.gentle;

  return (
    <section
      id="works"
      className="dark-vignette px-5 md:px-12 py-12 md:py-16 overflow-hidden"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-[10px] tracking-[0.2em] text-[#8A8883]">
            <span className="text-[#FF6A00] mr-2">02</span> {site.featured_eyebrow}
          </p>
          <h2 className="font-serif-d text-4xl md:text-6xl leading-[1.02] mt-2 whitespace-pre-line">
            {site.featured_title}
          </h2>
        </div>
        <p className="hidden md:block max-w-[300px] text-[12px] leading-relaxed text-neutral-400 mt-8">
          {site.featured_desc}
        </p>
        <div className="flex flex-col items-end gap-3">
          <div className="flex gap-2">
            <motion.button
              onClick={() => go(-1)}
              aria-label="previous project"
              className="w-9 h-9 rounded-full border border-white/20 text-neutral-300 hover:border-[#FF6A00]"
              whileHover={reduce ? undefined : { scale: motionTokens.scale.pop }}
              whileTap={reduce ? undefined : { scale: motionTokens.scale.press }}
            >
              ←
            </motion.button>
            <motion.button
              onClick={() => go(1)}
              aria-label="next project"
              className="w-9 h-9 rounded-full border border-white/20 text-neutral-300 hover:border-[#FF6A00]"
              whileHover={reduce ? undefined : { scale: motionTokens.scale.pop }}
              whileTap={reduce ? undefined : { scale: motionTokens.scale.press }}
            >
              →
            </motion.button>
          </div>
          <a
            href="#works"
            className="hidden md:inline text-[11px] text-neutral-300 border-b border-[#FF6A00]/60 pb-0.5"
          >
            {site.featured_view_all} <span className="text-[#FF6A00]">→</span>
          </a>
        </div>
      </div>
      <p className="md:hidden mt-3 text-[12px] text-neutral-400 leading-relaxed">
        {site.featured_desc}
      </p>

      {/* 3D coverflow carousel */}
      <div
        ref={containerRef}
        className="relative mt-8 -mx-5 md:mx-0 px-5 md:px-0"
        style={{ perspective: 1200 }}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onWheel={onWheel}
      >
        <motion.div
          ref={trackRef}
          className="flex items-center"
          style={{
            gap: GAP,
            touchAction: "pan-y",
            cursor: dragging ? "grabbing" : "grab",
            transformStyle: "preserve-3d",
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          dragTransition={springs.release}
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
          initial={false}
          animate={{ x: targetX }}
          transition={transition}
        >
          {projects.map((p, i) => {
            const offset = i - idx;
            const v = coverState(offset);
            const active = offset === 0;
            return (
              <motion.article
                key={p.id}
                onClick={() => {
                  if (suppressClick.current) {
                    suppressClick.current = false;
                    return;
                  }
                  if (i === idx) setOpenIdx(i);
                  else setIdx(i);
                }}
                className={`shrink-0 relative rounded-xl overflow-hidden border bg-[#141414] ${
                  active
                    ? "border-[#FF6A00]/80 shadow-[0_0_50px_rgba(255,106,0,0.3)]"
                    : "border-white/10"
                } w-[68vw] max-w-[250px] md:w-[300px] md:max-w-none`}
                initial={false}
                animate={{
                  scale: v.scale,
                  opacity: v.opacity,
                  y: v.y,
                  z: v.z,
                  rotateY: v.rotateY,
                  zIndex: v.zIndex,
                }}
                transition={transition}
                style={{ transformStyle: "preserve-3d" }}
              >
                <TiltInner enabled={active} reduce={!!reduce}>
                  <div className="px-3 pt-2.5 flex justify-between text-[9px] text-neutral-400">
                    <span className={active ? "text-[#FF6A00]" : ""}>{p.num_label}</span>
                    <span>↗</span>
                  </div>
                  <AnimatePresence>
                    {active && p.link_url && p.link_url !== "#" && (
                      <motion.a
                        href={p.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (suppressClick.current) {
                            e.preventDefault();
                            suppressClick.current = false;
                          }
                        }}
                        className="absolute top-9 left-1/2 z-10 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[10.5px] font-medium text-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
                        initial={{ opacity: 0, scale: 0.5, y: -10, x: "-50%" }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.5, y: -10, x: "-50%" }}
                        transition={reduce ? { duration: motionTokens.duration.instant } : springs.bouncy}
                        whileHover={reduce ? undefined : { scale: 1.08 }}
                        whileTap={reduce ? undefined : { scale: 0.94 }}
                      >
                        Visit
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FF6A00] text-[9px] text-white">
                          ↗
                        </span>
                      </motion.a>
                    )}
                  </AnimatePresence>
                  <motion.div
                    layoutId={reduce ? undefined : `home-${p.id}`}
                    className={`mx-2.5 mt-1 rounded-lg overflow-hidden relative ${
                      active ? "h-[310px] md:h-[350px]" : "h-[250px] md:h-[270px]"
                    }`}
                  >
                    {p.title === "Mobile Banking App" ? (
                      <BankingMock reduce={!!reduce} />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image_url || "/placeholder.png"}
                        alt={p.title}
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <p className="text-[9px] text-[#ff8a3d]">● {p.category}</p>
                      <p className="font-serif-d text-[15px] leading-tight">{p.title}</p>
                      <p className="text-[9px] text-neutral-400 mt-0.5">{p.subtitle}</p>
                    </div>
                    {active && (
                      <motion.span
                        className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-[#FF6A00] text-white text-sm flex items-center justify-center"
                        initial={reduce ? false : { scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={springs.bouncy}
                      >
                        →
                      </motion.span>
                    )}
                  </motion.div>
                  <div className="h-2" />
                </TiltInner>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      <CaseModal
        items={items}
        index={openIdx}
        namespace="home"
        onClose={() => setOpenIdx(null)}
        onNav={setOpenIdx}
      />

      {/* indicators (mobile flow only — desktop design has arrows instead) */}
      <div className="mt-6 flex md:hidden items-center justify-center gap-3">
        <span className="text-[11px] text-[#8A8883] tabular-nums">
          0{idx + 1} / 0{n}
        </span>
        <div className="flex gap-1.5">
          {projects.map((p, i) => (
            <button
              key={p.id}
              aria-label={`go to ${p.title}`}
              onClick={() => setIdx(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === idx ? 22 : 8,
                background: i === idx ? "#FF6A00" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
        {!reduce && !motionConfig.isLowEnd() && (
          <span className="hidden md:inline text-[10px] text-neutral-600">← drag →</span>
        )}
      </div>
    </section>
  );
}
