-- ============================================================
-- sep-porto — Seed Data
-- Jalankan file ini SETELAH schema.sql di Supabase SQL Editor
-- ============================================================


-- ------------------------------------------------------------
-- projects (8 rows)
-- ------------------------------------------------------------
INSERT INTO projects (title, position, tech, color, links, description, detail, status, periode, display_order, is_visible) VALUES
(
  'Wisel Portal',
  'Fullstack Developer (Modern Web Stack)',
  'Next.js · PostgreSQL · NextAuth.js · TailwindCSS · Vercel',
  'from-violet-600 to-indigo-400',
  '[{"type":"github","url":"https://github.com/septiyan79/wisel-portal"},{"type":"web","url":"https://wisel-portal.vercel.app/landing"}]',
  'Fullstack Next.js app with SSR, PostgreSQL, NextAuth.js authentication, and Vercel CI/CD deployment.',
  'A fullstack web application built with Next.js and PostgreSQL (Neon), implementing server-side rendering (SSR) to improve page load performance by ~30% and enhance SEO readiness. Features secure authentication with NextAuth.js, a structured relational database schema, and CI/CD deployment via Vercel reducing deployment time by ~50%.',
  'Active Dev',
  'MAR 2026 - PRESENT',
  1, true
),
(
  'Pixel Prigel',
  'Fullstack Developer (Serverless Architecture)',
  'React · Firebase · Firestore · TailwindCSS · Cloudinary',
  'from-lime-600 to-orange-400',
  '[{"type":"github","url":"https://github.com/septiyan79/pixel-prigel"},{"type":"web","url":"https://pixel-prigel.web.app/"}]',
  'Serverless digital sticker marketplace built with React, Firebase, and Cloudinary for optimized image delivery.',
  'A scalable digital product platform built with React.js, Firebase, and Firestore, transforming a static landing concept into a fully functional marketplace for digital sticker products. Integrated Cloudinary for image optimization reducing load time by ~30%. Improved content management efficiency by up to 80% through serverless architecture.',
  'Active Dev',
  'JAN 2026 - PRESENT',
  2, true
),
(
  'LPE Hub',
  'Fullstack Developer (Serverless Architecture)',
  'React · Firebase · Firestore · TailwindCSS',
  'from-purple-600 to-pink-500',
  '[{"type":"github","url":"https://github.com/septiyan79/lpe-hub.git"}]',
  'Internal tool digitizing workflows for activity planning, reporting, and employee administrative requests.',
  'An internal operational web application (License & Permit Expatriate Hub) digitizing department workflows for activity planning, reporting, and employee administrative requests. Improved task tracking efficiency by ~60% and reduced manual documentation workload by ~50% through structured Firestore data management.',
  'Active Dev',
  'JAN 2026 - PRESENT',
  3, true
),
(
  'Clemira Gold',
  'Fullstack Developer (Serverless Architecture)',
  'React · Firebase · Firestore · Bootstrap',
  'from-cyan-600 to-rose-500',
  '[{"type":"github","url":"https://github.com/septiyan79/clemira-gold"},{"type":"web","url":"https://clemira-gold.vercel.app/"}]',
  'Real-time gold inventory and transaction system with role-based access and structured Firestore data models.',
  'A fullstack real-time inventory and transaction management system for gold products, replacing manual tracking and reducing inventory discrepancies by ~45%. Features structured Firestore data models for products and transactions, role-based access control, and real-time synchronization improving operational visibility by ~40%.',
  'Active Dev',
  'AUG 2025 - PRESENT',
  4, true
),
(
  'HIS (HRCA Information System)',
  'Fullstack Web Developer (Monolithic App)',
  'PHP · CodeIgniter · Bootstrap · SQL Server',
  'from-emerald-600 to-teal-400',
  '[{"type":"gitlab","url":"https://gitlab.com/septyan_ep/his-live.git"}]',
  'Internal HRCA system digitizing employee health-related administrative workflows with PHP, CodeIgniter, and SQL Server.',
  'A comprehensive internal HRCA Information System built with PHP (CodeIgniter) and SQL Server, digitizing administrative workflows and improving operational efficiency by ~50%. Implemented data management and reporting modules reducing manual record processing time by ~40% and optimizing database query performance by ~30%.',
  'Complete',
  'JAN 2021 - DEC 2023',
  5, true
),
(
  'Kaizen Tournament Score System',
  'Fullstack Web Developer (Monolithic App)',
  'PHP · CodeIgniter · Bootstrap · MySQL',
  'from-rose-600 to-emerald-400',
  '[]',
  'Tournament scoring system automating ranking calculations and reducing manual score errors by ~70%.',
  'A web-based tournament scoring system automating match result recording, ranking calculations, and score management. Implemented backend logic to automatically calculate rankings, reducing manual calculation errors by ~70% and cutting score processing time by ~60% compared to manual methods.',
  'Complete',
  'SEP 2022 - DEC 2022',
  6, true
),
(
  'Kaizen Filing System',
  'Fullstack Web Developer (Monolithic App)',
  'PHP · HTML · Bootstrap · CSS · JavaScript · MySQL',
  'from-yellow-600 to-green-400',
  '[]',
  'Document filing system with search and categorization, improving internal document retrieval speed by ~50%.',
  'A web-based document filing system enabling digital storage, categorization, and retrieval of internal documents. Implemented search and filtering features improving document retrieval speed by ~50% and digitizing manual filing processes to reduce the risk of data loss or duplication.',
  'Complete',
  'JAN 2020 - JUN 2020',
  7, true
),
(
  'E-Learning for Elementary School',
  'Fullstack Web Developer (Monolithic App)',
  'Telegram Bot · PHP · CodeIgniter · Bootstrap · MySQL',
  'from-blue-600 to-teal-400',
  '[]',
  'Telegram Bot–based e-learning platform for elementary students with materials, assignments, and automated assessments.',
  'A Telegram Bot–based digital learning platform supporting elementary school students with course materials, assignment management, and automated assessments. Integrated Telegram Bot notifications improving teacher-student communication and enabling digital access to learning materials outside the classroom.',
  'Complete',
  'OCT 2018 - DEC 2019',
  8, true
);


-- ------------------------------------------------------------
-- skills (36 rows)
-- ------------------------------------------------------------

-- Frontend (12)
INSERT INTO skills (category, name, display_order) VALUES
('frontend', 'React.js', 1),
('frontend', 'Next.js (App Router)', 2),
('frontend', 'JavaScript (ES6+)', 3),
('frontend', 'TypeScript', 4),
('frontend', 'Vite', 5),
('frontend', 'HTML5', 6),
('frontend', 'CSS3', 7),
('frontend', 'Tailwind CSS', 8),
('frontend', 'Bootstrap', 9),
('frontend', 'shadcn/ui', 10),
('frontend', 'Responsive Web Design', 11),
('frontend', 'Component-Based Architecture', 12);

-- Backend (11)
INSERT INTO skills (category, name, display_order) VALUES
('backend', 'Firebase', 1),
('backend', 'Firestore', 2),
('backend', 'REST API Integration', 3),
('backend', 'PHP (CodeIgniter)', 4),
('backend', 'Node.js (basic)', 5),
('backend', 'MySQL', 6),
('backend', 'SQL Server', 7),
('backend', 'PostgreSQL', 8),
('backend', 'Prisma ORM', 9),
('backend', 'NextAuth.js', 10),
('backend', 'Database Design', 11);

-- Tools (8)
INSERT INTO skills (category, name, display_order) VALUES
('tools', 'Git & GitHub', 1),
('tools', 'NPM', 2),
('tools', 'Yarn', 3),
('tools', 'Vite', 4),
('tools', 'Apache Server', 5),
('tools', 'Vercel', 6),
('tools', 'Postman', 7),
('tools', 'Firebase Hosting', 8);

-- Practices (5)
INSERT INTO skills (category, name, display_order) VALUES
('practices', 'Clean Code', 1),
('practices', 'Modular Architecture', 2),
('practices', 'Performance Optimization', 3),
('practices', 'Debugging', 4),
('practices', 'Problem Solving', 5);


-- ------------------------------------------------------------
-- profile_content
-- ------------------------------------------------------------
INSERT INTO profile_content (key, value) VALUES
('hero_name', 'Septiyan E.P.'),
('hero_badge_role', 'FULLSTACK DEVELOPER'),
('hero_badge_stack', 'REACT · NEXT.JS · FIREBASE'),
('hero_badge_mindset', 'BUSINESS-ORIENTED SYSTEM THINKER'),
('hero_bio', 'Fullstack Web Developer with 5+ years of experience building business-oriented web applications and internal systems. Experienced in developing end-to-end solutions using React, Next.js, Firebase, and PHP-based backend systems (CodeIgniter) — including database design, API integration, and authentication workflows. Proven track record delivering real-world applications such as inventory systems, internal operational tools, and transaction platforms, with a focus on scalable architecture, data management, and practical solutions for business processes.'),
('hero_quote', 'I don''t just write code. I build end-to-end, business-driven systems.'),
('hero_location', 'Jakarta, Indonesia'),
('hero_timezone', 'UTC +7'),
('hero_availability', 'Available for projects'),
('what_i_bring_subtitle', 'Coming from a non-traditional tech background gives me a unique advantage:'),
('what_i_bring', '["Clean and maintainable React architecture","Strong Firestore data modeling","Role-based authentication implementation","Business flow translated into structured digital systems","Production-oriented mindset"]'),
('professional_strength_subtitle', 'Coming from a non-traditional tech background gives me a unique advantage:'),
('professional_strength', '["Strong business awareness","Risk-oriented thinking","Structured documentation habits","Cross-functional communication experience","Long-term system perspective"]'),
('professional_strength_footnote', 'I understand that software is not just about features — it is about stability, scalability, and business impact.'),
('career_objective_subtitle', 'I am currently open to:'),
('career_objective', '["Remote Fullstack Developer roles","Junior to Mid-level React / Next.js positions","Startup or product-based environments","Contract-to-hire opportunities","Freelance web development projects"]'),
('career_objective_footnote', 'I am open to freelance engagements — whether short-term builds, ongoing collaboration, or consulting on system architecture. Let''s build something together.');


-- ------------------------------------------------------------
-- social_links
-- ------------------------------------------------------------
INSERT INTO social_links (platform, url, icon_key, is_active, display_order) VALUES
('GitHub',    'https://github.com/septiyan79',                     'FaGithub',      true, 1),
('LinkedIn',  'https://www.linkedin.com/in/septiyan-eka-5b59a0257','FaLinkedinIn',  true, 2),
('WhatsApp',  'https://wa.me/6281803986390',                       'FaWhatsapp',    true, 3);
