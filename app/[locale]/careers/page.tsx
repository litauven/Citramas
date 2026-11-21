import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCareers, getCompanyById, tr } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({ params }: PageProps<"/[locale]/careers">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "careers", "/careers");
}

export default async function CareersPage({ params }: PageProps<"/[locale]/careers">) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations("careers");
  const jobs = getCareers();

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} watermark="Careers" image="/images/careers-team.jpg" />
      <section className="container-x py-20 sm:py-28">
        {jobs.length ? (
          <ul className="border-t border-white/10">
            {jobs.map((j, i) => {
              const company = getCompanyById(j.companyId);
              const href = j.applyUrl ?? (j.applyEmail ? `mailto:${j.applyEmail}` : null);
              return (
                <li key={j.id} className="border-b border-white/10">
                  <Reveal delay={i * 60} className="grid gap-4 py-7 md:grid-cols-12 md:items-center">
                    <div className="md:col-span-6">
                      <h2 className="text-2xl font-medium tracking-tight">{tr(j.title, locale)}</h2>
                      {company ? (
                        <Link href={`/companies/${company.slug}`} className="mt-1 inline-block text-sm text-paper/55 hover:text-paper">
                          {company.name}
                        </Link>
                      ) : null}
                    </div>
                    <div className="text-sm text-paper/60 md:col-span-4">
                      {j.summary ? <p>{tr(j.summary, locale)}</p> : null}
                      {j.type || j.location ? <p className="mt-1 text-paper/45">{[j.type ? t(`types.${j.type}`) : null, j.location].filter(Boolean).join(" · ")}</p> : null}
                    </div>
                    <div className="md:col-span-2 md:justify-self-end">
                      {href ? (
                        <ButtonLink href={href} external variant="light">
                          {j.applyUrl ? t("viewDetail") : t("apply")}
                        </ButtonLink>
                      ) : null}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        ) : null}
        {jobs.length ? <p className="mt-6 text-xs text-paper/45">{t("source")}</p> : (
          <Reveal className="rounded-[1.75rem] border border-dashed border-white/15 p-8 sm:p-12">
            <p className="headline text-[clamp(1.8rem,4vw,3rem)]">{t("empty")}</p>
            <p className="mt-4 max-w-xl text-paper/60">{t("emptyBody")}</p>
          </Reveal>
        )}
      </section>
    </>
  );
}
