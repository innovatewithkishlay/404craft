export default function FolderDropdown() {
  return (
    <select className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
      <option value="">All Folders</option>
      <option value="Dev Tools">Dev Tools</option>
      <option value="Reading">Reading</option>
      <option value="Videos">Videos</option>
    </select>
  );
}
