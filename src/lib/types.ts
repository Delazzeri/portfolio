export type Locale = 'pt' | 'en';
export type I18n = Record<Locale, string>;

export type Profile = {
  name: string;
  role: I18n;
  bio: I18n; // parágrafos separados por \n\n
  avatar: string; // caminho em /public
  cvUrl: string;
  contacts: Contact[];
};

export type Contact = {
  kind: 'email' | 'whatsapp' | 'linkedin' | 'github' | 'behance' | 'instagram';
  label: I18n;
  value: string; // texto exibido
  href: string; // mailto:, https://wa.me/, etc.
};

export type SkillGroup = {
  title: I18n; // ex.: Front-end, Design, Back-end, Ferramentas
  items: { name: string; icon?: string }[];
};

export type Project = {
  slug: string;
  title: string;
  summary: I18n; // 1 frase, usada na meta description
  description: I18n; // texto do modal
  cover?: string; // 16:10, em /public/images/projects (sem capa → bloco com o título)
  gallery?: string[];
  video?: string; // link do YouTube
  stack: string[];
  role?: I18n; // meu papel: design, front, full-stack…
  year: number;
  featured: boolean; // true → aparece em "Destaques"
  type: 'pessoal' | 'freelance' | 'faculdade' | 'trabalho';
  links: { live?: string; repo?: string; linkedinPost?: string; figma?: string };
};

export type SectionId = 'sobre' | 'habilidades' | 'projetos' | 'contatos';
