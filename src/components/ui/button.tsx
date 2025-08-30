"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 focus-visible:ring-violet-500",
        destructive:
          "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 focus-visible:ring-red-500",
        outline:
          "border-2 border-gray-300 bg-transparent hover:bg-gray-100 hover:border-gray-400 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-500",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
        ghost:
          "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100",
        link: "text-violet-600 underline-offset-4 hover:underline dark:text-violet-400",
        // Unique variants
        neon: "relative bg-black text-white border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:border-purple-400 hover:text-purple-300 active:scale-95",
        glass:
          "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_48px_rgba(255,255,255,0.2)]",
        aurora:
          "relative bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-600 before:via-purple-600 before:to-cyan-600 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:rounded-[inherit] overflow-hidden [&>*]:relative",
        cyber:
          "bg-gradient-to-br from-cyan-400 to-blue-600 text-white clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] hover:from-cyan-300 hover:to-blue-500 shadow-[0_0_20px_rgba(0,188,212,0.5)]",
        holographic:
          "bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 text-white relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.5)_50%,transparent_70%)] before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        brutalist:
          "bg-yellow-400 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]",
        glow: "relative bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-600 before:to-purple-600 before:blur-xl before:opacity-60 hover:before:opacity-100 before:transition-opacity overflow-visible",
      },
      size: {
        default: "h-11 px-6 py-2 text-sm rounded-xl",
        sm: "h-9 px-4 text-xs rounded-lg",
        lg: "h-13 px-8 text-base rounded-xl",
        xl: "h-16 px-10 text-lg rounded-2xl",
        icon: "h-11 w-11 rounded-xl",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "hover:animate-bounce",
        spin: "hover:animate-spin",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      animation,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
