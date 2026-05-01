"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const NAV_LINKS = [
  { label: "Work",    href: "#work"    },
  { label: "About",   href: "#about"   },
  { label: "Contact", href: "#contact" },
];

const EASE = [0.32, 0.72, 0, 1] as const;

export default function Navbar() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrolled(v > 0.015);
  });

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scrollTo = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[80] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ── Floating pill ── */}
      <nav className="fixed top-5 left-0 right-0 z-[70] flex justify-center px-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0,   opacity: 1  }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="flex items-center gap-6 px-5 py-3 rounded-full"
          style={{
            background: scrolled
              ? "rgba(13, 16, 23, 0.88)"
              : "rgba(13, 16, 23, 0.45)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.07)",
            transition: "background 0.4s",
          }}
        >
          {/* Monogram */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-serif text-canvas font-medium text-sm tracking-widest select-none"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            GW
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-1 rounded-full text-stone text-xs font-sans font-medium tracking-wide
                           hover:text-canvas hover:bg-wire transition-all duration-300"
                style={{ fontFamily: "var(--font-dm-sans)", transition: "all 0.3s" }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="mailto:granger@example.com"
            className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide
                       border border-gold/30 text-gold hover:bg-gold/10 transition-all duration-300"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Connect
            <span className="text-[10px]">↗</span>
          </a>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden relative w-5 h-4 flex flex-col justify-between items-end"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block bg-canvas rounded-full"
              style={{ height: "1.5px" }}
              animate={open ? { width: "100%", rotate: 45, y: 7 } : { width: "100%", rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            />
            <motion.span
              className="block bg-canvas rounded-full"
              style={{ height: "1.5px" }}
              animate={open ? { width: "100%", rotate: -45, y: 0 } : { width: "80%", rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            />
            <motion.span
              className="block bg-canvas rounded-full"
              style={{ height: "1.5px" }}
              animate={open ? { opacity: 0, width: 0 } : { opacity: 1, width: "60%" }}
              transition={{ duration: 0.25, ease: EASE }}
            />
          </button>
        </motion.div>
      </nav>

      {/* ── Mobile fullscreen overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[60] md:hidden flex flex-col justify-center px-8"
            style={{
              background: "rgba(7, 9, 13, 0.96)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
            }}
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.08 + i * 0.07 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-canvas hover:text-gold transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(3rem, 12vw, 5rem)",
                    fontWeight: 300,
                    lineHeight: 1.0,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute bottom-10 left-8 right-8 flex justify-between items-end"
            >
              <span className="text-flint text-xs tracking-widest uppercase"
                style={{ fontFamily: "var(--font-dm-sans)" }}>
                Atlanta, GA
              </span>
              <span className="text-flint text-xs"
                style={{ fontFamily: "var(--font-dm-sans)" }}>
                © 2024
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
