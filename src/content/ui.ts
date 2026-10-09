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
