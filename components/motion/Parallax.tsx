"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "./useInView";

/**
 * Menggeser elemen secara vertikal mengikuti scroll (parallax).
 * speed > 0 bergerak lebih lambat dari scroll (ke bawah), speed < 0 berlawanan arah.
 */
export function Parallax({ children, speed = 0.2, className = "", scale = 0 }: { children: ReactNode; speed?: number; className?: string; scale?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.parentElement!.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 (elemen di bawah layar) .. 1 (elemen sudah lewat ke atas)
      const progress = Math.max(-1, Math.min(1, (vh / 2 - (rect.top + rect.height / 2)) / vh));
      const y = progress * speed * 200;
      const s = 1 + Math.max(0, progress) * scale;
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${s.toFixed(3)})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed, scale]);
  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
