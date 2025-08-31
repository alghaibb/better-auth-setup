import { Metadata } from "next";
import SignInForm from "../_components/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return (
    <>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p>Welcome back! Please sign in to your account</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />

            <div className="text-center text-sm">
              <span>Don't have an account? </span>
              <Button asChild variant="link" className="px-0">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
