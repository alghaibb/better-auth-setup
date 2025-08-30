"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const radioItemVariants = cva(
  "aspect-square rounded-full border-2 ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border-gray-300 hover:border-violet-400 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600 dark:border-gray-600 dark:data-[state=checked]:border-violet-500 dark:data-[state=checked]:bg-violet-500",
        neon: "border-purple-500/50 bg-black hover:shadow-[0_0_10px_rgba(168,85,247,0.3)] data-[state=checked]:border-purple-400 data-[state=checked]:bg-purple-600 data-[state=checked]:shadow-[0_0_20px_rgba(168,85,247,0.6)]",
        glass:
          "border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 data-[state=checked]:bg-white/30 data-[state=checked]:border-white/40",
        gradient:
          "border-transparent bg-gradient-to-r from-gray-200 to-gray-300 hover:from-violet-500/20 hover:to-purple-500/20 data-[state=checked]:from-violet-600 data-[state=checked]:to-purple-600",
        aurora:
          "border-transparent bg-gradient-to-br from-pink-500/20 via-violet-500/20 to-cyan-500/20 data-[state=checked]:from-pink-500 data-[state=checked]:via-violet-500 data-[state=checked]:to-cyan-500",
        minimal:
          "border-gray-400 bg-transparent hover:border-gray-600 data-[state=checked]:border-gray-900 data-[state=checked]:bg-gray-900 dark:border-gray-500 dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-white",
        cyber:
          "border-cyan-500/50 bg-gray-900 hover:border-cyan-400 data-[state=checked]:border-cyan-300 data-[state=checked]:bg-cyan-500 data-[state=checked]:shadow-[0_0_15px_rgba(0,255,255,0.5)]",
      },
      size: {
        default: "h-5 w-5",
        sm: "h-4 w-4",
        lg: "h-6 w-6",
        xl: "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const radioIndicatorVariants = cva("flex items-center justify-center", {
  variants: {
    variant: {
      default: "text-white",
      neon: "text-purple-200 drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]",
      glass: "text-white",
      gradient: "text-white",
      aurora: "text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]",
      minimal: "text-white dark:text-gray-900",
      cyber: "text-black",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioItemVariants> {
  label?: string;
  description?: string;
  className?: string;
}

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant, size, label, description, ...props }, ref) => {
  const id = React.useId();

  if (label || description) {
    return (
      <div className="flex items-start space-x-3">
        <RadioGroupPrimitive.Item
          ref={ref}
          id={id}
          className={cn(
            radioItemVariants({ variant, size }),
            "mt-0.5",
            className
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator
            className={cn(radioIndicatorVariants({ variant }))}
          >
            <Circle
              className={cn(
                size === "sm" && "h-2 w-2",
                size === "default" && "h-2.5 w-2.5",
                size === "lg" && "h-3 w-3",
                size === "xl" && "h-3.5 w-3.5",
                "fill-current"
              )}
            />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
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
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioItemVariants({ variant, size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className={cn(radioIndicatorVariants({ variant }))}
      >
        <Circle
          className={cn(
            size === "sm" && "h-2 w-2",
            size === "default" && "h-2.5 w-2.5",
            size === "lg" && "h-3 w-3",
            size === "xl" && "h-3.5 w-3.5",
            "fill-current"
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// Card-style Radio Group Item
export interface RadioCardProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: "default" | "glass" | "gradient" | "neon";
  className?: string;
}

const RadioCard = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioCardProps
>(
  (
    { className, title, description, icon, variant = "default", ...props },
    ref
  ) => {
    const variants = {
      default:
        "border-2 border-gray-200 hover:border-violet-400 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-50 dark:border-gray-700 dark:hover:border-violet-500 dark:data-[state=checked]:border-violet-500 dark:data-[state=checked]:bg-violet-500/10",
      glass:
        "border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 data-[state=checked]:bg-white/20 data-[state=checked]:border-white/40",
      gradient:
        "border-2 border-transparent bg-gradient-to-r from-gray-50 to-gray-100 hover:from-violet-50 hover:to-purple-50 data-[state=checked]:from-violet-100 data-[state=checked]:to-purple-100 dark:from-gray-800 dark:to-gray-700 dark:hover:from-violet-900/20 dark:hover:to-purple-900/20 dark:data-[state=checked]:from-violet-900/30 dark:data-[state=checked]:to-purple-900/30",
      neon: "border-2 border-purple-500/30 bg-black/30 hover:border-purple-400/50 data-[state=checked]:border-purple-400 data-[state=checked]:bg-purple-900/30 data-[state=checked]:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    };

    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "relative flex cursor-pointer rounded-xl p-4 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          variants[variant],
          className
        )}
        {...props}
      >
        <div className="flex flex-1 items-start gap-3">
          {icon && (
            <div className="text-gray-600 dark:text-gray-400">{icon}</div>
          )}
          <div className="flex-1">
            <div className="text-sm font-medium">{title}</div>
            {description && (
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {description}
              </div>
            )}
          </div>
          <RadioGroupPrimitive.Indicator className="absolute right-4 top-4">
            <Circle className="h-5 w-5 fill-violet-600 text-violet-600 dark:fill-violet-500 dark:text-violet-500" />
          </RadioGroupPrimitive.Indicator>
        </div>
      </RadioGroupPrimitive.Item>
    );
  }
);
RadioCard.displayName = "RadioCard";

export {
  RadioGroup,
  RadioGroupItem,
  RadioCard,
  radioItemVariants,
  radioIndicatorVariants,
};
