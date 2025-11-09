'use client';
import Link from 'next/link';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export function SigninForm() {
	return (
		<div className="w-full max-w-md">
			<form>
				<Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl">
					<CardHeader className="space-y-1 pb-4">
						<CardTitle className="text-3xl font-bold text-blue-400">
							Sign In
						</CardTitle>
						<p className="text-sm text-gray-400">
							Enter your credentials to access your account
						</p>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="identifier" className="text-gray-200">
								Email
							</Label>
							<Input
								id="identifier"
								name="identifier"
								type="text"
								placeholder="Email"
								className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password" className="text-gray-200">
								Password
							</Label>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="Password"
								className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20"
							/>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col pt-2">
						<Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors cursor-pointer">
							Sign In
						</Button>
					</CardFooter>
				</Card>
				<div className="mt-4 text-center text-sm text-gray-300">
					Don&apos;t have an account?
					<Link
						className="ml-2 text-blue-400 hover:text-blue-300 transition-colors underline-offset-4 hover:underline"
						href="signup"
					>
						Sign Up
					</Link>
				</div>
			</form>

			<Link
				href="/"
				className="flex items-center justify-center gap-2 text-gray-300 hover:text-white transition-colors mt-6 text-sm py-3 rounded-lg hover:bg-slate-800/30"
			>
				<ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
				<span>Return home</span>
			</Link>
		</div>
	);
}