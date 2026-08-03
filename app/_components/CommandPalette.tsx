'use client';

import { useState, useEffect, useRef } from 'react';
import type { Tool } from '../_data/tools';
import { getCategoryById } from '../_data/categories';
import ToolLogo from './ToolLogo';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  tools: Tool[];
  starredIds: Set<string>;
  onToggleStar: (id: string) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  tools,
  starredIds,
  onToggleStar,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter tools
  const results = tools.filter((t) => {
    if (!query.trim()) return t.isFeatured;
    const q = query.toLowerCase().trim();
    return (
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }).slice(0, 8);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setQuery('');
        setSelectedIndex(0);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
      }
      if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        window.open(results[selectedIndex].url, '_blank');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] divide-y divide-slate-100">
        
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3.5 bg-white">
          <svg className="w-5 h-5 text-[#6366f1] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Search software tools, frameworks, and APIs... (e.g. Next.js, AI, Supabase)"
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block border border-slate-200 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-500 ml-2">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 max-h-[400px]">
          <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400">
            {query ? `Search Results (${results.length})` : 'Popular Suggestions'}
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs font-semibold">
              No software resources found matching &quot;{query}&quot;
            </div>
          ) : (
            results.map((tool, idx) => {
              const cat = getCategoryById(tool.category);
              const isSelected = idx === selectedIndex;
              const isStarred = starredIds.has(tool.id);

              return (
                <div
                  key={tool.id}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer ${
                    isSelected ? 'bg-[#9fa1ff]/15 border border-[#9fa1ff]/40' : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 flex-1 min-w-0"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200/60 p-2 shadow-2xs flex-shrink-0">
                      <ToolLogo
                        url={tool.url}
                        name={tool.name}
                        fallbackText={tool.avatar}
                        fallbackColor={cat.color}
                        size={24}
                        className="rounded-md"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">{tool.name}</span>
                        <span className="rounded-full bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-0.5">
                          {cat.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate font-medium mt-0.5">
                        {tool.description}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStar(tool.id);
                      }}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        isStarred ? 'bg-[#9fa1ff]/20 border-[#9fa1ff]/40 text-[#4338ca]' : 'bg-white border-slate-200 text-slate-400 hover:text-[#6366f1]'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill={isStarred ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                      </svg>
                    </button>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:flex items-center gap-1 text-[11px] font-bold bg-[#6366f1] text-white px-3 py-1.5 rounded-xl hover:bg-[#4f46e5] transition-colors shadow-2xs"
                    >
                      <span>Open</span>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-400">
          <div className="flex items-center gap-3">
            <span><kbd className="bg-white border px-1 rounded text-[10px]">↑↓</kbd> Navigate</span>
            <span><kbd className="bg-white border px-1 rounded text-[10px]">↵</kbd> Open resource</span>
          </div>
          <span>devdirectory ⌘K</span>
        </div>
      </div>
    </div>
  );
}
