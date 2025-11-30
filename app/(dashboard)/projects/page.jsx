'use client';
import AnimatedContent from '@/components/animations/AnimatedContent';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { IconFolderCode } from '@tabler/icons-react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ProjectsPage = () => {
  const router = useRouter();
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateProject = async () => {
    if (!repoUrl.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    const githubUrlPattern =
      /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
    if (!githubUrlPattern.test(repoUrl.trim())) {
      setError('Please enter a valid GitHub repository URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repoUrl: repoUrl.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create project');
      }

      const data = await response.json();
      console.log('Project created:', data);

      setRepoUrl('');

      // redirect to the new project detail page
      if (data.project?.id) {
        router.push(`/projects/${data.project.id}`);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while creating the project');
      console.error('Error creating project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCreateProject();
    }
  };

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
                  <h2 className="text-4xl font-bold text-white">My Projects</h2>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto px-6 py-7">
          <div className="flex items-center gap-3 px-4 py-1 border border-slate-800 rounded-lg bg-slate-900 focus-within:border-slate-700">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <Input
              type="search"
              placeholder="Search Projects"
              className="border-0 p-0 bg-transparent text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconFolderCode />
            </EmptyMedia>
            <EmptyTitle className="text-gray-400">No Projects Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any projects yet. Get started by creating
              your first project.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Paste GitHub Repo URL"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  className="flex-1 border-slate-700 bg-slate-900 text-white placeholder:text-gray-400 focus:border-slate-600 disabled:opacity-50"
                />
                <Button
                  onClick={handleCreateProject}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create Project'}
                </Button>
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
            </div>
          </EmptyContent>
        </Empty>
      </main>
    </div>
  );
};

export default ProjectsPage;
