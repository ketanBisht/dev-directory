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
    <div className="relative flex items-center w-full max-w-2xl bg-zinc-100 rounded-2xl p-1.5">
      {/* Search icon */}
      <div className="pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
        placeholder={`Search ${totalCount} tools — frameworks, APIs, AI models…`}
        className="flex-1 bg-transparent py-2.5 px-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none"
      />

      {/* Right side */}
      {query ? (
        <button
          onClick={() => onChange('')}
          className="mr-1 flex items-center gap-1 bg-white rounded-xl px-3 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 shadow-sm transition-colors"
        >
          Clear ✕
        </button>
      ) : (
        <button
          onClick={() => inputRef.current?.focus()}
          className="mr-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-5 py-2.5 text-sm font-bold transition-colors shadow-md shadow-orange-500/30 flex-shrink-0"
        >
          Search
        </button>
      )}
    </div>
  );
}
