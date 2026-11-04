import type { StudyLesson } from "./studyBasics";

export default {
  intro: "Você já sabe obter uma derivada. Agora vai usá-la para estimar valores, interpretar gráficos, garantir resultados em intervalos e tomar decisões. O ponto de partida de cada aplicação é dizer o que a derivada mede e em quais entradas ela faz sentido.",
  visual: { kind: "cards", caption: "A derivada dá uma taxa local. O domínio, o sinal e as unidades ajudam a transformar a taxa em uma conclusão.", items: [
    ["Tangente em a","§y=f(a)+f'(a)(x-a)§"],
    ["Monotonicidade","Em um intervalo, §f'>0§ implica crescimento estrito."],
    ["Extremos absolutos","Compare candidatos internos e extremidades."],
    ["Concavidade","§f''>0§ indica concavidade para cima."],
  ] },
  sections: [
    {
      title: "Escreva a reta tangente a partir do ponto e da taxa",
      paragraphs: [
        "A tangente a uma função derivável em a passa por §(a,f(a))§ e tem inclinação §f'(a)§. Identifique essas duas informações separadamente. O termo §x-a§ mede quanto nos afastamos da entrada de referência.",
        "A reta normal é perpendicular à tangente. Se a inclinação da tangente for finita e não nula, a inclinação da normal é seu oposto recíproco. Para uma tangente horizontal, a normal é a reta vertical §x=a§.",
        "Confira a equação da tangente substituindo §x=a§. O termo da inclinação deve se anular e deixar §y=f(a)§. Depois compare a inclinação na forma final com a derivada calculada. Essas duas verificações separam erros de ponto e de taxa. Por exemplo, uma reta paralela à tangente ainda pode passar pela altura errada na entrada de referência.",
      ],
      example: {
        title: "Tangente e normal no mesmo ponto",
        prompt: "Encontre as duas retas de §f(x)=x^2§ em §x=2§.",
        steps: [
          "O ponto é §(2,4)§ e a inclinação da tangente é §f'(2)=4§.",
          "A tangente é §y-4=4(x-2)§.",
          "A normal é §y-4=-(x-2)/4§. O produto das inclinações vale −1.",
        ],
      },
    },
    {
      title: "Estime valores usando linearização",
      paragraphs: [
        "Em entradas próximas de a, §L(x)=f(a)+f'(a)(x-a)§ aproxima f. Escolha a perto do valor pedido e onde seja fácil calcular a saída e a derivada. A aproximação troca um pequeno trecho da curva por sua tangente.",
        "Use o símbolo §\\approx§ porque a igualdade exata vale no ponto base. Ao longe, a curva pode se afastar bastante da reta. Se a curva for côncava para baixo entre a e x, a tangente dá uma estimativa acima do valor.",
        "O erro depende tanto do tamanho do passo quanto da curvatura. Se você refizer a aproximação com um ponto base mais próximo ou em uma região onde as inclinações variam pouco, a reta costuma se ajustar melhor. Em um relatório, informe o ponto usado e a unidade do passo, pois esses dados permitem reproduzir a estimativa.",
      ],
      example: {
        title: "Calcule uma raiz sem calculadora",
        prompt: "Estime §\\sqrt{4{,}1}§ a partir de §a=4§.",
        steps: [
          "Para §f(x)=\\sqrt{x}§, temos §f(4)=2§ e §f'(4)=1/4§.",
          "O passo é 0,1. A reta dá §2+(1/4)(0{,}1)=2{,}025§.",
          "Como §f''(x)=-1/(4x^{3/2})<0§, a curva fica abaixo da tangente nesse trecho.",
        ],
      },
      visual: { kind: "calc-graph", model: "linearization", caption: "Mova x e compare a altura da curva com a da tangente. As alturas coincidem no ponto de referência." },
      extraExample: {
        title: "Estime uma variação de volume",
        prompt: "Se o raio de uma esfera sobe de 10 cm para 10,02 cm, estime o aumento do volume.",
        steps: [
          "A regra é §V(r)=4\\pi r^3/3§ e §V'(r)=4\\pi r^2§.",
          "Em 10, a taxa é §400\\pi§ cm³ por cm. Multiplique pelo aumento §0{,}02§ cm.",
          "A variação aproximada é §8\\pi§ cm³. O cálculo usa a taxa no raio inicial.",
        ],
      },
    },
    {
      title: "Leia as unidades de uma taxa",
      paragraphs: [
        "A derivada tem unidade de saída dividida pela unidade de entrada. Em movimento, a derivada da posição é a velocidade com sinal. Ao derivar a velocidade, você obtém a aceleração, que mede a mudança da velocidade por unidade de tempo.",
        "Velocidade negativa indica movimento no sentido contrário ao eixo. A rapidez pode aumentar com aceleração negativa se a velocidade também for negativa. Para entender o fenômeno, escreva as unidades antes de interpretar os sinais.",
      ],
      example: {
        title: "Uma velocidade negativa cujo módulo aumenta",
        prompt: "Seja §s(t)=20-2t^2§, em metros, com t em segundos. Interprete as taxas em 3 s.",
        steps: [
          "A velocidade é §s'(t)=-4t§. Em 3 s, ela vale −12 m/s.",
          "A aceleração é §s''(t)=-4§ m/s².",
          "Perto de 3 s, a velocidade fica mais negativa. O corpo se move no sentido negativo e a rapidez aumenta.",
        ],
      },
    },
    {
      title: "Resolva taxas relacionadas no instante pedido",
      paragraphs: [
        "Quando duas grandezas dependem do tempo, escreva uma relação entre elas e derive em relação a t. Aplique a regra da cadeia em cada grandeza variável. Só depois substitua os valores medidos no instante.",
        "Uma medida que vale certo número no instante não é necessariamente constante no tempo. Substituir cedo demais pode transformar uma variável em constante e apagar a taxa que você procura.",
        "Faça um esboço e escreva um sinal ao lado de cada taxa conhecida. Uma distância que diminui deve entrar como derivada negativa, mesmo que a distância seja positiva. Nos modelos geométricos, confira se as medidas descrevem uma configuração possível. Por exemplo, a base de uma escada de 5 m não pode estar a 6 m da parede nesse modelo.",
      ],
      example: {
        title: "Uma escada apoiada na parede",
        prompt: "Uma escada de 5 m tem a base afastando-se a 0,6 m/s. Com a base a 3 m da parede, qual é a taxa da altura?",
        steps: [
          "Se x é a distância da base e y é a altura, §x^2+y^2=25§. Quando §x=3§, §y=4§.",
          "Derivando, §2xx'+2yy'=0§, então §y'=-xx'/y§.",
          "No instante pedido, §y'=-(3)(0{,}6)/4=-0{,}45§ m/s. O topo está descendo.",
        ],
      },
      extraExample: {
        title: "Uma área que cresce com o raio",
        prompt: "Um círculo tem raio aumentando a 0,2 m/s. A que taxa sua área cresce quando o raio é 5 m?",
        steps: [
          "Escreva §A=\\pi r^2§ com r variável.",
          "Derive em relação ao tempo: §A'=2\\pi rr'§.",
          "Em §r=5§ e §r'=0{,}2§, a taxa de área vale §2\\pi§ m²/s.",
        ],
      },
    },
    {
      title: "Use os teoremas de Rolle e do valor médio",
      paragraphs: [
        "Se f é contínua em §[a,b]§ e derivável em §(a,b)§, existe um ponto c interno onde §f'(c)=[f(b)-f(a)]/(b-a)§. Nesse ponto, a tangente é paralela à secante do intervalo.",
        "Quando as duas saídas nas pontas são iguais, a secante é horizontal. O resultado se chama teorema de Rolle e garante pelo menos uma tangente horizontal no interior. Verifique as hipóteses antes de usar qualquer um dos resultados.",
        "Pense em uma viagem com posição contínua e derivável entre a partida e a chegada. Se você percorre 90 km em 1,5 h no mesmo sentido de um eixo, houve um instante em que a velocidade instantânea foi 60 km/h. O teorema compara a taxa instantânea ao deslocamento por tempo total e pode admitir vários instantes com a mesma taxa.",
      ],
      example: {
        title: "Encontre a taxa instantânea que coincide com a média",
        prompt: "Use o teorema do valor médio para §f(x)=x^2§ em §[1,4]§.",
        steps: [
          "O polinômio é contínuo no fechado e derivável no aberto.",
          "A taxa média é §(16-1)/(4-1)=5§.",
          "Resolva §2c=5§. O ponto §c=5/2§ é interno e satisfaz a conclusão.",
        ],
      },
    },
    {
      title: "Monte um quadro de sinais da primeira derivada",
      paragraphs: [
        "Separe o domínio nos pontos internos em que a derivada zera ou não existe e nas entradas excluídas. Teste um ponto por intervalo quando a expressão fatorada mostrar que não há outra troca possível de sinal.",
        "Uma derivada positiva em todo um intervalo implica crescimento estrito pelo teorema do valor médio. Se for negativa, implica decrescimento estrito. Não combine intervalos separados por uma falha de domínio em uma única conclusão.",
      ],
      example: {
        title: "Do sinal ao desenho",
        prompt: "Estude o crescimento de §f(x)=x^3-3x§.",
        steps: [
          "A derivada é §3(x-1)(x+1)§. Os candidatos são −1 e 1.",
          "Ela é positiva para §x<-1§ e §x>1§, e negativa para §-1<x<1§.",
          "A função cresce antes de −1, decresce até 1 e depois volta a crescer.",
        ],
      },
      visual: { kind: "calc-graph", model: "derivative-sign", caption: "Mova o ponto e compare o sinal da inclinação com o trecho crescente ou decrescente." },
    },
    {
      title: "Classifique extremos locais",
      paragraphs: [
        "Um máximo local é uma altura que domina as saídas suficientemente próximas do ponto. Um mínimo local domina no sentido inverso. Para candidatos internos, uma troca de sinal da derivada de positivo para negativo indica máximo, e de negativo para positivo indica mínimo.",
        "Uma derivada nula sem troca de sinal pode indicar apenas uma tangente horizontal. Um ponto em que a derivada não existe ainda pode ser um extremo, desde que a função esteja definida ali.",
      ],
      example: {
        title: "Compare um canto e uma tangente horizontal",
        prompt: "Classifique zero em §f(x)=|x|§ e em §g(x)=x^3§.",
        steps: [
          "Para f, o sinal da derivada muda de negativo para positivo. Além disso, §f(x)\\ge f(0)§, então zero é mínimo.",
          "Para g, §g'(0)=0§, mas §g'(x)=3x^2>0§ nos dois lados de zero.",
          "A função g continua crescendo e zero não é extremo local.",
        ],
      },
    },
    {
      title: "Compare extremos absolutos em um intervalo fechado",
      paragraphs: [
        "Quando f é contínua em um intervalo fechado, avalie f nas duas pontas e nos candidatos internos em que a derivada zera ou não existe. Compare os valores obtidos, pois um extremo local pode perder para uma extremidade.",
        "Registre a entrada e o valor. Pode haver empate ou várias entradas para o mesmo máximo. Se uma fronteira estiver excluída, um valor que só seria atingido ali pode não ser extremo.",
        "A lista de candidatos só funciona depois de incluir pontos do domínio em que a derivada falha, como um vértice de módulo. Em um intervalo fechado, uma ponta pode ter valor máximo mesmo quando a inclinação ali é diferente de zero. O motivo é que não há entradas permitidas do outro lado para testar se o gráfico continuaria subindo.",
      ],
      example: {
        title: "Uma ponta vence o máximo local",
        prompt: "Ache os extremos absolutos de §f(x)=x^3-3x§ em §[-2,3]§.",
        steps: [
          "Os candidatos internos são §x=-1§ e §x=1§. As pontas são −2 e 3.",
          "Os valores correspondentes são §f(-1)=2§, §f(1)=-2§, §f(-2)=-2§ e §f(3)=18§.",
          "O máximo é 18 em 3. O mínimo é −2, atingido em −2 e em 1.",
        ],
      },
    },
    {
      title: "Use concavidade e pontos de inflexão",
      paragraphs: [
        "Quando §f''>0§ em um intervalo, as inclinações aumentam e a curva é côncava para cima. Quando §f''<0§, as inclinações diminuem. Em um ponto de inflexão, a curva muda de concavidade.",
        "Procure candidatos onde a segunda derivada zera ou deixa de existir, mantendo a exigência de que haja um ponto da curva. Teste a mudança de sinal. O valor zero sozinho não garante inflexão.",
      ],
      example: {
        title: "Duas segundas derivadas que zeram na origem",
        prompt: "Compare a concavidade de §x^3§ e §x^4§ perto de zero.",
        steps: [
          "Para §x^3§, a segunda derivada é §6x§ e muda de negativa para positiva.",
          "Assim a origem é ponto de inflexão de §x^3§.",
          "Para §x^4§, a segunda derivada é §12x^2§ e permanece positiva fora de zero. Não há inflexão.",
        ],
      },
      extraExample: {
        title: "Classifique um ponto estacionário pela segunda derivada",
        prompt: "Classifique §x=1§ em §f(x)=x^2-2x+5§ usando a segunda derivada.",
        steps: [
          "A primeira derivada é §2x-2§ e zera em 1.",
          "A segunda derivada vale 2, então o gráfico é côncavo para cima ali.",
          "O ponto é mínimo local. Neste exemplo ele também é absoluto, pois §f(x)=(x-1)^2+4§.",
        ],
      },
    },
    {
      title: "Modele uma otimização com uma variável",
      paragraphs: [
        "Escolha a quantidade a maximizar ou minimizar e escreva as restrições. Use uma restrição para eliminar uma variável da função objetivo. O domínio vem das condições físicas ou econômicas do problema.",
        "A derivada só começa depois que o modelo está definido. Calcule os candidatos e verifique se pertencem ao domínio. Justifique a decisão comparando valores, usando o sinal ou explorando uma simetria.",
        "Em uma otimização, escreva a conclusão nas unidades do problema. O valor de x é uma dimensão e §A(x)§ é uma área. Se o objetivo é escolher dimensões, informe todos os lados, mesmo quando só um deles foi usado como variável. Conferir o perímetro ou outra restrição no final ajuda a detectar soluções válidas para uma equação diferente da original.",
      ],
      example: {
        title: "Maior área com perímetro fixo",
        prompt: "Um retângulo tem perímetro de 24 m. Quais dimensões dão a maior área?",
        steps: [
          "Se os lados são x e y, então §x+y=12§. A área é §A(x)=x(12-x)§ em §0<x<12§.",
          "A derivada §12-2x§ zera em 6, é positiva antes e negativa depois.",
          "O máximo é §A(6)=36§ m², obtido com lados de 6 m.",
        ],
      },
      visual: { kind: "calc-graph", model: "optimize", caption: "Ajuste a largura de um retângulo com soma dos lados igual a 12 e compare a área." },
    },
    {
      title: "Distingua soluções contínuas de escolhas inteiras",
      paragraphs: [
        "Uma variável como quantidade de itens pode ser inteira. A derivada da extensão contínua ajuda a encontrar candidatos, mas a decisão final deve comparar valores nas quantidades permitidas.",
        "Se a função cresce até o máximo contínuo e decresce depois, teste os inteiros permitidos vizinhos. Em problemas com vários pontos críticos ou restrições adicionais, compare também os outros candidatos e fronteiras relevantes.",
      ],
      example: {
        title: "Uma produção que não pode ser fracionária",
        prompt: "Para inteiros §0\\le q\\le10§, maximize §P(q)=-2q^2+15q-4§.",
        steps: [
          "A extensão contínua cresce até §q=15/4=3{,}75§ e decresce depois.",
          "Compare §P(3)=23§ e §P(4)=24§.",
          "A produção ótima é 4 unidades. O máximo da extensão contínua não é uma decisão disponível.",
        ],
      },
    },
    {
      title: "Aproxime raízes pela reta tangente",
      paragraphs: [
        "O método de Newton substitui a curva por sua tangente no ponto atual. A raiz dessa reta vira o próximo palpite, dado por §x_{n+1}=x_n-f(x_n)/f'(x_n)§ quando a derivada não é zero.",
        "Uma boa aproximação inicial pode acelerar o método. Se a inclinação for muito pequena ou se a tangente apontar para longe, a próxima entrada pode piorar o palpite. Confira a saída obtida em cada etapa.",
      ],
      example: {
        title: "Duas aproximações para a raiz de 2",
        prompt: "Use Newton em §f(x)=x^2-2§ a partir de §x_0=1§.",
        steps: [
          "A primeira tangente dá §x_1=1-(-1)/2=3/2§.",
          "A segunda dá §x_2=3/2-(1/4)/3=17/12§, cerca de 1,4167.",
          "O quadrado de §17/12§ é §289/144§, que excede 2 em apenas §1/144§.",
        ],
      },
    },
  ],
  pitfall: "Encontrar §f'(a)=0§ só identifica um candidato. Em §f(x)=x^3§, a derivada zera em zero, mas a função cresce dos dois lados. Teste sinais ou compare valores antes de classificar.",
  checks: [
    { prompt: "Encontre a tangente a §f(x)=x^3§ em 1.", solution: "O ponto é §(1,1)§ e a inclinação é 3. A reta é §y=1+3(x-1)§." },
    { prompt: "Estime §\\sqrt{8{,}94}§ usando §a=9§.", solution: "A taxa em 9 é §1/6§. O passo é −0,06, então a estimativa é §3-0{,}01=2{,}99§." },
    { prompt: "Um raio cresce a 0,3 m/s e vale 4 m. Qual é a taxa da área circular?", solution: "§A'=2\\pi rr'=2\\pi(4)(0{,}3)=2{,}4\\pi§ m²/s." },
    { prompt: "Encontre c para o teorema do valor médio de §f(x)=x^2§ em §[0,6]§.", solution: "A taxa média vale 6. Resolva §2c=6§, obtendo §c=3§." },
    { prompt: "Onde §x^2-4x§ cresce e decresce?", solution: "§f'=2x-4§. Decresce em §(-\\infty,2)§ e cresce em §(2,\\infty)§." },
    { prompt: "Quais são os extremos de §x^2§ em §[-3,1]§?", solution: "Compare §f(-3)=9§, §f(0)=0§ e §f(1)=1§. O máximo é 9 e o mínimo é zero." },
    { prompt: "Zero é ponto de inflexão de §x^5§?", solution: "Sim. §f''=20x^3§ muda de negativa para positiva na origem." },
    { prompt: "Qual é o maior produto de dois positivos cuja soma é 18?", solution: "§P=x(18-x)§ cresce até 9 e decresce depois. O máximo é §9\\cdot9=81§." },
    { prompt: "Faça uma iteração de Newton para §x^2-3§ a partir de 2.", solution: "§x_1=2-(4-3)/4=7/4§." },
    { prompt: "Um ponto tem §f'=0§ e §f''=0§. Isso basta para classificá-lo?", solution: "Não. Compare §x^4§, §-x^4§ e §x^3§ na origem. Eles dão mínimo, máximo e nenhum extremo, respectivamente." },
  ],
} satisfies StudyLesson;
