'use client';
import AnimatedContent from '@/components/animations/AnimatedContent';
import { useAuth } from '@/context/AuthContext';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FolderGit2,
  GitBranch,
  Loader2,
  Plus,
  Star,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function ProjectsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin');
    }
  }, [user, authLoading, router]);

  // Load projects from localStorage on mount only
  useEffect(() => {
    const saved = localStorage.getItem('projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  // Calculate stats
  const stats = {
    total: projects.length,
    generating: projects.filter((p) => p.isGenerating).length,
    ready: projects.filter((p) => p.onboardingOverview && !p.isGenerating)
      .length,
    failed: projects.filter((p) => p.generationFailed).length,
  };

  // Separate function to update localStorage and state
  const updateProjects = useCallback((updatedProjects) => {
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  }, []);

  // Background generation function
  const generateOnboarding = useCallback(
    async (project) => {
      try {
        const response = await fetch('/api/projects/generate-onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectData: project }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate onboarding');
        }

        const { onboardingOverview } = await response.json();

        // Update project in localStorage
        const saved = localStorage.getItem('projects');
        if (saved) {
          const currentProjects = JSON.parse(saved);
          const updated = currentProjects.map((p) =>
            p.id === project.id
              ? { ...p, onboardingOverview, isGenerating: false }
              : p
          );
          updateProjects(updated);
        }
      } catch (error) {
        console.error('Error generating onboarding:', error);

        // Mark as failed
        const saved = localStorage.getItem('projects');
        if (saved) {
          const currentProjects = JSON.parse(saved);
          const updated = currentProjects.map((p) =>
            p.id === project.id
              ? { ...p, isGenerating: false, generationFailed: true }
              : p
          );
          updateProjects(updated);
        }
      }
    },
    [updateProjects]
  );

  const addProject = async (e) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;

    setLoading(true);

    try {
      // Fetch GitHub metadata
      const metaResponse = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl }),
      });

      if (!metaResponse.ok) {
        const error = await metaResponse.json();
        throw new Error(error.error || 'Failed to fetch project');
      }

      const { project } = await metaResponse.json();

      // Check if project already exists
      const existingProject = projects.find((p) => p.id === project.id);
      if (existingProject) {
        alert('This project has already been added!');
        setLoading(false);
        return;
      }

      // Save project with loading state
      const newProject = {
        ...project,
        onboardingOverview: null,
        isGenerating: true,
        generationFailed: false,
      };

      const updatedProjects = [...projects, newProject];
      updateProjects(updatedProjects);

      setRepoUrl('');
      setLoading(false);
      setShowAddForm(false);

      // Navigate to detail page
      router.push(`/projects/${project.id}`);

      // Generate onboarding in background
      generateOnboarding(newProject);
    } catch (error) {
      console.error('Error adding project:', error);
      alert(error.message || 'Failed to fetch project');
      setLoading(false);
    }
  };

  const deleteProject = (projectId, e) => {
    e.stopPropagation();

    if (confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter((p) => p.id !== projectId);
      updateProjects(updated);
    }
  };

  if (authLoading || !user) {
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen">
      <main>
        {/* Header */}
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
                  <h2 className="text-4xl font-bold text-white">Projects</h2>
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
                    Manage and explore your GitHub repositories with AI-powered
                    insights.
                  </p>
                </AnimatedContent>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>
          </div>
        </header>

        <div className="px-6 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <FolderGit2 className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stats.total}
              </h3>
              <p className="text-sm text-gray-400">Total Projects</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stats.ready}
              </h3>
              <p className="text-sm text-gray-400">Ready to Explore</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <Loader2 className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stats.generating}
              </h3>
              <p className="text-sm text-gray-400">Generating</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-red-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stats.failed}
              </h3>
              <p className="text-sm text-gray-400">Failed</p>
            </div>
          </div>

          {/* Add Project Form */}
          {showAddForm && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Add New Project
              </h3>
              <form onSubmit={addProject} className="flex gap-2">
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/owner/repo"
                  className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !repoUrl.trim()}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          {/* Projects List */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Your Projects
              </h3>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-slate-800/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FolderGit2 className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-lg text-gray-400 mb-2">No projects yet</p>
                <p className="text-sm text-gray-500 mb-6">
                  Add a GitHub repository to get started!
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Project
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => router.push(`/projects/${project.id}`)}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer border border-slate-800 hover:border-slate-700"
                  >
                    <div className="p-2 bg-blue-500/10 rounded-lg mt-1">
                      <FolderGit2 className="w-5 h-5 text-blue-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-base font-semibold text-white truncate">
                          {project.name}
                        </h4>
                        {project.isGenerating && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-cyan-500/10 text-cyan-400 rounded-full">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Generating
                          </span>
                        )}
                        {project.onboardingOverview &&
                          !project.isGenerating && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-green-500/10 text-green-400 rounded-full">
                              <CheckCircle className="w-3 h-3" />
                              Ready
                            </span>
                          )}
                        {project.generationFailed && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-red-500/10 text-red-400 rounded-full">
                            <AlertCircle className="w-3 h-3" />
                            Failed
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-400 mb-2 line-clamp-1">
                        {project.description || 'No description'}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {project.stars?.toLocaleString() || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitBranch className="w-3 h-3" />
                          {project.forks?.toLocaleString() || 0}
                        </span>
                        {project.language && (
                          <span className="px-2 py-0.5 bg-slate-800 rounded-full">
                            {project.language}
                          </span>
                        )}
                        {project.updatedAt && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(project.updatedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => deleteProject(project.id, e)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-950/50 rounded-lg transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
