import { BookOpen, Link2, Sparkles, Zap } from 'lucide-react';
import React from 'react';
import {
  SiAmazon,
  SiApple,
  SiGoogle,
  SiMeta,
  SiNetflix,
  SiSpotify,
  SiTesla,
} from 'react-icons/si';
import LogoLoop from '../animations/LogoLoop';

const companyLogos = [
  { node: <SiNetflix />, title: 'Netflix' },
  { node: <SiGoogle />, title: 'Google' },
  { node: <SiAmazon />, title: 'Amazon' },
  { node: <SiMeta />, title: 'Meta' },
  { node: <SiApple />, title: 'Apple' },
  { node: <SiTesla />, title: 'Tesla' },
  { node: <SiSpotify />, title: 'Spotify' },
];

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: <Link2 className="w-8 h-8" />,
      title: 'Connect Repository',
      description:
        "Paste your GitHub repository URL into Traceback. We'll instantly fetch all the essential data including commits, languages, dependencies, and documentation.",
      color: 'blue',
    },
    {
      number: '02',
      icon: <Sparkles className="w-8 h-8" />,
      title: 'AI Analysis',
      description:
        "Our AI-powered engine analyzes your codebase and generates a comprehensive onboarding guide tailored to your project's tech stack and structure.",
      color: 'cyan',
    },
    {
      number: '03',
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Explore & Learn',
      description:
        "Get instant access to a clean overview of the project's purpose, key features, setup instructions, and important files, everything you need to start contributing.",
      color: 'blue',
    },
    {
      number: '04',
      icon: <Zap className="w-8 h-8" />,
      title: 'Start Contributing',
      description:
        "Jump into the codebase with confidence. No more spending hours reading docs, you're ready to contribute in minutes, not days. Get to developing instantly.",
      color: 'cyan',
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/20',
        glow: 'hover:shadow-blue-500/20',
      },
      cyan: {
        bg: 'bg-cyan-500/10',
        text: 'text-cyan-400',
        border: 'border-cyan-500/20',
        glow: 'hover:shadow-cyan-500/20',
      },
    };
    return colors[color];
  };

  return (
    <section
      id="howitworks"
      className="relative py-16 sm:py-20 px-10 sm:px-6 lg:px-8 overflow-hidden bg-slate-900"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-linear-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              How it{' '}
            </span>
            <span className="bg-linear-to-b from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mt-4">
            Get up to speed with any codebase in 4 simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {steps.map((step, index) => {
            const colors = getColorClasses(step.color);

            return (
              <div key={index} className="relative group">
                {/* Card */}
                <div
                  className={`
                  relative bg-slate-950/50 backdrop-blur-sm border ${colors.border} rounded-2xl p-6 sm:p-8
                  hover:bg-slate-950/70 transition-all duration-300
                  hover:shadow-xl ${colors.glow} hover:-translate-y-1
                `}
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-linear-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
                    <span className="text-white font-bold text-lg">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`
                    ${colors.bg} ${colors.text} w-16 h-16 rounded-xl 
                    flex items-center justify-center mb-6
                    group-hover:scale-110 transition-transform duration-300
                    shadow-lg
                  `}
                  >
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Mobile connector arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-linear-to-b from-blue-400 to-cyan-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-slate-950/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 shadow-xl shadow-blue-500/10">
            <h3 className="text-3xl font-bold bg-linear-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              Ready to streamline your onboarding?
            </h3>
            <p className="text-gray-300 max-w-xl">
              Join developers who are saving hours on codebase onboarding with
              Traceback.
            </p>
            <button className="mt-4 px-8 py-3 bg-linear-to-b from-blue-600 to-blue-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/50 cursor-pointer">
              Get Started Now
            </button>
          </div>
        </div>

        {/* logo loop animation */}
        <div className="mt-30 text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold ">Trusted by Developers At</h1>
            <p className="max-w-xl text-gray-300">
              Used by developers at leading organizations
            </p>
          </div>
          <div
            style={{
              height: '200px',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="mt-20"
          >
            <LogoLoop
              logos={companyLogos}
              speed={30}
              direction="left"
              logoHeight={48}
              gap={90}
              hoverSpeed={30}
              scaleOnHover
              ariaLabel="Trusted companies"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
