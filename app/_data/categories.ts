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
  color: string;         // Distinct Hex — used for card top band, badge border & glow
  bgColor: string;       // Soft background tint for category badge
  textColor: string;     // Text color for category badge
}

export const categories: Category[] = [
  {
    id: 'deployment',
    label: 'Deployment',
    color: '#6366f1', // Indigo
    bgColor: 'bg-indigo-50 border-indigo-200',
    textColor: 'text-indigo-700',
  },
  {
    id: 'ui-libraries',
    label: 'UI Libraries',
    color: '#8b5cf6', // Violet
    bgColor: 'bg-violet-50 border-violet-200',
    textColor: 'text-violet-700',
  },
  {
    id: 'ai-tools',
    label: 'AI Tools',
    color: '#0284c7', // Sky / Cyan
    bgColor: 'bg-sky-50 border-sky-200',
    textColor: 'text-sky-700',
  },
  {
    id: 'documentation',
    label: 'Documentation',
    color: '#2563eb', // Blue
    bgColor: 'bg-blue-50 border-blue-200',
    textColor: 'text-blue-700',
  },
  {
    id: 'apis-services',
    label: 'APIs & Services',
    color: '#059669', // Emerald
    bgColor: 'bg-emerald-50 border-emerald-200',
    textColor: 'text-emerald-700',
  },
  {
    id: 'playgrounds',
    label: 'Playgrounds',
    color: '#d97706', // Amber
    bgColor: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-700',
  },
  {
    id: 'design',
    label: 'Design',
    color: '#db2777', // Pink
    bgColor: 'bg-pink-50 border-pink-200',
    textColor: 'text-pink-700',
  },
  {
    id: 'debugging',
    label: 'Debugging',
    color: '#e11d48', // Rose
    bgColor: 'bg-rose-50 border-rose-200',
    textColor: 'text-rose-700',
  },
  {
    id: 'packages',
    label: 'Packages',
    color: '#9333ea', // Purple
    bgColor: 'bg-purple-50 border-purple-200',
    textColor: 'text-purple-700',
  },
  {
    id: 'hosting',
    label: 'Hosting',
    color: '#0d9488', // Teal
    bgColor: 'bg-teal-50 border-teal-200',
    textColor: 'text-teal-700',
  },
];

export function getCategoryById(id: CategoryId): Category {
  return categories.find((c) => c.id === id)!;
}
