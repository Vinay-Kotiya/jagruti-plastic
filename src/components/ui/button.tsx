import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand-red text-white hover:bg-[#b81f29]",
        outline: "border border-charcoal/25 bg-white text-charcoal hover:border-brand-red hover:text-brand-red",
        ghost: "text-charcoal hover:bg-surface",
        gold: "bg-brand-gold text-white hover:bg-[#9c7339]",
        destructive: "bg-red-700 text-white hover:bg-red-800",
      },
      size: { default: "h-10 px-5", sm: "h-8 px-3 text-xs", lg: "h-12 px-7 text-base", icon: "h-9 w-9" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
Button.displayName = "Button";
export { buttonVariants };
