"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const floatingInputVariants = cva(
  "peer w-full rounded-xl px-4 py-2.5 text-sm font-medium placeholder:text-transparent transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-2 border-gray-200 bg-white hover:border-gray-300 focus:border-violet-500 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1)] dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600 dark:focus:border-violet-400",
        neon: "border-2 border-purple-500/30 bg-black/50 text-white backdrop-blur-xl hover:border-purple-400/50 focus:border-purple-400 focus:shadow-[0_0_30px_rgba(168,85,247,0.35),inset_0_0_20px_rgba(168,85,247,0.1)] dark:bg-black/80",
        glass:
          "border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 focus:border-white/40 focus:bg-white/20 focus:shadow-[0_8px_32px_rgba(255,255,255,0.1)] dark:border-white/10 dark:bg-white/5",
        aurora:
          "border-2 border-transparent bg-gradient-to-r from-pink-500/10 via-violet-500/10 to-cyan-500/10 hover:from-pink-500/20 hover:via-violet-500/20 hover:to-cyan-500/20 focus:shadow-[0_0_40px_rgba(168,85,247,0.25)] backdrop-blur-sm",
        minimal:
          "border-0 border-b-2 border-gray-300 bg-transparent rounded-none px-0 hover:border-gray-400 focus:border-blue-500 focus:shadow-none dark:border-gray-600 dark:hover:border-gray-500 dark:focus:border-blue-400",
        cyber:
          "border-2 border-cyan-500/50 bg-gray-900 text-cyan-300 clip-path-polygon hover:border-cyan-400 focus:border-cyan-300 focus:shadow-[0_0_20px_rgba(0,255,255,0.5),inset_0_0_20px_rgba(0,255,255,0.1)]",
      },
      inputSize: {
        default: "h-12",
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

const floatingLabelVariants = cva(
  "absolute left-3 transition-all duration-200 pointer-events-none select-none",
  {
    variants: {
      variant: {
        default: "text-muted-foreground peer-focus:text-primary",
        neon: "text-purple-400/70 peer-focus:text-purple-300",
        glass: "text-white/60 peer-focus:text-white/90",
        aurora: "text-gray-600 peer-focus:text-violet-500",
        minimal: "text-gray-500 peer-focus:text-blue-600",
        cyber: "text-cyan-500/60 peer-focus:text-cyan-300",
      },
      inputSize: {
        default:
          "text-sm top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 peer-focus:top-[-0.5rem] peer-focus:text-xs peer-focus:px-1 peer-focus:bg-background",
        sm: "text-xs top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-focus:top-[-0.5rem] peer-focus:text-xs peer-focus:px-1 peer-focus:bg-background",
        lg: "text-base top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:top-[-0.5rem] peer-focus:text-sm peer-focus:px-1 peer-focus:bg-background",
        xl: "text-lg top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:top-[-0.5rem] peer-focus:text-base peer-focus:px-1 peer-focus:bg-background",
      },
      floating: {
        true: "top-[-0.5rem] text-xs px-1 bg-background",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      floating: false,
    },
  }
);

export interface FloatingInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof floatingInputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    {
      className,
      containerClassName,
      type = "text",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant,
      inputSize,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(!!(value || defaultValue));
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!, []);

    React.useEffect(() => {
      setHasValue(!!value);
    }, [value]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    const isFloating = isFocused || hasValue;

    return (
      <div className={cn("relative w-full", containerClassName)}>
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              floatingInputVariants({ variant, inputSize }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            ref={inputRef}
            placeholder=" "
            value={value}
            defaultValue={defaultValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${props.id}-error`
                : helperText
                ? `${props.id}-helper`
                : undefined
            }
            {...props}
          />
          {label && (
            <label
              htmlFor={props.id}
              className={cn(
                floatingLabelVariants({
                  variant,
                  inputSize,
                  floating: isFloating,
                }),
                leftIcon && "left-10",
                error && isFloating && "text-destructive"
              )}
            >
              {label}
            </label>
          )}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${props.id}-error`} className="mt-1 text-xs text-destructive">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${props.id}-helper`}
            className="mt-1 text-xs text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

// Multi-variant floating input with additional features
export interface FloatingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof floatingInputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  resize?: "none" | "both" | "horizontal" | "vertical";
}

const FloatingTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FloatingTextareaProps
>(
  (
    {
      className,
      containerClassName,
      label,
      error,
      helperText,
      variant,
      inputSize,
      value,
      defaultValue,
      resize = "vertical",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(!!(value || defaultValue));
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useImperativeHandle(ref, () => textareaRef.current!, []);

    React.useEffect(() => {
      setHasValue(!!value);
    }, [value]);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    const isFloating = isFocused || hasValue;

    const resizeClass = {
      none: "resize-none",
      both: "resize",
      horizontal: "resize-x",
      vertical: "resize-y",
    }[resize];

    return (
      <div className={cn("relative w-full", containerClassName)}>
        <div className="relative">
          <textarea
            className={cn(
              floatingInputVariants({ variant, inputSize }),
              "min-h-[80px] pt-4",
              resizeClass,
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            ref={textareaRef}
            placeholder=" "
            value={value}
            defaultValue={defaultValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${props.id}-error`
                : helperText
                ? `${props.id}-helper`
                : undefined
            }
            {...props}
          />
          {label && (
            <label
              htmlFor={props.id}
              className={cn(
                floatingLabelVariants({
                  variant,
                  inputSize,
                  floating: isFloating,
                }),
                error && isFloating && "text-destructive"
              )}
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p id={`${props.id}-error`} className="mt-1 text-xs text-destructive">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${props.id}-helper`}
            className="mt-1 text-xs text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FloatingTextarea.displayName = "FloatingTextarea";

export { FloatingInput, FloatingTextarea, floatingInputVariants };
