import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "./components/Sidebar";
import ThemeToggle from "./components/ThemeToggle";
import BackgroundPattern from "./components/BackgroundPattern";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LinkVault - Premium Bookmark Manager",
  description: "Beautifully organize your digital resources",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={`${inter.className} h-full bg-gradient-to-br from-indigo-50 to-violet-100 dark:from-gray-900 dark:to-indigo-900 transition-colors`}
      >
        <BackgroundPattern />
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8 ml-16 md:ml-64 transition-all">
            <div className="max-w-7xl mx-auto">
              <ThemeToggle />
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
