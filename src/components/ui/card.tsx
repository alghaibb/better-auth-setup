"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const cardVariants = cva(
  "rounded-2xl text-card-foreground transition-all duration-500",
  {
    variants: {
      variant: {
        default:
          "bg-white border-2 border-gray-200 shadow-xl hover:shadow-2xl dark:bg-gray-900 dark:border-gray-800",
        elevated:
          "bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] hover:shadow-[0_20px_60px_rgba(8,_112,_184,_0.15)] hover:-translate-y-1 dark:bg-gray-900",
        glass:
          "bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(31,38,135,0.2)] hover:bg-white/20 dark:bg-black/10 dark:border-white/10",
        gradient:
          "bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-sm border border-white/20 hover:from-purple-500/20 hover:via-pink-500/20 hover:to-blue-500/20",
        neon: "bg-black border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] hover:border-purple-400",
        aurora:
          "relative bg-gradient-to-br from-violet-600/20 via-blue-600/20 to-cyan-600/20 border border-white/20 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000",
        brutalist:
          "bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]",
        neumorphic:
          "bg-gray-100 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] hover:shadow-[inset_20px_20px_60px_#bebebe,inset_-20px_-20px_60px_#ffffff] dark:bg-gray-800 dark:shadow-[20px_20px_60px_#1f2937,-20px_-20px_60px_#374151]",
        holographic:
          "bg-gradient-to-br from-purple-400/30 via-pink-400/30 to-cyan-400/30 backdrop-blur-md border border-white/30 relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.7)_50%,transparent_60%)] before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      interactive: {
        true: "cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
  glowColor?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, padding, interactive, style, glowColor, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, interactive }), className)}
      style={{
        ...style,
        ...(glowColor &&
          variant === "neon" && {
            boxShadow: `0 0 30px ${glowColor}`,
          }),
      }}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-none tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600 dark:text-gray-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Unique specialized card components
export interface FeatureCardProps extends CardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  iconColor?: string;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      icon,
      title,
      description,
      action,
      iconColor = "violet",
      className,
      ...props
    },
    ref
  ) => (
    <Card
      ref={ref}
      className={cn(
        "group relative overflow-hidden hover:scale-105 transition-transform duration-300",
        className
      )}
      {...props}
    >
      <CardHeader>
        {icon && (
          <div
            className={cn(
              "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl",
              `bg-gradient-to-br`,
              iconColor === "violet" &&
                "from-violet-500/20 to-purple-500/20 text-violet-600 dark:text-violet-400",
              iconColor === "blue" &&
                "from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400",
              iconColor === "green" &&
                "from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400",
              iconColor === "red" &&
                "from-red-500/20 to-pink-500/20 text-red-600 dark:text-red-400"
            )}
          >
            {icon}
          </div>
        )}
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && (
          <CardDescription className="mt-2">{description}</CardDescription>
        )}
      </CardHeader>
      {action && <CardContent>{action}</CardContent>}
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-500 group-hover:from-violet-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 group-hover:opacity-100" />
    </Card>
  )
);
FeatureCard.displayName = "FeatureCard";

export interface StatsCardProps extends CardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  sparkline?: number[];
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  (
    { title, value, description, icon, trend, sparkline, className, ...props },
    ref
  ) => (
    <Card
      ref={ref}
      className={cn("relative group", className)}
      variant="elevated"
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-gray-400 transition-colors group-hover:text-violet-500">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
            {value}
          </div>
          {trend && (
            <div
              className={cn(
                "flex items-center text-sm font-semibold",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              <span className="mr-1">{trend.isPositive ? "↑" : "↓"}</span>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        {description && (
          <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">
            {description}
          </p>
        )}
        {sparkline && (
          <div className="mt-4 flex items-end gap-1 h-8">
            {sparkline.map((value, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-violet-500 to-purple-500 rounded-t opacity-60 hover:opacity-100 transition-opacity"
                style={{ height: `${(value / Math.max(...sparkline)) * 100}%` }}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
);
StatsCard.displayName = "StatsCard";

// New unique card type - Bento Grid Card
export interface BentoCardProps extends CardProps {
  span?: "1" | "2" | "3" | "4";
  image?: string;
  badge?: string;
}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ span = "1", image, badge, children, className, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        span === "2" && "md:col-span-2",
        span === "3" && "md:col-span-3",
        span === "4" && "md:col-span-4",
        className
      )}
      {...props}
    >
      {badge && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-violet-500 to-purple-500 text-white">
          {badge}
        </div>
      )}
      {image && (
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </Card>
  )
);
BentoCard.displayName = "BentoCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  FeatureCard,
  StatsCard,
  BentoCard,
  cardVariants,
};
