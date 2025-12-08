import { onboardingPrompt } from '@/prompts';
import { fetchGemini } from '@/services/gemini.service';

// endpoint for AI summary generation (prompt creatino and fetching Gemini)
export async function POST(req) {
  try {
    const { projectData } = await req.json();

    // check if project data exists
    if (!projectData) {
      return Response.json(
        { error: 'Project data is required' },
        { status: 400 }
      );
    }

    console.log('Generating onboarding for:', projectData.name);

    const prompt = onboardingPrompt(projectData); // create prompt
    const onboardingOverview = await fetchGemini(prompt); // generate AI summary (slow process)

    return Response.json({
      onboardingOverview,
    });
  } catch (error) {
    console.error('Onboarding generation error:', error);
    return Response.json(
      {
        error: 'Failed to generate onboarding',
      },
      { status: 500 }
    );
  }
}
