import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import playwright from "eslint-plugin-playwright";

export default defineConfig([
  globalIgnores(["dist", "coverage", "test-results", "playwright-report"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      reactX.configs["recommended-typescript"],
      reactDom.configs.recommended,
    ],
    rules: {
      "no-console": ["warn", { allow: ["error", "warn"] }],
      // destructuring to omit a property is deliberate
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: [
      "vite.config.ts",
      "playwright.config.ts",
      "e2e/**/*.ts",
      "scripts/**/*.ts",
    ],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["scripts/**/*.ts"],
    rules: { "no-console": "off" },
  },
  {
    files: ["e2e/**/*.ts"],
    extends: [playwright.configs["flat/recommended"]],
  },
]);
