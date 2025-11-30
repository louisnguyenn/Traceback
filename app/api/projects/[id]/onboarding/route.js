import { generateOnboardingSummary } from '@/services/gemini.service';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Parse the ID
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

    // Get key files for context (slow)
    const filesResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents`
    );
    const files = await filesResponse.json();

    // Get recent commits (slow)
    const commitsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=20`
    );
    const commits = await commitsResponse.json();

    // Create clean AI context
    const context = {
      repo: `${owner}/${repo}`,
      files: files.slice(0, 30).map((f) => f.name),
      commits: commits.slice(0, 10).map((c) => ({
        message: c.commit.message,
        author: c.commit.author.name,
      })),
    };

    // Generate onboarding summary
    const summary = await generateOnboardingSummary(context);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error generating onboarding:', error);
    return NextResponse.json(
      { message: 'Failed to generate onboarding summary' },
      { status: 500 }
    );
  }
}
