"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";
import { Label } from "@/src/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const formItemVariants = cva("space-y-2", {
  variants: {
    variant: {
      default: "",
      floating: "relative",
      inline: "flex items-center gap-4 space-y-0",
      glass:
        "p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10",
      neon: "p-4 rounded-xl bg-black/50 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]",
      gradient:
        "p-4 rounded-xl bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-pink-500/5",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface FormItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formItemVariants> {}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, variant, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn(formItemVariants({ variant }), className)}
          {...props}
        />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";

const formLabelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-gray-700 dark:text-gray-200",
        error: "text-red-600 dark:text-red-400",
        success: "text-green-600 dark:text-green-400",
        gradient:
          "bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent",
        neon: "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface FormLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof formLabelVariants> {
  required?: boolean;
}

const FormLabel = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  FormLabelProps
>(({ className, variant, required, children, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(
        formLabelVariants({ variant: error ? "error" : variant }),
        className
      )}
      htmlFor={formItemId}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-red-500" aria-label="required">
          *
        </span>
      )}
    </Label>
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ComponentRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn(
        "text-sm text-gray-500 dark:text-gray-400 animate-fadeIn",
        className
      )}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const formMessageVariants = cva("text-sm font-medium animate-fadeIn", {
  variants: {
    variant: {
      error: "text-red-600 dark:text-red-400",
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      info: "text-blue-600 dark:text-blue-400",
    },
  },
  defaultVariants: {
    variant: "error",
  },
});

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof formMessageVariants> {
  icon?: boolean;
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, variant = "error", icon = true, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    const icons = {
      error: "⚠",
      success: "✓",
      warning: "⚡",
      info: "ℹ",
    };

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn(formMessageVariants({ variant }), className)}
        {...props}
      >
        {icon && icons[variant || "error"] && (
          <span className="mr-1">{icons[variant || "error"]}</span>
        )}
        {body}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

// Additional form components for enhanced functionality

// Form Section for grouping related fields
const formSectionVariants = cva("space-y-4", {
  variants: {
    variant: {
      default: "pb-6 mb-6 border-b border-gray-200 dark:border-gray-800",
      card: "p-6 rounded-xl bg-white shadow-lg dark:bg-gray-900",
      glass:
        "p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20",
      gradient:
        "p-6 rounded-xl bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-pink-500/5",
      neon: "p-6 rounded-xl border-2 border-purple-500/30 bg-black/30 shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface FormSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formSectionVariants> {
  title?: string;
  description?: string;
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ className, variant, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(formSectionVariants({ variant }), className)}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }
);
FormSection.displayName = "FormSection";

// Form Header for form titles
const FormHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mb-8 space-y-2 text-center", className)}
      {...props}
    >
      {children}
    </div>
  );
});
FormHeader.displayName = "FormHeader";

const FormTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        "text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400",
        className
      )}
      {...props}
    />
  );
});
FormTitle.displayName = "FormTitle";

const FormSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-gray-600 dark:text-gray-400", className)}
      {...props}
    />
  );
});
FormSubtitle.displayName = "FormSubtitle";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormSection,
  FormHeader,
  FormTitle,
  FormSubtitle,
  formItemVariants,
  formLabelVariants,
  formMessageVariants,
  formSectionVariants,
};
