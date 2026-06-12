'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../lib/supabase/client';
import AdminModal from './AdminModal';

const CATEGORIES = ['frontend', 'backend', 'tools', 'practices'];
const empty = { name: '', category: 'frontend', display_order: 0 };

export default function SkillsManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const supabase = createClient();

  const load = async () => {
    const { data } = await supabase.from('skills').select('*').order('category').order('display_order');
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setError(''); setShowForm(true); };
  const openEdit = (item) => { setForm({ name: item.name, category: item.category, display_order: item.display_order }); setEditId(item.id); setError(''); setShowForm(true); };
  const cancel = () => { setShowForm(false); setEditId(null); setError(''); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = { ...form, display_order: Number(form.display_order) };

    const { error } = editId
      ? await supabase.from('skills').update(payload).eq('id', editId)
      : await supabase.from('skills').insert(payload);

    if (error) { setError(error.message); }
    else { await load(); cancel(); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus skill ini?')) return;
    await supabase.from('skills').delete().eq('id', id);
    await load();
  };

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = items.filter(s => s.category === cat);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-300">Skills</h2>
        {!showForm && (
          <button onClick={openAdd} className="px-4 py-2 text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all">
            + Tambah Skill
          </button>
        )}
      </div>

      {showForm && (
        <AdminModal title={editId ? 'Edit Skill' : 'Tambah Skill'} onClose={cancel}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Nama Skill" required>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} />
            </Field>
            <Field label="Category">
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={inputCls}>
                {CATEGORIES.map(c => <option key={c} value={c} className="bg-neutral-900">{c}</option>)}
              </select>
            </Field>
            <Field label="Display Order">
              <input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: e.target.value }))} className={inputCls} />
            </Field>
          </div>
          {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-6 py-2 bg-emerald-500 text-black text-xs font-bold rounded-xl hover:bg-emerald-400 transition-all disabled:opacity-50">
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button type="button" onClick={cancel} className="px-6 py-2 bg-white/5 border border-white/10 text-xs rounded-xl hover:border-white/20 transition-all">
              Batal
            </button>
          </div>
        </form>
        </AdminModal>
      )}

      {/* Grouped by category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORIES.map(cat => (
          <div key={cat} className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs font-mono text-emerald-500 uppercase tracking-widest mb-3">{cat}</p>
            <div className="flex flex-col gap-1.5">
              {grouped[cat].map(skill => (
                <div key={skill.id} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-300">{skill.name}</span>
                  <div className="flex gap-1.5 shrink-0">
                    <button onClick={() => openEdit(skill)} className="px-2 py-1 text-[10px] border border-white/10 rounded-lg hover:border-white/20 transition-all">Edit</button>
                    <button onClick={() => handleDelete(skill.id)} className="px-2 py-1 text-[10px] border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition-all">×</button>
                  </div>
                </div>
              ))}
              {grouped[cat].length === 0 && <p className="text-xs text-gray-600">Kosong</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputCls = 'w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500/50 transition-colors';
const Field = ({ label, children, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">{label}{required && ' *'}</label>
    {children}
  </div>
);
