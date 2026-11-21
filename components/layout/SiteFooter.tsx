import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getCompanies } from "@/lib/content";
import { NAV_ITEMS } from "@/lib/nav";
import { Reveal } from "@/components/ui/Reveal";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const companies = getCompanies().filter((c) => !c.isPlaceholder);
  const year = 2026;

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink pt-20">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Wordmark className="text-paper" />
          <p className="mt-6 max-w-sm text-paper/60">{t("tagline")}</p>
        </div>
        <div className="lg:col-span-4">
          <p className="eyebrow text-paper/45">{t("explore")}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="inline-block rounded-full border border-white/15 px-4 py-2 text-sm text-paper/80 transition-colors hover:border-white/50 hover:text-paper">
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="eyebrow text-paper/45">{t("group")}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {companies.map((c) => (
              <li key={c.id}>
                <Link href={`/companies/${c.slug}`} className="text-paper/75 transition-colors hover:text-paper">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Reveal variant="up" className="container-x mt-16 select-none">
        <p aria-hidden="true" className="headline whitespace-nowrap text-center text-[clamp(4rem,20vw,19rem)] font-medium leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(242,241,241,0.22)]">
          Citramas
        </p>
      </Reveal>

      <div className="container-x flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-paper/45 sm:flex-row sm:justify-between">
        <p>
          © {year} Citramas Corporate Group. {t("rights")}
        </p>
        <p>{t("dataNote")}</p>
      </div>
    </footer>
  );
}
