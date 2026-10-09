import { getProjects } from '@/lib/load-projects';

/**
 * Os projetos vêm das pastas em `public/projetos/` (uma por projeto: info.txt, descricao.txt,
 * capa, galeria). Ver README → "Como adicionar um projeto".
 */
export { getProjects };

/** Destaques (máx. 4), do mais recente ao mais antigo. */
export function getFeaturedProjects() {
  return getProjects()
    .filter((project) => project.featured)
    .slice(0, 4);
}

/**
 * Slugs para `generateStaticParams`. Com Cache Components a lista não pode ser vazia,
 * então sem projetos devolve um slug de reserva (a página responde 404).
 */
export function getProjectParams() {
  const params = getProjects().map((project) => ({ slug: project.slug }));
  return params.length > 0 ? params : [{ slug: 'sem-projetos' }];
}

export function getProject(slug: string) {
  return getProjects().find((project) => project.slug === slug);
}
