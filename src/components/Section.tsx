import { useLanguage } from "../customHooks/useLanguage";

import type { ReactNode } from "react";
import type { SectionId } from "../data/sections";

function Section({
  id,
  children,
  className = "py-10",
}: {
  id: SectionId;
  children?: ReactNode;
  className?: string;
}) {
  const { t } = useLanguage();
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      tabIndex={-1}
      className={`flex flex-col gap-4 ${className}`}
    >
      <h2 id={headingId} className="text-2xl font-bold">
        {t(`sections.${id}`)}
      </h2>
      {children}
    </section>
  );
}

export { Section };
