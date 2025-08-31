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
import { Shield, Users, Settings, Database } from "lucide-react";
import { unauthorized, forbidden } from "next/navigation";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Administrative dashboard",
};

export default async function AdminPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return unauthorized();
  if (user.role !== "admin") return forbidden();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Administrative dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Admin Access
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Administrator Information
          </CardTitle>
          <CardDescription>Current admin user details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <p className="text-base">{user.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Role
                </Label>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">{user.role}</Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  User ID
                </Label>
                <p className="font-mono text-sm">{user.id}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>Manage system users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View, edit, and manage user accounts across the system.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Settings
            </CardTitle>
            <CardDescription>Configure system settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Modify application settings and configurations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database
            </CardTitle>
            <CardDescription>Database administration</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Monitor and manage database operations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
