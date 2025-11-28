import { summarizeCommitsPrompt } from '@/prompts';
import { fetchGemini } from '@/services/gemini';
import { fetchGitHubCommits } from '@/services/github/commits';

export async function POST(req) {
  try {
    const { repoUrl } = await req.json();

    // fetch github commits
    const fetchCommits = await fetchGitHubCommits(repoUrl);

    // extract the commits
    const commits = fetchCommits.map((c) => `- ${c.commit.message}`).join('\n');

    // build the prompt
    const prompt = summarizeCommitsPrompt(commits);

    // fetch gemini to generate a summary
    const summary = await fetchGemini(prompt);

    // return the summary
    return Response.json({ summary });
  } catch (error) {
    console.error('API Error:', error);
    return (
      new Response(JSON.stringify)({
        error: 'Failed to process request to Gemini',
      }),
      { status: 500 }
    );
  }
}
