"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/ui/otp-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { User } from "@/lib/auth";

const verifyEmailSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

interface VerifyEmailFormProps {
  user: User;
}

export default function VerifyEmailForm({ user }: VerifyEmailFormProps) {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);

  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: VerifyEmailFormData) {
    const { error } = await authClient.emailOtp.verifyEmail({
      email: user.email,
      otp: data.otp,
    });

    if (error) {
      toast.error(error.message || "Invalid verification code");
      return;
    } else {
      toast.success("Email verified successfully!");
      router.push("/dashboard");
    }
  }

  async function resendOtp() {
    setIsResending(true);

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: user.email,
      type: "email-verification",
    });

    if (error) {
      toast.error(error.message || "Failed to resend code");
    } else {
      toast.success("Verification code sent!");
    }

    setIsResending(false);
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <OtpInput
                    {...field}
                    value={field.value}
                    length={6}
                    onChange={field.onChange}
                    disabled={isLoading}
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
            loading={isLoading}
            loadingText="Verifying..."
          >
            Verify Email
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Didn&apos;t receive the code?
        </p>
        <Button
          type="button"
          variant="link"
          onClick={resendOtp}
          disabled={isResending}
          className="p-0 h-auto font-normal"
        >
          {isResending ? "Sending..." : "Resend verification code"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Code sent to: {user.email}
      </p>
    </div>
  );
}
