"use client";

import { Button } from "@/components/ui/button";
import { Message } from "@/components/ui/message";
import { User } from "@/lib/auth";
import Link from "next/link";

interface EmailVerificationBannerProps {
  user: User;
}

export default function EmailVerificationBanner({
  user,
}: EmailVerificationBannerProps) {
  if (user.emailVerified) {
    return null;
  }

  return (
    <Message variant="warning" title="Email Verification Required">
      <div className="space-y-4">
        <p>
          Your email address <strong>{user.email}</strong> is not verified yet.
          Please verify your email to access all features.
        </p>
        <Button asChild variant="default" size="sm">
          <Link href="/verify-email">Verify Email</Link>
        </Button>
      </div>
    </Message>
  );
}
