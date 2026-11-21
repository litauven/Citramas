import { useTranslations } from "next-intl";
import type { RelationshipType } from "@/lib/types";

const tone: Record<RelationshipType, string> = {
  "head-office": "bg-accent text-paper border-accent",
  subsidiary: "border-paper/30 text-paper",
  affiliate: "border-paper/30 text-paper",
  "business-unit": "border-paper/30 text-paper",
  "partner-company": "border-paper/30 text-paper",
};

/** Badge jenis hubungan; hubungan yang belum diverifikasi diberi tanda. */
export function RelationshipBadge({ type, verified, className = "" }: { type: RelationshipType | null; verified: boolean; className?: string }) {
  const t = useTranslations("relationship");
  const c = useTranslations("common");
  if (!type) {
    return (
      <span className={`inline-flex items-center rounded-full border border-dashed border-pending/60 px-3 py-1 text-xs text-pending ${className}`}>{t("none")}</span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${tone[type]} ${className}`}>
      {t(type)}
      {!verified ? <span className="text-pending">· {c("unverified")}</span> : null}
    </span>
  );
}
