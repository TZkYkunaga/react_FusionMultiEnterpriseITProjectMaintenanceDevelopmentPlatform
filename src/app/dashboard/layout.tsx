import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset } from '@/components/ui/sidebar';
import { FusionLogo } from '@/components/icons';
import { SidebarNav } from '@/components/sidebar-nav';
import { DashboardHeader } from '@/components/dashboard-header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar collapsible="icon" variant="sidebar" side="left">
          <SidebarHeader className="p-4">
            <a href="/dashboard" className="flex items-center gap-2 text-primary">
              <FusionLogo className="size-8" />
              <span className="text-lg font-semibold text-foreground group-data-[collapsible=icon]:hidden">
                Fusion
              </span>
            </a>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <DashboardHeader />
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
