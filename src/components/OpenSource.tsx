import { useLanguage } from "../customHooks/useLanguage";
import { Section } from "./Section";
import { ExternalLink } from "./sharedComponents/ExternalLink";

const mergedPullRequestsUrl =
  "https://github.com/search?q=org%3ATheOdinProject+author%3Agoran1010+is%3Apr+is%3Amerged&type=pullrequests";

function OpenSource() {
  const { t } = useLanguage();

  return (
    <Section id="experience">
      <div className="flex flex-col gap-8">
        <article
          aria-labelledby="odin-heading"
          className="flex flex-col gap-3 border-l-2 border-(--border-color) pl-4"
        >
          <h3 id="odin-heading" className="text-lg font-semibold">
            The Odin Project
          </h3>
          <p className="text-sm font-medium text-(--text-muted)">
            {t("openSource.odin.role")}
          </p>
          <p className="leading-7">{t("openSource.odin.curriculum")}</p>
          <ul className="list-disc space-y-2 pl-5 leading-7">
            <li>{t("openSource.odin.review")}</li>
            <li>{t("openSource.odin.tooling")}</li>
          </ul>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            <ExternalLink href="https://github.com/TheOdinProject">
              GitHub
            </ExternalLink>
            <ExternalLink href={mergedPullRequestsUrl}>
              {t("openSource.odin.mergedPullRequests")}
            </ExternalLink>
          </div>
        </article>
        <article
          aria-labelledby="metr-heading"
          className="flex flex-col gap-3 border-l-2 border-(--border-color) pl-4"
        >
          <h3 id="metr-heading" className="text-lg font-semibold">
            METR
          </h3>
          <p className="text-sm font-medium text-(--text-muted)">
            {t("openSource.metr.period")}
          </p>
          <p className="font-medium">{t("openSource.metr.study")}</p>
          <p className="leading-7">{t("openSource.metr.description")}</p>
          <p className="text-sm font-medium">
            <ExternalLink href="https://metr.org/">metr.org</ExternalLink>
          </p>
        </article>
      </div>
    </Section>
  );
}

export { OpenSource };
