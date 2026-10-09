# Portfólio — Eduardo Delazeri

Portfólio pessoal single-page em Next.js (App Router), TypeScript, Tailwind CSS v4, Motion e `next-themes`.
A especificação completa do projeto está em [CLAUDE.md](CLAUDE.md).

## Comandos

```bash
npm run dev           # ambiente local (http://localhost:3000)
npm run build         # build de produção
npm run lint          # ESLint
npm run typecheck     # gera os tipos de rota e roda tsc --noEmit
npm run format        # Prettier (com ordenação de classes Tailwind)
```

## Estrutura

- `src/app` — rotas, layout e metadata
- `src/components` — `layout/`, `sections/`, `projects/`, `ui/`, `icons/`
- `src/content` — conteúdo tipado (perfil, skills, projetos, textos de interface)
- `src/styles/globals.css` — design tokens (cores, tipografia, raios, sombras)

## Como adicionar um projeto

Cada projeto é uma pasta em `public/projetos/` (ex.: `projeto06`). O nome da pasta vira o endereço: `/projetos/projeto06`.

```
public/projetos/projeto06/
  info.txt        # dados do projeto (obrigatório)
  descricao.txt   # texto do modal (obrigatório)
  capa.jpg        # capa horizontal 16:10 — jpg, jpeg, png, webp ou avif (opcional)
  galeria-1.jpg   # imagens extras, na ordem do número (opcional)
```

`info.txt` — um campo por linha (`campo: valor`); linhas com `#` são ignoradas:

```
titulo: Collage.fm
ano: 2025
tipo: pessoal
destaque: sim
stack: Next.js, React, TypeScript, Tailwind CSS
video: https://youtu.be/...
site: https://...
repositorio: https://github.com/...
linkedin: https://www.linkedin.com/posts/...
```

- Obrigatórios: `titulo`, `ano` e `tipo` (`pessoal`, `freelance`, `faculdade` ou `trabalho`).
- `destaque`: `sim` ou `não` (no máximo 4 destaques aparecem). `video`: link do YouTube.
- Opcionais extras: `resumo` (frase para o Google; sem ele, usa a 1ª frase da descrição), `papel` (ex.: Front-end) e `figma` (link).
- Comentários só em linha própria, começando com `#`.
- Campos vazios ou ausentes não aparecem (sem `site`, não há botão "Acessar projeto").
- Os ícones da stack vêm da lista de Habilidades (`src/content/skills.ts`); tecnologia sem ícone aparece como texto.
- `descricao.txt`: uma quebra de linha vira quebra de linha; uma linha em branco separa parágrafos.
- Erros de preenchimento (campo desconhecido, ano inválido, tipo errado, vídeo que não é do YouTube) quebram o build com o arquivo e o campo.
