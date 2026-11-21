import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { Arrow } from "./Arrow";

type Variant = "light" | "dark" | "outline" | "accent";

const styles: Record<Variant, { pill: string; dot: string }> = {
  light: { pill: "bg-paper text-ink hover:bg-white", dot: "bg-ink text-paper" },
  dark: { pill: "bg-ink text-paper hover:bg-ink-800", dot: "bg-paper text-ink" },
  outline: { pill: "border border-white/25 text-paper hover:border-white/60", dot: "bg-paper text-ink" },
  accent: { pill: "bg-accent text-paper hover:bg-accent-400", dot: "bg-paper text-ink" },
};

/** Tombol pill dengan lingkaran panah — gaya utama CTA. */
export function ButtonLink({
  href,
  children,
  variant = "light",
  className = "",
  external = false,
}: {
  href: ComponentProps<typeof Link>["href"] | string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const s = styles[variant];
  const inner = (
    <>
      <span className="pl-5 pr-1">{children}</span>
      <span className={`grid size-9 place-items-center rounded-full ${s.dot}`}>
        <Arrow className="arrow-shift size-4" />
      </span>
    </>
  );
  const cls = `group inline-flex items-center gap-2 rounded-full p-1 text-sm font-medium transition-colors ${s.pill} ${className}`;
  if (external && typeof href === "string") {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href as ComponentProps<typeof Link>["href"]} className={cls}>
      {inner}
    </Link>
  );
}
