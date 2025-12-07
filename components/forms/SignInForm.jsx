'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl min-h-[600px] flex flex-col">
        <CardHeader className="space-y-5 pb-10">
          <CardTitle className="text-4xl font-bold text-blue-400 text-center">
            <span className="text-white">Trace</span>back
          </CardTitle>
          <p className="text-2xl font-bold text-white text-center">
            Access Your Account
          </p>
          <p className="text-base text-gray-400 text-center">
            Get onboarded with your project with AI-powered code summaries and
            insights
          </p>
        </CardHeader>
        <CardContent className="grow flex flex-col">
          <div className="space-y-4">
            <button
              type="button"
              disabled={googleLoading}
              className="group relative flex gap-3 items-center justify-center w-full px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 shadow-sm hover:shadow-md font-medium"
              onClick={handleGoogleSignIn}
            >
              {googleLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-gray-700"
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
                  <FaGoogle size={20} className="text-red-500" />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={githubLoading}
              className="group relative flex gap-3 items-center justify-center w-full px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 shadow-sm hover:shadow-md font-medium"
              onClick={handleGitHubSignIn}
            >
              {githubLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  <Github size={20} />
                  <span>Continue with GitHub</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-auto space-y-4 pt-8">
            <div className="flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300" />
                <span>Return home</span>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
