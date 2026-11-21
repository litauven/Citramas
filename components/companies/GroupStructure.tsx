import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getGroupCompanies, getHeadOffice, primaryAddress, tr } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Pending } from "@/components/ui/Pending";
import { LogoTile } from "./LogoTile";
import { RelationshipBadge } from "./RelationshipBadge";

/** Diagram struktur: kantor pusat di atas, perusahaan dalam grup di bawahnya. Dibangun dari data. */
export function GroupStructure() {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const ho = getHeadOffice();
  const members = getGroupCompanies();
  const hoAddr = primaryAddress(ho);

  return (
    <div className="relative">
      <Reveal variant="scale" className="relative z-10 mx-auto max-w-xl">
        <Link href={`/companies/${ho.slug}`} className="group flex items-center gap-5 rounded-[1.75rem] bg-paper p-5 text-ink transition-transform duration-500 hover:-translate-y-1 sm:p-6">
          <LogoTile logo={ho.logo} name={ho.name} size="sm" />
          <div className="min-w-0">
            <RelationshipBadge type={ho.relationshipType} verified={ho.relationshipVerified} />
            <p className="mt-2 text-lg font-medium tracking-tight sm:text-xl">{ho.name}</p>
            <p className="mt-1 text-sm text-ink/55">{hoAddr ? tr(hoAddr.label, locale) : null}</p>
          </div>
        </Link>
      </Reveal>

      {members.length ? (
        <div className="relative">
          <div className="mx-auto h-12 w-px bg-white/25" aria-hidden="true" />
          <div className="relative">
            <Reveal variant="fade" className="absolute inset-x-[12%] top-0 hidden h-px md:block">
              <div className="grow-x h-px w-full bg-white/25" />
            </Reveal>
            <ul className="grid gap-4 md:grid-cols-3 md:pt-10">
              {members.map((c, i) => (
                <li key={c.id} className="relative">
                  <span className="absolute -top-10 left-1/2 hidden h-10 w-px bg-white/25 md:block" aria-hidden="true" />
                  <Reveal delay={i * 120}>
                    <Link
                      href={`/companies/${c.slug}`}
                      className="flex items-center gap-4 rounded-3xl border border-white/10 bg-ink-900 p-4 transition-colors hover:border-white/30"
                    >
                      <LogoTile logo={c.logo} name={c.name} size="sm" className="text-paper" />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{c.name}</p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          <RelationshipBadge type={c.relationshipType} verified={c.relationshipVerified} />
                          {c.isPlaceholder ? <Pending kind="placeholder" /> : null}
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="mt-8 text-center text-paper/50">{t("empty")}</p>
      )}
    </div>
  );
}
