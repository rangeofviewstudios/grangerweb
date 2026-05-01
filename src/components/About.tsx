"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { label: "Based",       value: "Atlanta, GA" },
  { label: "Since",       value: "2019"        },
  { label: "Focus",       value: "Direction"   },
  { label: "Clients",     value: "20+"         },
];

const DISCIPLINES = [
  "Creative Direction",
  "Photography",
  "Brand Identity",
  "Art Direction",
  "Motion",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "#0a0c11" }}
    >
      {/* Atmospheric gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 10% 50%, rgba(196,163,90,0.04) 0%, transparent 70%)",
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

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow mb-16 md:mb-20"
        >
          About
        </motion.div>

        {/* Main split layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* ── LEFT — Image ── */}
          <motion.div
            initial={{ opacity: 0, x: -32, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
            className="bezel-outer"
          >
            <div className="bezel-inner" style={{ aspectRatio: "3/4", minHeight: "300px" }}>
              {/* Portrait placeholder — gradient composition */}
              <div
                className="w-full h-full relative overflow-hidden"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 60% at 50% 5%, rgba(196,163,90,0.30) 0%, rgba(196,163,90,0.08) 35%, transparent 65%)," +
                    "radial-gradient(ellipse 70% 70% at 20% 80%, rgba(20,15,8,0.9) 0%, transparent 70%)," +
                    "linear-gradient(175deg, #1c1408 0%, #0f1018 40%, #07090d 100%)",
                }}
              >
                {/* Large serif initial */}
                <div
                  className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                >
                  <span
                    className="text-outlined-gold"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(10rem, 28vw, 24rem)",
                      fontWeight: 300,
                      opacity: 0.07,
                      lineHeight: 1,
                      letterSpacing: "-0.05em",
                    }}
                  >
                    G
                  </span>
                </div>

                {/* Subtle horizontal bands */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(255,255,255,0.15) 18px, rgba(255,255,255,0.15) 19px)",
                  }}
                />

                {/* Bottom info strip */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div
                    className="px-4 py-3 rounded-xl"
                    style={{
                      background: "rgba(7,9,13,0.8)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <p
                      className="text-stone text-[10px] tracking-widest uppercase mb-1"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      Granger Wang
                    </p>
                    <p
                      className="text-gold text-[10px] tracking-wider uppercase"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      Creative Director
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT — Text ── */}
          <div className="flex flex-col justify-start">

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="font-serif font-light tracking-tight leading-[0.95] mb-8"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              }}
            >
              Precision in
              <br />
              <em className="text-gold not-italic">every frame.</em>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
              className="rule mb-7"
            />

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
              className="text-stone leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem" }}
            >
              Granger Wang is a creative director and visual artist whose
              work explores the quiet tension between stillness and movement.
              With a foundation in photography and graphic design, he brings
              a precise, human-centered perspective to every project.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
              className="text-stone leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem" }}
            >
              Whether crafting a brand campaign, editorial series, or
              collaborative identity system, Granger approaches each
              project as an opportunity to distill something true.
            </motion.p>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
              className="grid grid-cols-2 gap-px mb-10"
              style={{ border: "1px solid rgba(255,255,255,0.05)", borderRadius: "1rem" }}
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="p-5"
                  style={{
                    borderRight:
                      i % 2 === 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    borderBottom:
                      i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    background: "rgba(255,255,255,0.015)",
                    borderRadius:
                      i === 0 ? "1rem 0 0 0"
                      : i === 1 ? "0 1rem 0 0"
                      : i === 2 ? "0 0 0 1rem"
                      : "0 0 1rem 0",
                  }}
                >
                  <p
                    className="text-flint text-[10px] uppercase tracking-widest mb-2"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="text-canvas font-light"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.3rem",
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Disciplines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.72 }}
            >
              <p
                className="text-flint text-[10px] uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Disciplines
              </p>
              <div className="flex flex-wrap gap-2">
                {DISCIPLINES.map((d) => (
                  <span
                    key={d}
                    className="px-4 py-2 rounded-full text-stone text-xs tracking-wide"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
