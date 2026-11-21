import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getBrands, getBusinessAreas, tr } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { LogoTile } from "@/components/companies/LogoTile";
import { PageHero } from "@/components/ui/PageHero";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({ params }: PageProps<"/[locale]/brands">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "brands", "/brands");
}

export default async function BrandsPage({ params }: PageProps<"/[locale]/brands">) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations("brands");
  const brands = getBrands();
  const areas = getBusinessAreas();
  const groups = [
    ...areas.map((a) => ({ key: a.id, title: tr(a.title, locale) ?? a.id, list: brands.filter((b) => b.category === a.id) })),
    { key: "other", title: t("other"), list: brands.filter((b) => !b.category || !areas.some((a) => a.id === b.category)) },
  ].filter((g) => g.list.length);

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} watermark="Brands" image="/images/brands-robot-arm.jpg" />
      <section className="container-x space-y-20 py-20 sm:py-28">
        {!groups.length ? (
          <Reveal className="flex flex-col items-start gap-4 rounded-3xl border border-dashed border-white/15 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-paper/55">{t("empty")}</p>
            <Pending />
          </Reveal>
        ) : null}
        {groups.map(({ key, title, list }, gi) => {
          return (
            <div key={key} id={key} className="scroll-mt-28">
              <Reveal className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-5">
                <h2 className="headline text-[clamp(1.8rem,4.5vw,3.5rem)]">{title}</h2>
                <span className="eyebrow text-paper/40">
                  {t("count", { count: list.length })} · /{String(gi + 1).padStart(2, "0")}
                </span>
              </Reveal>
              {list.length ? (
                <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {list.map((b, i) => (
                    <li key={`${b.company.id}-${b.name}`}>
                      <Reveal delay={(i % 4) * 70} className="flex h-full flex-col items-center gap-3 rounded-3xl border border-white/10 p-6 text-center">
                        <LogoTile logo={b.logo} name={b.name} className="text-paper" />
                        <p className="font-medium">{b.name}</p>
                        <p className="text-xs text-paper/45">{t(b.relation)}</p>
                        {b.description ? <p className="text-xs text-paper/55">{tr(b.description, locale)}</p> : null}
                        <Link href={`/companies/${b.company.slug}`} className="mt-auto text-xs text-paper/50 underline-offset-4 hover:text-paper hover:underline">
                          {t("by", { company: b.company.name })}
                        </Link>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              ) : (
                <Reveal className="mt-8 flex flex-col items-start gap-4 rounded-3xl border border-dashed border-white/15 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-paper/55">{t("empty")}</p>
                  <Pending />
                </Reveal>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
}
