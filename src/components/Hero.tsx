"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Slider constants ── */
const MIN_RANGE   = 50;
const ROTATION_DEG = -2.76;
const THETA       = ROTATION_DEG * (Math.PI / 180);
const COS_THETA   = Math.cos(THETA);
const SIN_THETA   = Math.sin(THETA);
const clampVal    = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/* ─────────────────────────────────────────────────────────────
   WangSlider  –  the WANG text housed inside a draggable range
───────────────────────────────────────────────────────────────*/
function WangSlider() {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [dims, setDims] = useState({ width: 320, height: 100 });

  useEffect(() => {
    const measure = () => {
      if (!measureRef.current) return;
      setDims({
        width:  measureRef.current.clientWidth,
        height: measureRef.current.clientHeight,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (measureRef.current) ro.observe(measureRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      {/* Off-screen clone – same font styles – used only for measurement */}
      <span
        ref={measureRef}
        aria-hidden
        style={{
          position:   "absolute",
          left:       "-9999px",
          top:        0,
          whiteSpace: "nowrap",
          fontFamily: "var(--font-chunko), var(--font-cormorant), serif",
          fontSize:   "clamp(4rem, 16vw, 22rem)",
          fontWeight: 700,
          lineHeight: 0.88,
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        WANG
      </span>
      <SliderReveal width={dims.width} height={dims.height} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SliderReveal  –  two-handle clip-path slider
───────────────────────────────────────────────────────────────*/
function SliderReveal({ width: rawW, height: rawH }: { width: number; height: number }) {
  const PAD_X      = 40;
  const PAD_Y      = 18;
  const handleSize = 28;
  const width      = rawW + PAD_X;
  const height     = rawH + PAD_Y;

  const [left,  setLeft]  = useState(0);
  const [right, setRight] = useState(width);
  const [dragging, setDragging] = useState<"left" | "right" | null>(null);
  const [rotation, setRotation] = useState(ROTATION_DEG);

  const leftRef  = useRef(left);
  const rightRef = useRef(right);
  const dragRef  = useRef<{
    handle: "left" | "right";
    startX: number; startY: number;
    initialLeft: number; initialRight: number;
  } | null>(null);

  useEffect(() => { leftRef.current  = left;  }, [left]);
  useEffect(() => { rightRef.current = right; }, [right]);
  useEffect(() => { setRight(width); }, [width]);

  /* Dynamic tilt based on handle midpoint */
  useEffect(() => {
    if (width <= 0) return;
    const mid      = (left + right) / 2;
    const deviation = (mid - width / 2) / (width / 2);
    setRotation(ROTATION_DEG + deviation * 3);
  }, [left, right, width]);

  const startDrag = (handle: "left" | "right", e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {
      handle,
      startX: e.clientX,
      startY: e.clientY,
      initialLeft:  leftRef.current,
      initialRight: rightRef.current,
    };
    setDragging(handle);
  };

  const onMove = useCallback((e: PointerEvent) => {
    if (!dragRef.current) return;
    const { handle, startX, startY, initialLeft, initialRight } = dragRef.current;
    const projected = (e.clientX - startX) * COS_THETA + (e.clientY - startY) * SIN_THETA;
    if (handle === "left") {
      setLeft(clampVal(initialLeft + projected, 0, rightRef.current - MIN_RANGE));
    } else {
      setRight(clampVal(initialRight + projected, leftRef.current + MIN_RANGE, width));
    }
  }, [width]);

  const onEnd = useCallback(() => {
    dragRef.current = null;
    setDragging(null);
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup",   onEnd);
    window.addEventListener("pointercancel", onEnd);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup",   onEnd);
      window.removeEventListener("pointercancel", onEnd);
    };
  }, [onMove, onEnd]);

  const nudge = (handle: "left" | "right") => (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const d = e.key === "ArrowLeft" ? -10 : 10;
    if (handle === "left") setLeft(p  => clampVal(p + d, 0, rightRef.current - MIN_RANGE));
    else                   setRight(p => clampVal(p + d, leftRef.current + MIN_RANGE, width));
  };

  return (
    <div
      className="relative select-none"
      style={{
        width,
        height,
        transform:  `rotate(${rotation}deg)`,
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Border frame */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: "1px solid rgba(196,163,90,0.45)" }}
      />

      {/* Handles */}
      {(["left", "right"] as const).map(handle => {
        const x = handle === "left" ? left : right - handleSize;
        return (
          <button
            key={handle}
            type="button"
            aria-label={handle === "left" ? "Slide left" : "Slide right"}
            onPointerDown={e => startDrag(handle, e)}
            onKeyDown={nudge(handle)}
            className="z-20 absolute top-0 h-full rounded-full flex items-center justify-center cursor-ew-resize focus:outline-none"
            style={{
              left:        x,
              width:       handleSize,
              touchAction: "none",
              background:  "#07090d",
              border:      "1px solid #c4a35a",
              transform:   dragging === handle ? "scaleY(1.06)" : "scaleY(1)",
              transition:  "transform 0.15s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span
              style={{
                display:      "block",
                width:        "3px",
                height:       "2rem",
                borderRadius: "9999px",
                background:   "#c4a35a",
              }}
            />
          </button>
        );
      })}

      {/* Clipped WANG text */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none text-outlined"
        style={{
          clipPath:   `inset(0 ${width - right}px 0 ${left}px round 1rem)`,
          fontFamily: "var(--font-chunko), var(--font-cormorant), serif",
          fontSize:   "clamp(4rem, 16vw, 22rem)",
          fontWeight: 700,
          lineHeight: 0.88,
          paddingLeft: PAD_X / 2,
        }}
      >
        WANG
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SplitName  –  GSAP per-character reveal
───────────────────────────────────────────────────────────────*/
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

/* ─────────────────────────────────────────────────────────────
   Hero section
───────────────────────────────────────────────────────────────*/
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars1 = line1Ref.current?.querySelectorAll("[data-char]");
      if (!chars1) return;
      gsap.timeline({ delay: 0.3 })
        .fromTo(chars1,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, stagger: 0.04, duration: 1.1, ease: "power4.out" }
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
          margin:   "0 auto",
          padding:  "0 clamp(1.5rem, 5vw, 5rem)",
          width:    "100%",
        }}
      >
        <div className="flex flex-col">

          {/* ── CONTENT ── */}
          <div className="flex flex-col pt-36 pb-20 md:pt-44 md:pb-28">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="eyebrow mb-8 md:mb-10"
            >
              Filmmaker · Videographer · Content Creator
            </motion.div>

            {/* Name — full-width display type */}
            <div
              style={{
                fontFamily:    "var(--font-chunko), var(--font-cormorant), serif",
                fontSize:      "clamp(4rem, 16vw, 22rem)",
                fontWeight:    700,
                lineHeight:    0.88,
                letterSpacing: "-0.01em",
              }}
            >
              {/* GRANGER – GSAP char reveal */}
              <div ref={line1Ref}>
                <SplitName text="GRANGER" />
              </div>

              {/* WANG – interactive slider reveal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 1.0 }}
              >
                <WangSlider />
              </motion.div>
            </div>

            {/* Divider + tagline + CTAs */}
            <div style={{ maxWidth: "34rem" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 1.5 }}
                className="mt-10 md:mt-12"
              >
                <div className="rule mb-5" />
                <p
                  className="text-stone leading-relaxed"
                  style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem" }}
                >
                  From live broadcasts to film sets — creating content that
                  moves people, builds brands, and tells stories worth telling.
                  Based in Athens, ATL Georgia.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 1.75 }}
                className="flex items-center gap-4 mt-8 flex-wrap"
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
