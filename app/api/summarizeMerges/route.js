import { summarizeMergesPrompt } from '@/prompts';
import { fetchGemini } from '@/services/gemini';
import { fetchGitHubMerges } from '@/services/github/merges';

export async function POST(req) {
  try {
    const { repoUrl } = await req.json();

    // fetch github merges
    const fetchMerges = fetchGitHubMerges(repoUrl);

    // extract the merges
    const merges = fetchMerges
      .map((m) => `#${m.number}: ${m.title}`)
      .join('\n');

    // build prompt
    const prompt = summarizeMergesPrompt(merges);

    // fetch gemini
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
