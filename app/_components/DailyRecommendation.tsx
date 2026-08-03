'use client';

import type { Tool } from '../_data/tools';
import { getCategoryById } from '../_data/categories';
import ToolLogo from './ToolLogo';

interface DailyRecommendationProps {
  tool: Tool;
  onToggleStar: (id: string) => void;
  isStarred: boolean;
}

export default function DailyRecommendation({ tool, onToggleStar, isStarred }: DailyRecommendationProps) {
  const cat = getCategoryById(tool.category);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-6 sm:p-8 text-white shadow-xl border border-zinc-800">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-3 py-1 text-xs font-bold text-orange-400 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
            🔥 TODAY&apos;S FEATURED RECOMMENDATION
          </div>

          {/* Main Info */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2.5 shadow-md flex-shrink-0">
              <ToolLogo
                url={tool.url}
                name={tool.name}
                fallbackText={tool.avatar}
                fallbackColor={cat.color}
                size={36}
                className="rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">{tool.name}</h3>
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-semibold text-zinc-300">
                  {cat.emoji} {cat.label}
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                {tool.url.replace(/^https?:\/\//, '').split('/')[0]}
              </p>
            </div>
          </div>

          <p className="text-sm text-zinc-300 font-medium leading-relaxed max-w-2xl">
            {tool.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {tool.tags.map((t) => (
              <span key={t} className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-medium text-zinc-300">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex sm:flex-col items-center gap-3 w-full md:w-auto flex-shrink-0">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <span>Explore Tool</span>
            <span className="text-base">↗</span>
          </a>

          <button
            onClick={() => onToggleStar(tool.id)}
            className={`flex items-center justify-center gap-2 border px-4 py-3 rounded-2xl text-xs font-bold transition-all w-auto ${
              isStarred
                ? 'bg-amber-400/20 border-amber-400/50 text-amber-300'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
            }`}
          >
            <span>{isStarred ? '★ Saved' : '☆ Save Tool'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
