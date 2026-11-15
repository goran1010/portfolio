import { useLanguage } from "../customHooks/useLanguage";
import { CONTACT_LINKS } from "../data/contact";
import { CvDownload } from "./CvDownload";
import { ExternalLink } from "./sharedComponents/ExternalLink";

function Hero() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-start gap-6 py-14 sm:py-20">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-(--text-muted)">{t("hero.location")}</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Goran Jović
        </h1>
        <p className="text-xl font-medium text-(--accent-text)">
          {t("hero.title")}
        </p>
      </div>
      <p className="max-w-2xl text-lg leading-relaxed">{t("hero.pitch")}</p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-4 text-sm font-medium">
        <CvDownload />
        <ExternalLink href={CONTACT_LINKS.github}>GitHub</ExternalLink>
        <ExternalLink href={CONTACT_LINKS.linkedin}>LinkedIn</ExternalLink>
        <ExternalLink href={CONTACT_LINKS.email} newTab={false}>
          {t("links.email")}
        </ExternalLink>
      </div>
    </div>
  );
}

export { Hero };
