import { screen, within } from "@testing-library/react";
import { Skills } from "../../../src/components/Skills";
import { renderWithProviders } from "../../utils/renderWithProviders";

describe("Skills", () => {
  test.each([
    {
      language: "en",
      heading: "Skills",
      groups: [
        ["Frontend & languages", "React Router"],
        ["Backend & data", "Better Auth"],
        ["Testing & quality", "React Testing Library"],
        ["Tools & deployment", "GitHub Actions (CI/CD)"],
      ],
    },
    {
      language: "sr",
      heading: "Vještine",
      groups: [
        ["Frontend i jezici", "React Router"],
        ["Backend i baze podataka", "Better Auth"],
        ["Testiranje", "React Testing Library"],
        ["Alati i postavljanje aplikacija", "GitHub Actions (CI/CD)"],
      ],
    },
  ] as const)(
    "labels the four CV groups in $language and keeps tool names unchanged",
    ({ language, heading, groups }) => {
      localStorage.setItem("language", language);

      renderWithProviders(<Skills />);

      const section = screen.getByRole("region", { name: heading });
      const lists = within(section).getAllByRole("list");
      expect(lists).toHaveLength(4);
      expect(within(section).getAllByRole("listitem")).toHaveLength(26);
      groups.forEach(([group, example]) => {
        expect(
          within(section).getByRole("list", { name: group }),
        ).toHaveTextContent(example);
      });
    },
  );
});
