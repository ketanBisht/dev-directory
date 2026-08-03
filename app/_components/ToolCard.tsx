'use client';

import type { Tool } from '../_data/tools';
import { getCategoryById } from '../_data/categories';
import TagBadge from './TagBadge';
import ToolLogo from './ToolLogo';

interface ToolCardProps {
  tool: Tool;
  isStarred: boolean;
  onToggleStar: (id: string) => void;
  activeTag: string | null;
  onSelectTag: (tag: string) => void;
  viewMode?: 'grid' | 'list';
}

export default function ToolCard({
  tool,
  isStarred,
  onToggleStar,
  activeTag,
  onSelectTag,
  viewMode = 'grid',
}: ToolCardProps) {
  const cat = getCategoryById(tool.category);

  /* ── LIST ROW ── */
  if (viewMode === 'list') {
    return (
      <div className="group flex items-center gap-4 bg-white rounded-2xl border border-zinc-200/80 p-4 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-0.5 transition-all">
        {/* Real Logo Container */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-100 p-2 shadow-sm group-hover:scale-105 transition-transform">
          <ToolLogo
            url={tool.url}
            name={tool.name}
            fallbackText={tool.avatar}
            fallbackColor={cat.color}
            size={32}
            className="rounded-lg"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-bold text-zinc-900 group-hover:text-orange-600 transition-colors truncate">
              {tool.name}
            </span>
            {tool.isNew && (
              <span className="rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-[9px] font-bold px-2 py-0.5 flex-shrink-0">
                NEW
              </span>
            )}
            {tool.isFeatured && (
              <span className="rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-bold px-2 py-0.5 flex-shrink-0">
                POPULAR
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 font-medium truncate mb-1">{tool.description}</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-zinc-500 font-semibold flex items-center gap-1">
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </span>
            <span className="text-zinc-300">·</span>
            <span className="font-mono text-zinc-400 truncate">
              {tool.url.replace(/^https?:\/\//, '').split('/')[0]}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="hidden xl:flex items-center gap-1 flex-shrink-0">
          {tool.tags.slice(0, 2).map((t) => (
            <TagBadge key={t} tag={t} active={activeTag === t} onClick={onSelectTag} />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onToggleStar(tool.id)}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all text-sm ${
              isStarred
                ? 'bg-orange-50 border-orange-300 text-orange-500 shadow-sm'
                : 'bg-zinc-50 border-zinc-200 text-zinc-400 hover:border-orange-300 hover:text-orange-500'
            }`}
          >
            {isStarred ? '★' : '☆'}
          </button>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-full shadow-md shadow-orange-500/20 transition-all hover:scale-105"
          >
            Visit ↗
          </a>
        </div>
      </div>
    );
  }

  /* ── GRID CARD ── */
  return (
    <div className="group flex flex-col bg-white rounded-3xl border border-zinc-200/80 p-5 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all relative overflow-hidden">
      {/* Accent top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: cat.color }}
      />

      {/* Header: Logo + Category Pill */}
      <div className="flex items-start justify-between gap-3 mb-4 pt-1">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-100 p-2.5 shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all">
          <ToolLogo
            url={tool.url}
            name={tool.name}
            fallbackText={tool.avatar}
            fallbackColor={cat.color}
            size={36}
            className="rounded-lg"
          />
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span className="rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-700 text-[10px] font-bold px-2.5 py-1 flex items-center gap-1 shadow-2xs">
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </span>

          <div className="flex items-center gap-1">
            {tool.isFeatured && (
              <span className="rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-bold px-2 py-0.5">
                ★ POPULAR
              </span>
            )}
            {tool.isNew && (
              <span className="rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-[9px] font-bold px-2 py-0.5">
                ✦ NEW
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <h3 className="text-base font-bold text-zinc-900 mb-1 leading-tight group-hover:text-orange-600 transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs font-medium text-zinc-500 leading-relaxed mb-4 line-clamp-2 flex-1">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} active={activeTag === tag} onClick={onSelectTag} />
          ))}
        </div>

        {/* Domain */}
        <p className="text-[11px] font-mono text-zinc-400 mb-4 truncate flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="truncate">{tool.url.replace(/^https?:\/\//, '').split('/')[0]}</span>
        </p>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-zinc-100 flex items-center gap-2">
        <button
          onClick={() => onToggleStar(tool.id)}
          aria-label={isStarred ? `Unsave ${tool.name}` : `Save ${tool.name}`}
          className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl border text-sm transition-all ${
            isStarred
              ? 'bg-orange-50 border-orange-300 text-orange-500 shadow-sm'
              : 'bg-zinc-50 border-zinc-200 text-zinc-400 hover:border-orange-300 hover:text-orange-500'
          }`}
        >
          {isStarred ? '★' : '☆'}
        </button>

        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
        >
          <span>Visit Site</span>
          <span className="text-xs">↗</span>
        </a>
      </div>
    </div>
  );
}
