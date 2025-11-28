export async function fetchGitHubMerges(repoUrl) {
  const apiUrl =
    repoUrl.replace('github.com', 'api.gihub.com/repos') + '/merges';

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
