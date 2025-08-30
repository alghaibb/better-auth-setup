"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const checkboxVariants = cva(
  "peer shrink-0 rounded-md border-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border-gray-300 bg-white data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600 hover:border-violet-400 dark:border-gray-600 dark:bg-gray-900 dark:data-[state=checked]:bg-violet-500",
        neon: "border-purple-500/50 bg-black data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-400 data-[state=checked]:shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]",
        glass:
          "border-white/20 bg-white/10 backdrop-blur-md data-[state=checked]:bg-white/30 data-[state=checked]:border-white/40 hover:bg-white/20",
        gradient:
          "border-transparent bg-gradient-to-r from-violet-500/20 to-purple-500/20 data-[state=checked]:from-violet-600 data-[state=checked]:to-purple-600 hover:from-violet-500/30 hover:to-purple-500/30",
        minimal:
          "border-gray-400 bg-transparent data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900 dark:border-gray-500 dark:data-[state=checked]:bg-white dark:data-[state=checked]:border-white",
        aurora:
          "border-transparent bg-gradient-to-br from-pink-500/20 via-violet-500/20 to-cyan-500/20 data-[state=checked]:from-pink-500 data-[state=checked]:via-violet-500 data-[state=checked]:to-cyan-500",
      },
      size: {
        default: "h-5 w-5",
        sm: "h-4 w-4",
        lg: "h-6 w-6",
        xl: "h-7 w-7",
      },
      rounded: {
        default: "rounded-md",
        sm: "rounded-sm",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
}

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    { className, variant, size, rounded, label, description, ...props },
    ref
  ) => {
    const id = React.useId();

    if (label || description) {
      return (
        <div className="flex items-start space-x-3">
          <CheckboxPrimitive.Root
            ref={ref}
            id={id}
            className={cn(
              checkboxVariants({ variant, size, rounded }),
              "mt-0.5",
              className
            )}
            {...props}
          >
            <CheckboxPrimitive.Indicator
              className={cn("flex items-center justify-center text-current")}
            >
              <Check
                className={cn(
                  size === "sm" && "h-3 w-3",
                  size === "default" && "h-4 w-4",
                  size === "lg" && "h-5 w-5",
                  size === "xl" && "h-6 w-6"
                )}
              />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
      );
    }

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(checkboxVariants({ variant, size, rounded }), className)}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <Check
            className={cn(
              size === "sm" && "h-3 w-3",
              size === "default" && "h-4 w-4",
              size === "lg" && "h-5 w-5",
              size === "xl" && "h-6 w-6"
            )}
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
