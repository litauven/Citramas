import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { toCardData } from "@/lib/cards";
import {
  formatAddress,
  getBrands,
  getBusinessAreas,
  getClients,
  getCompanies,
  getCompanyById,
  getCorporateValues,
  getFeaturedCompanies,
  getHeadOffice,
  getMilestones,
  getNews,
  primaryAddress,
  tr,
} from "@/lib/content";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { GroupStructure } from "@/components/companies/GroupStructure";
import { LogoTile } from "@/components/companies/LogoTile";
import { Parallax } from "@/components/motion/Parallax";
import { ScrollFill } from "@/components/motion/ScrollFill";
import { Arrow } from "@/components/ui/Arrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Marquee } from "@/components/ui/Marquee";
import { OrPending, Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pad = (n: number) => String(n).padStart(2, "0");

/* (2) Pengantar grup + struktur */
export function IntroSection() {
  const t = useTranslations("home");
  return (
    <section id="intro" className="container-x py-24 sm:py-32">
      <SectionHeading index="01" label={t("introLabel")} titleA={t("introTitleA")} titleB={t("introTitleB")} body={<p>{t("introBody")}</p>} />
      <div className="mt-16 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-paper/45">{t("structureTitle")}</p>
          <p className="mt-4 text-paper/60">{t("introNote")}</p>
        </Reveal>
        <div className="lg:col-span-8">
          <GroupStructure />
        </div>
      </div>
    </section>
  );
}

/* (3) Sejarah & milestone */
export function HistorySection() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;
  const items = getMilestones();
  return (
    <section id="history" className="relative overflow-hidden border-t border-white/10 py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading index="02" label={t("historyLabel")} titleA={t("historyTitleA")} titleB={t("historyTitleB")} />
            <Reveal delay={200}>
              <p className="mt-8 max-w-sm text-paper/60">{t("historyBody")}</p>
            </Reveal>
          </div>
        </div>
        <ol className="relative lg:col-span-6 lg:col-start-7">
          <div className="absolute bottom-0 left-[0.4rem] top-2 w-px bg-white/10" aria-hidden="true">
            <ScrollFill className="h-full w-px bg-accent-300" />
          </div>
          {items.map((m, i) => {
            const company = m.companyId ? getCompanyById(m.companyId) : null;
            return (
              <li key={i} className="relative pb-14 pl-12 last:pb-0">
                <span className="absolute left-0 top-2 size-[0.85rem] rounded-full border border-accent-300 bg-ink" aria-hidden="true" />
                <Reveal variant="right" delay={i * 60}>
                  <p className="headline text-[clamp(3rem,8vw,6rem)] text-paper/90">{m.year ?? <span className="text-paper/20">—— {pad(i + 1)}</span>}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <OrPending value={tr(m.title, locale)} className="text-lg" />
                    <span className="eyebrow text-paper/40">{company ? company.name : t("historyLabel")}</span>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* (4) Perusahaan kami */
export function CompaniesSection() {
  const t = useTranslations("home");
  const nav = useTranslations("nav");
  const locale = useLocale() as Locale;
  const list = getFeaturedCompanies(6).map((c) => toCardData(c, locale));
  return (
    <section id="companies" className="relative px-2 sm:px-3">
      <div className="rounded-[1.75rem] bg-ink-900/60 py-24 ring-1 ring-white/5 sm:rounded-[2.25rem] sm:py-32">
        <div className="container-x">
          <SectionHeading
            index="03"
            label={t("companiesLabel")}
            titleA={t("companiesTitleA")}
            titleB={t("companiesTitleB")}
            body={<p>{t("companiesBody")}</p>}
            aside={<ButtonLink href="/companies" variant="outline">{nav("companies")}</ButtonLink>}
          />
          <ul className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((c, i) => (
              <li key={c.id}>
                <Reveal delay={(i % 3) * 110} className="h-full">
                  <CompanyCard company={c} index={i} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* (5) Area bisnis */
export function AreasSection() {
  const t = useTranslations("home");
  const common = useTranslations("common");
  const locale = useLocale() as Locale;
  const areas = getBusinessAreas();
  return (
    <section id="business-areas" className="container-x py-24 sm:py-32">
      <SectionHeading index="04" label={t("areasLabel")} titleA={t("areasTitleA")} titleB={t("areasTitleB")} body={<p>{t("areasBody")}</p>} />
      <ul className="mt-16 border-t border-white/10">
        {areas.map((a, i) => (
          <li key={a.id}>
            <Reveal variant="fade" delay={i * 80}>
              <Link
                href={`/business-areas#${a.id}`}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden border-b border-white/10 py-7 sm:gap-8 sm:py-9"
              >
                <span aria-hidden="true" className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-y-100" />
                <span className="eyebrow pl-1 text-paper/45 transition-colors group-hover:text-paper/80 sm:pl-4">{pad(i + 1)}</span>
                <span className="min-w-0">
                  {a.title ? (
                    <span className="headline block text-[clamp(1.8rem,5vw,4rem)] transition-transform duration-700 group-hover:translate-x-3">{tr(a.title, locale)}</span>
                  ) : (
                    <span className="flex flex-wrap items-center gap-4">
                      <span className="headline text-[clamp(1.8rem,5vw,4rem)] text-paper/25">{t("areasLabel")} {pad(i + 1)}</span>
                      <Pending />
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-4 pr-1 sm:pr-4">
                  {a.image ? (
                    <span className="relative hidden h-16 w-24 overflow-hidden rounded-xl md:block lg:h-20 lg:w-32">
                      <Image src={a.image} alt="" fill sizes="128px" quality={70} className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-110" />
                    </span>
                  ) : null}
                  <span className="hidden text-sm text-paper/55 sm:inline">{common("companiesCount", { count: a.companies.length })}</span>
                  <span className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                    <Arrow className="arrow-shift size-4" />
                  </span>
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* (6) Merek & mitra strategis */
export function BrandsSection() {
  const t = useTranslations("home");
  const b = useTranslations("brands");
  const nav = useTranslations("nav");
  const brands = getBrands();
  return (
    <section id="brands" className="border-t border-white/10 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="05"
          label={t("brandsLabel")}
          titleA={t("brandsTitleA")}
          titleB={t("brandsTitleB")}
          body={<p>{t("brandsBody")}</p>}
          aside={<ButtonLink href="/brands" variant="outline">{nav("brands")}</ButtonLink>}
        />
        <ul className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
          {brands.length
            ? brands.slice(0, 8).map((br, i) => (
                <li key={`${br.company.id}-${br.name}`} className="bg-ink">
                  <Reveal variant="fade" delay={i * 60} className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                    <LogoTile logo={br.logo} name={br.name} size="sm" className="text-paper" />
                    <p className="font-medium">{br.name}</p>
                    <p className="text-xs text-paper/50">{b("by", { company: br.company.name })}</p>
                  </Reveal>
                </li>
              ))
            : Array.from({ length: 4 }, (_, i) => (
                <li key={i} className="bg-ink">
                  <Reveal variant="fade" delay={i * 60} className="flex h-full min-h-44 flex-col items-center justify-center gap-3 p-8 text-center">
                    <LogoTile logo={null} name={`${t("brandsLabel")} ${i + 1}`} size="sm" className="text-paper" />
                  </Reveal>
                </li>
              ))}
        </ul>
        {!brands.length ? <p className="mt-6 text-sm text-paper/50">{b("empty")}</p> : null}
      </div>
    </section>
  );
}

/* (7) Klien */
export function ClientsSection() {
  const t = useTranslations("home");
  const c = useTranslations("clients");
  const p = useTranslations("profile");
  const nav = useTranslations("nav");
  const clients = getClients();
  const collages = getCompanies().filter((co) => co.clientsImage);
  return (
    <section id="clients" className="overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="06"
          label={t("clientsLabel")}
          titleA={t("clientsTitleA")}
          titleB={t("clientsTitleB")}
          body={<p>{t("clientsBody")}</p>}
          aside={<ButtonLink href="/clients" variant="outline">{nav("clients")}</ButtonLink>}
        />
      </div>
      {clients.length ? (
        <Marquee className="mt-16 border-y border-white/10 py-8">
          {clients.map((cl) => (
            <span key={`${cl.company.id}-${cl.name}`} className="flex items-center gap-4 px-10 text-2xl font-light text-paper/80">
              {cl.name}
              <span className="eyebrow text-paper/35">{cl.company.name}</span>
            </span>
          ))}
        </Marquee>
      ) : collages.length ? (
        <div className="container-x mt-16 grid gap-5">
          {collages.map((co) => (
            <Reveal key={co.id} className="relative overflow-hidden rounded-[1.75rem] bg-white">
              <Link href="/clients" className="group block">
                <div className="relative h-[22rem] overflow-hidden sm:h-[26rem]">
                  <Image
                    src={co.clientsImage!}
                    alt={p("clientsImageAlt", { company: co.name })}
                    width={970}
                    height={2202}
                    quality={85}
                    sizes="(min-width: 768px) 70vw, 100vw"
                    className="mx-auto h-auto w-full max-w-3xl transition-transform duration-[2.5s] ease-[var(--ease-out-soft)] group-hover:-translate-y-24"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-ink/10 px-6 py-4 text-ink">
                  <span className="text-sm">{c("servedBy", { company: co.name })}</span>
                  <span className="grid size-10 place-items-center rounded-full bg-ink text-paper">
                    <Arrow className="arrow-shift size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="container-x">
          <Reveal className="mt-16 flex flex-col items-start gap-4 rounded-3xl border border-dashed border-white/15 p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-paper/60">{c("empty")}</p>
            <Pending />
          </Reveal>
        </div>
      )}
    </section>
  );
}

/* (8) Nilai korporat */
export function ValuesSection() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;
  const values = getCorporateValues();
  return (
    <section id="values" className="px-2 sm:px-3">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-paper py-24 text-ink sm:rounded-[2.25rem] sm:py-32">
        <Parallax speed={-0.25} className="pointer-events-none absolute -right-10 top-10 select-none">
          <span aria-hidden="true" className="headline block text-[clamp(8rem,26vw,24rem)] font-medium text-ink/[0.04]">Values</span>
        </Parallax>
        <div className="container-x relative">
          <SectionHeading tone="light" index="07" label={t("valuesLabel")} titleA={t("valuesTitleA")} titleB={t("valuesTitleB")} />
          <ol className="mt-16 border-t border-ink/15">
            {values.map((v, i) => (
              <li key={i} className="border-b border-ink/15">
                <Reveal variant="up" delay={i * 80} className="group grid gap-4 py-8 sm:grid-cols-12 sm:items-baseline sm:py-10">
                  <span className="eyebrow text-ink/45 sm:col-span-1">{pad(i + 1)}</span>
                  <h3 className="headline text-[clamp(2rem,5.5vw,4.5rem)] transition-colors duration-500 group-hover:text-accent sm:col-span-6">{tr(v.title, locale)}</h3>
                  <div className="sm:col-span-5">
                    <p className="text-ink/65">{tr(v.body, locale)}</p>
                    {v.status === "draft" ? <Pending kind="draft" className="mt-3 !border-accent/50 !text-accent" /> : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* (9) Berita */
export function NewsSection() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;
  const items = getNews().slice(0, 3);
  const fmt = new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <section id="news" className="container-x py-24 sm:py-32">
      <SectionHeading index="08" label={t("newsLabel")} titleA={t("newsTitleA")} titleB={t("newsTitleB")} />
      <ul className="mt-16 grid gap-5 md:grid-cols-3">
        {items.length
          ? items.map((n, i) => {
              const company = n.companyId ? getCompanyById(n.companyId) : null;
              const body = (
                <>
                  <p className="eyebrow text-paper/45">
                    {fmt.format(new Date(n.date))} · {company ? company.name : "Citramas Group"}
                  </p>
                  <h3 className="mt-4 text-xl font-medium tracking-tight">{tr(n.title, locale)}</h3>
                  <p className="mt-3 text-sm text-paper/60">{tr(n.excerpt, locale)}</p>
                </>
              );
              return (
                <li key={n.id}>
                  <Reveal delay={i * 100} className="h-full rounded-3xl border border-white/10 p-6">
                    {n.url ? (
                      <a href={n.url} target="_blank" rel="noopener noreferrer" className="block">
                        {body}
                      </a>
                    ) : (
                      body
                    )}
                  </Reveal>
                </li>
              );
            })
          : Array.from({ length: 3 }, (_, i) => (
              <li key={i}>
                <Reveal delay={i * 100} className="flex h-full min-h-56 flex-col justify-between rounded-3xl border border-dashed border-white/15 p-6">
                  <div className="space-y-3" aria-hidden="true">
                    <div className="h-2.5 w-24 rounded-full bg-white/10" />
                    <div className="h-4 w-4/5 rounded-full bg-white/10" />
                    <div className="h-4 w-3/5 rounded-full bg-white/10" />
                  </div>
                  <Pending className="self-start" />
                </Reveal>
              </li>
            ))}
      </ul>
      {!items.length ? <p className="mt-6 text-sm text-paper/50">{t("newsEmpty")}</p> : null}
    </section>
  );
}

/* (10) Kontak kantor pusat */
export function ContactHeadOfficeSection() {
  const t = useTranslations("home");
  const p = useTranslations("profile");
  const common = useTranslations("common");
  const ho = getHeadOffice();
  const addr = primaryAddress(ho);
  return (
    <section id="contact" className="px-2 pb-3 sm:px-3">
      <div className="grain relative isolate overflow-hidden rounded-[1.75rem] py-24 sm:rounded-[2.25rem] sm:py-32">
        <Parallax speed={0.25} className="absolute inset-0 -z-10">
          <div className="absolute -inset-[10%]">
            <Image src="/images/city-night.jpg" alt="" fill quality={70} sizes="100vw" className="object-cover" />
          </div>
        </Parallax>
        <div className="field absolute -inset-[20%] -z-10 opacity-50 mix-blend-multiply" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" aria-hidden="true" />
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading index="09" label={t("contactLabel")} titleA={t("contactTitleA")} titleB={t("contactTitleB")} />
            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-paper/75">{t("contactBody")}</p>
              <ButtonLink href="/contact" className="mt-8">
                {t("contactCta")}
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal variant="right" className="lg:col-span-5">
            <div className="glass rounded-[1.75rem] p-6 sm:p-8">
              <p className="eyebrow text-paper/60">{common("headOffice")}</p>
              <p className="mt-3 text-2xl font-medium tracking-tight">{ho.name}</p>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="eyebrow text-paper/45">{p("offices")}</dt>
                  <dd className="mt-1">
                    <OrPending value={addr ? formatAddress(addr) : null} />
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-paper/45">{p("email")}</dt>
                  <dd className="mt-1">{ho.contact.email ? <a href={`mailto:${ho.contact.email}`} className="hover:underline">{ho.contact.email}</a> : <Pending />}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-paper/45">{p("phone")}</dt>
                  <dd className="mt-1">{ho.contact.phone ? <a href={`tel:${ho.contact.phone.replace(/\s/g, "")}`} className="hover:underline">{ho.contact.phone}</a> : <Pending />}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
        <RotatingBadge text={t("badge")} className="absolute bottom-8 right-8 hidden text-paper/70 xl:grid" />
      </div>
    </section>
  );
}
