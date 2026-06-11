import { createClient } from '../../lib/supabase/server';
import Background from '../../components/Background';
import Sidebar from '../../components/Sidebar';
import CatalogClient from '../../components/CatalogClient';

export const revalidate = 3600;

export default async function CatalogPage() {
  const supabase = await createClient();

  const [{ data: themes }, { data: socialLinks }] = await Promise.all([
    supabase.from('catalog_themes').select('*').eq('is_active', true).order('display_order'),
    supabase.from('social_links').select('*').eq('is_active', true),
  ]);

  const waLink = socialLinks?.find(s => s.icon_key === 'FaWhatsapp')?.url ?? '#';

  return (
    <>
      <Background />
      <Sidebar />
      <CatalogClient themes={themes ?? []} waLink={waLink} />
    </>
  );
}
