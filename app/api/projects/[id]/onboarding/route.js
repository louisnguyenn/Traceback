import { onboardingPrompt } from '@/prompts';
import { fetchGemini } from '@/services/gemini.service';
import { getCompleteRepositoryData } from '@/services/github.service';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const parts = id.split('-');
    if (parts.length < 2) {
      return NextResponse.json(
        { message: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const owner = parts[0];
    const repo = parts.slice(1).join('-');

    // Fetch complete repository data
    const projectData = await getCompleteRepositoryData(owner, repo);

    // create prompt
    const prompt = onboardingPrompt(projectData);

    // use Gemini service
    const summary = await fetchGemini(prompt);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error generating onboarding:', error);
    return NextResponse.json(
      { message: 'Failed to generate onboarding summary' },
      { status: 500 }
    );
  }
}
