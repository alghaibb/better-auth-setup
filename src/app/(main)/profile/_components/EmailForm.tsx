"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { emailSchema } from "@/lib/validations/shared-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const emailUpdateSchema = z.object({
  email: emailSchema,
});

type EmailUpdateFormData = z.infer<typeof emailUpdateSchema>;

interface EmailFormProps {
  currentEmail: string;
}

export default function EmailForm({ currentEmail }: EmailFormProps) {
  const router = useRouter();

  const form = useForm<EmailUpdateFormData>({
    resolver: zodResolver(emailUpdateSchema),
    defaultValues: {
      email: currentEmail,
    },
  });

  async function onSubmit(data: EmailUpdateFormData) {
    if (data.email === currentEmail) {
      toast.info("No changes detected.");
      return;
    }

    const { error } = await authClient.changeEmail({
      newEmail: data.email,
      callbackURL: "/email-change",
    });

    if (error) {
      toast.error(error.message || "Failed to update email");
    } else {
      toast.success("Verification email sent to your current email");
      router.refresh();
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Address</CardTitle>
        <CardDescription>
          Update your email address. You'll need to verify the new email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-sm text-muted-foreground">
              Current email: <span className="font-medium">{currentEmail}</span>
            </div>

            <Button
              type="submit"
              loading={isLoading}
              loadingText="Updating..."
              className="w-full"
            >
              Update Email
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
