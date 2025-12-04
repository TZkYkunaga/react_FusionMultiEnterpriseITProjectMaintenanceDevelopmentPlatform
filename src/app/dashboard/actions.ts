"use server";

import { generateRoadmapAndWorkloadDistribution, RoadmapInput, RoadmapOutput } from "@/ai/flows/ai-assisted-roadmap";
import { z } from "zod";

const formSchema = z.object({
  projectDescription: z.string(),
  availableResources: z.string(),
  projectTimeline: z.string(),
  relevantContext: z.string().optional(),
});

export async function generateRoadmapAction(input: z.infer<typeof formSchema>): Promise<RoadmapOutput> {
  const parsedInput = formSchema.parse(input);
  try {
    const result = await generateRoadmapAndWorkloadDistribution(parsedInput as RoadmapInput);
    return result;
  } catch (error) {
    console.error("AI action failed:", error);
    throw new Error("Failed to generate roadmap from AI.");
  }
}
