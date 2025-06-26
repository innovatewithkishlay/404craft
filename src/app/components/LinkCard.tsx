"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MoreHorizontal, ExternalLink, Copy, Trash2 } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

interface LinkCardProps {
  id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  folder: string;
  starred: boolean;
  favicon: string;
  addedAt: Date;
  delay?: number;
}

export default function LinkCard({
  url,
  title,
  description,
  tags,
  folder,
  starred,
  favicon,
  addedAt,
  delay = 0,
}: LinkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Hover glow effect */}
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center shadow-sm">
                <Image
                  src={favicon}
                  alt={`${title} favicon`}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg truncate">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {new URL(url).hostname}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <motion.button
                className={clsx(
                  "p-2 rounded-xl transition-all",
                  starred
                    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-amber-500"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Star
                  className="w-4 h-4"
                  fill={starred ? "currentColor" : "none"}
                />
              </motion.button>

              <div className="relative">
                <motion.button
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </motion.button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <motion.div
                    className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-2 z-20"
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  >
                    <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all">
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </button>
                    <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all">
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </button>
                    <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-violet-100/80 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {folder}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              {addedAt.toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Visit button overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg font-medium text-gray-900 dark:text-white hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-4 h-4" />
            Visit Site
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}
