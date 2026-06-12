'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../lib/supabase/client';
import AdminModal from './AdminModal';

const empty = {
  name: '', category: '', preview_image_url: '',
  features: '', demo_url: '', is_active: true, display_order: 0,
};

export default function CatalogManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const supabase = createClient();

  const load = async () => {
    const { data } = await supabase.from('catalog_themes').select('*').order('display_order');
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setError(''); setShowForm(true); };
  const openEdit = (item) => {
    setForm({ ...item, features: (item.features ?? []).join('\n') });
    setEditId(item.id);
    setError('');
    setShowForm(true);
  };
  const cancel = () => { setShowForm(false); setEditId(null); setError(''); };

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('catalog-previews').upload(fileName, file, { upsert: true });
    if (error) { setError('Upload gagal: ' + error.message); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from('catalog-previews').getPublicUrl(fileName);
    setForm(f => ({ ...f, preview_image_url: publicUrl }));
    setUploading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      features: form.features.split('\n').map(s => s.trim()).filter(Boolean),
      display_order: Number(form.display_order),
    };
    delete payload.id;
    delete payload.created_at;

    const { error } = editId
      ? await supabase.from('catalog_themes').update(payload).eq('id', editId)
      : await supabase.from('catalog_themes').insert(payload);

    if (error) { setError(error.message); }
    else { await load(); cancel(); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus tema ini?')) return;
    await supabase.from('catalog_themes').delete().eq('id', id);
    await load();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-300">Catalog Themes</h2>
        {!showForm && (
          <button onClick={openAdd} className="px-4 py-2 text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all">
            + Tambah Tema
          </button>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <AdminModal title={editId ? 'Edit Tema' : 'Tambah Tema'} onClose={cancel}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Nama Tema" required>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} />
            </Field>
            <Field label="Category">
              <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="contoh: Toko Sepatu" className={inputCls} />
            </Field>
            <Field label="Demo URL">
              <input value={form.demo_url} onChange={e => setForm(f => ({ ...f, demo_url: e.target.value }))} className={inputCls} />
            </Field>
            <Field label="Display Order">
              <input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: e.target.value }))} className={inputCls} />
            </Field>
          </div>

          <Field label="Preview Image">
            <input type="file" accept="image/*" onChange={handleImage} className="text-xs text-gray-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:text-xs file:cursor-pointer" />
            {uploading && <span className="text-xs text-emerald-400 mt-1">Uploading...</span>}
            {form.preview_image_url && <input value={form.preview_image_url} onChange={e => setForm(f => ({ ...f, preview_image_url: e.target.value }))} className={`${inputCls} mt-2 text-xs`} placeholder="atau isi URL manual" />}
            {!form.preview_image_url && <input value={form.preview_image_url} onChange={e => setForm(f => ({ ...f, preview_image_url: e.target.value }))} className={`${inputCls} mt-2 text-xs`} placeholder="atau isi URL manual" />}
          </Field>

          <Field label="Features (satu per baris)">
            <textarea rows={4} value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} className={`${inputCls} resize-none`} placeholder={'Responsive Design\nFast Loading\nSEO Ready'} />
          </Field>

          <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
            <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} className="accent-emerald-500" />
            Aktif (tampil di /catalog)
          </label>

          {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" disabled={saving || uploading} className="px-6 py-2 bg-emerald-500 text-black text-xs font-bold rounded-xl hover:bg-emerald-400 transition-all disabled:opacity-50">
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button type="button" onClick={cancel} className="px-6 py-2 bg-white/5 border border-white/10 text-xs rounded-xl hover:border-white/20 transition-all">
              Batal
            </button>
          </div>
        </form>
        </AdminModal>
      )}

      {/* List */}
      <div className="flex flex-col gap-2">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-5 py-4 gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {item.preview_image_url && (
                <img src={item.preview_image_url} alt={item.name} className="w-12 h-8 object-cover rounded-lg shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-gray-500">{item.category || '—'} · order: {item.display_order} · {item.is_active ? <span className="text-emerald-500">aktif</span> : <span className="text-gray-600">nonaktif</span>}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(item)} className="px-3 py-1.5 text-xs border border-white/10 rounded-lg hover:border-white/20 transition-all">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 text-xs border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition-all">Hapus</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-gray-600 py-4 text-center">Belum ada tema.</p>}
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
