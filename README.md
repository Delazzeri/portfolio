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
