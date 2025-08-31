import Navbar from "./Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-svh">
      <main className="flex-1">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
