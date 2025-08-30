"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gray-200 data-[state=checked]:bg-violet-600 dark:bg-gray-700 dark:data-[state=checked]:bg-violet-500",
        neon: "bg-black border-purple-500/50 data-[state=checked]:bg-purple-900 data-[state=checked]:border-purple-400 data-[state=checked]:shadow-[0_0_20px_rgba(168,85,247,0.5),inset_0_0_10px_rgba(168,85,247,0.3)]",
        glass:
          "bg-white/10 backdrop-blur-md border-white/20 data-[state=checked]:bg-white/30 data-[state=checked]:border-white/40",
        gradient:
          "bg-gradient-to-r from-gray-300 to-gray-400 data-[state=checked]:from-violet-500 data-[state=checked]:to-purple-500",
        aurora:
          "bg-gradient-to-r from-pink-500/20 via-violet-500/20 to-cyan-500/20 data-[state=checked]:from-pink-500 data-[state=checked]:via-violet-500 data-[state=checked]:to-cyan-500",
        minimal:
          "bg-gray-300 data-[state=checked]:bg-gray-900 dark:bg-gray-600 dark:data-[state=checked]:bg-white",
        ios: "bg-gray-300 data-[state=checked]:bg-green-500 dark:bg-gray-600",
        retro:
          "bg-yellow-200 border-4 border-black data-[state=checked]:bg-green-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      },
      size: {
        default: "h-6 w-11",
        sm: "h-5 w-9",
        lg: "h-7 w-14",
        xl: "h-8 w-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-all",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-100",
        neon: "bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]",
        glass: "bg-white/90 backdrop-blur-sm",
        gradient: "bg-white",
        aurora: "bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]",
        minimal: "bg-white dark:bg-gray-900",
        ios: "bg-white",
        retro: "bg-black border-2 border-black",
      },
      size: {
        default: "h-5 w-5 data-[state=checked]:translate-x-5",
        sm: "h-4 w-4 data-[state=checked]:translate-x-4",
        lg: "h-6 w-6 data-[state=checked]:translate-x-7",
        xl: "h-7 w-7 data-[state=checked]:translate-x-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
  labelPosition?: "left" | "right";
}

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(
  (
    {
      className,
      variant,
      size,
      label,
      description,
      labelPosition = "right",
      ...props
    },
    ref
  ) => {
    const id = React.useId();

    const switchComponent = (
      <SwitchPrimitives.Root
        ref={ref}
        id={label ? id : undefined}
        className={cn(switchVariants({ variant, size }), className)}
        {...props}
      >
        <SwitchPrimitives.Thumb
          className={cn(switchThumbVariants({ variant, size }))}
        />
      </SwitchPrimitives.Root>
    );

    if (label || description) {
      return (
        <div className="flex items-start gap-3">
          {labelPosition === "left" && (
            <div className="flex flex-col flex-1">
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
          )}
          {switchComponent}
          {labelPosition === "right" && (
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
          )}
        </div>
      );
    }

    return switchComponent;
  }
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, switchVariants, switchThumbVariants };
