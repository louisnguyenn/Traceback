import { Menu, X } from 'lucide-react';
import Image from 'next/image';
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
				<div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
					<div className="flex items-center space-x-1 group">
						<span className="text-lg sm:text-xl md:text-2xl font-medium">
							<span className="text-white">Trace</span>
							<span className="text-blue-400">Back</span>
						</span>
					</div>

					{/* nav links */}
					{/* <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
						<a
							href="#features"
							className="text-gray-300 hover:text-white text-sm lg:text-base"
						>
							Features
						</a>
					</div> */}
					<div className="hidden md:flex items-center space-x-6 lg:space-x-8">
						<Link
							href="/signin"
							className="text-gray-300 hover:text-white text-sm lg:text-base"
						>
							Login
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
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
