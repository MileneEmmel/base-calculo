# Laboratório do ∫NTEGRA

Etapas 1, 2, 4 e 5 do plano implementadas em 25/10/2026. A entrada de expressão livre continua fora do escopo.

## Ferramentas

- **Navegação:** Gráficos reúne Funções, Propriedades, Limites, Derivadas e Integrais em um submenu. Círculo trigonométrico, Geometria e Salvos são áreas próprias do Laboratório. A engrenagem abre Configurações. O Mapa de conceitos foi movido para uma seção independente em `#/mapa`, acessível pelo cabeçalho.
- **Escalas e limites:** controles de posição usam os limites da janela visível e acompanham zoom e deslocamento. Sliders contínuos preservam a proporção mesmo em limites fracionários. Os coeficientes têm uma faixa independente, configurável pela engrenagem, com padrão −100 a 100. Aplicar uma faixa ajusta coeficientes que estiverem fora dela; os exemplos e explorações carregados expandem a faixa quando necessário para preservar seus dados. Ângulos e bases mantêm os respectivos domínios.
- **Propriedades:** afins e quadráticas mostram raízes, Δ, vértice, eixo de simetria, concavidade, imagem, variação e extremos, conforme aplicável. Com a igual a zero, a quadrática passa a ser afim ou constante. O resultado de Bhaskara é integrado a esse painel.
- **Derivadas:** fórmula legível da derivada, reta tangente, secante, inclinações, curva da derivada e aproximação animada opcional de h até 0,001. Não se afirma que a derivada existe nos pontos de descontinuidade.
- **Integrais:** escolha qual soma desenhar: esquerda, direita ou ponto médio. Uma tabela compara as três aproximações e seus erros absolutos em relação ao valor por primitiva. A área geométrica é não negativa; a integral tem orientação e sinal. O erro não é necessariamente estritamente decrescente a cada aumento de n. Não são calculadas integrais impróprias.
- **Gráficos trigonométricos:** seno e cosseno têm amplitude A, fator B, fase C e deslocamento vertical D no editor de funções. O painel de propriedades mostra período, frequência em ciclos por unidade de x, deslocamento horizontal e imagem. Funções constantes não recebem período fundamental.
- **Círculo trigonométrico:** área independente, com o círculo unitário como visualização principal. Clique, arraste, use as setas no ponto ou ajuste o ângulo em graus/radianos. Mostra projeções, seno, cosseno, tangente (incluindo os ângulos em que não é definida), quadrante e ângulos de referência. A animação é opcional. Abrir o círculo preserva as funções do plano cartesiano.
- **Graus e radianos:** a troca converte a fase, o x do ponto móvel e a janela horizontal, preservando a altura da visualização. O fator π/180 aparece na fórmula da derivada em graus; derivadas e integrais respeitam a unidade escolhida.
- **Exponenciais:** escolha os modelos de base e ou base q positiva. q igual a 1 produz uma constante. Os exemplos salvos no modelo antigo continuam com base e e com o mesmo significado de b. Os parâmetros do outro modelo são preservados ao alternar; mudar o modelo é uma ação explícita.
- **Geometria:** P₁ e P₂ podem ser arrastados, editados pelos campos ou movidos pelas setas após receberem foco. Shift aumenta o passo. O sistema recalcula distância, ponto médio, coeficiente angular e equação da reta. Retas verticais e pontos coincidentes são tratados sem divisões inválidas.
- **Continuidade:** exemplos por partes de junção contínua, salto e ponto removível, comparando limites laterais e valor da função. Assíntotas horizontais e verticais são referências tracejadas. Um ponto removível aparece como círculo aberto.
- **Mapa:** todos os 32 tópicos do catálogo, com pré-requisitos recomendados e conteúdos que se apoiam neles. Há links para o banco, incluindo tópicos vazios, e para experimentos relacionados. As relações não impõem uma única ordem de estudo.

## Conexões com exercícios

Questões compatíveis têm um link para o Laboratório. Quando os modelos permitem reproduzir os dados exatos, a ferramenta abre com esses dados. Nos outros casos, o texto informa que o experimento é um exemplo relacionado ao conceito.

Exemplos: a PC-006 abre a parábola x² − 4x − 5; MB-005 e PC-003 abrem os pontos da geometria; C1-001 abre a função linear equivalente com o ponto x igual a 2 removido, ilustrando o limite do quociente original. Os modelos exponenciais de PC-007 e PC-008 preservam os coeficientes e a base da questão.

Os links do mapa para o banco aplicam módulo e tópico automaticamente. Não é necessário haver questões publicadas para abrir um tópico.

## Acessibilidade e persistência

- Até quatro funções, com um editor por vez, continuam no mesmo painel.
- As animações são opcionais, pausáveis e interrompidas ao ocultar a página. A preferência do navegador por movimento reduzido desabilita a reprodução automática dos controles de animação; campos e sliders continuam disponíveis.
- Sliders têm campos numéricos equivalentes; pontos da geometria têm alternativa por teclado.
- As explorações antigas são lidas sem alterar a fase ou deslocamento vertical: a ausência de fase significa fase zero, e c continua sendo o deslocamento vertical dos modelos trigonométricos antigos.
- Salvos inclui as funções, a função selecionada, a unidade, a fase, o modelo exponencial, a janela, o método de Riemann, os pontos da geometria, os limites dos coeficientes e o círculo. Pontos editados também permanecem ao alternar as ferramentas. A faixa dos coeficientes e o último ângulo do círculo persistem entre recarregamentos.
- O histórico de exercícios permanece associado aos mesmos IDs e ao armazenamento local do mesmo endereço e perfil de navegador.

## Escopo futuro

Expressões livres pertencem à etapa 3 e não foram adicionadas. Calculadoras independentes de sistemas, matrizes, determinantes, vetores ou uma calculadora científica genérica continuam como possíveis expansões curriculares. Bhaskara e graus/radianos já estão integrados às ferramentas correspondentes.

## Verificações

O conjunto de testes do laboratório cobre as três situações do discriminante, quadrática degenerada, convergência e orientação das três somas de Riemann, área com sinal, modelos angulares e exponenciais, exemplos de continuidade, retas verticais, pontos coincidentes, compatibilidade das explorações e conexões do mapa com o catálogo real. Os percursos de navegação e as interações também foram verificados no navegador.
