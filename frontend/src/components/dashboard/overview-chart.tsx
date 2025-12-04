"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { project: "Phoenix", tasks: 18 },
  { project: "Odyssey", tasks: 25 },
  { project: "Nova", tasks: 12 },
  { project: "Zenith", tasks: 30 },
  { project: "Apex", tasks: 19 },
  { project: "Orion", tasks: 22 },
]

const chartConfig = {
  tasks: {
    label: "Tasks",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function OverviewChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="project"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="tasks" fill="var(--color-tasks)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
