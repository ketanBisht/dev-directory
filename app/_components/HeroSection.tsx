'use client';

import Image from 'next/image';
import SearchBar from './SearchBar';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalToolsCount: number;
  categoriesCount: number;
  onExploreClick: () => void;
}

// Category color chips to show in the hero for visual richness
const CATEGORY_CHIPS = [
  { label: 'Deployment', color: '#6366f1' },
  { label: 'AI Tools', color: '#0284c7' },
  { label: 'UI Libraries', color: '#8b5cf6' },
  { label: 'APIs & Services', color: '#059669' },
  { label: 'Design', color: '#db2777' },
  { label: 'Hosting', color: '#0d9488' },
];

export default function HeroSection({
  searchQuery,
  onSearchChange,
  totalToolsCount,
  categoriesCount,
  onExploreClick,
}: HeroSectionProps) {
  return (
    <section className="relative px-4 sm:px-8 lg:px-14 pt-10 pb-14 lg:pb-24 overflow-hidden">
      {/* Large ambient glows — soothing, not distracting */}
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full bg-[#9fa1ff]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#7c7fff]/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-20">

        {/* ── LEFT COLUMN ── */}
        <div className="flex-1 max-w-xl text-left">

          {/* Live badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-[#9fa1ff]/15 border border-[#9fa1ff]/30 px-4 py-2 text-xs font-bold text-[#4338ca] mb-7 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#6366f1]">
              <span className="animate-ping absolute h-2 w-2 rounded-full bg-[#6366f1] opacity-60" />
            </span>
            <span>{totalToolsCount}+ Curated Developer Resources</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-black text-slate-900 leading-[1.06] tracking-tight mb-6">
            It&apos;s never<br />
            too late to{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#9fa1ff] bg-clip-text text-transparent">
                build.
              </span>
              {/* Underline squiggle */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="10"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M0,7 C30,1 60,9 90,5 C120,1 150,9 200,5"
                  stroke="#9fa1ff"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-slate-500 font-normal leading-relaxed mb-8 max-w-lg">
            Discover frameworks, UI libraries, APIs, and AI tools—hand-curated by engineers who actually ship products.
          </p>

          {/* Search bar */}
          <div className="mb-8 shadow-lg shadow-[#9fa1ff]/10 rounded-2xl max-w-lg">
            <SearchBar query={searchQuery} onChange={onSearchChange} totalCount={totalToolsCount} />
          </div>

          {/* Primary CTA row */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={onExploreClick}
              className="flex items-center gap-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg shadow-[#9fa1ff]/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Explore Directory</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="flex -space-x-2">
                {['#6366f1', '#8b5cf6', '#0284c7', '#059669'].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 leading-tight">{categoriesCount} Categories</p>
                <p className="text-[11px] text-slate-500 font-medium">All in one place</p>
              </div>
            </div>
          </div>

          {/* Category quick-pick chips */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Browse by category</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_CHIPS.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold cursor-default"
                  style={{
                    backgroundColor: chip.color + '12',
                    borderColor: chip.color + '40',
                    color: chip.color,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: chip.color }}
                  />
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex-1 w-full max-w-md lg:max-w-[480px] relative flex items-center justify-center flex-shrink-0">
          <div className="relative w-full aspect-square max-w-[480px]">

            {/* Big soft background glow blob */}
            <div className="absolute inset-4 bg-gradient-to-br from-[#9fa1ff]/25 via-[#7c7fff]/20 to-[#c7d2fe]/30 rounded-[45px] blur-xl" />

            {/* Illustration container */}
            <div className="relative z-10 w-full h-full rounded-[36px] overflow-hidden bg-gradient-to-br from-white via-[#f4f4ff] to-[#eeeefc] border border-[#9fa1ff]/25 shadow-2xl flex items-center justify-center">
              <Image
                src="/hero-dev-v2.png"
                alt="Developer exploring a software directory"
                width={480}
                height={480}
                className="w-[95%] h-[95%] object-contain"
                priority
              />
            </div>

            {/* Floating badge — top left */}
            <div className="absolute -top-5 -left-5 z-20 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#6366f1] flex items-center justify-center text-white shadow-md shadow-[#9fa1ff]/30 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">Verified &amp; Curated</p>
                <p className="text-[10px] text-slate-400 font-medium">By real developers</p>
              </div>
            </div>

            {/* Floating badge — bottom right */}
            <div className="absolute -bottom-5 -right-5 z-20 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                style={{ backgroundColor: '#6366f1' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">{totalToolsCount}+ Resources</p>
                <p className="text-[10px] text-slate-400 font-medium">Updated continuously</p>
              </div>
            </div>

            {/* Small decorative doodles */}
            <div className="absolute top-6 right-2 w-4 h-4 rounded-full border-2 border-[#9fa1ff]/40 pointer-events-none" />
            <div className="absolute bottom-16 left-1 text-[#9fa1ff]/40 text-xl font-black pointer-events-none select-none">+</div>
            <div className="absolute top-1/3 -right-3 text-[#c7d2fe]/60 text-base font-black pointer-events-none select-none">△</div>

          </div>
        </div>

      </div>
    </section>
  );
}
