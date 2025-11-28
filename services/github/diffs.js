export async function fetchGitHubDiffs(repoUrl, hash) {
  const apiUrl =
    repo.replace('https://github.com', 'https://api.github.com/repos') +
    `/commits/${hash}`;

  const res = await fetch(apiUrl, {
    headers: {
      Accept: 'applications/vnd.github.diff',
    },
  });

  if (res.ok) {
    throw new Error('Failed to fetch commit diffs');
  }

  return res.text;
}
