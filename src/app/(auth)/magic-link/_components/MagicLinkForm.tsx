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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import {
  magicLinkRequestSchema,
  type MagicLinkRequestFormData,
} from "@/lib/validations/magic-link-schema";

interface MagicLinkFormProps {
  callbackURL?: string;
  newUserCallbackURL?: string;
  showNameField?: boolean;
}

export function MagicLinkForm({
  callbackURL = "/dashboard",
  newUserCallbackURL = "/dashboard",
  showNameField = false,
}: MagicLinkFormProps) {
  const form = useForm<MagicLinkRequestFormData>({
    resolver: zodResolver(magicLinkRequestSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: MagicLinkRequestFormData) {
    console.log("Magic link form submitted:", data);

    const { error } = await authClient.signIn.magicLink({
      email: data.email,
      name: data.name,
      callbackURL,
      newUserCallbackURL,
    });

    if (error) {
      console.error("Magic link error:", error);
      toast.error(error.message || "Failed to send magic link");
      return;
    }

    console.log("Magic link sent successfully");
    toast.success("Magic link sent! Check your email to sign in.");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {showNameField && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          variant="default"
          loading={isLoading}
          loadingText="Sending magic link..."
        >
          <Mail className="mr-2 h-4 w-4" />
          Send magic link
        </Button>
      </form>
    </Form>
  );
}
