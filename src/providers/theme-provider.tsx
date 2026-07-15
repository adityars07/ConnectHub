"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

// Suppress React 19 / Next.js dev warnings caused by next-themes script tag or browser auto-fill/translation extensions
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const orig = console.error;
  console.error = (...args: any[]) => {
    const errorMsg = args
      .map((arg) => (typeof arg === 'string' ? arg : arg instanceof Error ? arg.message : ""))
      .join(" ");

    if (
      errorMsg.includes("Encountered a script tag") ||
      errorMsg.includes("fdprocessedid") ||
      (errorMsg.includes("hydration") && (errorMsg.includes("attribute") || errorMsg.includes("match")))
    ) {
      return;
    }
    orig.apply(console, args);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
