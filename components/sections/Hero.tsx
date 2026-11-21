import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { getBusinessAreas, getCompanies, getHeadOffice } from "@/lib/content";
import { CountUp } from "@/components/motion/CountUp";
import { Parallax } from "@/components/motion/Parallax";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Marquee } from "@/components/ui/Marquee";
import { Pending } from "@/components/ui/Pending";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { RelationshipBadge } from "@/components/companies/RelationshipBadge";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;
  const ho = getHeadOffice();
  const verifiedCompanies = getCompanies().filter((c) => !c.isPlaceholder).length;
  const verifiedAreas = getBusinessAreas().filter((a) => a.title).length;
  const lines = [t("heroLine1"), t("heroLine2"), t("heroLine3")];

  return (
    <section aria-labelledby="hero-title" className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="grain relative isolate flex min-h-[calc(100svh-1rem)] flex-col overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem]">
        {/* Latar: bidang gradien bergerak + parallax (pengganti foto) */}
        <Parallax speed={0.35} className="absolute inset-0 -z-10">
          <div className="absolute -inset-[8%]">
            <Image
              src="/images/hero-skyscrapers.jpg"
              alt=""
              fill
              preload
              quality={85}
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="field animate-drift absolute -inset-[15%] opacity-60 mix-blend-multiply" />
        </Parallax>
        <div className="lines absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/30" aria-hidden="true" />

        <div className="flex flex-1 flex-col justify-end px-5 pb-8 pt-32 sm:px-8 lg:px-12 lg:pb-12">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow animate-fade-up text-paper/70">{t("heroEyebrow")}</p>
              <h1 id="hero-title" className="headline mt-6 text-[clamp(2rem,9vw,4.75rem)] lg:text-[clamp(3.5rem,6vw,7.25rem)]">
                {lines.map((line, i) => (
                  <span key={i} className={`line-mask ${i === 1 ? "text-paper/90 sm:pl-[0.5em]" : ""}`}>
                    <span style={{ animationDelay: `${150 + i * 140}ms` }}>
                      {i === 1 ? <span aria-hidden="true" className="mr-[0.15em] text-accent-300">→</span> : null}
                      {line}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
              <Link
                href={`/companies/${ho.slug}`}
                className="glass animate-float group block w-full max-w-sm rounded-3xl p-5 transition-colors hover:border-white/30"
                style={{ animationDelay: "-2s" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="eyebrow text-paper/60">{t("heroHoLabel")}</span>
                  <RelationshipBadge type={ho.relationshipType} verified={ho.relationshipVerified} />
                </div>
                <p className="mt-4 text-xl font-medium tracking-tight">{ho.name}</p>
              </Link>
              <div className="glass animate-float grid w-full max-w-sm grid-cols-2 divide-x divide-white/10 rounded-3xl p-5">
                <div className="pr-4">
                  <p className="text-4xl font-light tracking-tight">
                    <CountUp value={verifiedCompanies} locale={locale} />
                  </p>
                  <p className="mt-1 text-xs text-paper/60">{t("heroCompaniesLabel")}</p>
                </div>
                <div className="pl-4">
                  {verifiedAreas ? (
                    <p className="text-4xl font-light tracking-tight">
                      <CountUp value={verifiedAreas} locale={locale} />
                    </p>
                  ) : (
                    <Pending className="mt-2" />
                  )}
                  <p className="mt-1 text-xs text-paper/60">{t("heroAreasLabel")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="animate-fade-up max-w-md text-paper/75" style={{ animationDelay: "600ms" }}>
              {t("heroBody")}
            </p>
            <div className="animate-fade-up flex flex-wrap gap-3" style={{ animationDelay: "750ms" }}>
              <ButtonLink href="/companies">{t("heroCtaPrimary")}</ButtonLink>
              <ButtonLink href="/about" variant="outline">
                {t("heroCtaSecondary")}
              </ButtonLink>
            </div>
          </div>
        </div>

        <RotatingBadge text={t("badge")} className="absolute right-6 top-28 hidden text-paper/80 md:grid lg:right-12" />
      </div>

      <Marquee className="mt-3 border-y border-white/10 py-5 text-paper/80">
        {lines.map((l) => (
          <span key={l} className="headline flex items-center text-3xl sm:text-5xl">
            <span className="px-6 sm:px-10">{l}</span>
            <span aria-hidden="true" className="text-accent-300">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
