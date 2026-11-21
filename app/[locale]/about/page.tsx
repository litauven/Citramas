import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getHeadOffice, relationshipCounts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { GroupStructure } from "@/components/companies/GroupStructure";
import { HistorySection, ValuesSection } from "@/components/sections/HomeSections";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "about", "/about");
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const rel = await getTranslations("relationship");
  const hint = await getTranslations("relationshipHint");
  const common = await getTranslations("common");
  const home = await getTranslations("home");
  const ho = getHeadOffice();
  const counts = relationshipCounts();

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} watermark="Group" image="/images/about-glass-facade.jpg" />

      <section className="container-x grid gap-12 py-24 sm:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-accent-300">{t("roleLabel")}</p>
          <p className="mt-5 text-2xl font-light leading-snug tracking-tight sm:text-3xl">{t("roleBody")}</p>
          <ButtonLink href={`/companies/${ho.slug}`} className="mt-8">
            {common("viewProfile")}
          </ButtonLink>
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="eyebrow mb-6 text-paper/45">{home("structureTitle")}</p>
          <GroupStructure />
        </div>
      </section>

      <section className="border-t border-white/10 py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-accent-300">{t("relationshipsLabel")}</p>
            <p className="mt-5 text-paper/65">{t("relationshipsBody")}</p>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {counts.map(({ type, count }, i) => (
              <li key={type}>
                <Reveal delay={i * 80} className="flex h-full flex-col rounded-3xl border border-white/10 p-6">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-paper/40">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-3xl font-light">{count}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-medium">{rel(type)}</h3>
                  <p className="mt-2 text-sm text-paper/55">{hint(type)}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x pb-24 sm:pb-32">
        <Reveal className="flex flex-col gap-4 rounded-3xl border border-dashed border-white/15 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow text-accent-300">{t("visionLabel")}</p>
            <p className="mt-3 max-w-xl text-paper/65">{t("visionBody")}</p>
          </div>
          <Pending />
        </Reveal>
      </section>

      <HistorySection />
      <div className="pb-3">
        <ValuesSection />
      </div>
    </>
  );
}

