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
  color: string;         // Hex — used for accents and badges
  sidebarActive: string; // Tailwind class string for active state
  badge: string;         // Tailwind class for tag badges
  dot: string;           // Dot color class
}

export const categories: Category[] = [
  {
    id: 'deployment',
    label: 'Deployment',
    color: '#6366f1',
    sidebarActive: 'bg-[#9fa1ff]/15 text-[#4338ca] border-[#9fa1ff]/40',
    badge: 'bg-[#9fa1ff]/15 text-[#4338ca] border border-[#9fa1ff]/30',
    dot: 'bg-[#6366f1]',
  },
  {
    id: 'ui-libraries',
    label: 'UI Libraries',
    color: '#7c7fff',
    sidebarActive: 'bg-[#9fa1ff]/15 text-[#4338ca] border-[#9fa1ff]/40',
    badge: 'bg-[#9fa1ff]/15 text-[#4338ca] border border-[#9fa1ff]/30',
    dot: 'bg-[#7c7fff]',
  },
  {
    id: 'ai-tools',
    label: 'AI Tools',
    color: '#4f46e5',
    sidebarActive: 'bg-[#9fa1ff]/15 text-[#4338ca] border-[#9fa1ff]/40',
    badge: 'bg-[#9fa1ff]/15 text-[#4338ca] border border-[#9fa1ff]/30',
    dot: 'bg-[#4f46e5]',
  },
  {
    id: 'documentation',
    label: 'Documentation',
    color: '#6366f1',
    sidebarActive: 'bg-[#9fa1ff]/15 text-[#4338ca] border-[#9fa1ff]/40',
    badge: 'bg-[#9fa1ff]/15 text-[#4338ca] border border-[#9fa1ff]/30',
    dot: 'bg-[#6366f1]',
  },
  {
    id: 'apis-services',
    label: 'APIs & Services',
    color: '#4338ca',
    sidebarActive: 'bg-[#9fa1ff]/15 text-[#4338ca] border-[#9fa1ff]/40',
    badge: 'bg-[#9fa1ff]/15 text-[#4338ca] border border-[#9fa1ff]/30',
    dot: 'bg-[#4338ca]',
  },
  {
    id: 'playgrounds',
    label: 'Playgrounds',
    color: '#7c7fff',
    sidebarActive: 'bg-[#9fa1ff]/15 text-[#4338ca] border-[#9fa1ff]/40',
    badge: 'bg-[#9fa1ff]/15 text-[#4338ca] border border-[#9fa1ff]/30',
    dot: 'bg-[#7c7fff]',
  },
  {
    id: 'design',
    label: 'Design',
    color: '#818cf8',
    sidebarActive: 'bg-[#9fa1ff]/15 text-[#4338ca] border-[#9fa1ff]/40',
    badge: 'bg-[#9fa1ff]/15 text-[#4338ca] border border-[#9fa1ff]/30',
    dot: 'bg-[#818cf8]',
  },
  {
    id: 'debugging',
    label: 'Debugging',
    color: '#4f46e5',
    sidebarActive: 'bg-[#9fa1ff]/15 text-[#4338ca] border-[#9fa1ff]/40',
    badge: 'bg-[#9fa1ff]/15 text-[#4338ca] border border-[#9fa1ff]/30',
    dot: 'bg-[#4f46e5]',
  },
  {
    id: 'packages',
    label: 'Packages',
    color: '#6366f1',
    sidebarActive: 'bg-[#9fa1ff]/15 text-[#4338ca] border-[#9fa1ff]/40',
    badge: 'bg-[#9fa1ff]/15 text-[#4338ca] border border-[#9fa1ff]/30',
    dot: 'bg-[#6366f1]',
  },
  {
    id: 'hosting',
    label: 'Hosting',
    color: '#7c7fff',
    sidebarActive: 'bg-[#9fa1ff]/15 text-[#4338ca] border-[#9fa1ff]/40',
    badge: 'bg-[#9fa1ff]/15 text-[#4338ca] border border-[#9fa1ff]/30',
    dot: 'bg-[#7c7fff]',
  },
];

export function getCategoryById(id: CategoryId): Category {
  return categories.find((c) => c.id === id)!;
}
