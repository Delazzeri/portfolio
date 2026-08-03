# Portfolio

Site de portfólio pessoal (design + código), bilíngue PT/EN. Ver [CLAUDE.md](./CLAUDE.md) para a especificação completa do projeto.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

> **Nota:** `npm run dev` roda com `--webpack` em vez do Turbopack padrão do Next 16. O Turbopack em modo dev tem um bug reproduzível de resolução de interception routes quando combinado com o segmento dinâmico `[locale]` + múltiplas rotas interceptadas irmãs (erro `Invalid interception route: ... (.)(.)(.)...`, que cresce a cada requisição). Builds de produção (`next build`/`next start`, o que roda na Vercel) **não** são afetados — só o dev server. Reavaliar quando o Next.js lançar uma correção.

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` / `npm run start` — build e servidor de produção
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` — Prettier
