import { screen } from "@testing-library/react";
import { LanguageSwitcher } from "../../../src/components/LanguageSwitcher";
import { renderWithProviders } from "../../utils/renderWithProviders";

describe("LanguageSwitcher", () => {
  test.each([
    { stored: null, expectedName: "Language: English", expectedStored: "en" },
    { stored: "en", expectedName: "Jezik: Srpski", expectedStored: "sr" },
    { stored: "sr", expectedName: "Language: System", expectedStored: null },
  ])(
    "cycles from $stored to $expectedStored on click",
    async ({ stored, expectedName, expectedStored }) => {
      if (stored !== null) localStorage.setItem("language", stored);
      const { user } = renderWithProviders(<LanguageSwitcher />);

      await user.click(screen.getByRole("button"));

      expect(
        screen.getByRole("button", { name: expectedName }),
      ).toBeInTheDocument();
      expect(localStorage.getItem("language")).toBe(expectedStored);
    },
  );

  test("shows the language code for an explicit choice", () => {
    localStorage.setItem("language", "sr");

    renderWithProviders(<LanguageSwitcher />);

    expect(
      screen.getByRole("button", { name: "Jezik: Srpski" }),
    ).toHaveTextContent("SR");
  });
});
