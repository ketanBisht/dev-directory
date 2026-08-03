'use client';

import { categories, CategoryId } from '../_data/categories';

interface CategorySidebarProps {
  activeCategory: CategoryId | null;
  onSelectCategory: (id: CategoryId | null) => void;
  categoryCounts: Record<CategoryId, number>;
  totalTools: number;
  starredCount: number;
  showStarredOnly: boolean;
  onToggleStarredOnly: () => void;
  activeTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

const quickTags = ['React', 'TypeScript', 'Python', 'AI', 'Tailwind', 'Postgres', 'Docker', 'GraphQL', 'Vue', 'Rust'];

export default function CategorySidebar({
  activeCategory,
  onSelectCategory,
  categoryCounts,
  totalTools,
  starredCount,
  showStarredOnly,
  onToggleStarredOnly,
  activeTag,
  onSelectTag,
}: CategorySidebarProps) {
  return (
    <aside className="w-full lg:w-56 xl:w-60 flex-shrink-0">
      {/* Mobile: horizontal pill row */}
      <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar lg:hidden">
        <MobilePill
          active={!activeCategory && !showStarredOnly}
          onClick={() => { if (showStarredOnly) onToggleStarredOnly(); onSelectCategory(null); }}
          label="All" count={totalTools}
        />
        <MobilePill active={showStarredOnly} onClick={onToggleStarredOnly} label="★ Saved" count={starredCount} />
        {categories.map((cat) => (
          <MobilePill
            key={cat.id}
            active={activeCategory === cat.id && !showStarredOnly}
            onClick={() => { if (showStarredOnly) onToggleStarredOnly(); onSelectCategory(cat.id); }}
            label={`${cat.emoji} ${cat.label}`}
            count={categoryCounts[cat.id] ?? 0}
          />
        ))}
      </div>

      {/* Desktop: sticky column panel */}
      <div className="hidden lg:flex flex-col gap-5 sticky top-6">
        
        {/* Quick access */}
        <div className="bg-zinc-50 rounded-2xl border border-zinc-100 overflow-hidden">
          <SidebarBtn
            active={!activeCategory && !showStarredOnly}
            onClick={() => { if (showStarredOnly) onToggleStarredOnly(); onSelectCategory(null); onSelectTag(null); }}
            icon="⚡" label="All Tools" count={totalTools}
          />
          <SidebarBtn
            active={showStarredOnly} onClick={onToggleStarredOnly}
            icon="★" label="Saved" count={starredCount} divider
          />
        </div>

        {/* Categories */}
        <div className="bg-zinc-50 rounded-2xl border border-zinc-100 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-zinc-200 bg-white">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Categories</span>
          </div>
          <div className="max-h-72 overflow-y-auto no-scrollbar">
            {categories.map((cat, i) => (
              <SidebarBtn
                key={cat.id}
                active={activeCategory === cat.id && !showStarredOnly}
                onClick={() => { if (showStarredOnly) onToggleStarredOnly(); onSelectCategory(cat.id); }}
                icon={cat.emoji}
                label={cat.label}
                count={categoryCounts[cat.id] ?? 0}
                divider={i > 0}
              />
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="bg-zinc-50 rounded-2xl border border-zinc-100 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-zinc-200 bg-white">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Quick Tags</span>
          </div>
          <div className="p-3 flex flex-wrap gap-1.5">
            {quickTags.map((tag) => {
              const active = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => onSelectTag(active ? null : tag)}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold border transition-all ${
                    active
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/25'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:border-orange-300 hover:text-orange-600'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ─── Subcomponents ─── */

function SidebarBtn({ active, onClick, icon, label, count, divider = false }: {
  active: boolean; onClick: () => void; icon: string; label: string; count: number; divider?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between px-4 py-2.5 text-xs font-semibold transition-all text-left gap-2 ${
        divider ? 'border-t border-zinc-200' : ''
      } ${active ? 'bg-orange-50 text-orange-600' : 'text-zinc-700 hover:bg-white'}`}
    >
      <span className="flex items-center gap-2.5 truncate">
        <span className="text-sm">{icon}</span>
        <span className="truncate">{label}</span>
      </span>
      <span className={`text-[10px] font-mono font-bold flex-shrink-0 rounded-full px-2 py-0.5 ${
        active ? 'bg-orange-500 text-white' : 'bg-zinc-200 text-zinc-500'
      }`}>
        {count}
      </span>
    </button>
  );
}

function MobilePill({ active, onClick, label, count }: {
  active: boolean; onClick: () => void; label: string; count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold border transition-all ${
        active
          ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/25'
          : 'bg-white text-zinc-700 border-zinc-200 hover:border-orange-300'
      }`}
    >
      {label}
      <span className={`text-[10px] font-bold rounded-full px-1.5 ${active ? 'bg-white/25 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
        {count}
      </span>
    </button>
  );
}
