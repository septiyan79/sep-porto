'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../lib/supabase/client';
import AdminModal from './AdminModal';

const empty = {
  title: '', position: '', tech: '', color: '', links: '[]',
  description: '', detail: '', status: 'Active Dev', periode: '',
  display_order: 0, is_visible: true,
};

export default function ProjectsManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const supabase = createClient();

  const load = async () => {
    const { data } = await supabase.from('projects').select('*').order('display_order');
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setError(''); setShowForm(true); };
  const openEdit = (item) => {
    setForm({ ...item, links: JSON.stringify(item.links ?? [], null, 2) });
    setEditId(item.id);
    setError('');
    setShowForm(true);
  };
  const cancel = () => { setShowForm(false); setEditId(null); setError(''); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    let links;
    try { links = JSON.parse(form.links); }
    catch { setError('Format Links harus JSON yang valid.'); setSaving(false); return; }

    const payload = { ...form, links, display_order: Number(form.display_order) };
    delete payload.id;
    delete payload.created_at;

    const { error } = editId
      ? await supabase.from('projects').update(payload).eq('id', editId)
      : await supabase.from('projects').insert(payload);

    if (error) { setError(error.message); }
    else { await load(); cancel(); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus proyek ini?')) return;
    await supabase.from('projects').delete().eq('id', id);
    await load();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-300">Projects</h2>
        {!showForm && (
          <button onClick={openAdd} className="px-4 py-2 text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all">
            + Tambah Proyek
          </button>
        )}
      </div>

      {showForm && (
        <AdminModal title={editId ? 'Edit Proyek' : 'Tambah Proyek'} onClose={cancel}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Judul" required>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inputCls} />
            </Field>
            <Field label="Position">
              <input value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} className={inputCls} />
            </Field>
            <Field label="Tech Stack">
              <input value={form.tech} onChange={e => setForm(f => ({ ...f, tech: e.target.value }))} placeholder="React · Firebase · TailwindCSS" className={inputCls} />
            </Field>
            <Field label="Gradient Color">
              <input value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} placeholder="from-violet-600 to-indigo-400" className={inputCls} />
            </Field>
            <Field label="Status">
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className={inputCls}>
                <option value="Active Dev" className="bg-neutral-900">Active Dev</option>
                <option value="Complete" className="bg-neutral-900">Complete</option>
              </select>
            </Field>
            <Field label="Periode">
              <input value={form.periode} onChange={e => setForm(f => ({ ...f, periode: e.target.value }))} placeholder="JAN 2026 - PRESENT" className={inputCls} />
            </Field>
            <Field label="Display Order">
              <input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: e.target.value }))} className={inputCls} />
            </Field>
          </div>

          <Field label='Links (JSON) — contoh: [{"type":"github","url":"https://..."}]'>
            <textarea rows={3} value={form.links} onChange={e => setForm(f => ({ ...f, links: e.target.value }))} className={`${inputCls} resize-none font-mono text-xs`} />
          </Field>

          <Field label="Deskripsi Singkat (tampil di kartu)">
            <textarea rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={`${inputCls} resize-none`} />
          </Field>

          <Field label="Detail (tampil di modal)">
            <textarea rows={4} value={form.detail} onChange={e => setForm(f => ({ ...f, detail: e.target.value }))} className={`${inputCls} resize-none`} />
          </Field>

          <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
            <input type="checkbox" checked={form.is_visible} onChange={e => setForm(f => ({ ...f, is_visible: e.target.checked }))} className="accent-emerald-500" />
            Tampilkan di halaman /
          </label>

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

      <div className="flex flex-col gap-2">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-5 py-4 gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{item.title}</p>
              <p className="text-xs text-gray-500 truncate">{item.tech} · {item.status} · order: {item.display_order} · {item.is_visible ? <span className="text-emerald-500">tampil</span> : <span className="text-gray-600">disembunyikan</span>}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(item)} className="px-3 py-1.5 text-xs border border-white/10 rounded-lg hover:border-white/20 transition-all">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 text-xs border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition-all">Hapus</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-gray-600 py-4 text-center">Belum ada proyek.</p>}
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
