"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import * as SwitchPrimitives from "@radix-ui/react-switch";

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" fill="currentColor" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" />
  </svg>
);

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-200">
        <div className="absolute inset-0 flex items-center justify-between px-1.5">
          <SunIcon className="h-3 w-3 text-gray-400" />
          <MoonIcon className="h-3 w-3 text-gray-400" />
        </div>
        <div className="h-4 w-4 rounded-full bg-white shadow-md transition-all duration-200 translate-x-1" />
      </div>
    );
  }

  return (
    <SwitchPrimitives.Root
      className="relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-800 data-[state=unchecked]:bg-orange-100 dark:data-[state=checked]:bg-slate-800 dark:data-[state=unchecked]:bg-orange-200"
      checked={theme === "dark"}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <SunIcon
          className={`h-3 w-3 transition-all duration-200 ${
            theme === "light" ? "text-orange-500" : "text-gray-400"
          }`}
        />
        <MoonIcon
          className={`h-3 w-3 transition-all duration-200 ${
            theme === "dark" ? "text-blue-200" : "text-gray-400"
          }`}
        />
      </div>

      <SwitchPrimitives.Thumb className="pointer-events-none block h-4 w-4 rounded-full bg-white shadow-md ring-0 transition-all duration-200 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-1" />
    </SwitchPrimitives.Root>
  );
}
