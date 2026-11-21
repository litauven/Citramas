import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatAddress, getGroupCompanies, getHeadOffice, primaryAddress, tr } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { LogoTile } from "@/components/companies/LogoTile";
import { RelationshipBadge } from "@/components/companies/RelationshipBadge";
import { ArrowUpRight } from "@/components/ui/Arrow";
import { PageHero } from "@/components/ui/PageHero";
import { OrPending, Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "contact", "/contact");
}

function ContactLine({ label, value, href }: { label: string; value: string | null; href: string | null }) {
  return (
    <div>
      <dt className="eyebrow text-paper/45">{label}</dt>
      <dd className="mt-1.5">{value && href ? <a href={href} className="hover:underline">{value}</a> : <Pending />}</dd>
    </div>
  );
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations("contact");
  const p = await getTranslations("profile");
  const ho = getHeadOffice();
  const companies = getGroupCompanies();

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} watermark="Contact" image="/images/contact-lobby.jpg" />

      <section className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-accent-300">{t("hoTitle")}</p>
          {ho.logo ? <LogoTile logo={ho.logo} name={ho.name} size="lg" className="mt-5" /> : null}
          <h2 className="mt-5 text-3xl font-medium tracking-tight">{ho.name}</h2>
          <div className="mt-4">
            <RelationshipBadge type={ho.relationshipType} verified={ho.relationshipVerified} />
          </div>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {ho.address.map((a, i) => (
              <div key={i} className={`rounded-[1.75rem] p-6 ${a.isPrimary ? "bg-paper text-ink" : "border border-white/10"}`}>
                <p className="eyebrow text-ink/50">{tr(a.label, locale)}</p>
                <p className="mt-3 text-xl font-light">
                  <OrPending value={formatAddress(a)} />
                </p>
                {a.phone ? <p className="mt-4 text-sm opacity-70">T. {a.phone}</p> : null}
                {a.fax ? <p className="text-sm opacity-70">F. {a.fax}</p> : null}
                {a.mapUrl ? (
                  <a href={a.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm hover:underline">
                    {p("openMap")} <ArrowUpRight className="size-3.5" />
                  </a>
                ) : null}
              </div>
            ))}
            <dl className="grid gap-5 rounded-[1.75rem] border border-white/10 p-6 sm:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
              <ContactLine label={p("email")} value={ho.contact.email} href={ho.contact.email ? `mailto:${ho.contact.email}` : null} />
              <ContactLine label={p("phone")} value={ho.contact.phone} href={ho.contact.phone ? `tel:${ho.contact.phone.replace(/\s/g, "")}` : null} />
              <ContactLine label={p("whatsapp")} value={ho.contact.whatsapp} href={ho.contact.whatsapp ? `https://wa.me/${ho.contact.whatsapp.replace(/\D/g, "")}` : null} />
              <ContactLine label={p("fax")} value={ho.contact.fax} href={ho.contact.fax ? `tel:${ho.contact.fax.replace(/\s/g, "")}` : null} />
            </dl>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-white/10 py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <h2 className="headline text-[clamp(2rem,5vw,4rem)]">{t("directoryTitle")}</h2>
            <p className="mt-4 text-paper/60">{t("directoryBody")}</p>
          </Reveal>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {companies.map((c, i) => {
              const addr = primaryAddress(c);
              return (
                <li key={c.id}>
                  <Reveal delay={(i % 3) * 90} className="flex h-full flex-col rounded-3xl border border-white/10 p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <RelationshipBadge type={c.relationshipType} verified={c.relationshipVerified} />
                      {c.isPlaceholder ? <Pending kind="placeholder" /> : null}
                    </div>
                    <Link href={`/companies/${c.slug}`} className="mt-4 text-xl font-medium tracking-tight hover:underline">
                      {c.name}
                    </Link>
                    <dl className="mt-5 space-y-3 text-sm">
                      <div>
                        <dt className="eyebrow text-paper/45">{t("address")}</dt>
                        <dd className="mt-1"><OrPending value={addr ? formatAddress(addr) : null} /></dd>
                      </div>
                      <ContactLine label={p("email")} value={c.contact.email} href={c.contact.email ? `mailto:${c.contact.email}` : null} />
                      <ContactLine label={p("phone")} value={c.contact.phone} href={c.contact.phone ? `tel:${c.contact.phone.replace(/\s/g, "")}` : null} />
                    </dl>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
