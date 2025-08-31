"use client";

import { Button } from "@/components/ui/button";
import { Message } from "@/components/ui/message";
import { Lock, LogIn, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "401 - Unauthorized",
  description: "Please sign in to continue.",
};

export default function UnauthorizedPage() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warning/10">
            <Lock className="h-10 w-10 text-warning" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-warning">401</h1>
          <p className="text-xl font-semibold text-foreground">Unauthorized</p>
        </div>

        <Message variant="warning" title="Authentication Required">
          <div className="space-y-3">
            <p>You need to sign in to access this page.</p>
            <p className="text-sm text-muted-foreground">
              Please authenticate to continue to your requested destination.
            </p>
          </div>
        </Message>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="flex-1">
            <Link
              href={`/sign-in?redirect=${pathname}`}
              className="flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
}
