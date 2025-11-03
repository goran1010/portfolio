import { ExternalLink, Github } from "lucide-react";

const Projects = ({ projects, t }) => {
  // `projects` can be t.projects or an array; prefer passed `projects` object
  const items = projects?.items ?? t.projects.items;

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          {t.projects.title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((project, index) => (
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
  );
};

export default Projects;
