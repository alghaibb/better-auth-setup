import ForgotPasswordForm from "../_components/ForgotPasswordForm";
import { Metadata } from "next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot your password? We'll send you an email to reset it",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p>Enter your email to reset your password</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />

            <div className="text-center text-sm">
              <span>Remember your password? </span>
              <Button asChild variant="link" className="px-0">
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
