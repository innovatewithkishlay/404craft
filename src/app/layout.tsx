import "./globals.css";
import Sidebar from "./components/Sidebar";
import ThemeToggle from "./components/ThemeToggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex bg-gradient-to-br from-slate-50 to-indigo-100 dark:from-zinc-900 dark:to-indigo-900 transition-colors">
        <Sidebar />
        <main className="flex-1 px-4 py-6 md:px-12 md:py-10 transition-all">
          <div className="max-w-4xl mx-auto">
            <ThemeToggle />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
