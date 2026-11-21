"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./useInView";

/** Garis vertikal yang terisi mengikuti posisi scroll pada elemen induknya. */
export function ScrollFill({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (prefersReducedMotion()) {
      el.style.transform = "scaleY(1)";
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = parent.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.6 - r.top) / r.height));
      el.style.transform = `scaleY(${p.toFixed(3)})`;
    };
    const on = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <div ref={ref} aria-hidden="true" className={`origin-top ${className}`} style={{ transform: "scaleY(0)" }} />;
}
