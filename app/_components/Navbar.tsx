'use client';

interface NavbarProps {
  starredCount: number;
  onOpenAddTool: () => void;
  onShowSaved: () => void;
  onReset: () => void;
}

export default function Navbar({ starredCount, onOpenAddTool, onShowSaved, onReset }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between py-5 px-4 sm:px-8 lg:px-14">
      {/* Logo — two-tone like Trekcave */}
      <button onClick={onReset} className="flex items-center gap-0.5 group">
        <span className="text-2xl font-black text-orange-500 tracking-tight">dev</span>
        <span className="text-2xl font-black text-zinc-900 tracking-tight">directory</span>
      </button>

      {/* Center nav links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-600">
        <button onClick={onReset} className="hover:text-zinc-900 transition-colors">All Tools</button>
        <button onClick={() => {}} className="hover:text-zinc-900 transition-colors">Categories</button>
        <button
          onClick={onShowSaved}
          className="hover:text-zinc-900 transition-colors flex items-center gap-1.5"
        >
          Saved
          {starredCount > 0 && (
            <span className="rounded-full bg-orange-500 text-white text-[10px] font-black px-1.5 py-px leading-none">
              {starredCount}
            </span>
          )}
        </button>
        <button className="hover:text-zinc-900 transition-colors">Contact</button>
      </div>

      {/* CTA — orange pill button like reference */}
      <button
        onClick={onOpenAddTool}
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-orange-500/30 transition-all active:scale-95"
      >
        Submit Tool
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20">→</span>
      </button>
    </nav>
  );
}
