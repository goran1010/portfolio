import { useLanguage } from "../customHooks/useLanguage";
import { Section } from "./Section";

function About() {
  const { t } = useLanguage();

  return (
    <Section id="about">
      <p className="max-w-2xl leading-7">{t("about.body")}</p>
    </Section>
  );
}

export { About };
