"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

/*
  Masonry-style two-column layout — left col gets tall + short,
  right col gets short + tall, so heights alternate and the grid
  reads as curated rather than uniform.
*/
const STILLS = [
  { src: "/pictures/image000000.JPG",   col: "left",  aspect: "tall",  label: "On Set" },
  { src: "/pictures/image000001_2.JPG", col: "right", aspect: "short", label: "Location" },
  { src: "/pictures/image000002_2.JPG", col: "left",  aspect: "short", label: "Portrait" },
  { src: "/pictures/image000003.JPG",   col: "right", aspect: "tall",  label: "Behind Glass" },
  { src: "/pictures/image000005_2.JPG", col: "left",  aspect: "tall",  label: "Field Work" },
  { src: "/pictures/image000006_2.JPG", col: "right", aspect: "short", label: "Event" },
  { src: "/pictures/image000007_2.JPG", col: "left",  aspect: "short", label: "Detail" },
  { src: "/pictures/image000009_2.JPG", col: "right", aspect: "tall",  label: "Natural Light" },
];

const leftStills  = STILLS.filter((s) => s.col === "left");
const rightStills = STILLS.filter((s) => s.col === "right");

function StillCard({ still, index }: { still: (typeof STILLS)[number]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const isTerra  = index % 3 === 2;
  const accent   = isTerra ? "#c4694a" : "#c4a35a";
  const accentBg = isTerra ? "rgba(196,105,74,0.08)" : "rgba(196,163,90,0.08)";
  const accentBd = isTerra ? "rgba(196,105,74,0.25)" : "rgba(196,163,90,0.25)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1, ease: EASE, delay: (index % 4) * 0.12 }}
      className="bezel-outer group"
      style={{
        transition: "border-color 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = accentBd;
        el.style.boxShadow = `0 0 24px ${accentBg}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.06)";
        el.style.boxShadow = "none";
      }}
    >
      <div
        className="bezel-inner relative overflow-hidden"
        style={{ height: still.aspect === "tall" ? "380px" : "220px" }}
      >
        <Image
          src={still.src}
          alt={`${still.label} — Granger Wang`}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 40vw"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(7,9,13,0.55) 0%, transparent 55%)",
          }}
        />

        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
          <p
            className="text-[9px] tracking-widest uppercase"
            style={{ fontFamily: "var(--font-dm-sans)", color: accent }}
          >
            {still.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function StillsFromShoots() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="stills"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "#0a0c11" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 20% 60%, rgba(196,105,74,0.04) 0%, transparent 65%)",
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
        <div
          ref={headerRef}
          className="flex items-end justify-between mb-14 md:mb-16 flex-wrap gap-6"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="eyebrow mb-4"
            >
              Photography
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="leading-[0.9]"
              style={{
                fontFamily: "var(--font-chunko), var(--font-cormorant), serif",
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              STILLS
              <br />
              <span className="text-outlined">FROM SHOOTS.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="text-stone max-w-[22rem] leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem" }}
          >
            Single frames pulled from the work. Not every story needs motion.
          </motion.p>
        </div>

        {/* Two-column masonry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-3 md:gap-4">
            {leftStills.map((still, i) => (
              <StillCard key={still.src} still={still} index={i * 2} />
            ))}
          </div>

          {/* Right column — offset to stagger visually */}
          <div className="flex flex-col gap-3 md:gap-4 md:mt-16">
            {rightStills.map((still, i) => (
              <StillCard key={still.src} still={still} index={i * 2 + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
