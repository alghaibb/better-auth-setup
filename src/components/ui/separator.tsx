"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const separatorVariants = cva("shrink-0", {
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
    variant: {
      default: "bg-gray-200 dark:bg-gray-800",
      gradient:
        "bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700",
      fadeGradient:
        "bg-gradient-to-r from-violet-500/0 via-violet-500 to-violet-500/0",
      dashed:
        "border-t-2 border-dashed border-gray-300 dark:border-gray-700 bg-transparent",
      dotted:
        "border-t-2 border-dotted border-gray-300 dark:border-gray-700 bg-transparent",
      double:
        "border-y-2 border-gray-300 dark:border-gray-700 bg-transparent h-[5px]",
      thick: "h-[3px] bg-gray-300 dark:bg-gray-700",
      // Unique variants
      neon: "bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_10px_rgba(168,85,247,0.5)]",
      aurora: "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500",
      pulse:
        "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse",
      glass:
        "bg-white/20 backdrop-blur-sm shadow-[0_2px_4px_rgba(255,255,255,0.1)]",
      zigzag:
        "bg-transparent relative before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%224%22%20viewBox%3D%220%200%2040%204%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%202L5%200L10%202L15%200L20%202L25%200L30%202L35%200L40%202%22%20stroke%3D%22%23999%22%20stroke-width%3D%221%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E')] before:bg-repeat-x h-[4px]",
      wave: "bg-transparent relative before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%228%22%20viewBox%3D%220%200%2040%208%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%204Q10%200%2020%204T40%204%22%20stroke%3D%22%23999%22%20stroke-width%3D%221%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E')] before:bg-repeat-x h-[8px]",
      glow: "relative bg-gradient-to-r from-indigo-500 to-purple-500 before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500 before:blur-md before:opacity-50",
      animated:
        "bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-600 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000",
      rainbow:
        "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 h-[2px]",
    },
    spacing: {
      none: "",
      sm: "my-2",
      md: "my-4",
      lg: "my-6",
      xl: "my-8",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
    spacing: "md",
  },
});

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  decorative?: boolean;
  asChild?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation, variant, spacing, decorative = true, ...props },
    ref
  ) => (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation || undefined}
      className={cn(
        separatorVariants({ orientation, variant, spacing }),
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

// Separator with text component
export interface SeparatorWithTextProps extends SeparatorProps {
  text?: string;
  textClassName?: string;
  icon?: React.ReactNode;
}

const SeparatorWithText = React.forwardRef<
  HTMLDivElement,
  SeparatorWithTextProps
>(
  (
    {
      className,
      text,
      textClassName,
      icon,
      variant = "default",
      spacing = "md",
      ...props
    },
    ref
  ) => {
    const spacingClasses = {
      none: "",
      sm: "my-2",
      md: "my-4",
      lg: "my-6",
      xl: "my-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center",
          spacingClasses[spacing as keyof typeof spacingClasses],
          className
        )}
        {...props}
      >
        <Separator className="flex-1" variant={variant} spacing="none" />
        {(text || icon) && (
          <div
            className={cn(
              "mx-4 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400",
              variant === "neon" &&
                "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]",
              variant === "aurora" &&
                "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent",
              variant === "glow" &&
                "text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]",
              textClassName
            )}
          >
            {icon}
            {text}
          </div>
        )}
        <Separator className="flex-1" variant={variant} spacing="none" />
      </div>
    );
  }
);
SeparatorWithText.displayName = "SeparatorWithText";

// Animated separator that reveals on hover/focus
export interface AnimatedSeparatorProps extends SeparatorProps {
  duration?: number;
  delay?: number;
}

const AnimatedSeparator = React.forwardRef<
  HTMLDivElement,
  AnimatedSeparatorProps
>(
  (
    { className, duration = 500, delay = 0, variant = "gradient", ...props },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const separatorRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => setIsVisible(true), delay);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (separatorRef.current) {
        observer.observe(separatorRef.current);
      }

      return () => observer.disconnect();
    }, [delay]);

    return (
      <div ref={separatorRef} className="relative overflow-hidden">
        <Separator
          ref={ref}
          variant={variant}
          className={cn(
            "transition-all origin-left",
            isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
            className
          )}
          style={{ transitionDuration: `${duration}ms` }}
          {...props}
        />
      </div>
    );
  }
);
AnimatedSeparator.displayName = "AnimatedSeparator";

export { Separator, SeparatorWithText, AnimatedSeparator, separatorVariants };
