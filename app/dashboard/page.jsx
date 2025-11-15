'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardPage = () => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // redirect to sign in page if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  // show loading state when user is signing into dashboard
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-400 mx-auto mb-4"
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
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  console.log(user);
  console.log(user.user_metadata?.full_name);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome,{' '}
              {user.user_metadata?.full_name ||
                user.user_metadata?.name ||
                user.email}
              !
            </h1>
          </div>
          <button
            onClick={signOut}
            className="hover:underline hover:text-red-500 transition-colors duration-300 cursor-pointer"
          >
            Log Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">User Info</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">Name: </span>
                {user.user_metadata?.full_name ||
                  user.user_metadata?.name ||
                  'N/A'}
              </p>
              <p>
                <span className="text-gray-400">Email: </span> {user.email}
              </p>
              <p>
                <span className="text-gray-400">Provider: </span>
                {user.app_metadata?.provider || 'N/A'}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <p className="text-gray-400">Your dashboard content here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
