## Visão geral do projeto

Site de portfólio pessoal com estética minimalista inspirada no design system do iOS 26 (glassmorphism sutil, transições fluidas, profundidade). O site alterna entre três visualizações de projetos:

- `/design` — projetos de design
- `/code` — projetos de programação
- `/all` — união automática dos dois portfólios (não é uma curadoria separada; sempre reflete o que existe em `/design` + `/code`)

Cada projeto é exibido em um grid de módulos estilo Netflix (hover expande o card em escala) e, ao ser clicado, abre em um modal com detalhes — capa, banner, galeria de imagens e links dinâmicos (site ao vivo, GitHub, Vercel, Instagram, ebook etc., dependendo do que fizer sentido para aquele projeto específico).

Existe uma área de admin protegida (uso exclusivo do dono do site) para CRUD completo de projetos, incluindo reordenação manual via drag-and-drop.

O site é bilíngue (PT/EN) desde o início.

## Stack técnica

- **Framework**: Next.js (App Router)
- **Linguagem**: TypeScript (`strict: true`)
- **Estilização**: Tailwind CSS
- **Animações**: Framer Motion (usar `layoutId` para a transição card → modal)
- **Backend/Dados**: Supabase (Postgres + Storage + Auth)
- **Deploy**: Vercel
- **Tipografia**: Geist (fonte da própria Vercel, próxima da SF Pro)
- **Tema**: `next-themes` para dark/light mode com toggle
- **i18n**: `next-intl` (rotas com prefixo de idioma, ex: `/pt/design`, `/en/design`)
- **Lint/Format**: ESLint (`eslint-config-next`) + Prettier configurados desde o commit inicial
- **Reordenação no admin**: `dnd-kit`

> Ajustar aqui se alguma lib específica não estiver disponível ou surgir algo melhor durante o desenvolvimento — mas manter o espírito da stack (Next + Supabase + Vercel).

## Arquitetura de rotas

Usar o padrão de **intercepting + parallel routes** do App Router para o comportamento de modal com URL própria — o mesmo mecanismo usado por Instagram/Netflix:

- Ao clicar em um card a partir do grid → abre como modal por cima da grid, sem perder scroll/contexto. URL muda para `/[locale]/design/[slug]` (ou `/code/[slug]`, `/all/[slug]`).
- Ao acessar essa URL diretamente (link compartilhado, refresh, bot de SEO) → renderiza como página completa, sem modal, com metadata/Open Graph próprios daquele projeto.

Estrutura de pastas sugerida (ajustar durante implementação):
app/
[locale]/
design/
page.tsx
[slug]/
page.tsx # página completa (acesso direto)
@modal/
(.)[slug]/
page.tsx # intercepting route (modal)
code/
... (mesma estrutura)
all/
... (mesma estrutura, dados = união de design + code)
admin/
page.tsx # dashboard (protegido)
projects/
new/
[id]/edit/

## Modelo de dados (Supabase)

Rascunho do schema — ajustar conforme necessário na implementação:

**`projects`**

- `id`
- `title_pt`, `title_en`
- `description_pt`, `description_en`
- `slug`
- `type` (`design` | `code`)
- `cover_image_url`
- `banner_image_url`
- `position` (int, para ordenação manual)
- `created_at`, `updated_at`

**`project_images`** (galeria, 1:N com `projects`)

- `id`, `project_id`, `image_url`, `position`

**`project_links`** (links dinâmicos, 1:N com `projects`)

- `id`, `project_id`, `label`, `url`, `type` (ex: `github`, `vercel`, `live_site`, `instagram`, `ebook`, `other`)

**`tags`** e **`project_tags`** (N:N)

- `tags`: `id`, `name_pt`, `name_en`
- `project_tags`: `project_id`, `tag_id`

> `/all` não é uma tabela própria — é sempre a query de `projects` sem filtro de `type`.

## Admin

- Autenticação via Supabase Auth, restrita a uma única conta (o dono do site).
- CRUD completo: criar, editar, excluir e reordenar projetos (drag-and-drop, atualizando `position`).
- Ao criar/editar um projeto, o admin define: tipo (design/code), capa, banner, galeria, tags e links — os links são uma lista dinâmica (adicionar quantos forem necessários, escolhendo label/tipo + URL), não campos fixos.
- Toda rota `/admin/*` deve ser protegida por middleware — nunca renderizar nada de admin no lado do cliente sem checagem de sessão no servidor.

## Identidade visual

- Minimalista, inspirado no iOS 26: glassmorphism sutil (blur, transparência leve), cantos arredondados generosos, espaçamento generoso, transições suaves.
- Dark e light mode com toggle, sem flash de tema incorreto no load (usar `next-themes` corretamente com `suppressHydrationWarning`).
- Tipografia: Geist.
- Hover no grid expande o módulo em escala (não é só um zoom de imagem — o card cresce e ganha profundidade/sombra).
- Mobile: hover não existe em touch — pensar em um comportamento equivalente (tap simples já leva ao detalhe, sem etapa intermediária de "hover").

## Convenções de código

- TypeScript estrito. Evitar `any`.
- Componentes em `PascalCase`, hooks em `camelCase` com prefixo `use`.
- Preferir Server Components por padrão; usar `"use client"` apenas quando necessário (interatividade, hooks de estado, Framer Motion).
- Variáveis de ambiente sensíveis (chaves do Supabase) nunca hardcoded — sempre via `.env.local` e `process.env`.
- Commits e nomes de branch em inglês; conteúdo do site em PT/EN conforme o campo.

## O que NÃO fazer

- Não criar tabelas ou campos fixos por tipo de link (ex: coluna `github_url`, `instagram_url` separadas) — usar a tabela `project_links` dinâmica.
- Não tratar `/all` como uma fonte de dados separada — é sempre a união de `design` + `code`.
- Não renderizar dados de admin sem checagem de autenticação no servidor.
- Não commitar chaves do Supabase ou segredos no repositório.
