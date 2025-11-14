const features = [
  {
    title: 'AI-Powered Summaries',
    description:
      "Get concise, human-readable explanations of complex commit histories. Traceback uses Gemini AI to summarize commit messages and code changes, so you can understand what's been done without reading hundreds of lines of diffs.",
    image: 'commit-summary',
    imagePosition: 'left',
  },
  {
    title: 'Onboarding Mode',
    description:
      'New to a repository? Traceback automatically generates a “quick brief”—a personalized summary of the most important recent commits, key features, and active branches—to get you up to speed in minutes.',
    image: 'onboarding-summary',
    imagePosition: 'right',
  },
  {
    title: 'Workflow Integration',
    description:
      'Traceback connects seamlessly with GitHub and GitLab, fitting right into your development workflow without changing the way you work.',
    image: 'workflow-summary',
    imagePosition: 'left',
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-linear-to-b from-white to-gray-300 bg-clip-text text-transparent">
              See Your Codebase
            </span>
            <br />
            <span className="bg-linear-to-b from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Clearly
            </span>
          </h2>
        </div>

        <div className="space-y-16 sm:space-y-20 lg:space-y-32">
          {features.map((feature, key) => (
            <div
              key={key}
              className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 ${
                feature.imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* image */}
              <div className="flex-1 w-full">
                <div className="relative group">{/* add the image here */}</div>
              </div>

              {/* text section */}
              <div className="flex-1 w-full">
                <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                  <h3 className="text-4xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
