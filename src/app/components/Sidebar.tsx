import { Home, Star, Folder, Settings } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Star, label: "Starred", href: "/starred" },
  { icon: Folder, label: "Folders", href: "/folders" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-16 md:w-56 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800 shadow-lg flex flex-col items-center py-6 gap-8 fixed md:static z-20">
      <div className="mb-8 flex items-center justify-center w-full">
        <span className="font-bold text-xl text-indigo-600 dark:text-indigo-300">
          🔗
        </span>
      </div>
      <nav className="flex flex-col gap-6 w-full items-center md:items-start">
        {navItems.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            className={clsx(
              "flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800 transition group",
              "w-12 md:w-full justify-center md:justify-start"
            )}
            aria-label={label}
          >
            <Icon className="w-6 h-6 text-zinc-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-300" />
            <span className="hidden md:inline text-zinc-700 dark:text-zinc-200 font-medium">
              {label}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
