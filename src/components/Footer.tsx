import { useState } from "react";
import { useLanguage } from "../customHooks/useLanguage";
import { ExternalLink } from "./sharedComponents/ExternalLink";

function Footer() {
  const { t } = useLanguage();
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 border-t border-(--border-color) p-4 text-sm text-(--text-muted) sm:px-6">
      <p>© {year} Goran Jović</p>
      <ExternalLink href="https://github.com/goran1010/portfolio">
        {t("footer.source")}
      </ExternalLink>
    </footer>
  );
}

export { Footer };
