'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import {
  Activity,
  Clock,
  FileText,
  FolderGit2,
  GitBranch,
  Settings,
  TrendingUp,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardPage = () => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

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

  return (
    <div className="bg-slate-950">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-7">
          <div className="flex justify-between items-center">
            <div>
              {/* <SidebarTrigger className="px-3 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer group-data-[collapsible=icon]:mx-auto" /> */}
              <h2 className="text-5xl font-bold text-white">
                Welcome back,{' '}
                {user.user_metadata?.full_name?.split(' ')[0] ||
                  user.email?.split('@')[0]}
                !
              </h2>
              <p className="text-base text-gray-400 mt-3">
                Here&apos;s what&apos;s happening with your projects today.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:bg-slate-800 rounded-full transition-colors cursor-pointer">
                    {user.user_metadata?.avatar_url ? (
                      <Image
                        width={32}
                        height={32}
                        src={user.user_metadata.avatar_url}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {(
                          user.user_metadata?.full_name?.[0] ||
                          user.email?.[0] ||
                          'U'
                        ).toUpperCase()}
                      </div>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-slate-900 border-slate-800"
                >
                  <DropdownMenuLabel className="text-gray-200">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem
                    className="text-gray-300 hover:bg-slate-800 cursor-pointer focus:bg-slate-800 focus:text-white"
                    onClick={() => router.push('/dashboard/settings')}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem
                    className="text-red-400 hover:bg-slate-800 cursor-pointer focus:bg-slate-800 focus:text-red-300"
                    onClick={signOut}
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-8">
        {/* stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <FolderGit2 className="w-6 h-6 text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">12</h3>
            <p className="text-sm text-gray-400">Active Repositories</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-cyan-500/10 rounded-lg">
                <GitBranch className="w-6 h-6 text-cyan-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">247</h3>
            <p className="text-sm text-gray-400">Total Commits</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">8</h3>
            <p className="text-sm text-gray-400">Team Members</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">94%</h3>
            <p className="text-sm text-gray-400">Code Coverage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* recent activity */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Recent Activity
              </h3>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  repo: 'traceback-nextjs',
                  action: 'pushed to main',
                  time: '2 hours ago',
                  color: 'blue',
                },
                {
                  repo: 'auth-service',
                  action: 'created pull request',
                  time: '5 hours ago',
                  color: 'green',
                },
                {
                  repo: 'api-gateway',
                  action: 'merged branch feature/oauth',
                  time: '1 day ago',
                  color: 'purple',
                },
                {
                  repo: 'frontend-ui',
                  action: 'deployed to production',
                  time: '2 days ago',
                  color: 'cyan',
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                >
                  <div
                    className={`p-2 bg-${activity.color}-500/10 rounded-lg mt-1`}
                  >
                    <GitBranch
                      className={`w-4 h-4 text-${activity.color}-400`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">
                      {activity.repo}
                    </p>
                    <p className="text-sm text-gray-400">{activity.action}</p>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* user info card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 mb-4">
                  {user.user_metadata?.avatar_url ? (
                    <Image
                      width={64}
                      height={64}
                      src={user.user_metadata.avatar_url}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      {(
                        user.user_metadata?.full_name?.[0] ||
                        user.email?.[0] ||
                        'U'
                      ).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-white">
                      {user.user_metadata?.full_name ||
                        user.user_metadata?.name ||
                        'User'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user.app_metadata?.provider || 'email'}
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-800 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email</span>
                    <span className="text-white truncate ml-2">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Member since</span>
                    <span className="text-white">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* quick actions */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-left">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-300">New Analysis</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-left">
                  <FolderGit2 className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-gray-300">
                    Connect Repository
                  </span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-left">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-gray-300">Invite Team</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
