import { useLanguage } from "../customHooks/useLanguage";
import { CONTACT_LINKS } from "../data/contact";
import { CvDownload } from "./CvDownload";
import { ExternalLink } from "./sharedComponents/ExternalLink";

function Hero() {
  const { t } = useLanguage();

  return (
    <div className="grid items-center gap-8 py-14 sm:py-20 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
      <img
        src="/images/CV_photo.png"
        alt="Goran Jović"
        width={512}
        height={512}
        fetchPriority="high"
        decoding="async"
        className="w-40 rounded-2xl border border-(--border-color) shadow-(--card-shadow-soft) sm:w-48 md:order-last md:w-56"
      />
      <div className="flex min-w-0 flex-col items-start gap-6">
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
    </div>
  );
}

export { Hero };
