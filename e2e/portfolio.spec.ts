import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

for (const language of [
  {
    name: "English",
    locale: "en-GB",
    download: "Download CV",
    skip: "Skip to content",
    navigation: "Page sections",
    sections: [
      { id: "about", name: "About" },
      { id: "experience", name: "Open source & research" },
      { id: "projects", name: "Projects" },
      { id: "skills", name: "Skills" },
      { id: "contact", name: "Contact" },
    ],
  },
  {
    name: "Serbian",
    locale: "sr-RS",
    download: "Preuzmi CV",
    skip: "Preskoči na sadržaj",
    navigation: "Sekcije stranice",
    sections: [
      { id: "about", name: "O meni" },
      { id: "experience", name: "Open-source i istraživanje" },
      { id: "projects", name: "Projekti" },
      { id: "skills", name: "Vještine" },
      { id: "contact", name: "Kontakt" },
    ],
  },
]) {
  test.describe(language.name, () => {
    test.use({ locale: language.locale });

    test("renders the portfolio and scrolls to every section from navigation", async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));

      await page.goto("/");
      await expect(
        page.getByRole("heading", { level: 1, name: "Goran Jović" }),
      ).toBeVisible();
      await expect(page.getByRole("main").getByRole("region")).toHaveCount(5);
      await expect(
        page.getByRole("heading", { name: "The Odin Project", exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Atlas Univerziteta", exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Where's Waldo?", exact: true }),
      ).toBeVisible();
      await expect(
        page
          .getByRole("main")
          .getByRole("link", { name: "goran1010jovic@gmail.com" }),
      ).toHaveAttribute("href", "mailto:goran1010jovic@gmail.com");

      const navigation = page.getByRole("navigation", {
        name: language.navigation,
      });
      for (const { id, name } of language.sections) {
        const section = page.getByRole("region", { name, exact: true });
        await expect(section).toBeVisible();
        await navigation.getByRole("link", { name, exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        await expect(
          section.getByRole("heading", { level: 2, name, exact: true }),
        ).toBeInViewport();
      }
      expect(errors).toEqual([]);
    });

    test("supports the skip link and CV chooser keyboard navigation at 320px", async ({
      page,
    }) => {
      await page.setViewportSize({ width: 320, height: 900 });
      await page.goto("/");
      const trigger = page.getByRole("button", { name: language.download });

      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("link", { name: language.skip }),
      ).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.getByRole("main")).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(trigger).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(
        page.getByRole("list", { name: language.download }),
      ).toBeInViewport({ ratio: 1 });
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
      ).toBe(true);

      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("link", { name: "English (PDF)" }),
      ).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("link", { name: "Srpski (PDF)" }),
      ).toBeFocused();
      await page.keyboard.press("Shift+Tab");
      await expect(
        page.getByRole("link", { name: "English (PDF)" }),
      ).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(trigger).toBeFocused();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");

      await page.keyboard.press("Space");
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await expect(
        page
          .getByRole("main")
          .getByRole("link", { name: /^GitHub / })
          .first(),
      ).toBeFocused();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");

      await trigger.click();
      await page.getByRole("heading", { level: 1 }).click();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });
}

for (const mode of [
  {
    name: "explicit English",
    locale: "sr-RS",
    preference: "en",
    tag: "en",
    download: "Download CV",
  },
  {
    name: "explicit Serbian",
    locale: "en-GB",
    preference: "sr",
    tag: "sr-Latn",
    download: "Preuzmi CV",
  },
  {
    name: "system English",
    locale: "en-GB",
    preference: null,
    tag: "en",
    download: "Download CV",
  },
  {
    name: "system Serbian",
    locale: "bs-BA",
    preference: null,
    tag: "sr-Latn",
    download: "Preuzmi CV",
  },
]) {
  test.describe(`${mode.name} CV downloads`, () => {
    test.use({ locale: mode.locale, viewport: { width: 320, height: 900 } });

    test.beforeEach(async ({ page }) => {
      if (mode.preference) {
        await page.addInitScript((preference) => {
          localStorage.setItem("language", preference);
        }, mode.preference);
      }
    });

    test("downloads both PDFs without changing page language or preferences", async ({
      page,
    }, testInfo) => {
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute("lang", mode.tag);
      const trigger = page.getByRole("button", { name: mode.download });
      await expect(trigger).toBeVisible();
      const originalState = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        title: document.title,
        text: document.querySelector("main")?.textContent,
        storage: JSON.stringify(localStorage),
        url: location.href,
      }));
      expect(await page.evaluate(() => localStorage.getItem("language"))).toBe(
        mode.preference,
      );

      for (const { language, name } of [
        { language: "en", name: "English (PDF)" },
        { language: "sr", name: "Srpski (PDF)" },
      ]) {
        await trigger.click();
        const link = page.getByRole("link", { name });
        const filename = `Goran-Jovic-CV-${language}.pdf`;
        await expect(link).toHaveAttribute("href", `/${filename}`);
        await expect(link).toHaveAttribute("download", "");

        const downloadPromise = page.waitForEvent("download");
        await link.press("Enter");
        const download = await downloadPromise;
        expect(download.suggestedFilename()).toBe(filename);
        const path = testInfo.outputPath(filename);
        await download.saveAs(path);
        expect(await download.failure()).toBeNull();
        const actual = await readFile(path);
        const expected = await readFile(
          new URL(`../public/${filename}`, import.meta.url),
        );
        expect(createHash("sha256").update(actual).digest("hex")).toBe(
          createHash("sha256").update(expected).digest("hex"),
        );

        await expect(trigger).toHaveAttribute("aria-expanded", "false");
        await expect(trigger).toBeFocused();
        expect(
          await page.evaluate(() => ({
            lang: document.documentElement.lang,
            title: document.title,
            text: document.querySelector("main")?.textContent,
            storage: JSON.stringify(localStorage),
            url: location.href,
          })),
        ).toEqual(originalState);
      }
    });
  });
}

test("language choices change page text and persist across reloads", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Language: System", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Language: English", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Language: English", exact: true }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  await page
    .getByRole("button", { name: "Language: English", exact: true })
    .click();
  await expect(page.getByText("Programer", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("region", { name: "O meni", exact: true }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "sr-Latn");
  await expect(page).toHaveTitle("Goran Jović - Programer");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Jezik: Srpski", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Programer", { exact: true })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "sr-Latn");
  expect(await page.evaluate(() => localStorage.getItem("language"))).toBe(
    "sr",
  );

  await page
    .getByRole("button", { name: "Jezik: Srpski", exact: true })
    .click();
  await expect(
    page.getByText("Software Developer", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(
    await page.evaluate(() => localStorage.getItem("language")),
  ).toBeNull();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Language: System", exact: true }),
  ).toBeVisible();
});

test("theme choices persist and System follows the browser preference", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page
    .getByRole("button", { name: "Theme: System", exact: true })
    .click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Theme: Light", exact: true }),
  ).toBeVisible();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(
    "light",
  );

  await page.getByRole("button", { name: "Theme: Light", exact: true }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Theme: Dark", exact: true }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveClass(/dark/);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

  await page.getByRole("button", { name: "Theme: Dark", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Theme: System", exact: true }),
  ).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBeNull();
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});

for (const mode of [
  { name: "explicit dark", stored: "dark", system: "light", expected: "dark" },
  {
    name: "explicit light",
    stored: "light",
    system: "dark",
    expected: "light",
  },
  { name: "system dark", stored: null, system: "dark", expected: "dark" },
  { name: "system light", stored: null, system: "light", expected: "light" },
] as const) {
  test.describe(`${mode.name} before first paint`, () => {
    test.use({ colorScheme: mode.system });

    test("applies the theme before React runs", async ({ page }) => {
      await page.addInitScript((storedTheme) => {
        if (storedTheme) localStorage.setItem("theme", storedTheme);
        new PerformanceObserver((list) => {
          if (list.getEntries().some((entry) => entry.name === "first-paint")) {
            document.documentElement.dataset["themeAtFirstPaint"] =
              document.documentElement.classList.contains("dark")
                ? "dark"
                : "light";
          }
        }).observe({ type: "paint", buffered: true });
      }, mode.stored);

      // Text ensures a measurable paint without letting React apply the theme.
      await page.route(/\/assets\/.*\.js$/, (route) =>
        route.fulfill({
          contentType: "application/javascript",
          body: 'document.body.append("Theme check");',
        }),
      );
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute(
        "data-theme-at-first-paint",
        mode.expected,
      );
      await expect(page.locator("html")).toHaveCSS(
        "color-scheme",
        mode.expected,
      );
      await expect(page.locator("#root")).toBeEmpty();
    });
  });
}
