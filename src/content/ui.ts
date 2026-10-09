import type { I18n, SectionId } from '@/lib/types';

/** Textos de interface (não-pessoais). */
export const ui = {
  skipLink: { pt: 'Pular para o conteúdo', en: 'Skip to content' },
  nav: {
    label: { pt: 'Navegação principal', en: 'Main navigation' },
    openMenu: { pt: 'Abrir menu', en: 'Open menu' },
    closeMenu: { pt: 'Fechar menu', en: 'Close menu' },
    menuTitle: { pt: 'Menu', en: 'Menu' },
  },
  theme: {
    toggle: { pt: 'Alternar tema claro/escuro', en: 'Toggle light/dark theme' },
  },
  hero: {
    avatarAlt: { pt: 'Foto de', en: 'Photo of' },
    downloadCv: { pt: 'Download CV', en: 'Download CV' },
    contact: { pt: 'Entrar em contato', en: 'Get in touch' },
  },
  projects: {
    featured: { pt: 'Destaques', en: 'Highlights' },
    all: { pt: 'Todos os projetos', en: 'All projects' },
    coverAlt: { pt: 'Capa do projeto', en: 'Cover of the project' },
    galleryAlt: { pt: 'Imagem do projeto', en: 'Image of the project' },
    gallery: { pt: 'Galeria', en: 'Gallery' },
    video: { pt: 'Vídeo do projeto', en: 'Project video' },
    stack: { pt: 'Tecnologias', en: 'Tech stack' },
    role: { pt: 'Meu papel', en: 'My role' },
    year: { pt: 'Ano', en: 'Year' },
    type: { pt: 'Tipo', en: 'Type' },
    close: { pt: 'Fechar', en: 'Close' },
    back: { pt: 'Voltar para projetos', en: 'Back to projects' },
  },
  projectTypes: {
    pessoal: { pt: 'Pessoal', en: 'Personal' },
    freelance: { pt: 'Freelance', en: 'Freelance' },
    faculdade: { pt: 'Faculdade', en: 'University' },
    trabalho: { pt: 'Trabalho', en: 'Work' },
  },
  projectLinks: {
    live: { pt: 'Acessar projeto', en: 'View project' },
    repo: { pt: 'Repositório', en: 'Repository' },
    linkedinPost: { pt: 'Post no LinkedIn', en: 'LinkedIn post' },
    figma: { pt: 'Figma', en: 'Figma' },
  },
  footer: {
    rights: { pt: 'Todos os direitos reservados.', en: 'All rights reserved.' },
    backToTop: { pt: 'Voltar ao topo', en: 'Back to top' },
  },
} satisfies Record<string, I18n | Record<string, I18n>>;

export const sectionLabels = {
  sobre: { pt: 'Sobre', en: 'About' },
  habilidades: { pt: 'Habilidades', en: 'Skills' },
  projetos: { pt: 'Projetos', en: 'Projects' },
  contatos: { pt: 'Contatos', en: 'Contact' },
} satisfies Record<SectionId, I18n>;

const sectionOrder: SectionId[] = ['sobre', 'habilidades', 'projetos', 'contatos'];

export const sections = sectionOrder.map((id) => ({ id, label: sectionLabels[id] }));
