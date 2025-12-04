
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { summarizeFeedback } from '@/ai/flows/summarize-feedback';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Wand2, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  feedbackText: z.string().min(10, 'Feedback must be at least 10 characters.'),
});

export default function FeedbackPage() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedbackText: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setSummary('');
    try {
      const result = await summarizeFeedback(values);
      setSummary(result.summary);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to summarize feedback. Please try again.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Submit & Summarize Feedback</CardTitle>
              <CardDescription>
                Enter customer feedback below and let AI summarize it for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="feedbackText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste or type customer feedback here..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardHeader>
                 <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Summarize with AI
              </Button>
            </CardHeader>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Summary</CardTitle>
          <CardDescription>
            A concise summary of the key points from the feedback.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
             </div>
          ) : summary ? (
            <p className="text-sm">{summary}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              The summary will appear here once feedback is submitted.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
