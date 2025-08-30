"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-xl text-sm font-medium transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-gray-500",
  {
    variants: {
      variant: {
        default:
          "border-2 border-gray-200 bg-white px-4 py-3 hover:border-gray-300 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600 dark:focus:border-violet-400 dark:focus:ring-violet-400/10",
        ghost:
          "border-0 bg-gray-100 px-4 py-3 hover:bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-900 dark:focus:ring-violet-400",
        neon: "border-2 border-purple-500/50 bg-black px-4 py-3 text-purple-300 placeholder:text-purple-500/50 focus:border-purple-400 focus:outline-none focus:shadow-[0_0_20px_rgba(168,85,247,0.5)] dark:bg-gray-950",
        glass:
          "border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md placeholder:text-white/50 hover:bg-white/20 focus:border-white/40 focus:bg-white/20 focus:outline-none dark:text-white",
        minimal:
          "border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 rounded-none hover:border-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:hover:border-gray-500 dark:focus:border-blue-400",
        aurora:
          "border-2 border-transparent bg-gradient-to-r from-pink-500/10 via-violet-500/10 to-cyan-500/10 px-4 py-3 backdrop-blur-sm hover:from-pink-500/20 hover:via-violet-500/20 hover:to-cyan-500/20 focus:outline-none focus:ring-4 focus:ring-violet-500/20",
        retro:
          "border-4 border-black bg-yellow-100 px-4 py-3 font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] dark:bg-yellow-900 dark:text-yellow-100",
      },
      inputSize: {
        default: "h-12 text-sm",
        sm: "h-10 text-xs",
        lg: "h-14 text-base",
        xl: "h-16 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      type,
      leftIcon,
      rightIcon,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant, inputSize }),
            leftIcon && "pl-12",
            rightIcon && "pr-12",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/10",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// Search Input Component
export interface SearchInputProps extends InputProps {
  onClear?: () => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, value, ...props }, ref) => {
    const hasValue = value && value !== "";

    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          type="search"
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          }
          rightIcon={
            hasValue && onClear ? (
              <button
                onClick={onClear}
                className="pointer-events-auto hover:text-gray-600 dark:hover:text-gray-300"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
            ) : null
          }
          value={value}
          className={className}
          {...props}
        />
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { Input, SearchInput, inputVariants };
