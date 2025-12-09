'use client';
import AnimatedContent from '@/components/animations/AnimatedContent';
import { useAuth } from '@/context/AuthContext';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Eye,
  FileCode,
  GitCommit,
  GitFork,
  Loader2,
  Package,
  RefreshCw,
  Sparkles,
  Star,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProjectDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const projectId = params.id;

  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    onboarding: true,
    commits: true,
    languages: false,
    dependencies: false,
    readme: false,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin');
    }
  }, [user, authLoading, router]);

  // Load project from localStorage and poll for updates
  useEffect(() => {
    const loadProject = () => {
      const saved = localStorage.getItem('projects');
      if (saved) {
        const projects = JSON.parse(saved);
        const project = projects.find((p) => p.id === projectId);

        if (project) {
          setProjectData(project);
          setLoading(false);
        } else {
          router.push('/projects');
        }
      } else {
        router.push('/projects');
      }
    };

    loadProject();

    // Poll for updates every 2 seconds if onboarding is still generating
    const interval = setInterval(() => {
      const saved = localStorage.getItem('projects');
      if (saved) {
        const projects = JSON.parse(saved);
        const project = projects.find((p) => p.id === projectId);

        if (
          project &&
          project.onboardingOverview !== projectData?.onboardingOverview
        ) {
          setProjectData(project);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [projectId, router, projectData?.onboardingOverview]);

  // Regenerate onboarding overview
  const regenerateOnboarding = async () => {
    if (!projectData) return;

    const updatedProject = { ...projectData, isGenerating: true };
    setProjectData(updatedProject);

    const saved = localStorage.getItem('projects');
    if (saved) {
      const projects = JSON.parse(saved);
      const updated = projects.map((p) =>
        p.id === projectData.id ? updatedProject : p
      );
      localStorage.setItem('projects', JSON.stringify(updated));
    }

    try {
      const response = await fetch('/api/projects/generate-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectData }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate onboarding');
      }

      const { onboardingOverview } = await response.json();

      const saved = localStorage.getItem('projects');
      if (saved) {
        const projects = JSON.parse(saved);
        const updated = projects.map((p) =>
          p.id === projectData.id
            ? {
                ...p,
                onboardingOverview,
                isGenerating: false,
                generationFailed: false,
              }
            : p
        );
        localStorage.setItem('projects', JSON.stringify(updated));
        setProjectData({
          ...projectData,
          onboardingOverview,
          isGenerating: false,
          generationFailed: false,
        });
      }
    } catch (error) {
      console.error('Regeneration error:', error);

      const saved = localStorage.getItem('projects');
      if (saved) {
        const projects = JSON.parse(saved);
        const updated = projects.map((p) =>
          p.id === projectData.id
            ? { ...p, isGenerating: false, generationFailed: true }
            : p
        );
        localStorage.setItem('projects', JSON.stringify(updated));
        setProjectData({
          ...projectData,
          isGenerating: false,
          generationFailed: true,
        });
      }
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (authLoading || loading) {
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
          <p className="text-gray-400">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-2">Project not found</p>
          <p className="text-gray-500 text-sm mb-4">Project ID: {projectId}</p>
          <button
            onClick={() => router.push('/projects')}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer"
          >
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  // Reusable Section Component
  const Section = ({ title, icon, sectionKey, children }) => {
    const isExpanded = expandedSections[sectionKey];

    return (
      <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 text-white">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
            {icon}
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        </button>
        {isExpanded && <div className="p-6 pt-0">{children}</div>}
      </div>
    );
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <main>
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="px-6 py-7">
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
              <button
                onClick={() => router.push('/projects')}
                className="text-sm text-blue-400 hover:text-blue-300 mb-3 transition-colors cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </button>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {projectData.name}
                  </h2>
                  <p className="text-base text-gray-400 mb-4">
                    {projectData.description || 'No description available'}
                  </p>
                  <div className="flex items-center gap-4">
                    <a
                      href={projectData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View on GitHub
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <span className="text-gray-600">•</span>
                    <span className="text-sm text-gray-400">
                      by {projectData.owner}
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </header>

        <div className="px-6 py-8 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-yellow-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="text-sm text-gray-400">Stars</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {projectData.stars?.toLocaleString() || 0}
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-blue-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <GitFork className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm text-gray-400">Forks</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {projectData.forks?.toLocaleString() || 0}
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <Eye className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-sm text-gray-400">Watchers</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {projectData.watchers?.toLocaleString() || 0}
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <FileCode className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm text-gray-400">Language</span>
              </div>
              <p className="text-xl font-bold text-white truncate">
                {projectData.language || 'N/A'}
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-green-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Calendar className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm text-gray-400">Updated</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {projectData.updatedAt
                  ? new Date(projectData.updatedAt).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>

          {/* Onboarding Overview */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex items-center gap-3 text-white">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold">Onboarding Overview</h3>
              </div>
              {projectData.onboardingOverview && !projectData.isGenerating && (
                <button
                  onClick={regenerateOnboarding}
                  className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all hover:scale-105 duration-300 flex items-center gap-2 cursor-pointer"
                  title="Regenerate onboarding"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm">Regenerate</span>
                </button>
              )}
            </div>
            <div className="p-6">
              {projectData.isGenerating ? (
                <div className="flex items-center gap-3 text-gray-400 py-8">
                  <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                  <span>Generating an onboarding guide...</span>
                </div>
              ) : projectData.onboardingOverview ? (
                <div className="prose prose-invert prose-lg max-w-none">
                  <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                    {projectData.onboardingOverview}
                  </div>
                </div>
              ) : projectData.generationFailed ? (
                <div className="flex items-center gap-3 text-red-400 py-8">
                  <AlertCircle className="w-5 h-5" />
                  <span>
                    Failed to generate onboarding overview.{' '}
                    <button
                      onClick={regenerateOnboarding}
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Try again
                    </button>
                  </span>
                </div>
              ) : (
                <div className="text-gray-400 py-8">
                  No onboarding overview available.{' '}
                  <button
                    onClick={regenerateOnboarding}
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Generate now
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Commits */}
          <Section
            title="Recent Commits"
            icon={<GitCommit className="w-5 h-5 text-blue-400" />}
            sectionKey="commits"
          >
            <div className="space-y-3">
              {projectData.commits?.length > 0 ? (
                projectData.commits.slice(0, 10).map((commit, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors border border-slate-700/50"
                  >
                    <p className="text-sm text-white font-medium mb-2">
                      {commit.message}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">{commit.author}</span>
                      <span className="text-gray-500">
                        {new Date(commit.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 py-4">No commits data available</p>
              )}
            </div>
          </Section>

          {/* Languages */}
          {projectData.languages &&
            Object.keys(projectData.languages).length > 0 && (
              <Section
                title="Languages"
                icon={<FileCode className="w-5 h-5 text-green-400" />}
                sectionKey="languages"
              >
                <div className="space-y-4">
                  {Object.entries(projectData.languages)
                    .sort(([, a], [, b]) => b - a)
                    .map(([language, bytes]) => {
                      const totalBytes = Object.values(
                        projectData.languages
                      ).reduce((sum, val) => sum + val, 0);
                      const percentage = ((bytes / totalBytes) * 100).toFixed(
                        1
                      );
                      return (
                        <div key={language}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-white font-medium">
                              {language}
                            </span>
                            <span className="text-gray-400">{percentage}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2.5">
                            <div
                              className="bg-linear-to-r from-green-500 to-emerald-500 h-2.5 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Section>
            )}

          {/* Dependencies */}
          {projectData.dependencies && (
            <Section
              title="Dependencies"
              icon={<Package className="w-5 h-5 text-orange-400" />}
              sectionKey="dependencies"
            >
              <div className="space-y-6">
                {projectData.dependencies.type === 'npm' && (
                  <>
                    {Object.keys(projectData.dependencies.dependencies || {})
                      .length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Dependencies
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {Object.entries(
                            projectData.dependencies.dependencies
                          ).map(([name, version]) => (
                            <div
                              key={name}
                              className="flex justify-between text-sm p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                            >
                              <span className="text-gray-300 font-mono">
                                {name}
                              </span>
                              <span className="text-gray-500 font-mono">
                                {version}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {Object.keys(projectData.dependencies.devDependencies || {})
                      .length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          Dev Dependencies
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {Object.entries(
                            projectData.dependencies.devDependencies
                          ).map(([name, version]) => (
                            <div
                              key={name}
                              className="flex justify-between text-sm p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                            >
                              <span className="text-gray-300 font-mono">
                                {name}
                              </span>
                              <span className="text-gray-500 font-mono">
                                {version}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {projectData.dependencies.type === 'pip' && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      Requirements
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {projectData.dependencies.requirements.map(
                        (requirement, index) => (
                          <div
                            key={index}
                            className="text-sm p-3 bg-slate-800/50 rounded-lg text-gray-300 font-mono border border-slate-700/50"
                          >
                            {requirement}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* README */}
          {projectData.readme && (
            <Section
              title="README Preview"
              icon={<FileCode className="w-5 h-5 text-cyan-400" />}
              sectionKey="readme"
            >
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-300 bg-slate-800/50 p-4 rounded-lg overflow-x-auto border border-slate-700/50 font-mono">
                  {projectData.readme.substring(0, 1000)}
                  {projectData.readme.length > 1000 && '...'}
                </pre>
                {projectData.readme.length > 1000 && (
                  <a
                    href={`${projectData.url}#readme`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View full README on GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </Section>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailPage;
