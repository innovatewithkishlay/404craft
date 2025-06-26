import TagChip from "./TagChip";
import FolderDropdown from "./FolderDropdown";

export default function SearchFilterBar() {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-center mb-6">
      <input
        type="text"
        placeholder="Search links..."
        className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full md:w-1/2"
      />
      <div className="flex gap-2 flex-wrap">
        <TagChip tag="react" />
        <TagChip tag="nextjs" />
      </div>
      <FolderDropdown />
    </div>
  );
}
