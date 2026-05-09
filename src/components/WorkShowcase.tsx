"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Category definitions ── */
const CATEGORIES = [
  { id: "short-form",  label: "Short Form"  },
  { id: "promo",       label: "Promo"        },
  { id: "documentary", label: "Documentary"  },
  { id: "commercial",  label: "Commercial"   },
  { id: "short-film",  label: "Short Film"   },
  { id: "music-video", label: "Music Video"  },
] as const;

type CatId = (typeof CATEGORIES)[number]["id"];

/* ── Work items per category ── */
const WORKS: Record<CatId, WorkItem[]> = {
  "short-form": [
    { id: "sf-01", title: "Short Form 01", sub: "Short Form · 2024", youtubeId: "-s-1abVSF38",  aspect: "portrait" },
    { id: "sf-02", title: "Short Form 02", sub: "Short Form · 2024", youtubeId: "mikjZCdU19w",  aspect: "portrait" },
    { id: "sf-03", title: "Short Form 03", sub: "Short Form · 2024", youtubeId: "cJr4D9f294k",  aspect: "portrait" },
  ],
  "promo": [
    { id: "pr-01", title: "The Chapel Bell", sub: "TCB Promo · 2024", youtubeId: "bVyjMkmOKZs", aspect: "wide", featured: true, badge: "TCB" },
    { id: "pr-02", title: "Promo 02",        sub: "Promo · 2024",     youtubeId: "dix8KSwjAYQ", aspect: "wide" },
    { id: "pr-03", title: "Promo 03",        sub: "Promo · 2024",     youtubeId: "J-2OQK3ueRY", aspect: "wide" },
  ],
  "documentary": [
    { id: "dc-01", title: "Documentary 01", sub: "Documentary · 2024", youtubeId: "HYq-dLgF9RE", aspect: "cinema" },
    { id: "dc-02", title: "Documentary 02", sub: "Documentary · 2023", youtubeId: "bXint5UA9bs", aspect: "cinema" },
  ],
  "commercial": [
    { id: "cm-01", title: "Commercial 01", sub: "Commercial · 2024", youtubeId: "D8eCBb4t7nA", aspect: "wide" },
  ],
  "short-film": [
    { id: "sl-01", title: "Short Film 01", sub: "Short Film · 2024", youtubeId: "r1ZuIsgZpl4", aspect: "cinema", featured: true },
    { id: "sl-02", title: "Short Film 02", sub: "Short Film · 2023", youtubeId: "j7ROB9Ij46s", aspect: "wide" },
    { id: "sl-03", title: "Short Film 03", sub: "Short Film · 2023", youtubeId: "LbN0hntB6mE", aspect: "wide" },
  ],
  "music-video": [
    { id: "mv-01", title: "Music Video 01", sub: "Music Video · 2024", youtubeId: "mY_WrpeRcsg", aspect: "wide",   accent: "gold"  },
    { id: "mv-02", title: "Music Video 02", sub: "Music Video · 2024", youtubeId: "wX0ugQHuEIU", aspect: "wide",   accent: "terra" },
    { id: "mv-03", title: "Music Video 03", sub: "Music Video · 2023", youtubeId: "iPObDoO8Qio", aspect: "wide",   accent: "gold"  },
  ],
};

interface WorkItem {
  id:        string;
  title:     string;
  sub:       string;
  youtubeId: string;
  aspect:    "portrait" | "wide" | "cinema" | "square";
  featured?: boolean;
  badge?:    string;
  accent?:   "gold" | "terra";
}

/* ── Aspect → Tailwind height ── */
const ASPECT_H: Record<WorkItem["aspect"], string> = {
  portrait: "h-[260px] sm:h-[420px]",
  wide:     "h-[200px] md:h-[300px]",
  cinema:   "h-[180px] md:h-[260px]",
  square:   "h-[160px] md:h-[240px]",
};

/* ── Grid layouts per category ── */
function ShortFormGrid({ items }: { items: WorkItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
      {items.map((item, i) => <WorkCard key={item.id} item={item} index={i} />)}
    </div>
  );
}

function PromoGrid({ items }: { items: WorkItem[] }) {
  const [hero, ...rest] = items;
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {hero && <WorkCard item={hero} index={0} wide />}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {rest.map((item, i) => <WorkCard key={item.id} item={item} index={i + 1} />)}
        </div>
      )}
    </div>
  );
}

function DocumentaryGrid({ items }: { items: WorkItem[] }) {
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {items.map((item, i) => <WorkCard key={item.id} item={item} index={i} wide />)}
    </div>
  );
}

function CommercialGrid({ items }: { items: WorkItem[] }) {
  if (items.length === 1) {
    return <WorkCard item={items[0]} index={0} wide />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
      {items.map((item, i) => <WorkCard key={item.id} item={item} index={i} />)}
    </div>
  );
}

function ShortFilmGrid({ items }: { items: WorkItem[] }) {
  const [hero, ...rest] = items;
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {hero && <WorkCard item={hero} index={0} wide />}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {rest.map((item, i) => <WorkCard key={item.id} item={item} index={i + 1} />)}
        </div>
      )}
    </div>
  );
}

function MusicVideoGrid({ items }: { items: WorkItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
      {items.map((item, i) => <WorkCard key={item.id} item={item} index={i} />)}
    </div>
  );
}

const GRID_MAP: Record<CatId, React.FC<{ items: WorkItem[] }>> = {
  "short-form":  ShortFormGrid,
  "promo":       PromoGrid,
  "documentary": DocumentaryGrid,
  "commercial":  CommercialGrid,
  "short-film":  ShortFilmGrid,
  "music-video": MusicVideoGrid,
};

/* ── WorkCard ── */
function WorkCard({ item, index, wide = false }: { item: WorkItem; index: number; wide?: boolean }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const isGold  = !item.accent || item.accent === "gold";
  const accent  = isGold ? "#c4a35a" : "#c4694a";
  const accentA = isGold ? "rgba(196,163,90,0.3)" : "rgba(196,105,74,0.3)";

  const heightClass = wide
    ? "h-[200px] md:h-[400px]"
    : ASPECT_H[item.aspect];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1, ease: EASE, delay: index * 0.1 }}
      className="relative group work-card rounded-[1.25rem] overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = accentA;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
      }}
    >
      <div className={`${heightClass} w-full relative`}>
        <iframe
          src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1&color=white`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ border: "none" }}
          title={item.title}
        />

        {/* Bottom gradient */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(7,9,13,0.92) 0%, rgba(7,9,13,0.5) 55%, transparent 100%)",
          }}
        />

        {/* Featured badge */}
        {item.featured && (
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span
              className="px-2.5 py-1 rounded-full text-[9px] tracking-widest uppercase"
              style={{
                fontFamily: "var(--font-dm-sans)",
                background: `rgba(${isGold ? "196,163,90" : "196,105,74"},0.15)`,
                border: `1px solid ${accent}40`,
                color: accent,
                backdropFilter: "blur(8px)",
              }}
            >
              {item.badge ?? "Featured"}
            </span>
          </div>
        )}

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 pointer-events-none">
          <p
            className="text-[9px] tracking-wider uppercase mb-1.5"
            style={{ fontFamily: "var(--font-dm-sans)", color: accent + "cc" }}
          >
            {item.sub}
          </p>
          <h3
            className="text-canvas font-light leading-none"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)",
            }}
          >
            {item.title}
          </h3>
        </div>

        {/* Accent line on hover */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 z-30 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${accentA}, transparent)`,
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ── Main section ── */
export default function WorkShowcase() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-60px" });
  const [active, setActive] = useState<CatId>("short-form");

  const Grid = GRID_MAP[active];

  return (
    <section
      id="work"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "#07090d" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 80% 10%, rgba(196,163,90,0.04) 0%, transparent 65%)",
        }}
      />

      <div
        className="relative z-10"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          width: "100%",
        }}
      >
        <div className="rule mb-12 md:mb-16" />

        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between mb-10 md:mb-12 flex-wrap gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="eyebrow mb-4"
            >
              Selected Work
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="leading-none"
              style={{
                fontFamily: "var(--font-chunko), var(--font-cormorant), serif",
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              THE
              <br />
              <span className="text-outlined">WORK.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="text-stone max-w-[22rem] leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem" }}
          >
            Every format has its own logic. Browse by category to see how the approach shifts.
          </motion.p>
        </div>

        {/* Category tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          className="mb-8 md:mb-10"
        >
          <div
            className="flex items-center gap-2 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === active;
              const count = WORKS[cat.id].length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className="relative flex-shrink-0 px-5 py-2.5 rounded-full text-[11px] tracking-widest uppercase transition-colors duration-200 focus:outline-none"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 500,
                    color: isActive ? "#d4b46a" : "#706c67",
                  }}
                >
                  {/* Animated sliding background */}
                  {isActive && (
                    <motion.div
                      layoutId="work-tab-bg"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "rgba(196,163,90,0.18)",
                        border: "1px solid rgba(196,163,90,0.75)",
                        boxShadow: "0 0 18px rgba(196,163,90,0.14), inset 0 0 10px rgba(196,163,90,0.07)",
                      }}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                    />
                  )}
                  {/* Inactive border */}
                  {!isActive && (
                    <div
                      className="absolute inset-0 rounded-full transition-colors duration-200"
                      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {cat.label}
                    <span
                      className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[8px] font-semibold"
                      style={{
                        background: isActive ? "rgba(196,163,90,0.22)" : "rgba(255,255,255,0.05)",
                        color: isActive ? "#c4a35a" : "#555250",
                        letterSpacing: 0,
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          {/* Separator */}
          <div className="mt-3 h-px w-full" style={{ background: "rgba(255,255,255,0.05)" }} />
        </motion.div>

        {/* Animated content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Grid items={WORKS[active]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
