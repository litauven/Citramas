"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useInView } from "./useInView";

/** Angka yang menghitung naik saat terlihat. `value` berupa angka; format lokal untuk pemisah ribuan. */
export function CountUp({ value, locale, duration = 1600, className = "", pad = false }: { value: number; locale: string; duration?: number; className?: string; pad?: boolean }) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const [n, setN] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || prefersReducedMotion()) return;
    started.current = true;
    const t0 = performance.now();
    let raf = requestAnimationFrame(function tick(t) {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const fmt = pad ? String(n) : n.toLocaleString(locale === "id" ? "id-ID" : "en-US");
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {fmt}
    </span>
  );
}
