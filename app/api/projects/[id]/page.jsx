'use client';

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

  // TODO: regenerating onboarding overview

};
