interface TagBadgeProps {
  tag: string;
  active?: boolean;
  onClick?: (tag: string) => void;
}

export default function TagBadge({ tag, active = false, onClick }: TagBadgeProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(tag)}
      aria-pressed={active}
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer select-none border ${
        active
          ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/25'
          : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200'
      }`}
    >
      #{tag}
    </button>
  );
}
