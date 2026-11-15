const SKILL_GROUPS = [
  {
    id: "frontend",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "React Router",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    id: "backend",
    skills: [
      "Node.js",
      "Express",
      "REST APIs",
      "PostgreSQL",
      "Prisma",
      "Zod",
      "Better Auth",
    ],
  },
  {
    id: "testing",
    skills: [
      "Playwright (E2E)",
      "Vitest",
      "Jest",
      "React Testing Library",
      "Supertest",
      "axe-core",
    ],
  },
  {
    id: "tools",
    skills: [
      "Git/GitHub",
      "Docker",
      "Docker Compose",
      "GitHub Actions (CI/CD)",
      "Linux",
      "Caddy",
    ],
  },
] as const;

export { SKILL_GROUPS };
