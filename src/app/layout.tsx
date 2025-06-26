"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import BackgroundEffects from "./components/BackgroundEffects";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full`}
    >
      <body className="h-full bg-slate-50 dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
        <BackgroundEffects />
        <div className="flex h-screen">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
          />
          <div
            className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
              isSidebarCollapsed ? "ml-20" : "ml-80"
            }`}
          >
            <TopBar />
            <main className="flex-1 overflow-y-auto px-8 py-6 mt-0">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
