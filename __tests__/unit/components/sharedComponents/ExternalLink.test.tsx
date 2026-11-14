import { screen } from "@testing-library/react";
import { ExternalLink } from "../../../../src/components/sharedComponents/ExternalLink";
import { renderWithProviders } from "../../../utils/renderWithProviders";

describe("ExternalLink", () => {
  test("opens in a new tab and says so to screen readers", () => {
    renderWithProviders(
      <ExternalLink href="https://example.com">Example</ExternalLink>,
    );

    const link = screen.getByRole("link", {
      name: "Example (opens in new tab)",
    });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("stays in the same tab when newTab is false", () => {
    renderWithProviders(
      <ExternalLink href="mailto:someone@example.com" newTab={false}>
        Email
      </ExternalLink>,
    );

    const link = screen.getByRole("link", { name: "Email" });
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  test("announces the new tab in Serbian", () => {
    localStorage.setItem("language", "sr");

    renderWithProviders(
      <ExternalLink href="https://example.com">Primjer</ExternalLink>,
    );

    expect(
      screen.getByRole("link", { name: "Primjer (otvara se u novoj kartici)" }),
    ).toBeInTheDocument();
  });
});
