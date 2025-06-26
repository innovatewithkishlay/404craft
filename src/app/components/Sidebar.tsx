"use client";
import { motion } from "framer-motion";
import {
  Home,
  Star,
  Plus,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Archive,
  Tag,
} from "lucide-react";
import clsx from "clsx";
import { Dispatch, SetStateAction, useRef, useEffect } from "react";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/", count: null },
  { icon: Bookmark, label: "All Links", href: "/links", count: 42 },
  { icon: Star, label: "Starred", href: "/starred", count: 8 },
  { icon: Archive, label: "Archive", href: "/archive", count: 12 },
  { icon: Tag, label: "Tags", href: "/tags", count: null },
];

const folders = [
  { name: "Design", count: 15, color: "bg-purple-500" },
  { name: "Development", count: 28, color: "bg-blue-500" },
  { name: "Inspiration", count: 9, color: "bg-emerald-500" },
  { name: "Learning", count: 6, color: "bg-orange-500" },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="fixed top-0 left-0 h-screen z-40 overflow-hidden"
      style={{ width: isCollapsed ? "80px" : "320px" }}
    >
      <motion.div
        ref={sidebarRef}
        className={clsx(
          "h-full flex flex-col bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200/70 dark:border-gray-800/70 shadow-lg",
          isCollapsed ? "items-center" : ""
        )}
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 320,
        }}
        transition={{
          type: "spring",
          mass: 0.3,
          damping: 15,
          stiffness: 200,
          restDelta: 0.001,
        }}
        style={{
          willChange: "transform, width",
          transformStyle: "preserve-3d",
        }}
      >
        {isCollapsed ? (
          <div className="flex flex-col h-full">
            <div className="flex flex-col items-center w-full pt-6 pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                <Bookmark className="w-6 h-6 text-white" />
              </div>
              <button
                onClick={() => setIsCollapsed(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-violet-100 dark:hover:bg-violet-900 transition"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-300" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center gap-4 w-full py-4">
              {navItems.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group relative flex items-center justify-center w-12 h-12 rounded-xl hover:bg-violet-100 dark:hover:bg-violet-900 transition"
                >
                  <Icon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-xs rounded px-3 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    {label}
                  </span>
                </a>
              ))}
            </nav>
            <div className="w-full flex flex-col items-center py-4">
              <button
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg hover:scale-105 transition"
                title="Add Link"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Bookmark className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    LinkVault
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Premium Edition
                  </p>
                </div>
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="ml-auto p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Collapse sidebar"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
            <div className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map(({ icon: Icon, label, href, count }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all group"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:from-violet-100 group-hover:to-purple-100 dark:group-hover:from-violet-900/50 dark:group-hover:to-purple-900/50 transition-all">
                    <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {label}
                    </span>
                    {count && (
                      <span className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                        {count}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
              <div className="pt-6">
                <div className="flex items-center justify-between px-4 mb-3">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Folders
                  </h3>
                  <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Plus className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="space-y-1">
                  {folders.map((folder) => (
                    <motion.div
                      key={folder.name}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 cursor-pointer transition-all"
                      whileHover={{ x: 4 }}
                    >
                      <div
                        className={clsx("w-3 h-3 rounded-full", folder.color)}
                      />
                      <span className="flex-1 text-sm text-gray-600 dark:text-gray-400">
                        {folder.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {folder.count}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50 flex-shrink-0">
              <motion.button
                className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-5 h-5" />
                Add Link
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
