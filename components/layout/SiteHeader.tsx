"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Wordmark } from "./Wordmark";

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 320) setHidden(false);
      lastY.current = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Tutup menu saat route berubah (pola "adjust state during render" — tanpa effect).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const btn = menuBtn.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink">
        {t("skip")}
      </a>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5" aria-hidden="true">
        <div className="h-full origin-left bg-accent-300" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out-soft)] ${hidden && !open ? "-translate-y-full" : ""}`}
      >
        <div className="container-x pt-3 sm:pt-4">
          <div
            className={`flex items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2 transition-all duration-500 ${
              scrolled || open ? "glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]" : "border border-transparent"
            }`}
          >
            <Link href="/" className="shrink-0 text-paper" aria-label="Citramas Corporate Group">
              <Wordmark />
            </Link>

            <nav aria-label={t("primary")} className="hidden xl:block">
              <ul className="flex items-center gap-1">
                {NAV_ITEMS.slice(1).map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`rounded-full px-3 py-2 text-[0.82rem] transition-colors ${
                        isActive(item.href) ? "bg-white/10 text-paper" : "text-paper/65 hover:text-paper"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <LocaleSwitcher tone="light" />
              <button
                ref={menuBtn}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="flex items-center gap-2 rounded-full bg-paper py-2 pl-4 pr-2 text-sm font-medium text-ink xl:hidden"
              >
                {open ? t("close") : t("menu")}
                <span className="relative grid size-7 place-items-center rounded-full bg-ink" aria-hidden="true">
                  <span className={`absolute h-px w-3 bg-paper transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
                  <span className={`absolute h-px w-3 bg-paper transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-ink/95 backdrop-blur-xl xl:hidden"
      >
        <nav aria-label={t("primary")} className="container-x flex min-h-full flex-col justify-between pb-10 pt-28">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.key} className="border-b border-white/10">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="animate-fade-up flex items-baseline justify-between gap-4 py-3.5"
                  style={{ animationDelay: `${60 + i * 45}ms` }}
                >
                  <span className={`headline text-[clamp(1.9rem,8vw,3.5rem)] ${isActive(item.href) ? "text-accent-300" : "text-paper"}`}>{t(item.key)}</span>
                  <span className="eyebrow text-paper/40">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
