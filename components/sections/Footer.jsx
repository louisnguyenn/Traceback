import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm">
      <div className="mt-16 mb-8 text-center">
        <div className="inline-flex flex-col items-center gap-4 p-8">
          <h3 className="text-3xl font-bold bg-linear-to-r text-white">
            Your time is your most valuable asset.
          </h3>
          <p className="text-gray-300 max-w-xl text-lg">
            Start contributing now.
          </p>
          <Link
            href="/signin"
            className="mt-4 px-8 py-3 bg-linear-to-b from-blue-600 to-blue-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/50 cursor-pointer"
          >
            Get Started Now
          </Link>
        </div>
      </div>

      <hr className="border-t border-slate-800 w-240 mx-auto"></hr>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col items-center text-center space-y-6">
          <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
            Navigate your codebase with confidence. Traceback helps developers
            understand project history and context instantly.
          </p>

          <p className="text-gray-500 text-sm pt-4">
            © {new Date().getFullYear()} Traceback. Built with passion for
            developers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
