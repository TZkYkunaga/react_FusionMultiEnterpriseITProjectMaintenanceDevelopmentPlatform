<<<<<<< HEAD
import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className = "", ...props }: CardProps) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
    {...props}
  />
);

export const CardHeader = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`border-b border-gray-200 p-4 ${className}`} {...props} />
);

export const CardTitle = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={`text-lg font-semibold ${className}`} {...props} />
);

export const CardContent = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 ${className}`} {...props} />
);


=======
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
>>>>>>> parent of ea8d1d3 (Set up docker, admin api)
