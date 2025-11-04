const About = ({ text }) => {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">
          {text.about.title}
        </h2>
        <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
          <p>{text.about.p1}</p>
          <p>{text.about.p2}</p>
          <p>{text.about.p3}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
