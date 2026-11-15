import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { OpenSource } from "./components/OpenSource";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { SkipLink } from "./components/SkipLink";

function App() {
  return (
    <>
      <SkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 sm:px-6"
      >
        <Hero />
        <About />
        <OpenSource />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export { App };
