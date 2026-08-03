export type CategoryId =
  | 'deployment'
  | 'ui-libraries'
  | 'ai-tools'
  | 'documentation'
  | 'apis-services'
  | 'playgrounds'
  | 'design'
  | 'debugging'
  | 'packages'
  | 'hosting';

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
  color: string;         // Hex — used for avatar bg + hover glow
  sidebarActive: string; // Full Tailwind class string for active sidebar state
  badge: string;         // Full Tailwind class string for tag badges in this category
  dot: string;           // Dot color class
}

export const categories: Category[] = [
  {
    id: 'deployment',
    label: 'Deployment',
    emoji: '🚀',
    color: '#f97316',
    sidebarActive: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    badge: 'bg-orange-500/10 text-orange-300 border border-orange-500/20',
    dot: 'bg-orange-400',
  },
  {
    id: 'ui-libraries',
    label: 'UI Libraries',
    emoji: '🎨',
    color: '#8b5cf6',
    sidebarActive: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
    badge: 'bg-violet-500/10 text-violet-300 border border-violet-500/20',
    dot: 'bg-violet-400',
  },
  {
    id: 'ai-tools',
    label: 'AI Tools',
    emoji: '🤖',
    color: '#22d3ee',
    sidebarActive: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    badge: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20',
    dot: 'bg-cyan-400',
  },
  {
    id: 'documentation',
    label: 'Documentation',
    emoji: '📚',
    color: '#3b82f6',
    sidebarActive: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    badge: 'bg-blue-500/10 text-blue-300 border border-blue-500/20',
    dot: 'bg-blue-400',
  },
  {
    id: 'apis-services',
    label: 'APIs & Services',
    emoji: '🔌',
    color: '#10b981',
    sidebarActive: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    badge: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  {
    id: 'playgrounds',
    label: 'Playgrounds',
    emoji: '🧪',
    color: '#f59e0b',
    sidebarActive: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    badge: 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
    dot: 'bg-amber-400',
  },
  {
    id: 'design',
    label: 'Design',
    emoji: '🎭',
    color: '#f472b6',
    sidebarActive: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
    badge: 'bg-pink-500/10 text-pink-300 border border-pink-500/20',
    dot: 'bg-pink-400',
  },
  {
    id: 'debugging',
    label: 'Debugging',
    emoji: '🔧',
    color: '#ef4444',
    sidebarActive: 'bg-red-500/10 text-red-300 border-red-500/30',
    badge: 'bg-red-500/10 text-red-300 border border-red-500/20',
    dot: 'bg-red-400',
  },
  {
    id: 'packages',
    label: 'Packages',
    emoji: '📦',
    color: '#6366f1',
    sidebarActive: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    badge: 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20',
    dot: 'bg-indigo-400',
  },
  {
    id: 'hosting',
    label: 'Hosting',
    emoji: '🌐',
    color: '#14b8a6',
    sidebarActive: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    badge: 'bg-teal-500/10 text-teal-300 border border-teal-500/20',
    dot: 'bg-teal-400',
  },
];

export function getCategoryById(id: CategoryId): Category {
  return categories.find((c) => c.id === id)!;
}
