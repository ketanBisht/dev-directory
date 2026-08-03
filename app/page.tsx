'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { tools as initialTools, Tool } from './_data/tools';
import { categories, CategoryId, getCategoryById } from './_data/categories';
import Navbar from './_components/Navbar';
import HeroSection from './_components/HeroSection';
import CategorySidebar from './_components/CategorySidebar';
import ToolGrid from './_components/ToolGrid';
import StatsBar from './_components/StatsBar';
import AddToolModal from './_components/AddToolModal';
import DailyRecommendation from './_components/DailyRecommendation';
import StackFinder from './_components/StackFinder';
import CommandPalette from './_components/CommandPalette';
import ToolLogo from './_components/ToolLogo';

export default function Home() {
  const [toolsList, setToolsList] = useState<Tool[]>(initialTools);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [starredIds, setStarredIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  const featuredScrollRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<HTMLDivElement>(null);

  // Hydrate local storage
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const s = localStorage.getItem('devdir_starred');
        if (s) setStarredIds(new Set(JSON.parse(s)));
        const c = localStorage.getItem('devdir_custom');
        if (c) setToolsList((prev) => [...JSON.parse(c), ...prev]);
      } catch { /* ignore */ }
      setIsLoaded(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // Global ⌘K Command Palette Hotkey Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleStar = (id: string) => {
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      try { localStorage.setItem('devdir_starred', JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
  };

  const handleAddTool = (tool: Tool) => {
    setToolsList((prev) => [tool, ...prev]);
    try {
      const saved = localStorage.getItem('devdir_custom');
      const list = saved ? JSON.parse(saved) : [];
      localStorage.setItem('devdir_custom', JSON.stringify([tool, ...list]));
    } catch { /* ignore */ }
  };

  // Spotlight tool pick
  const dailyTool = useMemo(() => {
    if (!toolsList.length) return initialTools[0];
    return toolsList[0];
  }, [toolsList]);

  const categoryCounts = useMemo(() => {
    const counts = {} as Record<CategoryId, number>;
    categories.forEach((c) => (counts[c.id] = 0));
    toolsList.forEach((t) => { if (counts[t.category] !== undefined) counts[t.category]++; });
    return counts;
  }, [toolsList]);

  const filteredTools = useMemo(() => {
    return toolsList.filter((tool) => {
      if (showStarredOnly && !starredIds.has(tool.id)) return false;
      if (activeCategory && tool.category !== activeCategory) return false;
      if (activeTag && !tool.tags.includes(activeTag)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          tool.name.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          tool.tags.some((t) => t.toLowerCase().includes(q)) ||
          tool.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [toolsList, searchQuery, activeCategory, activeTag, showStarredOnly, starredIds]);

  const featuredTools = useMemo(
    () => toolsList.filter((t) => t.isFeatured).slice(0, 10),
    [toolsList]
  );

  const reset = () => {
    setSearchQuery('');
    setActiveCategory(null);
    setActiveTag(null);
    setShowStarredOnly(false);
    setActivePresetId(null);
  };

  const handleSelectPreset = (preset: { id: string; categoryFilter?: string; tagFilter?: string }) => {
    if (activePresetId === preset.id) {
      reset();
      return;
    }
    setActivePresetId(preset.id);
    setShowStarredOnly(false);
    setSearchQuery('');
    if (preset.categoryFilter) setActiveCategory(preset.categoryFilter as CategoryId);
    else setActiveCategory(null);
    if (preset.tagFilter) setActiveTag(preset.tagFilter);
    else setActiveTag(null);
    scrollToDirectory();
  };

  const scrollFeatured = (dir: 'left' | 'right') => {
    featuredScrollRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  const scrollToDirectory = () => {
    directoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectedCategoryObj = activeCategory ? getCategoryById(activeCategory) : null;

  return (
    <div className="min-h-screen bg-[#fcfcfd] font-sans text-slate-900">
      {/* Sticky Glass Navbar */}
      <Navbar
        starredCount={starredIds.size}
        onOpenAddTool={() => setIsModalOpen(true)}
        onShowSaved={() => { setShowStarredOnly(true); setActiveCategory(null); scrollToDirectory(); }}
        onReset={reset}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* HERO SECTION */}
      <div className="hero-grid border-b border-slate-200/60">
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={(q) => { setSearchQuery(q); if (q) scrollToDirectory(); }}
          totalToolsCount={toolsList.length}
          categoriesCount={categories.length}
          onExploreClick={scrollToDirectory}
        />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="px-4 sm:px-8 lg:px-14 py-12 space-y-16">

        {/* SPOTLIGHT RECOMMENDATION */}
        {dailyTool && (
          <section className="max-w-7xl mx-auto">
            <DailyRecommendation
              tool={dailyTool}
              onToggleStar={handleToggleStar}
              isStarred={starredIds.has(dailyTool.id)}
            />
          </section>
        )}

        {/* STACK EXPLORER */}
        <section className="max-w-7xl mx-auto">
          <StackFinder
            onSelectPreset={handleSelectPreset}
            activePresetId={activePresetId}
          />
        </section>

        {/* FEATURED CAROUSEL */}
        {featuredTools.length > 0 && (
          <section className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Featured Resources</h2>
                <p className="text-xs text-slate-500 font-medium">Top-rated utilities and libraries</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollFeatured('left')}
                  aria-label="Scroll left"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm transition-all shadow-2xs"
                >
                  ←
                </button>
                <button
                  onClick={() => scrollFeatured('right')}
                  aria-label="Scroll right"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm transition-all shadow-md shadow-[#9fa1ff]/20"
                >
                  →
                </button>
              </div>
            </div>

            <div
              ref={featuredScrollRef}
              className="flex gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth"
            >
              {featuredTools.map((tool) => {
                const cat = getCategoryById(tool.category);
                return (
                  <div
                    key={tool.id}
                    className="flex-shrink-0 w-72 bg-white rounded-2xl border border-slate-200/80 p-4 hover:border-[#9fa1ff] hover:shadow-xl hover:shadow-[#9fa1ff]/10 hover:-translate-y-1 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/60 p-2 shadow-2xs group-hover:scale-105 transition-transform">
                          <ToolLogo
                            url={tool.url}
                            name={tool.name}
                            fallbackText={tool.avatar}
                            fallbackColor={cat.color}
                            size={28}
                            className="rounded-md"
                          />
                        </div>
                        <span className="rounded-full bg-[#9fa1ff]/15 text-[#4338ca] border border-[#9fa1ff]/30 text-[10px] font-bold px-2.5 py-0.5">
                          {cat.label}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#6366f1] transition-colors mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-3">
                        {tool.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                      <span className="text-[11px] font-mono text-slate-400 truncate max-w-[120px]">
                        {tool.url.replace(/^https?:\/\//, '').split('/')[0]}
                      </span>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#6366f1] hover:text-[#4f46e5] flex items-center gap-1"
                      >
                        <span>Visit</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* DIRECTORY SECTION */}
        <section ref={directoryRef} className="max-w-7xl mx-auto pt-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <CategorySidebar
              activeCategory={activeCategory}
              onSelectCategory={(cat) => { setActiveCategory(cat); if (cat) setShowStarredOnly(false); setActivePresetId(null); }}
              categoryCounts={categoryCounts}
              totalTools={toolsList.length}
              starredCount={starredIds.size}
              showStarredOnly={showStarredOnly}
              onToggleStarredOnly={() => { setShowStarredOnly((p) => !p); if (!showStarredOnly) setActiveCategory(null); setActivePresetId(null); }}
              activeTag={activeTag}
              onSelectTag={(tag) => { setActiveTag(tag); setActivePresetId(null); }}
            />

            <main className="flex-1 min-w-0 w-full">
              <StatsBar
                filtered={filteredTools.length}
                total={toolsList.length}
                activeCategory={selectedCategoryObj}
                activeTag={activeTag}
                onClearCategory={() => setActiveCategory(null)}
                onClearTag={() => setActiveTag(null)}
              />

              {isLoaded ? (
                <ToolGrid
                  tools={filteredTools}
                  starredIds={starredIds}
                  onToggleStar={handleToggleStar}
                  activeTag={activeTag}
                  onSelectTag={(tag) => { setActiveTag((p) => (p === tag ? null : tag)); setActivePresetId(null); }}
                  onResetFilters={reset}
                />
              ) : (
                <div className="py-24 text-center text-slate-400 text-sm font-semibold">Loading directory…</div>
              )}
            </main>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 px-4 sm:px-8 lg:px-14 py-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-[#6366f1]">dev</span>
            <span className="text-lg font-black tracking-tight text-slate-900">directory</span>
            <span className="text-xs text-slate-400 font-medium ml-2 border-l border-slate-200 pl-3">
              Curated software resources for modern developers
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {toolsList.length} resources · {categories.length} categories
          </span>
        </div>
      </footer>

      {/* MODALS */}
      <AddToolModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTool={handleAddTool} />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        tools={toolsList}
        starredIds={starredIds}
        onToggleStar={handleToggleStar}
      />
    </div>
  );
}
