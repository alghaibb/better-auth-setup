import Link from "next/link";
import { getServerSession } from "@/lib/get-session";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/UserDropdown";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#security", label: "Security" },
] as const;

export default async function Navbar() {
  const session = await getServerSession();
  const user = session?.user;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600" />
          <span className="text-xl font-bold">Auth Starter</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center">
              <UserDropdown user={user} />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">Try Demo</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
