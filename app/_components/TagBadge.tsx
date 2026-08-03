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
          ? 'bg-[#6366f1] text-white border-[#6366f1] shadow-md shadow-[#9fa1ff]/30'
          : 'bg-slate-100/80 text-slate-600 border-slate-200/80 hover:bg-[#9fa1ff]/15 hover:text-[#4338ca] hover:border-[#9fa1ff]/40'
      }`}
    >
      #{tag}
    </button>
  );
}
