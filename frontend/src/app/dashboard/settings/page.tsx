
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
  
export default function SettingsPage() {
    return (
        <div className="flex flex-col flex-1 gap-4 md:gap-8">
            <div className="flex items-center gap-4">
                <h1 className="font-semibold text-lg md:text-2xl">Settings</h1>
            </div>
            <div className="grid gap-6">
                <Card>
                <CardHeader>
                    <CardTitle>General</CardTitle>
                    <CardDescription>
                    Manage your workspace and theme settings.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="workspace-name">Workspace Name</Label>
                        <Input id="workspace-name" defaultValue="Fusion Platform Tenant" />
                    </div>
                     <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Label>Theme</Label>
                            <p className="text-sm text-muted-foreground">Select your preferred color scheme.</p>
                        </div>
                        <ThemeToggle />
                    </div>
                </CardContent>
                <CardHeader>
                    <Button>Save Changes</Button>
                </CardHeader>
                </Card>

                <Card>
                <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>
                    Manage security settings for your workspace.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                    </div>
                </CardContent>
                <CardHeader>
                    <Button>Update Password</Button>
                </CardHeader>
                </Card>
            </div>
      </div>
    )
}
