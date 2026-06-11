-- ============================================================
-- sep-porto — Database Schema
-- Jalankan file ini di Supabase Dashboard → SQL Editor
-- ============================================================


-- ------------------------------------------------------------
-- 1. TABEL projects
-- ------------------------------------------------------------
CREATE TABLE projects (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title         varchar NOT NULL,
  position      varchar,
  tech          varchar,
  color         varchar,
  links         jsonb DEFAULT '[]',
  description   text,
  detail        text,
  status        varchar DEFAULT 'Active Dev',
  periode       varchar,
  display_order integer DEFAULT 0,
  is_visible    boolean DEFAULT true,
  created_at    timestamptz DEFAULT now()
);


-- ------------------------------------------------------------
-- 2. TABEL skills
-- ------------------------------------------------------------
CREATE TABLE skills (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category      varchar NOT NULL CHECK (category IN ('frontend', 'backend', 'tools', 'practices')),
  name          varchar NOT NULL,
  display_order integer DEFAULT 0,
  created_at    timestamptz DEFAULT now()
);


-- ------------------------------------------------------------
-- 3. TABEL profile_content
-- Key-value store untuk semua teks profil
-- ------------------------------------------------------------
CREATE TABLE profile_content (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key        varchar UNIQUE NOT NULL,
  value      text,
  updated_at timestamptz DEFAULT now()
);


-- ------------------------------------------------------------
-- 4. TABEL social_links
-- ------------------------------------------------------------
CREATE TABLE social_links (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  platform      varchar NOT NULL,
  url           varchar NOT NULL,
  icon_key      varchar,
  is_active     boolean DEFAULT true,
  display_order integer DEFAULT 0
);


-- ------------------------------------------------------------
-- 5. TABEL catalog_themes
-- ------------------------------------------------------------
CREATE TABLE catalog_themes (
  id                uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name              varchar NOT NULL,
  preview_image_url varchar,
  features          text[] DEFAULT '{}',
  demo_url          varchar,
  is_active         boolean DEFAULT true,
  display_order     integer DEFAULT 0,
  created_at        timestamptz DEFAULT now()
);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE projects       ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills         ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links   ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalog_themes ENABLE ROW LEVEL SECURITY;

-- Public: semua orang bisa READ
CREATE POLICY "public_read" ON projects       FOR SELECT USING (true);
CREATE POLICY "public_read" ON skills         FOR SELECT USING (true);
CREATE POLICY "public_read" ON profile_content FOR SELECT USING (true);
CREATE POLICY "public_read" ON social_links   FOR SELECT USING (true);
CREATE POLICY "public_read" ON catalog_themes FOR SELECT USING (true);

-- Admin: user yang sudah login bisa INSERT, UPDATE, DELETE
CREATE POLICY "admin_write" ON projects       FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "admin_write" ON skills         FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "admin_write" ON profile_content FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "admin_write" ON social_links   FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "admin_write" ON catalog_themes FOR ALL USING (auth.uid() IS NOT NULL);
