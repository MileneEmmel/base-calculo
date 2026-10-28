# Plano de evolução do ∫NTEGRA

Plano de referência de 25/10/2026. As etapas 1, 2, 4 e 5 foram autorizadas e implementadas: propriedades, fórmula da derivada, três somas de Riemann, fase/unidade angular, círculo trigonométrico, modelo exponencial de base q, geometria com pontos arrastáveis, exemplos de continuidade, assíntotas e mapa conectado ao banco e ao Laboratório. A etapa 3 (expressão livre) continua planejada. As sugestões de calculadoras de sistemas, matrizes e vetores continuam como expansões futuras, conforme as decisões de escopo abaixo.

As tabelas de diagnóstico e a proposta original a seguir registram o ponto de partida. A implementação usa um único painel para até quatro curvas, mantém o histórico existente e lê explorações antigas com fase zero e deslocamento vertical preservado. O método de Riemann e os pontos da geometria também podem ser guardados em Salvos. Os links das questões distinguem dados exatos da questão de exemplos relacionados ao conceito.

## Catálogo de tópicos implementado

Os tópicos existem independentemente das questões. O filtro mostra também os vazios, com a indicação “sem questões”; ao selecionar um deles, a tela informa que o tópico está cadastrado e ainda não possui exercícios. As contagens consideram as questões publicadas, sem depender de filtros de dificuldade ou busca.

| Módulo | Tópicos, na ordem de estudo |
| --- | --- |
| Matemática Básica | Conjuntos numéricos; Operações numéricas; Intervalos; Razão, proporção e porcentagem; Potenciação e radiciação; Expressões algébricas; Produtos notáveis; Fatoração; Equações e inequações; Sistemas lineares. |
| Pré-Cálculo | Funções; Funções afins; Funções quadráticas; Funções polinomiais; Funções racionais; Funções exponenciais; Funções logarítmicas; Composição de funções; Trigonometria; Geometria analítica; Sequências e progressões. |
| Cálculo 1 | Limites; Continuidade; Derivadas; Aplicações da derivada; Integrais; Técnicas de integração; Aplicações da integral. |

As famílias de funções e a composição são filhas de Funções no catálogo. O tópico pai reúne questões de conceitos gerais; a seleção de uma família usa somente suas questões, sem duplicar os exercícios do tópico pai.

Operações numéricas, expressões algébricas e composição foram mantidas porque já possuíam exercícios. “Funções lineares” foi ampliado para “Funções afins”, incluindo a função linear como caso particular. Equações e sistemas foram separados; limites e continuidade também. As questões de fatoração, sistemas, continuidade e reta tangente foram reclassificadas. Geometria analítica passou a Pré-Cálculo. Os IDs das questões permanecem iguais, inclusive os prefixos históricos MB/PC/C1, preservando o histórico local.

## O que já existe e o que falta

| Sugestão recebida | Situação atual | Encaminhamento |
| --- | --- | --- |
| Página de Laboratório de Funções | Já existe Laboratório, com até quatro curvas e seleção por abas. | Manter o nome Laboratório: também comporta cálculo, trigonometria e geometria. |
| Escolher família e alterar coeficientes | Já existe para afim, quadrática, exponencial, logarítmica, seno, cosseno e racional, com atualização imediata. | Preservar a base e acrescentar interpretação pedagógica. |
| Digitar uma expressão livre | Não existe; hoje são modelos prontos parametrizados. | Criar um modo de expressão com sintaxe delimitada e mensagens de erro, sem executar código digitado. |
| Raízes, intercepto em y, vértice e domínio | Já existem nas famílias suportadas. | Melhorar a organização e explicar os resultados, sem criar outra calculadora para repetir essas funções. |
| Discriminante, eixo de simetria, concavidade, imagem e monotonicidade | Não aparecem como propriedades completas. | Prioridade para quadráticas; depois estender às demais famílias quando houver uma regra confiável. |
| Secante aproximando-se da tangente | Já existe, com h, ponto móvel, inclinações e curva da derivada. | Acrescentar fórmula legível de f′ e reprodução guiada opcional. |
| Retângulos de Riemann e integral | Já existem com quantidade ajustável e regra do ponto médio. O valor da integral usa uma primitiva das famílias suportadas, avaliada numericamente. | Adicionar regras à esquerda/direita e comparação dos erros, diferenciando resultado analítico de aproximação numérica. |
| Animações de limites, continuidade e assíntotas | Há controles manuais de limites e uma função racional; não há reprodução nem funções gerais por partes. | Implementar exemplos curtos, com controles de iniciar, pausar e reiniciar. |
| Trigonometria com quatro parâmetros | Hoje há a·sen(bx)+c e a·cos(bx)+c; falta fase horizontal. | Acrescentar fase, propriedades e círculo trigonométrico integrado. |
| Geometria analítica com pontos arrastáveis | Ainda não existe como ferramenta específica. | Criar uma área do Laboratório para dois pontos, distância, ponto médio, inclinação e reta. |
| Mapa de conceitos | Ainda não existe. | Basear nos tópicos já cadastrados e ligar exercícios, conceitos e ferramentas. |
| Muitas calculadoras independentes | Parte repetiria recursos do Laboratório. | Priorizar ferramentas contextualizadas, com passos e interpretação, em vez de uma lista extensa de respostas automáticas. |

## Ordem proposta

### 1. Interpretar melhor o que já temos

Primeira entrega sugerida:

- Painel “Propriedades” da função selecionada, começando por afim e quadrática.
- Na quadrática: Δ, concavidade, eixo de simetria desenhável, vértice, raízes, imagem, intervalos de crescimento/decrescimento e máximo ou mínimo global.
- Tratamento explícito de a = 0, que deixa de ser uma quadrática; não mostrar fórmulas inválidas por divisão por zero.
- Fórmula de f′ ao lado da inclinação da tangente, para as famílias já suportadas.
- Seleção da soma de Riemann à esquerda, à direita ou pelo ponto médio, com n, valor da soma e erro em relação à integral calculada por primitiva.
- Resultado da integral com sinal; distinguir área geométrica, integral orientada e integrais impróprias.

Aceitação: uma quadrática com Δ positivo, nulo e negativo mostra propriedades corretas; a = 0 é explicado; para x² em [0,3] a integral vale 9 e as três somas convergem a esse valor conforme n cresce. Aumentar n não deve ser descrito como garantia universal de erro estritamente decrescente em qualquer função.

### 2. Trigonometria e modelos parametrizados mais claros

- Ampliar seno e cosseno para A·sen(Bx+C)+D e A·cos(Bx+C)+D.
- Mostrar amplitude |A|, período 2π/|B|, frequência em ciclos por unidade |B|/(2π), fase e deslocamento horizontal −C/B, quando B ≠ 0.
- Explicar os casos constantes A = 0 e B = 0, sem atribuir período fundamental a uma constante.
- Adicionar alternância entre graus e radianos, com unidade visível e conversão consistente.
- Círculo trigonométrico ligado ao ponto no gráfico, com animação opcional e pausável.
- Para exponenciais, oferecer o modelo de base a·q^x+c, com q > 0, além do modelo atual a·e^(bx)+c. Explicar a equivalência e o caso q = 1.

Compatibilidade: explorações antigas devem abrir com fase zero e o deslocamento vertical anterior preservado. A troca do modelo exponencial não pode reinterpretar silenciosamente coeficientes já salvos.

### 3. Expressão digitada com escopo claro

- Campo opcional para expressões como x²−4x+3, separado dos modelos com sliders.
- Parser matemático com operações e funções permitidas, validação e mensagens em português; nunca usar eval ou Function para avaliar texto.
- Definir sintaxe para potência, multiplicação implícita, vírgula decimal, constantes e nomes de funções antes de implementar.
- Priorizar expressões polinomiais e combinações elementares; descontinuidades devem interromper o traço.
- Só oferecer sliders quando os parâmetros da expressão estiverem declarados. Não inventar coeficientes a/b/c para qualquer expressão.
- Diferenciar propriedades exatas das estimativas numéricas. Uma amostragem de gráfico não prova domínio, imagem, continuidade nem ausência de raízes fora da janela.
- Para funções sem primitiva suportada, mostrar integração numérica com essa identificação, sem rotular como integral exata.

Aceitação: expressões inválidas não travam a página; divisões por zero e logaritmos fora do domínio não geram traços falsos; funções salvas não perdem sua representação.

### 4. Geometria analítica e exploração de continuidade

- Área “Geometria” no mesmo Laboratório, com P₁ e P₂ editáveis e arrastáveis.
- Distância, ponto médio, coeficiente angular e equação da reta com atualização imediata.
- Tratar reta vertical como x = constante; pontos coincidentes não definem uma reta única.
- Exemplos de continuidade com funções por partes: contínua, salto e ponto removível. Comparar limites laterais e valor da função.
- Assíntotas horizontais e verticais desenhadas como referências, ligadas ao comportamento dos limites.

Correção conceitual: uma função pode cruzar uma assíntota horizontal ou oblíqua. Não usar a afirmação geral de que uma assíntota é uma reta que o gráfico nunca toca. Percorrer uma curva com o mouse, por si só, também não demonstra continuidade.

### 5. Conectar conceitos e decidir ferramentas adicionais

- Mapa de conceitos com pré-requisitos, usando o catálogo real de tópicos. Distinguir pré-requisito de aplicação; integrais não devem parecer uma consequência exclusiva de máximos e mínimos.
- Cada nó leva às questões do tópico, inclusive aos tópicos ainda vazios, e aos experimentos pertinentes.
- Links “Explorar no Laboratório” nas questões compatíveis, com exemplos previamente configurados.
- Bhaskara dentro das propriedades da quadrática; conversão graus/radianos dentro da trigonometria.
- Sistemas lineares como possível próxima ferramenta, porque já são um tópico de Matemática Básica.
- Matrizes, determinantes e vetores ficam como expansão futura, após definição do escopo curricular e de exercícios correspondentes.
- Uma calculadora científica genérica só deve entrar se houver uma necessidade concreta que os controles e as resoluções atuais não atendam.

## Diretrizes para todas as etapas

- Reutilizar a estética atual, o gráfico e o painel único de funções.
- Atualizar os cálculos da função selecionada e manter o limite de quatro curvas.
- Preservar os exercícios concluídos, IDs e explorações salvas.
- Oferecer alternativa por teclado a sliders e pontos arrastáveis.
- Manter animações opcionais, com pausa e respeito à preferência por movimento reduzido.
- Escolher exemplos e exercícios para verificar a compreensão, em vez de usar animações somente como decoração.
- Não criar novas páginas para recursos que cabem como ferramentas do Laboratório.

## Decisão sugerida para a próxima implementação

Etapas 1, 2, 4 e 5 concluídas. A próxima decisão é se a etapa 3, de expressões livres, deve ser iniciada ou se é preferível ampliar o acervo de exercícios dos tópicos ainda vazios.
