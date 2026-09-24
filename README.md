# Base Cálculo

Protótipo sem backend de uma plataforma gratuita de exercícios de Matemática Básica, Pré-Cálculo e Cálculo 1.

## O que já funciona

- 24 exercícios organizados por módulo, tópico e dificuldade;
- busca e filtros;
- fórmulas renderizadas com KaTeX;
- dicas, resoluções e referências das fontes;
- progresso salvo no próprio navegador com `localStorage`;
- layout responsivo para computador e celular.

A identidade visual segue o contrato documentado em `DESIGN.md`: uma linguagem de caderno de exercícios universitário, com fontes locais e sem dependência de serviços externos para carregar a tipografia.

## Rodar no computador

Pré-requisitos: Node.js 20.19+ e pnpm.

```powershell
pnpm install
pnpm dev
```

Abra `http://localhost:5173`.

## Atualizar o banco de questões

Edite `database/seeds/pilot_questions.json` e execute:

```powershell
pnpm data:build
```

O comando valida as questões, recria `database/questions.sqlite` e gera o JSON usado pelo site em `public/data/questions.json`.

## Gerar a versão de produção

```powershell
pnpm build
```

Os arquivos prontos para publicação serão criados em `dist/`. Como o projeto é estático, ele pode ser publicado gratuitamente no GitHub Pages, Cloudflare Pages ou Netlify.

## Estrutura principal

- `src/`: interface React;
- `DESIGN.md`: contrato de cores, tipografia, componentes e regras visuais;
- `database/schema.sql`: estrutura relacional do banco;
- `database/seeds/pilot_questions.json`: fonte editável das questões;
- `database/questions.sqlite`: banco para consulta e manutenção;
- `public/data/questions.json`: dados consumidos pelo site;
- `scripts/build_database.py`: validação e geração dos dados.
