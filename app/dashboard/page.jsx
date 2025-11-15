'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardPage = () => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // redirect to sign in page if not authenicated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  // Don't render if no user
  if (!user) {
    return null;
  }

  console.log(user);
  console.log(user.user_metadata?.full_name);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome,{' '}
              {user.user_metadata?.full_name ||
                user.user_metadata?.name ||
                user.email}
              !
            </h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">User Info</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">Name:</span>
                {user.user_metadata?.full_name ||
                  user.user_metadata?.name ||
                  'N/A'}
              </p>
              <p>
                <span className="text-gray-400">Email:</span> {user.email}
              </p>
              <p>
                <span className="text-gray-400">Provider:</span>
                {user.app_metadata?.provider || 'N/A'}
              </p>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <p className="text-gray-400">Your dashboard content here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
