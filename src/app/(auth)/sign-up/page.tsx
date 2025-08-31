import { Metadata } from "next";
import SignUpForm from "../_components/SignUpForm";
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
  title: "Sign Up",
  description: "Create a new account to get started",
};

export default function SignUpPage() {
  return (
    <>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p>Start your journey with us today</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />

            <div className="text-center text-sm">
              <span>Already have an account? </span>
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
