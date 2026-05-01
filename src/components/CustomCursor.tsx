"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let hovering = false;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      // Dot follows instantly
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    };

    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; };

    const tick = () => {
      // Ring lerps toward cursor
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      const rSize = hovering ? 44 : 28;
      const offset = rSize / 2;

      ring.style.transform = `translate(${rx - offset}px, ${ry - offset}px)`;
      ring.style.width  = `${rSize}px`;
      ring.style.height = `${rSize}px`;
      ring.style.borderColor = hovering
        ? "rgba(196, 163, 90, 0.7)"
        : "rgba(240, 236, 228, 0.35)";

      dot.style.width  = hovering ? "8px" : "6px";
      dot.style.height = hovering ? "8px" : "6px";

      raf = requestAnimationFrame(tick);
    };

    const interactables = "a, button, [data-cursor-hover]";

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll(interactables).forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Watch for dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll(interactables).forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-canvas"
        style={{
          width: "6px",
          height: "6px",
          transition: "width 0.2s, height 0.2s",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border"
        style={{
          width: "28px",
          height: "28px",
          borderColor: "rgba(240, 236, 228, 0.35)",
          borderWidth: "1px",
          transition: "width 0.25s, height 0.25s, border-color 0.25s",
          willChange: "transform",
        }}
      />
    </>
  );
}
