'use client';

interface StackPreset {
  id: string;
  title: string;
  description: string;
  categoryFilter?: string;
  tagFilter?: string;
  badge: string;
  iconSvg: React.ReactNode;
}

const STACK_PRESETS: StackPreset[] = [
  {
    id: 'saas',
    title: 'SaaS Web App',
    description: 'Next.js, Auth, Database & Payments',
    categoryFilter: 'ui-libraries',
    tagFilter: 'nextjs',
    badge: 'Popular Stack',
    iconSvg: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    id: 'ai-agents',
    title: 'AI & LLM Tools',
    description: 'OpenAI, LangChain, Vector DBs & Prompts',
    categoryFilter: 'ai-tools',
    tagFilter: 'ai',
    badge: 'Trending',
    iconSvg: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5a2.25 2.25 0 012.25 2.25v1.5A2.25 2.25 0 0119 20.5H5a2.25 2.25 0 01-2.25-2.25v-1.5A2.25 2.25 0 015 14.5m14 0H5" />
      </svg>
    ),
  },
  {
    id: 'ui-design',
    title: 'Modern UI & Styling',
    description: 'Tailwind, Shadcn UI, Motion & Icons',
    categoryFilter: 'ui-libraries',
    tagFilter: 'tailwind',
    badge: 'Design Essentials',
    iconSvg: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.006 2.749a15.992 15.992 0 01-2.613-2.18M18.9 5.75A3 3 0 0013.12 6.88a2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.997 15.997 0 003.388-1.62m-5.006 2.749a15.992 15.992 0 01-2.613-2.18" />
      </svg>
    ),
  },
  {
    id: 'backend-api',
    title: 'Backend & Cloud APIs',
    description: 'Supabase, Railway, Vercel & PostgreSQL',
    categoryFilter: 'apis-services',
    tagFilter: 'backend',
    badge: 'Production Ready',
    iconSvg: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 3h13.5m-13.5 3h13.5M6 3h12a3 3 0 013 3v0a3 3 0 01-3 3H6a3 3 0 01-3-3v0a3 3 0 013-3z" />
      </svg>
    ),
  },
];

interface StackFinderProps {
  onSelectPreset: (preset: StackPreset) => void;
  activePresetId: string | null;
}

export default function StackFinder({ onSelectPreset, activePresetId }: StackFinderProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#9fa1ff]/15 px-3 py-1 text-xs font-bold text-[#4338ca] border border-[#9fa1ff]/30 mb-2">
            <span>Stack Explorer</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            What are you building today?
          </h2>
        </div>
        <p className="text-xs text-slate-500 font-medium max-w-xs">
          Select a preset stack to quickly filter the resource directory.
        </p>
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STACK_PRESETS.map((preset) => {
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`flex flex-col text-left p-5 rounded-2xl border transition-all relative overflow-hidden group ${
                isActive
                  ? 'bg-[#6366f1] text-white border-[#6366f1] shadow-lg shadow-[#9fa1ff]/30 scale-[1.02]'
                  : 'bg-slate-50 hover:bg-white text-slate-900 border-slate-200/80 hover:border-[#9fa1ff]/60 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className={`p-2 rounded-xl border ${isActive ? 'bg-white/20 text-white border-white/30' : 'bg-white text-[#6366f1] border-slate-200/80'}`}>
                  {preset.iconSvg}
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isActive
                      ? 'bg-white/20 text-white border-white/30'
                      : 'bg-white text-slate-600 border-slate-200/80'
                  }`}
                >
                  {preset.badge}
                </span>
              </div>

              <h3 className={`text-sm font-bold mb-1 ${isActive ? 'text-white' : 'group-hover:text-[#6366f1] transition-colors'}`}>
                {preset.title}
              </h3>
              <p className={`text-xs leading-relaxed font-medium ${isActive ? 'text-white/90' : 'text-slate-500'}`}>
                {preset.description}
              </p>

              <div className="mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-bold border-current/10">
                <span>{isActive ? 'Active Filter ✓' : 'Explore Stack'}</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
