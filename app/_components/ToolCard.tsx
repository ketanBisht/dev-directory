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
      <div className="group flex items-center gap-4 bg-white rounded-2xl border border-slate-200/80 p-4 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-0.5 transition-all relative overflow-hidden">
        {/* Category Accent Left Line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5 opacity-90 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: cat.color }}
        />

        {/* Logo Container */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/60 p-2 shadow-2xs group-hover:scale-105 transition-transform ml-1">
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
            <span className="text-sm font-bold text-slate-900 group-hover:text-[#6366f1] transition-colors truncate">
              {tool.name}
            </span>
            {tool.isNew && (
              <span className="rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[9px] font-bold px-2 py-0.5 flex-shrink-0">
                NEW
              </span>
            )}
            {tool.isFeatured && (
              <span className="rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[9px] font-bold px-2 py-0.5 flex-shrink-0">
                FEATURED
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium truncate mb-1">{tool.description}</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span className={`font-semibold rounded-full px-2 py-0.5 border ${cat.bgColor} ${cat.textColor}`}>
              {cat.label}
            </span>
            <span className="text-slate-300">·</span>
            <span className="font-mono text-slate-400 truncate">
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
            aria-label={isStarred ? `Unsave ${tool.name}` : `Save ${tool.name}`}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all ${
              isStarred
                ? 'bg-[#9fa1ff]/20 border-[#9fa1ff]/40 text-[#4338ca]'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-[#9fa1ff] hover:text-[#6366f1]'
            }`}
          >
            <svg className="w-4 h-4" fill={isStarred ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold text-xs px-4 py-2 rounded-full shadow-md shadow-[#9fa1ff]/20 transition-all hover:scale-105"
          >
            Visit Site
          </a>
        </div>
      </div>
    );
  }

  /* ── GRID CARD ── */
  return (
    <div className="group flex flex-col bg-white rounded-3xl border border-slate-200/80 p-5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all relative overflow-hidden">
      {/* Category-Specific Distinct Color Top Band */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 opacity-90 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: cat.color }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4 pt-1">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/60 p-2.5 shadow-2xs group-hover:scale-105 group-hover:shadow-md transition-all">
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
          {/* Category Pill with category-specific colors */}
          <span className={`rounded-full border text-[10px] font-bold px-2.5 py-1 ${cat.bgColor} ${cat.textColor}`}>
            {cat.label}
          </span>

          <div className="flex items-center gap-1">
            {tool.isFeatured && (
              <span className="rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[9px] font-bold px-2 py-0.5">
                FEATURED
              </span>
            )}
            {tool.isNew && (
              <span className="rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[9px] font-bold px-2 py-0.5">
                NEW
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <h3 className="text-base font-bold text-slate-900 mb-1 leading-tight group-hover:text-[#6366f1] transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs font-medium text-slate-500 leading-relaxed mb-4 line-clamp-2 flex-1">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} active={activeTag === tag} onClick={onSelectTag} />
          ))}
        </div>

        {/* Domain */}
        <p className="text-[11px] font-mono text-slate-400 mb-4 truncate flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="truncate">{tool.url.replace(/^https?:\/\//, '').split('/')[0]}</span>
        </p>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onToggleStar(tool.id)}
          aria-label={isStarred ? `Unsave ${tool.name}` : `Save ${tool.name}`}
          className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl border transition-all ${
            isStarred
              ? 'bg-[#9fa1ff]/20 border-[#9fa1ff]/40 text-[#4338ca]'
              : 'bg-slate-50 border-slate-200/80 text-slate-400 hover:border-[#9fa1ff] hover:text-[#6366f1]'
          }`}
        >
          <svg className="w-4 h-4" fill={isStarred ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
        </button>

        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold text-xs py-2.5 rounded-xl shadow-md shadow-[#9fa1ff]/20 transition-all hover:scale-[1.02]"
        >
          <span>Visit Site</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
