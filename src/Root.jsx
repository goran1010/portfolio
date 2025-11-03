import { useState, useEffect } from "react";
import translations from "./helper/translations";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const Root = () => {
  const [language, setLanguage] = useState("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = translations[language];
  const toggleLanguage = () => setLanguage((l) => (l === "en" ? "sr" : "en"));

  const skillsData = {
    frontend: [
      "HTML/CSS",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "Flexbox",
      "Grid",
    ],
    backend: ["Node.js", "Express", "PostgreSQL", "Prisma", "REST APIs"],
    tools: [
      "Git",
      "GitHub",
      "Postman",
      "Terminal",
      "Vite",
      "Webpack",
      "Jest",
      "Vitest",
    ],
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ease-in-out`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Nav
          t={t}
          onToggleLanguage={toggleLanguage}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <main>
          <Hero t={t} />
          <About t={t} />
          <Projects t={t} projects={t.projects} />
          <Skills t={t} skillsData={skillsData} />
          <Contact t={t} />
        </main>

        <Footer t={t} />
      </div>
    </div>
  );
};

export default Root;
