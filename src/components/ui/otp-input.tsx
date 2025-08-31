import * as React from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
  (
    { className, value, onChange, length = 6, disabled = false, ...props },
    ref
  ) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = (index: number, inputValue: string) => {
      const newValue = value.split("");
      newValue[index] = inputValue;
      const updatedValue = newValue.join("").slice(0, length);
      onChange(updatedValue);

      // Auto-focus next input
      if (inputValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }

      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }

      if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text");
      const pastedValue = pastedData.replace(/\D/g, "").slice(0, length);
      onChange(pastedValue);

      // Focus the next empty input or the last input
      const nextIndex = Math.min(pastedValue.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/\D/g, "");
              handleInputChange(index, inputValue);
            }}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-md border border-input bg-background text-center text-lg font-medium text-foreground transition-colors",
              "focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              value[index] && "border-ring",
              className
            )}
          />
        ))}
      </div>
    );
  }
);

OtpInput.displayName = "OtpInput";

export { OtpInput };
