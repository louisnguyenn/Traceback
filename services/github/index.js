const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_HEADERS = {
  Accept: 'application/vnd.github.v3+json',
  // Add token for higher rate limits (optional)
  // Authorization: `token ${process.env.GITHUB_TOKEN}`,
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
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
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
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
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
    const [repository, commits, languages, dependencies, readme] =
      await Promise.all([
        getRepository(owner, repo),
        getCommits(owner, repo, 10),
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
      commits,
      languages,
      dependencies,
      readme,
    };
  } catch (error) {
    throw new Error(`Failed to fetch repository data: ${error.message}`);
  }
}
