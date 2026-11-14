import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Section } from "./components/Section";
import { SkipLink } from "./components/SkipLink";
import { useLanguage } from "./customHooks/useLanguage";
import { SECTION_IDS } from "./data/sections";

function App() {
  const { t } = useLanguage();

  return (
    <>
      <SkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 sm:px-6"
      >
        <div className="flex flex-col gap-2 py-16">
          <h1 className="text-4xl font-bold">Goran Jović</h1>
          <p className="text-lg">{t("hero.title")}</p>
        </div>
        {SECTION_IDS.map((id) => (
          <Section key={id} id={id} />
        ))}
      </main>
      <Footer />
    </>
  );
}

export { App };
