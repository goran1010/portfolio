import { mkdir, copyFile, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";
import { preview } from "vite";
import { CONTACT_LINKS, EMAIL_ADDRESS } from "../src/data/contact.ts";

const root = resolve(import.meta.dirname, "..");
const imagePath = resolve(root, "public/images/og-image.png");
const server = await preview({
  root,
  configFile: false,
  preview: { host: "127.0.0.1", port: 0, strictPort: true },
});

try {
  const address = server.httpServer.address();
  if (!address || typeof address === "string") {
    throw new Error("Could not determine the preview server's port.");
  }
  const origin = `http://127.0.0.1:${String(address.port)}`;
  const browser = await chromium.launch();

  try {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
      locale: "en-GB",
      colorScheme: "dark",
      reducedMotion: "reduce",
    });
    await page.goto(origin);
    const canonicalUrl = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    if (!canonicalUrl) {
      throw new Error("The portfolio must have a canonical URL.");
    }
    await page.setContent(
      await readFile(resolve(root, "scripts/og-card.html"), "utf8"),
    );
    await page.locator("#email").evaluate((element, email) => {
      element.textContent = email;
    }, EMAIL_ADDRESS);
    await page.locator("#github").evaluate(
      (element, github) => {
        element.textContent = github;
      },
      CONTACT_LINKS.github.replace("https://", ""),
    );
    await page.locator("#website").evaluate((element, website) => {
      element.textContent = website;
    }, new URL(canonicalUrl).hostname);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(Array.from(document.images, (image) => image.decode()));
    });
    await mkdir(resolve(root, "public/images"), { recursive: true });
    await page.screenshot({
      path: imagePath,
      animations: "disabled",
    });
    await mkdir(resolve(root, "dist/images"), { recursive: true });
    await copyFile(imagePath, resolve(root, "dist/images/og-image.png"));
    console.log(`Saved ${imagePath}`);
  } finally {
    await browser.close();
  }
} finally {
  await new Promise<void>((resolve, reject) => {
    server.httpServer.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}
