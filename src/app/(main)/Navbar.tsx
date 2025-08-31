import { UserDropdown } from "@/components/UserDropdown";
import { getServerSession } from "@/lib/get-session";
import { User } from "@/lib/auth";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession();
  const user: User | undefined = session?.user;

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold">Better Auth Setup</h1>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
