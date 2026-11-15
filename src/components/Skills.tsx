import { useLanguage } from "../customHooks/useLanguage";
import { SKILL_GROUPS } from "../data/skills";
import { Section } from "./Section";

function Skills() {
  const { t } = useLanguage();

  return (
    <Section id="skills">
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {SKILL_GROUPS.map(({ id, skills }) => {
          const headingId = `${id}-skills-heading`;

          return (
            <div key={id} className="flex flex-col gap-3">
              <h3 id={headingId} className="font-semibold">
                {t(`skills.groups.${id}`)}
              </h3>
              <ul aria-labelledby={headingId} className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-(--border-color) bg-(--surface-1) px-2 py-1 text-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export { Skills };
