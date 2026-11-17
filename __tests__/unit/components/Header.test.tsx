import { act, screen, within } from "@testing-library/react";
import { Header } from "../../../src/components/Header";
import { renderWithProviders } from "../../utils/renderWithProviders";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function mediaQuery(query: string, matches: boolean) {
  return Object.assign(new EventTarget(), {
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  });
}

function mockDesktop(matches: boolean) {
  const media = mediaQuery("(min-width: 48rem)", matches);
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) =>
      query === media.media ? media : mediaQuery(query, false),
    ),
  );

  return (desktop: boolean) => {
    act(() => {
      media.matches = desktop;
      media.dispatchEvent(
        Object.assign(new Event("change"), { matches: desktop }),
      );
    });
  };
}

function navLinks() {
  const nav = screen.getByRole("navigation");
  return within(nav)
    .getAllByRole("link")
    .map((link) => [link.textContent, link.getAttribute("href")]);
}

describe("Header", () => {
  test("links to every portfolio section", () => {
    mockDesktop(true);
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
    mockDesktop(true);
    localStorage.setItem("language", "sr");
    renderWithProviders(<Header />);

    expect(
      screen.getByRole("navigation", { name: "Sekcije stranice" }),
    ).toBeInTheDocument();
    expect(navLinks().map(([text]) => text)).toEqual([
      "O meni",
      "Open-source i istraživanje",
      "Projekti",
      "Vještine",
      "Kontakt",
    ]);
  });

  test("places desktop navigation between theme and language in tab order", async () => {
    mockDesktop(true);
    const { user } = renderWithProviders(<Header />);

    expect(
      screen.queryByRole("button", { name: "Open navigation" }),
    ).not.toBeInTheDocument();
    await user.tab();
    expect(screen.getByRole("button", { name: /^Theme:/ })).toHaveFocus();
    for (const link of within(screen.getByRole("navigation")).getAllByRole(
      "link",
    )) {
      await user.tab();
      expect(link).toHaveFocus();
    }
    await user.tab();
    expect(screen.getByRole("button", { name: /^Language:/ })).toHaveFocus();
  });

  test("keeps mobile navigation hidden and skips its links in tab order", async () => {
    const { user } = renderWithProviders(<Header />);
    const toggle = screen.getByRole("button", { name: "Open navigation" });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    await user.tab();
    expect(screen.getByRole("button", { name: /^Theme:/ })).toHaveFocus();
    await user.tab();
    expect(toggle).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: /^Language:/ })).toHaveFocus();
  });

  test("toggles the mobile links with a named control", async () => {
    const { user } = renderWithProviders(<Header />);
    const toggle = screen.getByRole("button", { name: "Open navigation" });

    await user.click(toggle);

    const navigation = screen.getByRole("navigation", {
      name: "Page sections",
    });
    expect(toggle).toHaveAttribute("aria-controls", navigation.id);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Close navigation");
    expect(within(navigation).getAllByRole("link")).toHaveLength(5);

    await user.click(toggle);

    expect(toggle).toHaveAccessibleName("Open navigation");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  test("supports Space, Enter, Tab and Escape with focus returned to the toggle", async () => {
    const { user } = renderWithProviders(<Header />);
    const toggle = screen.getByRole("button", { name: "Open navigation" });

    await user.tab();
    await user.tab();
    await user.keyboard(" ");
    await user.tab();
    expect(screen.getByRole("link", { name: "About" })).toHaveFocus();
    await user.tab();
    expect(
      screen.getByRole("link", { name: "Open source & research" }),
    ).toHaveFocus();
    await user.keyboard("{Escape}");

    expect(toggle).toHaveFocus();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    await user.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  test("closes after selecting a section", async () => {
    const { user } = renderWithProviders(<Header />);

    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    await user.click(screen.getByRole("link", { name: "About" }));

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  test("closes when tabbing out without interrupting focus", async () => {
    const { user } = renderWithProviders(
      <>
        <Header />
        <button type="button">Continue</button>
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    for (let index = 0; index < 7; index++) await user.tab();

    expect(screen.getByRole("button", { name: "Continue" })).toHaveFocus();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  test("dismisses on outside click without taking focus from the target", async () => {
    const { user } = renderWithProviders(
      <>
        <Header />
        <button type="button">Continue</button>
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    await user.tab();
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByRole("button", { name: "Continue" })).toHaveFocus();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  test("keeps section links visible on desktop and resets the mobile state on resize", async () => {
    const resize = mockDesktop(false);
    const { user } = renderWithProviders(<Header />);

    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    await user.tab();
    const about = screen.getByRole("link", { name: "About" });
    expect(about).toHaveFocus();

    resize(true);
    expect(screen.getByRole("navigation")).toBeVisible();
    expect(about).toHaveFocus();
    expect(
      screen.queryByRole("button", { name: /navigation/ }),
    ).not.toBeInTheDocument();

    resize(false);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveFocus();
  });

  test("moves focus from the disappearing mobile toggle to desktop navigation", async () => {
    const resize = mockDesktop(false);
    const { user } = renderWithProviders(<Header />);

    await user.tab();
    await user.tab();
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveFocus();

    resize(true);
    expect(screen.getByRole("link", { name: "About" })).toHaveFocus();
  });

  test("localizes the mobile toggle and leaves both switchers available", async () => {
    localStorage.setItem("language", "sr");
    const { user } = renderWithProviders(<Header />);

    await user.click(screen.getByRole("button", { name: "Otvori navigaciju" }));
    expect(
      screen.getByRole("button", { name: "Zatvori navigaciju" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Sekcije stranice" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Jezik:/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Tema:/ })).toBeInTheDocument();
  });
});
