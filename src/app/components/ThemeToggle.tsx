"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import clsx from "clsx";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setDark(
      stored === "dark" ||
        (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      className={clsx(
        "absolute top-6 right-6 bg-white/80 dark:bg-zinc-800/80 rounded-full p-2 shadow transition-colors",
        "hover:bg-indigo-100 dark:hover:bg-indigo-700"
      )}
      aria-label="Toggle theme"
      onClick={() => setDark((v) => !v)}
    >
      {dark ? (
        <Sun className="w-5 h-5 text-yellow-300" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600" />
      )}
    </button>
  );
}
