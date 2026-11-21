import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  const t = useTranslations("common");
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-start justify-center pb-24 pt-36">
      <p className="eyebrow text-accent-300">404</p>
      <h1 className="headline mt-4 text-[clamp(2.5rem,8vw,6rem)]">{t("notFoundTitle")}</h1>
      <p className="mt-6 max-w-md text-paper/60">{t("notFoundBody")}</p>
      <ButtonLink href="/" className="mt-10">
        {t("notFoundCta")}
      </ButtonLink>
    </section>
  );
}
