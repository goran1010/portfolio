import { Globe, Moon, Sun, Menu, X } from "lucide-react";

const Nav = ({ text, onToggleLanguage, mobileMenuOpen, setMobileMenuOpen }) => {
  return (
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
            <button
              onClick={onToggleLanguage}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
