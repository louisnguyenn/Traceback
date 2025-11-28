'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Github } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

export function SigninForm() {
  const { GitHubSignIn, GoogleSignIn } = useAuth();
  const [githubLoading, setGithubLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // loading states
  // will continue until redirect happens
  const handleGitHubSignIn = async () => {
    setGithubLoading(true);
    await GitHubSignIn();
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await GoogleSignIn();
  };

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

        <div className="space-y-3 mt-4">
          <button
            type="button"
            disabled={googleLoading}
            className="flex gap-2 items-center justify-center w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGoogleSignIn}
          >
            {googleLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign in with Google</span>
                <FaGoogle size={16} />
              </>
            )}
          </button>

          <button
            type="button"
            disabled={githubLoading}
            className="flex gap-2 items-center justify-center w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGitHubSignIn}
          >
            {githubLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign in with GitHub</span>
                <Github size={16} />
              </>
            )}
          </button>
        </div>

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

      <div className="flex justify-center mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300" />
          <span>Return home</span>
        </Link>
      </div>
    </div>
  );
}
