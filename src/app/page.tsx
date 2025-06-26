"use client";
import { useState } from "react";
import AddLinkModal from "./components/AddLinkModal";
import SearchFilterBar from "./components/SearchFilterBar";
import LinkCard from "./components/LinkCard";
import { motion } from "framer-motion";

export interface Link {
  id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  folder: string;
  starred: boolean;
  favicon: string;
}

export default function HomePage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLinks = links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  function handleAddLink(newLink: Omit<Link, "id" | "favicon" | "starred">) {
    let favicon = "";
    try {
      const urlObj = new URL(newLink.url);
      favicon = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`;
    } catch {
      favicon = "/default-favicon.png";
    }
    setLinks([
      ...links,
      {
        ...newLink,
        id: Date.now().toString(),
        favicon,
        starred: false,
      },
    ]);
    setShowModal(false);
  }

  return (
    <section className="pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Links
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {filteredLinks.length}{" "}
            {filteredLinks.length === 1 ? "resource" : "resources"} • Last
            updated today
          </p>
        </div>
        <button
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
          onClick={() => setShowModal(true)}
        >
          <span>+ Add Link</span>
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </button>
      </div>

      <SearchFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {filteredLinks.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
            No links yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Click{" "}
            <span className="font-semibold text-indigo-500">+ Add Link</span> to
            save your first bookmark!
          </p>
        </div>
      ) : (
        <motion.div
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredLinks.map((link) => (
            <LinkCard key={link.id} {...link} />
          ))}
        </motion.div>
      )}

      {showModal && (
        <AddLinkModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddLink}
        />
      )}
    </section>
  );
}
