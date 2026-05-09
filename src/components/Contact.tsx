"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

const EMAIL = "contact@grangerwang.com";

const SOCIALS = [
  {
    label:  "YouTube",
    handle: "@theoneandonlyboi8093",
    href:   "https://www.youtube.com/@theoneandonlyboi8093",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3.5" width="14" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6.5 6l4 2-4 2V6z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label:  "Instagram",
    handle: "@gwang_studios",
    href:   "https://www.instagram.com/gwang_studios/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="8" cy="8" r="2.8" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="11.5" cy="4.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    label:  "Email",
    handle: EMAIL,
    href:   `mailto:${EMAIL}`,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="3.5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1.5 5.5l6.5 4.5 6.5-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function ATLClock() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour:     "2-digit",
      minute:   "2-digit",
      second:   "2-digit",
      hour12:   false,
    }).format(new Date());

  const [time, setTime] = useState(fmt);

  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2.5">
      <span
        className="text-flint text-[10px] uppercase tracking-[0.18em]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        ATL
      </span>
      <span
        className="text-canvas tabular-nums text-xs tracking-wider"
        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
      >
        {time}
      </span>
    </div>
  );
}

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
      style={{ background: "#07090d", paddingTop: "2.5rem", paddingBottom: "2rem" }}
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
        <div className="rule mb-10 md:mb-12" />

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow mb-6"
        >
          Get In Touch
        </motion.div>

        {/* Hero heading */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
          className="mb-8 md:mb-10"
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

            {/* Big ROV logo — fills the left negative space */}
            <motion.a
              href="https://www.rovstudios.com/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.88, filter: "blur(10px)" }}
              animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 1.4, ease: EASE, delay: 0.55 }}
              className="inline-block mt-6"
              style={{ width: "clamp(180px, 22vw, 300px)" }}
            >
              <Image
                src="/WHITEnoBG.png"
                alt="Range Of View Studios"
                width={300}
                height={300}
                className="w-full h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </motion.a>
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
              {SOCIALS.map((social, i) => {
                const isTerra = i === 2;
                const hoverBg     = isTerra ? "rgba(196,105,74,0.06)"  : "rgba(196,163,90,0.06)";
                const hoverBorder = isTerra ? "rgba(196,105,74,0.18)"  : "rgba(196,163,90,0.18)";
                const hoverColor  = isTerra ? "var(--color-terra)"     : "var(--color-gold)";
                return (
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
                    el.style.background = hoverBg;
                    el.style.borderColor = hoverBorder;
                    const arrow = el.querySelector<HTMLElement>("[data-arrow]");
                    const icon  = el.querySelector<HTMLElement>("[data-icon]");
                    if (arrow) arrow.style.color = hoverColor;
                    if (icon)  icon.style.color  = hoverColor;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(255,255,255,0.015)";
                    el.style.borderColor = "rgba(255,255,255,0.05)";
                    const arrow = el.querySelector<HTMLElement>("[data-arrow]");
                    const icon  = el.querySelector<HTMLElement>("[data-icon]");
                    if (arrow) arrow.style.color = "";
                    if (icon)  icon.style.color  = "";
                  }}
                >
                  <span data-icon className="text-stone transition-colors duration-300">
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
                  <span data-arrow className="text-flint transition-all duration-300 text-sm leading-none">
                    ↗
                  </span>
                </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── FOOTER ── */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
          className="relative mt-6 md:mt-8 overflow-hidden"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          {/* Footer content — single unified row */}
          <div className="relative z-10 pt-7 pb-6">
            {/* Mobile layout */}
            <div className="flex flex-col gap-3 md:hidden">
              <div className="flex items-center justify-between">
                <span
                  className="text-stone text-[11px] tracking-[0.12em] uppercase"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  © 2025 Granger Wang
                </span>
                <ATLClock />
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="text-flint text-[11px] tracking-[0.1em] uppercase"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Atlanta &amp; Athens, GA
                </span>
                <a
                  href="https://www.rovstudios.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span className="text-flint text-[10px] tracking-[0.14em] uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    by ROV
                  </span>
                  <Image src="/WHITEnoBG.png" alt="Range Of View Studios" width={36} height={36} className="object-contain opacity-80" />
                </a>
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span
                  className="text-stone text-[11px] tracking-[0.12em] uppercase whitespace-nowrap"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  © 2025 Granger Wang
                </span>
                <span className="text-flint text-[10px]">·</span>
                <span
                  className="text-flint text-[11px] tracking-[0.1em] uppercase whitespace-nowrap"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Atlanta &amp; Athens, Georgia
                </span>
              </div>
              <ATLClock />
              <a
                href="https://www.rovstudios.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 whitespace-nowrap"
              >
                <span
                  className="text-flint text-[11px] tracking-[0.16em] uppercase"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Curated with intention by
                </span>
                <Image
                  src="/WHITEnoBG.png"
                  alt="Range Of View Studios"
                  width={52}
                  height={52}
                  className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </a>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
