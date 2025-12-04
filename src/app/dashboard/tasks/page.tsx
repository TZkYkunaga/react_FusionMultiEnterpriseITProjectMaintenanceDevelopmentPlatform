import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function TasksPage() {
  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-2xl">Tasks</h1>
        <Button className="ml-auto gap-1">
          <PlusCircle className="h-4 w-4" />
          New Task
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
          <CardDescription>A list of all tasks assigned to you or your team.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Task list and Kanban board will go here.</p>
        </CardContent>
      </Card>
    </>
  );
}
