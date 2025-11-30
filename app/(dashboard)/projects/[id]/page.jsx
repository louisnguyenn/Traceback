'use client';
import AnimatedContent from '@/components/animations/AnimatedContent';
import {
  ChevronDown,
  ChevronRight,
  FileCode,
  GitCommit,
  Maximize2,
  Package,
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
    commits: true,
    files: true,
    summary: true,
    dependencies: true,
  });

  useEffect(() => {
    // fetch the project data
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        if (!response.ok) {
          throw new Error('Project not found');
        }
        const data = await response.json();
        setProjectData(data);
      } catch (error) {
        console.error('Error fetching project:', error);
        // Optionally redirect back to projects list
        // router.push('/projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, router]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const openFullScreen = (section) => {
    router.push(`/projects/${projectId}/${section}`);
  };

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

  if (!projectData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Project not found</p>
        </div>
      </div>
    );
  }

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
                className="text-sm text-blue-400 hover:text-blue-300 mb-2 transition-colors"
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
          {/* Repo Overview */}
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
                  {projectData.stars || 0}
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

          <Section
            title="AI Code Summary"
            icon={<Sparkles className="w-5 h-5" />}
            isExpanded={expandedSections.summary}
            onToggle={() => toggleSection('summary')}
            onFullScreen={() => openFullScreen('summary')}
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">
                AI-powered summary will appear here once generated...
              </p>
            </div>
          </Section>

          {/* Commits Section */}
          <Section
            title="Recent Commits"
            icon={<GitCommit className="w-5 h-5" />}
            isExpanded={expandedSections.commits}
            onToggle={() => toggleSection('commits')}
            onFullScreen={() => openFullScreen('commits')}
          >
            <div className="space-y-3">
              {projectData.commits?.slice(0, 5).map((commit, index) => (
                <div
                  key={index}
                  className="p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <p className="text-sm text-white font-medium">
                    {commit.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {commit.author} • {commit.date}
                  </p>
                </div>
              )) || <p className="text-gray-400">No commits data available</p>}
            </div>
          </Section>

          {/* Files Section */}
          <Section
            title="File Structure"
            icon={<FileCode className="w-5 h-5" />}
            isExpanded={expandedSections.files}
            onToggle={() => toggleSection('files')}
            onFullScreen={() => openFullScreen('files')}
          >
            <div className="space-y-2">
              <p className="text-gray-400">
                File structure will appear here...
              </p>
            </div>
          </Section>

          {/* Dependencies Section */}
          <Section
            title="Dependencies"
            icon={<Package className="w-5 h-5" />}
            isExpanded={expandedSections.dependencies}
            onToggle={() => toggleSection('dependencies')}
            onFullScreen={() => openFullScreen('dependencies')}
          >
            <div className="space-y-2">
              <p className="text-gray-400">Dependencies will appear here...</p>
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
};

// Reusable Section Component
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

export default ProjectDetailPage;
