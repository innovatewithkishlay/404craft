"use client";
import { useState } from "react";
import AddLinkModal from "./components/AddLinkModal";
import SearchFilterBar from "./components/SearchFilterBar";
import LinkCard from "./components/LinkCard";
import { motion } from "framer-motion";

interface Link {
  id: number;
  url: string;
  title: string;
  description: string;
  tags: string[];
  folder: string;
  starred: boolean;
  favicon: string;
}

const mockLinks: Link[] = [
  {
    id: 1,
    url: "https://github.com/vercel/next.js",
    title: "Next.js – The React Framework",
    description:
      "Production-grade React applications with server-side rendering and static site generation.",
    tags: ["react", "framework", "ssr"],
    folder: "Dev Tools",
    starred: true,
    favicon: "/nextjs.png",
  },
  {
    id: 2,
    url: "https://tailwindcss.com",
    title: "Tailwind CSS - Rapid UI Development",
    description:
      "A utility-first CSS framework packed with classes to build any design.",
    tags: ["css", "ui", "design"],
    folder: "Frontend",
    starred: false,
    favicon: "/tailwind.png",
  },
  {
    id: 3,
    url: "https://ui.shadcn.com",
    title: "shadcn/ui - Beautiful Components",
    description: "Re-usable components built using Radix UI and Tailwind CSS.",
    tags: ["components", "ui", "react"],
    folder: "UI Libraries",
    starred: true,
    favicon: "/shadcn.png",
  },
  {
    id: 4,
    url: "https://vercel.com",
    title: "Vercel - Frontend Cloud Platform",
    description:
      "Develop, preview, and ship your projects with the best frontend developer experience.",
    tags: ["hosting", "deployment", "serverless"],
    folder: "DevOps",
    starred: false,
    favicon: "/vercel.png",
  },
  {
    id: 5,
    url: "https://react.dev",
    title: "React - JavaScript Library",
    description: "A JavaScript library for building user interfaces.",
    tags: ["javascript", "ui", "library"],
    folder: "Frontend",
    starred: true,
    favicon: "/react.png",
  },
  {
    id: 6,
    url: "https://framer.com/motion",
    title: "Framer Motion - Animation Library",
    description: "A production-ready motion library for React from Framer.",
    tags: ["animation", "ui", "react"],
    folder: "UI Libraries",
    starred: false,
    favicon: "/framer.png",
  },
];

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLinks = mockLinks.filter(
    (link) =>
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <section className="pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Links
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {filteredLinks.length} resources • Last updated today
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
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
            No links found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Try different search terms or add a new link
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

      {showModal && <AddLinkModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
