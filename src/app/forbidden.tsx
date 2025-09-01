"use client";

import { Button } from "@/components/ui/button";
import { Message } from "@/components/ui/message";
import { Shield, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "403 - Forbidden",
  description: "You don&apos;t have access to this page.",
};

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <Shield className="h-10 w-10 text-destructive" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-destructive">403</h1>
          <p className="text-xl font-semibold text-foreground">
            Access Forbidden
          </p>
        </div>

        <Message variant="error" title="Permission Denied">
          <div className="space-y-3">
            <p>You don&apos;t have permission to access this resource.</p>
            <p className="text-sm text-muted-foreground">
              If you believe this is an error, please contact your
              administrator.
            </p>
          </div>
        </Message>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="flex-1">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go to Dashboard
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
