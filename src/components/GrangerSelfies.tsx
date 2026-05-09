"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

const SELFIES = [
  "/pictures/gsellfie1.JPG",
  "/pictures/gsellfie2.JPG",
];

export default function GrangerSelfies() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="selfies"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "#07090d" }}
    >
      {/* Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 80%, rgba(196,163,90,0.04) 0%, transparent 60%)",
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
        <div ref={headerRef} className="mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="eyebrow mb-4"
          >
            The Man Himself
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="font-light leading-none"
            style={{
              fontFamily:    "var(--font-chunko), var(--font-cormorant), serif",
              fontSize:      "clamp(2.8rem, 7vw, 7rem)",
              fontWeight:    700,
              letterSpacing: "0.06em",
            }}
          >
            GRANGER
            <br />
            <span className="text-outlined">SELFIES</span>
          </motion.h2>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {SELFIES.map((src, i) => (
            <SelfieCard key={src} src={src} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SelfieCard({ src, index }: { src: string; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1, ease: EASE, delay: index * 0.15 }}
      className="bezel-outer group"
    >
      <div className="bezel-inner relative overflow-hidden aspect-[3/4]">
        <Image
          src={src}
          alt={`Granger Wang selfie ${index + 1}`}
          fill
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(7,9,13,0.5) 0%, transparent 55%)",
          }}
        />
      </div>
    </motion.div>
  );
}
