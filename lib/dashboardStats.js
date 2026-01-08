/* 
  Workflow:
  1. load projects from local storage
  2. calculate stats from each project
  3. display stats in the dashboard
  4. update the dashboard automatically whenever a new project is added

  Dataflow:
  localStorage -> loadProjects() -> setState() -> re-render -> display
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
    };
  }

  return {
    totalProjects: projects.length,
    // Check if commits is an array, get its length, otherwise treat as number
    totalCommits: projects.reduce((sum, project) => {
      const commitCount = Array.isArray(project.commits)
        ? project.commits.length
        : project.commits || 0;
      return sum + commitCount;
    }, 0),
    totalStars: projects.reduce(
      (sum, project) => sum + (project.stars || 0),
      0
    ),
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
      activites.push({
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

/**
 * formatting time (e.g. "2 hours ago")
 * @param {string|Date} date - the date to format
 * @returns {string} formatted time string
 */
export function getRelativetime(date) {
  const present = new Date();
  const past = new Date(date);
  const timeDifference = present - past;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // return times
  if (seconds < 60) {
    return 'just now';
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hour !== 1 ? 's' : ''} ago`;
  } else if (days < 7) {
    return `${days} day${day !== 1 ? 's' : ''} ago`;
  }

  return past.toLocaleDateString();
}

/**
 * Prepare commit activity data for line chart
 * @param {Array} projects - array of project objects
 * @returns {Array} array of {date, commits} objects
 */
export function getCommitActivityData(projects) {
  if (!projects || projects.length === 0) {
    return [];
  }

  const commitsByDate = {};

  projects.forEach((project) => {
    // Get commit count (handle both array and number)
    const commitCount = Array.isArray(project.commits)
      ? project.commits.length
      : project.commits || 0;

    if (commitCount > 0) {
      const date = new Date(
        project.lastCommitDate || project.createdAt
      ).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      commitsByDate[date] = (commitsByDate[date] || 0) + commitCount;
    }
  });

  return Object.entries(commitsByDate)
    .map(([date, commits]) => ({ date, commits }))
    .slice(-7); // Last 7 entries
}

/**
 * Get top repositories by commits
 * @param {Array} projects - array of project objects
 * @param {number} limit - number of repos to return
 * @returns {Array} array of top repos with commits and stars
 */
export function getTopRepositories(projects, limit = 5) {
  if (!projects || projects.length === 0) {
    return [];
  }

  return projects
    .map((project) => ({
      ...project,
      commitCount: Array.isArray(project.commits)
        ? project.commits.length
        : project.commits || 0,
    }))
    .sort((a, b) => b.commitCount - a.commitCount)
    .slice(0, limit)
    .map((project) => ({
      name:
        project.name.length > 15
          ? project.name.substring(0, 15) + '...'
          : project.name,
      commits: project.commitCount,
      stars: project.stars || 0,
    }));
}

/**
 * Prepare project status distribution for pie chart
 * @param {Array} projects - array of project objects
 * @returns {Array} array of {status, count, color} objects
 */
export function getStatusDistribution(projects) {
  if (!projects || projects.length === 0) {
    return [];
  }

  const ready = projects.filter((p) => p.onboardingStatus === 'ready').length;
  const pending = projects.filter(
    (p) => p.onboardingStatus === 'pending'
  ).length;
  const processing = projects.filter(
    (p) => p.onboardingStatus === 'processing'
  ).length;

  return [
    { status: 'Ready', count: ready, color: '#10b981' },
    { status: 'Pending', count: pending, color: '#f59e0b' },
    { status: 'Processing', count: processing, color: '#3b82f6' },
  ].filter((item) => item.count > 0); // only return statuses that have projects
}
