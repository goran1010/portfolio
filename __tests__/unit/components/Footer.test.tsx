import { screen } from "@testing-library/react";
import { Footer } from "../../../src/components/Footer";
import { renderWithProviders } from "../../utils/renderWithProviders";

afterEach(() => {
  vi.useRealTimers();
});

describe("Footer", () => {
  test("shows the current year", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2027-03-01"));

    renderWithProviders(<Footer />);

    expect(screen.getByText("© 2027 Goran Jović")).toBeInTheDocument();
  });

  test("links to the site's source on GitHub", () => {
    renderWithProviders(<Footer />);

    expect(
      screen.getByRole("link", { name: "Source code (opens in new tab)" }),
    ).toHaveAttribute("href", "https://github.com/goran1010/portfolio");
  });
});
