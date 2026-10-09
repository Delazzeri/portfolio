import type { SkillGroup } from '@/lib/types';

// `icon` = chave de src/components/icons/brand-paths.ts. Ordem com foco em dev.
export const skills: SkillGroup[] = [
  {
    title: { pt: 'Front-end', en: 'Front-end' },
    items: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
    ],
  },
  {
    title: { pt: 'Back-end', en: 'Back-end' },
    items: [{ name: 'Supabase', icon: 'supabase' }],
  },
  {
    title: { pt: 'Ferramentas', en: 'Tools' },
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'VS Code', icon: 'vscode' },
      { name: 'Claude', icon: 'claude' },
      { name: 'Gemini', icon: 'gemini' },
      { name: 'GPT', icon: 'openai' },
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
