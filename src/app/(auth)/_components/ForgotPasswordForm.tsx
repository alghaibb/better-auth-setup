"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/src/lib/validations/forgot-password-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/src/components/ui/separator";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    // TODO: Implement forgot password

    // Simulate a successful forgot password
    await new Promise((resolve) => setTimeout(resolve, 3000));
    toast.success("If you have an account with us, we will send you an email to reset your password");
    router.push("/");
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
          loadingText="Sending reset email..."
        >
          Send Reset Email
        </Button>
      </form>

      <Separator className="my-4" />
    </Form>
  );
}