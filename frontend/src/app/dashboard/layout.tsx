import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { DashboardHeader } from '@/components/dashboard-header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon" variant="sidebar" side="left">
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1">
          <DashboardHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
