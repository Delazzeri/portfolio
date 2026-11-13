<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,50:6366f1,100:06b6d4&height=190&section=header&text=Portfolio&fontSize=48&fontColor=ffffff&fontAlignY=38&desc=Meu%20site%20pessoal%3A%20front-end%20com%20olhar%20de%20designer&descSize=17&descAlignY=60" alt="Portfolio" />

<img src="https://skillicons.dev/icons?i=nextjs,ts,tailwind,react,vercel&theme=dark" height="42" alt="Stack" />

<br/><br/>

<a href="https://eduardodelazeri.vercel.app/"><img src="https://raw.githubusercontent.com/Delazzeri/Delazzeri/main/assets/btn-demo.svg" height="36" alt="Ver site" /></a>

</div>

<br/>

## Sobre

Meu portfólio pessoal, em página única, feito para apresentar quem eu sou, minhas habilidades e meus projetos. O objetivo é converter visitas em contato (e-mail, WhatsApp, LinkedIn) ou em download do currículo.

As prioridades, nesta ordem: **performance, acessibilidade, SEO e acabamento visual**.

## Funcionalidades

- **Página única** com navegação por âncoras: apresentação, habilidades, projetos e contatos.
- **Projetos em destaque e lista completa.** Cada projeto abre num modal com galeria e links opcionais (site, repositório, post no LinkedIn, Figma e vídeo do YouTube).
- **Modal com URL própria.** O modal usa intercepting + parallel routes: acessar `/projetos/[slug]` direto, ou recarregar a página, mostra a página completa do projeto.
- **Projetos cadastrados por pastas**, sem banco de dados. O conteúdo é lido e validado no build.
- **Tema claro e escuro** sem flash no carregamento.
- **Animações de entrada** ao rolar a página, respeitando `prefers-reduced-motion`.
- **Responsivo** do celular ao desktop.

## Stack

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 16 (App Router) e React 19 |
| Linguagem | TypeScript em modo `strict` |
| Estilo | Tailwind CSS v4 com design tokens em CSS variables |
| Animação | Motion |
| Tema | next-themes |
| Ícones | lucide-react e SVGs próprios para marcas |
| Qualidade | ESLint e Prettier (com ordenação de classes do Tailwind) |
| Deploy | Vercel |

## Estrutura

```
src/
  app/             # rotas, layout, metadata e modal de projeto
  components/      # layout, sections, projects, ui, icons
  content/         # conteúdo tipado: perfil, habilidades, projetos, textos da interface
  lib/             # tipos, leitura dos projetos, utilitários
  styles/globals.css   # design tokens: cores, tipografia, raios e sombras
public/
  projetos/        # uma pasta por projeto
  cv/ · images/    # currículo e avatar
```

## Como adicionar um projeto

Cada projeto é uma pasta em `public/projetos/`, por exemplo `projeto08`. O nome da pasta vira o endereço: `/projetos/projeto08`.

```
public/projetos/projeto08/
  info.txt        # dados do projeto (obrigatório)
  descricao.txt   # texto do modal (obrigatório)
  capa.jpg        # capa 16:10, em jpg, jpeg, png, webp ou avif (opcional)
  galeria-1.jpg   # imagens extras, na ordem do número (opcional)
```

O `info.txt` tem um campo por linha (`campo: valor`). Linhas começando com `#` são ignoradas.

```
titulo: Nome do projeto
ano: Outubro de 2026
tipo: pessoal
destaque: sim
stack: Next.js, React, TypeScript, Tailwind CSS
video: https://youtu.be/...
site: https://...
repositorio: https://github.com/...
linkedin: https://www.linkedin.com/posts/...
figma: https://www.figma.com/...
```

| Campo | Regra |
| --- | --- |
| `titulo`, `ano`, `tipo` | obrigatórios |
| `tipo` | `pessoal`, `freelance`, `faculdade` ou `profissional` |
| `ano` | só o ano (`2026`) ou com mês (`Outubro de 2026`, `10/2026`); com mês, a ordenação considera o mês |
| `destaque` | `sim` ou `não`; no máximo 4 destaques aparecem |
| `repositorio` | link, ou `PRIVADO` para mostrar o aviso "Repositório privado" no lugar do botão |
| `video` | somente links do YouTube |
| `resumo`, `papel`, `figma` | opcionais; `resumo` é a frase para o Google, `papel` a sua função no projeto |

- Campos vazios ou ausentes não aparecem no site. Sem `site`, por exemplo, não há botão de acesso.
- Os ícones da stack vêm da lista de habilidades em `src/content/skills.ts`. Tecnologia sem ícone aparece como texto.
- No `descricao.txt`, uma quebra de linha vira quebra de linha, e uma linha em branco separa parágrafos.
- Erros de preenchimento (campo desconhecido, ano inválido, tipo errado, vídeo que não é do YouTube) interrompem o build e indicam o arquivo e o campo.

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Ação |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` / `npm run start` | build de produção e servidor |
| `npm run lint` | ESLint |
| `npm run typecheck` | gera os tipos de rota e roda `tsc --noEmit` |
| `npm run format` / `npm run format:check` | Prettier, com ordenação de classes do Tailwind |

A especificação completa do projeto está em [CLAUDE.md](./CLAUDE.md).
