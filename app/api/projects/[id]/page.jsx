'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { POST } from '../route';

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
      const response = await fetch('/api/projects/generateOnboarding', {
        method: POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectData }),
      });

      if (!response.ok) {
        throw new Error('Failed to generated onboarding');
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
        setProjectData({
          ...projects,
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
  
};
