import { useTheme } from "../customHooks/useTheme";
import { THEMES } from "../utils/theme";
import { SunIcon, MoonIcon, MonitorIcon } from "./sharedComponents/icons";

import type { Theme } from "../utils/theme";

const THEME_LABELS: Record<Theme, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

function getThemeIcon(theme: Theme) {
  switch (theme) {
    case "light":
      return <SunIcon />;
    case "dark":
      return <MoonIcon />;
    default:
      return <MonitorIcon />;
  }
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  function handleThemeToggle() {
    const currentIndex = THEMES.indexOf(theme);
    const nextTheme = THEMES[(currentIndex + 1) % THEMES.length] ?? theme;

    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      id="theme-switcher"
      aria-label={`Toggle theme - ${THEME_LABELS[theme]}`}
      onClick={handleThemeToggle}
      className="relative inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-2 text-sm font-semibold transition transform hover:cursor-pointer
        bg-(--surface-1) text-(--text-primary) border border-(--border-color) shadow-(--card-shadow-soft)
        hover:bg-(--hover-surface) hover:shadow-(--card-shadow) active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring)"
    >
      {getThemeIcon(theme)}
      <span className="hidden sm:inline">Theme</span>
    </button>
  );
}

export { ThemeSwitcher };
