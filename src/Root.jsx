import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Globe,
  Menu,
  X,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import translations from "./helper/translations";

const Root = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("language");

    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }

    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "sr" : "en");
  };

  const skillsData = {
    frontend: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Next.js",
      "Vue.js",
      "HTML/CSS",
    ],
    backend: [
      "Node.js",
      "Express",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "REST APIs",
    ],
    tools: ["Git", "Docker", "AWS", "Figma", "Linux", "CI/CD"],
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Navigation */}
        <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#home"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t.nav.home}
                </a>
                <a
                  href="#about"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t.nav.about}
                </a>
                <a
                  href="#projects"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t.nav.projects}
                </a>
                <a
                  href="#skills"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t.nav.skills}
                </a>
                <a
                  href="#contact"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t.nav.contact}
                </a>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleLanguage}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle language"
                >
                  <Globe className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="px-4 py-4 space-y-3">
                <a
                  href="#home"
                  className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.home}
                </a>
                <a
                  href="#about"
                  className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.about}
                </a>
                <a
                  href="#projects"
                  className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.projects}
                </a>
                <a
                  href="#skills"
                  className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.skills}
                </a>
                <a
                  href="#contact"
                  className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.contact}
                </a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <p className="text-blue-600 dark:text-blue-400 text-lg mb-4">
                {t.hero.greeting}
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.hero.name}
              </h1>
              <p className="text-2xl sm:text-3xl text-gray-700 dark:text-gray-300 mb-6">
                {t.hero.title}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#projects"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t.hero.cta}
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:text-white transition-colors"
                >
                  {t.hero.contact}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">
              {t.about.title}
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              {t.projects.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.projects.items.map((project, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                      <ExternalLink className="w-4 h-4" />
                      {t.projects.viewProject}
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:underline">
                      <Github className="w-4 h-4" />
                      {t.projects.viewCode}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              {t.skills.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                  {t.skills.frontend}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillsData.frontend.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                  {t.skills.backend}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillsData.backend.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  {t.skills.tools}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillsData.tools.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">{t.contact.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {t.contact.description}
            </p>
            <div className="flex justify-center gap-6 mb-8">
              <a
                href={`mailto:${t.contact.email}`}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Mail className="w-5 h-5" />
                {t.contact.email}
              </a>
              <a
                href="https://github.com"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <a
              href={`mailto:${t.contact.email}`}
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t.contact.cta}
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
            <p>
              © 2025 {t.hero.name}. {t.footer.rights}
            </p>
            <p className="text-sm mt-2">{t.footer.built}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Root;
