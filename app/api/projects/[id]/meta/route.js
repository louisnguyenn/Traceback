import { getRepoMeta } from '@/services/github.service';
import { getProjectById } from '@/services/projects.service';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const project = await getProjectById(id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // GitHub data (fast)
    const meta = await getRepoMeta(project.repoUrl);

    return NextResponse.json({
      id: project.id,
      name: project.name,
      repoUrl: project.repoUrl,
      ...meta,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch project meta' },
      { status: 500 }
    );
  }
}
