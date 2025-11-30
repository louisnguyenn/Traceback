import { onboardingPrompt } from '@/prompts';
import { fetchGemini } from '@/services/gemini.service';
import {
  getCompleteRepositoryData,
  parseRepoUrl,
} from '@/services/github.service';

export async function POST(req) {
  try {
    const { repoUrl } = await req.json();

    if (!repoUrl) {
      return Response.json(
        { error: 'Repository URL is required' },
        { status: 400 }
      );
    }

    // Parse URL
    const { owner, repo } = parseRepoUrl(repoUrl);

    // Fetch repository data
    const projectData = await getCompleteRepositoryData(owner, repo);

    // Build the prompt with project info
    const prompt = onboardingPrompt(projectData);

    // Fetch Gemini for the onboarding overview
    const onboardingOverview = await fetchGemini(prompt);

    // Add onboarding overview to project data
    const project = {
      ...projectData,
      onboardingOverview,
    };

    // TODO: Save to database
    // await db.projects.create(project);

    return Response.json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
