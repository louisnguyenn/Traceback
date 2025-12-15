import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = ({ scrolled }) => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/20 backdrop-blur-lg border-b border-slate-800'
          : 'bg-slate-950/20 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-14 sm:h-16 md:h-20">
          <div className="flex items-center space-x-1 group justify-self-start">
            <span className="text-lg sm:text-2xl md:text-3xl font-bold">
              <span className="text-white">Trace</span>
              <span className="text-blue-400">back</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10 justify-self-center">
            <a
              href="#features"
              className="text-gray-300 hover:text-white text-sm lg:text-base transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#howitworks"
              className="text-gray-300 hover:text-white text-sm lg:text-base transition-colors duration-300"
            >
              How It Works
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 justify-self-end">
            <Link
              href="/signin"
              className="text-gray-300 hover:text-white text-sm lg:text-base transition-colors duration-300"
            >
              Sign in
            </Link>
          </div>

          {/* set the hamburger menu to hidden on medium and large sized devices */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuIsOpen((prev) => !prev)}
          >
            {mobileMenuIsOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuIsOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
            <a
              href="#features"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-gray-300 hover:text-white text-sm lg:text-base"
            >
              Features
            </a>
            <a
              href="#howitworks"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-gray-300 hover:text-white text-sm lg:text-base"
            >
              How It Works
            </a>
            <Link
              href="/signin"
              onClick={() => setMobileMenuIsOpen(false)}
              className="bloack text-gray-300 hover:text-white text-sm lg:text-base transition-colors duration-300"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
