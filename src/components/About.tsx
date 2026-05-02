"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { label: "Based",       value: "Athens, GA",      big: false },
  { label: "Film Sets",   value: "50+",              big: true  },
  { label: "Live Events", value: "100+",             big: true  },
  { label: "Clients",     value: "Corps & Artists",  big: false },
];

const DISCIPLINES = [
  "Videography",
  "Photography",
  "Filmmaking",
  "Content Creation",
  "Video Editing",
  "Digital Marketing",
  "Social Media",
  "Live Broadcasting",
  "Sports Broadcasting",
  "Film Marketing",
  "Journalism",
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
            <div className="bezel-inner relative overflow-hidden" style={{ aspectRatio: "3/4", minHeight: "300px" }}>
              <Image
                src="/pictures/image000000.JPG"
                alt="Granger Wang — filmmaker"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Bottom gradient + badge */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,9,13,0.75) 0%, rgba(7,9,13,0.1) 40%, transparent 65%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div
                  className="inline-flex flex-col px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(7,9,13,0.8)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-stone text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    Granger Wang
                  </p>
                  <p className="text-gold text-[10px] tracking-wider uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    Filmmaker · Content Creator
                  </p>
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
              className="leading-[0.9] mb-8"
              style={{
                fontFamily:    "var(--font-chunko), var(--font-cormorant), serif",
                fontSize:      "clamp(2.8rem, 5.5vw, 5rem)",
                fontWeight:    700,
                letterSpacing: "0.06em",
              }}
            >
              CAMERAS,
              <br />
              <span className="text-gold">CUTS,</span>
              <br />
              CHAOS.
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
              I've been behind the lens for a while now. 50+ film sets, hundreds
              of live events, football games, basketball, concerts, musicals. If
              something's happening and it needs to be captured well, that's
              where I want to be.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
              className="text-stone leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem" }}
            >
              I shoot on the Blackmagic Pocket 6K Pro, Sony A7 III, and drones,
              and edit in Premiere Pro and DaVinci Resolve. Short-form reels,
              feature-length films, branded content. The format changes but the
              approach stays the same: know your client, tell their story right.
            </motion.p>

            {/* Stats — horizontal strip with big Chunko numbers */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 mb-10 overflow-hidden"
              style={{
                border:       "1px solid rgba(255,255,255,0.07)",
                borderRadius: "1.25rem",
                background:   "rgba(255,255,255,0.012)",
              }}
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col justify-between p-5 py-6"
                  style={{
                    borderRight:  i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}
                >
                  <p
                    className="text-[9px] uppercase tracking-[0.2em] mb-3"
                    style={{ fontFamily: "var(--font-dm-sans)", color: "rgba(196,163,90,0.7)" }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className={stat.big ? "text-gold" : "text-canvas"}
                    style={{
                      fontFamily:    stat.big
                        ? "var(--font-chunko), var(--font-cormorant), serif"
                        : "var(--font-cormorant)",
                      fontSize:      stat.big ? "clamp(2rem, 3.5vw, 2.8rem)" : "1.25rem",
                      fontWeight:    stat.big ? 700 : 300,
                      lineHeight:    1,
                      letterSpacing: stat.big ? "0.02em" : "0",
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
                className="text-[9px] uppercase tracking-[0.2em] mb-5"
                style={{ fontFamily: "var(--font-dm-sans)", color: "rgba(196,163,90,0.7)" }}
              >
                Disciplines
              </p>
              <div className="flex flex-wrap gap-2">
                {DISCIPLINES.map((d, i) => {
                  const featured = i < 4;
                  return (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs tracking-wide"
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        border:     featured
                          ? "1px solid rgba(196,163,90,0.35)"
                          : "1px solid rgba(255,255,255,0.07)",
                        background: featured
                          ? "rgba(196,163,90,0.06)"
                          : "rgba(255,255,255,0.02)",
                        color: featured ? "#c4a35a" : "#b8b4ac",
                      }}
                    >
                      {featured && (
                        <span
                          style={{
                            width: "4px", height: "4px",
                            borderRadius: "50%",
                            background: "#c4a35a",
                            display: "inline-block",
                            flexShrink: 0,
                          }}
                        />
                      )}
                      {d}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
