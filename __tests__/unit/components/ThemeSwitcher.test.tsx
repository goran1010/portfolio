import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeSwitcher } from "../../../src/components/ThemeSwitcher";
import { ThemeProvider } from "../../../src/contextData/ThemeProvider";

beforeEach(() => {
  document.documentElement.classList.remove("dark");
});

function renderSwitcher() {
  return render(
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>,
  );
}

describe("ThemeSwitcher", () => {
  test.each([
    { storedTheme: null, expectedLabel: "Light", expectedStored: "light" },
    { storedTheme: "light", expectedLabel: "Dark", expectedStored: "dark" },
    { storedTheme: "dark", expectedLabel: "System", expectedStored: null },
  ])(
    "cycles from $storedTheme to $expectedLabel on click",
    async ({ storedTheme, expectedLabel, expectedStored }) => {
      if (storedTheme !== null) localStorage.setItem("theme", storedTheme);

      renderSwitcher();

      await userEvent.click(
        screen.getByRole("button", { name: /Toggle theme/i }),
      );

      expect(
        screen.getByRole("button", {
          name: `Toggle theme - ${expectedLabel}`,
        }),
      ).toBeInTheDocument();
      expect(localStorage.getItem("theme")).toBe(expectedStored);
    },
  );

  test("applies the dark class when switched to dark", async () => {
    localStorage.setItem("theme", "light");

    renderSwitcher();

    await userEvent.click(
      screen.getByRole("button", { name: /Toggle theme/i }),
    );

    expect(document.documentElement).toHaveClass("dark");
  });
});
