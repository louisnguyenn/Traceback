import { summarizeBranchesPrompt } from '@/prompts';
import { fetchGemini } from '@/services/gemini';
import { fetchGitHubBranches } from '@/services/github/branches';

export async function POST(req) {
  try {
    const { repoUrl } = await req.json();

    // fetch the branches
    const fetchBranches = fetchGitHubBranches(repoUrl);

    // extract the branches
    const branches = fetchBranches.map((b) => '- ' + b.name).join('\n');

    // build the prompt
    const prompt = summarizeBranchesPrompt(branches);

    // summarize with gemini
    const summary = fetchGemini(prompt);

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
