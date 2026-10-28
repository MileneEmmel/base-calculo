# ∫NTEGRA

Protótipo sem backend de uma plataforma gratuita de exercícios de Matemática Básica, Pré-Cálculo e Cálculo 1.

## O que já funciona

- 1.155 exercícios ativos organizados por referência, módulo, tópico e dificuldade;
- busca e filtros;
- fórmulas renderizadas com KaTeX;
- dicas, resoluções e referências das fontes;
- progresso salvo no próprio navegador com `localStorage`;
- layout responsivo para computador e celular.

A identidade visual segue o contrato documentado em `DESIGN.md`: uma linguagem de caderno de exercícios universitário, com fontes locais e sem dependência de serviços externos para carregar a tipografia.

## Rodar no computador

Pré-requisito: Node.js 20.19+ (inclui npm).

```powershell
npm install
npm run dev
```

Abra o endereço exibido no terminal, normalmente `http://localhost:5173`.

O cabeçalho fixo dá acesso ao Início, Banco de questões (`#/questoes`), Laboratório (`#/laboratorio`), Mapa de conceitos (`#/mapa`) e Sobre. O banco tem uma tela própria, com filtros e acesso às resoluções. Na página de uma questão, as setas à direita de “Voltar aos exercícios” seguem a mesma lista filtrada e ordenada do banco. Módulo, tópico, dificuldade e busca ficam no endereço, preservando a sequência após recarregar e nos botões de voltar e avançar do navegador. As setas ficam desativadas nas extremidades.

O Laboratório (`#/laboratorio`) organiza as ferramentas de Funções, Propriedades, Limites, Derivadas e Integrais no submenu de Gráficos. Inclui funções afins, quadráticas, exponenciais, logarítmicas, seno, cosseno, racionais e exemplos por partes. Os coeficientes têm faixa configurável, com padrão −100 a 100, por campo numérico ou controle deslizante. O seletor personalizado mostra o nome e o modelo de cada família; as funções trigonométricas podem usar graus ou radianos.

Clique no gráfico para ativar o zoom pela roda do mouse, ancorado no cursor. Esc ou clicar fora libera a rolagem da página. Também há arraste, botões de zoom e deslocamento, enquadramento automático da função ativa e atalhos de teclado. Configurações controla grade, coordenadas, curvas, ponto móvel, raízes, vértice, encontro com o eixo y e interseções da função selecionada com as demais. O controle de x acompanha os valores mínimo e máximo da janela horizontal, inclusive ao deslocar o gráfico, e mantém o ponto nessa faixa. Não há tabela geral de valores nem frase de instruções no card.

Um único painel permite editar até quatro funções pelas abas numeradas 1 a 4. O botão + cria uma função e seleciona sua aba; o − remove a selecionada quando há mais de uma. Todas as curvas continuam no gráfico. Limites, derivadas, integrais e o ponto móvel se referem à aba selecionada. Os cards de gráfico e ferramentas têm a mesma altura no computador e a mesma sombra rígida azul; no celular ficam empilhados. Os filtros do banco compartilham o seletor personalizado das funções. As quatro dificuldades são Fácil (1), Médio (2), Difícil (3) e Desafio (4), validadas no banco e no gerador de dados.

Limites mostra aproximações pelos dois lados, uma tabela e os limites laterais, incluindo descontinuidades racionais. Derivadas compara secante e tangente e pode exibir a curva de f′. Integrais mostra a região e retângulos à esquerda, à direita ou pelo ponto médio; o resultado usa uma primitiva da família selecionada e respeita a orientação dos limites. Intervalos fora do domínio ou com descontinuidades são rejeitados: não há cálculo de integrais impróprias. Interseções são aproximações numéricas na janela atual e podem não identificar todos os encontros em janelas muito amplas ou funções muito oscilantes.

Salvos guarda até 30 explorações com as funções, visualização e parâmetros das ferramentas. O progresso das questões e as explorações usam `localStorage`, preservado entre sessões no mesmo perfil do navegador e na mesma origem (protocolo, host e porta). Isso não é sincronização com a conta Google. Limpar os dados do site ou usar navegação anônima pode remover esse histórico. As abas do mesmo endereço sincronizam o progresso das questões.

O servidor usa a porta fixa 5173 e não muda silenciosamente de porta quando ela está ocupada, para evitar que o histórico pareça desaparecer em outro endereço. Se estiver ocupada, encerre a outra instância do projeto antes de executar `npm run dev`. Use sempre o mesmo endereço: `localhost` e `127.0.0.1` possuem armazenamentos distintos.

O Laboratório tem áreas próprias para Gráficos, Círculo trigonométrico, Geometria e Salvos. As ferramentas de cálculo ficam no submenu de Gráficos. A engrenagem permite definir a faixa dos coeficientes (padrão −100 a 100); controles de posição acompanham o zoom visível. O círculo possui ângulo e animação independentes do plano cartesiano. O Mapa de conceitos é uma seção independente, com conexões para o banco e para experimentos do Laboratório.

Para verificar os cálculos, as preferências e a compatibilidade das explorações com Node.js 24+, execute `node --test scripts/lab_math.test.mjs scripts/lab_evolution.test.mjs scripts/lab_preferences.test.mjs`.

A auditoria das 24 questões iniciais e suas fontes está em [AUDITORIA_QUESTOES.md](AUDITORIA_QUESTOES.md). Os enunciados são traduções/adaptações de quatro obras da OpenStax, sob as licenças indicadas em cada questão. Os créditos também aparecem nas telas que mostram enunciados. A pesquisa de fontes para ampliar o acervo está em [FONTES_EXERCICIOS.md](FONTES_EXERCICIOS.md); a primeira importação posterior é documentada em [IMPORTACAO_IA2_CAP1.md](IMPORTACAO_IA2_CAP1.md).

Para conferir as regressões da auditoria: `python scripts/test_question_audit.py`. Para os filtros e setas: `node --test scripts/question_navigation.test.mjs`.

O lote completo por referência é verificado por `python scripts/test_ia2_ch1_review.py`; a renderização matemática de todo o acervo, por `node --test scripts/question_math_render.test.mjs`. A suíte Python completa pode ser executada com `python -m unittest discover -s scripts -p "test_*.py"` (Python 3.12+ para o importador e os testes do lote).

Se as dependências já estiverem instaladas, basta executar `npm run dev`. O projeto também mantém o suporte a pnpm e seu arquivo de lock.

## Atualizar o banco de questões

O banco tem **1.155 questões ativas e 410 arquivadas**, com limite de 15 por dificuldade em cada tópico. A varredura dos 12 capítulos de Intermediate Algebra 2e acrescentou 937 questões somente nas vagas disponíveis; os excedentes anteriores permaneceram intactos. O catálogo reunido soma 1.565 registros. Consulte [AMPLIACAO_IA2_LIVRO.md](AMPLIACAO_IA2_LIVRO.md) para a cobertura atual e [LIMITES_QUESTOES.md](LIMITES_QUESTOES.md) para seleção e recuperação. A importação histórica do capítulo 1 está em [IMPORTACAO_IA2_CAP1_COMPLETO.md](IMPORTACAO_IA2_CAP1_COMPLETO.md).

O filtro Referência inclui “Intermediate Algebra 2e — Todas as questões ativas”, combinável com tópico e dificuldade. Resoluções de exercícios gráficos incluem um esboço com a mesma escala nos dois eixos.

O guia atualizado das ferramentas implementadas nas etapas 1, 2, 4 e 5 está em LABORATORIO.md. Ele descreve propriedades, três métodos de Riemann, trigonometria com fase e unidades, geometria, continuidade e o mapa conectado ao banco.

O catálogo tem 32 tópicos distribuídos entre Matemática Básica, Pré-Cálculo e Cálculo 1. Tópicos vazios também aparecem no filtro com a indicação “sem questões”; as famílias e a composição têm Funções como tópico pai. O catálogo completo e as contagens são exportados em `topics`, junto com `questions`, no JSON público. Para adicionar um tópico, inclua-o em `topics` no seed e regenere os dados; ele não precisa ter questões.

A primeira importação por referência completou os 81 exercícios da revisão do capítulo 1 de Intermediate Algebra 2e: 78 novos e três preservados. Consulte [IMPORTACAO_IA2_CAP1.md](IMPORTACAO_IA2_CAP1.md) para cobertura, novos tópicos e adaptações. O filtro Referência usa o número original para ordenar as questões e as setas; os demais filtros continuam combináveis. As questões de localização na reta mostram um esboço proporcional na resolução.

O plano proposto para evolução do Laboratório está em `PLANO_EVOLUCAO.md`. As etapas 1, 2, 4 e 5 já foram implementadas. Expressões livres e calculadoras adicionais continuam planejadas.

Edite `database/seeds/pilot_questions.json` e execute:

```powershell
npm run data:build
```

O comando valida as questões, recria `database/questions.sqlite` e gera o JSON usado pelo site em `public/data/questions.json`.

Para validar o catálogo e a exportação de tópicos sem questões: `python scripts/test_topic_catalog.py`.

## Gerar a versão de produção

```powershell
npm run build
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
