"use client"

import { Header } from "@/components/main/Header";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="text-center space-y-6 max-w-md">
          <AlertTriangle
            className="h-20 w-20 text-destructive mx-auto"
            aria-hidden="true"
          />

          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-medium tracking-tight">
              Something went wrong
            </h1>
            <h2 className="text-xl font-medium text-muted-foreground">
              We encountered an unexpected error
            </h2>
          </div>

          <p className="text-muted-foreground">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>

          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <button
              onClick={reset}
              className="btn btn-primary"
            >
              Try Again
            </button>
            <Link href="/" className="btn btn-ghost">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
