"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/components/motion/useInView";

export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "fade";

/** Animasi muncul saat elemen masuk viewport. Variasi arah + delay untuk efek berurutan (stagger). */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  variant = "up",
  duration,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  duration?: number;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{
        ...(delay ? { transitionDelay: `${delay}ms` } : {}),
        ...(duration ? { transitionDuration: `${duration}ms` } : {}),
      }}
    >
      {children}
    </Tag>
  );
}
