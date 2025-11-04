import { Globe, Menu, X, Download } from "lucide-react";
import { useState } from "react";

const Nav = ({ text, onToggleLanguage, mobileMenuOpen, setMobileMenuOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDownload = (fileName) => {
    const link = document.createElement("a");
    link.href = `/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a
            href="#home"
            className="cursor-pointer text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Portfolio
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {text.nav.home}
            </a>
            <a
              href="#about"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {text.nav.about}
            </a>
            <a
              href="#projects"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {text.nav.projects}
            </a>
            <a
              href="#skills"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {text.nav.skills}
            </a>
            <a
              href="#contact"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {text.nav.contact}
            </a>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* CV Download Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                aria-label="Download CV"
              >
                <Download className="w-5 h-5" />
                <span>{text.nav.cv}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
                  <button
                    onClick={() => handleDownload("Goran-Jovic-CV-en.pdf")}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {text.nav.cvEn}
                  </button>
                  <button
                    onClick={() => handleDownload("Goran-Jovic-CV-sr.pdf")}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {text.nav.cvSr}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={onToggleLanguage}
              className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
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
              {text.nav.home}
            </a>
            <a
              href="#about"
              className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {text.nav.about}
            </a>
            <a
              href="#projects"
              className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {text.nav.projects}
            </a>
            <a
              href="#skills"
              className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {text.nav.skills}
            </a>
            <a
              href="#contact"
              className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {text.nav.contact}
            </a>
            <div className="py-2 space-y-2">
              <div className="font-medium px-2">{text.nav.cv}</div>
              <button
                onClick={() => {
                  handleDownload("Goran-Jovic-CV-en.pdf");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-2 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {text.nav.cvEn}
              </button>
              <button
                onClick={() => {
                  handleDownload("Goran-Jovic-CV-sr.pdf");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-2 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {text.nav.cvSr}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
