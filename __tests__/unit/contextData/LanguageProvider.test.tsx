import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "../../../src/contextData/LanguageProvider";
import { useLanguage } from "../../../src/customHooks/useLanguage";
import {
  restoreNavigatorLanguages,
  setNavigatorLanguages,
} from "../../utils/navigatorLanguages";

afterEach(() => {
  restoreNavigatorLanguages();
});

function LanguageProbe() {
  const { language, resolvedLanguage, t } = useLanguage();

  return (
    <div>
      <span data-testid="language-value">{language}</span>
      <span data-testid="resolved-language-value">{resolvedLanguage}</span>
      <span data-testid="translated">{t("theme.dark")}</span>
    </div>
  );
}

function renderProbe() {
  return render(
    <LanguageProvider>
      <LanguageProbe />
    </LanguageProvider>,
  );
}

describe("LanguageProvider", () => {
  test.each([
    { stored: "en", tag: "en", title: "Goran Jović - Software Developer" },
    { stored: "sr", tag: "sr-Latn", title: "Goran Jović - Programer" },
  ])(
    "sets <html lang> to $tag and the title for stored $stored",
    ({ stored, tag, title }) => {
      localStorage.setItem("language", stored);

      renderProbe();

      expect(document.documentElement.lang).toBe(tag);
      expect(document.title).toBe(title);
    },
  );

  test("translates with the stored language", () => {
    localStorage.setItem("language", "sr");

    renderProbe();

    expect(screen.getByTestId("translated")).toHaveTextContent("Tamna");
  });

  test("resolves system to Serbian for a Bosnian browser", () => {
    setNavigatorLanguages(["bs-BA"]);

    renderProbe();

    expect(screen.getByTestId("language-value")).toHaveTextContent("system");
    expect(screen.getByTestId("resolved-language-value")).toHaveTextContent(
      "sr",
    );
    expect(document.documentElement.lang).toBe("sr-Latn");
  });

  test("falls back to system and cleans up an invalid stored value", () => {
    localStorage.setItem("language", "garbage");

    renderProbe();

    expect(screen.getByTestId("language-value")).toHaveTextContent("system");
    expect(localStorage.getItem("language")).toBeNull();
  });
});
