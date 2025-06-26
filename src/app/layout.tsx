import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import BackgroundEffects from "./components/BackgroundEffects";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "LinkVault - Premium Bookmark Manager",
  description: "Beautifully organize your digital world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full`}
    >
      <body className="h-full bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
        <BackgroundEffects />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-y-auto px-8 py-6">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
