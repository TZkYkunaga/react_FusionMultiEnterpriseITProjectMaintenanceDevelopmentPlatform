"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateRoadmapAction } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  projectDescription: z.string().min(20, "Please provide a more detailed project description."),
  availableResources: z.string().min(10, "Please list available resources and their skills."),
  projectTimeline: z.string().min(5, "Please specify the project timeline."),
  relevantContext: z.string().optional(),
});

type RoadmapResult = {
  roadmap: string;
  workloadDistribution: string;
};

export function AiRoadmapGenerator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoadmapResult | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectDescription: "",
      availableResources: "",
      projectTimeline: "",
      relevantContext: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await generateRoadmapAction(values);
      setResult(response);
      setDialogOpen(true);
      form.reset();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate roadmap. Please try again.",
      });
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="text-accent" />
                AI-Assisted Roadmap
              </CardTitle>
              <CardDescription>
                Generate a project roadmap and workload distribution using AI.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the project goals, features, and target audience..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableResources"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Resources</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2 Frontend Devs (React), 1 Backend (Node.js)..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectTimeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Timeline</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 3 months, Q4 2024..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Roadmap
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Generated Project Plan</DialogTitle>
            <DialogDescription>
              Here is the AI-generated roadmap and workload distribution. Review and adjust as needed.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            {result && (
              <div className="space-y-6 text-sm">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Project Roadmap</h3>
                  <div className="p-4 bg-muted/50 rounded-lg whitespace-pre-wrap font-code">{result.roadmap}</div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Workload Distribution</h3>
                  <div className="p-4 bg-muted/50 rounded-lg whitespace-pre-wrap font-code">{result.workloadDistribution}</div>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
