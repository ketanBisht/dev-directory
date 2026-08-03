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
      {/* Mobile: horizontal scroll row */}
      <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar lg:hidden">
        <MobilePill
          active={!activeCategory && !showStarredOnly}
          onClick={() => { if (showStarredOnly) onToggleStarredOnly(); onSelectCategory(null); }}
          label="All Resources" count={totalTools}
        />
        <MobilePill active={showStarredOnly} onClick={onToggleStarredOnly} label="Saved" count={starredCount} />
        {categories.map((cat) => (
          <MobilePill
            key={cat.id}
            active={activeCategory === cat.id && !showStarredOnly}
            onClick={() => { if (showStarredOnly) onToggleStarredOnly(); onSelectCategory(cat.id); }}
            label={cat.label}
            count={categoryCounts[cat.id] ?? 0}
            color={cat.color}
          />
        ))}
      </div>

      {/* Desktop: sticky sidebar panel */}
      <div className="hidden lg:flex flex-col gap-5 sticky top-20">
        
        {/* Quick access */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 overflow-hidden">
          <SidebarBtn
            active={!activeCategory && !showStarredOnly}
            onClick={() => { if (showStarredOnly) onToggleStarredOnly(); onSelectCategory(null); onSelectTag(null); }}
            label="All Resources" count={totalTools}
          />
          <SidebarBtn
            active={showStarredOnly} onClick={onToggleStarredOnly}
            label="Saved Resources" count={starredCount} divider
          />
        </div>

        {/* Categories */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-slate-200/80 bg-white">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Categories</span>
          </div>
          <div className="max-h-72 overflow-y-auto no-scrollbar">
            {categories.map((cat, i) => (
              <SidebarBtn
                key={cat.id}
                active={activeCategory === cat.id && !showStarredOnly}
                onClick={() => { if (showStarredOnly) onToggleStarredOnly(); onSelectCategory(cat.id); }}
                label={cat.label}
                count={categoryCounts[cat.id] ?? 0}
                divider={i > 0}
                color={cat.color}
              />
            ))}
          </div>
        </div>

        {/* Quick Tags */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-slate-200/80 bg-white">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quick Tags</span>
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
                      ? 'bg-[#6366f1] text-white border-[#6366f1] shadow-md shadow-[#9fa1ff]/30'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#9fa1ff]/50 hover:text-[#4338ca]'
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

function SidebarBtn({ active, onClick, label, count, divider = false, color }: {
  active: boolean; onClick: () => void; label: string; count: number; divider?: boolean; color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between px-4 py-2.5 text-xs font-semibold transition-all text-left gap-2 ${
        divider ? 'border-t border-slate-200/80' : ''
      } ${active ? 'bg-[#9fa1ff]/20 text-[#3730a3] font-bold' : 'text-slate-700 hover:bg-white'}`}
    >
      <span className="flex items-center gap-2 truncate">
        {color && (
          <span
            className="w-2 h-2 rounded-full flex-shrink-0 opacity-90"
            style={{ backgroundColor: color }}
          />
        )}
        <span className="truncate">{label}</span>
      </span>
      <span className={`text-[10px] font-mono font-bold flex-shrink-0 rounded-full px-2 py-0.5 ${
        active ? 'bg-[#6366f1] text-white' : 'bg-slate-200/80 text-slate-500'
      }`}>
        {count}
      </span>
    </button>
  );
}

function MobilePill({ active, onClick, label, count, color }: {
  active: boolean; onClick: () => void; label: string; count: number; color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all ${
        active
          ? 'bg-[#6366f1] text-white border-[#6366f1] shadow-md shadow-[#9fa1ff]/30'
          : 'bg-white text-slate-700 border-slate-200 hover:border-[#9fa1ff]/50'
      }`}
    >
      {color && (
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: active ? '#fff' : color, opacity: active ? 0.7 : 1 }}
        />
      )}
      {label}
      <span className={`text-[10px] font-bold rounded-full px-1.5 ${active ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'}`}>
        {count}
      </span>
    </button>
  );
}
