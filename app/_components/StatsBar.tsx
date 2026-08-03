'use client';

import type { Category } from '../_data/categories';

interface StatsBarProps {
  filtered: number;
  total: number;
  activeCategory: Category | null;
  activeTag: string | null;
  onClearCategory: () => void;
  onClearTag: () => void;
}

export default function StatsBar({
  filtered, total, activeCategory, activeTag, onClearCategory, onClearTag,
}: StatsBarProps) {
  const hasFilters = activeCategory || activeTag;
  if (!hasFilters && filtered === total) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-5 text-xs font-semibold">
      {hasFilters && (
        <span className="text-slate-400 mr-1">
          Showing {filtered} of {total} resources
        </span>
      )}
      {activeCategory && (
        <button
          onClick={onClearCategory}
          className="flex items-center gap-1.5 bg-[#9fa1ff]/15 text-[#4338ca] border border-[#9fa1ff]/30 rounded-full px-3 py-1 font-semibold hover:bg-[#9fa1ff]/25 transition-colors"
        >
          <span>{activeCategory.label}</span>
          <span className="text-[#6366f1]">✕</span>
        </button>
      )}
      {activeTag && (
        <button
          onClick={onClearTag}
          className="flex items-center gap-1.5 bg-slate-900 text-white rounded-full px-3 py-1 font-semibold hover:bg-slate-800 transition-colors"
        >
          <span>#{activeTag}</span>
          <span className="text-slate-400">✕</span>
        </button>
      )}
    </div>
  );
}
