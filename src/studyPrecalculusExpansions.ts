import type { StudyLesson } from "./studyBasics";

type LessonExpansion = Pick<StudyLesson, "sections" | "checks">;

export const precalculusExpansions: Record<string, LessonExpansion> = {
  funcoes: {
    sections: [
      {
        title: "Leia funções definidas por partes",
        paragraphs: [
          "Uma função pode usar uma expressão para entradas pequenas e outra para entradas maiores. As condições escritas junto às fórmulas dizem qual regra usar. Primeiro localize x na faixa correta. Só depois substitua o valor na expressão daquele trecho.",
          "Na fronteira, observe qual condição aceita a igualdade. No gráfico, um círculo preenchido representa o valor efetivo. Um círculo aberto mostra onde o outro trecho se aproximaria sem incluir o ponto. Os dois símbolos podem aparecer na mesma coluna sem violar o teste da reta vertical, desde que só um deles esteja preenchido.",
        ],
        example: { title: "Uma fronteira que muda a regra", prompt: "Use §f(x)=x+1§ se §x<1§ e §f(x)=4-x§ se §x\\ge1§. Encontre §f(0)§, §f(1)§ e §f(2)§.", steps: ["Para 0, use a primeira regra e obtenha §f(0)=1§.", "Para 1, a segunda condição inclui a igualdade: §f(1)=4-1=3§. O círculo aberto em §(1,2)§ indica que o trecho da esquerda não inclui esse ponto.", "Para 2, continue na segunda regra: §f(2)=2§. O gráfico tem um salto em §x=1§."] },
        visual: { kind: "precalc-graph", model: "piecewise", caption: "Teste 0, 1 e 2. Na fronteira em 1, só o ponto fechado, na altura 3, dá o valor da função." },
      },
      {
        title: "Determine a imagem por uma condição sobre y",
        paragraphs: [
          "Quando o gráfico não está disponível, escreva §y=f(x)§ e pergunte para quais valores de y existe uma entrada x permitida. Em uma função quadrática, o quadrado impõe um limite inferior ou superior. Em uma racional, isolar x pode revelar uma saída impossível.",
          "O valor excluído da imagem não precisa ter o mesmo número que o valor excluído do domínio. Domínio descreve onde podemos entrar. Imagem descreve onde podemos chegar. Verifique a volta substituindo a entrada encontrada, especialmente depois de manipular denominadores.",
        ],
        example: { title: "Descubra uma saída que nunca ocorre", prompt: "Encontre domínio e imagem de §f(x)=2+1/(x-3)§.", steps: ["O denominador exclui a entrada 3.", "Se §y=2§, a igualdade exigiria §1/(x-3)=0§, impossível. Para qualquer outro y, podemos usar §x=3+1/(y-2)§.", "Essa entrada é diferente de 3. A imagem é §\\mathbb R\\setminus\\{2\\}§." ] },
      },
      {
        title: "Escolha uma regra coerente com os dados",
        paragraphs: [
          "Observe o que acontece quando a entrada avança por passos iguais. Diferenças iguais nas saídas sugerem um modelo afim. Razões iguais entre saídas não nulas sugerem um exponencial. Uma tabela finita, porém, pode ser reproduzida por mais de uma fórmula. O contexto ajuda a escolher.",
          "Interpolar é estimar dentro da faixa observada. Extrapolar é usar a regra fora dela, onde o comportamento pode mudar. Antes de usar a fórmula para decidir algo, confira unidades, entradas admissíveis e se a previsão é compatível com a situação.",
        ],
        example: { title: "Compare dois padrões na tabela", prompt: "Em horas consecutivas, um contador registra 8, 12, 16 e 20. Outro registra 8, 16, 32 e 64. Proponha uma regra para cada um, começando em §t=0§.", steps: ["O primeiro acrescenta 4 por hora, então §A(t)=8+4t§.", "O segundo dobra por hora, então §B(t)=8\\cdot2^t§.", "Em §t=4§, os modelos preveem 24 e 128. A validade depende de os padrões continuarem." ] },
        visual: { kind: "cards", caption: "Compare a operação que leva de uma saída à próxima.", items: [["Passo aditivo", "8 → 12 → 16 → 20"], ["Passo multiplicativo", "8 → 16 → 32 → 64"]] },
      },
    ],
    checks: [
      { prompt: "Se §f(x)=3x^2-1§, calcule §f(1-h)§.", solution: "Substitua toda a entrada e expanda §3(1-h)^2-1=3h^2-6h+2§." },
      { prompt: "O gráfico de §x^2+y^2=4§ passa no teste da reta vertical?", solution: "Não. Em §x=0§, os pontos §(0,2)§ e §(0,-2)§ dão duas saídas." },
      { prompt: "Qual é a imagem de §f(x)=-x^2+7§ em ℝ?", solution: "O maior valor é 7, atingido em zero. As saídas descem sem limite, então a imagem é §(-\\infty,7]§." },
      { prompt: "Uma regra aceita só entradas §x\\ge-1§. Qual é o domínio de §g(x)=f(x-3)§?", solution: "Exija §x-3\\ge-1§. Logo, §x\\ge2§ e o domínio é §[2,\\infty)§." },
    ],
  },
  "funcoes-afins": {
    sections: [
      {
        title: "Interpole um valor entre duas medições",
        paragraphs: [
          "Quando o modelo é afim, a mudança numa fração do percurso horizontal é a mesma fração da mudança vertical. Essa é a interpolação linear. Você pode usá-la diretamente sem encontrar b, partindo de um ponto conhecido e somando a inclinação vezes a diferença na entrada.",
          "O método pressupõe taxa constante naquele intervalo. Para estimar além da faixa observada, estamos extrapolando. Um tanque pode encher a taxa constante durante alguns minutos, mas deixa de seguir a reta quando está cheio ou quando a vazão muda.",
        ],
        example: { title: "Estime o volume entre duas leituras", prompt: "Um tanque tinha 30 L aos 2 min e 54 L aos 8 min. Estime o volume aos 5 min, com vazão constante.", steps: ["Em 6 min, entram 24 L. A vazão é 4 L por minuto.", "De 2 a 5 min passam 3 min. Some §3\\cdot4=12§ L aos 30 L.", "O volume é 42 L, exatamente a média das leituras porque o instante está no meio." ] },
      },
      {
        title: "Inclinação como razão e ângulo",
        paragraphs: [
          "Em eixos com a mesma escala, a inclinação de uma reta não vertical é a tangente do ângulo que ela forma com o eixo x positivo. Uma inclinação de 2 corresponde a subir 2 para cada unidade à direita. Uma de −2 corresponde a descer 2.",
          "Em gráficos de aplicações, a inclinação continua sendo a razão entre as variações, mas o ângulo visível depende das escalas. Um desenho esticado não muda a taxa matemática. Leia as marcas dos eixos e as unidades, especialmente se um eixo mede tempo e o outro mede distância.",
        ],
        example: { title: "Compare variação média com aparência", prompt: "Um gráfico marca x de 10 em 10 e y de 2 em 2. Uma reta sobe três marcas de y ao avançar duas de x. Qual é a inclinação?", steps: ["Três marcas verticais valem 6 unidades de y.", "Duas marcas horizontais valem 20 unidades de x.", "A inclinação é §6/20=0{,}3§. Contar apenas as marcas daria uma taxa diferente." ] },
      },
      {
        title: "Encontre o limiar em que uma opção compensa",
        paragraphs: [
          "Ao comparar dois modelos, iguale as saídas para encontrar o limiar. Depois subtraia uma regra da outra. Se a diferença for negativa, a primeira saída é menor. Se for positiva, a segunda é menor. Isso evita depender do aspecto do gráfico.",
          "O empate pode cair entre duas entradas inteiras. Nesse caso, nenhuma entrada admissível produz igualdade, mas ainda podemos identificar o primeiro inteiro que satisfaz a condição pedida. Arredonde na direção correta para a desigualdade.",
        ],
        example: { title: "Descubra o primeiro inteiro vantajoso", prompt: "Uma locadora cobra §A(d)=45+8d§ e outra §B(d)=70+3d§. A partir de quantos dias inteiros B é mais barata?", steps: ["§B(d)<A(d)§ dá §70+3d<45+8d§, isto é, §25<5d§.", "O empate ocorre em 5 dias. B é mais barata quando §d>5§.", "A primeira entrada inteira válida é 6. Em 6 dias, B custa 88 e A custa 93." ] },
        visual: { kind: "precalc-graph", model: "line-compare", caption: "Mude o custo inicial da segunda opção. As duas inclinações ficam fixas, mas o ponto de empate muda." },
      },
    ],
    checks: [
      { prompt: "Qual é a equação da reta de inclinação 2 que passa por §(3,-1)§?", solution: "Use §y+1=2(x-3)§. A forma reduzida é §y=2x-7§." },
      { prompt: "A função §f(x)=4§ tem raízes ou extremos?", solution: "Nenhuma raiz. Como é constante, o máximo e o mínimo são 4, atingidos em toda entrada." },
      { prompt: "Em que valor os planos §12+3q§ e §24+q§ empatam?", solution: "§12+3q=24+q§ implica §2q=12§, logo §q=6§." },
      { prompt: "Em um modelo afim, uma entrada aumenta 5 e a saída diminui 12. Qual é a taxa?", solution: "§a=\\Delta y/\\Delta x=-12/5=-2{,}4§ por unidade de entrada." },
    ],
  },
  "funcoes-quadraticas": {
    sections: [
      {
        title: "De onde vêm a fórmula do vértice e Bhaskara?",
        paragraphs: [
          "Para §a\\ne0§, coloque a em evidência nos termos em x. A metade do coeficiente interno de x é §b/(2a)§. Ao somar e retirar seu quadrado, obtém-se §f(x)=a(x+b/(2a))^2-\\Delta/(4a)§. A expressão dentro do quadrado zera no vértice.",
          "Para encontrar os zeros, também podemos transformar a equação em §(2ax+b)^2=\\Delta§. Se o lado direito for não negativo, tire as duas raízes quadradas com sinal e isole x. Assim, a fórmula do vértice e a das raízes surgem da mesma transformação.",
        ],
        example: { title: "Derive o vértice completando o quadrado", prompt: "Escreva §2x^2+8x+3§ de modo que o vértice fique explícito.", steps: ["Coloque 2 em evidência nos termos em x: §2(x^2+4x)+3§.", "Como §x^2+4x=(x+2)^2-4§, temos §2(x+2)^2-5§.", "O vértice é §(-2,-5)§ e dá o mínimo. O quadrado é sempre não negativo." ] },
      },
      {
        title: "Extremos em intervalos e entradas inteiras",
        paragraphs: [
          "O vértice dá o extremo de um lado da imagem quando o domínio é ℝ. Em um intervalo fechado, o outro extremo também existe. Compare as saídas nas duas pontas e, se estiver no intervalo, no vértice. Se uma ponta for excluída, uma altura pode ser aproximada sem ser atingida.",
          "Se as entradas são inteiras, não use automaticamente o valor real do vértice. Uma parábola depende da distância horizontal ao vértice. Compare os inteiros vizinhos que são admissíveis e verifique se existe empate.",
        ],
        example: { title: "Otimize uma quantidade de objetos", prompt: "O ganho é §G(n)=-(n-4{,}5)^2+25§ para §n\\in\\{0,1,\\ldots,10\\}§. Qual n maximiza o ganho?", steps: ["O vértice da parábola inteira fica em 4,5, entrada que não é permitida.", "Os inteiros mais próximos são 4 e 5. Ambos ficam a 0,5 do vértice.", "Em ambos os casos, §G(n)=25-0{,}25=24{,}75§. Esse é o máximo no domínio." ] },
      },
      {
        title: "Cruze uma parábola com uma meta",
        paragraphs: [
          "Para descobrir quando §f(x)=L§, trace a reta horizontal de altura L ou resolva §f(x)-L=0§. A altura do vértice indica de antemão se a reta corta a parábola duas vezes, toca uma vez ou não encontra a curva.",
          "Em um modelo de área ou altura, nem todo encontro é admissível. Verifique o domínio antes de interpretar os resultados. Uma altura pode ser atingida na subida e na descida, mas uma das entradas pode estar fora do intervalo estudado.",
        ],
        example: { title: "Duas larguras para a mesma área", prompt: "Para §A(x)=x(10-x)§ com §0<x<10§, quais larguras dão área 21?", steps: ["Reescreva §A(x)=25-(x-5)^2§.", "Iguale a 21, então §(x-5)^2=4§. As entradas são 3 e 7.", "Ambas são permitidas e descrevem o mesmo retângulo com os lados trocados." ] },
        visual: { kind: "precalc-graph", model: "quadratic-target", caption: "Ajuste a altura da meta. A linha corta a parábola duas vezes abaixo do máximo, toca no vértice e fica acima depois dele." },
      },
    ],
    checks: [
      { prompt: "Calcule §\\Delta§ e classifique as raízes de §3x^2+2x+1§.", solution: "§\\Delta=4-12=-8§. A função não tem zeros reais." },
      { prompt: "Encontre o eixo de simetria de §-2x^2+12x-7§.", solution: "§x_v=-12/(2(-2))=3§. O eixo é a reta §x=3§." },
      { prompt: "Qual é o mínimo de §x^2-4x+1§ no intervalo §[3,5]§?", solution: "O vértice está em 2, fora do intervalo. A função cresce em §[3,5]§, então o mínimo é §f(3)=-2§." },
      { prompt: "Escreva uma quadrática de coeficiente principal −2 e zeros −1 e 4.", solution: "Uma regra é §f(x)=-2(x+1)(x-4)§." },
    ],
  },
  "funcoes-polinomiais": {
    sections: [
      {
        title: "Entenda a divisão sintética linha por linha",
        paragraphs: [
          "Para dividir por §x-r§, escreva os coeficientes em ordem decrescente, incluindo zeros nos graus ausentes. Desça o primeiro coeficiente. Em cada coluna, multiplique o resultado anterior por r e some ao coeficiente seguinte. A última soma é o resto.",
          "Os demais números são os coeficientes do quociente, cujo grau é um a menos. Esse esquema reproduz a divisão algébrica: os produtos calculam as contribuições de §-r§ e as somas cancelam os termos sucessivos. Confira multiplicando o quociente pelo divisor e somando o resto.",
        ],
        example: { title: "Faça a conta com uma coluna zero", prompt: "Divida §x^3-4x+1§ por §x-2§.", steps: ["Use os coeficientes 1, 0, −4 e 1. Desça 1.", "As somas seguintes são §0+2=2§, §-4+4=0§ e §1+0=1§.", "O quociente é §x^2+2x§ e o resto é 1. De fato, §P(2)=8-8+1=1§."] },
      },
      {
        title: "Reconstrua a função por seus zeros",
        paragraphs: [
          "Se o enunciado informa raízes e multiplicidades, comece pelo produto dos fatores correspondentes. Quando o grau é exatamente a soma das multiplicidades, falta apenas um fator constante. Uma avaliação conhecida permite encontrá-lo.",
          "Se o grau pedido for maior, as raízes informadas não determinam todo o polinômio. Outros fatores podem mudar o gráfico ou introduzir mais zeros. Use a condição de menor grau, quando ela for dada, para justificar por que não incluímos fatores extras.",
        ],
        example: { title: "Fixe o coeficiente com um ponto", prompt: "Ache o polinômio de menor grau que cruza em −1, tem raiz dupla em 2 e vale 8 em zero.", steps: ["A forma é §P(x)=a(x+1)(x-2)^2§.", "Em zero, §P(0)=4a§. Como vale 8, temos §a=2§.", "Logo, §P(x)=2(x+1)(x-2)^2§. As multiplicidades exigidas somam 3, que é o menor grau possível."] },
      },
      {
        title: "Compare grau par, grau ímpar e sinal líder",
        paragraphs: [
          "Um gráfico local pode subir e descer várias vezes antes de revelar o comportamento das pontas. Para entradas de módulo crescente, divida a expressão pela potência de maior grau. A razão tende ao coeficiente líder, e isso permite prever os sinais longe da origem.",
          "Se multiplicarmos toda a função por −1, o desenho reflete no eixo horizontal e as duas pontas se invertem. Trocar de grau par para ímpar altera a relação entre as pontas. O sinal à direita ainda vem do coeficiente líder.",
        ],
        example: { title: "Preveja as pontas sem expandir", prompt: "Descreva o comportamento de §P(x)=-(x-2)^2(x+1)^3§.", steps: ["Os graus dos fatores somam §2+3=5§. O termo líder é §-x^5§.", "Para x muito positivo, o valor é negativo e a ponta desce.", "Para x muito negativo, §x^5§ é negativo e o sinal externo torna o valor positivo. A ponta esquerda sobe."] },
        visual: { kind: "precalc-graph", model: "polynomial-ends", caption: "Alterne grau par ou ímpar e sinal do coeficiente líder. Compare as duas pontas." },
      },
    ],
    checks: [
      { prompt: "Qual é o grau de §(x^4+x)-(x^4-2x^2)§?", solution: "Os termos de grau 4 se cancelam. Sobra §2x^2+x§, de grau 2." },
      { prompt: "Para quais k, §x-3§ é fator de §x^2+kx-12§?", solution: "Exija §P(3)=9+3k-12=0§. Assim, §k=1§." },
      { prompt: "Onde §(x+4)^2(x-1)<0§?", solution: "O fator linear é negativo antes de 1. O quadrado é positivo exceto em −4. Logo, §(-\\infty,-4)\\cup(-4,1)§." },
      { prompt: "Um polinômio não nulo de grau 4 pode ter três raízes duplas distintas?", solution: "Não. As multiplicidades somariam 6, acima do grau 4." },
    ],
  },
  "funcoes-racionais": {
    sections: [
      {
        title: "Use multiplicidades para distinguir buraco e polo",
        paragraphs: [
          "Se o numerador e o denominador zeram no mesmo x, fatorar mostra quantas vezes a causa se repete. Cancele o menor número de fatores iguais. Se sobrar fator no denominador, há assíntota vertical. Se ele desaparecer do denominador, há um ponto removível.",
          "Na assíntota, um expoente par no denominador reduzido mantém o sinal do fator dos dois lados. Um expoente ímpar troca o sinal. Perto da entrada proibida, os fatores que não zeram ajudam a determinar se cada ramo sobe ou desce.",
        ],
        example: { title: "Um cancelamento parcial ainda pode deixar assíntota", prompt: "Classifique §x=2§ em §(x-2)/(x-2)^3§.", steps: ["A entrada 2 está excluída.", "Cancele um fator e obtenha §1/(x-2)^2§ no domínio.", "O denominador ainda zera em 2. Como está ao quadrado, os dois lados crescem sem limite positivo perto de 2."] },
      },
      {
        title: "Uma curva pode cruzar a assíntota horizontal",
        paragraphs: [
          "A assíntota horizontal descreve as alturas para x muito distante. Ela não determina as posições da curva para entradas finitas. Para testar cruzamento, iguale a regra à altura da assíntota e descarte valores que não pertencem ao domínio.",
          "Subtrair a assíntota da função mostra de qual lado a curva se encontra. Quando o resto tende a zero mas muda de sinal, a curva pode se aproximar da reta por cima em um extremo e por baixo no outro.",
        ],
        example: { title: "Ache o encontro com a assíntota", prompt: "A função §f(x)=1+(x-2)/(x^2+1)§ cruza sua assíntota horizontal?", steps: ["O termo fracionário tende a zero no infinito, então a assíntota é §y=1§.", "§f(x)=1§ exige §x-2=0§. O denominador é positivo em todo ℝ.", "O ponto é §(2,1)§. Antes de 2 a função fica abaixo de 1, e depois fica acima."] },
      },
      {
        title: "Verifique os sinais em cada ramo do gráfico",
        paragraphs: [
          "Um ponto proibido divide a análise mesmo quando o numerador não muda de sinal. Marque todos os pontos críticos em uma reta e teste cada faixa. Um ponto aberto não pode entrar como solução de uma inequação, mesmo quando a regra reduzida teria valor zero ali.",
          "Compare o sinal algébrico com a posição no gráfico. A parte abaixo do eixo horizontal corresponde às saídas negativas. Em um ramo que se aproxima de uma assíntota vertical, o segmento da curva pode sair da janela sem deixar de existir.",
        ],
        example: { title: "Use um ponto de teste em cada faixa", prompt: "Resolva §(x-1)/(x+2)>0§.", steps: ["A fronteira proibida é −2 e o zero permitido é 1.", "Os testes −3, 0 e 2 dão sinais positivo, negativo e positivo.", "Como a desigualdade é estrita, a solução é §(-\\infty,-2)\\cup(1,\\infty)§."] },
        visual: { kind: "precalc-graph", model: "rational-sign", caption: "Selecione um ponto de teste de cada faixa para comparar o sinal do quociente com sua posição no gráfico." },
      },
    ],
    checks: [
      { prompt: "Simplifique §1/x+1/(x+2)§ com domínio.", solution: "§(2x+2)/(x(x+2))§, para §x\\ne0§ e §x\\ne-2§." },
      { prompt: "Resolva §1/(x-1)=2§.", solution: "Para §x\\ne1§, a equação vira §1=2(x-1)§. Logo, §x=3/2§, permitido." },
      { prompt: "Onde §(x+3)/(x-4)\\ge0§?", solution: "O quociente é positivo fora das duas fronteiras. Inclua −3 e exclua 4. A solução é §(-\\infty,-3]\\cup(4,\\infty)§." },
      { prompt: "Classifique §x=1§ em §(x-1)^2/(x-1)§.", solution: "A forma reduzida é §x-1§, mas 1 não pertence ao domínio. Há um ponto aberto em §(1,0)§." },
    ],
  },
  "funcoes-exponenciais": {
    sections: [
      {
        title: "Reconheça um modelo a partir de duas medições",
        paragraphs: [
          "Em §P(t)=P_0a^t§, a razão entre duas saídas positivas depende apenas da diferença dos tempos. Assim, §P(t_2)/P(t_1)=a^{t_2-t_1}§. Se os instantes estiverem separados por mais de um período, tire a raiz correspondente para encontrar o fator unitário.",
          "Com a base conhecida, divida uma medição pela potência correspondente para recuperar o valor inicial. Esse cálculo distingue uma taxa percentual por período da variação percentual total entre as duas medições.",
        ],
        example: { title: "Recupere a taxa anual", prompt: "Um modelo exponencial tem §P(0)=400§ e §P(2)=484§. Qual é o fator anual?", steps: ["Divida §484/400=1{,}21§. Esse é o fator de dois anos.", "Tire a raiz quadrada positiva. §a=\\sqrt{1{,}21}=1{,}1§.", "A taxa é 10% por ano e §P(1)=440§. De 440 para 484, o aumento absoluto já é maior."] },
      },
      {
        title: "Compare crescimento aditivo e multiplicativo",
        paragraphs: [
          "Dois modelos podem ter o mesmo valor inicial e a mesma primeira variação, mas divergir depois. O modelo afim acrescenta sempre a mesma quantidade. O exponencial aplica sempre o mesmo fator, de modo que o acréscimo absoluto aumenta quando o valor cresce.",
          "Em uma aplicação, a escolha depende do mecanismo. Um depósito fixo por período soma uma constante. Um saldo que cresce por juros compostos multiplica por um fator. Um modelo que inclui os dois efeitos precisa representar ambos.",
        ],
        example: { title: "Duas regras que coincidem nas primeiras medições", prompt: "Compare §A(t)=1+t§ e §B(t)=2^t§ nos quatro primeiros tempos inteiros não negativos.", steps: ["Em t igual a 0 e 1, as duas saídas são 1 e 2.", "Em 2, a regra afim vale 3 e a exponencial vale 4.", "Em 3, as saídas são 4 e 8. Duas medições iguais não garantiam que as fórmulas fossem iguais."] },
        visual: { kind: "precalc-graph", model: "growth-compare", caption: "Compare as duas saídas no mesmo instante. A reta acrescenta 1, enquanto a curva dobra a cada passo inteiro." },
      },
      {
        title: "Descubra quando uma meta é atingida",
        paragraphs: [
          "Quando o valor-alvo não é uma potência simples da base, isole a parte exponencial e aplique um logaritmo. Em um modelo com deslocamento vertical, subtraia o nível de referência primeiro. Verifique que o alvo é atingível antes de tomar o logaritmo.",
          "Se o tempo só pode ser medido em períodos inteiros, um resultado real precisa ser interpretado com a desigualdade. Para o primeiro período que alcança uma meta em um modelo crescente, use o menor inteiro maior ou igual à solução real.",
        ],
        example: { title: "Ache o primeiro período que ultrapassa a meta", prompt: "A quantidade §Q(n)=100\\cdot1{,}5^n§ é medida a cada dia. Qual é o primeiro dia em que atinge pelo menos 300?", steps: ["Resolva §1{,}5^n\\ge3§. O limiar real é §\\ln3/\\ln1{,}5\\approx2{,}71§.", "O primeiro dia inteiro que serve é 3.", "Confira §Q(2)=225§ e §Q(3)=337{,}5§. A meta fica entre as duas medições."] },
      },
    ],
    checks: [
      { prompt: "Qual é a assíntota de §g(x)=3^x-7§ e qual é a saída em zero?", solution: "A assíntota é §y=-7§ e §g(0)=1-7=-6§." },
      { prompt: "Resolva §2^{3x-1}=16§.", solution: "§16=2^4§, então §3x-1=4§ e §x=5/3§." },
      { prompt: "Uma quantidade cai 25% por ano. Que fração resta após dois anos?", solution: "O fator anual é §3/4§. Após dois anos resta §(3/4)^2=9/16§." },
      { prompt: "Resolva §e^{2x}=5§.", solution: "Tome logaritmos naturais. §2x=\\ln5§, então §x=\\ln5/2§." },
    ],
  },
  "funcoes-logaritmicas": {
    sections: [
      {
        title: "Derive a mudança de base",
        paragraphs: [
          "Chame §\\log_b u§ de x. Isso significa §b^x=u§. Ao aplicar o logaritmo natural aos dois lados, a regra de potência dá §x\\ln b=\\ln u§. Como a base não pode ser 1, §\\ln b\\ne0§ e podemos dividir.",
          "O mesmo raciocínio funciona com outra base válida. Se b está entre 0 e 1, seu logaritmo natural é negativo. Isso explica por que os logaritmos em base menor que 1 decrescem, embora §\\ln u§ cresça.",
        ],
        example: { title: "Compare duas bases sem calculadora", prompt: "Relacione §\\log_{1/3} 7§ e §\\log_3 7§.", steps: ["Escreva §\\ln(1/3)=-\\ln3§.", "Pela mudança de base, §\\log_{1/3}7=\\ln7/(-\\ln3)§.", "Logo, §\\log_{1/3}7=-\\log_3 7§. As funções de bases recíprocas se refletem no eixo horizontal."] },
      },
      {
        title: "Transforme o gráfico e leia a assíntota",
        paragraphs: [
          "Em §g(x)=\\log_b(x-h)+k§, a restrição é §x>h§. A assíntota vertical vai para §x=h§. O ponto que correspondia ao argumento 1 se move para §(h+1,k)§. Use esse ponto para situar a curva.",
          "O zero da função não coincide necessariamente com esse ponto. Para achá-lo, resolva §\\log_b(x-h)=-k§. A condição de domínio continua válida. Se o argumento tiver coeficiente negativo em x, a parte permitida fica do lado oposto da fronteira.",
        ],
        example: { title: "Encontre o zero de uma curva deslocada", prompt: "Analise §g(x)=\\log_2(x-3)-2§.", steps: ["O domínio é §x>3§ e a assíntota é §x=3§.", "Em §x=4§, o argumento é 1, então a saída é −2.", "O zero exige §x-3=2^2=4§. Assim, o gráfico cruza o eixo horizontal em §(7,0)§."] },
      },
      {
        title: "Enxergue a inversa como uma troca de eixos",
        paragraphs: [
          "Se §2^t=u§, então §\\log_2u=t§. Assim, o ponto §(t,u)§ da exponencial vira §(u,t)§ no logaritmo. O reflexo na reta §y=x§ troca a posição sem mudar a distância à diagonal.",
          "A exponencial aceita todos os reais e produz só saídas positivas. Por isso, o logaritmo aceita só entradas positivas e pode devolver qualquer real. A assíntota horizontal da exponencial vira a assíntota vertical da inversa.",
        ],
        example: { title: "Troque coordenadas de um ponto conhecido", prompt: "A exponencial de base 2 contém §(-2,1/4)§. Qual ponto aparece no logaritmo correspondente?", steps: ["A primeira coordenada é o expoente e a segunda é a potência.", "Na função inversa, a potência vira entrada. O ponto é §(1/4,-2)§.", "Confira §\\log_2(1/4)=-2§ porque §2^{-2}=1/4§."] },
        visual: { kind: "precalc-graph", model: "inverse-reflection", caption: "Mova o expoente. Os dois pontos destacados trocam as coordenadas e ficam em lados simétricos da diagonal." },
      },
    ],
    checks: [
      { prompt: "Expanda §\\log_3(9x^2)§ para §x>0§.", solution: "A regra do produto e a da potência dão §2+2\\log_3x§." },
      { prompt: "Qual é a assíntota vertical de §\\log_5(4-x)+1§?", solution: "O argumento deve ser positivo, logo §x<4§. A assíntota é §x=4§." },
      { prompt: "Resolva §\\log_2(x-1)=\\log_2(7-x)§.", solution: "O domínio é §1<x<7§. Iguale os argumentos: §x-1=7-x§, então §x=4§." },
      { prompt: "Resolva §\\log_{1/3}x<1§.", solution: "Compare com §\\log_{1/3}(1/3)§. A base é menor que 1, então §x>1/3§." },
    ],
  },
  "composicao-de-funcoes": {
    sections: [
      {
        title: "Componha três etapas e preserve a ordem",
        paragraphs: [
          "Em uma cadeia de três funções, leia da direita para a esquerda. Você pode agrupar as etapas de duas maneiras, pois a composição é associativa nos pontos onde o caminho existe. O agrupamento não troca a ordem de execução.",
          "Uma tabela de entradas e saídas é útil para conferir o processo. Ao montar uma fórmula, escreva a saída intermediária com um nome próprio. Isso reduz a chance de perder uma condição ou aplicar a transformação em uma expressão incompleta.",
        ],
        example: { title: "Um cálculo em três caixas", prompt: "Se §h(x)=x-1§, §g(x)=x^2§ e §f(x)=2x+3§, calcule §(f\\circ g\\circ h)(4)§.", steps: ["Comece com §h(4)=3§.", "A função intermediária dá §g(3)=9§.", "Finalize com §f(9)=21§. A fórmula geral é §2(x-1)^2+3§."] },
        visual: { kind: "cards", caption: "Cada saída vira a entrada da caixa seguinte.", items: [["Entrada", "4"], ["Subtrair 1", "3"], ["Elevar ao quadrado", "9"], ["Dobrar e somar 3", "21"]] },
      },
      {
        title: "Compare as duas ordens para várias entradas",
        paragraphs: [
          "Duas funções reais são iguais quando têm o mesmo domínio e dão a mesma saída para cada entrada. Uma diferença em uma única entrada do domínio comum já prova que elas são distintas. Para achar os pontos de coincidência, iguale as fórmulas compostas e conserve apenas as soluções que pertencem aos dois domínios.",
          "Em um gráfico, coincidências são interseções. Se as curvas se afastam, a ordem produziu uma diferença que depende da entrada. Verifique cada valor pela cadeia de operações para interpretar de onde vem essa diferença.",
        ],
        example: { title: "Quando a ordem dá o mesmo resultado?", prompt: "Para §f(x)=x^2§ e §g(x)=x+1§, em que entrada §f(g(x))=g(f(x))§?", steps: ["As regras compostas são §(x+1)^2§ e §x^2+1§.", "Igualando e cancelando §x^2+1§, sobra §2x=0§.", "A única coincidência ocorre em §x=0§. As duas saídas valem 1."] },
        visual: { kind: "precalc-graph", model: "composition-order", caption: "Compare as duas compostas para a mesma entrada. A diferença muda de sinal ao passar por zero." },
      },
      {
        title: "Desfaça uma composição na ordem inversa",
        paragraphs: [
          "Se uma etapa faz g e a seguinte faz f, para voltar ao início desfaça primeiro f e depois g. Assim, quando as inversas estão definidas nos conjuntos correspondentes, §(f\\circ g)^{-1}=g^{-1}\\circ f^{-1}§.",
          "Escrever as operações em ordem ajuda a verificar o resultado. A composição com a inversa precisa devolver a entrada original nos domínios apropriados. Em fórmulas que envolvem raízes ou potências pares, confira se foi necessário restringir o domínio.",
        ],
        example: { title: "Desfaça uma conversão de duas etapas", prompt: "Use §g(x)=x-4§ e §f(x)=3x§. Encontre a inversa de §f\\circ g§.", steps: ["A composição vale §3(x-4)§.", "Primeiro desfaça a multiplicação dividindo por 3. Depois some 4.", "Logo, a inversa é §x/3+4§. Aplicada a §3(x-4)§, ela devolve x."] },
      },
    ],
    checks: [
      { prompt: "Encontre §f(f(x))§ para §f(x)=2x+3§.", solution: "§2(2x+3)+3=4x+9§." },
      { prompt: "Determine o domínio de §\\sqrt{4-x^2}§ como composição.", solution: "A etapa interna dá §4-x^2§. A externa exige que seja não negativa, logo §-2\\le x\\le2§." },
      { prompt: "Se §f(x)=x^2§ e §g(x)=x-3§, calcule §(g\\circ f)(-2)§.", solution: "Primeiro §f(-2)=4§ e depois §g(4)=1§." },
      { prompt: "A função §x^2§ em ℝ tem inversa sobre sua imagem?", solution: "Não, pois 2 e −2 produzem 4. Se restringirmos o domínio a §[0,\\infty)§, a inversa é §\\sqrt x§." },
    ],
  },
  trigonometria: {
    sections: [
      {
        title: "Reduza ângulos negativos e maiores que uma volta",
        paragraphs: [
          "Somar ou subtrair voltas completas mantém o mesmo ponto do círculo. Em graus, use múltiplos de 360°. Em radianos, use múltiplos de §2\\pi§. Depois de reduzir o ângulo, use o quadrante para determinar os sinais.",
          "Trocar θ por −θ reflete o ponto no eixo horizontal. A coordenada vertical troca de sinal e a horizontal permanece. Daí vêm a paridade ímpar do seno e a paridade par do cosseno.",
        ],
        example: { title: "Reduza um ângulo negativo", prompt: "Calcule seno e cosseno de §-7\\pi/6§.", steps: ["Some §2\\pi§ para obter §5\\pi/6§.", "Esse ângulo está no quadrante II e tem referência §\\pi/6§.", "O seno é §1/2§ e o cosseno é §-\\sqrt3/2§."] },
        visual: { kind: "cards", caption: "Os sinais vêm da posição horizontal e vertical do ponto.", items: [["Quadrante I", "cos + · sen +"], ["Quadrante II", "cos − · sen +"], ["Quadrante III", "cos − · sen −"], ["Quadrante IV", "cos + · sen −"]] },
      },
      {
        title: "Leia uma onda a partir de máximos e mínimos",
        paragraphs: [
          "Quando observamos uma oscilação, a linha média é a média entre as alturas extrema superior e inferior. A amplitude é metade da diferença. O período pode ser medido entre dois máximos consecutivos ou entre outros dois pontos equivalentes de ciclos seguidos.",
          "Se o modelo usa cosseno com amplitude positiva, um máximo é um ponto conveniente para alinhar a fase. A frequência angular é §2\\pi/T§, em radianos por unidade de tempo. Uma entrada que mede tempo tem unidade diferente da saída.",
        ],
        example: { title: "Modele uma oscilação regular", prompt: "Uma altura varia de 2 m a 8 m, atinge o máximo em §t=0§ e repete o ciclo a cada 6 s. Proponha uma função.", steps: ["A linha média é 5 m e a amplitude é 3 m.", "O fator angular é §2\\pi/6=\\pi/3§ rad/s.", "Um modelo é §h(t)=5+3\\cos(\\pi t/3)§. Em 3 s, ele atinge 2 m."] },
        visual: { kind: "precalc-graph", model: "wave-period", caption: "Mude B em sen(Bx). O eixo horizontal está em múltiplos de π. Conte quantas voltas cabem no mesmo intervalo." },
      },
      {
        title: "Resolva desigualdades pelo círculo",
        paragraphs: [
          "Para uma desigualdade com seno, encontre primeiro os pontos em que a coordenada vertical é igual ao limite. Em seguida, selecione o arco acima ou abaixo da altura de referência. Para cosseno, a referência é uma coordenada horizontal.",
          "A igualdade decide se as pontas entram. Se o problema usa a reta real inteira, repita os arcos por periodicidade. Com tangente, divida primeiro nos intervalos de continuidade, pois suas assíntotas não podem pertencer à solução.",
        ],
        example: { title: "Escolha o arco acima de uma altura", prompt: "Resolva §\\operatorname{sen}x>1/2§ em §[0,2\\pi)§.", steps: ["As fronteiras com seno §1/2§ são §\\pi/6§ e §5\\pi/6§.", "Entre elas, o ponto do círculo passa acima da altura §1/2§. O teste §x=\\pi/2§ confirma.", "A desigualdade é estrita, então a solução é §(\\pi/6,5\\pi/6)§."] },
      },
    ],
    checks: [
      { prompt: "Converta §225^\\circ§ para radianos.", solution: "Multiplique por §\\pi/180§: §225\\pi/180=5\\pi/4§." },
      { prompt: "Onde §\\cos x=0§ em §[0,2\\pi)§?", solution: "Nos pontos de abscissa zero do círculo. As soluções são §\\pi/2§ e §3\\pi/2§." },
      { prompt: "Qual é a imagem de §y=1-2\\operatorname{sen}x§?", solution: "A linha média é 1 e a amplitude é 2. A imagem é §[-1,3]§." },
      { prompt: "Se §\\operatorname{sen}\\theta=3/5§ e θ está no quadrante II, qual é §\\cos\\theta§?", solution: "O módulo é §\\sqrt{1-9/25}=4/5§. Como a abscissa é negativa, §\\cos\\theta=-4/5§." },
    ],
  },
  "geometria-analitica": {
    sections: [
      {
        title: "Distância de um ponto a uma reta",
        paragraphs: [
          "A menor distância de um ponto a uma reta é medida ao longo da perpendicular. Na forma §ax+by+c=0§, o vetor §(a,b)§ é normal à reta. Dividir §|ax_0+by_0+c|§ pelo comprimento desse vetor converte o valor da expressão em distância.",
          "Multiplicar toda a equação da reta por uma constante não nula mantém o mesmo conjunto de pontos. A fórmula da distância também se mantém, pois o numerador e o denominador mudam pelo mesmo fator em módulo.",
        ],
        example: { title: "Meça a distância com a forma geral", prompt: "Calcule a distância de §P=(2,-1)§ à reta §3x+4y-10=0§.", steps: ["Substitua P: §3(2)+4(-1)-10=-8§.", "O comprimento da normal é §\\sqrt{3^2+4^2}=5§.", "A distância é §|-8|/5=8/5§. O sinal desaparece porque distância é não negativa."] },
      },
      {
        title: "Reconheça as cônicas deslocadas",
        paragraphs: [
          "Substituir x por §x-h§ e y por §y-k§ desloca toda a cônica. Uma elipse centrada em §(h,k)§ tem soma de dois quadrados normalizados. O maior denominador indica o eixo maior. Se os denominadores são iguais, obtemos uma circunferência.",
          "Na hipérbole, há uma diferença entre dois quadrados normalizados. O termo positivo identifica o eixo que contém os vértices. Se a equação usa §(y-k)^2§ com sinal positivo, os ramos abrem para cima e para baixo. O centro e os vértices são pontos diferentes.",
        ],
        example: { title: "Encontre os vértices a partir do centro", prompt: "Analise §(y-1)^2/9-(x+2)^2/16=1§.", steps: ["O centro é §(-2,1)§ e o termo positivo está em y.", "Com §x=-2§, resulta §(y-1)^2=9§, então §y=1\\pm3§.", "Os vértices são §(-2,4)§ e §(-2,-2)§. Os ramos abrem na vertical."] },
      },
      {
        title: "Use cortes e simetrias para esboçar uma cônica",
        paragraphs: [
          "Comece pelos eixos de simetria que passam pelo centro ou vértice. Fixe uma das coordenadas no eixo de simetria e resolva a equação. Em uma elipse, isso fornece as pontas dos dois semieixos. Na hipérbole, o eixo transverso passa pelos vértices e o eixo conjugado não intercepta a curva.",
          "No gráfico de uma cônica, confira se ambos os eixos têm a mesma escala. Uma circunferência desenhada com escalas diferentes parece uma elipse. O formato algébrico e as unidades dos eixos são as referências para interpretar o desenho.",
        ],
        example: { title: "Compare os cortes de uma elipse e de uma hipérbole", prompt: "Quais são os cortes com os eixos de §x^2/9+y^2/4=1§ e §x^2/9-y^2/4=1§?", steps: ["Em ambas, §y=0§ dá §x=\\pm3§.", "Na elipse, §x=0§ dá §y=\\pm2§.", "Na hipérbole, §x=0§ exigiria §y^2=-4§. Ela tem dois ramos e não corta o eixo y."] },
        visual: { kind: "precalc-graph", model: "conic-compare", caption: "Alterne os sinais na equação. Os cortes em x = ±3 permanecem, mas a curva fechada dá lugar a dois ramos." },
      },
    ],
    checks: [
      { prompt: "Qual é a reta pelos pontos §(2,1)§ e §(2,7)§?", solution: "Os pontos têm a mesma abscissa. A equação é §x=2§." },
      { prompt: "Qual é o ponto médio de §(-4,5)§ e §(2,-1)§?", solution: "As médias são §(-4+2)/2=-1§ e §(5-1)/2=2§. O ponto é §(-1,2)§." },
      { prompt: "Determine o foco de §y^2=12x§.", solution: "A forma é §y^2=4px§, então §p=3§ e o foco é §(3,0)§." },
      { prompt: "Quais são os focos de §x^2/25+y^2/16=1§?", solution: "O eixo maior é horizontal e §c=\\sqrt{25-16}=3§. Os focos são §(-3,0)§ e §(3,0)§." },
    ],
  },
  "sequencias-e-progressoes": {
    sections: [
      {
        title: "Recupere a razão sem conhecer termos consecutivos",
        paragraphs: [
          "Em uma PA, a diferença entre dois termos é a razão vezes a diferença dos índices. Numa PG com termos não nulos, o quociente de dois termos é a razão elevada à diferença dos índices. Dois termos separados por uma quantidade par de passos podem não distinguir uma razão positiva de uma negativa.",
          "Encontre a razão primeiro. Depois use a posição de um termo conhecido para voltar ao primeiro. Por fim, substitua os dois dados iniciais na regra para conferir a sequência encontrada.",
        ],
        example: { title: "Volte ao primeiro termo", prompt: "Em uma PA, §a_4=13§ e §a_9=33§. Qual é a regra?", steps: ["Em cinco passos, a diferença foi 20. Logo, §r=20/5=4§.", "Volte três passos a partir de 13: §a_1=13-3\\cdot4=1§.", "A regra é §a_n=1+4(n-1)§. Em n igual a 9, ela dá 33."] },
      },
      {
        title: "Transforme uma dízima em soma geométrica",
        paragraphs: [
          "Quando um bloco de algarismos se repete no decimal, cada cópia desloca suas casas pelo comprimento do bloco. Em um bloco de dois algarismos, cada nova cópia vale um centésimo da anterior. Isso cria uma PG com razão §1/100§.",
          "Podemos somar as primeiras cópias para obter aproximações e depois calcular o limite pela fórmula da série geométrica. A soma infinita é o valor exato da dízima, enquanto cortar a escrita em uma quantidade finita de casas dá apenas uma aproximação.",
        ],
        example: { title: "Some as cópias de um bloco de dois dígitos", prompt: "Escreva §0{,}\\overline{27}§ como fração usando PG.", steps: ["O primeiro bloco vale §27/100§, o segundo §27/10000§, e assim por diante.", "O quociente é §1/100§. A soma é §(27/100)/(1-1/100)§.", "O valor exato é §27/99=3/11§."] },
      },
      {
        title: "Somas parciais e erro de aproximação",
        paragraphs: [
          "Uma série geométrica pode ser aproximada pela soma de suas primeiras n parcelas. Para §|q|<1§, a diferença entre a soma total e a parcial é §a_1q^n/(1-q)§. Esse resto é uma nova série com a mesma razão, começando no termo seguinte.",
          "O módulo do resto mede a precisão da aproximação. Quando q é negativo, o sinal do resto alterna, mesmo que seu módulo diminua. Compare somas parciais sucessivas para ver a aproximação por baixo ou por cima.",
        ],
        example: { title: "Quanto ainda falta somar?", prompt: "Na série §1/2+1/4+1/8+\\cdots§, qual é a diferença entre a soma total e a soma dos quatro primeiros termos?", steps: ["A soma total é §(1/2)/(1-1/2)=1§.", "A soma dos quatro termos é §8/16+4/16+2/16+1/16=15/16§.", "Falta §1/16§. O primeiro termo omitido vale §1/32§ e a soma de toda a cauda vale o dobro dele."] },
        visual: { kind: "precalc-graph", model: "series-partial", caption: "Aumente o número de parcelas. A soma se aproxima de 1 e o erro restante cai pela metade." },
      },
    ],
    checks: [
      { prompt: "Qual é a razão da PA se §a_3=5§ e §a_7=17§?", solution: "São quatro passos e a diferença é 12, então §r=3§." },
      { prompt: "Calcule a soma dos cinco primeiros termos de 2, 6, 18, ….", solution: "§S_5=2(1-3^5)/(1-3)=242§." },
      { prompt: "Calcule §\\sum_{k=3}^{8}4§.", solution: "Há §8-3+1=6§ parcelas iguais a 4, então a soma vale 24." },
      { prompt: "A série §3-3+3-3+\\cdots§ converge?", solution: "Não. Suas somas parciais alternam entre 3 e 0. A razão é −1, cujo módulo não é menor que 1." },
    ],
  },
};
