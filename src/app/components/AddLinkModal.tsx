"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import type { Link } from "../page";

interface Props {
  onClose: () => void;
  onAdd: (link: Omit<Link, "id" | "favicon" | "starred" | "addedAt">) => void;
}

export default function AddLinkModal({ onClose, onAdd }: Props) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [folder, setFolder] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url || !title) return;
    onAdd({
      url,
      title,
      description,
      tags,
      folder,
    });
  }

  function addTag() {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md relative border border-gray-200 dark:border-gray-800"
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Add New Link
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="url"
              placeholder="https://example.com"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Title"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 resize-none"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2"
                  >
                    #{tag}
                    <button
                      type="button"
                      className="ml-1 rounded hover:bg-indigo-200 dark:hover:bg-indigo-700 p-0.5"
                      onClick={() => setTags(tags.filter((t) => t !== tag))}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
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
                className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              />
            </div>
            <input
              type="text"
              placeholder="Folder (optional)"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold shadow hover:shadow-xl transition"
            >
              Save Link
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
