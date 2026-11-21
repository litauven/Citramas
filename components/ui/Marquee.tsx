import type { ReactNode } from "react";

/** Teks berjalan tanpa henti. Konten diduplikasi agar loop mulus; salinan kedua disembunyikan dari screen reader. */
export function Marquee({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`marquee flex overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max shrink-0">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
