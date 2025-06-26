"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import TagChip from "./TagChip";
import FolderDropdown from "./FolderDropdown";
import { useState } from "react";

export default function AddLinkModal({ onClose }: { onClose: () => void }) {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative border border-zinc-200 dark:border-zinc-800 glass"
          initial={{ scale: 0.95, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
          <h2 className="text-xl font-bold mb-4">Add New Link</h2>
          <form className="flex flex-col gap-4">
            <input
              type="url"
              placeholder="Paste URL"
              className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="text"
              placeholder="Title"
              className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
            />
            <textarea
              placeholder="Description"
              className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 resize-none"
              rows={2}
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {tags.map((tag) => (
                  <TagChip
                    key={tag}
                    tag={tag}
                    onRemove={() => setTags(tags.filter((t) => t !== tag))}
                  />
                ))}
              </div>
              <input
                type="text"
                placeholder="Add tag & press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="px-3 py-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
              />
            </div>
            <FolderDropdown />
            <motion.button
              type="submit"
              className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
              whileTap={{ scale: 0.96 }}
            >
              Save
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
