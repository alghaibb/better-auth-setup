"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-gray-700 dark:text-gray-200",
        primary: "text-violet-600 dark:text-violet-400",
        secondary: "text-gray-500 dark:text-gray-400",
        destructive: "text-red-600 dark:text-red-400",
        success: "text-green-600 dark:text-green-400",
        warning: "text-yellow-600 dark:text-yellow-400",
        gradient:
          "bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent",
        neon: "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]",
      },
      size: {
        default: "text-sm",
        xs: "text-xs",
        lg: "text-base",
        xl: "text-lg",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "medium",
    },
  }
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
  optional?: boolean;
  helper?: string;
}

const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(
  (
    {
      className,
      variant,
      size,
      weight,
      required,
      optional,
      helper,
      children,
      ...props
    },
    ref
  ) => (
    <div className="flex flex-col gap-1">
      <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants({ variant, size, weight }), className)}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-red-500" aria-label="required">
            *
          </span>
        )}
        {optional && (
          <span className="ml-1 text-xs text-gray-400 font-normal">
            (optional)
          </span>
        )}
      </LabelPrimitive.Root>
      {helper && (
        <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
          {helper}
        </span>
      )}
    </div>
  )
);
Label.displayName = LabelPrimitive.Root.displayName;

// Floating Label Component
export interface FloatingLabelProps extends LabelProps {
  isFloating?: boolean;
}

const FloatingLabel = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  FloatingLabelProps
>(({ className, isFloating = false, ...props }, ref) => (
  <Label
    ref={ref}
    className={cn(
      "absolute left-3 transition-all duration-200 pointer-events-none",
      isFloating
        ? "top-[-0.5rem] text-xs px-1 bg-white dark:bg-gray-900"
        : "top-3 text-base",
      className
    )}
    {...props}
  />
));
FloatingLabel.displayName = "FloatingLabel";

export { Label, FloatingLabel, labelVariants };
