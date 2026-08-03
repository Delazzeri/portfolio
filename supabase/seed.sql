-- Sample content for local/dev verification (Phase 4). Replace with real
-- project content via the admin once it exists (Phase 6).

insert into public.tags (slug, name_pt, name_en) values
  ('branding', 'Identidade visual', 'Branding'),
  ('editorial', 'Editorial', 'Editorial'),
  ('packaging', 'Embalagem', 'Packaging'),
  ('nextjs', 'Next.js', 'Next.js'),
  ('ai', 'IA', 'AI'),
  ('mobile', 'Mobile', 'Mobile');

insert into public.projects
  (slug, type, title_pt, title_en, description_pt, description_en, cover_image_url, banner_image_url, position)
values
  ('identidade-visual-nimbus', 'design', 'Identidade visual — Nimbus', 'Brand identity — Nimbus',
   'Sistema de identidade para um estúdio de clima e dados, com tipografia variável e paleta baseada em radar meteorológico.',
   'Brand system for a weather-data studio, with a variable typeface and a palette drawn from radar imagery.',
   'https://picsum.photos/seed/nimbus-cover/900/700', 'https://picsum.photos/seed/nimbus-banner/1600/900', 0),
  ('painel-financeiro', 'code', 'Painel financeiro em tempo real', 'Real-time finance dashboard',
   'Dashboard com streaming de cotações via WebSocket, gráficos customizados e cache otimista no cliente.',
   'Dashboard streaming live quotes over WebSocket, custom charts, and optimistic client-side caching.',
   'https://picsum.photos/seed/finance-cover/900/700', 'https://picsum.photos/seed/finance-banner/1600/900', 1),
  ('editorial-terra', 'design', 'Editorial — Revista Terra', 'Editorial — Terra Magazine',
   'Diagramação editorial para uma revista trimestral sobre agricultura regenerativa, com grid modular e tipografia serifada.',
   'Editorial layout for a quarterly magazine on regenerative agriculture, with a modular grid and serif typography.',
   'https://picsum.photos/seed/terra-cover/900/700', 'https://picsum.photos/seed/terra-banner/1600/900', 2),
  ('motor-de-busca-semantica', 'code', 'Motor de busca semântica', 'Semantic search engine',
   'Busca vetorial sobre uma base de artigos técnicos, com embeddings próprios e reranking híbrido.',
   'Vector search over a technical article base, with in-house embeddings and hybrid reranking.',
   'https://picsum.photos/seed/search-cover/900/700', 'https://picsum.photos/seed/search-banner/1600/900', 3),
  ('embalagem-cafe-solar', 'design', 'Embalagem — Café Solar', 'Packaging — Café Solar',
   'Sistema de embalagens para uma torrefação, com ilustração botânica e código de cores por origem do grão.',
   'Packaging system for a coffee roastery, with botanical illustration and a color code per bean origin.',
   'https://picsum.photos/seed/cafe-cover/900/700', 'https://picsum.photos/seed/cafe-banner/1600/900', 4),
  ('app-de-habitos', 'code', 'App de hábitos offline-first', 'Offline-first habit app',
   'App mobile com sincronização offline-first, animações de progresso e widget de tela inicial.',
   'Mobile app with offline-first sync, progress animations, and a home-screen widget.',
   'https://picsum.photos/seed/habits-cover/900/700', 'https://picsum.photos/seed/habits-banner/1600/900', 5);

insert into public.project_images (project_id, image_url, position) values
  ((select id from public.projects where slug = 'identidade-visual-nimbus'), 'https://picsum.photos/seed/nimbus-1/800/600', 0),
  ((select id from public.projects where slug = 'identidade-visual-nimbus'), 'https://picsum.photos/seed/nimbus-2/800/600', 1),
  ((select id from public.projects where slug = 'painel-financeiro'), 'https://picsum.photos/seed/finance-1/800/600', 0),
  ((select id from public.projects where slug = 'editorial-terra'), 'https://picsum.photos/seed/terra-1/800/600', 0),
  ((select id from public.projects where slug = 'editorial-terra'), 'https://picsum.photos/seed/terra-2/800/600', 1),
  ((select id from public.projects where slug = 'editorial-terra'), 'https://picsum.photos/seed/terra-3/800/600', 2),
  ((select id from public.projects where slug = 'motor-de-busca-semantica'), 'https://picsum.photos/seed/search-1/800/600', 0),
  ((select id from public.projects where slug = 'embalagem-cafe-solar'), 'https://picsum.photos/seed/cafe-1/800/600', 0),
  ((select id from public.projects where slug = 'app-de-habitos'), 'https://picsum.photos/seed/habits-1/800/600', 0);

insert into public.project_links (project_id, label, url, type, position) values
  ((select id from public.projects where slug = 'identidade-visual-nimbus'), 'Instagram', '#', 'instagram', 0),
  ((select id from public.projects where slug = 'painel-financeiro'), 'GitHub', '#', 'github', 0),
  ((select id from public.projects where slug = 'painel-financeiro'), 'Vercel', '#', 'vercel', 1),
  ((select id from public.projects where slug = 'editorial-terra'), 'E-book', '#', 'ebook', 0),
  ((select id from public.projects where slug = 'motor-de-busca-semantica'), 'GitHub', '#', 'github', 0),
  ((select id from public.projects where slug = 'embalagem-cafe-solar'), 'Site', '#', 'live_site', 0),
  ((select id from public.projects where slug = 'app-de-habitos'), 'GitHub', '#', 'github', 0),
  ((select id from public.projects where slug = 'app-de-habitos'), 'Live', '#', 'live_site', 1);

insert into public.project_tags (project_id, tag_id) values
  ((select id from public.projects where slug = 'identidade-visual-nimbus'), (select id from public.tags where slug = 'branding')),
  ((select id from public.projects where slug = 'painel-financeiro'), (select id from public.tags where slug = 'nextjs')),
  ((select id from public.projects where slug = 'editorial-terra'), (select id from public.tags where slug = 'editorial')),
  ((select id from public.projects where slug = 'motor-de-busca-semantica'), (select id from public.tags where slug = 'ai')),
  ((select id from public.projects where slug = 'motor-de-busca-semantica'), (select id from public.tags where slug = 'nextjs')),
  ((select id from public.projects where slug = 'embalagem-cafe-solar'), (select id from public.tags where slug = 'packaging')),
  ((select id from public.projects where slug = 'app-de-habitos'), (select id from public.tags where slug = 'mobile'));
