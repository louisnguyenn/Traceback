'use client';
import {
  ChevronDown,
  FolderCode,
  FolderGit2,
  GitBranch,
  GitCommitVertical,
  GitCompare,
  GitMerge,
  Home,
  LogOutIcon,
} from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

const mainItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'My Projects',
    url: '/dashboard/projects',
    icon: FolderCode,
  },
];

const activityItems = [
  {
    title: 'Commits',
    url: '/dashboard/activity/commits',
    icon: GitCommitVertical,
  },
  {
    title: 'Merges',
    url: '/dashboard/activity/merges',
    icon: GitMerge,
  },
  {
    title: 'Diffs',
    url: '/dashboard/activity/diffs',
    icon: GitCompare,
  },
  {
    title: 'Branches',
    url: '/dashboard/activity/branches',
    icon: GitBranch,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, signOut } = useAuth();

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-slate-900 bg-slate-950"
    >
      <SidebarHeader className="border-b border-slate-950 p-6 bg-slate-950">
        <div className="flex items-center justify-center w-full">
          <Link href="/" className="text-3xl font-bold">
            <span className="text-white">Trace</span>
            <span className="text-blue-400">back</span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-950">
        {/* main menu items */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-3 py-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-800/50 text-gray-400 hover:text-white transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-base font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between px-6 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                <div className="flex items-center space-x-2">
                  <FolderGit2 className="w-4 h-4" />
                  <span>Activity</span>
                </div>
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1 px-3 py-1">
                  {activityItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-800/50 text-gray-400 hover:text-white transition-colors"
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="text-base font-medium">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-900 bg-slate-950 p-4">
        {user && (
          <div className="mb-3">
            <div className="flex items-center space-x-3 mb-3">
              <div className="shrink-0">
                {user.user_metadata?.avatar_url ? (
                  <Image
                    width={40}
                    height={40}
                    src={user.user_metadata.avatar_url}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {(
                      user.user_metadata?.full_name?.[0] ||
                      user.email?.[0] ||
                      'U'
                    ).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-medium text-white truncate">
                  {user.user_metadata?.full_name ||
                    user.user_metadata?.name ||
                    'User'}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={signOut}
              className="flex gap-2 items-center justify-center py-3 rounded-lg hover:bg-slate-800/50 text-red-400 hover:text-red-300 transition-colors cursor-pointer w-full"
            >
              <LogOutIcon size={16} />
              <span className="text-sm font-medium">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
