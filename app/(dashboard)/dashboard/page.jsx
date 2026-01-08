'use client';
import Loading from '@/components/ui/loading';
import { useAuth } from '@/context/AuthContext';
import {
  calculateDashboardStats,
  getCommitActivityData,
  getRecentActivity,
  getTopRepositories,
} from '@/lib/dashboardStats';
import Chart from 'chart.js/auto';
import {
  Activity,
  Clock,
  FolderGit2,
  GitBranch,
  GitBranchPlus,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * Get relative time string
 */
function getRelativeTime(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);
  const diff = Math.floor((now - time) / 1000);

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

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

  const commitChartRef = useRef(null);
  const reposChartRef = useRef(null);
  const commitChartInstance = useRef(null);
  const reposChartInstance = useRef(null);

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
      const project = localStorage.getItem('projects');
      if (project) {
        const loadedProjects = JSON.parse(project);
        setProjects(loadedProjects);

        const calculatedStats = calculateDashboardStats(loadedProjects);
        setStats(calculatedStats);

        const activities = getRecentActivity(loadedProjects);
        setRecentActivity(activities);
      }
    };

    loadProjects();
    const interval = setInterval(() => loadProjects(), 2000);
    return () => clearInterval(interval);
  }, []);

  // Create charts
  useEffect(() => {
    if (projects.length === 0) return;

    // get prepared data from helper functions in lib/dashboardStats.js
    const commitData = getCommitActivityData(projects);
    const topReposData = getTopRepositories(projects);

    // Commit Activity Line Chart
    if (commitChartRef.current) {
      if (commitChartInstance.current) {
        commitChartInstance.current.destroy();
      }

      commitChartInstance.current = new Chart(commitChartRef.current, {
        type: 'line',
        data: {
          labels: commitData.map((item) => item.date),
          datasets: [
            {
              label: 'Commits',
              data: commitData.map((item) => item.commits),
              borderColor: '#06b6d4',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: '#334155' },
              ticks: { color: '#94a3b8' },
            },
            x: {
              grid: { color: '#334155' },
              ticks: { color: '#94a3b8' },
            },
          },
        },
      });
    }

    // Top Repos Bar Chart
    if (reposChartRef.current) {
      if (reposChartInstance.current) {
        reposChartInstance.current.destroy();
      }

      reposChartInstance.current = new Chart(reposChartRef.current, {
        type: 'bar',
        data: {
          labels: topReposData.map((repo) => repo.name),
          datasets: [
            {
              label: 'Commits',
              data: topReposData.map((repo) => repo.commits),
              backgroundColor: '#3b82f6',
              borderRadius: 6,
            },
            {
              label: 'Stars',
              data: topReposData.map((repo) => repo.stars),
              backgroundColor: '#a855f7',
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { color: '#94a3b8', padding: 15 },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: '#334155' },
              ticks: { color: '#94a3b8' },
            },
            x: {
              grid: { display: false },
              ticks: { color: '#94a3b8' },
            },
          },
        },
      });
    }

    return () => {
      if (commitChartInstance.current) commitChartInstance.current.destroy();
      if (reposChartInstance.current) reposChartInstance.current.destroy();
    };
  }, [projects]);

  // LOADING STATE
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <FolderGit2 className="w-6 h-6 text-blue-400" />
                </div>
                <TrendingUp className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stats.totalProjects}
              </h3>
              <p className="text-sm text-gray-400">Total Projects</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <GitBranch className="w-6 h-6 text-cyan-400" />
                </div>
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stats.totalCommits}
              </h3>
              <p className="text-sm text-gray-400">Total Commits</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <GitBranchPlus className="w-6 h-6 text-purple-400" />
                </div>
                <TrendingUp className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stats.totalStars.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-400">Total Stars</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stats.readyProjects}
              </h3>
              <p className="text-sm text-gray-400">Onboarding Ready</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Commits Over Time */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                Commit Activity
              </h3>
              <div className="h-[250px]">
                <canvas ref={commitChartRef}></canvas>
              </div>
            </div>

            {/* Top Repos by Commits */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                Top Repositories
              </h3>
              <div className="h-[300px]">
                <canvas ref={reposChartRef}></canvas>
              </div>
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
