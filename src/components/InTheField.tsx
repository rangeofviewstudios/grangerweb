"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

/*
  Grid layout — each row sums to 12 cols, all photos in the same
  row share the same explicit height so nothing stretches or clips oddly.

  Row 1 (420px): 7 + 5
  Row 2 (300px): 4 + 4 + 4
  Row 3 (400px): 5 + 7
  Row 4 (300px): 4 + 4 + 4
*/
const PHOTOS = [
  { src: "/pictures/image000000.JPG",   span: "md:col-span-7", height: "h-[260px] md:h-[420px]" },
  { src: "/pictures/image000001_2.JPG", span: "md:col-span-5", height: "h-[260px] md:h-[420px]" },

  { src: "/pictures/image000002_2.JPG", span: "md:col-span-4", height: "h-[220px] md:h-[300px]" },
  { src: "/pictures/image000003.JPG",   span: "md:col-span-4", height: "h-[220px] md:h-[300px]" },
  { src: "/pictures/image000004_2.JPG", span: "md:col-span-4", height: "h-[220px] md:h-[300px]" },

  { src: "/pictures/image000005_2.JPG", span: "md:col-span-5", height: "h-[260px] md:h-[400px]" },
  { src: "/pictures/image000006_2.JPG", span: "md:col-span-7", height: "h-[260px] md:h-[400px]" },

  { src: "/pictures/image000007_2.JPG", span: "md:col-span-4", height: "h-[220px] md:h-[300px]" },
  { src: "/pictures/image000008_2.JPG", span: "md:col-span-4", height: "h-[220px] md:h-[300px]" },
  { src: "/pictures/image000009_2.JPG", span: "md:col-span-4", height: "h-[220px] md:h-[300px]" },
];

export default function InTheField() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="field"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "#0a0c11" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 75% 20%, rgba(196,163,90,0.04) 0%, transparent 65%)",
        }}
      />

      <div
        className="relative z-10"
        style={{
          maxWidth: "1400px",
          margin:   "0 auto",
          padding:  "0 clamp(1.5rem, 5vw, 5rem)",
          width:    "100%",
        }}
      >
        <div className="rule mb-20 md:mb-28" />

        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between mb-14 md:mb-16 flex-wrap gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="eyebrow mb-4"
            >
              In the Field
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="tracking-tight leading-[0.9]"
              style={{
                fontFamily: "var(--font-chunko), var(--font-cormorant), serif",
                fontSize:   "clamp(2.5rem, 6vw, 5.5rem)",
                fontWeight: 700,
              }}
            >
              BEHIND
              <br />
              <span className="text-outlined">THE LENS.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="text-stone max-w-[22rem] leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.875rem" }}
          >
            On set, on location, and in the moments between the shot.
          </motion.p>
        </div>

        {/* Grid — explicit heights per row keep everything aligned */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={photo.src} photo={photo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotoCard({
  photo,
  index,
}: {
  photo: (typeof PHOTOS)[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 3) * 0.08 }}
      className={`${photo.span} bezel-outer group`}
    >
      <div className={`bezel-inner relative overflow-hidden ${photo.height}`}>
        <Image
          src={photo.src}
          alt={`Granger Wang in the field ${index + 1}`}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(7,9,13,0.45) 0%, transparent 60%)",
          }}
        />
      </div>
    </motion.div>
  );
}
