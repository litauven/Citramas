import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getCompanies } from "@/lib/content";
import { NAV_ITEMS } from "@/lib/nav";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...NAV_ITEMS.map((n) => n.href as string), ...getCompanies().filter((c) => !c.isPlaceholder).map((c) => `/companies/${c.slug}`)];
  return paths.flatMap((p) => routing.locales.map((l) => ({ url: `${SITE_URL}/${l}${p === "/" ? "" : p}` })));
}
