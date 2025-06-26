"use client";
import { useState } from "react";
import AddLinkModal from "./components/AddLinkModal";
import SearchFilterBar from "./components/SearchFilterBar";
import LinkCard from "./components/LinkCard";

const mockLinks = [
  {
    id: 1,
    url: "https://github.com/vercel/next.js",
    title: "Next.js – The React Framework",
    description: "Production-grade React apps with server-side rendering.",
    tags: ["react", "framework"],
    folder: "Dev Tools",
    starred: true,
    favicon: "/favicons/nextjs.png",
  },
];

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          My Links
        </h1>
        <button
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
          onClick={() => setShowModal(true)}
        >
          + Add Link
        </button>
      </div>
      <SearchFilterBar />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {mockLinks.map((link) => (
          <LinkCard key={link.id} {...link} />
        ))}
      </div>
      {showModal && <AddLinkModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
