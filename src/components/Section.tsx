import { useLanguage } from "../customHooks/useLanguage";

import type { ReactNode } from "react";
import type { SectionId } from "../data/sections";

function Section({ id, children }: { id: SectionId; children?: ReactNode }) {
  const { t } = useLanguage();
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="flex flex-col gap-4 py-10"
    >
      <h2 id={headingId} className="text-2xl font-bold">
        {t(`sections.${id}`)}
      </h2>
      {children}
    </section>
  );
}

export { Section };
