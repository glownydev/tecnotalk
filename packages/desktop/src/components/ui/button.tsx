import * as React from "react"

import { cn } from "@/lib/utils"

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "destructive" | "outline" | "ghost" | "link"
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "default" ? "bg-primary text-primary-foreground hover:bg-primary/90" : undefined,
        variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : undefined,
        variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" : undefined,
        variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" : undefined,
        variant === "link" ? "text-primary underline-offset-4 hover:underline" : undefined,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }