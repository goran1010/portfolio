import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

function Header() {
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 p-4 sm:px-6">
      <span className="text-lg font-semibold">Goran Jović</span>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
}

export { Header };
