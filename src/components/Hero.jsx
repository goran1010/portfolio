const Hero = ({ t }) => {
  return (
    <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-blue-600 dark:text-blue-400 text-lg mb-4">
            {t.hero.greeting}
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
  );
};

export default Hero;
