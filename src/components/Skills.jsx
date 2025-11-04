const Skills = ({ text, skillsData }) => {
  return (
    <section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          {text.skills.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              {text.skills.frontend}
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
              {text.skills.backend}
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
              {text.skills.tools}
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
  );
};

export default Skills;
