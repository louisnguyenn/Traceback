const Footer = () => {
	return (
		<footer className="relative border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm mt-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
				<div className="flex flex-col items-center text-center space-y-6">
					<p className="text-gray-400 text-base max-w-2xl leading-relaxed">
						Navigate your codebase with confidence. TraceBack helps developers
						understand project history and context instantly.
					</p>

					<p className="text-gray-500 text-sm pt-4">
						© {new Date().getFullYear()} TraceBack. Built with passion for
						developers.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
