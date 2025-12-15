import Image from 'next/image';

const features = [
  {
    title: 'AI-Powered Onboarding',
    description:
      "New to a repository? Traceback automatically generates an AI-powered onboarding guide with a personalized summary of the project's purpose, tech stack, key features, and how to get started - helping you understand the codebase in minutes.",
    image: '/images/onboardingpreview.png',
    imagePosition: 'left',
  },
  {
    title: 'Complete Repository Analysis',
    description:
      'Traceback fetches comprehensive GitHub repository information including commits, languages, dependencies, README, and project statistics - giving you a complete overview of the codebase in one place.',
    image: '/images/commitspreview.png',
    imagePosition: 'right',
  },
  {
    title: 'Workflow Integration',
    description:
      'Traceback connects seamlessly with GitHub and GitLab, fitting right into your development workflow without changing the way you work.',
    image: '/images/projectspreview.png',
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
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 ${
                feature.imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* image */}
              <div className="flex-1 w-full">
                <div className="relative group">
                  {feature.image && (
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={600}
                      height={400}
                      className="rounded-xl shadow-lg object-cover"
                    />
                  )}
                </div>
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
