'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../lib/supabase/client';
import AdminModal from './AdminModal';

const empty = { platform: '', url: '', icon_key: '', is_active: true, display_order: 0 };

export default function SocialLinksManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const supabase = createClient();

  const load = async () => {
    const { data } = await supabase.from('social_links').select('*').order('display_order');
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setError(''); setShowForm(true); };
  const openEdit = (item) => { setForm({ platform: item.platform, url: item.url, icon_key: item.icon_key ?? '', is_active: item.is_active, display_order: item.display_order }); setEditId(item.id); setError(''); setShowForm(true); };
  const cancel = () => { setShowForm(false); setEditId(null); setError(''); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = { ...form, display_order: Number(form.display_order) };

    const { error } = editId
      ? await supabase.from('social_links').update(payload).eq('id', editId)
      : await supabase.from('social_links').insert(payload);

    if (error) { setError(error.message); }
    else { await load(); cancel(); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus social link ini?')) return;
    await supabase.from('social_links').delete().eq('id', id);
    await load();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-300">Social Links</h2>
        {!showForm && (
          <button onClick={openAdd} className="px-4 py-2 text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all">
            + Tambah Link
          </button>
        )}
      </div>

      {showForm && (
        <AdminModal title={editId ? 'Edit Link' : 'Tambah Link'} onClose={cancel}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Platform" required>
              <input required value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))} placeholder="GitHub" className={inputCls} />
            </Field>
            <Field label="URL" required>
              <input required value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." className={inputCls} />
            </Field>
            <Field label="Icon Key">
              <input value={form.icon_key} onChange={e => setForm(f => ({ ...f, icon_key: e.target.value }))} placeholder="FaGithub" className={inputCls} />
            </Field>
            <Field label="Display Order">
              <input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: e.target.value }))} className={inputCls} />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
            <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} className="accent-emerald-500" />
            Aktif (tampil di hero)
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
              <p className="text-sm font-medium">{item.platform}</p>
              <p className="text-xs text-gray-500 truncate">{item.url} · {item.icon_key} · {item.is_active ? <span className="text-emerald-500">aktif</span> : <span className="text-gray-600">nonaktif</span>}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(item)} className="px-3 py-1.5 text-xs border border-white/10 rounded-lg hover:border-white/20 transition-all">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 text-xs border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition-all">Hapus</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-gray-600 py-4 text-center">Belum ada social link.</p>}
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
