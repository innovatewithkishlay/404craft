"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Star,
  Plus,
  ChevronLeft,
  Bookmark,
  Archive,
  Tag,
} from "lucide-react";
import clsx from "clsx";

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

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isCollapsed && (
          <motion.button
            className="fixed top-6 left-6 z-50 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center"
            onClick={() => setIsCollapsed(false)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col gap-1">
              <div className="w-4 h-0.5 bg-gray-600 dark:bg-gray-300 rounded"></div>
              <div className="w-4 h-0.5 bg-gray-600 dark:bg-gray-300 rounded"></div>
              <div className="w-4 h-0.5 bg-gray-600 dark:bg-gray-300 rounded"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.aside
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 flex flex-col h-screen overflow-hidden"
        initial={false}
        animate={{
          width: isCollapsed ? 0 : 320,
        }}
        transition={{
          type: "tween",
          duration: 0.3,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        <div className="min-w-80 flex flex-col h-full">
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50 flex-shrink-0">
            <div className="flex items-center justify-between">
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
              </div>
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
      </motion.aside>
    </>
  );
}
