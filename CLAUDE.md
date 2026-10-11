# CLAUDE.md — Portfólio Eduardo

> Este arquivo é o contrato do projeto. Leia inteiro antes de qualquer tarefa.
> Se algo pedido no chat conflitar com este documento, **pare e pergunte** antes de seguir.

---

## 1. Visão geral

Portfólio pessoal **single-page** de um desenvolvedor front-end com perfil híbrido (UI/design + código de produção).
Objetivo: apresentar quem eu sou, minhas habilidades e meus projetos, e converter visitas em contato (e-mail, WhatsApp, LinkedIn) ou download do CV.

- **Público:** recrutadores, tech leads e clientes de freelance.
- **Idioma:** PT-BR como padrão. Conteúdo já modelado para EN (ver §6), i18n ativado na Fase 5.
- **Prioridades, nesta ordem:** performance → acessibilidade → SEO → acabamento visual/animações.

## 2. Referência e limites

Referência de **estrutura e UX**: https://www.rhuanbello.com/

O que adotamos da referência:
- Página única com navegação por âncoras: **Sobre → Habilidades → Projetos → Contatos**.
- Bloco de apresentação com avatar, título, CTA "Download CV" e CTA "Entrar em contato".
- Projetos divididos em **Destaques** e **Todos os projetos**.
- Modal de detalhes do projeto com links: acessar projeto, repositório e post no LinkedIn (cada um opcional).
- Seção de contatos com ícone + rótulo + valor (e-mail, telefone/WhatsApp, LinkedIn, GitHub).
- Light & Dark mode.
- Animações de entrada ao scroll.
- Responsivo do mobile ao desktop.

**Regras não-negociáveis:**
- ❌ Não copiar textos, imagens, avatar, ícones customizados, CV, paleta exata nem código do site de referência.
- ✅ Identidade visual própria (tokens definidos em §7). A referência guia a *arquitetura da informação*, não a aparência.
- ❌ Não inventar conteúdo pessoal (cargos, empresas, números, depoimentos). Onde faltar dado, use placeholder `TODO:` visível e registre no fim da resposta.

## 3. Stack

| Camada | Escolha |
|---|---|
| Framework | Next.js (App Router, versão estável mais recente) |
| Linguagem | TypeScript em modo `strict` |
| Estilo | Tailwind CSS + design tokens em CSS variables |
| Animação | Framer Motion (`motion`) |
| Tema | `next-themes` (estratégia `class`, sem flash no carregamento) |
| Ícones | `lucide-react` + SVGs próprios em `src/components/icons` para marcas |
| Conteúdo | Arquivos tipados em `src/content/*.ts`; projetos em pastas `public/projetos/<pasta>/` lidas no build (sem banco nesta versão) |
| Deploy | Vercel |
| Qualidade | ESLint + Prettier (+ `prettier-plugin-tailwindcss`) |

Nenhuma outra dependência entra sem eu aprovar. Antes de instalar algo, diga o quê, por quê e o tamanho aproximado no bundle.

## 4. Comandos

```bash
npm run dev        # ambiente local
npm run build      # build de produção — deve passar sem warnings de tipo
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

Ao concluir qualquer tarefa: rode `typecheck`, `lint` e `build`. Só considere pronto se os três passarem.

## 5. Estrutura de pastas

```
src/
  app/
    layout.tsx                 # html, fontes, ThemeProvider, metadata base
    page.tsx                   # monta as seções na ordem
    projetos/[slug]/page.tsx   # página completa do projeto (SEO + link direto)
    @modal/
      default.tsx              # retorna null
      (.)projetos/[slug]/page.tsx  # mesmo conteúdo, renderizado em modal
    sitemap.ts
    robots.ts
    opengraph-image.tsx
  components/
    layout/      # Header, Nav, ThemeToggle, Footer
    sections/    # Hero, About, Skills, Projects, Contacts
    projects/    # ProjectCard, ProjectGrid, ProjectDetails, ProjectModal
    ui/          # Button, Badge, Section, Reveal (wrapper de animação)
    icons/
  content/
    profile.ts   # nome, título, bio, links, CV
    skills.ts
    projects.ts  # API dos projetos (lê as pastas via lib/load-projects.ts)
  lib/
    types.ts
    utils.ts     # cn(), helpers
    load-projects.ts  # lê e valida public/projetos/*
    video.ts     # link do YouTube → player incorporado
  styles/
    globals.css  # tokens e base
public/
  cv/            # cv-eduardo.pdf
  images/        # avatar
  projetos/      # uma pasta por projeto (projeto01, projeto02…): info.txt, descricao.txt, capa.*, galeria-N.*
```

**Modal com URL:** o modal de projeto usa *intercepting + parallel routes*. Clicar num card abre `@modal/(.)projetos/[slug]` sobre a home; acessar `/projetos/[slug]` direto (ou recarregar) abre a página completa. `ProjectDetails` é o mesmo componente nos dois casos. Fechar o modal = `router.back()`.

## 6. Modelo de conteúdo

```ts
// src/lib/types.ts
export type Locale = 'pt' | 'en';
export type I18n = Record<Locale, string>;

export type Profile = {
  name: string;
  role: I18n;
  bio: I18n;            // parágrafos separados por \n\n
  avatar: string;       // caminho em /public
  cvUrl: string;
  contacts: Contact[];
};

export type Contact = {
  kind: 'email' | 'whatsapp' | 'linkedin' | 'github' | 'behance' | 'instagram';
  label: I18n;
  value: string;        // texto exibido
  href: string;         // mailto:, https://wa.me/, etc.
};

export type SkillGroup = {
  title: I18n;          // ex.: Front-end, Design, Back-end, Ferramentas
  items: { name: string; icon?: string }[];
};

export type Project = {
  slug: string;
  title: string;
  summary: I18n;        // 1 frase, usada na meta description (campo "resumo" ou 1ª frase da descrição)
  description: I18n;    // texto do modal
  cover?: string;       // 16:10 (capa.* na pasta do projeto); sem capa → bloco substituto
  gallery?: string[];
  video?: string;       // link do YouTube
  stack: string[];
  role?: I18n;          // meu papel: design, front, full-stack…
  year: number;
  month?: number;       // 1–12, opcional ("ano: Outubro de 2026" no info.txt)
  featured: boolean;    // true → aparece em "Destaques"
  type: 'pessoal' | 'freelance' | 'faculdade' | 'profissional';
  links: { live?: string; repo?: string; linkedinPost?: string; figma?: string };
};
```

- **Projetos vêm de pastas** em `public/projetos/<pasta>/` (a pasta é o `slug`): `info.txt` (campos `chave: valor`), `descricao.txt`, `capa.*`, `galeria-N.*`. Formato completo no README. Erros de preenchimento quebram o build.
- `video` é um link do YouTube, exibido como player incorporado (youtube-nocookie).
- Destaques = `projects.filter(p => p.featured)`, máx. 4.
- "Todos os projetos" lista todos, ordenados por `year` e `month` desc (sem mês → fim do ano), **sem filtro** (decisão do Eduardo).
- Links ausentes não renderizam botão (nunca botão desabilitado ou `href="#"`).

## 7. Design system

Defina tokens em `globals.css` como CSS variables e exponha no Tailwind. Componentes **nunca** usam cores hex soltas.

```
--background  --surface  --surface-elevated
--foreground  --muted    --border
--primary     --primary-foreground
--ring
```

- Dois temas (`:root` e `.dark`), contraste mínimo WCAG AA em ambos.
- Tipografia: 1 fonte para títulos + 1 para texto via `next/font` (TODO: definir). Escala fluida com `clamp()`.
- Raio, sombras e espaçamentos também como tokens.
- Container máx. ~1200px, gutter 16px no mobile.
- Estética: TODO — descrever direção visual própria (ex.: minimalista com acento de cor forte, grid editorial…). Até eu definir, use neutros + um acento e mantenha tudo fácil de trocar pelos tokens.

## 8. Seções (especificação)

1. **Header fixo** — nome/logo à esquerda; nav por âncoras (Sobre, Habilidades, Projetos, Contatos) com item ativo via `IntersectionObserver`; `ThemeToggle`. No mobile, menu em sheet com foco preso e fechamento por `Esc`.
2. **Hero / Sobre** — avatar, nome, cargo, bio curta, CTAs "Download CV" (abre o PDF em nova aba, atributo `download`) e "Entrar em contato" (rola até Contatos).
3. **Habilidades** — grupos de skills com ícone + nome. Sem barras de "nível %".
4. **Projetos** — "Destaques" em cards grandes; "Todos os projetos" em grid responsivo (1/2/3 colunas), sem filtro. Card: capa escurecida com título + todos os ícones da stack por cima (tecnologia sem ícone aparece como texto); no hover cresce, a camada some e aparece "Ver mais". Detalhes: mídia (vídeo ou capa + galeria) ao lado do texto, botões de links embaixo.
5. **Contatos** — lista de `contacts` com ícone, rótulo e valor; cada item é um link inteiro clicável.
6. **Footer** — © ano dinâmico, voltar ao topo.

## 9. Animações

- Wrapper `<Reveal>` com `whileInView` (fade + translate leve), `viewport={{ once: true, amount: 0.2 }}`.
- Stagger curto em grids (≤ 60ms por item).
- Modal: fade no overlay + scale/translate leve no conteúdo; respeita `AnimatePresence`.
- **Obrigatório:** respeitar `prefers-reduced-motion` (desliga transforms, mantém só opacidade ou nada).
- Nada de animação que atrase o LCP (o Hero aparece já visível).

## 10. Acessibilidade

- HTML semântico (`header`, `nav`, `main`, `section` com `aria-labelledby`, `footer`).
- Skip link "Pular para o conteúdo".
- Modal: `role="dialog"`, `aria-modal`, foco inicial no título, foco preso, `Esc` fecha, foco volta ao card de origem.
- Todos os elementos interativos com estado de foco visível (`--ring`).
- `alt` descritivo em capas; ícones decorativos com `aria-hidden`.

## 11. SEO e performance

- `metadata` completa no layout (title template, description, canonical, Open Graph, Twitter).
- `generateMetadata` em `/projetos/[slug]`.
- JSON-LD `Person` na home.
- `sitemap.ts` incluindo todos os projetos; `robots.ts`.
- Imagens só via `next/image`, com `sizes` corretos; capas em WebP/AVIF.
- Server Components por padrão; `"use client"` apenas onde houver estado/efeito (toggle, nav ativa, filtro, modal, Reveal).
- Meta: Lighthouse ≥ 95 em todas as categorias no mobile.

## 12. Convenções de código

- Componentes em PascalCase, um por arquivo, export nomeado.
- Props tipadas com `type`, sem `any`. Sem `as` para silenciar erro de tipo.
- Classes condicionais com `cn()` (clsx + tailwind-merge).
- Textos de interface vêm de `content/` ou de um dicionário — nada hardcoded espalhado em componentes.
- Commits no padrão Conventional Commits (`feat:`, `fix:`, `style:`, `refactor:`, `chore:`).

## 13. Forma de trabalhar

1. Antes de codar uma fase, apresente um plano curto (arquivos que vai criar/alterar) e espere meu OK.
2. Trabalhe uma fase por vez; não adiante features de fases seguintes.
3. Ao terminar, liste: o que foi feito, `TODO:` pendentes de conteúdo, e qualquer decisão que tomou sozinho.
4. Nunca apague ou reescreva arquivos de conteúdo (`src/content/*`) sem pedir.

## 14. Fases

- **Fase 1 — Fundação:** setup do Next.js, Tailwind, tokens, fontes, `next-themes`, layout, Header/Footer, `<Section>` e `<Reveal>`.
- **Fase 2 — Seções estáticas:** Hero/Sobre, Habilidades, Contatos, com conteúdo de `content/` (placeholders onde faltar).
- **Fase 3 — Projetos:** cards, Destaques, grid com filtro, rotas `projetos/[slug]` + modal interceptado.
- **Fase 4 — Polimento:** animações, a11y completa, SEO (metadata, JSON-LD, sitemap, OG image), auditoria Lighthouse.
- **Fase 5 — i18n e deploy:** ativar EN (estrutura `I18n` já pronta), deploy na Vercel com domínio próprio.

## 15. Conteúdo pendente (preencher)

- [ ] TODO: nome de exibição, cargo e bio (PT/EN)
- [ ] TODO: avatar (`/public/images/avatar.webp`)
- [ ] TODO: CV em PDF (`/public/cv/cv-eduardo.pdf`)
- [ ] TODO: contatos (e-mail, WhatsApp, LinkedIn, GitHub, Behance?)
- [ ] TODO: preencher as pastas `public/projetos/projeto01…05` (info, descrição, capa, vídeo)
- [ ] TODO: fontes e direção visual (§7)
- [ ] TODO: domínio