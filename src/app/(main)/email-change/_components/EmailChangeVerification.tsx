"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Message } from "@/components/ui/message";
import { Button } from "@/components/ui/button";

export default function EmailChangeVerification() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmailChange = async () => {
      if (!token) {
        setStatus("error");
        setErrorMessage("Invalid verification link. No token provided.");
        return;
      }

      try {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get("success");
        const error = urlParams.get("error");

        if (success === "true") {
          setStatus("success");
        } else if (error) {
          setStatus("error");
          setErrorMessage(decodeURIComponent(error));
        } else {
          setStatus("success");
        }
      } catch (error) {
        console.error("Email change verification error:", error);
        setStatus("error");
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    };

    verifyEmailChange();
  }, [token]);

  if (status === "loading") {
    return <Message variant="info">Verifying your email change...</Message>;
  }

  if (status === "success") {
    return (
      <div className="space-y-4 text-center">
        <Message variant="success">
          Email change verified successfully! Your new email address is now
          active.
        </Message>
        <Button onClick={() => router.push("/dashboard")} className="w-full">
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center">
      <Message variant="error">{errorMessage}</Message>
      <div className="space-y-2">
        <Button onClick={() => router.push("/profile")} className="w-full">
          Back to Profile
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard")}
          className="w-full"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
