"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface MagicLinkButtonProps {
  email?: string;
  name?: string;
  callbackURL?: string;
  newUserCallbackURL?: string;
}

export function MagicLinkButton({
  email,
  name,
  callbackURL = "/dashboard",
  newUserCallbackURL = "/dashboard",
}: MagicLinkButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleMagicLink = async () => {
    if (!email) {
      toast.error("Email address is required");
      return;
    }

    console.log("Magic link button clicked:", { email, name });
    setIsLoading(true);

    const { error } = await authClient.signIn.magicLink({
      email,
      name,
      callbackURL,
      newUserCallbackURL,
    });

    if (error) {
      console.error("Magic link error:", error);
      toast.error(error.message || "Failed to send magic link");
    } else {
      console.log("Magic link sent successfully");
      toast.success("Magic link sent! Check your email to sign in.");
    }

    setIsLoading(false);
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={handleMagicLink}
      disabled={isLoading || !email}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending magic link...
        </>
      ) : (
        <>
          <Mail className="mr-2 h-4 w-4" />
          Send magic link
        </>
      )}
    </Button>
  );
}
