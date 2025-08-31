"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Github, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function GitHubLoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);

    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });

    if (error) {
      toast.error(error.message || "Something went wrong");
    }

    setIsLoading(false);
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={handleGitHubLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Github className="mr-2 h-4 w-4" />
          Continue with GitHub
        </>
      )}
    </Button>
  );
}
