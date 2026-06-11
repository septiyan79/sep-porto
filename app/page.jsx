import { createClient } from '../lib/supabase/server';
import DashboardClient from '../components/DashboardClient';

export const revalidate = 3600;

export default async function Page() {
  const supabase = await createClient();

  const [
    { data: projects },
    { data: skillRows },
    { data: profileRows },
    { data: socialLinks },
  ] = await Promise.all([
    supabase.from('projects').select('*').eq('is_visible', true).order('display_order'),
    supabase.from('skills').select('*').order('display_order'),
    supabase.from('profile_content').select('key, value'),
    supabase.from('social_links').select('*').eq('is_active', true).order('display_order'),
  ]);

  const profile = Object.fromEntries((profileRows ?? []).map(r => [r.key, r.value]));

  // Parse JSON array fields stored as text
  ['what_i_bring', 'professional_strength', 'career_objective'].forEach(key => {
    if (profile[key]) {
      try { profile[key] = JSON.parse(profile[key]); } catch { profile[key] = []; }
    }
  });

  const skills = {
    frontend:  skillRows?.filter(s => s.category === 'frontend').map(s => s.name)  ?? [],
    backend:   skillRows?.filter(s => s.category === 'backend').map(s => s.name)   ?? [],
    tools:     skillRows?.filter(s => s.category === 'tools').map(s => s.name)     ?? [],
    practices: skillRows?.filter(s => s.category === 'practices').map(s => s.name) ?? [],
  };

  return (
    <DashboardClient
      projects={projects ?? []}
      skills={skills}
      profile={profile}
      socialLinks={socialLinks ?? []}
    />
  );
}
