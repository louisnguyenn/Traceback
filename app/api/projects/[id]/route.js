import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Parse the ID back to owner/repo
    const parts = id.split('-');
    if (parts.length < 2) {
      return NextResponse.json(
        { message: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const owner = parts[0];
    const repo = parts.slice(1).join('-');

    if (!owner || !repo) {
      return NextResponse.json(
        { message: 'Invalid project ID' },
        { status: 400 }
      );
    }

    // Fetch from GitHub API
    const githubResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!githubResponse.ok) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    const repoData = await githubResponse.json();

    return NextResponse.json({
      id,
      name: repoData.name,
      description: repoData.description,
      url: repoData.html_url,
      owner: repoData.owner.login,
      stars: repoData.stargazers_count,
      language: repoData.language,
      createdAt: repoData.created_at,
      updatedAt: repoData.updated_at,
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
