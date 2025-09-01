import Link from "next/link";

const productLinks = [
  { href: "#features", label: "Features" },
  { href: "#security", label: "Security" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

const resourceLinks = [
  {
    href: "https://better-auth.com",
    label: "Better Auth Docs",
    external: true as const,
  },
  {
    href: "https://github.com/alghaibb/better-auth-setup",
    label: "GitHub",
    external: true as const,
  },
] as const;

const footerSections = [
  { title: "Links", links: productLinks },
  { title: "Resources", links: resourceLinks },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-600 to-purple-600" />
              <span className="text-lg font-bold">Auth Starter</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Authentication starter template built with Next.js and Better
              Auth.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        className="hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Next.js Auth Starter. Open source
              template.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Built with ❤️ using Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
