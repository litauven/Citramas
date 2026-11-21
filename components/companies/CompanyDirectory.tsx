"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { CompanyCardData } from "@/lib/cards";
import { RELATIONSHIP_TYPES, type RelationshipType } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { CompanyCard } from "./CompanyCard";

/** Direktori perusahaan dengan filter jenis hubungan + pencarian nama. */
export function CompanyDirectory({ companies }: { companies: CompanyCardData[] }) {
  const t = useTranslations("companies");
  const rel = useTranslations("relationship");
  const [filter, setFilter] = useState<RelationshipType | "all">("all");
  const [q, setQ] = useState("");

  const counts = useMemo(
    () => Object.fromEntries(RELATIONSHIP_TYPES.map((r) => [r, companies.filter((c) => c.relationshipType === r).length])) as Record<RelationshipType, number>,
    [companies],
  );

  const visible = companies.filter(
    (c) => (filter === "all" || c.relationshipType === filter) && c.name.toLowerCase().includes(q.trim().toLowerCase()),
  );

  const chip = (active: boolean, disabled = false) =>
    `rounded-full border px-4 py-2 text-sm transition-colors ${
      active ? "border-paper bg-paper text-ink" : disabled ? "cursor-not-allowed border-white/10 text-paper/30" : "border-white/20 text-paper/80 hover:border-white/50"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label={t("filterLabel")} className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} className={chip(filter === "all")}>
            {t("filterAll")} <span className="ml-1 opacity-60">{companies.length}</span>
          </button>
          {RELATIONSHIP_TYPES.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={filter === r}
              disabled={counts[r] === 0}
              onClick={() => setFilter(r)}
              className={chip(filter === r, counts[r] === 0)}
            >
              {rel(r)} <span className="ml-1 opacity-60">{counts[r]}</span>
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:w-72">
          <span className="sr-only">{t("searchLabel")}</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-sm text-paper placeholder:text-paper/40 focus:border-paper/60 focus:outline-none"
          />
        </label>
      </div>

      <p className="eyebrow mt-8 text-paper/50" aria-live="polite">
        {t("resultCount", { count: visible.length })}
      </p>

      {visible.length ? (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((c, i) => (
            <li key={c.id}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <CompanyCard company={c} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-3xl border border-dashed border-white/15 p-10 text-center text-paper/60">{t("noResults")}</p>
      )}
    </div>
  );
}
