import { useLanguage } from "../../customHooks/useLanguage";

import type { ReactNode } from "react";

const baseClassName =
  "underline underline-offset-3 decoration-1 hover:decoration-2 hover:text-(--accent-text) transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring)";

function ExternalLink({
  href,
  newTab = true,
  className = "",
  children,
}: {
  href: string;
  newTab?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const { t } = useLanguage();

  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={`${baseClassName} ${className}`}
    >
      {children}
      {newTab && (
        <>
          {" "}
          <span className="sr-only">{t("links.opensInNewTab")}</span>
        </>
      )}
    </a>
  );
}

export { ExternalLink };
