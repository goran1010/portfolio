import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const language of [
  { name: "English", locale: "en-GB", tag: "en", download: "Download CV" },
  { name: "Serbian", locale: "sr-RS", tag: "sr-Latn", download: "Preuzmi CV" },
]) {
  for (const theme of ["light", "dark"] as const) {
    for (const width of [320, 1280]) {
      test.describe(`${language.name} / ${theme} / ${String(width)}px`, () => {
        test.use({
          locale: language.locale,
          colorScheme: theme,
          viewport: { width, height: 900 },
        });

        test("page and CV chooser have no detectable WCAG 2.2 AA violations", async ({
          page,
        }) => {
          await page.goto("/");
          await expect(
            page.getByRole("heading", { level: 1, name: "Goran Jović" }),
          ).toBeVisible();
          await expect(page.locator("html")).toHaveAttribute(
            "lang",
            language.tag,
          );
          await expect(page.locator("html")).toHaveCSS("color-scheme", theme);
          await page.evaluate(() => document.fonts.ready);

          const closed = await new AxeBuilder({ page })
            .withTags(WCAG_TAGS)
            .analyze();
          expect(closed.violations).toEqual([]);

          await page.getByRole("button", { name: language.download }).click();
          await expect(
            page.getByRole("link", { name: "English (PDF)" }),
          ).toBeVisible();
          await expect(
            page.getByRole("link", { name: "Srpski (PDF)" }),
          ).toBeVisible();

          const open = await new AxeBuilder({ page })
            .withTags(WCAG_TAGS)
            .analyze();
          expect(open.violations).toEqual([]);
        });
      });
    }
  }
}
