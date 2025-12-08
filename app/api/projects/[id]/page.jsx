'use client';

import AnimatedContent from '@/components/animations/AnimatedContent';
import {
  ChevronDown,
  ChevronRight,
  FileCode,
  GitCommit,
  Maximize2,
  Package,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProjectDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id;

  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    onboarding: true,
    commits: true,
    files: true,
    dependencies: false,
  });

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
          router.push('/projects'); // if project is not found, redirect back to projects page
        }
      } else {
        router.push('/projects'); // redirect if there are no projects
      }
    };

    loadProject();

    // updates every 2 seconds if onboarding summary is still generating
    const interval = setInterval(() => {
      const saved = localStorage.getItem('projects');

      if (saved) {
        const projects = JSON.parse(saved);
        const project = projects.find((p) => p.id === projectId); // find the project by checking for its id

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

  // regenerating onboarding overview
  const regenerateOnboarding = async () => {
    if (!projectData) {
      return; // return if project does not exist
    }

    // mark as generating
    const updatedProject = { ...projectData, isGenerating: true };
    setProjectData(updatedProject);

    // update local storage with project
    const saved = localStorage.getItem('projects');
    if (saved) {
      const projects = JSON.parse(saved); // get all current projects from local storage

      // save new project in local storage
      const updated = projects.map((p) =>
        p.id === projectData.id ? updatedProject : p
      );
      localStorage.setItem('projects', JSON.stringify(updated)); // store project in local storage
    }

    try {
      // 🐛 FIX 1: URL was wrong - should be /api/projects/generate-onboarding
      const response = await fetch('/api/projects/generate-onboarding', {
        method: 'POST', // 🐛 FIX 2: POST needs quotes
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectData }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate onboarding'); // 🐛 FIX 3: Typo fix
      }

      const { onboardingOverview } = await response.json();

      // update project with new onboarding
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
      console.error('Regeneration error:', error); // log error to console

      // mark as failed in local storage
      const saved = localStorage.getItem('projects');
      if (saved) {
        const projects = JSON.parse(saved);
        const updated = projects.map((p) =>
          p.id === projectData.id
            ? { ...p, isGenerating: false, generationFailed: true }
            : p
        );
        localStorage.setItem('projects', JSON.stringify(updated));
        // 🐛 FIX 4: Was spreading 'projects' instead of 'projectData'
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

  const openFullScreen = (section) => {
    router.push(`/projects/${projectId}/${section}`);
  };

  // loading state
  if (loading) {
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

  // projects not found page
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

  // section component
  const Section = ({
    title,
    icon,
    isExpanded,
    onToggle,
    onFullScreen,
    children,
  }) => {
    return (
      <div className="bg-slate-900/50 rounded-lg border border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <button
            onClick={onToggle}
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
            {icon}
            <h3 className="text-lg font-semibold">{title}</h3>
          </button>
          <button
            onClick={onFullScreen}
            className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="View full screen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
        {isExpanded && <div className="p-4">{children}</div>}
      </div>
    );
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <main>
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
                className="text-sm text-blue-400 hover:text-blue-300 mb-2 transition-colors cursor-pointer"
              >
                ← Back to Projects
              </button>
              <h2 className="text-4xl font-bold text-white">
                {projectData.name}
              </h2>
              <p className="text-base text-gray-400 mt-2">
                {projectData.description || 'No description available'}
              </p>
            </AnimatedContent>
          </div>
        </header>

        <div className="px-6 py-8 space-y-6">
          {/* Repo Overview Stats - Shows Immediately */}
          <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-400">Language</p>
                <p className="text-lg font-semibold text-white">
                  {projectData.language || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Stars</p>
                <p className="text-lg font-semibold text-white">
                  ⭐ {projectData.stars?.toLocaleString() || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Owner</p>
                <p className="text-lg font-semibold text-white">
                  {projectData.owner || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Updated</p>
                <p className="text-lg font-semibold text-white">
                  {projectData.updatedAt
                    ? new Date(projectData.updatedAt).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Onboarding Overview Section - Progressive Loading */}
          <div className="bg-slate-900/50 rounded-lg border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Onboarding Overview</h3>
              </div>
              {projectData.onboardingOverview && !projectData.isGenerating && (
                <button
                  onClick={regenerateOnboarding}
                  className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Regenerate onboarding"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="p-4">
              {projectData.isGenerating ? (
                <div className="flex items-center gap-3 text-gray-400">
                  <svg
                    className="animate-spin h-5 w-5"
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
                  <span>
                    AI is analyzing the repository and generating an onboarding
                    guide...
                  </span>
                </div>
              ) : projectData.onboardingOverview ? (
                <div className="prose prose-invert prose-lg max-w-none">
                  <div className="whitespace-pre-wrap text-gray-300">
                    {projectData.onboardingOverview}
                  </div>
                </div>
              ) : projectData.generationFailed ? (
                <div className="text-red-400">
                  Failed to generate onboarding overview.{' '}
                  <button
                    onClick={regenerateOnboarding}
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <div className="text-gray-400">
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

          {/* Commits Section */}
          <Section
            title="Recent Commits"
            icon={<GitCommit className="w-5 h-5" />}
            isExpanded={expandedSections.commits}
            onToggle={() => toggleSection('commits')}
            onFullScreen={() => openFullScreen('commits')}
          >
            <div className="space-y-3">
              {projectData.commits?.length > 0 ? (
                projectData.commits.slice(0, 10).map((commit, index) => (
                  <div
                    key={index}
                    className="p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <p className="text-sm text-white font-medium">
                      {commit.message}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-400">{commit.author}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(commit.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No commits data available</p>
              )}
            </div>
          </Section>

          {/* Languages Section */}
          {projectData.languages &&
            Object.keys(projectData.languages).length > 0 && (
              <Section
                title="Languages"
                icon={<FileCode className="w-5 h-5" />}
                isExpanded={expandedSections.files}
                onToggle={() => toggleSection('files')}
                onFullScreen={() => openFullScreen('files')}
              >
                <div className="space-y-3">
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
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white">{language}</span>
                            <span className="text-gray-400">{percentage}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Section>
            )}

          {/* Dependencies Section */}
          {projectData.dependencies && (
            <Section
              title="Dependencies"
              icon={<Package className="w-5 h-5" />}
              isExpanded={expandedSections.dependencies}
              onToggle={() => toggleSection('dependencies')}
              onFullScreen={() => openFullScreen('dependencies')}
            >
              <div className="space-y-4">
                {projectData.dependencies.type === 'npm' && (
                  <>
                    {Object.keys(projectData.dependencies.dependencies || {})
                      .length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">
                          Dependencies
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(
                            projectData.dependencies.dependencies
                          ).map(([name, version]) => (
                            <div
                              key={name}
                              className="flex justify-between text-sm p-2 bg-slate-800/50 rounded"
                            >
                              <span className="text-gray-300">{name}</span>
                              <span className="text-gray-500">{version}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {Object.keys(projectData.dependencies.devDependencies || {})
                      .length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">
                          Dev Dependencies
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(
                            projectData.dependencies.devDependencies
                          ).map(([name, version]) => (
                            <div
                              key={name}
                              className="flex justify-between text-sm p-2 bg-slate-800/50 rounded"
                            >
                              <span className="text-gray-300">{name}</span>
                              <span className="text-gray-500">{version}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {projectData.dependencies.type === 'pip' && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">
                      Requirements
                    </h4>
                    <div className="space-y-2">
                      {projectData.dependencies.requirements.map(
                        (requirement, index) => (
                          <div
                            key={index}
                            className="text-sm p-2 bg-slate-800/50 rounded text-gray-300"
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

          {/* README Section */}
          {projectData.readme && (
            <Section
              title="README"
              icon={<FileCode className="w-5 h-5" />}
              isExpanded={expandedSections.readme}
              onToggle={() => toggleSection('readme')}
              onFullScreen={() => openFullScreen('readme')}
            >
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-300 bg-slate-800/50 p-4 rounded-lg overflow-x-auto">
                  {projectData.readme.substring(0, 1000)}
                  {projectData.readme.length > 1000 && '...'}
                </pre>
              </div>
            </Section>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailPage;
