import type { ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Parallax } from "@/components/motion/Parallax";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "./Reveal";

/** Hero halaman dalam: panel gradien melengkung, judul raksasa, breadcrumb. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs = [],
  children,
  watermark,
  image,
}: {
  eyebrow?: ReactNode;
  title: string;
  lead?: ReactNode;
  crumbs?: { href: string; label: string }[];
  children?: ReactNode;
  watermark?: string;
  /** Foto latar opsional (path di /public). */
  image?: string;
}) {
  const nav = useTranslations("nav");
  return (
    <section className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="grain relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem]">
        <Parallax speed={0.3} className="absolute inset-0 -z-10">
          {image ? (
            <div className="absolute -inset-[10%]">
              <Image src={image} alt="" fill preload quality={70} sizes="100vw" className="object-cover" />
            </div>
          ) : null}
          <div className={`field animate-drift absolute -inset-[20%] ${image ? "opacity-60 mix-blend-multiply" : "opacity-70"}`} />
        </Parallax>
        <div className="lines absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/10" aria-hidden="true" />
        {watermark ? (
          <span aria-hidden="true" className="headline pointer-events-none absolute -bottom-[0.12em] right-0 -z-10 select-none whitespace-nowrap text-[clamp(6rem,22vw,20rem)] font-medium text-paper/[0.05]">
            {watermark}
          </span>
        ) : null}

        <div className="container-x pb-14 pt-36 sm:pb-20 sm:pt-44">
          <nav aria-label="Breadcrumb" className="animate-fade-up">
            <ol className="eyebrow flex flex-wrap items-center gap-2 text-paper/55">
              <li>
                <Link href="/" className="hover:text-paper">
                  {nav("home")}
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.href} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <Link href={c.href} className="hover:text-paper">
                    {c.label}
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-2 text-paper/85" aria-current="page">
                <span aria-hidden="true">/</span>
                {title}
              </li>
            </ol>
          </nav>
          {eyebrow ? <div className="animate-fade-up mt-10">{eyebrow}</div> : null}
          <RevealText as="h1" text={title} className="headline mt-6 max-w-5xl text-[clamp(2.75rem,9vw,8rem)]" />
          {lead ? (
            <Reveal delay={250}>
              <div className="mt-8 max-w-2xl text-lg text-paper/70">{lead}</div>
            </Reveal>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
