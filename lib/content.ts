import { z } from "zod";
import { companies as rawCompanies } from "@/content/companies";
import { businessAreas as rawAreas, careers as rawCareers, corporateValues, HEAD_OFFICE_ID, milestones as rawMilestones, news as rawNews } from "@/content/group";
import type { Locale } from "@/i18n/routing";
import {
  businessAreaSchema,
  careerSchema,
  companySchema,
  milestoneSchema,
  newsSchema,
  RELATIONSHIP_TYPES,
  type Brand,
  type Client,
  type Company,
  type Localized,
  type RelationshipType,
} from "./types";

/* Validasi sekali saat modul dimuat — data yang salah bentuk menggagalkan build, bukan tampil rusak. */
const companiesAll = z.array(companySchema).parse(rawCompanies);
const areas = z.array(businessAreaSchema).parse(rawAreas);
const newsAll = z.array(newsSchema).parse(rawNews);
const careersAll = z.array(careerSchema).parse(rawCareers);
const milestonesAll = z.array(milestoneSchema).parse(rawMilestones);

(function assertIntegrity() {
  const slugs = new Set<string>();
  const ids = new Set<string>();
  for (const c of companiesAll) {
    if (slugs.has(c.slug)) throw new Error(`Slug perusahaan duplikat: ${c.slug}`);
    if (ids.has(c.id)) throw new Error(`Id perusahaan duplikat: ${c.id}`);
    slugs.add(c.slug);
    ids.add(c.id);
    for (const s of c.businessSector) if (!areas.some((a) => a.id === s)) throw new Error(`${c.id}: businessSector "${s}" tidak ada di businessAreas`);
  }
  for (const n of newsAll) if (n.companyId && !ids.has(n.companyId)) throw new Error(`Berita ${n.id}: companyId tidak dikenal`);
  for (const j of careersAll) if (!ids.has(j.companyId)) throw new Error(`Lowongan ${j.id}: companyId tidak dikenal`);
})();

export function tr(value: Localized | null | undefined, locale: Locale): string | null {
  return value ? value[locale] : null;
}

export function companyDescription(c: Company, locale: Locale): string | null {
  return locale === "id" ? c.descriptionId : c.descriptionEn;
}

const RELATIONSHIP_ORDER: Record<RelationshipType, number> = Object.fromEntries(RELATIONSHIP_TYPES.map((r, i) => [r, i])) as Record<RelationshipType, number>;

function byRelationship(a: Company, b: Company) {
  const ra = a.relationshipType ? RELATIONSHIP_ORDER[a.relationshipType] : 99;
  const rb = b.relationshipType ? RELATIONSHIP_ORDER[b.relationshipType] : 99;
  return ra - rb || Number(a.isPlaceholder) - Number(b.isPlaceholder) || a.name.localeCompare(b.name);
}

/** Semua perusahaan aktif, kantor pusat lebih dulu. */
export function getCompanies(): Company[] {
  return companiesAll.filter((c) => c.isActive).sort(byRelationship);
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return getCompanies().find((c) => c.slug === slug);
}

export function getCompanyById(id: string): Company | undefined {
  return companiesAll.find((c) => c.id === id);
}

export function getHeadOffice(): Company {
  const ho = companiesAll.find((c) => c.id === HEAD_OFFICE_ID);
  if (!ho) throw new Error("Kantor pusat (HEAD_OFFICE_ID) tidak ditemukan di content/companies.ts");
  return ho;
}

/** Perusahaan di dalam grup selain kantor pusat. */
export function getGroupCompanies(): Company[] {
  return getCompanies().filter((c) => c.id !== HEAD_OFFICE_ID);
}

export function getFeaturedCompanies(limit = 6): Company[] {
  return getCompanies().filter((c) => c.featured).slice(0, limit);
}

export function getBusinessAreas() {
  const list = getCompanies();
  return areas.map((a) => ({ ...a, companies: list.filter((c) => c.businessSector.includes(a.id)) }));
}

export function getAreaById(id: string) {
  return areas.find((a) => a.id === id);
}

/** Merek dikumpulkan dari tiap perusahaan — selalu membawa perusahaan pemiliknya. */
export function getBrands(): (Brand & { company: Company })[] {
  return getCompanies().flatMap((c) => c.brands.map((b) => ({ ...b, company: c })));
}

export function getClients(): (Client & { company: Company })[] {
  return getCompanies().flatMap((c) => c.clients.map((cl) => ({ ...cl, company: c })));
}

export function getNews(companyId?: string) {
  return newsAll
    .filter((n) => (companyId === undefined ? true : n.companyId === companyId))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getCareers(companyId?: string) {
  return careersAll.filter((j) => j.isOpen && (companyId === undefined || j.companyId === companyId));
}

export function getMilestones() {
  return milestonesAll;
}

export function getCorporateValues() {
  return corporateValues;
}

export function primaryAddress(c: Company) {
  return c.address.find((a) => a.isPrimary) ?? c.address[0] ?? null;
}

export function formatAddress(a: { street: string | null; city: string | null; province: string | null; postalCode: string | null; country: string | null }) {
  const parts = [a.street, [a.city, a.postalCode].filter(Boolean).join(" "), a.province, a.country].filter((p) => p && p.trim().length > 0);
  return parts.length ? parts.join(", ") : null;
}

export function relationshipCounts() {
  const list = getCompanies();
  return RELATIONSHIP_TYPES.map((r) => ({ type: r, count: list.filter((c) => c.relationshipType === r).length }));
}
