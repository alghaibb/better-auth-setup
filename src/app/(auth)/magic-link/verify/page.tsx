import { Metadata } from "next";
import { Suspense } from "react";
import { Message } from "@/components/ui/message";
import { Loader2 } from "lucide-react";
import MagicLinkVerification from "../_components/MagicLinkVerification";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Verify Magic Link",
  description: "Verifying your magic link sign-in",
};

export default async function MagicLinkVerifyPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  if (user?.emailVerified) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Magic Link Verification</h1>
        <p>Verifying your sign-in request</p>
      </div>

      <Suspense
        fallback={
          <Message variant="info" title="Verifying...">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p>Please wait while we verify your magic link...</p>
            </div>
          </Message>
        }
      >
        <MagicLinkVerification />
      </Suspense>
    </div>
  );
}
