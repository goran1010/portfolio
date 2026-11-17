import { useLanguage } from "../customHooks/useLanguage";
import { Contact } from "./Contact";
import { CvDownload } from "./CvDownload";

function Hero() {
  const { t } = useLanguage();

  return (
    <div className="grid items-start gap-8 py-14 sm:py-20 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
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
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Goran Jović
          </h1>
          <p className="text-xl font-medium text-(--accent-text)">
            {t("hero.title")}
          </p>
        </div>
        <CvDownload />
        <Contact />
      </div>
    </div>
  );
}

export { Hero };
