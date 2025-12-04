
"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const projects = [
  { name: 'Phoenix', status: 'In Progress', lead: 'Alice', startDate: '2023-01-15' },
  { name: 'Odyssey', status: 'Completed', lead: 'Bob', startDate: '2022-09-20' },
  { name: 'Nova', status: 'On Hold', lead: 'Charlie', startDate: '2023-03-10' },
  { name: 'Zenith', status: 'In Progress', lead: 'David', startDate: '2023-05-01' },
  { name: 'Apex', status: 'Planning', lead: 'Eve', startDate: '2023-08-01' },
];

const formSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters."),
  description: z.string().optional(),
});

export default function ProjectsPage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically handle form submission, e.g., call an API
    setDialogOpen(false);
    form.reset();
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-2xl">Projects</h1>
        <Button className="ml-auto gap-1" onClick={() => setDialogOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          New Project
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>
            A list of all projects in your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Project Lead</TableHead>
                <TableHead>Start Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.name}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge variant={
                      project.status === 'Completed' ? 'secondary' :
                      project.status === 'In Progress' ? 'default' : 'outline'
                    }>{project.status}</Badge>
                  </TableCell>
                  <TableCell>{project.lead}</TableCell>
                  <TableCell>{project.startDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new project.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Project Phoenix" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A brief description of the project." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create Project</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
