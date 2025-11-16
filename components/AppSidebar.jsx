import {
  BarChart3,
  FileText,
  FolderGit2,
  GitBranch,
  Home,
  Settings,
  Users,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Repositories',
    url: '/dashboard/repositories',
    icon: FolderGit2,
  },
  {
    title: 'Commits',
    url: '/dashboard/commits',
    icon: GitBranch,
  },
  {
    title: 'Analytics',
    url: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'Reports',
    url: '/dashboard/reports',
    icon: FileText,
  },
  {
    title: 'Team',
    url: '/dashboard/team',
    icon: Users,
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-slate-800 bg-slate-950">
      <SidebarHeader className="border-b border-slate-800 p-6 bg-slate-900/50">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">
            <span className="text-white">Trace</span>
            <span className="text-blue-400">back</span>
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-950">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-3 py-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-800/50 text-gray-400 hover:text-white transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
