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
        <span className="text-zinc-400">
          {filtered} of {total} tools
        </span>
      )}
      {activeCategory && (
        <button
          onClick={onClearCategory}
          className="flex items-center gap-1.5 bg-orange-50 text-orange-600 border border-orange-200 rounded-full px-3 py-1.5 font-semibold hover:bg-orange-100 transition-colors"
        >
          <span>{activeCategory.emoji} {activeCategory.label}</span>
          <span className="text-orange-400">✕</span>
        </button>
      )}
      {activeTag && (
        <button
          onClick={onClearTag}
          className="flex items-center gap-1.5 bg-zinc-900 text-white rounded-full px-3 py-1.5 font-semibold hover:bg-zinc-700 transition-colors"
        >
          <span>#{activeTag}</span>
          <span className="text-zinc-400">✕</span>
        </button>
      )}
    </div>
  );
}
