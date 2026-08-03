'use client';

import { useState } from 'react';
import { categories, CategoryId } from '../_data/categories';
import type { Tool } from '../_data/tools';

interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTool: (tool: Tool) => void;
}

export default function AddToolModal({ isOpen, onClose, onAddTool }: AddToolModalProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryId>('ui-libraries');
  const [tagsInput, setTagsInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    onAddTool({
      id: `custom-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || 'Community-submitted developer resource.',
      url: url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`,
      category,
      tags: tags.length ? tags : ['Tool'],
      avatar: name.trim().slice(0, 2).toUpperCase(),
      isNew: true,
      isFeatured: false,
    });
    setName(''); setUrl(''); setDescription(''); setTagsInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-base shadow-md shadow-orange-500/30">
              ⚡
            </div>
            <h2 className="text-base font-black text-zinc-900">Submit a Tool</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700 text-sm transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Field label="Tool Name *">
            <input
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Supabase, Bun, Zod"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors"
            />
          </Field>
          <Field label="Website URL *">
            <input
              type="url" required value={url} onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors"
            />
          </Field>
          <Field label="Category">
            <select
              value={category} onChange={(e) => setCategory(e.target.value as CategoryId)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-900 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.emoji} {cat.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Short Description">
            <textarea
              rows={2} value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this tool do? One or two sentences."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors resize-none"
            />
          </Field>
          <Field label="Tags (comma separated)">
            <input
              type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)}
              placeholder="React, TypeScript, REST"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors"
            />
          </Field>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button" onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-full shadow-md shadow-orange-500/30 transition-all active:scale-95"
            >
              Submit Tool →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
