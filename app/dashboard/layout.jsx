import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-slate-950">
        <AppSidebar />
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <main className="flex-1 overflow-auto w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
