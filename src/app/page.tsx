"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import LinkCard from "./components/LinkCard";
import AddLinkModal from "./components/AddLinkModal";
import { Plus, TrendingUp, Clock, Star } from "lucide-react";
import StatsCard from "./components/StatsCard";

export interface Link {
  id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  folder: string;
  starred: boolean;
  favicon: string;
  addedAt: Date;
}

export default function HomePage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [showModal, setShowModal] = useState(false);

  const stats = [
    {
      label: "Total Links",
      value: links.length,
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "This Week",
      value: 12,
      icon: Clock,
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Starred",
      value: links.filter((l) => l.starred).length,
      icon: Star,
      color: "from-amber-500 to-orange-500",
    },
  ];

  function handleAddLink(
    newLink: Omit<Link, "id" | "favicon" | "starred" | "addedAt">
  ) {
    let favicon = "";
    try {
      const urlObj = new URL(newLink.url);
      favicon = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`;
    } catch {
      favicon = "/default-favicon.png";
    }
    setLinks([
      {
        ...newLink,
        id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        favicon,
        starred: false,
        addedAt: new Date(),
      },
      ...links,
    ]);
    setShowModal(false);
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Welcome back! 👋
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Manage your digital resources beautifully
            </p>
          </div>
          <motion.button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Add Link
          </motion.button>
        </div>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {stats.map((stat, index) => (
          <StatsCard key={stat.label} {...stat} delay={index * 0.1} />
        ))}
      </motion.div>
      {links.length === 0 ? (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            Ready to organize your digital world?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Start by adding your first link and watch your collection grow
            beautifully
          </p>
          <motion.button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Add Your First Link
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {links.map((link, index) => (
            <LinkCard key={link.id} {...link} delay={index * 0.1} />
          ))}
        </motion.div>
      )}
      {showModal && (
        <AddLinkModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddLink}
        />
      )}
    </div>
  );
}
