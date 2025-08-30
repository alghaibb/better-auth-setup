"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-xl p-4 transition-all duration-500 [&>svg~*]:pl-8 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-500 text-gray-900 dark:from-gray-800 dark:to-gray-900 dark:text-gray-100",
        destructive:
          "bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 text-red-900 dark:from-red-900/20 dark:to-pink-900/20 dark:text-red-100",
        success:
          "bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 text-green-900 dark:from-green-900/20 dark:to-emerald-900/20 dark:text-green-100",
        warning:
          "bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 text-yellow-900 dark:from-yellow-900/20 dark:to-orange-900/20 dark:text-yellow-100",
        info: "bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 text-blue-900 dark:from-blue-900/20 dark:to-cyan-900/20 dark:text-blue-100",
        // Unique variants
        neon: "bg-black border-2 border-purple-500 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.4),inset_0_0_20px_rgba(168,85,247,0.1)]",
        glass:
          "bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-[0_8px_32px_rgba(255,255,255,0.1)]",
        aurora:
          "bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/20 text-gray-900 dark:text-white",
        holographic:
          "bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-cyan-400/20 backdrop-blur-md border border-white/30 relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.4)_50%,transparent_60%)] before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000",
        brutalist:
          "bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black font-bold",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        slide: "animate-slideIn",
      },
    },
    defaultVariants: {
      variant: "default",
      animation: "none",
    },
  }
);

const iconVariants = {
  default: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  destructive: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode | boolean;
  closable?: boolean;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "default",
      animation,
      icon = true,
      closable,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible) return null;

    const handleClose = () => {
      setIsVisible(false);
      onClose?.();
    };

    const variantIcon =
      variant &&
      ["default", "destructive", "success", "warning", "info"].includes(variant)
        ? iconVariants[variant as keyof typeof iconVariants]
        : null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, animation }), className)}
        {...props}
      >
        {icon && (React.isValidElement(icon) ? icon : variantIcon)}
        {children}
        {closable && (
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close alert"
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
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-2 font-bold tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };
