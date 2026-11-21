import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { alternates } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import {
  AreasSection,
  BrandsSection,
  ClientsSection,
  CompaniesSection,
  ContactHeadOfficeSection,
  HistorySection,
  IntroSection,
  NewsSection,
  ValuesSection,
} from "@/components/sections/HomeSections";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternates(locale as Locale, "/") };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <IntroSection />
      <HistorySection />
      <CompaniesSection />
      <AreasSection />
      <BrandsSection />
      <ClientsSection />
      <ValuesSection />
      <NewsSection />
      <ContactHeadOfficeSection />
    </>
  );
}
