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
    };
  }

  return {
    totalProjects: projects.length, // total number of projects
    totalCommits: projects.reduce(
      (sum, project) => sum + (project.commits?.length || 0),
      0
    ),
    totalStars: projects.reduce(
      (sum, project) => sum + (project.stars || 0),
      0
    ),
    readyProjects: projects.filter(
      (project) => project.onboardingOverview && !project.isGenerating
    ).length,
  };
}
