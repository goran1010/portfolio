import { useLanguage } from "../customHooks/useLanguage";
import { SECTION_IDS } from "../data/sections";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

function Header() {
  const { t } = useLanguage();

  return (
    <header className="mx-auto flex w-full max-w-3xl flex-col gap-3 p-4 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <span className="text-lg font-semibold">Goran Jović</span>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
      <nav aria-label={t("nav.label")}>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium">
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="rounded-sm underline-offset-4 transition-colors hover:text-(--accent-text) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring)"
              >
                {t(`sections.${id}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export { Header };
