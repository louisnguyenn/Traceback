import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
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
      </main>
    </div>
  );
};

export default page;
