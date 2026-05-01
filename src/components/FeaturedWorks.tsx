"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const WORKS = [
  {
    id: "01",
    title: "Boundary",
    category: "Fashion Campaign",
    year: "2024",
    tags: ["Direction", "Photography"],
    youtubeId: "qwxyMCMa1gM",
    accentColor: "rgba(196,163,90,0.7)",
    span: "md:col-span-7 md:row-span-2",
    height: "h-[360px] md:h-full",
  },
  {
    id: "02",
    title: "Aperture",
    category: "Photography Series",
    year: "2023",
    tags: ["Photography", "Print"],
    youtubeId: "bjogJNEud78",
    accentColor: "rgba(100,140,180,0.7)",
    span: "md:col-span-5",
    height: "h-[260px] md:h-full",
  },
  {
    id: "03",
    title: "Meridian",
    category: "Brand Identity",
    year: "2023",
    tags: ["Branding", "Design"],
    youtubeId: "z9dpWKVKOCo",
    accentColor: "rgba(100,160,100,0.7)",
    span: "md:col-span-5",
    height: "h-[260px] md:h-full",
  },
  {
    id: "04",
    title: "Still Frame",
    category: "Motion Reel",
    year: "2024",
    tags: ["Motion", "Direction"],
    youtubeId: "0OqaiCbDTCY",
    accentColor: "rgba(196,163,90,0.5)",
    span: "md:col-span-12",
    height: "h-[260px] md:h-[320px]",
  },
];

function WorkCard({
  work,
  index,
}: {
  work: (typeof WORKS)[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1, ease: EASE, delay: index * 0.12 }}
      className={`${work.span} ${work.height} relative group work-card rounded-[1.25rem] overflow-hidden`}
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* YouTube embed fills the card */}
      <div className="absolute inset-0">
        <iframe
          src={`https://www.youtube.com/embed/${work.youtubeId}?rel=0&modestbranding=1&color=white`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ border: "none", display: "block" }}
          title={work.title}
        />
      </div>

      {/* Persistent bottom gradient for text legibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-36 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(7,9,13,0.92) 0%, rgba(7,9,13,0.5) 55%, transparent 100%)",
        }}
      />

      {/* Number label (top-left) */}
      <div className="absolute top-5 left-5 z-20 pointer-events-none">
        <span
          className="text-canvas/40 text-[10px] font-mono tracking-widest"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {work.id}
        </span>
      </div>

      {/* Tags (top-right) */}
      <div className="absolute top-5 right-5 z-20 flex gap-1.5 flex-wrap justify-end pointer-events-none">
        {work.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-[9px] tracking-wider uppercase"
            style={{
              fontFamily: "var(--font-dm-sans)",
              background: "rgba(7,9,13,0.75)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#8a8880",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Info block — always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-20 pointer-events-none">
        <div className="flex items-end justify-between">
          <div>
            <p
              className="text-stone text-[10px] tracking-wider uppercase mb-1.5"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {work.category} · {work.year}
            </p>
            <h3
              className="text-canvas font-light tracking-tight leading-none"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              {work.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Gold accent line (bottom) */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 z-30 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${work.accentColor}, transparent)`,
          transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </motion.div>
  );
}

export default function FeaturedWorks() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="work"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "#07090d" }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          width: "100%",
        }}
      >
        {/* Subtle top divider */}
        <div className="rule mb-20 md:mb-28" />

        {/* Section header */}
        <div ref={headerRef} className="flex items-end justify-between mb-14 md:mb-16 flex-wrap gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="eyebrow mb-4"
            >
              Selected Works
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="font-serif font-light tracking-tight leading-none"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              }}
            >
              Featured
              <br />
              <span className="text-outlined italic">Projects</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="text-stone max-w-[22rem] leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem" }}
          >
            A curated selection of campaigns, identities, and visual
            stories from the last few years of practice.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4"
          style={{ gridAutoRows: "minmax(260px, auto)" }}
        >
          {WORKS.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} />
          ))}
        </div>

        {/* "View all" link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="flex justify-center mt-14 md:mt-16"
        >
          <button
            className="btn-ghost group"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            View Full Archive
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="group-hover:translate-x-0.5 transition-transform duration-300"
            >
              <path
                d="M2 10L10 2M10 2H5M10 2V7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
