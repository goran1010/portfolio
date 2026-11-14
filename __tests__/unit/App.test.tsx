import { screen } from "@testing-library/react";
import { App } from "../../src/App";
import { renderWithProviders } from "../utils/renderWithProviders";

describe("App", () => {
  test("renders the name as the page heading", () => {
    renderWithProviders(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Goran Jović" }),
    ).toBeInTheDocument();
  });

  test("switches the page text to Serbian from the language switcher", async () => {
    localStorage.setItem("language", "en");
    const { user } = renderWithProviders(<App />);

    expect(screen.getByText("Software Developer")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^Language:/ }));

    expect(screen.getByText("Programer")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("sr-Latn");
  });
});
