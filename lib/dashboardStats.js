/* 
  Workflow:
  1. load projects from local storage
  2. calculate stats from each project
  3. display stats in the dashboard
  4. update the dashboard automatically whenever a new project is added
*/

/** calculate dashboard stats from projects
 * @param {Array} projects - array of project objects
 * @returns {Object} - stats object
 */
export function calculateDashboardStats(projects) {
  if (!projects || projects.length === 0) {
    return {
      totalProjects: 0,
      totalCommits: 0,
      totalStars: 0,
      readyProjects: 0,
    }; // return a data of 0 if no projects exist
  }

  return {
    totalProjects: projects.length, // total number of projects
    // total number of commits
    totalCommits: projects.reduce(
      (sum, project) => sum + (project.commits?.length || 0),
      0
    ),
    // total number of stars
    totalStars: projects.reduce(
      (sum, project) => sum + (project.stars || 0),
      0
    ),
    // number of projects
    readyProjects: projects.filter(
      (project) => project.onboardingOverview && !project.isGenerating
    ).length,
  };
}

/**
 * get recent activity from projects
 * @param {Array} projects - array of project objects
 * @param {number} limit - number of activities to return
 * @returns {Array} recent activites
 */
export function getRecentActivity(projects, limit = 4) {
  if (!projects || projects.length === 0) {
    return []; // return empty array if no projects exist
  }

  const activites = [];

  projects.forEach((project) => {
    // add project creation activity
    if (project.createdAt) {
      activites.push({
        repo: project.name,
        action: 'added to Traceback',
        time: project.createdAt,
        color: 'blue',
        icon: 'folder',
      });
    }

    // onboarding generation activity
    if (project.onboardingOverview) {
      activites.push({
        repo: project.name,
        action: 'onboarding guide generated',
        time: project.updatedAt || project.createdAt,
        color: 'purple',
        icon: 'sparkles',
      });
    }

    // recent commits activity
    if (project.commits && project.commits.length > 0) {
      const latestCommit = project.commits[0];
      activities.push({
        repo: project.name,
        action: `commited: ${latestCommit.message.substring(0, 50)}...`,
        time: latestCommit.date,
        color: 'green',
        icon: 'git',
      });
    }

    return activites // return activities (most recent first -> ascending order)
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, limit);
  });
}
