'use server';

/**
 * @fileOverview This file defines a Genkit flow for AI-assisted roadmap generation and workload distribution.
 *
 * It includes:
 * - `generateRoadmapAndWorkloadDistribution`: The main function to trigger the AI-assisted roadmap generation.
 * - `RoadmapInput`: The input type for the `generateRoadmapAndWorkloadDistribution` function.
 * - `RoadmapOutput`: The output type for the `generateRoadmapAndWorkloadDistribution` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RoadmapInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A detailed description of the project, its goals, and objectives.'),
  availableResources: z
    .string()
    .describe('A list of available team members and their skills.'),
  projectTimeline: z.string().describe('The desired project timeline.'),
  relevantContext: z.string().optional().describe('Any additional context or information relevant to the project.'),
});

export type RoadmapInput = z.infer<typeof RoadmapInputSchema>;

const RoadmapOutputSchema = z.object({
  roadmap: z.string().describe('A detailed project roadmap with key milestones and deadlines.'),
  workloadDistribution: z
    .string()
    .describe('A proposed workload distribution plan, assigning tasks to specific team members based on their skills.'),
});

export type RoadmapOutput = z.infer<typeof RoadmapOutputSchema>;

export async function generateRoadmapAndWorkloadDistribution(
  input: RoadmapInput
): Promise<RoadmapOutput> {
  return generateRoadmapAndWorkloadDistributionFlow(input);
}

const roadmapPrompt = ai.definePrompt({
  name: 'roadmapPrompt',
  input: {schema: RoadmapInputSchema},
  output: {schema: RoadmapOutputSchema},
  prompt: `You are an AI project management assistant. Your task is to generate a project roadmap and a workload distribution plan based on the project description, available resources, and desired timeline.

Project Description: {{{projectDescription}}}
Available Resources: {{{availableResources}}}
Project Timeline: {{{projectTimeline}}}

{{#if relevantContext}}
Additional Context: {{{relevantContext}}}
{{/if}}

Based on this information, generate a detailed project roadmap with key milestones and deadlines, and a workload distribution plan assigning tasks to specific team members based on their skills. Return the roadmap and workload distribution in well-formatted text.
`,
});

const generateRoadmapAndWorkloadDistributionFlow = ai.defineFlow(
  {
    name: 'generateRoadmapAndWorkloadDistributionFlow',
    inputSchema: RoadmapInputSchema,
    outputSchema: RoadmapOutputSchema,
  },
  async input => {
    const {output} = await roadmapPrompt(input);
    return output!;
  }
);
