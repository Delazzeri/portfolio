import type { Project } from '@/lib/types';

// TODO: substituir pelos 5 projetos reais (título, textos, stack, ano, tipo, destaque, links, capa).
const placeholder = (n: number, featured: boolean): Project => ({
  slug: `projeto-${n}`,
  title: `TODO: Projeto ${n}`,
  summary: { pt: 'TODO: resumo em uma frase.', en: 'TODO: one-sentence summary.' },
  description: {
    pt: 'TODO: descrição do projeto.',
    en: 'TODO: project description.',
  },
  stack: [],
  year: 2026, // TODO: ano real
  featured,
  type: 'pessoal', // TODO: tipo real
  links: {},
});

export const projects: Project[] = [
  placeholder(1, true),
  placeholder(2, true),
  placeholder(3, false),
  placeholder(4, false),
  placeholder(5, false),
];

/** Destaques (máx. 4), na ordem do arquivo. */
export const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

/** Todos os projetos, do mais recente ao mais antigo. */
export const projectsByYear = [...projects].sort((a, b) => b.year - a.year);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
