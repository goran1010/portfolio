import { useLanguage } from "../customHooks/useLanguage";
import { LANGUAGES } from "../utils/language";
import { GlobeIcon } from "./sharedComponents/icons";

import type { Language } from "../utils/language";

function LanguageIcon({ language }: { language: Language }) {
  if (language === "system") {
    return <GlobeIcon />;
  }

  return (
    <span className="text-xs font-bold tracking-wide">
      {language.toUpperCase()}
    </span>
  );
}

function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  function handleLanguageToggle() {
    const currentIndex = LANGUAGES.indexOf(language);
    const nextLanguage =
      LANGUAGES[(currentIndex + 1) % LANGUAGES.length] ?? language;

    setLanguage(nextLanguage);
  }

  return (
    <button
      type="button"
      id="language-switcher"
      aria-label={`${t("language.label")}: ${t(`language.${language}`)}`}
      onClick={handleLanguageToggle}
      className="relative inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-2 text-sm font-semibold transition transform hover:cursor-pointer
        bg-(--surface-1) text-(--text-primary) border border-(--border-color) shadow-(--card-shadow-soft)
        hover:bg-(--hover-surface) hover:shadow-(--card-shadow) active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring)"
    >
      <LanguageIcon language={language} />
      <span className="hidden sm:inline">{t("language.label")}</span>
    </button>
  );
}

export { LanguageSwitcher };
