import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-inverted hover:bg-tertiary",
        secondary:
          "border-transparent bg-tertiary/20 text-primary hover:bg-tertiary/30",
        destructive:
          "border-transparent bg-red-500 text-inverted hover:bg-red-500/80",
        outline: "text-primary border-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
