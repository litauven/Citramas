import type { Brand, Company } from "@/lib/types";

/**
 * DAFTAR PERUSAHAAN DALAM CITRAMAS CORPORATE GROUP — satu-satunya sumber data
 * untuk direktori (/companies), profil (/companies/[slug]), beranda, merek, klien,
 * dan kontak. Menambah perusahaan = menambah satu objek di array ini; UI tidak perlu diubah.
 *
 * ATURAN:
 * - `null` / array kosong = belum ada data terverifikasi → tampil "Menunggu konfirmasi".
 * - Jangan mengarang nama, hubungan hukum, logo, alamat, atau aktivitas bisnis.
 * - `relationshipVerified: false` → badge hubungan diberi tanda "belum diverifikasi".
 * - Merek, klien, proyek, visi/misi, dan nilai disimpan PER PERUSAHAAN (bukan level grup).
 * - Entri `isPlaceholder: true` adalah contoh slot; ganti datanya atau set `isActive: false`.
 */

const CAS_SITE = "https://www.citramasalfasejahtera.com";

/** Merek yang ditampilkan di halaman Merek website resmi PT Citramas Alfa Sejahtera. */
function casBrand(name: string, file: string, category: string): Brand {
  return { name, logo: `/cas/brands/${file}`, relation: "distributed", category, description: null, website: null };
}

const empty = {
  logo: null,
  coverImage: null,
  descriptionId: null,
  descriptionEn: null,
  relationshipType: null,
  relationshipVerified: false,
  businessSector: [],
  businessActivities: [],
  services: [],
  brands: [],
  projects: [],
  clients: [],
  clientsImage: null,
  vision: null,
  missions: [],
  values: [],
  source: null,
  address: [],
  contact: { email: null, phone: null, whatsapp: null, fax: null },
  website: null,
  operatingSince: null,
  isActive: true,
  isPlaceholder: true,
} satisfies Partial<Company>;

export const companies: Company[] = [
  {
    // Sumber: https://www.citramasalfasejahtera.com (ID & EN), dibaca 21 Nov 2026.
    id: "citramas-alfa-sejahtera",
    slug: "citramas-alfa-sejahtera",
    name: "PT Citramas Alfa Sejahtera",
    logo: "/cas/logo-long.png",
    coverImage: "/images/cas-engineer-lathe.jpg",
    descriptionId:
      "Salah satu perusahaan barang industri tertua di Indonesia. Dengan kantor pusat di Jakarta, PT Citramas Alfa Sejahtera beroperasi dalam berbagai macam barang, baik barang-barang industri dan alat-alat teknik, maupun alat telekomunikasi dan sistem otomatisasi kantor. Sejak tahun 1990, kami telah melayani berbagai pelanggan, mulai dari perorangan dan usaha kecil menengah sampai perusahaan multinasional.",
    descriptionEn:
      "One of the oldest industrial trading companies in Indonesia. With its head office in Jakarta, PT Citramas Alfa Sejahtera operates in a variety of industrial and technical equipment, as well as electronic and office automation systems. Since 1990, it has built a client list ranging from home businesses to multinational companies.",
    relationshipType: "head-office",
    relationshipVerified: true,
    businessSector: ["industri-teknik", "otomatisasi-industri", "elektronik-otomatisasi-kantor"],
    businessActivities: [
      { id: "Hydraulics & Pneumatics", en: "Hydraulics & Pneumatics" },
      { id: "Alat-alat teknik", en: "Equipment & Tools" },
      { id: "Jig, fixture, mould, & mesin khusus", en: "Jig, Fixture, Mould, & Special Purpose Machine" },
      { id: "Otomatisasi industri", en: "Industrial Automation" },
      { id: "Telekomunikasi & otomatisasi kantor", en: "Telecommunication & Office Automation" },
      { id: "Proyek", en: "Projects" },
    ],
    services: [
      { id: "Barang industri & alat-alat teknik", en: "Industrial goods & technical equipment" },
      { id: "Sistem otomatisasi industri", en: "Industrial automation systems" },
      { id: "Alat telekomunikasi", en: "Telecommunication equipment" },
      { id: "Sistem otomatisasi kantor", en: "Office automation systems" },
    ],
    brands: [
      casBrand("DOBOT Magician", "dobot.png", "otomatisasi-industri"),
      casBrand("CAS", "cas.png", "industri-teknik"),
      casBrand("Mighty Seven", "m7.png", "industri-teknik"),
      casBrand("SMC", "smc.png", "industri-teknik"),
      casBrand("KS Tools", "ks-tools.png", "industri-teknik"),
      casBrand("Winters Instrument", "winters-2.png", "industri-teknik"),
      casBrand("Tecsis", "tecsis.png", "industri-teknik"),
      casBrand("Yuken Hydraulics", "yuken.png", "industri-teknik"),
      casBrand("Northman", "northman2.png", "industri-teknik"),
      casBrand("Nitto Kohki", "Nitto.png", "industri-teknik"),
      casBrand("Vickers", "vickers.png", "industri-teknik"),
      casBrand("Panasonic", "panasonic.png", "elektronik-otomatisasi-kantor"),
      casBrand("Commax", "commax.png", "elektronik-otomatisasi-kantor"),
      casBrand("Samsung", "samsung.png", "elektronik-otomatisasi-kantor"),
      casBrand("CP Plus", "cp-plus.png", "elektronik-otomatisasi-kantor"),
      casBrand("Wonwoo", "wonwoo.png", "elektronik-otomatisasi-kantor"),
      casBrand("Plantronics", "plantronics.png", "elektronik-otomatisasi-kantor"),
      casBrand("LG – Ericsson", "LG-Ericsson.png", "elektronik-otomatisasi-kantor"),
      casBrand("Polycom", "polycom.png", "elektronik-otomatisasi-kantor"),
      casBrand("Sahitel", "sahitel.png", "elektronik-otomatisasi-kantor"),
      casBrand("Brother", "brother.png", "elektronik-otomatisasi-kantor"),
      casBrand("Amano", "amano.png", "elektronik-otomatisasi-kantor"),
    ],
    projects: [],
    // Website resmi hanya menampilkan daftar klien sebagai satu gambar kolase logo.
    clients: [],
    clientsImage: "/cas/clients.png",
    vision: {
      id: "Menjadi perusahaan kelas dunia dengan standar tertinggi dalam kualitas dan pelayanan.",
      en: "To be a world class company with the highest standard in quality and service.",
    },
    missions: [
      {
        title: { id: "Jaminan Kepuasan Pelanggan", en: "Customer Satisfaction Guarantee" },
        body: { id: "Kami memberikan jaminan berupa produk berkualitas. Hanya produk dengan kualitas terbaik yang tepat untuk Anda.", en: "We give customer satisfaction guarantee by delivering quality products. Only the best is enough." },
      },
      {
        title: { id: "Pelayanan Pelanggan Kelas Dunia", en: "World Class Customer Service" },
        body: { id: "Kami menyediakan layanan pelanggan terbaik berkelas dunia. Staf kami siap membantu menyelesaikan masalah Anda.", en: "We provide only world class and excellent customer service. Our staff are ready to help you." },
      },
      {
        title: { id: "Pemimpin Pasar di Industrinya", en: "Market Leader in the Industry" },
        body: { id: "Kami berusaha menjadi pemimpin pasar dalam industri melalui peningkatan kualitas tanpa henti di setiap bagian yang ada.", en: "We strive to be the market leader in the industry by improving continuously in every possible sector." },
      },
    ],
    values: [
      { title: "Continuous Improvement", body: { id: "Dalam setiap langkah, kami terus menjadi lebih baik.", en: "With every step, we just keep on getting better." }, image: "/images/dna/continuous-improvement.jpg" },
      { title: "Integrity", body: { id: "Kami menjalani apa yang kami bicarakan.", en: "We walk the talk." }, image: "/images/dna/integrity.jpg" },
      { title: "Teamwork", body: { id: "'Kami' bukan 'Saya', 'Milik Kami' bukan 'Milikku'.", en: "It's 'We' not 'I', it's 'Us' not 'Me'." }, image: "/images/dna/teamwork.jpg" },
      { title: "Reliability", body: { id: "Jangan khawatir, Anda dapat mengandalkan kami.", en: "Don't worry, you can depend on us." }, image: "/images/dna/reliability.jpg" },
      { title: "Accuracy", body: { id: "Kami peduli. Kami cepat dan akurat.", en: "We are good. We are fast and accurate." }, image: "/images/dna/accuracy.jpg" },
      { title: "Motivated", body: { id: "Kami sangat antusias melayani Anda.", en: "We are enthusiastic in serving you." }, image: "/images/dna/motivated.jpg" },
      { title: "Active & Proactive", body: { id: "Kami membuat rencana, kami bersiap, kami tampil baik.", en: "We plan, we prepare, we perform well." }, image: "/images/dna/active-proactive.jpg" },
      { title: "Sustainability", body: { id: "Oleh anugerah Tuhan, kami ada di sini dari waktu ke waktu.", en: "By the grace of God, we are here from time to time." }, image: "/images/dna/sustainability.jpg" },
    ],
    source: CAS_SITE,
    address: [
      {
        label: { id: "Kantor", en: "Office" },
        street: "Jl. Pinangsia Timur No. 4bb",
        city: "Jakarta",
        province: null,
        postalCode: "11110",
        country: "Indonesia",
        phone: "+62 21 625 1611, 624 3545",
        fax: "+62 21 624 3546",
        mapUrl: null,
        isPrimary: true,
      },
      {
        label: { id: "Toko", en: "Store" },
        street: "Komp. Pertokoan Glodok Jaya Lantai 1, Blok D-57",
        city: "Jakarta",
        province: null,
        postalCode: "11180",
        country: "Indonesia",
        phone: "+62 21 628 9072",
        fax: "+62 21 639 9671",
        mapUrl: null,
        isPrimary: false,
      },
    ],
    contact: { email: null, phone: "+62 21 625 1611", whatsapp: null, fax: "+62 21 624 3546" },
    website: CAS_SITE,
    operatingSince: 1990,
    isActive: true,
    featured: true,
    isPlaceholder: false,
  },
  { ...empty, id: "placeholder-01", slug: "perusahaan-grup-01", name: "Perusahaan Grup 01", featured: true },
  { ...empty, id: "placeholder-02", slug: "perusahaan-grup-02", name: "Perusahaan Grup 02", featured: true },
  { ...empty, id: "placeholder-03", slug: "perusahaan-grup-03", name: "Perusahaan Grup 03", featured: false },
];
