import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AnimatedContent from '../animations/AnimatedContent';

const Hero = () => {
	return (
		<section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
			{/* blue pulse animations */}
			<div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
			<div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

			<div className="flex flex-col items-center text-center max-w-4xl mx-auto">
				<h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
					<AnimatedContent
						distance={100}
						direction="up"
						reverse={false}
						duration={1.3}
						ease="power2.out"
						initialOpacity={0}
						animateOpacity
						threshold={0.2}
						delay={0.3}
					>
						<span className="bg-linear-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent block mb-2 sm:mb-3">
							Got Added to a Project?
						</span>
					</AnimatedContent>

					<AnimatedContent
						distance={100}
						direction="up"
						reverse={false}
						duration={1.6}
						ease="power2.out"
						initialOpacity={0}
						animateOpacity
						threshold={0.2}
						delay={1}
					>
						<span className="bg-linear-to-b from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block mb-2 sm:mb-3">
							Get Up to Speed Instantly
						</span>
					</AnimatedContent>
				</h1>

				<AnimatedContent
					distance={100}
					direction="up"
					reverse={false}
					duration={1.8}
					ease="power2.out"
					initialOpacity={0}
					animateOpacity
					threshold={0.2}
					delay={1.7}
				>
					<p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed text-center">
						Analyze your codebase to deliver crystal-clear summaries of commits,
						merges, diffs, and project evolution, so you can start contributing
						like you&apos;ve been there all along
					</p>
				</AnimatedContent>

				<div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-12">
					<button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-b from-blue-600 to-blue-400 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-102 cursor-pointer flex items-center justify-center gap-2">
						<Link href="/signin">Get Started</Link>
						<ArrowRight className="w-4 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
					</button>
				</div>
			</div>
		</section>
	);
};

export default Hero;
