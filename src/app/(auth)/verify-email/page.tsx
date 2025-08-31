import { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VerifyEmailForm from "../_components/VerifyEmailForm";
import { getServerSession } from "@/lib/get-session";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address to complete registration",
};

export default async function VerifyEmailPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  if (user?.emailVerified) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            We sent a verification code to <strong>{user.email}</strong>. Enter
            the code below to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyEmailForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
