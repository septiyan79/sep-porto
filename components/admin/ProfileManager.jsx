'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../lib/supabase/client';

export default function ProfileManager() {
  const [rows, setRows] = useState([]);
  const [edited, setEdited] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const supabase = createClient();

  const load = async () => {
    const { data } = await supabase.from('profile_content').select('*').order('key');
    setRows(data ?? []);
    setEdited({});
  };

  useEffect(() => { load(); }, []);

  const handleChange = (key, value) => {
    setEdited(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const keys = Object.keys(edited);
    for (const key of keys) {
      await supabase.from('profile_content').update({ value: edited[key] }).eq('key', key);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    await load();
  };

  const hasChanges = Object.keys(edited).length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-300">Profile Content</h2>
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className="px-4 py-2 text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? 'Menyimpan...' : saved ? 'Tersimpan ✓' : 'Simpan Perubahan'}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {rows.map(row => {
          const value = edited[row.key] !== undefined ? edited[row.key] : (row.value ?? '');
          const isLong = value.length > 100 || row.key.includes('bio') || row.key.includes('objective') || row.key.includes('strength') || row.key.includes('bring');
          return (
            <div key={row.key} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1.5">
              <label className="text-xs font-mono text-emerald-500 uppercase tracking-widest">{row.key}</label>
              {isLong ? (
                <textarea
                  rows={4}
                  value={value}
                  onChange={e => handleChange(row.key, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-500/50 transition-colors resize-none"
                />
              ) : (
                <input
                  value={value}
                  onChange={e => handleChange(row.key, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-500/50 transition-colors"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
