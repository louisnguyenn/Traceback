import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { ArrowUpRightIcon, Folder, Search } from 'lucide-react';
import React from 'react';

const page = () => {
  return (
    <div className="bg-slate-950 min-h-screen">
      <main>
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="px-6 py-7">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-bold text-white">My Projects</h2>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto px-6 py-7">
          <div className="flex items-center gap-3 px-4 py-1 border border-slate-800 rounded-lg bg-slate-900 focus-within:border-slate-700">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="border-0 p-0 bg-transparent text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Folder />
            </EmptyMedia>
            <EmptyTitle>No Projects Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any projects yet. Get started by creating
              your first project.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Button>Create Project</Button>
              <Button variant="outline">Import Project</Button>
            </div>
          </EmptyContent>
          <Button
            variant="link"
            asChild
            className="text-muted-foreground"
            size="sm"
          >
            <a href="#">
              Learn More <ArrowUpRightIcon />
            </a>
          </Button>
        </Empty>
      </main>
    </div>
  );
};

export default page;
