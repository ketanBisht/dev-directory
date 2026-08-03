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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#6366f1] flex items-center justify-center text-white text-xs shadow-md shadow-[#9fa1ff]/30">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-slate-900">Submit a Resource</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-700 text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Field label="Resource Name *">
            <input
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Supabase, Bun, Zod"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#9fa1ff]/20 transition-all"
            />
          </Field>
          <Field label="Website URL *">
            <input
              type="url" required value={url} onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#9fa1ff]/20 transition-all"
            />
          </Field>
          <Field label="Category">
            <select
              value={category} onChange={(e) => setCategory(e.target.value as CategoryId)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:border-[#6366f1] transition-all"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Short Description">
            <textarea
              rows={2} value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this resource do? Brief overview."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#9fa1ff]/20 transition-all resize-none"
            />
          </Field>
          <Field label="Tags (comma separated)">
            <input
              type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)}
              placeholder="React, TypeScript, REST"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#9fa1ff]/20 transition-all"
            />
          </Field>

          <div className="flex items-center justify-end gap-2.5 pt-3">
            <button
              type="button" onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#6366f1] hover:bg-[#4f46e5] rounded-full shadow-md shadow-[#9fa1ff]/30 transition-all active:scale-95"
            >
              Submit Resource
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
      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
