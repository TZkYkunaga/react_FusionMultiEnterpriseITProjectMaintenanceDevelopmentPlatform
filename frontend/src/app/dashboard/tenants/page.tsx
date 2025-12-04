
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Tenant = {
  name: string;
  plan: 'Enterprise' | 'Business' | 'Trial';
  status: 'Active' | 'Inactive' | 'Trial';
  users: number;
};

const initialTenants: Tenant[] = [
  { name: 'Acme Corporation', plan: 'Enterprise', status: 'Active', users: 125 },
  { name: 'Stark Industries', plan: 'Enterprise', status: 'Active', users: 250 },
  { name: 'Wayne Enterprises', plan: 'Business', status: 'Trial', users: 50 },
  { name: 'Cyberdyne Systems', plan: 'Business', status: 'Inactive', users: 75 },
];

const formSchema = z.object({
  tenantName: z.string().min(3, "Tenant name must be at least 3 characters."),
  plan: z.enum(['Enterprise', 'Business', 'Trial']),
});

export default function TenantsPage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tenantName: "",
      plan: "Business",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newTenant: Tenant = {
        name: values.tenantName,
        plan: values.plan as 'Enterprise' | 'Business' | 'Trial',
        status: 'Active',
        users: 1
    };
    setTenants(prev => [...prev, newTenant]);
    setDialogOpen(false);
    form.reset();
  }

  return (
    <div className="flex flex-col flex-1 gap-4 md:gap-8">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-2xl">Tenants</h1>
        <Button className="ml-auto gap-1" onClick={() => setDialogOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          New Tenant
        </Button>
      </div>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
          <CardDescription>
            Manage all customer tenants in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant Name</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Users</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant.name}>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.plan}</TableCell>
                   <TableCell>
                    <Badge variant={
                      tenant.status === 'Active' ? 'default' :
                      tenant.status === 'Trial' ? 'secondary' : 'outline'
                    }>{tenant.status}</Badge>
                  </TableCell>
                  <TableCell>{tenant.users}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Tenant</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new tenant.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="tenantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tenant Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., NewCo Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a plan" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="Enterprise">Enterprise</SelectItem>
                            <SelectItem value="Trial">Trial</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <Button type="submit">Create Tenant</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
