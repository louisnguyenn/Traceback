import {
  getCompleteRepositoryData,
  parseRepoUrl,
} from '@/services/github.service';

/* workflow: split into two end points for progressive loading
  load metadata first (github info) then fetch gemini and let gemini summarize the repo */

// fast metadata fetch
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

    // Return the generated summary
    return Response.json({
      message: 'Project metadata fetched',
      project: {
        ...projectData,
        onboardingOverview: null, // will be generated seperately
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
