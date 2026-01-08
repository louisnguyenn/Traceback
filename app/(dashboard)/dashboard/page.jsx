'use client';
import Loading from '@/components/ui/loading';
import { useAuth } from '@/context/AuthContext';
import {
  calculateDashboardStats,
  getRecentActivity,
} from '@/lib/dashboardStats';
import {
  Activity,
  Clock,
  FolderGit2,
  GitBranch,
  GitBranchPlus,
  Sparkles,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * dashboard page render
 * @returns {function} - dashboard page
 */
const DashboardPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalCommits: 0,
    totalStars: 0,
    readyProjects: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);

  // HELPER: navigate to projects page
  function projectsRoute() {
    router.push('/projects');
  }

  // redirect user to sign-in page if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  // load projects from local storage
  useEffect(() => {
    /**
     * load projects from local storage
     * sets use states with project data
     */
    const loadProjects = () => {
      const project = localStorage.getItem('projects'); // get projects from local storage
      if (project) {
        const loadedProjects = JSON.parse(project);
        setProjects(loadedProjects); // set state to the loaded projects

        const calculatedStats = calculateDashboardStats(loadedProjects);
        setStats(calculatedStats); // set stats to the calculated stats

        const activities = getRecentActivity(loadedProjects);
        setRecentActivity(activities); // set recent activities
      }
    };

    loadProjects();

    // updates dashboard every two seconds
    const interval = setInterval(() => loadProjects(), 2000);

    return () => clearInterval(interval);
  }, []);

  // LOADING STATE: show spinner when loading dashboard
  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-950 min-h-screen">
      <main>
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="px-6 py-7">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-bold text-white">
                  Welcome back,{' '}
                  {user.user_metadata?.full_name?.split(' ')[0] ||
                    user.email?.split('@')[0]}
                  !
                </h2>

                <p className="text-base text-gray-400 mt-3">
                  Here&apos;s what&apos;s happening with your projects today.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 py-8">
          {/* stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* total projects */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <FolderGit2 className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stats.totalProjects}
              </h3>
              <p className="text-sm text-gray-400">Total Projects</p>
            </div>

            {/* total commits */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <GitBranch className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stats.totalCommits}
              </h3>
              <p className="text-sm text-gray-400">Total Commits</p>
            </div>

            {/* total stars */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <GitBranchPlus className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stats.totalStars.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-400">Total Stars</p>
            </div>

            {/* ready projects */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stats.readyProjects}
              </h3>
              <p className="text-sm text-gray-400">Onboarding Ready</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Recent Activity
                </h3>
                <button
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                  onClick={projectsRoute}
                >
                  View All
                </button>
              </div>

              {recentActivity?.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                    >
                      <div
                        className={`p-2 bg-${activity.color}-500/10 rounded-lg mt-1`}
                      >
                        {activity.icon === 'folder' && (
                          <FolderGit2
                            className={`w-4 h-4 text-${activity.color}-400`}
                          />
                        )}
                        {activity.icon === 'sparkles' && (
                          <Sparkles
                            className={`w-4 h-4 text-${activity.color}-400`}
                          />
                        )}
                        {activity.icon === 'git' && (
                          <GitBranch
                            className={`w-4 h-4 text-${activity.color}-400`}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium truncate">
                          {activity.repo}
                        </p>
                        <p className="text-sm text-gray-400 truncate">
                          {activity.action}
                        </p>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 whitespace-nowrap">
                        <Clock className="w-3 h-3 mr-1" />
                        {getRelativeTime(activity.time)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">No activity yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
