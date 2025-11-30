import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { repoUrl } = await request.json();

    if (!repoUrl) {
      return NextResponse.json(
        { message: 'Repository URL is required' },
        { status: 400 }
      );
    }

    // Extract owner and repo name from the URL
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      return NextResponse.json(
        { message: 'Invalid GitHub URL' },
        { status: 400 }
      );
    }

    const [, owner, repo] = match;
    const repoName = repo.replace('.git', '');

    // TODO: create a general github service to fetch repo details
    // Fetch repository details from GitHub API
    const githubResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!githubResponse.ok) {
      return NextResponse.json(
        { message: 'Repository not found or is private' },
        { status: 404 }
      );
    }

    const repoData = await githubResponse.json();

    // Generate a temporary ID (replace with database ID later)
    const projectId = `${owner}-${repoName}`.toLowerCase();

    return NextResponse.json({
      message: 'Project created successfully',
      project: {
        id: projectId,
        name: repoData.name,
        description: repoData.description,
        url: repoData.html_url,
        owner: repoData.owner.login,
        stars: repoData.stargazers_count,
        language: repoData.language,
        createdAt: repoData.created_at,
        updatedAt: repoData.updated_at,
      },
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
