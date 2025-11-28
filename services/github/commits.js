export async function fetchGitHubCommits(repoUrl) {
  const apiUrl =
    repoUrl.replace('github.com', 'api.github.com/repos') + '/commits';

  const res = await fetch(apiUrl, {
    headers: {
      Accept: 'applications/vnd.github+json',
    },
  });

  if (!res.ok) {
    throw new Error('Github request failed');
  }

  return res.json();
}
