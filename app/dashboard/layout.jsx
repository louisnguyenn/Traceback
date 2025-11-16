import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

// TODO: implement sidebar in dashboard

export default function DashboardLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar>
          <main>{children}</main>
        </AppSidebar>
      </SidebarProvider>
    </>
  );
}
