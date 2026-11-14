import { screen } from "@testing-library/react";
import { Hero } from "../../../src/components/Hero";
import {
  restoreNavigatorLanguages,
  setNavigatorLanguages,
} from "../../utils/navigatorLanguages";
import { renderWithProviders } from "../../utils/renderWithProviders";

afterEach(restoreNavigatorLanguages);

describe("Hero", () => {
  test.each([
    { language: "en", label: "Download CV (PDF)" },
    { language: "sr", label: "Preuzmi CV (PDF)" },
  ])(
    "downloads the $language CV for an explicit language",
    ({ language, label }) => {
      localStorage.setItem("language", language);

      renderWithProviders(<Hero />);

      const link = screen.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", `/Goran-Jovic-CV-${language}.pdf`);
      expect(link).toHaveAttribute("download");
    },
  );

  test("uses the resolved system language for the CV download", () => {
    setNavigatorLanguages(["bs-BA"]);

    renderWithProviders(<Hero />);

    expect(
      screen.getByRole("link", { name: "Preuzmi CV (PDF)" }),
    ).toHaveAttribute("href", "/Goran-Jovic-CV-sr.pdf");
  });

  test("links to the contact details from the CV", () => {
    localStorage.setItem("language", "en");

    renderWithProviders(<Hero />);

    expect(screen.getByRole("link", { name: /^GitHub / })).toHaveAttribute(
      "href",
      "https://github.com/goran1010",
    );
    expect(screen.getByRole("link", { name: /^LinkedIn / })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/goran-jovic-dev",
    );
    const email = screen.getByRole("link", { name: "Email" });
    expect(email).toHaveAttribute("href", "mailto:goran1010jovic@gmail.com");
    expect(email).not.toHaveAttribute("target");
  });
});
