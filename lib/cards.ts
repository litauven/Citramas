import type { Locale } from "@/i18n/routing";
import { companyDescription, formatAddress, getAreaById, primaryAddress, tr } from "./content";
import type { Company, RelationshipType } from "./types";

/** Data ringkas perusahaan untuk kartu (aman dikirim ke client component). */
export type CompanyCardData = {
  id: string;
  slug: string;
  name: string;
  logo: string | null;
  coverImage: string | null;
  description: string | null;
  relationshipType: RelationshipType | null;
  relationshipVerified: boolean;
  isPlaceholder: boolean;
  sectors: (string | null)[];
  location: string | null;
  website: string | null;
};

export function toCardData(c: Company, locale: Locale): CompanyCardData {
  const addr = primaryAddress(c);
  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
    logo: c.logo,
    coverImage: c.coverImage,
    description: companyDescription(c, locale),
    relationshipType: c.relationshipType,
    relationshipVerified: c.relationshipVerified,
    isPlaceholder: c.isPlaceholder,
    sectors: c.businessSector.map((id) => tr(getAreaById(id)?.title, locale)),
    location: addr ? (addr.city ? [addr.city, addr.country].filter(Boolean).join(", ") : formatAddress(addr)) : null,
    website: c.website,
  };
}
