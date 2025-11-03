import { Mail, Github, Linkedin } from "lucide-react";

const Contact = ({ t }) => {
  return (
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
  );
};

export default Contact;
