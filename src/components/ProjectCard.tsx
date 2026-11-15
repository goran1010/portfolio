import { useLanguage } from "../customHooks/useLanguage";
import { ExternalLink } from "./sharedComponents/ExternalLink";

import type { Project } from "../data/projects";

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  const headingId = `${project.id}-project-heading`;

  return (
    <article
      aria-labelledby={headingId}
      className="flex flex-col gap-4 rounded-lg border border-(--border-color) bg-(--surface-1) p-5"
    >
      <h3 id={headingId} className="text-xl font-semibold">
        {t(`projects.${project.id}.name`)}
      </h3>
      <p className="leading-7 text-(--text-muted)">
        {t(`projects.${project.id}.description`)}
      </p>
      <ul
        aria-label={t("projects.technologies")}
        className="flex flex-wrap gap-2"
      >
        {project.technologies.map((technology) => (
          <li
            key={technology}
            className="rounded-md border border-(--border-color) px-2 py-1 text-xs font-medium"
          >
            {technology}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-2 text-sm font-medium">
        {project.links.map(({ kind, href }) => (
          <ExternalLink key={kind} href={href}>
            {t(`projects.links.${kind}`)}
          </ExternalLink>
        ))}
      </div>
    </article>
  );
}

export { ProjectCard };
