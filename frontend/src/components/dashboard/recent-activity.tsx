import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
  
const activities = [
    { user: 'Alice', avatarSeed: 2, action: 'commented on task', target: '#T-1234', time: '5m ago' },
    { user: 'Bob', avatarSeed: 3, action: 'created a new project', target: 'Project Odyssey', time: '1h ago' },
    { user: 'Charlie', avatarSeed: 4, action: 'updated status to "In Review"', target: '#T-5678', time: '3h ago' },
    { user: 'David', avatarSeed: 5, action: 'closed task', target: '#T-9101', time: '8h ago' },
]
  
export function RecentActivity() {
    return (
        <Card>
        <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>What's been happening across your projects.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                <AvatarImage src={`https://picsum.photos/seed/${activity.avatarSeed}/100/100`} alt="Avatar" data-ai-hint="person face" />
                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                <p>
                    <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                    <span className="font-medium text-primary">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
            </div>
            ))}
        </CardContent>
        </Card>
    )
}
