const SECTION_IDS = [
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

export { SECTION_IDS };
export type { SectionId };
