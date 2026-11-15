type ProjectLinkKind = "live" | "code" | "frontend" | "backend";

interface Project {
  id: "atlas" | "waldo";
  technologies: readonly string[];
  links: readonly { kind: ProjectLinkKind; href: string }[];
}

const PROJECTS = [
  {
    id: "atlas",
    technologies: [
      "React",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Docker",
      "Playwright",
    ],
    links: [
      { kind: "live", href: "https://atlasuniverziteta.com" },
      { kind: "code", href: "https://github.com/goran1010/atlas-univerziteta" },
    ],
  },
  {
    id: "waldo",
    technologies: ["React", "Express", "Prisma", "JWT"],
    links: [
      {
        kind: "frontend",
        href: "https://github.com/goran1010/waldo-front-end",
      },
      { kind: "backend", href: "https://github.com/goran1010/waldo-back-end" },
    ],
  },
] as const satisfies readonly Project[];

export { PROJECTS };
export type { Project };
