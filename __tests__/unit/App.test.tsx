import { screen, within } from "@testing-library/react";
import { App } from "../../src/App";
import { renderWithProviders } from "../utils/renderWithProviders";

describe("App", () => {
  test("renders the name as the page heading", () => {
    renderWithProviders(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Goran Jović" }),
    ).toBeInTheDocument();
  });

  test("focuses the skip link first, and it targets main", async () => {
    const { user } = renderWithProviders(<App />);

    await user.tab();

    const skipLink = screen.getByRole("link", { name: "Skip to content" });
    expect(skipLink).toHaveFocus();
    expect(skipLink).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  test("every nav link points at a section with the same heading", () => {
    renderWithProviders(<App />);

    const nav = screen.getByRole("navigation", { name: "Page sections" });
    const links = within(nav).getAllByRole("link");

    expect(links).toHaveLength(5);
    for (const link of links) {
      const target = document.querySelector(link.getAttribute("href") ?? "");
      expect(target, link.textContent).toBe(
        screen.getByRole("region", { name: link.textContent }),
      );
    }
  });

  test("switches the page text to Serbian from the language switcher", async () => {
    localStorage.setItem("language", "en");
    const { user } = renderWithProviders(<App />);

    expect(screen.getByText("Software Developer")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Download CV" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "About" })).toHaveTextContent(
      "I started learning web development through The Odin Project",
    );

    await user.click(screen.getByRole("button", { name: /^Language:/ }));

    expect(screen.getByText("Programer")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Preuzmi CV" }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Preuzmi CV" }));
    expect(screen.getByRole("link", { name: "English (PDF)" })).toHaveAttribute(
      "href",
      "/Goran-Jovic-CV-en.pdf",
    );
    expect(screen.getByRole("link", { name: "Srpski (PDF)" })).toHaveAttribute(
      "href",
      "/Goran-Jovic-CV-sr.pdf",
    );
    expect(screen.getByRole("region", { name: "O meni" })).toHaveTextContent(
      "Web razvoj sam učio kroz The Odin Project",
    );
    expect(screen.getByRole("link", { name: "Vještine" })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Open-source i istraživanje" }),
    ).toHaveTextContent("maintainer od maja 2026");
    expect(screen.getByRole("region", { name: "Projekti" })).toHaveTextContent(
      "Open-source portal",
    );
    expect(
      within(screen.getByRole("region", { name: "Vještine" })).getByRole(
        "list",
        {
          name: "Frontend i jezici",
        },
      ),
    ).toHaveTextContent("React Router");
    expect(
      within(screen.getByRole("region", { name: "Kontakt" })).getByRole(
        "link",
        {
          name: "goran1010jovic@gmail.com",
        },
      ),
    ).toHaveAttribute("href", "mailto:goran1010jovic@gmail.com");
    expect(document.documentElement.lang).toBe("sr-Latn");
  });
});
