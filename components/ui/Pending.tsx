import { useTranslations } from "next-intl";

/** Penanda data yang belum diberikan / belum terverifikasi. */
export function Pending({ kind = "pending", className = "" }: { kind?: "pending" | "draft" | "placeholder" | "unverified"; className?: string }) {
  const t = useTranslations("common");
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-dashed border-pending/60 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-pending ${className}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-pending" />
      {t(kind)}
    </span>
  );
}

/** Menampilkan nilai, atau badge "Menunggu konfirmasi" bila kosong. */
export function OrPending({ value, className = "" }: { value: string | number | null | undefined; className?: string }) {
  if (value === null || value === undefined || value === "") return <Pending className={className} />;
  return <span className={className}>{value}</span>;
}
