import { notFound } from "next/navigation";

// Menangkap URL yang tidak dikenal di bawah /[locale] agar not-found berbahasa lokal tampil.
export default function CatchAll() {
  notFound();
}
