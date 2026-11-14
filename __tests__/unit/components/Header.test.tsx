import { screen, within } from "@testing-library/react";
import { Header } from "../../../src/components/Header";
import { renderWithProviders } from "../../utils/renderWithProviders";

function navLinks() {
  const nav = screen.getByRole("navigation");
  return within(nav)
    .getAllByRole("link")
    .map((link) => [link.textContent, link.getAttribute("href")]);
}

describe("Header", () => {
  test("links to every section in page order", () => {
    renderWithProviders(<Header />);

    expect(navLinks()).toEqual([
      ["About", "#about"],
      ["Open source & research", "#experience"],
      ["Projects", "#projects"],
      ["Skills", "#skills"],
      ["Contact", "#contact"],
    ]);
  });

  test("labels the links in Serbian", () => {
    localStorage.setItem("language", "sr");

    renderWithProviders(<Header />);

    expect(
      screen.getByRole("navigation", { name: "Sekcije stranice" }),
    ).toBeInTheDocument();
    expect(navLinks().map(([text]) => text)).toEqual([
      "O meni",
      "Otvoreni kod i istraživanje",
      "Projekti",
      "Vještine",
      "Kontakt",
    ]);
  });

  test("holds both switchers", () => {
    renderWithProviders(<Header />);

    expect(
      screen.getByRole("button", { name: /^Language:/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Theme:/ })).toBeInTheDocument();
  });
});
