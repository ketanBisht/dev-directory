'use client';

interface NavbarProps {
  starredCount: number;
  onOpenAddTool: () => void;
  onShowSaved: () => void;
  onReset: () => void;
  onOpenCommandPalette: () => void;
}

export default function Navbar({
  starredCount,
  onOpenAddTool,
  onShowSaved,
  onReset,
  onOpenCommandPalette,
}: NavbarProps) {
  return (
    <nav className="flex items-center justify-between py-4 px-4 sm:px-8 lg:px-14 border-b border-zinc-200/60 bg-white/90 backdrop-blur-md sticky top-0 z-40">
      {/* Brand Logo */}
      <button onClick={onReset} className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform">
          <img src="/logo.svg" alt="Dev Directory Logo" className="w-full h-full rounded-xl object-cover" />
        </div>
        <div className="flex items-center gap-0.5">
          <span className="text-2xl font-black text-[#6366f1] tracking-tight group-hover:text-[#4f46e5] transition-colors">dev</span>
          <span className="text-2xl font-black text-slate-900 tracking-tight">directory</span>
        </div>
      </button>

      {/* Center Nav */}
      <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
        <button onClick={onReset} className="hover:text-slate-900 transition-colors">All Resources</button>
        <button
          onClick={onShowSaved}
          className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
        >
          <span>Saved</span>
          {starredCount > 0 && (
            <span className="rounded-full bg-[#6366f1] text-white text-[10px] font-black px-2 py-0.5 leading-none">
              {starredCount}
            </span>
          )}
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs px-3.5 py-2 rounded-xl transition-all border border-slate-200/80"
        >
          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="hidden sm:inline">Search</span>
          <kbd className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Submit Tool Button */}
        <button
          onClick={onOpenAddTool}
          className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full shadow-md shadow-[#9fa1ff]/30 transition-all active:scale-95"
        >
          <span>Submit Resource</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
