import { screen, within } from "@testing-library/react";
import { Projects } from "../../../src/components/Projects";
import { renderWithProviders } from "../../utils/renderWithProviders";

describe("Projects", () => {
  test.each([
    {
      language: "en",
      heading: "Projects",
      technologies: "Technologies",
      description: "An open-source directory",
      more: /^More on GitHub /,
    },
    {
      language: "sr",
      heading: "Projekti",
      technologies: "Tehnologije",
      description: "Open-source portal",
      more: /^Više na GitHubu /,
    },
  ])(
    "renders project descriptions and controls in $language",
    ({ language, heading, technologies, description, more }) => {
      localStorage.setItem("language", language);

      renderWithProviders(<Projects />);

      const section = screen.getByRole("region", { name: heading });
      const atlas = within(section).getByRole("article", {
        name: "Atlas Univerziteta",
      });
      const waldo = within(section).getByRole("article", {
        name: "Where's Waldo?",
      });

      expect(within(section).getAllByRole("article")).toHaveLength(2);
      expect(atlas).toHaveTextContent(description);
      expect(
        within(atlas).getByRole("list", { name: technologies }),
      ).toHaveTextContent("PostgreSQL");
      expect(
        within(waldo).getByRole("list", { name: technologies }),
      ).toHaveTextContent("Prisma");
      expect(within(section).getByRole("link", { name: more })).toHaveAttribute(
        "href",
        "https://github.com/goran1010",
      );
    },
  );

  test("links Atlas to its live app and source repository", () => {
    localStorage.setItem("language", "en");

    renderWithProviders(<Projects />);

    const atlas = screen.getByRole("article", { name: "Atlas Univerziteta" });
    expect(
      within(atlas).getByRole("link", { name: /^Live app / }),
    ).toHaveAttribute("href", "https://atlasuniverziteta.com");
    expect(within(atlas).getByRole("link", { name: /^Code / })).toHaveAttribute(
      "href",
      "https://github.com/goran1010/atlas-univerziteta",
    );
  });

  test("links Waldo only to the frontend and backend repositories", () => {
    localStorage.setItem("language", "en");

    renderWithProviders(<Projects />);

    const waldo = screen.getByRole("article", { name: "Where's Waldo?" });
    expect(within(waldo).getAllByRole("link")).toHaveLength(2);
    expect(
      within(waldo).getByRole("link", { name: /^Frontend / }),
    ).toHaveAttribute("href", "https://github.com/goran1010/waldo-front-end");
    expect(
      within(waldo).getByRole("link", { name: /^Backend / }),
    ).toHaveAttribute("href", "https://github.com/goran1010/waldo-back-end");
  });
});
