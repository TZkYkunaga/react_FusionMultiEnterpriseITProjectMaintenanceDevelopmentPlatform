import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { FusionLogo } from '@/components/icons';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <a href="/dashboard" className="hidden items-center gap-2 text-primary md:flex">
            <FusionLogo className="size-8" />
            <span className="text-lg font-semibold text-foreground">
            Fusion
            </span>
        </a>
      </div>
      <div className="flex-1">
        {/* Page title or breadcrumbs could go here */}
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
