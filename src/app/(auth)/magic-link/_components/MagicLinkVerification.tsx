"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Message } from "@/components/ui/message";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function MagicLinkVerification() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verifyMagicLink = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setErrorMessage("No verification token found in the URL.");
        return;
      }

      const { error } = await authClient.magicLink.verify({
        query: { token },
      });

      if (error) {
        setStatus("error");
        setErrorMessage(error.message || "Failed to verify magic link");
        toast.error("Magic link verification failed");
      } else {
        setStatus("success");
        toast.success("Successfully signed in!");

        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    };

    verifyMagicLink();
  }, [searchParams, router]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm text-muted-foreground">
          Verifying your magic link...
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <Message variant="success" title="Sign-in successful!">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p>You have been successfully signed in.</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Redirecting you to the dashboard...
          </p>
        </div>
      </Message>
    );
  }

  return (
    <Message variant="error" title="Verification failed">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <XCircle className="h-5 w-5 text-red-600" />
          <p>{errorMessage}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/sign-in">Try signing in again</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </Message>
  );
}
