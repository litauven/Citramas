import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { toCardData } from "@/lib/cards";
import { getCompanies } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { CompanyDirectory } from "@/components/companies/CompanyDirectory";
import { PageHero } from "@/components/ui/PageHero";

export async function generateMetadata({ params }: PageProps<"/[locale]/companies">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "companies", "/companies");
}

export default async function CompaniesPage({ params }: PageProps<"/[locale]/companies">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("companies");
  const companies = getCompanies().map((c) => toCardData(c, locale as Locale));
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} watermark="Companies" />
      <section className="container-x py-20 sm:py-28">
        <CompanyDirectory companies={companies} />
      </section>
    </>
  );
}
