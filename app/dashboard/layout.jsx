import { Sidebar } from '@/components/Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <Sidebar>
          <main>{children}</main>
        </Sidebar>
      </SidebarProvider>
    </>
  );
}
