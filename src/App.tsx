import { Header } from "./components/Header";
import { useLanguage } from "./customHooks/useLanguage";

function App() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-2 p-6">
        <h1 className="text-4xl font-bold">Goran Jović</h1>
        <p className="text-lg">{t("hero.title")}</p>
      </main>
    </>
  );
}

export { App };
