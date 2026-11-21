import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

/** Ganti lewat env saat domain resmi sudah ada. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3200";

/** canonical + hreflang untuk path tanpa prefix locale (mis. "/companies"). */
export function alternates(locale: Locale, path: string): Metadata["alternates"] {
  const clean = path === "/" ? "" : path;
  return {
    canonical: `/${locale}${clean}`,
    languages: Object.fromEntries([...routing.locales.map((l) => [l, `/${l}${clean}`]), ["x-default", `/${routing.defaultLocale}${clean}`]]),
  };
}

/** Metadata standar halaman dalam: judul dari `<namespace>.title`, deskripsi dari `<namespace>.lead`. */
export async function pageMetadata(locale: Locale, namespace: string, path: string): Promise<Metadata> {
  const { getTranslations } = await import("next-intl/server");
  const t = await getTranslations({ locale, namespace });
  return { title: t("title"), description: t("lead"), alternates: alternates(locale, path) };
}
