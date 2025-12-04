
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

const partners = [
  { name: 'Innovate Inc.', type: 'Technology Partner', status: 'Active', since: '2022-03-15' },
  { name: 'Synergy Solutions', type: 'Marketing Partner', status: 'Active', since: '2021-11-20' },
  { name: 'Quantum Leap', type: 'Research Partner', status: 'Onboarding', since: '2023-04-01' },
  { name: 'Alpha Logistics', type: 'Distribution Partner', status: 'Inactive', since: '2020-08-10' },
];

const formSchema = z.object({
  partnerName: z.string().min(3, "Partner name must be at least 3 characters."),
  description: z.string().optional(),
});

export default function CollaborationPage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partnerName: "",
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
    <div className="flex flex-col flex-1 gap-4 md:gap-8">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-2xl">Partnerships</h1>
        <Button className="ml-auto gap-1" onClick={() => setDialogOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          New Partner
        </Button>
      </div>
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Strategic Partnerships</CardTitle>
          <CardDescription>
            Manage your collaborations with external partners.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Partner Since</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.name}>
                  <TableCell className="font-medium">{partner.name}</TableCell>
                  <TableCell>{partner.type}</TableCell>
                   <TableCell>
                    <Badge variant={
                      partner.status === 'Active' ? 'default' :
                      partner.status === 'Onboarding' ? 'secondary' : 'outline'
                    }>{partner.status}</Badge>
                  </TableCell>
                  <TableCell>{partner.since}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Partner</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new partner.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="partnerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Innovate Inc." {...field} />
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
                      <Textarea placeholder="A brief description of the partnership." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add Partner</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
