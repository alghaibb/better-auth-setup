"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md hover:shadow-lg hover:scale-105",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
        destructive:
          "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:scale-105",
        outline:
          "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
        success:
          "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md hover:shadow-lg hover:scale-105",
        warning:
          "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md hover:shadow-lg hover:scale-105",
        // Unique variants
        neon: "bg-black text-purple-300 border border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]",
        glass:
          "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
        holographic:
          "bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-white relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.5)_50%,transparent_70%)] before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        pulse:
          "bg-gradient-to-r from-blue-500 to-cyan-500 text-white animate-pulse",
        glow: "relative bg-gradient-to-r from-indigo-500 to-blue-500 text-white before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-500 before:to-blue-500 before:blur-md before:opacity-50 hover:before:opacity-75 before:transition-opacity",
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-4 py-1.5 text-sm",
      },
      rounded: {
        default: "rounded-full",
        sm: "rounded-md",
        lg: "rounded-2xl",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      icon,
      closable,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, rounded }), className)}
        {...props}
      >
        {icon && <span className="mr-1.5 inline-flex">{icon}</span>}
        {children}
        {closable && (
          <button
            onClick={onClose}
            className="ml-1.5 inline-flex hover:opacity-75 transition-opacity"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);
Badge.displayName = "Badge";

// Badge Group component for multiple badges
export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md" | "lg";
}

const BadgeGroup = React.forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({ gap = "md", className, ...props }, ref) => {
    const gapClasses = {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-3",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex flex-wrap items-center",
          gapClasses[gap],
          className
        )}
        {...props}
      />
    );
  }
);
BadgeGroup.displayName = "BadgeGroup";

export { Badge, BadgeGroup, badgeVariants };
