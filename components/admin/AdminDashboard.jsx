'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';
import CatalogManager from './CatalogManager';
import ProjectsManager from './ProjectsManager';
import SkillsManager from './SkillsManager';
import ProfileManager from './ProfileManager';
import SocialLinksManager from './SocialLinksManager';

const tabs = [
  { id: 'catalog',  label: 'Catalog Themes' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills',   label: 'Skills' },
  { id: 'profile',  label: 'Profile Content' },
  { id: 'social',   label: 'Social Links' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('catalog');

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-mono text-emerald-500 tracking-widest uppercase">sep-porto</p>
          <h1 className="text-2xl font-bold tracking-tighter">Admin Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-xs font-mono border border-white/10 rounded-xl hover:border-red-500/40 hover:text-red-400 transition-all"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-2 flex-wrap mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'catalog'  && <CatalogManager />}
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'skills'   && <SkillsManager />}
          {activeTab === 'profile'  && <ProfileManager />}
          {activeTab === 'social'   && <SocialLinksManager />}
        </div>
      </div>
    </div>
  );
}
