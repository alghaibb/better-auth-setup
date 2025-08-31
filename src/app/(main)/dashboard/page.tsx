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
import EmailVerificationBanner from "./_components/EmailVerificationBanner";
import { User as UserIcon, Mail, Calendar } from "lucide-react";
import { unauthorized } from "next/navigation";
import type { User } from "@/lib/auth";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your account dashboard",
};

export default async function DashboardPage() {
  const session = await getServerSession();
  const user: User | undefined = session?.user;

  if (!user) return unauthorized();

  const isVerified = user?.emailVerified;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
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
        </div>
      </div>

      <EmailVerificationBanner user={user} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            User Information
          </CardTitle>
          <CardDescription>Your account details and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Image
              src={user.image ?? ""}
              alt={user.name}
              width={300}
              height={300}
              className="rounded-full object-cover"
            />

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Name
                </Label>
                <p className="text-base">{user.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Email
                </Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-base">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Email Status
                </Label>
                <div className="flex items-center gap-2">
                  <Badge variant={isVerified ? "default" : "destructive"}>
                    {isVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Role
                </Label>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{user.role || "User"}</Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Member Since
                </Label>
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
