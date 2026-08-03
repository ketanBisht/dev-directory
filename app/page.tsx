'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { tools as initialTools, Tool } from './_data/tools';
import { categories, CategoryId, getCategoryById } from './_data/categories';
import Navbar from './_components/Navbar';
import SearchBar from './_components/SearchBar';
import CategorySidebar from './_components/CategorySidebar';
import ToolGrid from './_components/ToolGrid';
import StatsBar from './_components/StatsBar';
import AddToolModal from './_components/AddToolModal';
import DailyRecommendation from './_components/DailyRecommendation';
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

  const featuredScrollRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<HTMLDivElement>(null);

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

  // Compute recommendation based on day of year
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
    setSearchQuery(''); setActiveCategory(null); setActiveTag(null); setShowStarredOnly(false);
  };

  const scrollFeatured = (dir: 'left' | 'right') => {
    featuredScrollRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  const scrollToDirectory = () => {
    directoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectedCategoryObj = activeCategory ? getCategoryById(activeCategory) : null;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-zinc-900">
      {/* Navbar */}
      <Navbar
        starredCount={starredIds.size}
        onOpenAddTool={() => setIsModalOpen(true)}
        onShowSaved={() => { setShowStarredOnly(true); setActiveCategory(null); scrollToDirectory(); }}
        onReset={reset}
      />

      {/* HERO SECTION */}
      <section className="relative px-4 sm:px-8 lg:px-14 pt-8 pb-16 hero-grid overflow-hidden border-b border-zinc-200/60">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 text-xs font-bold text-orange-600 mb-6 shadow-2xs">
            <span>✨</span>
            <span>Hand-curated directory of 100+ developer utilities</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-[1.15]">
            Discover tools that elevate your{' '}
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              workflow.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 font-normal max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop searching across a dozen bookmarks. Browse top-rated UI libraries, AI models, APIs, and dev tools with real previews and instant links.
          </p>

          {/* Centered Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 shadow-xl shadow-orange-500/5 rounded-2xl">
            <SearchBar query={searchQuery} onChange={setSearchQuery} totalCount={toolsList.length} />
          </div>

          {/* Quick Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-zinc-400 mr-1">Popular:</span>
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); scrollToDirectory(); }}
                className="flex items-center gap-1.5 rounded-full bg-white border border-zinc-200/80 px-3 py-1 text-xs font-medium text-zinc-700 hover:border-orange-300 hover:text-orange-600 hover:shadow-xs transition-all"
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="px-4 sm:px-8 lg:px-14 py-12 space-y-16">

        {/* TODAY'S RECOMMENDATION */}
        {dailyTool && (
          <section className="max-w-7xl mx-auto">
            <DailyRecommendation
              tool={dailyTool}
              onToggleStar={handleToggleStar}
              isStarred={starredIds.has(dailyTool.id)}
            />
          </section>
        )}

        {/* FEATURED CAROUSEL */}
        {featuredTools.length > 0 && (
          <section className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Top Community Picks</h2>
                <p className="text-xs text-zinc-500 font-medium">Trending software & utilities this week</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollFeatured('left')}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 text-sm transition-all shadow-xs"
                >
                  ←
                </button>
                <button
                  onClick={() => scrollFeatured('right')}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm transition-all shadow-md shadow-orange-500/20"
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
                    className="flex-shrink-0 w-72 bg-white rounded-2xl border border-zinc-200/80 p-4 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-100 p-2 shadow-xs group-hover:scale-105 transition-transform">
                          <ToolLogo
                            url={tool.url}
                            name={tool.name}
                            fallbackText={tool.avatar}
                            fallbackColor={cat.color}
                            size={28}
                            className="rounded-md"
                          />
                        </div>
                        <span className="rounded-full bg-orange-50 text-orange-600 border border-orange-200/60 text-[10px] font-bold px-2.5 py-0.5">
                          {cat.emoji} {cat.label}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-zinc-900 group-hover:text-orange-600 transition-colors mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-zinc-500 font-medium line-clamp-2 mb-3">
                        {tool.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-100 mt-2">
                      <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[120px]">
                        {tool.url.replace(/^https?:\/\//, '').split('/')[0]}
                      </span>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                      >
                        Visit ↗
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
              onSelectCategory={(cat) => { setActiveCategory(cat); if (cat) setShowStarredOnly(false); }}
              categoryCounts={categoryCounts}
              totalTools={toolsList.length}
              starredCount={starredIds.size}
              showStarredOnly={showStarredOnly}
              onToggleStarredOnly={() => { setShowStarredOnly((p) => !p); if (!showStarredOnly) setActiveCategory(null); }}
              activeTag={activeTag}
              onSelectTag={(tag) => setActiveTag(tag)}
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
                  onSelectTag={(tag) => setActiveTag((p) => (p === tag ? null : tag))}
                  onResetFilters={reset}
                />
              ) : (
                <div className="py-24 text-center text-zinc-400 text-sm font-semibold">Loading directory…</div>
              )}
            </main>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200/80 px-4 sm:px-8 lg:px-14 py-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-orange-500">dev</span>
            <span className="text-lg font-black tracking-tight text-zinc-900">directory</span>
            <span className="text-xs text-zinc-400 font-medium ml-2 border-l border-zinc-200 pl-3">
              Curated software resources for modern developers
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {toolsList.length} tools · {categories.length} categories
          </span>
        </div>
      </footer>

      <AddToolModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTool={handleAddTool} />
    </div>
  );
}
