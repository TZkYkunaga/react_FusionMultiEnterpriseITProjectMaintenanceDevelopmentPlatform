
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

const users = [
  { name: 'Alice', email: 'alice@acme.com', role: 'Admin', status: 'Active' },
  { name: 'Bob', email: 'bob@stark.com', role: 'Project Manager', status: 'Active' },
  { name: 'Charlie', email: 'charlie@wayne.com', role: 'Developer', status: 'Invited' },
  { name: 'David', email: 'david@cyberdyne.com', role: 'Developer', status: 'Active' },
  { name: 'Eve', email: 'eve@acme.com', role: 'Viewer', status: 'Inactive' },
];

const formSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});

export default function UsersPage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setDialogOpen(false);
    form.reset();
  }

  return (
    <div className="flex flex-col flex-1 gap-4 md:gap-8">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-2xl">Users & Roles</h1>
        <Button className="ml-auto gap-1" onClick={() => setDialogOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          Invite User
        </Button>
      </div>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage users and their roles in your tenant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'outline'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite New User</DialogTitle>
            <DialogDescription>
              Enter the email of the user you want to invite.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="name@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Send Invitation</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
