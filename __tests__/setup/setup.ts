import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
});

const media: Omit<MediaQueryList, "addListener" | "removeListener"> = {
  matches: false,
  media: "(prefers-color-scheme: dark)",
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: () => {
    return true;
  },
};

// jsdom doesn't implement matchMedia, which the theme relies on
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(() => media),
});
