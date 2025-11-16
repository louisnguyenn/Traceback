import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-slate-950">
        <AppSidebar />
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <div className="p-2">
            <SidebarTrigger className="text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg" />
          </div>
          <main className="flex-1 overflow-auto w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
