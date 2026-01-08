const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_HEADERS = {
  Accept: 'application/vnd.github.v3+json',
};

/**
 * Parse GitHub URL to extract owner and repo
 */
export function parseRepoUrl(url) {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    throw new Error('Invalid GitHub URL');
  }
  const [, owner, repo] = match;
  return {
    owner,
    repo: repo.replace('.git', ''),
  };
}

/**
 * Fetch repository information
 */
export async function getRepository(owner, repo) {
  const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
    headers: GITHUB_HEADERS,
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Repository not found or is private');
    }
    throw new Error('Failed to fetch repository');
  }

  return await response.json();
}

/**
 * Fetch repository commits
 */
export async function getCommits(owner, repo, limit = 10) {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=${limit}`,
    {
      headers: GITHUB_HEADERS,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch commits');
  }

  const commits = await response.json();
  return commits.map((commit) => ({
    sha: commit.sha,
    message: commit.commit.message,
    author: commit.commit.author.name,
    date: commit.commit.author.date,
    url: commit.html_url,
  }));
}

/**
 * Get total commit count for a repository
 * Uses the default branch to count commits
 */
export async function getTotalCommitCount(owner, repo) {
  try {
    // First, get the repository to find the default branch
    const repoData = await getRepository(owner, repo);
    const defaultBranch = repoData.default_branch;

    // Fetch commits with pagination to get the total count
    // We'll make a request for 1 commit and check the Link header
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?sha=${defaultBranch}&per_page=1`,
      {
        headers: GITHUB_HEADERS,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch commit count');
    }

    // Parse the Link header to get total pages
    const linkHeader = response.headers.get('Link');

    if (linkHeader) {
      // Extract the last page number from the Link header
      const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
      if (lastPageMatch) {
        return parseInt(lastPageMatch[1]);
      }
    }

    // If no Link header, there's likely just one page
    const commits = await response.json();
    return commits.length > 0 ? 1 : 0;
  } catch (error) {
    console.error('Error fetching total commit count:', error);
    // Return 0 as fallback
    return 0;
  }
}

/**
 * Fetch repository file tree
 */
export async function getFileTree(owner, repo, branch = 'main') {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
    {
      headers: GITHUB_HEADERS,
    }
  );

  if (!response.ok) {
    // Try 'master' branch if 'main' fails
    if (branch === 'main') {
      return getFileTree(owner, repo, 'master');
    }
    throw new Error('Failed to fetch file tree');
  }

  const data = await response.json();
  return data.tree;
}

/**
 * Fetch repository languages
 */
export async function getLanguages(owner, repo) {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`,
    {
      headers: GITHUB_HEADERS,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch languages');
  }

  return await response.json();
}

/**
 * Fetch package.json or requirements.txt for dependencies
 */
export async function getDependencies(owner, repo) {
  try {
    // Try package.json first
    const packageResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/package.json`,
      {
        headers: GITHUB_HEADERS,
      }
    );

    if (packageResponse.ok) {
      const data = await packageResponse.json();
      const content = atob(data.content); // Use atob for browser compatibility
      const packageJson = JSON.parse(content);
      return {
        type: 'npm',
        dependencies: packageJson.dependencies || {},
        devDependencies: packageJson.devDependencies || {},
      };
    }

    // Try requirements.txt for Python
    const reqResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/requirements.txt`,
      {
        headers: GITHUB_HEADERS,
      }
    );

    if (reqResponse.ok) {
      const data = await reqResponse.json();
      const content = atob(data.content); // Use atob for browser compatibility
      return {
        type: 'pip',
        requirements: content.split('\n').filter((line) => line.trim()),
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching dependencies:', error);
    return null;
  }
}

/**
 * Fetch repository README
 */
export async function getReadme(owner, repo) {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`,
      {
        headers: {
          ...GITHUB_HEADERS,
          Accept: 'application/vnd.github.v3.raw',
        },
      }
    );

    if (response.ok) {
      return await response.text();
    }
    return null;
  } catch (error) {
    console.error('Error fetching README:', error);
    return null;
  }
}

/**
 * Get all repository data at once
 */
export async function getCompleteRepositoryData(owner, repo) {
  try {
    const [repository, commits, totalCommits, languages, dependencies, readme] =
      await Promise.all([
        getRepository(owner, repo),
        getCommits(owner, repo, 10),
        getTotalCommitCount(owner, repo),
        getLanguages(owner, repo),
        getDependencies(owner, repo),
        getReadme(owner, repo),
      ]);

    return {
      id: `${owner}-${repo}`.toLowerCase(),
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      url: repository.html_url,
      owner: repository.owner.login,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
      watchers: repository.watchers_count,
      language: repository.language,
      defaultBranch: repository.default_branch,
      createdAt: repository.created_at,
      updatedAt: repository.updated_at,
      commits, // Array of 10 recent commits for detailed view
      totalCommits, // Total commit count for charts/stats
      languages,
      dependencies,
      readme,
    };
  } catch (error) {
    throw new Error(`Failed to fetch repository data: ${error.message}`);
  }
}
