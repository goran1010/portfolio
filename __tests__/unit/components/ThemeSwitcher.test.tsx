import { screen } from "@testing-library/react";
import { ThemeSwitcher } from "../../../src/components/ThemeSwitcher";
import { renderWithProviders } from "../../utils/renderWithProviders";

beforeEach(() => {
  document.documentElement.classList.remove("dark");
});

describe("ThemeSwitcher", () => {
  test.each([
    {
      storedTheme: null,
      expectedName: "Theme: Light",
      expectedStored: "light",
    },
    {
      storedTheme: "light",
      expectedName: "Theme: Dark",
      expectedStored: "dark",
    },
    {
      storedTheme: "dark",
      expectedName: "Theme: System",
      expectedStored: null,
    },
  ])(
    "cycles from $storedTheme to $expectedStored on click",
    async ({ storedTheme, expectedName, expectedStored }) => {
      if (storedTheme !== null) localStorage.setItem("theme", storedTheme);
      const { user } = renderWithProviders(<ThemeSwitcher />);

      await user.click(screen.getByRole("button", { name: /^Theme:/ }));

      expect(
        screen.getByRole("button", { name: expectedName }),
      ).toBeInTheDocument();
      expect(localStorage.getItem("theme")).toBe(expectedStored);
    },
  );

  test("applies the dark class when switched to dark", async () => {
    localStorage.setItem("theme", "light");
    const { user } = renderWithProviders(<ThemeSwitcher />);

    await user.click(screen.getByRole("button", { name: /^Theme:/ }));

    expect(document.documentElement).toHaveClass("dark");
  });

  test("uses the Serbian label when the language is Serbian", () => {
    localStorage.setItem("language", "sr");

    renderWithProviders(<ThemeSwitcher />);

    expect(
      screen.getByRole("button", { name: "Tema: Sistemska" }),
    ).toBeInTheDocument();
  });
});
