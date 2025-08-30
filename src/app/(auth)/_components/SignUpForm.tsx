"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  signUpSchema,
  type SignUpFormData,
} from "@/src/lib/validations/sign-up-schema";
import { toast } from "sonner";
import { PasswordInput } from "@/src/components/ui/password-input";
import { Label } from "@/src/components/ui/label";

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpFormData) {
    try {
      // TODO: Implement sign up logic with Better Auth
      startTransition(async () => {
        // Simulate sign up with a delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Sign up form data:", data);

        toast.success("Sign up successful");
      });
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("Sign up failed");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>
                Must be at least 8 characters with uppercase, lowercase, number,
                and special character.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  placeholder="Confirm Password"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          variant="default"
          disabled={isPending}
        >
          {isPending ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </Form>
  );
}
