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

export default function HeroSection({
  searchQuery,
  onSearchChange,
  totalToolsCount,
  categoriesCount,
  onExploreClick,
}: HeroSectionProps) {
  return (
    <section className="relative px-4 sm:px-8 lg:px-14 pt-8 pb-12 lg:pb-20 overflow-hidden">
      {/* Soothing subtle background ambient glows */}
      <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-[#9fa1ff]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-6 right-1/4 w-80 h-80 rounded-full bg-[#7c7fff]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Column */}
        <div className="flex-1 max-w-2xl text-left">
          {/* Tag pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#9fa1ff]/15 border border-[#9fa1ff]/30 px-4 py-1.5 text-xs font-bold text-[#4338ca] mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#6366f1] animate-pulse" />
            <span>Curated Software Directory</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-[1.08] tracking-tight mb-5">
            It&apos;s never too late to{' '}
            <span className="relative inline-block text-[#6366f1]">
              build.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#9fa1ff]/50" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-8 max-w-xl">
            Discover verified frameworks, UI libraries, APIs, and developer tools curated by software engineers for software engineers.
          </p>

          {/* Search bar inside Hero */}
          <div className="mb-8 shadow-lg shadow-[#9fa1ff]/10 rounded-2xl max-w-xl">
            <SearchBar query={searchQuery} onChange={onSearchChange} totalCount={totalToolsCount} />
          </div>

          {/* Primary CTA + Quick Stats */}
          <div className="flex flex-wrap items-center gap-5 mb-10">
            <button
              onClick={onExploreClick}
              className="flex items-center gap-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg shadow-[#9fa1ff]/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Explore Directory</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>

            <div className="flex items-center gap-3 border-l-2 border-slate-200 pl-5 py-1">
              <div>
                <p className="text-base font-black text-slate-900 leading-tight">{totalToolsCount}+ Resources</p>
                <p className="text-xs text-slate-500 font-medium">across {categoriesCount} categories</p>
              </div>
            </div>
          </div>

          {/* Community Badges (Clean SVG icons) */}
          <div className="flex items-center gap-3 text-slate-500 text-xs font-semibold">
            <span className="text-slate-400">Community verified:</span>
            <span className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80 text-slate-700">
              <svg className="w-3.5 h-3.5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Open Source</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80 text-slate-700">
              <svg className="w-3.5 h-3.5 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Production Ready</span>
            </span>
          </div>
        </div>

        {/* Right Column Illustration */}
        <div className="flex-1 w-full max-w-lg lg:max-w-xl relative flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-[500px]">
            {/* Background Blob Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#9fa1ff]/30 via-[#7c7fff]/20 to-[#6366f1]/30 rounded-[50px] blur-2xl transform rotate-2" />
            
            {/* Illustration Image */}
            <div className="relative z-10 w-full h-full rounded-[40px] overflow-hidden border border-[#9fa1ff]/30 shadow-2xl bg-white flex items-center justify-center p-2">
              <Image
                src="/hero-illustration.png"
                alt="Software Engineer Workspace"
                width={500}
                height={500}
                className="w-full h-full object-contain rounded-[34px]"
                priority
              />
            </div>

            {/* Floating Card Top Left */}
            <div className="absolute -top-4 -left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#6366f1] flex items-center justify-center text-white text-sm shadow-md shadow-[#9fa1ff]/30">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">Curated &amp; Verified</p>
                <p className="text-[10px] text-slate-400 font-medium">Developer utilities &amp; libraries</p>
              </div>
            </div>

            {/* Floating Card Bottom Right */}
            <div className="absolute -bottom-4 -right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#9fa1ff]/20 text-[#3730a3] font-black text-xs flex items-center justify-center border border-[#9fa1ff]/40">
                100+
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">Active Resources</p>
                <p className="text-[10px] text-slate-400 font-medium">Continuously updated</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
