"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const EASE = [0.16, 1, 0.3, 1] as const;

function SplitName({ text, outlined = false }: { text: string; outlined?: boolean }) {
  return (
    <span className="inline-flex" aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} className="char-mask" style={{ lineHeight: "inherit" }}>
          <span
            data-char
            className={`inline-block ${outlined ? "text-outlined" : ""}`}
            style={{ willChange: "transform" }}
          >
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref   = useRef<HTMLDivElement>(null);
  const line2Ref   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars1 = line1Ref.current?.querySelectorAll("[data-char]");
      const chars2 = line2Ref.current?.querySelectorAll("[data-char]");
      if (!chars1 || !chars2) return;

      gsap.timeline({ delay: 0.3 })
        .fromTo(chars1,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, stagger: 0.04, duration: 1.1, ease: "power4.out" }
        )
        .fromTo(chars2,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, stagger: 0.04, duration: 1.1, ease: "power4.out" },
          "-=0.75"
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden"
      style={{ background: "#07090d", minHeight: "100dvh" }}
    >
      {/* Atmospheric bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 70% at 80% 25%, rgba(196,163,90,0.07) 0%, transparent 65%)," +
            "radial-gradient(ellipse 40% 50% at 10% 85%, rgba(196,163,90,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Centered content wrapper */}
      <div
        className="relative z-10 w-full"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          width: "100%",
          minHeight: "100dvh",
        }}
      >
        <div
          className="flex flex-col justify-center"
          style={{ minHeight: "100dvh" }}
        >

          {/* ── CONTENT ── */}
          <div className="flex flex-col pt-36 pb-16 md:pt-44 md:pb-20" style={{ maxWidth: "52rem" }}>

            <div className="flex flex-col">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                className="eyebrow mb-6 md:mb-8"
              >
                Creative Director &amp; Photographer
              </motion.div>

              {/* Name display */}
              <div
                style={{
                  fontFamily: "var(--font-chunko), var(--font-cormorant), serif",
                  fontSize: "clamp(3.2rem, 7vw, 9rem)",
                  fontWeight: 700,
                  lineHeight: 0.9,
                  letterSpacing: "-0.01em",
                }}
              >
                <div ref={line1Ref}>
                  <SplitName text="GRANGER" />
                </div>
                <div ref={line2Ref}>
                  <SplitName text="WANG" outlined />
                </div>
              </div>

              {/* Divider + tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 1.5 }}
                className="mt-8 md:mt-10"
                style={{ maxWidth: "28rem" }}
              >
                <div className="rule mb-5" />
                <p
                  className="text-stone leading-relaxed"
                  style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem" }}
                >
                  Building work that lives at the intersection of story and
                  image — editorial campaigns, brand identities, and visual
                  narratives built to last.
                </p>
              </motion.div>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 1.75 }}
                className="flex items-center gap-4 mt-8 md:mt-10 flex-wrap"
              >
                <a href="#work" className="btn-primary">
                  View Work
                  <span className="icon-circle">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
                <a href="#about" className="btn-ghost">About Me</a>
              </motion.div>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 2.3 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span
          className="text-flint text-[9px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <motion.div
            className="w-full bg-gold"
            animate={{ height: ["0%", "100%", "0%"] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
            style={{ height: "40%" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
