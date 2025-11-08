export default function AuthLayout({ children }) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white overflow-hidden">
			{children}
		</div>
	);
}
