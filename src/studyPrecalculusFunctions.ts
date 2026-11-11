import type { StudyLesson } from "./studyBasics";

export const precalculusFunctionLessons: Record<string, StudyLesson> = {
  funcoes: {
    intro: "Uma função descreve como uma quantidade depende de outra. Aprenda a ler a regra, decidir quais entradas são permitidas e usar o gráfico para responder perguntas sobre saídas, zeros e transformações.",
    visual: { kind: "cards", caption: "A leitura começa pela entrada. Cada entrada permitida precisa ter exatamente uma saída.", items: [["Domínio", "Entradas permitidas"], ["Contradomínio", "Conjunto de chegada"], ["Imagem", "Saídas que ocorrem"], ["Zero", "Entrada com §f(x)=0§"]] },
    sections: [
      {
        title: "O que é uma função?",
        paragraphs: [
          "Em §f:A\\to B§, o domínio A reúne as entradas e B é o contradomínio. Cada elemento de A tem exatamente uma saída em B. Entradas diferentes podem ter a mesma saída. Por exemplo, §f(x)=x^2§ envia tanto 2 quanto −2 para 4.",
          "O domínio faz parte da definição. A mesma fórmula pode descrever objetos diferentes quando mudamos as entradas permitidas. Um custo por ingresso pode ser dado por uma expressão que aceita qualquer real na álgebra, embora o modelo físico aceite apenas quantidades inteiras não negativas.",
        ],
        example: { title: "Uma tabela pode definir uma função?", prompt: "Uma tabela contém os pares §(1,4)§, §(2,4)§ e §(3,6)§. O que acontece ao acrescentar §(2,5)§?", steps: ["Na tabela inicial, as entradas 1, 2 e 3 aparecem uma vez. Repetir a saída 4 é permitido.", "O novo par faz a entrada 2 ter duas saídas, 4 e 5.", "A tabela ampliada não descreve uma função da primeira para a segunda coordenada."] },
      },
      {
        title: "Notação e avaliação",
        paragraphs: [
          "§f(a)§ é o valor da função na entrada a. Para calculá-lo, substitua todas as ocorrências da variável de entrada por a. Use parênteses, principalmente com entradas negativas ou expressões inteiras. O símbolo §f(x)§ indica avaliação, e não multiplicação de f por x.",
          "Quando a entrada é uma expressão como §t+1§, você está montando uma nova expressão em t. Avaliar §f(t+1)§ e calcular §f(t)+1§ são ações diferentes. No primeiro caso, a mudança acontece antes da regra; no segundo, depois.",
        ],
        example: { title: "Substitua uma expressão inteira", prompt: "Para §f(x)=2x^2-3x§, calcule §f(-2)§ e §f(t+1)§.", steps: ["§f(-2)=2(-2)^2-3(-2)=8+6=14§.", "Substitua x por §t+1§: §f(t+1)=2(t+1)^2-3(t+1)§.", "Expanda e reduza: §2t^2+4t+2-3t-3=2t^2+t-1§."] },
        visual: { kind: "precalc-graph", model: "evaluation", caption: "Mude a entrada e observe como o ponto do gráfico mostra a saída correspondente." },
      },
      {
        title: "Domínio pelas restrições",
        paragraphs: [
          "Quando uma regra real vem sem domínio explícito, procure o maior conjunto em que a conta existe. Um denominador precisa ser não nulo, uma raiz de índice par exige radicando não negativo e um logaritmo real exige argumento positivo.",
          "Se a fórmula tem mais de uma restrição, encontre a interseção das condições. Uma raiz no denominador, por exemplo, exige radicando estritamente positivo. Em problemas de aplicação, imponha também as restrições do contexto, como tempo não negativo.",
        ],
        example: { title: "Combine raiz e denominador", prompt: "Determine o domínio de §g(x)=\\frac{\\sqrt{x+1}}{x-2}§.", steps: ["A raiz exige §x+1\\ge0§, logo §x\\ge-1§.", "O denominador exige §x\\ne2§. A condição da raiz continua valendo.", "O domínio é §[-1,2)\\cup(2,\\infty)§. Em −1 a função existe e vale zero."] },
      },
      {
        title: "Imagem, zeros e leitura do gráfico",
        paragraphs: [
          "No gráfico, o ponto §(a,b)§ indica §f(a)=b§. O domínio é o conjunto de coordenadas x que aparecem e a imagem é o de coordenadas y. Pontos abertos e extremos atingidos merecem atenção. Em um desenho parcial, só podemos inferir o que o gráfico e o enunciado informam.",
          "Zeros são entradas cujos pontos estão no eixo horizontal. O intercepto vertical, quando existe, é §(0,f(0))§. Pelo teste da reta vertical, um gráfico representa função de x se nenhuma reta vertical intercepta o desenho em mais de um ponto.",
        ],
        example: { title: "Extraia dados sem resolver uma equação geral", prompt: "Para §f(x)=x^2-4§ restrita a §[-1,3]§, encontre a imagem, o zero e o intercepto vertical.", steps: ["O menor valor de §x^2§ é 0, em x igual a 0. O maior é 9, em x igual a 3. Como a função é contínua, a imagem é §[-4,5]§.", "A fórmula zera em ±2, mas −2 não pertence ao domínio. O único zero é 2.", "O intercepto vertical é §(0,-4)§, porque o domínio contém zero."] },
      },
      {
        title: "Desloque e reflita gráficos",
        paragraphs: [
          "Em §f(x)+k§, cada saída aumenta k, então o gráfico sobe se k for positivo. Em §f(x-h)§, o mesmo valor que aparecia em x igual a a passa a ocorrer em §a+h§. Assim, h positivo desloca para a direita.",
          "Em §-f(x)§, a saída troca de sinal e o gráfico reflete no eixo x. Em §f(-x)§, a entrada muda de sinal e o gráfico reflete no eixo y. Para conferir um deslocamento, acompanhe um ponto fácil, como um vértice ou um zero.",
        ],
        example: { title: "Acompanhe o ponto mínimo", prompt: "Obtenha o gráfico de §g(x)=(x-3)^2+2§ a partir de §f(x)=x^2§.", steps: ["Substituir x por §x-3§ move a parábola 3 unidades para a direita.", "Somar 2 move cada saída 2 unidades para cima.", "O vértice vai de §(0,0)§ a §(3,2)§. Como o quadrado é não negativo, a imagem é §[2,\\infty)§."] },
      },
    ],
    pitfall: "Substitua a entrada inteira. Se §f(x)=x^2§, então §f(a+b)=(a+b)^2§, que em geral difere de §f(a)+f(b)§.",
    checks: [
      { prompt: "Qual é o domínio de §1/\\sqrt{4-x}§?", solution: "O radicando deve ser positivo porque a raiz está no denominador. Então §4-x>0§ e o domínio é §(-\\infty,4)§." },
      { prompt: "Para §f(x)=x^2§, qual é o vértice de §f(x+2)-5§?", solution: "O gráfico vai 2 unidades para a esquerda e 5 para baixo. O vértice fica em §(-2,-5)§." },
    ],
  },
  "funcoes-afins": {
    intro: "Uma função afim representa uma variação constante. Você vai descobrir o papel da inclinação e do intercepto, montar uma equação a partir de dados e interpretar zeros e desigualdades.",
    visual: { kind: "cards", caption: "Na reta, a inclinação compara a variação vertical com a horizontal.", items: [["Regra", "§f(x)=ax+b§"], ["Inclinação", "§a=\\Delta y/\\Delta x§"], ["Intercepto vertical", "§(0,b)§"], ["Zero, se §a\\ne0§", "§-b/a§"]] },
    sections: [
      {
        title: "Coeficientes e taxa de variação",
        paragraphs: [
          "Na forma §f(x)=ax+b§, b é a saída em zero. Quando a entrada aumenta h, a saída muda §ah§, independentemente do ponto de partida. Portanto, a é a variação da saída por unidade de entrada. Se a é positivo, a reta sobe da esquerda para a direita. Se é negativo, desce.",
          "Se §a=0§, a função é constante. Quando §b=0§, temos o caso linear §f(x)=ax§, que passa pela origem. Em aplicações, a unidade de a é a unidade da saída dividida pela unidade da entrada, enquanto b tem a unidade da saída.",
        ],
        example: { title: "Separe custo fixo e custo por unidade", prompt: "Uma gráfica cobra R$ 18 de preparação e R$ 2,50 por cartaz. Modele o custo de q cartazes.", steps: ["O custo fixo é §b=18§. Cada cartaz acrescenta R$ 2,50, então §a=2{,}50§.", "A regra é §C(q)=18+2{,}50q§, para quantidades inteiras não negativas.", "Para 12 cartazes, §C(12)=18+30=48§ reais."] },
        visual: { kind: "precalc-graph", model: "affine", caption: "Altere a inclinação. O ponto em que a reta cruza o eixo vertical continua fixo." },
      },
      {
        title: "Encontre a equação por dois pontos",
        paragraphs: [
          "Para dois pontos com coordenadas x diferentes, calcule §a=(y_2-y_1)/(x_2-x_1)§. Mantenha a mesma ordem nas subtrações. Depois, substitua um ponto em §y=ax+b§ ou use §y-y_1=a(x-x_1)§.",
          "Se as coordenadas x são iguais e os pontos são distintos, a reta é vertical. Ela tem equação §x=c§ e não representa y como função de x. Se os dois pontos forem iguais, existe mais de uma reta que passa por eles.",
        ],
        example: { title: "Construa e confira uma reta", prompt: "Encontre a função afim que passa por §(-2,5)§ e §(4,-1)§.", steps: ["§a=(-1-5)/(4-(-2))=-6/6=-1§.", "Em §5=(-1)(-2)+b§, obtemos §b=3§. Então §f(x)=-x+3§.", "Confira o segundo ponto: §f(4)=-4+3=-1§."] },
      },
      {
        title: "Zero, interceptos e esboço",
        paragraphs: [
          "Para achar o intercepto vertical, use §x=0§. Para achar o horizontal, faça §f(x)=0§. Com §a\\ne0§, o zero é §-b/a§. Os interceptos são pontos com coordenadas diferentes, exceto quando a reta passa pela origem.",
          "Dois pontos distintos bastam para desenhar a reta. Se os dois interceptos coincidem na origem, escolha outra entrada, como 1. Quando a reta é horizontal, o intercepto vertical continua existindo. Já o conjunto de zeros pode ser vazio ou a reta real inteira.",
        ],
        example: { title: "Esboce sem tabela longa", prompt: "Encontre os interceptos de §f(x)=-3x+6§ e descreva a reta.", steps: ["§f(0)=6§. Marque §(0,6)§.", "Resolva §-3x+6=0§ para obter §x=2§. Marque §(2,0)§.", "Ligue os pontos. A reta decresce, pois a saída cai 3 quando x aumenta 1."] },
      },
      {
        title: "Sinal e inequações",
        paragraphs: [
          "O sinal de f é positivo acima do eixo x e negativo abaixo. Se a reta cresce, os valores ficam negativos antes do zero e positivos depois. Se decresce, a ordem se inverte. Um esboço ajuda a prever em que direção a resposta deve apontar.",
          "Ao resolver uma inequação pela álgebra, isole x. Dividir por número negativo inverte o sentido, pois a multiplicação negativa reflete a reta numérica. Inclua o ponto de fronteira apenas quando o sinal aceita igualdade.",
        ],
        example: { title: "Compare a reta com uma altura", prompt: "Resolva §-2x+5\\ge9§.", steps: ["Subtraia 5: §-2x\\ge4§.", "Divida por −2 e inverta o sinal: §x\\le-2§.", "O intervalo é §(-\\infty,-2]§. Em −2 a função vale 9, e à esquerda a reta está mais alta."] },
      },
      {
        title: "Compare dois modelos afins",
        paragraphs: [
          "Duas retas de inclinações distintas se cruzam uma vez. Para encontrar o cruzamento, iguale as duas saídas. Se as inclinações são iguais, compare os interceptos: retas distintas são paralelas e retas de mesmo intercepto coincidem.",
          "Em modelos de custo, o ponto de cruzamento marca o empate. Para descobrir o lado em que cada opção é mais barata, teste uma entrada de cada lado ou analise a diferença entre os custos. Verifique também quais entradas são admissíveis.",
        ],
        example: { title: "Descubra quando duas tarifas empatam", prompt: "Compare §A(q)=30+2q§ e §B(q)=10+4q§ para q unidades não negativas.", steps: ["Iguale: §30+2q=10+4q§, então §q=10§ e ambas custam 50.", "Em §q=0§, B custa menos. Em §q=20§, A custa menos.", "Como a diferença §A(q)-B(q)=20-2q§ decresce, B é mais barata antes de 10 e A depois."] },
      },
    ],
    pitfall: "O coeficiente b informa onde a reta cruza o eixo vertical. O zero resolve §ax+b=0§ e pertence ao eixo horizontal.",
    checks: [
      { prompt: "Qual é a inclinação da reta por §(1,4)§ e §(5,2)§?", solution: "§a=(2-4)/(5-1)=-1/2§. A saída cai meia unidade quando a entrada aumenta 1." },
      { prompt: "Em que faixa §f(x)=4-2x§ é positiva?", solution: "§4-2x>0§ equivale a §x<2§. A reta decrescente está acima do eixo horizontal à esquerda do zero." },
    ],
  },
  "funcoes-quadraticas": {
    intro: "A parábola tem um ponto de mudança, um eixo de simetria e até duas raízes reais. Aprenda a escolher a forma da função que deixa mais visível o que você quer descobrir.",
    visual: { kind: "cards", caption: "Cada forma destaca uma informação diferente sobre a mesma função.", items: [["Geral", "§ax^2+bx+c§"], ["Canônica", "§a(x-h)^2+k§"], ["Fatorada, com raízes reais", "§a(x-r_1)(x-r_2)§"], ["Discriminante", "§\\Delta=b^2-4ac§"]] },
    sections: [
      {
        title: "Leia a parábola pela forma geral",
        paragraphs: [
          "Uma função quadrática tem forma §f(x)=ax^2+bx+c§, com §a\\ne0§. Seu domínio natural é ℝ. Se §a>0§, a parábola abre para cima e tem mínimo. Se §a<0§, abre para baixo e tem máximo. Quanto maior §|a|§, maior é a variação vertical para uma mesma distância horizontal ao vértice.",
          "O termo c é a saída em zero. O coeficiente b influencia a posição do eixo de simetria junto com a, então não representa sozinho uma translação. Para separar os efeitos, reescreva a função na forma canônica.",
        ],
        example: { title: "Esboce por simetria", prompt: "Esboce §f(x)=-2x^2+4x+1§ e encontre seu intercepto vertical.", steps: ["A parábola abre para baixo, porque §a=-2<0§.", "O intercepto vertical é o termo independente: §f(0)=c=1§.", "O eixo de simetria passa por §x=-\\frac{b}{2a}=-\\frac{4}{-4}=1§, e §f(1)=-2+4+1=3§. O vértice é §(1,3)§.", "Pela simetria em relação a §x=1§, §f(2)=f(0)=1§. Esses pontos orientam o esboço."] },
      },
      {
        title: "Vértice, forma canônica e imagem",
        paragraphs: [
          "Complete o quadrado para obter §f(x)=a(x-h)^2+k§. O vértice é §(h,k)§ e §h=-b/(2a)§. O valor k pode ser calculado por §f(h)§ ou por §-\\Delta/(4a)§. As saídas à mesma distância de h são iguais.",
          "Como §(x-h)^2\\ge0§, a imagem em domínio real inteiro é §[k,\\infty)§ se §a>0§ e §(-\\infty,k]§ se §a<0§. Com domínio restrito, compare o vértice quando ele pertence ao intervalo e os valores das extremidades relevantes.",
        ],
        example: { title: "Complete o quadrado sem mudar o valor", prompt: "Escreva §f(x)=x^2-6x+5§ na forma canônica e encontre a imagem.", steps: ["A metade de −6 é −3 e seu quadrado é 9.", "Some e retire 9 para obter §f(x)=(x-3)^2-4§.", "O mínimo é −4, em §x=3§. Logo, a imagem é §[-4,\\infty)§."] },
        visual: { kind: "precalc-graph", model: "quadratic", caption: "Mova a altura do vértice e observe quando a parábola tem dois, um ou nenhum zero real." },
      },
      {
        title: "Raízes, discriminante e fatoração",
        paragraphs: [
          "Os zeros resolvem §ax^2+bx+c=0§. Se a expressão fatora facilmente, iguale cada fator a zero. Em geral, calcule §\\Delta=b^2-4ac§. A fórmula quadrática é §x=(-b\\pm\\sqrt\\Delta)/(2a)§ quando §\\Delta\\ge0§.",
          "O discriminante positivo dá dois zeros distintos, zero dá uma raiz dupla e negativo dá nenhum zero real. Quando existem raízes reais, a forma fatorada usa o coeficiente principal e os fatores §x-r_1§ e §x-r_2§. A soma das raízes é §-b/a§ e o produto é §c/a§.",
        ],
        example: { title: "Confira as raízes por dois caminhos", prompt: "Encontre os zeros de §2x^2-x-3§.", steps: ["§\\Delta=(-1)^2-4(2)(-3)=25§.", "§x=(1\\pm5)/4§ dá §3/2§ e −1.", "A forma fatorada é §(2x-3)(x+1)§. Ao expandir, recuperamos a função."] },
      },
      {
        title: "Quadro de sinais",
        paragraphs: [
          "Com duas raízes distintas, uma parábola que abre para cima é negativa entre as raízes e positiva fora. Se abre para baixo, os sinais se invertem. A fatoração explica a troca: ao atravessar uma raiz simples, um dos fatores muda de sinal.",
          "Com uma raiz dupla, os lados têm o mesmo sinal, pois o fator aparece ao quadrado. Sem raiz real, a função tem o sinal de a em todo ℝ. Em inequações, inclua zeros só quando a igualdade é permitida.",
        ],
        example: { title: "Escolha o trecho que atende à desigualdade", prompt: "Resolva §-x^2+5x-6\\ge0§.", steps: ["Fatore §-(x-2)(x-3)§. Os zeros são 2 e 3.", "A concavidade é para baixo. Entre os zeros, o gráfico fica acima do eixo horizontal.", "Como a igualdade vale nos dois zeros, a solução é §[2,3]§."] },
      },
      {
        title: "Máximo ou mínimo em um problema",
        paragraphs: [
          "Para otimizar uma quantidade, escreva a função e o conjunto de valores viáveis. O vértice dá o extremo da parábola inteira. Se o vértice não for uma entrada viável, examine as pontas e a direção em que a função varia.",
          "Quando as entradas são discretas, como um número de objetos, compare os inteiros viáveis vizinhos do vértice. Depois interprete tanto a entrada que produz o ótimo quanto o valor ótimo da função.",
        ],
        example: { title: "Área máxima com perímetro fixo", prompt: "Um retângulo tem perímetro 24 m. Qual é a maior área possível?", steps: ["Se um lado é x, o outro é §12-x§, com §0<x<12§.", "A área é §A(x)=x(12-x)=-(x-6)^2+36§.", "O vértice viável é §x=6§. A área máxima é 36 m² e ocorre num quadrado."] },
      },
    ],
    pitfall: "§\\Delta<0§ significa que o gráfico não cruza o eixo horizontal. A função continua definida em todo ℝ.",
    checks: [
      { prompt: "Ache o vértice e a imagem de §f(x)=(x+2)^2-5§.", solution: "O vértice é §(-2,-5)§ e a imagem é §[-5,\\infty)§." },
      { prompt: "Quais são os zeros de §x^2-9§?", solution: "Fatore §(x-3)(x+3)§. Os zeros são −3 e 3." },
    ],
  },
  "funcoes-polinomiais": {
    intro: "Em um polinômio, a escrita expandida revela o grau e a escrita fatorada ajuda a entender os zeros. Você vai passar de uma forma à outra para prever o desenho do gráfico.",
    visual: { kind: "cards", caption: "Grau, coeficiente principal e multiplicidade respondem a perguntas diferentes sobre a curva.", items: [["Grau", "Maior expoente com coeficiente não nulo"], ["Termo dominante", "Controla as extremidades"], ["Raiz de multiplicidade par", "Toca o eixo"], ["Raiz de multiplicidade ímpar", "Cruza o eixo"]] },
    sections: [
      {
        title: "Reconheça termos, grau e operações",
        paragraphs: [
          "Um polinômio é uma soma finita de termos §a_kx^k§, em que os expoentes k são inteiros não negativos. Em §P(x)=a_nx^n+\\cdots+a_0§, com §a_n\\ne0§, n é o grau. O domínio natural é ℝ. O polinômio zero não tem grau nessa convenção.",
          "Na soma, reúna termos com o mesmo expoente. Os termos de maior grau podem se cancelar, reduzindo o grau. Na multiplicação de polinômios não nulos, os termos líderes se multiplicam, então os graus se somam. Faltas de termos podem ser anotadas com coeficiente zero.",
        ],
        example: { title: "Preveja o grau antes de expandir", prompt: "Determine o grau e o termo líder de §(3x^2-1)(-2x^3+x)§.", steps: ["O primeiro fator tem grau 2 e o segundo tem grau 3.", "O único produto de grau 5 é §3x^2(-2x^3)=-6x^5§.", "O grau é 5 e o coeficiente líder é −6. Nenhum outro termo pode cancelar o termo de grau 5."] },
      },
      {
        title: "Comportamento nas extremidades",
        paragraphs: [
          "Para entradas de módulo muito grande, a parte dominante é o termo líder §a_nx^n§. Compare os graus dividindo por §x^n§. Cada termo de grau menor fica dividido por uma potência positiva de x e sua contribuição relativa diminui.",
          "Se n é par, os dois lados apontam na mesma direção, determinada pelo sinal de §a_n§. Se n é ímpar, apontam em sentidos opostos. O sinal do coeficiente líder diz o que acontece à direita. Esse raciocínio não determina o formato perto das raízes.",
        ],
        example: { title: "Descreva as pontas do gráfico", prompt: "Como se comporta §P(x)=-2x^4+7x^3+1§ para valores de módulo grande?", steps: ["O termo líder é §-2x^4§.", "Como §x^4§ é positivo para x não nulo, o termo líder é negativo à esquerda e à direita.", "As duas pontas descem. O termo cúbico pode mudar o desenho local, mas não esse comportamento." ] },
      },
      {
        title: "Zeros e multiplicidade",
        paragraphs: [
          "Se §P(x)=(x-r)^mQ(x)§ e §Q(r)\\ne0§, r é uma raiz de multiplicidade m. Próximo de r, Q mantém seu sinal. Quando m é par, §(x-r)^m§ mantém o sinal e o gráfico toca o eixo. Quando m é ímpar, ele troca de sinal e cruza.",
          "A soma das multiplicidades das raízes reais não pode passar do grau de um polinômio não nulo. Uma raiz tripla pode cruzar com aparência achatada. Identifique a multiplicidade pela fatoração, porque um esboço sozinho pode esconder esse detalhe.",
        ],
        example: { title: "Descubra onde a curva cruza ou toca", prompt: "Classifique os zeros de §P(x)=(x+2)(x-1)^2§.", steps: ["§x=-2§ zera o primeiro fator e tem multiplicidade 1, então há cruzamento.", "§x=1§ zera o fator ao quadrado e tem multiplicidade 2, então a curva toca o eixo.", "Para §x>-2§, o primeiro fator é positivo. Em 1, o valor zera, mas fica positivo dos dois lados próximos."] },
        visual: { kind: "precalc-graph", model: "polynomial", caption: "Alterne a multiplicidade da raiz em x = 1. A outra raiz permanece simples." },
      },
      {
        title: "Divisão, resto e candidatos a raiz",
        paragraphs: [
          "Na divisão de P por D, escrevemos §P=DQ+R§, com o resto de grau menor que D ou igual a zero. Se §D(x)=x-r§, o resto é constante e vale §P(r)§. Logo, §x-r§ é fator exatamente quando §P(r)=0§.",
          "Para polinômios de coeficientes inteiros e termo constante não nulo, uma raiz racional reduzida §p/q§ tem numerador divisor do termo constante e denominador divisor do coeficiente líder. A lista dá candidatos. Teste cada um e, ao achar uma raiz, reduza o grau por divisão.",
        ],
        example: { title: "Ache um fator e reduza o grau", prompt: "Encontre os zeros de §P(x)=x^3-4x^2+x+6§.", steps: ["Os candidatos inteiros incluem ±1, ±2, ±3 e ±6. Teste §P(-1)=0§.", "Dividindo por §x+1§, obtemos §x^2-5x+6§ com resto zero.", "Fatore o quociente como §(x-2)(x-3)§. Os zeros são −1, 2 e 3."] },
      },
      {
        title: "Faça um quadro de sinais",
        paragraphs: [
          "Ordene os zeros reais e divida a reta em faixas. Um polinômio mantém o sinal entre zeros consecutivos, pois é contínuo e precisaria passar por zero para trocar de sinal. Avalie um ponto em cada faixa ou use a paridade das multiplicidades.",
          "A fatoração também informa o sinal de cada componente. Para uma inequação estrita, retire os zeros. Para uma inequação não estrita, inclua todos os zeros do polinômio, mesmo os que não separam faixas com sinais opostos.",
        ],
        example: { title: "Resolva sem confundir a raiz dupla", prompt: "Determine onde §(x+2)(x-1)^2>0§.", steps: ["O quadrado é positivo para todo x diferente de 1.", "O sinal restante é o de §x+2§, que é positivo se §x>-2§.", "Retire o ponto 1, pois a desigualdade é estrita. A solução é §(-2,1)\\cup(1,\\infty)§."] },
      },
    ],
    pitfall: "Na divisão sintética, mantenha a posição dos termos ausentes. Para §x^3-2x+1§, use os coeficientes 1, 0, −2 e 1.",
    checks: [
      { prompt: "Qual é o resto de dividir §x^3-2x+1§ por §x-2§?", solution: "O resto é §P(2)=8-4+1=5§." },
      { prompt: "O gráfico de §(x+1)^3(x-2)^2§ cruza em quais raízes?", solution: "Cruza em −1, de multiplicidade 3, e toca em 2, de multiplicidade 2." },
    ],
  },
  "funcoes-racionais": {
    intro: "Em uma função racional, o denominador decide onde a regra existe. Você vai distinguir um ponto removível de uma assíntota, interpretar o comportamento distante e resolver contas com frações algébricas.",
    visual: { kind: "cards", caption: "Registre o domínio antes de cancelar qualquer fator.", items: [["Forma", "§P(x)/Q(x)§"], ["Restrição", "§Q(x)\\ne0§"], ["Zero", "Numerador zero, entrada permitida"], ["Sinal", "Compare os sinais de P e Q"]] },
    sections: [
      {
        title: "Domínio, interceptos e zeros",
        paragraphs: [
          "Uma função racional é um quociente de polinômios, com denominador que não é o polinômio zero. O domínio natural exclui cada raiz do denominador original. Uma raiz do numerador é zero da função somente se permanecer no domínio.",
          "Para encontrar o intercepto vertical, verifique se zero é uma entrada permitida. Para saber onde o gráfico cruza ou toca o eixo horizontal, comece pelas raízes do numerador que são permitidas e analise seu sinal nas proximidades.",
        ],
        example: { title: "Encontre os interceptos e a restrição", prompt: "Analise §f(x)=(x-4)/(x+2)§.", steps: ["O denominador zera em −2, então §D_f=\\mathbb R\\setminus\\{-2\\}§.", "O numerador zera em 4, que é permitido. O intercepto horizontal é §(4,0)§.", "Em zero, §f(0)=-4/2=-2§. O intercepto vertical é §(0,-2)§."] },
      },
      {
        title: "Cancele fatores sem apagar restrições",
        paragraphs: [
          "Cancele fatores inteiros em comum, como §x-a§ no numerador e no denominador. A expressão reduzida tem o mesmo valor nas entradas do domínio original. O ponto proibido continua de fora, mesmo quando o quociente reduzido poderia ser avaliado ali.",
          "Se o denominador reduzido não zera no ponto removido, há um buraco na altura dada pela expressão reduzida. Se ainda resta um fator nulo no denominador, o gráfico se aproxima de uma assíntota vertical. A multiplicidade dos fatores determina o que sobra.",
        ],
        example: { title: "Um gráfico com buraco e assíntota", prompt: "Classifique as restrições de §g(x)=\\frac{(x-2)(x+1)}{x(x-2)}§.", steps: ["O domínio exclui 0 e 2.", "Para as entradas permitidas, §g(x)=(x+1)/x§. Em 2, essa expressão vale §3/2§, então há um buraco em §(2,3/2)§.", "Em 0, ainda resta denominador zero e numerador não nulo. A reta §x=0§ é assíntota vertical."] },
        visual: { kind: "precalc-graph", model: "rational", caption: "Compare dois gráficos que excluem x = 1. Num caso há um ponto aberto, no outro há uma assíntota vertical." },
      },
      {
        title: "Assíntotas horizontais e oblíquas",
        paragraphs: [
          "Para comparar graus no infinito, divida numerador e denominador pela maior potência presente no denominador. Se o grau do numerador é menor, o quociente se aproxima de zero. Se os graus são iguais, aproxima-se da razão entre os coeficientes líderes.",
          "Quando o grau do numerador supera o do denominador em um, a divisão polinomial fornece uma reta mais um resto dividido pelo denominador. Como esse resto tende a zero no infinito, a reta é assíntota oblíqua. Uma assíntota horizontal ou oblíqua pode ser cruzada em entradas finitas.",
        ],
        example: { title: "Leia a reta escondida na divisão", prompt: "Encontre a assíntota oblíqua de §f(x)=(x^2+3)/(x-1)§.", steps: ["Escreva §x^2+3=(x-1)(x+1)+4§.", "Então §f(x)=x+1+4/(x-1)§ para §x\\ne1§.", "Quando §|x|§ cresce, §4/(x-1)§ aproxima-se de zero. A assíntota oblíqua é §y=x+1§."] },
      },
      {
        title: "Operações e equações com denominadores",
        paragraphs: [
          "Para somar frações algébricas, use um denominador comum. Para multiplicar, fatore e cancele fatores em comum. Para dividir por uma fração, multiplique pelo inverso e exclua também as entradas em que a fração divisora é zero.",
          "Em uma equação racional, defina o domínio primeiro. Multiplicar os dois lados por um denominador comum é reversível nas entradas permitidas. Depois de resolver a equação resultante, descarte candidatos proibidos e confira os restantes na equação inicial.",
        ],
        example: { title: "Uma identidade com uma entrada excluída", prompt: "Resolva §\\frac{x+2}{x-3}=\\frac{5}{x-3}+1§.", steps: ["Registre §x\\ne3§ e multiplique os dois membros por §x-3§.", "Obtenha §x+2=5+x-3=x+2§.", "A igualdade vale para toda entrada permitida. A solução é §\\mathbb R\\setminus\\{3\\}§."] },
      },
      {
        title: "Inequações por faixas",
        paragraphs: [
          "Para resolver uma desigualdade, leve tudo a um membro e forme um quociente. Marque os zeros do numerador e os valores que anulam o denominador. Esses pontos dividem a reta em faixas nas quais cada fator mantém seu sinal.",
          "Teste um número em cada faixa. Um quociente é positivo quando os sinais de cima e de baixo são iguais. Zeros permitidos entram apenas quando a desigualdade aceita igualdade. Valores proibidos nunca entram, mesmo se o fator responsável foi cancelado.",
        ],
        example: { title: "Uma fronteira aberta e outra fechada", prompt: "Resolva §(x-2)/(x+1)\\le0§.", steps: ["Marque −1 como proibido e 2 como zero permitido.", "À esquerda de −1, numerador e denominador são negativos. Entre −1 e 2, têm sinais opostos. À direita de 2, são positivos.", "Inclua o trecho negativo e o zero 2. A solução é §(-1,2]§."] },
      },
    ],
    pitfall: "Evite multiplicar uma inequação pelo denominador sem conhecer seu sinal. Em uma faixa onde ele é negativo, o sentido se inverte.",
    checks: [
      { prompt: "Qual é a assíntota horizontal de §(3x^2+1)/(2x^2-5)§?", solution: "Os graus são iguais. A assíntota horizontal é §y=3/2§." },
      { prompt: "O que acontece em §x=4§ no gráfico de §(x^2-16)/(x-4)§?", solution: "A regra reduzida é §x+4§, mas 4 foi excluído do domínio. Há um buraco em §(4,8)§." },
    ],
  },
  "funcoes-exponenciais": {
    intro: "Uma exponencial muda por um fator fixo a cada passo. Você vai ler a base, calcular modelos de crescimento e decaimento e resolver equações em que a incógnita aparece no expoente.",
    visual: { kind: "cards", caption: "O fator multiplicativo, e não uma diferença fixa, caracteriza a exponencial.", items: [["Regra básica", "§f(x)=a^x§"], ["Crescimento", "§a>1§"], ["Decaimento", "§0<a<1§"], ["Ponto fixo entre as bases", "§(0,1)§"]] },
    sections: [
      {
        title: "Base, domínio e imagem",
        paragraphs: [
          "A exponencial de base a é §f(x)=a^x§, com §a>0§ e §a\\ne1§. Seu domínio é ℝ e sua imagem é §(0,\\infty)§. Em zero ela vale 1. A reta §y=0§ é assíntota horizontal, à esquerda se a base é maior que 1 e à direita se é menor que 1.",
          "A igualdade §f(x+1)=af(x)§ mostra por que a base controla o crescimento. Cada passo multiplica pelo mesmo fator. Com base maior que 1, isso aumenta saídas positivas. Com base entre 0 e 1, diminui. Uma diferença fixa entre passos caracterizaria um modelo afim.",
        ],
        example: { title: "Compare uma sequência de valores", prompt: "Encontre os valores de §(1/2)^x§ para §x=-1,0,1,2§.", steps: ["Expoente −1 inverte a base, dando 2. Expoente zero dá 1.", "Em 1 e 2, os valores são §1/2§ e §1/4§.", "Cada passo divide a saída por 2. A função decresce sem alcançar zero."] },
        visual: { kind: "precalc-graph", model: "exponential", caption: "Alterne a base. As curvas passam pelo mesmo ponto em x = 0 e se aproximam de y = 0 em sentidos opostos." },
      },
      {
        title: "Taxa por período e valor inicial",
        paragraphs: [
          "Se o valor inicial é §P_0§ e a taxa por período é r, o modelo composto é §P(t)=P_0(1+r)^t§, com §1+r>0§. Use 0,08 para 8%, por exemplo. O expoente t conta períodos na mesma unidade usada pela taxa.",
          "Em um modelo discreto, só os períodos inteiros são dados diretamente pela regra de atualização. A extensão para t real é uma hipótese do modelo. Para recuperar um valor inicial, divida pelo fator acumulado, em vez de aplicar a taxa com o sinal trocado.",
        ],
        example: { title: "Repetir o crescimento muda a base da porcentagem", prompt: "Uma população de 500 cresce 8% por ano. Estime o total após dois anos.", steps: ["O fator anual é §1+0{,}08=1{,}08§.", "O modelo dá §500\\cdot1{,}08^2=583{,}2§.", "A estimativa é 583 indivíduos ao arredondar no final. O aumento do segundo ano incide sobre 540, não sobre 500."] },
      },
      {
        title: "Meia-vida e crescimento contínuo",
        paragraphs: [
          "Se uma quantidade perde metade a cada T unidades de tempo, use §Q(t)=Q_0(1/2)^{t/T}§. O quociente §t/T§ conta quantas meias-vidas se passaram. Em duas meias-vidas, resta um quarto, pois cada metade atua sobre o que sobrou.",
          "No crescimento ou decaimento contínuo, é comum escrever §P(t)=P_0e^{kt}§. Com §k>0§ há crescimento e com §k<0§ há decaimento. O fator por unidade de tempo é §e^k§, então a taxa relativa por unidade é §e^k-1§.",
        ],
        example: { title: "Três meias-vidas", prompt: "Uma amostra de 160 mg tem meia-vida de 6 horas. Quanto sobra após 18 horas?", steps: ["O número de meias-vidas é §18/6=3§.", "A fração restante é §(1/2)^3=1/8§.", "Restam §160/8=20§ mg. Os valores nos três instantes sucessivos são 80, 40 e 20 mg."] },
      },
      {
        title: "Equações e substituição",
        paragraphs: [
          "Se os dois lados podem ser escritos como potências de uma mesma base válida, iguale os expoentes. A função é injetiva, pois é estritamente crescente ou decrescente. Se as bases não combinam, um logaritmo pode isolar o expoente.",
          "Quando aparecem §a^x§ e §a^{2x}§, experimente a troca §u=a^x§. Isso transforma a expressão numa equação em u. Lembre que §u>0§ e verifique as soluções ao voltar para x.",
        ],
        example: { title: "Use uma quadrática em uma potência", prompt: "Resolva §9^x-4\\cdot3^x+3=0§.", steps: ["Use §u=3^x>0§. Como §9^x=u^2§, resulta §u^2-4u+3=0§.", "Fatore §(u-1)(u-3)=0§. Os dois candidatos, 1 e 3, são positivos.", "De §3^x=1§ vem §x=0§. De §3^x=3§ vem §x=1§."] },
      },
      {
        title: "Inequações e deslocamentos",
        paragraphs: [
          "Com base maior que 1, a ordem das potências acompanha a ordem dos expoentes. Com base entre 0 e 1, ela se inverte. Ao usar a mesma base numa inequação, confira sua monotonicidade antes de comparar expoentes.",
          "Em §g(x)=a^{x-h}+k§, o gráfico desloca h na horizontal e k na vertical. Sua assíntota passa a ser §y=k§. O ponto §(0,1)§ da exponencial básica passa a §(h,k+1)§, uma referência para o esboço.",
        ],
        example: { title: "Compare potências com base menor que um", prompt: "Resolva §(1/3)^{x-1}>1/27§.", steps: ["Reescreva §1/27=(1/3)^3§.", "A base está entre 0 e 1, então uma potência maior tem expoente menor: §x-1<3§.", "A solução é §x<4§. Em 4 os lados empatam, então 4 fica de fora."] },
      },
    ],
    pitfall: "Somar dois valores exponenciais iguais dobra o valor. §2^x+2^x=2\\cdot2^x=2^{x+1}§.",
    checks: [
      { prompt: "Resolva §4^{x+1}=8§.", solution: "Escreva §2^{2x+2}=2^3§. Logo, §x=1/2§." },
      { prompt: "Qual é o valor inicial em §Q(t)=80(0{,}9)^t§ e qual a taxa?", solution: "§Q(0)=80§ e o fator 0,9 representa uma queda de 10% por unidade de tempo." },
    ],
  },
  "funcoes-logaritmicas": {
    intro: "O logaritmo responde qual expoente produz um valor. Nesta aula, você vai conectar as duas formas, usar as propriedades com atenção ao domínio e interpretar o gráfico.",
    visual: { kind: "cards", caption: "A forma logarítmica e a exponencial dizem a mesma coisa quando a base é válida e o argumento é positivo.", items: [["Definição", "§\\log_b u=x\\iff b^x=u§"], ["Base", "§b>0§ e §b\\ne1§"], ["Argumento", "§u>0§"], ["Pontos do gráfico", "§(1,0)§ e §(b,1)§"]] },
    sections: [
      {
        title: "Leia o logaritmo como expoente",
        paragraphs: [
          "Para §b>0§ e §b\\ne1§, §\\log_b u=x§ significa §b^x=u§. Como uma potência de base positiva nunca é zero ou negativa, o argumento u deve ser positivo. O resultado x, porém, pode ser qualquer real.",
          "De §b^0=1§ vem §\\log_b1=0§. De §b^1=b§ vem §\\log_b b=1§. O logaritmo natural §\\ln u§ tem base e. Quando a base decimal está subentendida, §\\log u§ indica §\\log_{10}u§.",
        ],
        example: { title: "Um logaritmo negativo de argumento positivo", prompt: "Calcule §\\log_3(1/81)§.", steps: ["Procure a potência de 3 que produz §1/81§.", "Como §81=3^4§, temos §1/81=3^{-4}§.", "Portanto, §\\log_3(1/81)=-4§. O sinal negativo pertence ao expoente, não ao argumento."] },
      },
      {
        title: "Domínio, gráfico e função inversa",
        paragraphs: [
          "A função §y=\\log_b x§ tem domínio §(0,\\infty)§, imagem ℝ e assíntota vertical §x=0§. É crescente se §b>1§ e decrescente se §0<b<1§. Seus gráficos passam por §(1,0)§ e §(b,1)§.",
          "Como a função é inversa de §y=b^x§, as duas curvas se refletem na reta §y=x§. O ponto §(0,1)§ de uma corresponde a §(1,0)§ da outra. Se houver uma expressão no lugar de x, determine onde essa expressão é positiva.",
        ],
        example: { title: "Encontre o domínio a partir do argumento", prompt: "Determine o domínio e o zero de §g(x)=\\log_2(5-2x)§.", steps: ["Exija §5-2x>0§. Isso dá §x<5/2§.", "O logaritmo vale zero quando seu argumento vale 1. Resolva §5-2x=1§.", "O zero é §x=2§, que pertence ao domínio. A fronteira §5/2§ fica de fora."] },
        visual: { kind: "precalc-graph", model: "logarithmic", caption: "Alterne a base e observe o ponto (1, 0) e o comportamento perto do eixo vertical." },
      },
      {
        title: "Produto, quociente, potência e mudança de base",
        paragraphs: [
          "Como multiplicar potências de mesma base soma expoentes, §\\log_b(uv)=\\log_b u+\\log_b v§ para u e v positivos. Dividir subtrai expoentes, então §\\log_b(u/v)=\\log_b u-\\log_b v§. Elevar u à potência r multiplica seu logaritmo por r.",
          "Para mudar de base, escreva §\\log_b u=\\ln u/\\ln b§. A razão também funciona com qualquer outra base válida aplicada aos dois logaritmos. Essas regras não transformam o logaritmo de uma soma em soma de logaritmos.",
        ],
        example: { title: "Use potências conhecidas para calcular", prompt: "Calcule §\\log_2(32/\\sqrt 2)§.", steps: ["Separe o quociente em §\\log_2 32-\\log_2(\\sqrt 2)§.", "Como §32=2^5§ e §\\sqrt2=2^{1/2}§, os valores são 5 e §1/2§.", "A diferença é §9/2§. Isso também sai de §32/\\sqrt2=2^{9/2}§."] },
      },
      {
        title: "Equações logarítmicas e exponenciais",
        paragraphs: [
          "Em uma equação com logaritmos, comece pelo domínio de cada argumento. Se os logaritmos têm a mesma base, pode-se igualar os argumentos, pois a função é injetiva. Se um logaritmo é igual a uma constante, passe para a forma exponencial.",
          "Quando a incógnita está no expoente e as bases não combinam, aplique um logaritmo aos dois lados positivos. Por exemplo, §3^x=7§ dá §x=\\ln7/\\ln3§. Para uma solução exata, mantenha a razão até a última etapa.",
        ],
        example: { title: "A equação algébrica produz um candidato inválido", prompt: "Resolva §\\log_2 x+\\log_2(x-2)=3§.", steps: ["O domínio exige §x>2§. Junte o produto e passe para potência: §x(x-2)=8§.", "Fatore §x^2-2x-8=(x-4)(x+2)§. Os candidatos são 4 e −2.", "Só 4 pertence ao domínio. Verifique §\\log_2 4+\\log_2 2=2+1=3§."] },
      },
      {
        title: "Inequações e sentido da base",
        paragraphs: [
          "Uma base maior que 1 preserva a ordem dos argumentos. Uma base entre 0 e 1 inverte. Para comparar §\\log_b u§ com um número c, você pode escrever §c=\\log_b(b^c)§ e então usar o sentido correto.",
          "Conserve a restrição de positividade mesmo quando ela não aparece no resultado algébrico intermediário. O conjunto-solução é a interseção do que satisfaz a desigualdade com o domínio original.",
        ],
        example: { title: "Combine uma desigualdade com o domínio", prompt: "Resolva §\\log_{1/2}(x-1)\\ge2§.", steps: ["Exija §x>1§. Escreva §2=\\log_{1/2}(1/4)§.", "A base é menor que 1, então §x-1\\le1/4§.", "Combine as condições: §1<x\\le5/4§. Logo, a solução é §(1,5/4]§."] },
      },
    ],
    pitfall: "A regra da potência vale para §\\log_b(u^2)§ quando §u>0§. Elevar o valor do logaritmo, §(\\log_b u)^2§, é outra operação.",
    checks: [
      { prompt: "Calcule §\\log_4 8§.", solution: "Como §4^{3/2}=(\\sqrt4)^3=8§, o resultado é §3/2§." },
      { prompt: "Resolva §\\ln(2x-3)=0§.", solution: "O argumento deve valer 1, então §2x-3=1§ e §x=2§. O argumento em 2 é positivo." },
    ],
  },
};
