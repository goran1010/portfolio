import { mkdir, copyFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";
import { preview } from "vite";

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
      colorScheme: "light",
      reducedMotion: "reduce",
      storageState: {
        cookies: [],
        origins: [
          {
            origin,
            localStorage: [
              { name: "language", value: "en" },
              { name: "theme", value: "light" },
            ],
          },
        ],
      },
    });
    await page.goto(origin);
    await page
      .getByRole("heading", { name: "Goran Jović", level: 1 })
      .waitFor();
    await page.getByText("Software Developer", { exact: true }).waitFor();
    await page.evaluate(() => document.fonts.ready);
    await mkdir(resolve(root, "public/images"), { recursive: true });
    await page.screenshot({
      path: imagePath,
      animations: "disabled",
      style:
        "header, main > section, footer { display: none; } main { min-height: 100vh; justify-content: center; }",
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
