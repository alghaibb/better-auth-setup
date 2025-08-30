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
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  signInSchema,
  type SignInFormData,
} from "@/src/lib/validations/sign-in-schema";
import { toast } from "sonner";
import { PasswordInput } from "@/src/components/ui/password-input";
import { Separator } from "@/src/components/ui/separator";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: SignInFormData) {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Something went wrong");
    } else {
      toast.success("Sign in successful");
      router.push("/");
    }
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
                <Input
                  type="email"
                  placeholder="john@example.com"
                  {...field}
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Remember me</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          variant="default"
          loading={isLoading}
          loadingText="Signing in..."
        >
          Sign in
        </Button>
      </form>

      <Separator className="my-4" />
    </Form>
  );
}
