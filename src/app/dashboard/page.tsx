import { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Message } from "@/components/ui/message";
import { UserDropdown } from "@/components/UserDropdown";
import EmailVerificationBanner from "./_components/EmailVerificationBanner";
import {
  BarChart3,
  Users,
  Settings,
  CreditCard,
  FileText,
  Shield,
  Mail,
  Calendar,
  TrendingUp,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your account dashboard",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;
  const isVerified = user.emailVerified;

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Account created",
                    time: "2 minutes ago",
                    icon: Users,
                  },
                  {
                    action: "Email verification pending",
                    time: "2 minutes ago",
                    icon: Mail,
                  },
                  {
                    action: "Profile updated",
                    time: "1 hour ago",
                    icon: Settings,
                  },
                  {
                    action: "Security settings reviewed",
                    time: "2 hours ago",
                    icon: Shield,
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <activity.icon className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  disabled={!isVerified}
                >
                  <FileText className="h-5 w-5" />
                  <span>Create Report</span>
                  {!isVerified && <Lock className="h-3 w-3" />}
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  disabled={!isVerified}
                >
                  <Users className="h-5 w-5" />
                  <span>Manage Users</span>
                  {!isVerified && <Lock className="h-3 w-3" />}
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  disabled={!isVerified}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics</span>
                  {!isVerified && <Lock className="h-3 w-3" />}
                </Button>
              </div>

              {!isVerified && (
                <Message variant="info" className="mt-4">
                  <p>
                    Some features are disabled until you verify your email
                    address.
                  </p>
                </Message>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Verified</span>
                <Badge variant={isVerified ? "default" : "destructive"}>
                  {isVerified ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Account Type</span>
                <Badge variant="outline">Free</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Member Since</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {!isVerified && (
            <Card>
              <CardHeader>
                <CardTitle className="text-amber-600">
                  Restricted Features
                </CardTitle>
                <CardDescription>
                  Verify your email to unlock these features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Advanced Analytics", icon: BarChart3 },
                    { name: "Team Management", icon: Users },
                    { name: "Export Data", icon: FileText },
                    { name: "Payment Processing", icon: CreditCard },
                    { name: "API Access", icon: Shield },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Lock className="h-3 w-3" />
                      <feature.icon className="h-3 w-3" />
                      <span>{feature.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: "Team Meeting", date: "Today, 2:00 PM" },
                  { title: "Project Review", date: "Tomorrow, 10:00 AM" },
                  { title: "Client Call", date: "Friday, 3:30 PM" },
                ].map((event, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
