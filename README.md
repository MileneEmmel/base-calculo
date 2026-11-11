# ∫NTEGRA

Protótipo sem backend de uma plataforma gratuita de exercícios de Matemática Básica, Pré-Cálculo e Cálculo 1.

## O que já funciona

- 1.920 exercícios ativos organizados por módulo, tópico e dificuldade;
- busca e filtros;
- fórmulas renderizadas com KaTeX;
- dicas, resoluções e referências das fontes;
- progresso salvo no próprio navegador com `localStorage`;
- layout responsivo para computador e celular.

A identidade visual usa uma linguagem de caderno de exercícios universitário, com fontes locais e sem dependência de serviços externos para carregar a tipografia. Documentos internos de design, planejamento e auditoria são mantidos apenas localmente e não fazem parte deste repositório.

## Rodar no computador

Pré-requisito: Node.js 20.19+ (inclui npm).

```powershell
npm install
npm run dev
```

Abra o endereço exibido no terminal, normalmente `http://localhost:5173`.

O cabeçalho fixo dá acesso ao Início, Banco de questões (`/questoes`), Laboratório (`/laboratorio`), Mapa de conceitos (`/mapa`) e Sobre. O banco tem uma tela própria, com filtros e acesso às resoluções. Na página de uma questão, as setas à direita de “Voltar aos exercícios” seguem a mesma lista filtrada e ordenada do banco. Módulo, tópico, dificuldade e busca ficam no endereço, preservando a sequência após recarregar e nos botões de voltar e avançar do navegador. As setas ficam desativadas nas extremidades.

O Laboratório (`/laboratorio`) organiza as ferramentas de Funções, Propriedades, Limites, Derivadas e Integrais no submenu de Gráficos. Inclui funções afins, quadráticas, exponenciais, logarítmicas, seno, cosseno, racionais e exemplos por partes. Os coeficientes têm faixa configurável, com padrão −100 a 100, por campo numérico ou controle deslizante. O seletor personalizado mostra o nome e o modelo de cada família; as funções trigonométricas podem usar graus ou radianos.

Clique no gráfico para ativar o zoom pela roda do mouse, ancorado no cursor. Esc ou clicar fora libera a rolagem da página. Também há arraste, botões de zoom e deslocamento, enquadramento automático da função ativa e atalhos de teclado. Configurações controla grade, coordenadas, curvas, ponto móvel, raízes, vértice, encontro com o eixo y e interseções da função selecionada com as demais. O controle de x acompanha a faixa visível e inclui a coordenada selecionada. Mover a janela não muda o ponto, a aproximação do limite ou o intervalo de integração. Não há tabela geral de valores nem frase de instruções no card.

Um único painel permite editar até quatro funções pelas abas numeradas 1 a 4. O botão + cria uma função e seleciona sua aba; o − remove a selecionada quando há mais de uma. Todas as curvas continuam no gráfico. Limites, derivadas, integrais e o ponto móvel se referem à aba selecionada. Os cards de gráfico e ferramentas têm a mesma altura no computador e a mesma sombra rígida azul; no celular ficam empilhados. Os filtros do banco compartilham o seletor personalizado das funções. As quatro dificuldades são Fácil (1), Médio (2), Difícil (3) e Desafio (4), validadas no banco e no gerador de dados.

Limites mostra aproximações pelos dois lados, uma tabela e os limites laterais, incluindo descontinuidades racionais. Derivadas compara secante e tangente e pode exibir a curva de f′. Integrais mostra a região e retângulos à esquerda, à direita ou pelo ponto médio; o resultado usa uma primitiva da família selecionada e respeita a orientação dos limites. Intervalos fora do domínio ou com descontinuidades são rejeitados: não há cálculo de integrais impróprias. Interseções são aproximações numéricas na janela atual e podem não identificar todos os encontros em janelas muito amplas ou funções muito oscilantes.

O banco permite filtrar questões concluídas e pendentes. O progresso é guardado no navegador por origem (protocolo, host e porta) e sincronizado entre abas da mesma origem.

O servidor usa a porta fixa 5173 e não muda silenciosamente de porta quando ela está ocupada, para evitar que o histórico pareça desaparecer em outro endereço. Se estiver ocupada, encerre a outra instância do projeto antes de executar `npm run dev`. Use sempre o mesmo endereço: `localhost` e `127.0.0.1` possuem armazenamentos distintos.

O Laboratório tem áreas de Gráficos, Círculo trigonométrico e Geometria. A engrenagem define a faixa dos coeficientes dos gráficos (padrão −100 a 100). No círculo, o ângulo controla um marcador nas ondas, e cada onda tem parâmetros independentes. A altura na reta x = 1 mostra a tangente quando definida. Em Geometria, arraste os pontos ou edite x e y na mesma linha para explorar retas, somas e produtos de vetores e as medidas de triângulos, retângulos e círculos. O Mapa de conceitos conecta o banco aos experimentos do Laboratório.

Para verificar os cálculos, as preferências e a compatibilidade das explorações com Node.js 24+, execute `node --test scripts/lab_math.test.mjs scripts/lab_evolution.test.mjs scripts/lab_preferences.test.mjs`.

O banco reúne adaptações de obras da OpenStax e exercícios originais em português. A referência e sua licença aparecem nos créditos de cada questão.

Para conferir as regressões da auditoria: `python scripts/test_question_audit.py`. Para os filtros e setas: `node --test scripts/question_navigation.test.mjs`.

O lote completo por referência é verificado por `python scripts/test_ia2_ch1_review.py`; a renderização matemática de todo o acervo, por `node --test scripts/question_math_render.test.mjs`. A suíte Python completa pode ser executada com `python -m unittest discover -s scripts -p "test_*.py"` (Python 3.12+ para o importador e os testes do lote).

Se as dependências já estiverem instaladas, basta executar `npm run dev`. O projeto também mantém o suporte a pnpm e seu arquivo de lock.

## Atualizar o banco de questões

O banco tem **1.920 questões ativas e 410 arquivadas**, com limite de 15 por dificuldade em cada tópico. A varredura dos 12 capítulos de Intermediate Algebra 2e acrescentou 937 questões somente nas vagas disponíveis; os excedentes anteriores permaneceram intactos. O catálogo reunido soma 2.330 registros.

Matemática Básica tem 840 questões em 14 tópicos, com 15 por dificuldade em cada tópico. O complemento de 220 questões originais usa como referências conceituais dois livros do Project Gutenberg, [Elements of Arithmetic](https://www.gutenberg.org/ebooks/68662) e [The First Steps in Algebra](https://www.gutenberg.org/ebooks/36670), catalogados como domínio público nos EUA. Resoluções de exercícios gráficos incluem um esboço com a mesma escala nos dois eixos.

Pré-Cálculo tem 660 questões em 11 tópicos, com 15 por dificuldade em cada tópico. As 133 questões originais acrescentadas incluem 60 de Trigonometria. O lote usa como referências conceituais [A Course of Pure Mathematics](https://www.gutenberg.org/ebooks/38769), [Elements of Plane Trigonometry](https://www.gutenberg.org/ebooks/32973) e o livro de álgebra já citado.

Cálculo 1 tem 420 questões em sete tópicos, com 15 por dificuldade em cada tópico. O lote de 412 questões originais inclui dicas e resoluções que mostram como aplicar as regras, com [Calculus Made Easy](https://www.gutenberg.org/ebooks/33283/) e [A Course of Pure Mathematics](https://www.gutenberg.org/ebooks/38769) como referências conceituais.

O Laboratório inclui propriedades, três métodos de Riemann, trigonometria com fase e unidades, geometria, continuidade e o mapa conectado ao banco.

O catálogo tem 32 tópicos distribuídos entre Matemática Básica, Pré-Cálculo e Cálculo 1. Tópicos vazios também aparecem no filtro com a indicação “sem questões”; as famílias e a composição têm Funções como tópico pai. O catálogo completo e as contagens são exportados em `topics`, junto com `questions`, no JSON público. Para adicionar um tópico, inclua-o em `topics` no seed e regenere os dados; ele não precisa ter questões.

A primeira importação por referência completou os 81 exercícios da revisão do capítulo 1 de Intermediate Algebra 2e: 78 novos e três preservados. As questões de localização na reta mostram um esboço proporcional na resolução.

Expressões livres e calculadoras adicionais continuam planejadas para o Laboratório.

Edite `database/seeds/pilot_questions.json` e execute:

```powershell
npm run data:build
```

O comando valida as questões, recria `database/questions.sqlite` e gera o acervo completo em `public/data/questions.json` e o catálogo de tópicos em `src/questionCatalog.generated.json`. O Vite usa o acervo para gerar o índice de busca e os detalhes por tópico. Ao publicar, inclua a pasta `dist` completa.

Para validar o catálogo e a exportação de tópicos sem questões: `python scripts/test_topic_catalog.py`.

## Gerar a versão de produção

Antes da primeira publicação, copie `.env.example` para `.env.production` e preencha o domínio (`VITE_SITE_URL`) e o e-mail de contato da política de privacidade (`VITE_CONTACT_EMAIL`). Esses valores são públicos; não coloque segredos nesse arquivo. Na hospedagem, as mesmas variáveis também podem ser definidas no painel de build.

```powershell
npm run build
```

Os arquivos prontos para publicação serão criados em `dist/`, incluindo `robots.txt`, `sitemap.xml` (aulas e todas as questões), `llms.txt` (resumo do site para assistentes de IA), ícones e `site.webmanifest`.

### Publicação

As rotas usam endereços limpos (`/questoes`, `/estudar?topico=limites`), sem `#/`. Links antigos com `#/` são convertidos automaticamente. Por isso, o servidor precisa devolver o `index.html` para qualquer caminho que não seja um arquivo:

- **Cloudflare Pages** (recomendado): faz isso automaticamente quando não existe `404.html`, e aplica `public/_headers` (CSP, HSTS, `X-Frame-Options`, `Permissions-Policy` e cache). Ative também *SSL/TLS → Always Use HTTPS* e, se quiser proteção contra robôs e limite de requisições, *Bot Fight Mode* e uma regra de *Rate limiting* no painel.
- **Netlify**: também lê `_headers`; adicione um arquivo `public/_redirects` com `/* /index.html 200`.
- **GitHub Pages** não oferece reescrita de rotas nem cabeçalhos de segurança, por isso não é indicado para esta versão.

O site não tem backend, login, formulários nem uploads: não há dados pessoais armazenados em servidor. O progresso e as preferências ficam no `localStorage` do navegador, conforme descrito em `/privacidade`.

## Estrutura principal

- `src/`: interface React;
- `database/schema.sql`: estrutura relacional do banco;
- `database/seeds/pilot_questions.json`: fonte editável das questões;
- `database/questions.sqlite`: banco para consulta e manutenção;
- `public/data/questions.json`: acervo completo exportado pelo banco; o build gera a partir dele o índice e os arquivos por tópico em `data/bank/` (só com os campos que a tela usa) e não publica o arquivo completo;
- `scripts/build_database.py`: validação e geração dos dados.
