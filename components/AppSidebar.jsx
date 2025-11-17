'use client';
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
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';

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
  const { state } = useSidebar();

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-slate-950 bg-slate-950"
    >
      <SidebarHeader className="border-b border-slate-950 p-6 bg-slate-950">
        <div className="flex items-center justify-between w-full">
          <Link
            href="/"
            className="text-2xl font-bold group-data-[collapsible=icon]:hidden"
          >
            <span className="text-white">Trace</span>
            <span className="text-blue-400">back</span>
          </Link>

          <Link
            href="/"
            className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full"
          >
            <Image
              src="/tracebacklogotransparent.png"
              alt="Traceback"
              width={32}
              height={32}
            />
          </Link>

          <SidebarTrigger className="px-3 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer group-data-[collapsible=icon]:mx-auto" />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-950">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-3 py-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-800/50 text-gray-400 hover:text-white transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
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
