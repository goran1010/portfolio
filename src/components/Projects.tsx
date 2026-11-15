import { useLanguage } from "../customHooks/useLanguage";
import { CONTACT_LINKS } from "../data/contact";
import { PROJECTS } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import { Section } from "./Section";
import { ExternalLink } from "./sharedComponents/ExternalLink";

function Projects() {
  const { t } = useLanguage();

  return (
    <Section id="projects">
      <div className="grid gap-5 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <p className="text-sm font-medium">
        <ExternalLink href={CONTACT_LINKS.github}>
          {t("projects.moreOnGithub")}
        </ExternalLink>
      </p>
    </Section>
  );
}

export { Projects };
