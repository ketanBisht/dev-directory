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
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl border border-slate-800">
      {/* Soothing Indigo Glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 rounded-full bg-[#9fa1ff]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-56 h-56 rounded-full bg-[#7c7fff]/15 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#9fa1ff]/20 border border-[#9fa1ff]/30 px-3.5 py-1 text-xs font-bold text-[#c2c4ff] mb-4">
            <span className="flex h-2 w-2 rounded-full bg-[#9fa1ff] animate-pulse" />
            <span>SPOTLIGHT RECOMMENDATION</span>
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
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">{tool.name}</h3>
                <span className="rounded-md bg-white/10 border border-white/15 px-2.5 py-0.5 text-xs font-medium text-slate-300">
                  {cat.label}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                {tool.url.replace(/^https?:\/\//, '').split('/')[0]}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
            {tool.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {tool.tags.map((t) => (
              <span key={t} className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-medium text-slate-300">
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
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-[#9fa1ff]/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>Explore Resource</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>

          <button
            onClick={() => onToggleStar(tool.id)}
            className={`flex items-center justify-center gap-2 border px-4 py-3 rounded-2xl text-xs font-bold transition-all w-auto ${
              isStarred
                ? 'bg-[#9fa1ff]/20 border-[#9fa1ff]/40 text-[#c2c4ff]'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <svg className="w-4 h-4" fill={isStarred ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.116.488-.418.877-.84.629l-4.73-2.825a.563.563 0 00-.586 0l-4.73 2.825c-.422.248-.956-.14-.84-.629l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.32-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <span>{isStarred ? 'Saved' : 'Save Resource'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
