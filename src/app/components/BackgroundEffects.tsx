// src/components/BackgroundPattern.tsx
"use client";
import { motion } from "framer-motion";

export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-300/20 to-purple-400/20 rounded-full blur-3xl dark:from-indigo-700/30 dark:to-purple-900/30"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-cyan-400/20 rounded-full blur-3xl dark:from-blue-700/30 dark:to-cyan-900/30"
        animate={{
          x: [0, -15, 0],
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}
