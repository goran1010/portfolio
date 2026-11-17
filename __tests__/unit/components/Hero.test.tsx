import { screen, within } from "@testing-library/react";
import { Hero } from "../../../src/components/Hero";
import {
  restoreNavigatorLanguages,
  setNavigatorLanguages,
} from "../../utils/navigatorLanguages";
import { renderWithProviders } from "../../utils/renderWithProviders";

afterEach(restoreNavigatorLanguages);

describe("Hero", () => {
  test.each([
    {
      preference: "en",
      systemLanguage: "en-US",
      label: "Download CV",
      title: "Software Developer",
      htmlLanguage: "en",
    },
    {
      preference: "sr",
      systemLanguage: "en-US",
      label: "Preuzmi CV",
      title: "Programer",
      htmlLanguage: "sr-Latn",
    },
    {
      preference: null,
      systemLanguage: "en-US",
      label: "Download CV",
      title: "Software Developer",
      htmlLanguage: "en",
    },
    {
      preference: null,
      systemLanguage: "bs-BA",
      label: "Preuzmi CV",
      title: "Programer",
      htmlLanguage: "sr-Latn",
    },
  ])(
    "offers both CVs with preference $preference and system $systemLanguage",
    async ({ preference, systemLanguage, label, title, htmlLanguage }) => {
      if (preference) localStorage.setItem("language", preference);
      setNavigatorLanguages([systemLanguage]);

      const { user } = renderWithProviders(<Hero />);
      const trigger = screen.getByRole("button", { name: label });
      const pageTitle = document.title;

      for (const { name, code } of [
        { name: "English (PDF)", code: "en" },
        { name: "Srpski (PDF)", code: "sr" },
      ]) {
        await user.click(trigger);

        const link = screen.getByRole("link", { name });
        expect(link).toHaveAttribute("href", `/Goran-Jovic-CV-${code}.pdf`);
        expect(link).toHaveAttribute("download");

        // jsdom cannot perform native downloads; the browser check covers them.
        link.addEventListener(
          "click",
          (event) => {
            event.preventDefault();
          },
          { once: true },
        );
        await user.click(link);

        expect(trigger).toHaveAttribute("aria-expanded", "false");
        expect(trigger).toHaveFocus();
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(document.documentElement.lang).toBe(htmlLanguage);
        expect(document.title).toBe(pageTitle);
        expect(localStorage.getItem("language")).toBe(preference);
      }
    },
  );

  test("groups contact details in a section after the CV control", () => {
    localStorage.setItem("language", "en");

    renderWithProviders(<Hero />);

    const contact = screen.getByRole("region", { name: "Contact" });
    const download = screen.getByRole("button", { name: "Download CV" });
    expect(
      download.compareDocumentPosition(contact) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      within(contact).getByRole("link", { name: /^GitHub / }),
    ).toHaveAttribute("href", "https://github.com/goran1010");
    expect(
      within(contact).getByRole("link", { name: /^LinkedIn / }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/goran-jovic-dev");
    const email = within(contact).getByRole("link", {
      name: "goran1010jovic@gmail.com",
    });
    expect(email).toHaveAttribute("href", "mailto:goran1010jovic@gmail.com");
    expect(email).not.toHaveAttribute("target");
  });
});
