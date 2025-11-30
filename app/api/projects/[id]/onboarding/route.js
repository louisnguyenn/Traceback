import { generateOnboardingSummary } from '@/services/gemini.service';
import { getRepoContext } from '@/services/github.service';
import { getProjectById, saveSummary } from '@/services/projects.service';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const project = await getProjectById(id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Return cached summary if available
    if (project.onboardingOverview) {
      return NextResponse.json({ summary: project.onboardingOverview });
    }

    // Get detailed repo info (slow)
    const context = await getRepoContext(project.repoUrl);

    // Call Gemini (slowest)
    const summary = await generateOnboardingSummary(context);

    // Save to DB so we don't regenerate every time
    await saveSummary(project.id, summary);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to generate onboarding summary' },
      { status: 500 }
    );
  }
}
