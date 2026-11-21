"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/** Mengganti bahasa sambil tetap di halaman yang sama (termasuk query string). */
export function LocaleSwitcher({ tone = "light" }: { tone?: "dark" | "light" }) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale) return;
    const search = typeof window !== "undefined" ? window.location.search : "";
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- pathname & params berasal dari route saat ini, jadi selalu valid.
        { pathname: pathname + search, params },
        { locale: next, scroll: false },
      );
    });
  }

  return (
    <div role="group" aria-label={t("language")} className={`flex items-center gap-0.5 text-xs font-semibold ${pending ? "opacity-60" : ""}`}>
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-pressed={l === locale}
          lang={l}
          className={`rounded-full px-2.5 py-1.5 uppercase tracking-wider transition-colors ${
            l === locale
              ? tone === "light"
                ? "bg-white/15 text-white"
                : "bg-ink text-paper"
              : tone === "light"
                ? "text-paper/50 hover:text-paper"
                : "text-ink/50 hover:text-ink"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
