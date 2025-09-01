import { getServerSession } from "@/lib/get-session";
import type { Metadata } from "next";
import { unauthorized } from "next/navigation";
import ProfileDetailsForm from "./_components/ProfileDetailsForm";
import EmailForm from "./_components/EmailForm";
import PasswordForm from "./_components/PasswordForm";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your profile",
};

export default async function ProfilePage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return unauthorized();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile information and settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ProfileDetailsForm user={user} />
            <EmailForm currentEmail={user.email} />
          </div>
          <div>
            <PasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
