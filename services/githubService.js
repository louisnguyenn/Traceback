export async function fetchGitHubCommits(repo) {
  const url =
    repoUrl.replace('github.com', 'api.github.com/repos') + '/commits';

  const res = await fetch(url, {
    headers: {
      Accept: 'applications/vnd.github+json',
    },
  });

  if (!res.ok) {
    throw new Error('Github request failed');
  }

  return res.json();
}
