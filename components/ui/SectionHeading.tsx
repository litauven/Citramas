import type { ReactNode } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "./Reveal";

/**
 * Judul section bergaya referensi: label kecil "/01 — LABEL", judul uppercase besar
 * dua baris dengan panah aksen di baris kedua, dan paragraf pendamping di kanan.
 */
export function SectionHeading({
  index,
  label,
  titleA,
  titleB,
  body,
  aside,
  as = "h2",
  tone = "dark",
}: {
  index?: string;
  label: string;
  titleA: string;
  titleB: string;
  body?: ReactNode;
  aside?: ReactNode;
  as?: "h1" | "h2";
  tone?: "dark" | "light";
}) {
  const Tag = as;
  const muted = tone === "dark" ? "text-paper/60" : "text-ink/60";
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Reveal variant="fade">
          <p className={`eyebrow flex items-center gap-3 ${muted}`}>
            {index ? <span className="text-accent-300">/{index}</span> : null}
            <span>{label}</span>
          </p>
        </Reveal>
        <Tag className="mt-5">
          <span className="sr-only">{`${titleA} ${titleB}`}</span>
          <span aria-hidden="true" className="block">
            <RevealText as="span" text={titleA} className="headline block text-[clamp(2.4rem,7vw,5.75rem)]" />
            <span className="headline flex flex-wrap items-center gap-x-[0.18em] pl-[0.6em] text-[clamp(2.4rem,7vw,5.75rem)]">
              <Reveal variant="left" delay={200} as="span" className="inline-flex text-accent-300">
                <svg viewBox="0 0 48 24" className="h-[0.5em] w-[1em]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M0 12h46M36 2l10 10-10 10" />
                </svg>
              </Reveal>
              <RevealText as="span" text={titleB} delay={150} />
            </span>
          </span>
        </Tag>
      </div>
      {body || aside ? (
        <Reveal delay={250} className={`max-w-md text-base leading-relaxed lg:col-span-5 lg:justify-self-end ${muted}`}>
          {body ? <div>{body}</div> : null}
          {aside ? <div className="mt-6">{aside}</div> : null}
        </Reveal>
      ) : null}
    </div>
  );
}
