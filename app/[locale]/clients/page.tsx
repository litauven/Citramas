import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import Image from "next/image";
import { getClients, getCompanies, tr } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { LogoTile } from "@/components/companies/LogoTile";
import { PageHero } from "@/components/ui/PageHero";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({ params }: PageProps<"/[locale]/clients">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "clients", "/clients");
}

export default async function ClientsPage({ params }: PageProps<"/[locale]/clients">) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations("clients");
  const clients = getClients();
  const p = await getTranslations("profile");
  const collages = getCompanies().filter((c) => c.clientsImage);

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} watermark="Clients" />
      <section className="container-x py-20 sm:py-28">
        {collages.map((c) => (
          <Reveal key={c.id} className="mb-16 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-accent-300">{t("servedBy", { company: c.name })}</p>
              <Link href={`/companies/${c.slug}`} className="mt-4 block text-3xl font-medium tracking-tight hover:underline">
                {c.name}
              </Link>
            </div>
            <div className="overflow-hidden rounded-[1.75rem] bg-white p-6 lg:col-span-8">
              <Image src={c.clientsImage!} alt={p("clientsImageAlt", { company: c.name })} width={970} height={2202} quality={85} sizes="(min-width: 1024px) 60vw, 100vw" className="mx-auto h-auto w-full max-w-2xl" />
            </div>
          </Reveal>
        ))}
        {clients.length ? (
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {clients.map((c, i) => (
              <li key={`${c.company.id}-${c.name}`}>
                <Reveal delay={(i % 4) * 70} className="flex h-full flex-col items-center gap-3 rounded-3xl border border-white/10 p-6 text-center">
                  <LogoTile logo={c.logo} name={c.name} className="text-paper" />
                  <p className="font-medium">{c.name}</p>
                  {c.industry ? <p className="text-xs text-paper/55">{tr(c.industry, locale)}</p> : null}
                  <Link href={`/companies/${c.company.slug}`} className="mt-auto text-xs text-paper/50 hover:text-paper hover:underline">
                    {t("servedBy", { company: c.company.name })}
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : collages.length ? null : (
          <Reveal className="flex flex-col items-start gap-4 rounded-3xl border border-dashed border-white/15 p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-paper/60">{t("empty")}</p>
            <Pending />
          </Reveal>
        )}
      </section>
    </>
  );
}
