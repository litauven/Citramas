import { z } from "zod";

/**
 * Skema data konten Citramas Corporate Group.
 *
 * Aturan umum: nilai `null` = data belum diberikan / belum terverifikasi.
 * UI menampilkan nilai `null` sebagai label "Menunggu konfirmasi", jadi JANGAN
 * mengisi field dengan tebakan — biarkan `null` sampai datanya terkonfirmasi.
 */

export const localizedSchema = z.object({ id: z.string().min(1), en: z.string().min(1) });
export type Localized = z.infer<typeof localizedSchema>;

/** Jenis hubungan perusahaan dengan grup. Tidak setiap perusahaan adalah anak usaha secara hukum. */
export const RELATIONSHIP_TYPES = ["head-office", "subsidiary", "affiliate", "business-unit", "partner-company"] as const;
export const relationshipSchema = z.enum(RELATIONSHIP_TYPES);
export type RelationshipType = z.infer<typeof relationshipSchema>;

const urlOrNull = z.string().url().nullable();

export const brandSchema = z.object({
  name: z.string().min(1),
  logo: z.string().nullable(),
  /** "owned" = merek milik perusahaan, "distributed" = merek yang didistribusikan, "partner" = mitra strategis. */
  relation: z.enum(["owned", "distributed", "partner"]),
  /** Id area bisnis (content/group.ts) untuk pengelompokan merek. */
  category: z.string().nullable(),
  description: localizedSchema.nullable(),
  website: urlOrNull,
});

export const projectSchema = z.object({
  title: localizedSchema,
  year: z.number().int().nullable(),
  client: z.string().nullable(),
  location: z.string().nullable(),
  description: localizedSchema.nullable(),
  image: z.string().nullable(),
});

export const clientSchema = z.object({
  name: z.string().min(1),
  logo: z.string().nullable(),
  industry: localizedSchema.nullable(),
});

export const addressSchema = z.object({
  label: localizedSchema,
  street: z.string().nullable(),
  city: z.string().nullable(),
  province: z.string().nullable(),
  postalCode: z.string().nullable(),
  country: z.string().nullable(),
  phone: z.string().nullable(),
  fax: z.string().nullable(),
  mapUrl: urlOrNull,
  isPrimary: z.boolean(),
});

export const contactSchema = z.object({
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  whatsapp: z.string().nullable(),
  fax: z.string().nullable(),
});

export const companySchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug harus kebab-case"),
  name: z.string().min(1),
  /** Path di /public atau null (logo belum diberikan). */
  logo: z.string().nullable(),
  coverImage: z.string().nullable(),
  descriptionId: z.string().nullable(),
  descriptionEn: z.string().nullable(),
  /** null = hubungan dengan grup belum ditetapkan. */
  relationshipType: relationshipSchema.nullable(),
  /** Hubungan baru boleh dipublikasikan sebagai fakta setelah diverifikasi. */
  relationshipVerified: z.boolean(),
  /** Id dari content/business-areas.ts */
  businessSector: z.array(z.string()),
  businessActivities: z.array(localizedSchema),
  services: z.array(localizedSchema),
  brands: z.array(brandSchema),
  projects: z.array(projectSchema),
  clients: z.array(clientSchema),
  /** Gambar kolase logo klien resmi dari perusahaan (bila daftar klien hanya tersedia sebagai gambar). */
  clientsImage: z.string().nullable(),
  /** Visi, misi, dan nilai (DNA) MILIK PERUSAHAAN — bukan nilai grup. */
  vision: localizedSchema.nullable(),
  missions: z.array(z.object({ title: localizedSchema, body: localizedSchema })),
  values: z.array(z.object({ title: z.string(), body: localizedSchema, image: z.string().nullable() })),
  /** Sumber data yang sudah terverifikasi (mis. website resmi). */
  source: urlOrNull,
  /** Bisa lebih dari satu lokasi; tandai satu sebagai isPrimary. */
  address: z.array(addressSchema),
  contact: contactSchema,
  website: urlOrNull,
  operatingSince: z.number().int().nullable(),
  isActive: z.boolean(),
  featured: z.boolean(),
  /** true = entri contoh yang belum mewakili perusahaan nyata. */
  isPlaceholder: z.boolean(),
});

export type Company = z.infer<typeof companySchema>;
export type Brand = z.infer<typeof brandSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Client = z.infer<typeof clientSchema>;
export type Address = z.infer<typeof addressSchema>;

export const businessAreaSchema = z.object({
  id: z.string().min(1),
  title: localizedSchema.nullable(),
  summary: localizedSchema.nullable(),
  /** Foto ilustrasi area (path di /public). */
  image: z.string().nullable(),
});
export type BusinessArea = z.infer<typeof businessAreaSchema>;

export const newsSchema = z.object({
  id: z.string().min(1),
  /** null = berita tingkat grup; isi id perusahaan untuk berita perusahaan. */
  companyId: z.string().nullable(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: localizedSchema,
  excerpt: localizedSchema,
  url: urlOrNull,
});
export type NewsItem = z.infer<typeof newsSchema>;

export const careerSchema = z.object({
  id: z.string().min(1),
  companyId: z.string(),
  title: localizedSchema,
  location: z.string().nullable(),
  type: z.enum(["full-time", "part-time", "contract", "internship"]).nullable(),
  summary: localizedSchema.nullable(),
  applyUrl: urlOrNull,
  applyEmail: z.string().email().nullable(),
  isOpen: z.boolean(),
});
export type Career = z.infer<typeof careerSchema>;

export const milestoneSchema = z.object({
  year: z.number().int().nullable(),
  title: localizedSchema.nullable(),
  /** Isi companyId bila milestone milik satu perusahaan, null bila milestone grup. */
  companyId: z.string().nullable(),
});
export type Milestone = z.infer<typeof milestoneSchema>;
