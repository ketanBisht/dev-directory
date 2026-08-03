'use client';

import { useState, useMemo } from 'react';
import type { Tool } from '../_data/tools';
import ToolCard from './ToolCard';

interface ToolGridProps {
  tools: Tool[];
  starredIds: Set<string>;
  onToggleStar: (id: string) => void;
  activeTag: string | null;
  onSelectTag: (tag: string) => void;
  onResetFilters: () => void;
}

type SortKey = 'featured' | 'name' | 'newest';

export default function ToolGrid({
  tools, starredIds, onToggleStar, activeTag, onSelectTag, onResetFilters,
}: ToolGridProps) {
  const [sortBy, setSortBy] = useState<SortKey>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const sorted = useMemo(() => {
    const copy = [...tools];
    if (sortBy === 'name') copy.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'newest') copy.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    else copy.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    return copy;
  }, [tools, sortBy]);

  return (
    <div>
      {/* Control bar */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <p className="text-sm font-semibold text-slate-500">
          <span className="text-slate-900 text-lg font-black">{sorted.length}</span> resources found
        </p>

        <div className="flex items-center gap-2">
          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 border border-slate-200/80">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer"
            >
              <option value="featured">Popular</option>
              <option value="name">A → Z</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* View toggle */}
          <div className="flex bg-slate-100 rounded-xl overflow-hidden border border-slate-200/80">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid view"
              className={`px-3 py-2 transition-colors ${viewMode === 'grid' ? 'bg-[#6366f1] text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <rect x="1" y="1" width="6" height="6" rx="1.5"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5"/>
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="List view"
              className={`px-3 py-2 transition-colors ${viewMode === 'list' ? 'bg-[#6366f1] text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <rect x="1" y="2" width="14" height="2.5" rx="1.25"/>
                <rect x="1" y="6.75" width="14" height="2.5" rx="1.25"/>
                <rect x="1" y="11.5" width="14" height="2.5" rx="1.25"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {sorted.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200/80 p-8 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-base font-bold text-slate-900 mb-1">No matching resources found</p>
          <p className="text-xs text-slate-500 font-medium mb-6 max-w-xs mx-auto">
            Try a different search query or clear your active category filters.
          </p>
          <button
            onClick={onResetFilters}
            className="bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md shadow-[#9fa1ff]/25 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {sorted.map((tool) => (
            <ToolCard
              key={tool.id} tool={tool}
              isStarred={starredIds.has(tool.id)} onToggleStar={onToggleStar}
              activeTag={activeTag} onSelectTag={onSelectTag} viewMode="grid"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((tool) => (
            <ToolCard
              key={tool.id} tool={tool}
              isStarred={starredIds.has(tool.id)} onToggleStar={onToggleStar}
              activeTag={activeTag} onSelectTag={onSelectTag} viewMode="list"
            />
          ))}
        </div>
      )}
    </div>
  );
}
