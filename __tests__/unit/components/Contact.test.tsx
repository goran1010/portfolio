import { screen, within } from "@testing-library/react";
import { Contact } from "../../../src/components/Contact";
import { renderWithProviders } from "../../utils/renderWithProviders";

describe("Contact", () => {
  test.each([
    { language: "en", heading: "Contact" },
    { language: "sr", heading: "Kontakt" },
  ])("shows the CV contact channels in $language", ({ language, heading }) => {
    localStorage.setItem("language", language);

    renderWithProviders(<Contact />);

    const section = screen.getByRole("region", { name: heading });
    expect(within(section).getAllByRole("link")).toHaveLength(3);
    expect(within(section).getByText("Email:")).toBeInTheDocument();
    const email = within(section).getByRole("link", {
      name: "goran1010jovic@gmail.com",
    });
    expect(email).toHaveAttribute("href", "mailto:goran1010jovic@gmail.com");
    expect(email).not.toHaveAttribute("target");
    expect(
      within(section).getByRole("link", { name: /^LinkedIn / }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/goran-jovic-dev");
    expect(
      within(section).getByRole("link", { name: /^GitHub / }),
    ).toHaveAttribute("href", "https://github.com/goran1010");
    expect(
      section.querySelector("form, input, textarea, a[href^='tel:']"),
    ).toBeNull();
  });
});
