import { screen } from "@testing-library/react";
import { CvDownload } from "../../../src/components/CvDownload";
import { renderWithProviders } from "../../utils/renderWithProviders";

describe("CvDownload", () => {
  test("toggles a named list of downloads", async () => {
    const { user } = renderWithProviders(<CvDownload />);
    const trigger = screen.getByRole("button", { name: "Download CV" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();

    await user.click(trigger);

    const options = screen.getByRole("list", { name: "Download CV" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", options.id);
    expect(screen.getByRole("link", { name: "English (PDF)" })).toHaveAttribute(
      "lang",
      "en",
    );
    expect(screen.getByRole("link", { name: "Srpski (PDF)" })).toHaveAttribute(
      "lang",
      "sr-Latn",
    );

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  test("supports keyboard activation, link navigation and Escape", async () => {
    const { user } = renderWithProviders(<CvDownload />);
    const trigger = screen.getByRole("button", { name: "Download CV" });

    await user.tab();
    expect(trigger).toHaveFocus();
    await user.keyboard(" ");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.tab();
    expect(screen.getByRole("link", { name: "English (PDF)" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("link", { name: "Srpski (PDF)" })).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole("link", { name: "English (PDF)" })).toHaveFocus();
    await user.keyboard("{Escape}");

    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  test("closes when focus leaves without interrupting tab order", async () => {
    const { user } = renderWithProviders(
      <>
        <CvDownload />
        <button type="button">Continue</button>
      </>,
    );
    const trigger = screen.getByRole("button", { name: "Download CV" });

    await user.click(trigger);
    await user.tab();
    await user.tab();
    await user.tab();

    expect(screen.getByRole("button", { name: "Continue" })).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.tab({ shift: true });
    expect(trigger).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.tab({ shift: true });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("dismisses on outside click without taking focus from its target", async () => {
    const { user } = renderWithProviders(
      <>
        <CvDownload />
        <button type="button">Continue</button>
      </>,
    );
    const trigger = screen.getByRole("button", { name: "Download CV" });

    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button", { name: "Continue" })).toHaveFocus();

    await user.click(trigger);
    await user.click(document.body);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
