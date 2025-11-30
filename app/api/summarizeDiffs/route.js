import { summarizeDiffsPrompt } from '@/prompts';
import { fetchGemini } from '@/services/gemini.service';
import { fetchGitHubDiffs } from '@/services/github/diffs';

export async function POST(req) {
  try {
    const { repoUrl } = await req.json();

    // fetch diffs
    const fetchDiffs = fetchGitHubDiffs(repoUrl);

    // build the prompt
    const prompt = summarizeDiffsPrompt(fetchDiffs);

    // fetch gemini for the summary
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
