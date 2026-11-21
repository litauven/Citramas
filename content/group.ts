import type { BusinessArea, Career, Localized, Milestone, NewsItem } from "@/lib/types";

/**
 * Konten TINGKAT GRUP. Info milik satu perusahaan (layanan, klien, merek, proyek)
 * tidak ditaruh di sini — simpan di content/companies.ts pada perusahaan terkait.
 */

/** Id perusahaan yang berperan sebagai kantor pusat grup. */
export const HEAD_OFFICE_ID = "citramas-alfa-sejahtera";

/** Area bisnis grup. Perusahaan menautkan diri lewat `businessSector: ["<id>"]`. */
export const businessAreas: BusinessArea[] = [
  {
    id: "industri-teknik",
    title: { id: "Industri & Teknik", en: "Industrial & Technical" },
    summary: {
      id: "Hydraulics & pneumatics, alat-alat teknik, serta jig, fixture, mould, dan mesin khusus.",
      en: "Hydraulics & pneumatics, equipment & tools, and jig, fixture, mould, and special purpose machines.",
    },
    image: "/images/area-industrial-machinery.jpg",
  },
  {
    id: "otomatisasi-industri",
    title: { id: "Otomatisasi Industri", en: "Industrial Automation" },
    summary: { id: "Sistem dan perangkat otomatisasi untuk kebutuhan industri.", en: "Automation systems and equipment for industrial needs." },
    image: "/images/area-automation-robots.jpg",
  },
  {
    id: "elektronik-otomatisasi-kantor",
    title: { id: "Elektronik & Otomatisasi Kantor", en: "Electronics & Office Automation" },
    summary: { id: "Alat telekomunikasi dan sistem otomatisasi kantor.", en: "Telecommunication equipment and office automation systems." },
    image: "/images/area-electronics-circuit.jpg",
  },
];

/** Sejarah & milestone. year/title null = belum dikonfirmasi. */
export const milestones: Milestone[] = [
  // Sumber: website resmi PT Citramas Alfa Sejahtera ("Sejak tahun 1990 ...").
  {
    year: 1990,
    title: { id: "PT Citramas Alfa Sejahtera mulai melayani pelanggan industri dan perkantoran", en: "PT Citramas Alfa Sejahtera begins serving industrial and office customers" },
    companyId: "citramas-alfa-sejahtera",
  },
  { year: null, title: null, companyId: null },
  { year: null, title: null, companyId: null },
];

/**
 * Nilai korporat — DRAF usulan untuk ditinjau manajemen (status "draft" tampil sebagai badge).
 * Ganti status menjadi "approved" setelah disetujui.
 */
export const corporateValues: { status: "draft" | "approved"; title: Localized; body: Localized }[] = [
  {
    status: "draft",
    title: { id: "Integritas", en: "Integrity" },
    body: { id: "Bertindak jujur, transparan, dan dapat dipertanggungjawabkan di setiap perusahaan dalam grup.", en: "Acting honestly, transparently, and accountably across every company in the group." },
  },
  {
    status: "draft",
    title: { id: "Kolaborasi", en: "Collaboration" },
    body: { id: "Menghubungkan keahlian antarperusahaan untuk menciptakan nilai yang lebih besar.", en: "Connecting expertise across companies to create greater value." },
  },
  {
    status: "draft",
    title: { id: "Pertumbuhan", en: "Growth" },
    body: { id: "Membangun bisnis yang berkelanjutan dan membuka peluang baru.", en: "Building sustainable businesses and opening new opportunities." },
  },
  {
    status: "draft",
    title: { id: "Keunggulan", en: "Excellence" },
    body: { id: "Menjaga standar kerja yang tinggi dalam layanan dan tata kelola.", en: "Upholding high standards in service and governance." },
  },
];

/** Berita & pembaruan. companyId null = berita grup. Urutan bebas; UI mengurutkan per tanggal. */
export const news: NewsItem[] = [];

/** Lowongan kerja per perusahaan. */
export const careers: Career[] = [
  // Sumber: halaman Karir website resmi PT Citramas Alfa Sejahtera. Tanggal posting tidak dicantumkan di sana.
  {
    id: "cas-sales-engineer",
    companyId: "citramas-alfa-sejahtera",
    title: { id: "Sales Engineer", en: "Sales Engineer" },
    summary: {
      id: "Memadukan pengetahuan teknis dan kemampuan penjualan untuk memberi saran, dukungan, dan menjual berbagai produk kepada staf teknis pelanggan.",
      en: "Combines technical knowledge with sales skills to advise, support, and sell a range of products to clients' technical staff.",
    },
    location: null,
    type: null,
    applyUrl: "https://www.citramasalfasejahtera.com/en/careers/sales-engineer/",
    applyEmail: null,
    isOpen: true,
  },
  {
    id: "cas-product-specialist",
    companyId: "citramas-alfa-sejahtera",
    title: { id: "Product Specialist", en: "Product Specialist" },
    summary: {
      id: "Bekerja dengan klien baru maupun calon klien serta tim internal untuk menjelaskan fitur dan manfaat berbagai produk.",
      en: "Works with new and prospective clients and internal staff to discuss the features and benefits of a range of products.",
    },
    location: null,
    type: null,
    applyUrl: "https://www.citramasalfasejahtera.com/en/careers/product-specialist/",
    applyEmail: null,
    isOpen: true,
  },
];
