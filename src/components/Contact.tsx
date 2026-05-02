"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const EMAIL = "granger@grangewang.com";

const SOCIALS = [
  {
    label: "Instagram",
    handle: "@grangerwang",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="8" cy="8" r="2.8" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="11.5" cy="4.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "Granger Wang",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="1.5" width="13" height="13" rx="3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4.5 11V6.5M4.5 4.5V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8 11V8.5C8 7.4 8.9 6.5 10 6.5S12 7.4 12 8.5V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M8 6.5V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Behance",
    handle: "grangerwang",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 5h5c1.4 0 2.5 1 2.5 2.2S8.4 9.5 7 9.5H2V5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M2 9.5h5.5c1.6 0 2.8 1.1 2.8 2.2S9.1 14 7.5 14H2V9.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M11 4h4M11 6.2c0-1.2 1-2.2 2.2-2.2 1.1 0 2 .9 2 2 0 .2 0 .3-.3.3H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#07090d", paddingTop: "7rem", paddingBottom: "5rem" }}
    >
      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 110%, rgba(196,163,90,0.06) 0%, transparent 60%)",
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

        {/* Top rule */}
        <div className="rule mb-16 md:mb-20" />

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow mb-8"
        >
          Get In Touch
        </motion.div>

        {/* Hero heading */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
          className="mb-14 md:mb-18"
        >
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 5vw, 6.5rem)",
              fontWeight: 300,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
            }}
          >
            Let&apos;s make
            <br />
            <em className="not-italic text-outlined italic">something.</em>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Left — email */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          >
            <p
              className="text-flint text-[10px] uppercase tracking-widest mb-3"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Direct Email
            </p>

            <div className="flex items-center gap-3 flex-wrap mb-6">
              <a
                href={`mailto:${EMAIL}`}
                className="contact-email-link"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}
              >
                {EMAIL}
              </a>

              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-wider uppercase transition-all duration-300"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: copied ? "rgba(196,163,90,0.12)" : "rgba(255,255,255,0.03)",
                  color: copied ? "#c4a35a" : "#4a4845",
                }}
              >
                {copied ? (
                  <>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#c4a35a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <rect x="3" y="1" width="6" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M1 3.5V8.5A1.2 1.2 0 0 0 2.2 9.7H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            <p
              className="text-stone text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans)", maxWidth: "26rem" }}
            >
              Whether you have a project in mind, want to collaborate,
              or just want to say hello — the inbox is always open.
            </p>
          </motion.div>

          {/* Right — socials */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
          >
            <p
              className="text-flint text-[10px] uppercase tracking-widest mb-5"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Find me online
            </p>

            <div className="flex flex-col gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-2xl"
                  style={{
                    border: "1px solid rgba(255,255,255,0.05)",
                    background: "rgba(255,255,255,0.015)",
                    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(196,163,90,0.06)";
                    el.style.borderColor = "rgba(196,163,90,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(255,255,255,0.015)";
                    el.style.borderColor = "rgba(255,255,255,0.05)";
                  }}
                >
                  <span className="text-stone group-hover:text-gold transition-colors duration-300">
                    {social.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-canvas text-sm font-medium"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {social.label}
                    </p>
                    <p
                      className="text-flint text-xs mt-0.5"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {social.handle}
                    </p>
                  </div>
                  <span className="text-flint group-hover:text-gold transition-all duration-300 text-sm leading-none">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          className="flex items-center justify-between flex-wrap gap-4 mt-16 md:mt-20 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span
            className="text-flint text-xs tracking-wider"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            © 2024 Granger Wang. All rights reserved.
          </span>
          <span
            className="text-flint text-xs tracking-wider"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Athens, ATL Georgia · Built with precision.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
