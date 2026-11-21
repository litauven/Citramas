import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getBrands, getBusinessAreas, tr } from "@/lib/content";
import { LogoTile } from "@/components/companies/LogoTile";
import { pageMetadata } from "@/lib/seo";
import { RelationshipBadge } from "@/components/companies/RelationshipBadge";
import { PageHero } from "@/components/ui/PageHero";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({ params }: PageProps<"/[locale]/business-areas">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "areas", "/business-areas");
}

export default async function BusinessAreasPage({ params }: PageProps<"/[locale]/business-areas">) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations("areas");
  const home = await getTranslations("home");
  const areas = getBusinessAreas();
  const brands = getBrands();

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} watermark="Sectors" />
      <section className="container-x py-20 sm:py-28">
        <ol className="grid gap-5 md:grid-cols-2">
          {areas.map((a, i) => (
            <li key={a.id} id={a.id} className="scroll-mt-28">
              <Reveal delay={(i % 2) * 120} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-900">
                {a.image ? (
                  <div className="relative h-56 overflow-hidden sm:h-64">
                    <Image src={a.image} alt={tr(a.title, locale) ?? ""} fill sizes="(min-width: 768px) 50vw, 100vw" quality={70} className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-soft)] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" aria-hidden="true" />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="headline text-6xl text-accent-300/80">{String(i + 1).padStart(2, "0")}</span>
                  {!a.title ? <Pending /> : null}
                </div>
                <h2 className="headline mt-8 text-[clamp(1.8rem,4vw,3rem)]">
                  {tr(a.title, locale) ?? <span className="text-paper/25">{home("areasLabel")} {String(i + 1).padStart(2, "0")}</span>}
                </h2>
                <p className="mt-4 text-paper/60">{tr(a.summary, locale) ?? <Pending />}</p>
                {brands.some((b) => b.category === a.id) ? (
                  <div className="mt-8">
                    <p className="eyebrow text-paper/40">{t("brandsIn")}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {brands
                        .filter((b) => b.category === a.id)
                        .map((b) => (
                          <li key={`${b.company.id}-${b.name}`} title={b.name}>
                            <LogoTile logo={b.logo} name={b.name} size="sm" />
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : null}
                <div className="mt-auto pt-8">
                  <p className="eyebrow text-paper/40">{t("companiesIn")}</p>
                  {a.companies.length ? (
                    <ul className="mt-3 flex flex-col gap-2">
                      {a.companies.map((c) => (
                        <li key={c.id}>
                          <Link href={`/companies/${c.slug}`} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 px-4 py-3 hover:border-white/30">
                            <span>{c.name}</span>
                            <RelationshipBadge type={c.relationshipType} verified={c.relationshipVerified} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-paper/50">{t("none")}</p>
                  )}
                </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
