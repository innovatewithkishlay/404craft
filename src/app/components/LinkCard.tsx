import { Star, Trash2 } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";
import TagChip from "./TagChip";

export default function LinkCard({
  url,
  title,
  description,
  tags,
  folder,
  starred,
  favicon,
}: any) {
  return (
    <motion.div
      className={clsx(
        "rounded-2xl bg-white/70 dark:bg-zinc-900/70 shadow-xl border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col gap-3 transition-all",
        "hover:scale-[1.025] hover:shadow-2xl hover:border-indigo-200 dark:hover:border-indigo-700"
      )}
      whileHover={{ y: -4, boxShadow: "0 12px 32px 0 rgba(99,102,241,0.10)" }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
    >
      <div className="flex items-center gap-3">
        <img
          src={favicon}
          alt=""
          className="w-7 h-7 rounded shadow border border-zinc-200 dark:border-zinc-800 bg-white"
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-indigo-700 dark:text-indigo-300 hover:underline truncate"
        >
          {title}
        </a>
        <span className="ml-auto flex gap-2">
          <button
            className={clsx(
              "p-1 rounded hover:bg-indigo-100 dark:hover:bg-indigo-800 transition",
              starred && "text-yellow-400"
            )}
          >
            <Star
              className="w-5 h-5"
              fill={starred ? "currentColor" : "none"}
            />
          </button>
          <button className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition">
            <Trash2 className="w-5 h-5 text-red-400" />
          </button>
        </span>
      </div>
      <div className="text-zinc-700 dark:text-zinc-300 text-sm line-clamp-2">
        {description}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {tags.map((tag: string) => (
          <TagChip key={tag} tag={tag} />
        ))}
        <span className="ml-auto text-xs px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300">
          {folder}
        </span>
      </div>
    </motion.div>
  );
}
