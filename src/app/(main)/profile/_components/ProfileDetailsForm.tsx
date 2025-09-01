"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
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
import { nameSchema } from "@/lib/validations/shared-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import type { User } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Loader2, XIcon } from "lucide-react";
import { UserAvatar } from "@/components/UserAvatar";

const profileDetailsSchema = z.object({
  name: nameSchema,
  image: z.string().optional().nullable(),
});

type ProfileDetailsFormData = z.infer<typeof profileDetailsSchema>;

interface ProfileDetailsFormProps {
  user: User;
}

export default function ProfileDetailsForm({ user }: ProfileDetailsFormProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const [isRemovingImage, setIsRemovingImage] = useState(false);

  const form = useForm<ProfileDetailsFormData>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      name: currentUser.name || "",
      image: currentUser.image || "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function onSubmit(data: ProfileDetailsFormData) {
    const { error } = await authClient.updateUser({
      name: data.name,
      image: data.image ?? undefined,
    });

    if (error) {
      toast.error(error.message || "Failed to update profile");
    } else {
      setCurrentUser((prev) => ({
        ...prev,
        name: data.name,
        image: data.image ?? null,
      }));
      toast.success("Profile updated successfully!");
      router.refresh();
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        form.setValue("image", base64, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleRemoveImage() {
    setIsRemovingImage(true);

    const { error } = await authClient.updateUser({
      name: currentUser.name,
      image: null,
    });

    if (error) {
      toast.error(error.message || "Failed to remove image");
    } else {
      setCurrentUser((prev) => ({ ...prev, image: null }));
      form.setValue("image", null);
      toast.success("Image removed successfully!");
      router.refresh();
    }

    setIsRemovingImage(false);
  }

  const imagePreview = form.watch("image");

  const isLoading = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
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
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Profile image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isMounted && imagePreview && (
              <div className="relative size-16">
                <UserAvatar
                  name={currentUser.name}
                  image={imagePreview}
                  className="size-16"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute -top-2 -right-2 size-6 rounded-full"
                  onClick={handleRemoveImage}
                  disabled={isRemovingImage || isLoading}
                  aria-label="Remove image"
                >
                  {isRemovingImage ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <XIcon className="size-4" />
                  )}
                </Button>
              </div>
            )}

            <Button
              type="submit"
              loading={isLoading}
              loadingText="Updating..."
              className="w-full"
            >
              Update Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
