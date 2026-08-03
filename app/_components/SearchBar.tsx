'use client';

import { useRef, useEffect } from 'react';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  totalCount: number;
}

export default function SearchBar({ query, onChange, totalCount }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') inputRef.current?.blur();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="relative flex items-center w-full bg-slate-100/90 rounded-2xl p-1.5 border border-slate-200/80 focus-within:border-[#9fa1ff] focus-within:ring-2 focus-within:ring-[#9fa1ff]/30 transition-all">
      {/* Search icon */}
      <div className="pl-3.5 flex items-center pointer-events-none text-slate-400">
        <svg className="h-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        ref={inputRef}
        id="dev-directory-search"
        type="search"
        autoComplete="off"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Search ${totalCount} software tools, frameworks, and APIs...`}
        className="flex-1 bg-transparent py-2.5 px-3 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none"
      />

      {/* Right side controls */}
      {query ? (
        <button
          onClick={() => onChange('')}
          className="mr-1 flex items-center gap-1 bg-white rounded-xl px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 shadow-2xs transition-colors"
        >
          Clear ✕
        </button>
      ) : (
        <button
          onClick={() => inputRef.current?.focus()}
          className="mr-1 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#9fa1ff]/25 flex-shrink-0"
        >
          Search
        </button>
      )}
    </div>
  );
}
