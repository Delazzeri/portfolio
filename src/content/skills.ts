import type { SkillGroup } from '@/lib/types';

// `icon` = chave de src/components/icons/brand-paths.ts. Ordem com foco em dev.
export const skills: SkillGroup[] = [
  {
    title: { pt: 'Front-end', en: 'Front-end' },
    items: [
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
    ],
  },
  {
    title: { pt: 'Back-end', en: 'Back-end' },
    items: [{ name: 'Supabase', icon: 'supabase' }],
  },
  {
    title: { pt: 'CMS', en: 'CMS' },
    items: [
      { name: 'WordPress', icon: 'wordpress' },
      { name: 'Elementor', icon: 'elementor' },
    ],
  },
  {
    title: { pt: 'Ferramentas', en: 'Tools' },
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'Claude', icon: 'claude' },
      { name: 'Gemini', icon: 'gemini' },
    ],
  },
  {
    title: { pt: 'Design', en: 'Design' },
    items: [
      { name: 'Figma', icon: 'figma' },
      { name: 'Photoshop', icon: 'photoshop' },
      { name: 'Illustrator', icon: 'illustrator' },
      { name: 'InDesign', icon: 'indesign' },
      { name: 'Premiere Pro', icon: 'premiere' },
    ],
  },
];

const normalize = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

const iconByName = new Map(
  skills.flatMap((group) =>
    group.items.flatMap((item): [string, string][] =>
      item.icon ? [[normalize(item.name), item.icon]] : [],
    ),
  ),
);

/** Ícone de uma tecnologia pelo nome (ex.: 'Next.js', 'nextjs', 'Tailwind CSS'). */
export function skillIcon(name: string) {
  return iconByName.get(normalize(name));
}
