import { screen, within } from "@testing-library/react";
import { OpenSource } from "../../../src/components/OpenSource";
import { renderWithProviders } from "../../utils/renderWithProviders";

describe("OpenSource", () => {
  test.each([
    {
      language: "en",
      heading: "Open source & research",
      role: "maintainer since May 2026",
      period: "November 2025 - present",
    },
    {
      language: "sr",
      heading: "Open-source i istraživanje",
      role: "maintainer od maja 2026",
      period: "Novembar 2025 - danas",
    },
  ])(
    "renders the CV experience in $language",
    ({ language, heading, role, period }) => {
      localStorage.setItem("language", language);

      renderWithProviders(<OpenSource />);

      const section = screen.getByRole("region", { name: heading });
      const odin = within(section).getByRole("article", {
        name: "The Odin Project",
      });
      const metr = within(section).getByRole("article", { name: "METR" });

      expect(odin).toHaveTextContent(role);
      expect(odin).toHaveTextContent("Full Stack JavaScript");
      expect(odin).toHaveTextContent("ESLint");
      expect(metr).toHaveTextContent(period);
      expect(metr).toHaveTextContent("200+");
    },
  );

  test("filters the public GitHub search to merged PRs by the right author and organization", () => {
    localStorage.setItem("language", "en");

    renderWithProviders(<OpenSource />);

    const link = screen.getByRole("link", { name: /^Merged pull requests / });
    const url = new URL(link.getAttribute("href") ?? "");

    expect(url.origin).toBe("https://github.com");
    expect(url.pathname).toBe("/search");
    expect(url.searchParams.get("type")).toBe("pullrequests");
    expect(url.searchParams.get("q")?.split(" ")).toEqual(
      expect.arrayContaining([
        "org:TheOdinProject",
        "author:goran1010",
        "is:pr",
        "is:merged",
      ]),
    );
  });

  test("links to the organizations' public pages", () => {
    localStorage.setItem("language", "en");

    renderWithProviders(<OpenSource />);

    const odin = screen.getByRole("article", { name: "The Odin Project" });
    const metr = screen.getByRole("article", { name: "METR" });

    expect(
      within(odin).getByRole("link", { name: /^GitHub / }),
    ).toHaveAttribute("href", "https://github.com/TheOdinProject");
    expect(
      within(metr).getByRole("link", { name: /^metr\.org / }),
    ).toHaveAttribute("href", "https://metr.org/");
  });
});
