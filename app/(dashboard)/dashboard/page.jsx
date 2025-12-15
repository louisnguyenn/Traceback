'use client';
import AnimatedContent from '@/components/animations/AnimatedContent';
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
  TrendingUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

    // updates dashboard when a new project is added or every 2 seconds
    const interval = setInterval(() => loadProjects(), 2000);

    return () => clearInterval(interval);
  }, []);

  // loading state: show spinner when loading dashboard
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
    <div className="bg-slate-950 min-h-screen">
      <main>
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="px-6 py-7">
            <div className="flex justify-between items-center">
              <div>
                <AnimatedContent
                  distance={60}
                  direction="up"
                  reverse={true}
                  duration={0.7}
                  ease="power2.out"
                  initialOpacity={0}
                  animateOpacity
                  threshold={0.2}
                  delay={0.3}
                >
                  <h2 className="text-4xl font-bold text-white">
                    Welcome back,{' '}
                    {user.user_metadata?.full_name?.split(' ')[0] ||
                      user.email?.split('@')[0]}
                    !
                  </h2>
                </AnimatedContent>
                <AnimatedContent
                  distance={60}
                  direction="up"
                  reverse={true}
                  duration={0.7}
                  ease="power2.out"
                  initialOpacity={0}
                  animateOpacity
                  threshold={0.2}
                  delay={0.6}
                >
                  <p className="text-base text-gray-400 mt-3">
                    Here&apos;s what&apos;s happening with your projects today.
                  </p>
                </AnimatedContent>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* recent activity */}
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

              {/* TODO: code for recent activtiy here */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
