import Image from "next/image";
import { useTranslations } from "next-intl";

/** Kotak logo perusahaan. Tanpa logo resmi → kotak bergaris putus "Logo · Menunggu konfirmasi" (tidak membuat logo tiruan). */
export function LogoTile({ logo, name, size = "md", className = "" }: { logo: string | null; name: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const t = useTranslations("common");
  // Persegi panjang agar logo memanjang (mis. logo perusahaan) maupun logo merek tetap terbaca.
  const dim = size === "lg" ? "h-28 w-64 sm:h-32 sm:w-80" : size === "sm" ? "h-14 w-28" : "h-20 w-40";
  const pos = /\b(absolute|fixed)\b/.test(className) ? "" : "relative";
  if (logo) {
    return (
      <div className={`${pos} shrink-0 overflow-hidden rounded-2xl bg-white ${dim} ${className}`}>
        <Image src={logo} alt={name} fill sizes="320px" quality={85} className={`object-contain ${size === "sm" ? "p-2" : "p-4"}`} />
      </div>
    );
  }
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-2xl border border-dashed border-current/30 text-center ${dim} ${className}`}
      role="img"
      aria-label={`${t("logo")} ${name}: ${t("pending")}`}
    >
      <span className="px-1 font-mono text-[0.6rem] uppercase leading-tight tracking-[0.12em] opacity-60">
        {t("logo")}
        {size !== "sm" ? (
          <>
            <br />
            <span className="text-pending">{t("pending")}</span>
          </>
        ) : null}
      </span>
    </div>
  );
}
