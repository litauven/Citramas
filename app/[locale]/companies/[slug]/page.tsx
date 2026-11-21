import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { toCardData } from "@/lib/cards";
import { companyDescription, formatAddress, getAreaById, getCareers, getCompanies, getCompanyBySlug, getNews, tr } from "@/lib/content";
import { alternates } from "@/lib/seo";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { CoverField } from "@/components/companies/CoverField";
import { LogoTile } from "@/components/companies/LogoTile";
import { RelationshipBadge } from "@/components/companies/RelationshipBadge";
import { RevealText } from "@/components/motion/RevealText";
import { ArrowUpRight } from "@/components/ui/Arrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { OrPending, Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getCompanies().map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/companies/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = getCompanyBySlug(slug);
  if (!c) return {};
  return {
    title: c.name,
    description: companyDescription(c, locale as Locale) ?? undefined,
    alternates: alternates(locale as Locale, `/companies/${c.slug}`),
    robots: c.isPlaceholder ? { index: false } : undefined,
  };
}

function Block({ id, index, title, children }: { id: string; index: number; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-white/10 py-12 sm:py-16">
      <Reveal className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow text-paper/40">{String(index).padStart(2, "0")}</p>
          <h2 id={`${id}-title`} className="mt-2 text-2xl font-medium tracking-tight">
            {title}
          </h2>
        </div>
        <div className="md:col-span-8">{children}</div>
      </Reveal>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  if (!items.length) return <Pending />;
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((s) => (
        <li key={s} className="flex items-start gap-3 rounded-2xl border border-white/10 px-4 py-3">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-300" aria-hidden="true" />
          {s}
        </li>
      ))}
    </ul>
  );
}

export default async function CompanyProfilePage({ params }: PageProps<"/[locale]/companies/[slug]">) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const c = getCompanyBySlug(slug);
  if (!c) notFound();

  const t = await getTranslations("profile");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const brandsT = await getTranslations("brands");
  const careersT = await getTranslations("careers");
  const description = companyDescription(c, locale);
  const news = getNews(c.id);
  const jobs = getCareers(c.id);
  const others = getCompanies()
    .filter((o) => o.id !== c.id)
    .slice(0, 3)
    .map((o) => toCardData(o, locale));
  const fmt = new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  const sections = [
    { id: "intro", label: t("intro") },
    { id: "vision", label: `${t("vision")} & ${t("missions")}` },
    { id: "activities", label: t("activities") },
    { id: "services", label: t("services") },
    { id: "brands", label: t("brands") },
    { id: "projects", label: t("projects") },
    { id: "clients", label: t("clients") },
    { id: "dna", label: t("dna") },
    { id: "contact", label: t("contact") },
    { id: "offices", label: t("offices") },
    { id: "news", label: t("news") },
    { id: "careers", label: t("careers") },
  ];
  const n = (id: string) => sections.findIndex((s) => s.id === id) + 1;

  return (
    <>
      {/* Hero profil */}
      <section className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem]">
          <CoverField seed={c.slug} image={c.coverImage} alt={c.name} preload className="absolute inset-0 -z-10" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/20" aria-hidden="true" />
          <div className="container-x pb-12 pt-36 sm:pb-16 sm:pt-44">
            <nav aria-label="Breadcrumb" className="animate-fade-up">
              <ol className="eyebrow flex flex-wrap items-center gap-2 text-paper/55">
                <li>
                  <Link href="/" className="hover:text-paper">{nav("home")}</Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <Link href="/companies" className="hover:text-paper">{nav("companies")}</Link>
                </li>
                <li className="flex items-center gap-2 text-paper/85" aria-current="page">
                  <span aria-hidden="true">/</span>
                  {c.name}
                </li>
              </ol>
            </nav>

            <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
                <Reveal variant="scale">
                  <LogoTile logo={c.logo} name={c.name} size="lg" className={c.logo ? "shadow-2xl" : "glass text-paper"} />
                </Reveal>
                <div>
                  <div className="animate-fade-up flex flex-wrap items-center gap-2">
                    <RelationshipBadge type={c.relationshipType} verified={c.relationshipVerified} className="glass" />
                    {c.isPlaceholder ? <Pending kind="placeholder" className="bg-ink/60" /> : null}
                  </div>
                  <RevealText as="h1" text={c.name} className="headline mt-5 max-w-4xl text-[clamp(2.2rem,6.5vw,5.5rem)]" />
                  <p className="animate-fade-up mt-4 text-sm text-paper/60" style={{ animationDelay: "400ms" }}>
                    <Link href="/about" className="underline-offset-4 hover:underline">{t("groupMember")}</Link>
                  </p>
                </div>
              </div>
              <div className="animate-fade-up flex flex-wrap gap-3" style={{ animationDelay: "500ms" }}>
                {c.website ? (
                  <ButtonLink href={c.website} external>
                    {common("visitWebsite")}
                  </ButtonLink>
                ) : null}
                <ButtonLink href="/companies" variant="outline">
                  {common("backTo", { page: nav("companies") })}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {c.isPlaceholder ? (
        <div className="container-x mt-6">
          <p className="rounded-2xl border border-dashed border-pending/50 px-5 py-4 text-sm text-pending">{common("placeholderNote")}</p>
        </div>
      ) : null}

      <div className="container-x grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label={t("onThisPage")} className="sticky top-28">
            <p className="eyebrow text-paper/40">{t("onThisPage")}</p>
            <ol className="mt-4 space-y-1 border-l border-white/10">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-sm text-paper/60 transition-colors hover:border-accent-300 hover:text-paper">
                    <span className="font-mono text-xs text-paper/35">{String(i + 1).padStart(2, "0")}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="lg:col-span-9">
          <Block id="intro" index={n("intro")} title={t("intro")}>
            {description ? <p className="text-xl font-light leading-relaxed text-paper/85">{description}</p> : <Pending />}
            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 text-sm">
              <div>
                <dt className="eyebrow text-paper/40">{t("founded")}</dt>
                <dd className="mt-1"><OrPending value={c.operatingSince} /></dd>
              </div>
              <div>
                <dt className="eyebrow text-paper/40">{nav("businessAreas")}</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {c.businessSector.length
                    ? c.businessSector.map((id) => (
                        <Link key={id} href={`/business-areas#${id}`} className="hover:underline">
                          <OrPending value={tr(getAreaById(id)?.title, locale)} />
                        </Link>
                      ))
                    : <Pending />}
                </dd>
              </div>
            </dl>
          </Block>

          <Block id="vision" index={n("vision")} title={`${t("vision")} & ${t("missions")}`}>
            <p className="eyebrow text-paper/40">{t("vision")}</p>
            {c.vision ? <p className="mt-3 text-2xl font-light leading-snug tracking-tight sm:text-3xl">{tr(c.vision, locale)}</p> : <Pending className="mt-3" />}
            <p className="eyebrow mt-10 text-paper/40">{t("missions")}</p>
            {c.missions.length ? (
              <ol className="mt-4 grid gap-3 sm:grid-cols-3">
                {c.missions.map((m, i) => (
                  <li key={i} className="rounded-2xl border border-white/10 p-5">
                    <span className="font-mono text-xs text-accent-300">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-3 font-medium">{tr(m.title, locale)}</p>
                    <p className="mt-2 text-sm text-paper/60">{tr(m.body, locale)}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <Pending className="mt-3" />
            )}
          </Block>

          <Block id="activities" index={n("activities")} title={t("activities")}>
            <List items={c.businessActivities.map((a) => a[locale])} />
          </Block>

          <Block id="services" index={n("services")} title={t("services")}>
            <List items={c.services.map((a) => a[locale])} />
          </Block>

          <Block id="brands" index={n("brands")} title={t("brands")}>
            {c.brands.length ? (
              <ul className="grid gap-3 sm:grid-cols-2">
                {c.brands.map((b) => (
                  <li key={b.name} className="flex items-center gap-4 rounded-2xl border border-white/10 p-4">
                    <LogoTile logo={b.logo} name={b.name} size="sm" className="text-paper" />
                    <div>
                      <p className="font-medium">{b.name}</p>
                      <p className="text-xs text-paper/50">{brandsT(b.relation)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Pending />
            )}
          </Block>

          <Block id="projects" index={n("projects")} title={t("projects")}>
            {c.projects.length ? (
              <ul className="grid gap-3">
                {c.projects.map((p) => (
                  <li key={p.title.en} className="rounded-2xl border border-white/10 p-5">
                    <p className="eyebrow text-paper/40">{[p.year, p.client, p.location].filter(Boolean).join(" · ")}</p>
                    <p className="mt-2 text-lg font-medium">{tr(p.title, locale)}</p>
                    {p.description ? <p className="mt-2 text-sm text-paper/60">{tr(p.description, locale)}</p> : null}
                  </li>
                ))}
              </ul>
            ) : (
              <Pending />
            )}
          </Block>

          <Block id="clients" index={n("clients")} title={t("clients")}>
            {c.clients.length ? <List items={c.clients.map((cl) => cl.name)} /> : null}
            {c.clientsImage ? (
              <div className={`overflow-hidden rounded-2xl bg-white p-4 ${c.clients.length ? "mt-6" : ""}`}>
                <Image src={c.clientsImage} alt={t("clientsImageAlt", { company: c.name })} width={970} height={2202} quality={85} sizes="(min-width: 1024px) 50vw, 100vw" className="mx-auto h-auto w-full max-w-xl" />
              </div>
            ) : null}
            {!c.clients.length && !c.clientsImage ? <Pending /> : null}
          </Block>

          <Block id="dna" index={n("dna")} title={t("dna")}>
            {c.values.length ? (
              <ul className="grid gap-4 sm:grid-cols-2">
                {c.values.map((v) => (
                  <li key={v.title} className="group/v overflow-hidden rounded-2xl border border-white/10">
                    {v.image ? (
                      <div className="relative aspect-[490/410] overflow-hidden">
                        <Image src={v.image} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" quality={70} className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover/v:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" aria-hidden="true" />
                        <p className="absolute bottom-4 left-5 right-5 text-xl font-medium tracking-tight">{v.title}</p>
                      </div>
                    ) : (
                      <p className="px-5 pt-5 text-xl font-medium">{v.title}</p>
                    )}
                    <p className="p-5 text-sm text-paper/65">{tr(v.body, locale)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <Pending />
            )}
          </Block>

          <Block id="contact" index={n("contact")} title={t("contact")}>
            <dl className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["email", c.contact.email, c.contact.email ? `mailto:${c.contact.email}` : null],
                  ["phone", c.contact.phone, c.contact.phone ? `tel:${c.contact.phone.replace(/\s/g, "")}` : null],
                  ["whatsapp", c.contact.whatsapp, c.contact.whatsapp ? `https://wa.me/${c.contact.whatsapp.replace(/\D/g, "")}` : null],
                  ["fax", c.contact.fax, c.contact.fax ? `tel:${c.contact.fax.replace(/\s/g, "")}` : null],
                ] as const
              ).map(([k, v, href]) => (
                <div key={k} className="rounded-2xl border border-white/10 p-4">
                  <dt className="eyebrow text-paper/40">{t(k)}</dt>
                  <dd className="mt-2 break-words">{v && href ? <a href={href} className="hover:underline">{v}</a> : <Pending />}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block id="offices" index={n("offices")} title={t("offices")}>
            {c.address.length ? (
              <ul className="grid gap-3 sm:grid-cols-2">
                {c.address.map((a, i) => (
                  <li key={i} className="rounded-2xl border border-white/10 p-5">
                    <p className="eyebrow text-accent-300">{tr(a.label, locale)}</p>
                    <p className="mt-3 text-paper/85"><OrPending value={formatAddress(a)} /></p>
                    {a.phone || a.fax ? (
                      <p className="mt-3 space-y-1 text-sm text-paper/60">
                        {a.phone ? <span className="block">T. {a.phone}</span> : null}
                        {a.fax ? <span className="block">F. {a.fax}</span> : null}
                      </p>
                    ) : null}
                    {a.mapUrl ? (
                      <a href={a.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-paper/70 hover:text-paper">
                        {t("openMap")} <ArrowUpRight className="size-3.5" />
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <Pending />
            )}
          </Block>

          <Block id="news" index={n("news")} title={t("news")}>
            {news.length ? (
              <ul className="grid gap-3">
                {news.map((item) => (
                  <li key={item.id} className="rounded-2xl border border-white/10 p-5">
                    <p className="eyebrow text-paper/40">{fmt.format(new Date(item.date))}</p>
                    <p className="mt-2 text-lg font-medium">{tr(item.title, locale)}</p>
                    <p className="mt-1 text-sm text-paper/60">{tr(item.excerpt, locale)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-paper/55">{common("empty")}</p>
            )}
          </Block>

          <Block id="careers" index={n("careers")} title={t("careers")}>
            {jobs.length ? (
              <ul className="grid gap-3">
                {jobs.map((j) => (
                  <li key={j.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 p-5">
                    <div>
                      <p className="font-medium">{tr(j.title, locale)}</p>
                      {j.summary ? <p className="mt-1 max-w-xl text-sm text-paper/55">{tr(j.summary, locale)}</p> : null}
                    </div>
                    {j.applyUrl ? (
                      <a href={j.applyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm underline-offset-4 hover:underline">
                        {careersT("viewDetail")} <ArrowUpRight className="size-3.5" />
                      </a>
                    ) : (
                      <Link href="/careers" className="text-sm underline-offset-4 hover:underline">{nav("careers")}</Link>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-paper/55">{t("noCareers")}</p>
            )}
          </Block>
          {c.source ? (
            <p className="border-t border-white/10 pt-6 text-xs text-paper/45">
              {t("source")}:{" "}
              <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-paper">
                {t("sourceLink")}
              </a>
            </p>
          ) : null}
        </div>
      </div>

      {others.length ? (
        <section className="border-t border-white/10 py-20 sm:py-28">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="headline text-[clamp(2rem,5vw,4rem)]">{t("otherCompanies")}</h2>
              <ButtonLink href="/companies" variant="outline">{common("allCompanies")}</ButtonLink>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {others.map((o, i) => (
                <li key={o.id}>
                  <Reveal delay={i * 100} className="h-full">
                    <CompanyCard company={o} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
