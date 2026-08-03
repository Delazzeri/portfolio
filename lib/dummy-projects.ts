import type { Project } from './types';

function cover(seed: string) {
  return `https://picsum.photos/seed/${seed}/900/700`;
}

export const dummyProjects: Project[] = [
  {
    id: '1',
    slug: 'identidade-visual-nimbus',
    type: 'design',
    titlePt: 'Identidade visual — Nimbus',
    titleEn: 'Brand identity — Nimbus',
    descriptionPt:
      'Sistema de identidade para um estúdio de clima e dados, com tipografia variável e paleta baseada em radar meteorológico.',
    descriptionEn:
      'Brand system for a weather-data studio, with a variable typeface and a palette drawn from radar imagery.',
    coverImageUrl: cover('nimbus-cover'),
    bannerImageUrl: cover('nimbus-banner'),
    position: 0,
    published: true,
    images: [
      { id: '1-1', imageUrl: cover('nimbus-1'), position: 0 },
      { id: '1-2', imageUrl: cover('nimbus-2'), position: 1 },
    ],
    links: [{ id: '1-l1', label: 'Instagram', url: '#', type: 'instagram' }],
    tags: [{ id: 't-branding', namePt: 'Identidade visual', nameEn: 'Branding', slug: 'branding' }],
  },
  {
    id: '2',
    slug: 'painel-financeiro',
    type: 'code',
    titlePt: 'Painel financeiro em tempo real',
    titleEn: 'Real-time finance dashboard',
    descriptionPt:
      'Dashboard com streaming de cotações via WebSocket, gráficos customizados e cache otimista no cliente.',
    descriptionEn:
      'Dashboard streaming live quotes over WebSocket, custom charts, and optimistic client-side caching.',
    coverImageUrl: cover('finance-cover'),
    bannerImageUrl: cover('finance-banner'),
    position: 1,
    published: true,
    images: [{ id: '2-1', imageUrl: cover('finance-1'), position: 0 }],
    links: [
      { id: '2-l1', label: 'GitHub', url: '#', type: 'github' },
      { id: '2-l2', label: 'Vercel', url: '#', type: 'vercel' },
    ],
    tags: [{ id: 't-nextjs', namePt: 'Next.js', nameEn: 'Next.js', slug: 'nextjs' }],
  },
  {
    id: '3',
    slug: 'editorial-terra',
    type: 'design',
    titlePt: 'Editorial — Revista Terra',
    titleEn: 'Editorial — Terra Magazine',
    descriptionPt:
      'Diagramação editorial para uma revista trimestral sobre agricultura regenerativa, com grid modular e tipografia serifada.',
    descriptionEn:
      'Editorial layout for a quarterly magazine on regenerative agriculture, with a modular grid and serif typography.',
    coverImageUrl: cover('terra-cover'),
    bannerImageUrl: cover('terra-banner'),
    position: 2,
    published: true,
    images: [
      { id: '3-1', imageUrl: cover('terra-1'), position: 0 },
      { id: '3-2', imageUrl: cover('terra-2'), position: 1 },
      { id: '3-3', imageUrl: cover('terra-3'), position: 2 },
    ],
    links: [{ id: '3-l1', label: 'E-book', url: '#', type: 'ebook' }],
    tags: [{ id: 't-editorial', namePt: 'Editorial', nameEn: 'Editorial', slug: 'editorial' }],
  },
  {
    id: '4',
    slug: 'motor-de-busca-semantica',
    type: 'code',
    titlePt: 'Motor de busca semântica',
    titleEn: 'Semantic search engine',
    descriptionPt:
      'Busca vetorial sobre uma base de artigos técnicos, com embeddings próprios e reranking híbrido.',
    descriptionEn:
      'Vector search over a technical article base, with in-house embeddings and hybrid reranking.',
    coverImageUrl: cover('search-cover'),
    bannerImageUrl: cover('search-banner'),
    position: 3,
    published: true,
    images: [{ id: '4-1', imageUrl: cover('search-1'), position: 0 }],
    links: [{ id: '4-l1', label: 'GitHub', url: '#', type: 'github' }],
    tags: [
      { id: 't-ai', namePt: 'IA', nameEn: 'AI', slug: 'ai' },
      { id: 't-nextjs', namePt: 'Next.js', nameEn: 'Next.js', slug: 'nextjs' },
    ],
  },
  {
    id: '5',
    slug: 'embalagem-cafe-solar',
    type: 'design',
    titlePt: 'Embalagem — Café Solar',
    titleEn: 'Packaging — Café Solar',
    descriptionPt:
      'Sistema de embalagens para uma torrefação, com ilustração botânica e código de cores por origem do grão.',
    descriptionEn:
      'Packaging system for a coffee roastery, with botanical illustration and a color code per bean origin.',
    coverImageUrl: cover('cafe-cover'),
    bannerImageUrl: cover('cafe-banner'),
    position: 4,
    published: true,
    images: [{ id: '5-1', imageUrl: cover('cafe-1'), position: 0 }],
    links: [{ id: '5-l1', label: 'Site', url: '#', type: 'live_site' }],
    tags: [{ id: 't-packaging', namePt: 'Embalagem', nameEn: 'Packaging', slug: 'packaging' }],
  },
  {
    id: '6',
    slug: 'app-de-habitos',
    type: 'code',
    titlePt: 'App de hábitos offline-first',
    titleEn: 'Offline-first habit app',
    descriptionPt:
      'App mobile com sincronização offline-first, animações de progresso e widget de tela inicial.',
    descriptionEn:
      'Mobile app with offline-first sync, progress animations, and a home-screen widget.',
    coverImageUrl: cover('habits-cover'),
    bannerImageUrl: cover('habits-banner'),
    position: 5,
    published: true,
    images: [{ id: '6-1', imageUrl: cover('habits-1'), position: 0 }],
    links: [
      { id: '6-l1', label: 'GitHub', url: '#', type: 'github' },
      { id: '6-l2', label: 'Live', url: '#', type: 'live_site' },
    ],
    tags: [{ id: 't-mobile', namePt: 'Mobile', nameEn: 'Mobile', slug: 'mobile' }],
  },
];

export function getDummyProjectsByType(type: 'design' | 'code' | null): Project[] {
  const filtered = type ? dummyProjects.filter((p) => p.type === type) : dummyProjects;
  return [...filtered].sort((a, b) => a.position - b.position);
}

export function getDummyProjectBySlug(slug: string): Project | undefined {
  return dummyProjects.find((p) => p.slug === slug);
}
