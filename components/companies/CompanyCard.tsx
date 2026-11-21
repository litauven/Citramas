import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CompanyCardData } from "@/lib/cards";
import { Arrow, ArrowUpRight } from "@/components/ui/Arrow";
import { OrPending, Pending } from "@/components/ui/Pending";
import { CoverField } from "./CoverField";
import { LogoTile } from "./LogoTile";
import { RelationshipBadge } from "./RelationshipBadge";

/** Kartu direktori perusahaan: logo, nama, deskripsi, sektor, hubungan, lokasi, website, tombol profil. */
export function CompanyCard({ company: c, index }: { company: CompanyCardData; index?: number }) {
  const t = useTranslations("companies");
  const common = useTranslations("common");
  const isHO = c.relationshipType === "head-office";
  return (
    <article
      className={`group/card relative flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-transform duration-700 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 ${
        isHO ? "bg-paper text-ink" : "border border-white/10 bg-ink-900 text-paper"
      }`}
    >
      <div className="relative h-36 sm:h-40">
        <CoverField seed={c.slug} image={c.coverImage} className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-soft)] group-hover/card:scale-105" />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <RelationshipBadge type={c.relationshipType} verified={c.relationshipVerified} className={isHO ? "" : "glass"} />
          {typeof index === "number" ? <span className="eyebrow text-paper/70">{String(index + 1).padStart(2, "0")}</span> : null}
        </div>
        <LogoTile logo={c.logo} name={c.name} size="sm" className={`absolute -bottom-7 left-5 ${c.logo ? "shadow-lg" : isHO ? "bg-paper text-ink" : "bg-ink-900 text-paper"}`} />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-10">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xl font-medium tracking-tight">{c.name}</h3>
          {c.isPlaceholder ? <Pending kind="placeholder" /> : null}
        </div>
        <p className={`mt-2 line-clamp-3 text-sm leading-relaxed ${isHO ? "text-ink/65" : "text-paper/60"}`}>
          {c.description ?? (c.isPlaceholder ? common("placeholderNote") : <Pending />)}
        </p>

        <dl className={`mt-5 grid gap-2 border-t pt-4 text-sm ${isHO ? "border-ink/10" : "border-white/10"}`}>
          <div className="flex items-start justify-between gap-4">
            <dt className={`eyebrow pt-1 ${isHO ? "text-ink/50" : "text-paper/45"}`}>{t("sector")}</dt>
            <dd className="text-right">{c.sectors.length ? c.sectors.map((s, i) => <OrPending key={i} value={s} className="block" />) : <Pending />}</dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className={`eyebrow pt-1 ${isHO ? "text-ink/50" : "text-paper/45"}`}>{t("location")}</dt>
            <dd className="text-right">
              <OrPending value={c.location} />
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className={`eyebrow pt-1 ${isHO ? "text-ink/50" : "text-paper/45"}`}>{t("website")}</dt>
            <dd className="min-w-0 text-right">
              {c.website ? (
                <a href={c.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 break-all underline-offset-4 hover:underline">
                  {c.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                  <ArrowUpRight className="size-3.5 shrink-0" />
                </a>
              ) : (
                <Pending />
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-auto pt-6">
          <Link
            href={`/companies/${c.slug}`}
            className={`group inline-flex w-full items-center justify-between gap-3 rounded-full p-1 pl-5 text-sm font-medium transition-colors ${
              isHO ? "bg-ink text-paper hover:bg-ink-800" : "bg-paper text-ink hover:bg-white"
            }`}
          >
            {common("viewProfile")}
            <span className={`grid size-9 place-items-center rounded-full ${isHO ? "bg-accent text-paper" : "bg-ink text-paper"}`}>
              <Arrow className="arrow-shift size-4" />
            </span>
            <span className="sr-only">: {c.name}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
