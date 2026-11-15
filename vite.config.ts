import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { configDefaults } from "vitest/config";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),

    // React Compiler runs only outside tests, so memoize manually where a
    // missing memo would cause infinite loops in tests
    mode !== "test" && babel({ presets: [reactCompilerPreset()] }),

    tailwindcss(),
  ],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./__tests__/setup/setup.ts",
    exclude: [...configDefaults.exclude, "e2e/**"],

    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/main.tsx"],
    },
  },
}));
