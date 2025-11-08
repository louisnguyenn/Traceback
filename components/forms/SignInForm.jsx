'use client';
import Link from 'next/link';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

const styles = {
	container: 'w-full max-w-md',
	header: 'space-y-1',
	title: 'text-3xl font-bold text-blue-400',
	content: 'space-y-4',
	fieldGroup: 'space-y-2',
	footer: 'flex flex-col',
	button: 'w-full',
	prompt: 'mt-4 text-center text-sm text-gray-300',
	link: 'ml-2 text-blue-400',
};

export function SigninForm() {
	return (
		<div className={styles.container}>
			<form>
				<Card>
					<CardHeader className={styles.header}>
						<CardTitle className={styles.title}>Sign In</CardTitle>
						<CardDescription>
							Enter your details to sign in to your account
						</CardDescription>
					</CardHeader>
					<CardContent className={styles.content}>
						<div className={styles.fieldGroup}>
							<Label htmlFor="email">Email</Label>
							<Input
								id="identifier"
								name="identifier"
								type="text"
								placeholder="username or email"
							/>
						</div>
						<div className={styles.fieldGroup}>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="password"
							/>
						</div>
					</CardContent>
					<CardFooter className={styles.footer}>
						<Button className={styles.button}>Sign In</Button>
					</CardFooter>
				</Card>
				<div className={styles.prompt}>
					Don&apos;t have an account?
					<Link
						className={styles.link}
						href="signup"
					>
						Sign Up
					</Link>
				</div>
			</form>

			<Link
				href="/"
				className="flex items-center justify-center gap-2 text-gray-300 hover:text-white transition-colors mt-4 text-sm"
			>
				<ArrowLeft className="w-4 h-4 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
				<span>Return home</span>
			</Link>
		</div>
	);
}
