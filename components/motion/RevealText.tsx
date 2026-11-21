"use client";

import { Fragment, type ElementType } from "react";
import { useInView } from "./useInView";

/** Judul yang muncul kata per kata (naik dari balik mask). Teks utuh tetap terbaca screen reader. */
export function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 60,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={`${className} ${inView ? "is-visible" : ""}`} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span aria-hidden="true" className="word-mask">
            <span className="word" style={{ transitionDelay: `${delay + i * stagger}ms` }}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
