# Citramas – Corporate Group

Situs korporat Citramas Corporate Group. Next.js 16 (App Router, Turbopack), React 19, Tailwind 4, next-intl 4 (`/id` default, `/en`), Zod.

```bash
npm install
npm run dev        # http://localhost:3200
npm run build
npm run lint
npm run typecheck
```

## Mengelola konten

| File | Isi |
| --- | --- |
| `content/companies.ts` | **Semua perusahaan** (kantor pusat, anak usaha, afiliasi, unit bisnis, mitra). Satu sumber untuk direktori, profil `/companies/[slug]`, beranda, merek, klien, kontak, footer, dan sitemap. |
| `content/group.ts` | Konten tingkat grup: `HEAD_OFFICE_ID`, area bisnis, milestone, nilai korporat, berita, lowongan. |
| `messages/id.json`, `messages/en.json` | Teks antarmuka. |
| `lib/types.ts` | Skema Zod. Data yang salah bentuk menggagalkan build. |

### Menambah perusahaan
Tambahkan satu objek ke array `companies` (salin entri contoh). Tidak perlu mengubah komponen. Field wajib: `id`, `slug` (kebab-case, unik), `name`, `relationshipType` (`head-office` | `subsidiary` | `affiliate` | `business-unit` | `partner-company` | `null`), `relationshipVerified`, `isActive`, `featured`, `isPlaceholder`.

### Aturan data
- `null` / array kosong ditampilkan sebagai **"Menunggu konfirmasi"**. Jangan diisi tebakan.
- Hubungan baru ditampilkan sebagai fakta bila `relationshipVerified: true`. Kalau belum, badge-nya diberi tanda "belum diverifikasi".
- Merek, klien, proyek, layanan, dan pencapaian disimpan **per perusahaan**. Halaman Merek dan Klien selalu menampilkan perusahaan pemiliknya, jadi semuanya tidak diklaim sebagai milik grup.
- Berita (`companyId: null` = berita grup) dan lowongan (`companyId` wajib) ditautkan ke perusahaan.
- Logo dan cover ditaruh di `public/`, lalu isi path-nya (mis. `"/companies/cas/logo.svg"`). Tanpa gambar, situs memakai kotak logo bergaris putus dan bidang gradien abstrak, tanpa logo tiruan.
- Entri `isPlaceholder: true` adalah slot contoh. Ganti datanya, atau set `isActive: false` sebelum situs dipublikasikan.

### Domain
Isi `NEXT_PUBLIC_SITE_URL` untuk canonical, hreflang, dan sitemap.

## Sumber data & aset
- Profil, merek (22, dalam 3 kategori), visi/misi, DNA, alamat, telepon, dan lowongan PT Citramas Alfa Sejahtera diambil dari https://www.citramasalfasejahtera.com (ID & EN) pada 21 Nov 2026.
- Logo, simbol (`public/cas/symbol.png`, dipotong dari logo resmi), logo merek, dan kolase klien ada di `public/cas/`. Semuanya diunduh dari website tersebut.
- Foto ada di `public/images/` dan diambil dari Unsplash dengan Unsplash License (gratis, termasuk untuk komersial). Daftarnya ada di `public/images/CREDITS.md`. Foto lama dari website Citramas sudah tidak dipakai.
- Warna aksen merah `#e3222a` dan biru `#2a3a9c` diambil dari logo.
- Website tersebut hanya memuat data PT Citramas Alfa Sejahtera. Perusahaan lain dalam grup masih berupa slot contoh.
