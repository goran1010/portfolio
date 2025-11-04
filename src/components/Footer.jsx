const Footer = ({ text }) => {
  return (
    <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
        <p>© 2025 {text.hero.name}.</p>
        <p className="text-sm mt-2">{text.footer.built}</p>
      </div>
    </footer>
  );
};

export default Footer;
