import { Metadata } from "next";
import { getServerSession } from "@/lib/get-session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserDropdown } from "@/components/UserDropdown";
import EmailVerificationBanner from "./_components/EmailVerificationBanner";
import { User, Mail, Calendar } from "lucide-react";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your account dashboard",
};

export default async function DashboardPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return unauthorized();

  const isVerified = user?.emailVerified;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Badge variant={isVerified ? "default" : "secondary"}>
              {isVerified ? "Verified" : "Unverified"}
            </Badge>
            {user.role && <Badge variant="outline">{user.role}</Badge>}
          </div>
          <UserDropdown user={user} />
        </div>
      </div>

      <EmailVerificationBanner user={user} />

      {/* User Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Information
          </CardTitle>
          <CardDescription>Your account details and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Name
                </label>
                <p className="text-base">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-base">{user.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  User ID
                </label>
                <p className="text-base font-mono text-sm">{user.id}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email Status
                </label>
                <div className="flex items-center gap-2">
                  <Badge variant={isVerified ? "default" : "destructive"}>
                    {isVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Role
                </label>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{user.role || "User"}</Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Member Since
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-base">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
