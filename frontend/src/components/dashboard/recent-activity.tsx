import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
  
// TODO: Replace with data fetched from the backend (e.g. /api/activity)
const activities: Array<{ user: string; avatarSeed?: number; action: string; target?: string; time?: string }> = [];
  
export function RecentActivity() {
    return (
        <Card>
        <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>What's been happening across your projects.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {activities.length === 0 ? (
                <div className="text-sm text-muted-foreground">No recent activity available.</div>
            ) : (
                activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            {activity.avatarSeed ? (
                                <AvatarImage src={`https://picsum.photos/seed/${activity.avatarSeed}/100/100`} alt="Avatar" data-ai-hint="person face" />
                            ) : (
                                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                            )}
                        </Avatar>
                        <div className="text-sm">
                            <p>
                                <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                                {activity.target && <span className="font-medium text-primary">{activity.target}</span>}
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                    </div>
                ))
            )}
        </CardContent>
        </Card>
    )
}
