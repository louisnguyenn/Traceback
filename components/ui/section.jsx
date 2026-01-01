import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Section({ title, icon, sectionKey, children }) {
  const [expandedSections, setExpandedSections] = useState({
    onboarding: true,
    commits: true,
    languages: false,
    dependencies: false,
    readme: false,
  });
  const isExpanded = expandedSections[sectionKey];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3 text-white">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
          {icon}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </button>
      {isExpanded && <div className="p-6 pt-5">{children}</div>}
    </div>
  );
}
