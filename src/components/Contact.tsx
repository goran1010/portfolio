import { useLanguage } from "../customHooks/useLanguage";
import { CONTACT_LINKS, EMAIL_ADDRESS } from "../data/contact";
import { Section } from "./Section";
import { ExternalLink } from "./sharedComponents/ExternalLink";

function Contact() {
  const { t } = useLanguage();

  return (
    <Section id="contact">
      <address className="flex flex-col items-start gap-4 not-italic">
        <p className="flex flex-wrap gap-x-2 gap-y-1">
          <span className="font-medium">{t("links.email")}:</span>
          <ExternalLink
            href={CONTACT_LINKS.email}
            newTab={false}
            className="break-all"
          >
            {EMAIL_ADDRESS}
          </ExternalLink>
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <ExternalLink href={CONTACT_LINKS.linkedin}>LinkedIn</ExternalLink>
          <ExternalLink href={CONTACT_LINKS.github}>GitHub</ExternalLink>
        </div>
      </address>
    </Section>
  );
}

export { Contact };
