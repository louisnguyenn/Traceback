'use client';
import {
  BarChart3,
  FileText,
  FolderGit2,
  GitBranch,
  Home,
  LogOutIcon,
  Settings,
  Users,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-3 py-1">
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
