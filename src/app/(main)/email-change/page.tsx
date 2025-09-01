"use client";

import { Button } from "@/components/ui/button";
import { Message } from "@/components/ui/message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function EmailChangePage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center px-4 h-svh">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Email Change Verified</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <Message variant="success">
            Email change verified successfully! Your new email address is now
            active.
          </Message>
          <div className="space-y-4">
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full"
            >
              Go to Dashboard
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="w-full"
            >
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
