import { useState, useEffect } from "react";
import translations from "./helper/translations";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import skillsData from "./helper/skills";

const Root = () => {
  const [language, setLanguage] = useState("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const text = translations[language];
  const toggleLanguage = () =>
    setLanguage((language) => (language === "en" ? "sr" : "en"));

  return (
    <div className={`min-h-screen transition-colors duration-300 ease-in-out`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Nav
          text={text}
          onToggleLanguage={toggleLanguage}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <main>
          <Hero text={text} />
          <About text={text} />
          <Projects text={text} projects={text.projects} />
          <Skills text={text} skillsData={skillsData} />
          <Contact text={text} />
        </main>

        <Footer text={text} />
      </div>
    </div>
  );
};

export default Root;
