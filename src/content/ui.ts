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
  footer: {
    rights: { pt: 'Todos os direitos reservados.', en: 'All rights reserved.' },
    backToTop: { pt: 'Voltar ao topo', en: 'Back to top' },
  },
} satisfies Record<string, I18n | Record<string, I18n>>;

export const sections: { id: SectionId; label: I18n }[] = [
  { id: 'sobre', label: { pt: 'Sobre', en: 'About' } },
  { id: 'habilidades', label: { pt: 'Habilidades', en: 'Skills' } },
  { id: 'projetos', label: { pt: 'Projetos', en: 'Projects' } },
  { id: 'contatos', label: { pt: 'Contatos', en: 'Contact' } },
];
