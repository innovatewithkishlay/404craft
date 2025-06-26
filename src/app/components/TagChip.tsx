import { X } from "lucide-react";

export default function TagChip({
  tag,
  onRemove,
}: {
  tag: string;
  onRemove?: () => void;
}) {
  return (
    <span className="inline-flex items-center bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2">
      #{tag}
      {onRemove && (
        <button
          className="ml-1 rounded hover:bg-indigo-200 dark:hover:bg-indigo-700 p-0.5"
          onClick={onRemove}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
