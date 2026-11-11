import type { LessonDeepening } from "./studyBasics";

// Aprofundamento das aulas: seções e atividades acrescentadas ao fim de cada aula.
// Texto original em português. Os trechos entre § são TeX inline.
export const deepening: Record<string, LessonDeepening> = {
  "composicao-de-funcoes": {
    sections: [
      {
        title: "Componha funções definidas por partes",
        paragraphs: [
          "Quando a função externa é definida por partes, a condição que escolhe o trecho é testada na saída da função interna, não na entrada original. Em §f(g(x))§, pergunte primeiro em que faixa cai o número §g(x)§. Depois traduza essa condição de volta para x, resolvendo uma desigualdade. É essa tradução que define as novas fronteiras da composta.",
          "Se a função por partes é a interna, a situação se inverte. As condições continuam escritas em x e a função externa é aplicada a cada trecho separadamente. Em ambos os casos, escreva a resposta final também por partes e confira um valor de cada trecho pela cadeia de etapas. Um erro comum é copiar as fronteiras antigas sem verificar se elas mudaram.",
        ],
        example: { title: "A condição recai sobre a saída interna", prompt: "Sejam §f(u)=\\begin{cases}u+1,&u<0\\\\u^2,&u\\ge0\\end{cases}§ e §g(x)=x-2§. Escreva §f(g(x))§ por partes.", steps: ["O primeiro trecho de f vale quando §g(x)<0§, isto é, §x-2<0§, ou seja, §x<2§.", "Nesse caso, §f(g(x))=(x-2)+1=x-1§.", "Quando §x\\ge2§, a saída interna é não negativa e §f(g(x))=(x-2)^2§.", "Confira em §x=3§: §g(3)=1§ e §f(1)=1§. A fórmula do segundo trecho dá §(3-2)^2=1§."] },
        extraExample: { title: "A função por partes no lado de dentro", prompt: "Com as mesmas regras, escreva §g(f(x))§.", steps: ["Agora f age primeiro, e suas condições continuam em x.", "Para §x<0§, §g(f(x))=(x+1)-2=x-1§.", "Para §x\\ge0§, §g(f(x))=x^2-2§. A fronteira permanece em 0, diferente da composta anterior."] },
        visual: { kind: "choices", caption: "A posição da função por partes decide onde ficam as fronteiras.", options: [
          { label: "Partes por fora", result: "fronteira em §x=2§", detail: "A condição §u<0§ é aplicada a §u=x-2§ e precisa ser resolvida em x." },
          { label: "Partes por dentro", result: "fronteira em §x=0§", detail: "As condições já estão em x. A outra regra só transforma cada trecho." },
        ] },
      },
      {
        title: "Módulo por dentro e módulo por fora",
        paragraphs: [
          "O módulo é uma função como qualquer outra, e a posição dele na cadeia muda o gráfico de forma bem diferente. Em §|g(x)|§, o módulo é a etapa externa: ele recebe as saídas de g e transforma as negativas em positivas. No gráfico, os trechos abaixo do eixo horizontal são refletidos para cima, e o resto fica como estava.",
          "Em §g(|x|)§, o módulo é a etapa interna: ele age sobre a entrada. As entradas x e −x passam a produzir o mesmo valor, então o gráfico fica simétrico em relação ao eixo vertical. Na prática, você desenha g apenas para §x\\ge0§ e copia essa metade refletida para a esquerda. Saber qual das duas leituras se aplica economiza contas e evita desenhos errados.",
        ],
        example: { title: "Duas compostas com a mesma parábola", prompt: "Para §g(x)=x^2-2x§, compare §|g(x)|§ e §g(|x|)§ em §x=1§ e em §x=-1§.", steps: ["Em §x=1§: §g(1)=-1§, então §|g(1)|=1§. Já §g(|1|)=g(1)=-1§.", "Em §x=-1§: §g(-1)=3§, então §|g(-1)|=3§.", "Por outro lado, §g(|-1|)=g(1)=-1§.", "A primeira composta nunca é negativa. A segunda dá o mesmo valor em 1 e em −1, como a simetria prevê."] },
        visual: { kind: "cards", caption: "O módulo muda o gráfico de acordo com a etapa em que entra.", items: [["§|g(x)|§", "Reflete para cima o que estava abaixo do eixo x"], ["§g(|x|)§", "Copia a metade direita para a esquerda"], ["Imagem de §|g(x)|§", "Sempre contida em §[0,\\infty)§"], ["Paridade de §g(|x|)§", "Sempre par: §g(|-x|)=g(|x|)§"]] },
      },
      {
        title: "Imagem da composta, etapa por etapa",
        paragraphs: [
          "Para encontrar a imagem de §f\\circ g§, não é preciso montar a fórmula final e adivinhar. Primeiro determine o conjunto de valores que g realmente produz no domínio da composta. Depois aplique f apenas a esse conjunto. A imagem da composta é a imagem de f restrita às saídas de g, que pode ser bem menor que a imagem completa de f.",
          "Esse raciocínio também revela valores proibidos. Se g só produz números maiores ou iguais a 1, então f nunca recebe zero, e um denominador em f deixa de ser problema. Quando a função externa é monótona no conjunto recebido, basta aplicá-la às extremidades, tomando cuidado com a ordem caso ela seja decrescente.",
        ],
        example: { title: "Imagem de uma fração com quadrado no denominador", prompt: "Determine a imagem de §h(x)=\\dfrac{1}{x^2+1}§.", steps: ["Tome §g(x)=x^2+1§ e §f(u)=1/u§. Em ℝ, g produz exatamente §[1,\\infty)§.", "Em §[1,\\infty)§, a função §1/u§ é decrescente, positiva e se aproxima de zero sem atingi-lo.", "O maior valor ocorre em §u=1§ e vale 1.", "A imagem de h é §(0,1]§."] },
        extraExample: { title: "Domínio e imagem de uma raiz composta", prompt: "Determine domínio e imagem de §\\sqrt{9-x^2}§.", steps: ["A raiz exige §9-x^2\\ge0§, logo o domínio é §[-3,3]§.", "Nesse intervalo, §u=9-x^2§ percorre §[0,9]§: vale 9 em §x=0§ e 0 nas pontas.", "A raiz leva §[0,9]§ em §[0,3]§. A imagem é §[0,3]§, a semicircunferência superior de raio 3."] },
      },
      {
        title: "Transformações de gráfico como composições",
        paragraphs: [
          "Cada transformação de gráfico é uma composição com uma função simples. Em §y=f(x-h)+k§, a entrada passa por §x\\mapsto x-h§, depois por f e, por fim, por §u\\mapsto u+k§. As etapas aplicadas antes de f agem na direção horizontal, e as aplicadas depois agem na vertical. Essa divisão explica por que as mudanças internas parecem andar ao contrário.",
          "Em §f(2x)§, a regra interna dobra a entrada, então o gráfico atinge cada altura com metade da abscissa e fica comprimido horizontalmente. Em §2f(x)§, a regra externa dobra a saída e estica na vertical. Para descrever uma expressão, liste as etapas na ordem em que agem sobre x e associe cada uma a um movimento do gráfico.",
        ],
        example: { title: "Desmonte uma raiz transformada", prompt: "Descreva §y=-2\\sqrt{x+3}+1§ como uma cadeia de etapas e encontre domínio e imagem.", steps: ["Primeira etapa, interna: §x\\mapsto x+3§, deslocamento de 3 unidades para a esquerda.", "Segunda etapa: a raiz. Ela exige §x+3\\ge0§, então o domínio é §[-3,\\infty)§.", "Terceira etapa: multiplicar por −2, que estica verticalmente e reflete no eixo x. As saídas passam a ser §\\le0§.", "Quarta etapa: somar 1. A imagem é §(-\\infty,1]§, e o ponto de partida do gráfico é §(-3,1)§."] },
        visual: { kind: "cards", caption: "Antes de f, o efeito é horizontal. Depois de f, é vertical.", items: [["§f(x-h)§", "Desloca h unidades na horizontal"], ["§f(bx)§", "Comprime ou estica na horizontal pelo fator §1/|b|§"], ["§a\\,f(x)§", "Estica na vertical e reflete se §a<0§"], ["§f(x)+k§", "Desloca k unidades na vertical"]] },
      },
      {
        title: "Iterações e pontos fixos",
        paragraphs: [
          "Compor uma função com ela mesma várias vezes é iterar. Partindo de §x_0§, obtemos §x_1=f(x_0)§, §x_2=f(x_1)=f(f(x_0))§ e assim por diante. Isso é exatamente uma sequência definida por recorrência, o que liga esta aula ao estudo de sequências. Cuidado com a notação: aqui §f(f(x))§ não é §f(x)^2§.",
          "Um ponto fixo é uma entrada que a função devolve sem alteração, isto é, §f(p)=p§. Em muitas iterações, os valores se aproximam de um ponto fixo, e isso descreve situações de equilíbrio. Para encontrar candidatos, resolva a equação §f(x)=x§. Em outras funções, a iteração pode crescer sem limite ou voltar ao valor inicial depois de alguns passos.",
        ],
        example: { title: "Iterações que se aproximam de um equilíbrio", prompt: "Itere §f(x)=x/2+3§ a partir de §x_0=0§ e encontre o ponto fixo.", steps: ["§x_1=f(0)=3§, §x_2=f(3)=4{,}5§ e §x_3=f(4{,}5)=5{,}25§.", "A equação §x/2+3=x§ dá §x/2=3§, logo §p=6§.", "A distância até 6 cai pela metade a cada passo: 6, 3, §1{,}5§, §0{,}75§.", "Os iterados se aproximam do ponto fixo 6."] },
        extraExample: { title: "Uma função que volta ao início", prompt: "Mostre que §f(x)=\\dfrac{1}{1-x}§ satisfaz §f(f(f(x)))=x§ para §x\\ne0§ e §x\\ne1§.", steps: ["§f(f(x))=\\dfrac{1}{1-\\frac{1}{1-x}}=\\dfrac{1-x}{-x}=\\dfrac{x-1}{x}§.", "Aplique f mais uma vez: §\\dfrac{1}{1-\\frac{x-1}{x}}=\\dfrac{1}{\\frac{1}{x}}=x§.", "Três aplicações desfazem o processo. As restrições vêm dos denominadores das etapas intermediárias."] },
      },
      {
        title: "Confirme inversas compondo nos dois sentidos",
        paragraphs: [
          "Duas funções f e g são inversas uma da outra quando §f(g(x))=x§ para todo x do domínio de g e §g(f(x))=x§ para todo x do domínio de f. Testar só um dos sentidos pode enganar, porque uma das compostas pode ter domínio menor. A verificação completa é a forma mais segura de conferir uma inversa encontrada algebricamente.",
          "O caso clássico é o par quadrado e raiz. Para §x\\ge0§, §(\\sqrt x)^2=x§. Mas §\\sqrt{x^2}=|x|§ em ℝ, que só coincide com x quando §x\\ge0§. Portanto, raiz e quadrado são inversas apenas quando o quadrado é restrito a §[0,\\infty)§. Em funções racionais, a inversa troca o valor proibido do domínio pelo valor que fica fora da imagem.",
        ],
        example: { title: "Inverta e verifique uma função racional", prompt: "Encontre a inversa de §f(x)=\\dfrac{2x+1}{x-3}§ e confira compondo.", steps: ["De §y(x-3)=2x+1§, obtemos §xy-2x=3y+1§, então §x=\\dfrac{3y+1}{y-2}§.", "Logo, §f^{-1}(x)=\\dfrac{3x+1}{x-2}§, definida para §x\\ne2§. O número 2 não está na imagem de f.", "Compondo: o numerador de §f(f^{-1}(x))§ vale §\\dfrac{2(3x+1)+(x-2)}{x-2}=\\dfrac{7x}{x-2}§.", "O denominador vale §\\dfrac{3x+1-3(x-2)}{x-2}=\\dfrac{7}{x-2}§. O quociente é x."] },
        visual: { kind: "choices", caption: "A ordem entre raiz e quadrado muda o domínio e o resultado.", options: [
          { label: "Raiz depois do quadrado", result: "§\\sqrt{x^2}=|x|§", detail: "Definida em ℝ, mas devolve x apenas quando §x\\ge0§." },
          { label: "Quadrado depois da raiz", result: "§(\\sqrt x)^2=x§", detail: "Devolve a entrada, porém só existe para §x\\ge0§." },
        ] },
      },
      {
        title: "Modele um processo em duas etapas",
        paragraphs: [
          "Muitos problemas aplicados são composições naturais: uma grandeza depende do tempo, e outra depende da primeira. Dê um nome a cada etapa, com a unidade de entrada e a de saída. A composta só faz sentido quando a unidade produzida pela etapa interna é a unidade esperada pela externa. Esse cuidado evita somar minutos com metros ou aplicar uma fórmula de área a um tempo.",
          "Depois de montar a composta, você pode responder perguntas nos dois sentidos. Para calcular um valor, siga a cadeia. Para descobrir quando a saída atinge um nível, resolva a equação final ou desfaça as etapas em ordem inversa, conferindo se a solução respeita o contexto, como tempos não negativos.",
        ],
        example: { title: "Uma mancha circular que cresce", prompt: "O raio de uma mancha circular é §r(t)=3t§ metros após t minutos, e a área é §A(r)=\\pi r^2§. Expresse a área em função do tempo e descubra quando ela vale §225\\pi§ m².", steps: ["A etapa interna leva minutos em metros. A externa leva metros em metros quadrados.", "§A(r(t))=\\pi(3t)^2=9\\pi t^2§.", "Em §t=2§, a área é §36\\pi\\approx113{,}1§ m².", "De §9\\pi t^2=225\\pi§ vem §t^2=25§. Como §t\\ge0§, a resposta é §t=5§ minutos."] },
      },
      {
        title: "Taxas que se multiplicam: rumo à regra da cadeia",
        paragraphs: [
          "Se §u=g(x)§ varia §\\Delta u§ quando x varia §\\Delta x§, e §y=f(u)§ varia §\\Delta y§ em resposta, então §\\dfrac{\\Delta y}{\\Delta x}=\\dfrac{\\Delta y}{\\Delta u}\\cdot\\dfrac{\\Delta u}{\\Delta x}§ sempre que §\\Delta u\\ne0§. A taxa média da composta é o produto das taxas médias das etapas. Para funções afins, as inclinações simplesmente se multiplicam: se g tem inclinação 2 e f tem inclinação 3, a composta tem inclinação 6.",
          "No Cálculo, você vai fazer §\\Delta x§ tender a zero. As taxas médias viram derivadas, e a identidade acima se torna a regra da cadeia: a derivada de §f(g(x))§ é a derivada de f calculada em §g(x)§ vezes a derivada de g. Por isso vale a pena treinar desde já a identificação da etapa interna e da externa.",
        ],
        example: { title: "Taxas médias em uma composta que dá |x|", prompt: "Com §g(x)=x^2§ e §f(u)=\\sqrt u§, compare as taxas médias entre §x=3§ e §x=3{,}01§.", steps: ["A etapa interna vai de 9 a §9{,}0601§. Sua taxa é §0{,}0601/0{,}01=6{,}01§.", "A externa vai de 3 a §\\sqrt{9{,}0601}=3{,}01§. Sua taxa é §0{,}01/0{,}0601\\approx0{,}166§, perto de §1/6§.", "O produto das taxas é exatamente §\\dfrac{0{,}0601}{0{,}01}\\cdot\\dfrac{0{,}01}{0{,}0601}=1§.", "De fato, §f(g(x))=|x|=x§ perto de 3, uma reta de inclinação 1."] },
      },
    ],
    checks: [
      { prompt: "Sejam §f(u)=\\begin{cases}2u,&u<1\\\\u+3,&u\\ge1\\end{cases}§ e §g(x)=x^2§. Escreva §f(g(x))§ por partes e calcule §(f\\circ g)(2)§.", solution: "O primeiro trecho vale quando §x^2<1§, isto é, §-1<x<1§, e dá §2x^2§. Nos demais casos, §|x|\\ge1§ e a composta vale §x^2+3§. Em §x=2§, a saída interna é 4, que cai no segundo trecho: §4+3=7§." },
      { prompt: "Determine domínio e imagem de §h(x)=3-\\sqrt{x+2}§.", solution: "A raiz exige §x\\ge-2§, então o domínio é §[-2,\\infty)§. Nesse domínio, §\\sqrt{x+2}§ assume todos os valores de §[0,\\infty)§. Multiplicar por −1 leva a §(-\\infty,0]§ e somar 3 leva a §(-\\infty,3]§. A imagem é §(-\\infty,3]§, com máximo 3 em §x=-2§." },
      { prompt: "Escreva §h(x)=(x+1)^3-2§ como composição de três etapas e use-as para encontrar §h^{-1}§.", solution: "As etapas são somar 1, elevar ao cubo e subtrair 2. Para desfazer, percorra a cadeia de trás para a frente: some 2, extraia a raiz cúbica e subtraia 1. Logo, §h^{-1}(x)=\\sqrt[3]{x+2}-1§. Conferindo, §h(h^{-1}(x))=(\\sqrt[3]{x+2})^3-2=x§." },
      { prompt: "Para §f(x)=x/3+4§, calcule §f(f(0))§ e encontre o ponto fixo.", solution: "§f(0)=4§ e §f(4)=4/3+4=16/3§. O ponto fixo satisfaz §x/3+4=x§, ou seja, §2x/3=4§, logo §x=6§. Os iterados 0, 4, §16/3§ se aproximam de 6." },
      { prompt: "Descreva §y=2|x-1|-3§ como cadeia de etapas e dê o vértice e a imagem.", solution: "A entrada é deslocada por §x\\mapsto x-1§, passa pelo módulo, é multiplicada por 2 e depois diminuída de 3. O módulo tem mínimo 0 quando a entrada interna é zero, isto é, em §x=1§. O vértice é §(1,-3)§ e a imagem é §[-3,\\infty)§." },
      { prompt: "Com §g(x)=2x+1§ e §f(u)=u^2§, calcule a taxa média de §f\\circ g§ entre §x=1§ e §x=2§ e mostre que ela é o produto das taxas das etapas.", solution: "A etapa interna vai de 3 a 5, com taxa §2/1=2§. A externa vai de 9 a 25, com taxa §16/2=8§ em relação a u. O produto é 16. Diretamente, §f(g(2))-f(g(1))=25-9=16§ para §\\Delta x=1§, a mesma taxa." },
    ],
  },
  trigonometria: {
    sections: [
      {
        title: "Comprimento de arco e área de setor",
        paragraphs: [
          "A definição de radiano torna as fórmulas de arco muito simples. Em uma circunferência de raio r, um ângulo central de θ radianos subtende um arco de comprimento §s=r\\theta§. A área do setor correspondente é a fração §\\theta/(2\\pi)§ da área do círculo, isto é, §A=r^2\\theta/2§. As duas fórmulas só valem com θ em radianos.",
          "As mesmas ideias descrevem rotações. Se um ponto gira com velocidade angular ω, em radianos por segundo, ele percorre um arco §r\\omega§ a cada segundo. Essa é sua velocidade linear. Pontos mais distantes do centro andam mais rápido, embora todos girem o mesmo ângulo. Converter rotações por minuto em radianos por segundo é o passo que costuma faltar.",
        ],
        example: { title: "Arco e setor de 72°", prompt: "Em um círculo de raio 10 cm, calcule o arco e a área do setor de 72°.", steps: ["Converta: §72\\cdot\\pi/180=2\\pi/5§ rad.", "O arco mede §s=10\\cdot2\\pi/5=4\\pi\\approx12{,}57§ cm.", "A área é §A=10^2\\cdot(2\\pi/5)/2=20\\pi\\approx62{,}83§ cm².", "Confira: 72° é um quinto da volta, e §20\\pi§ é um quinto de §100\\pi§."] },
        extraExample: { title: "Da rotação à velocidade linear", prompt: "Uma roda de raio §0{,}3§ m gira a 120 rotações por minuto. Qual é a velocidade de um ponto da borda?", steps: ["120 rotações por minuto são 2 por segundo, ou seja, §\\omega=2\\cdot2\\pi=4\\pi§ rad/s.", "A velocidade linear é §v=r\\omega=0{,}3\\cdot4\\pi=1{,}2\\pi§ m/s.", "Isso dá cerca de §3{,}77§ m/s."] },
      },
      {
        title: "Lei dos senos",
        paragraphs: [
          "Em qualquer triângulo, não só no retângulo, os lados são proporcionais aos senos dos ângulos opostos: §\\dfrac{a}{\\operatorname{sen}A}=\\dfrac{b}{\\operatorname{sen}B}=\\dfrac{c}{\\operatorname{sen}C}§. Para justificar, trace a altura relativa a um dos lados. Ela pode ser escrita de duas maneiras, como §b\\operatorname{sen}C§ e como §c\\operatorname{sen}B§, e igualar essas expressões dá a proporção. O valor comum das razões é o diâmetro da circunferência circunscrita.",
          "Use a lei dos senos quando conhecer dois ângulos e um lado, ou dois lados e o ângulo oposto a um deles. No segundo caso, cuidado: como §\\operatorname{sen}\\theta=\\operatorname{sen}(180^\\circ-\\theta)§, um mesmo seno pode corresponder a um ângulo agudo e a um obtuso. Pode haver zero, um ou dois triângulos compatíveis com os dados.",
        ],
        example: { title: "Dois ângulos e um lado", prompt: "Em um triângulo, §A=45^\\circ§, §B=60^\\circ§ e §a=10§. Encontre b e c.", steps: ["O terceiro ângulo é §C=180^\\circ-45^\\circ-60^\\circ=75^\\circ§.", "§b=\\dfrac{10\\operatorname{sen}60^\\circ}{\\operatorname{sen}45^\\circ}=\\dfrac{10\\sqrt3}{\\sqrt2}=5\\sqrt6\\approx12{,}25§.", "Com §\\operatorname{sen}75^\\circ=(\\sqrt6+\\sqrt2)/4§, temos §c=\\dfrac{10(\\sqrt6+\\sqrt2)/4}{\\sqrt2/2}=5(\\sqrt3+1)\\approx13{,}66§.", "O maior lado está diante do maior ângulo, como deve ser."] },
        visual: { kind: "cards", caption: "Dados a, b e o ângulo agudo A oposto ao lado a: quantos triângulos existem?", items: [["§a<b\\operatorname{sen}A§", "Nenhum: o lado a não alcança a outra semirreta"], ["§a=b\\operatorname{sen}A§", "Um, retângulo em B"], ["§b\\operatorname{sen}A<a<b§", "Dois: B pode ser agudo ou obtuso"], ["§a\\ge b§", "Um único triângulo"]] },
      },
      {
        title: "Lei dos cossenos",
        paragraphs: [
          "Quando os dados são dois lados e o ângulo entre eles, ou os três lados, a ferramenta certa é a lei dos cossenos: §c^2=a^2+b^2-2ab\\cos C§. Ela generaliza o teorema de Pitágoras. Se C é reto, o cosseno vale zero e o termo extra desaparece. Se C é obtuso, o cosseno é negativo e c fica maior do que no caso retângulo.",
          "Para encontrar um ângulo a partir dos três lados, isole o cosseno: §\\cos C=\\dfrac{a^2+b^2-c^2}{2ab}§. Como o arco cosseno devolve ângulos entre 0° e 180°, não há ambiguidade, diferentemente do que ocorre com o seno. Comece pelo maior lado, pois só o ângulo oposto a ele pode ser obtuso.",
        ],
        example: { title: "Lado oposto a um ângulo de 60°", prompt: "Dois lados de um triângulo medem 5 e 8 e formam um ângulo de 60°. Calcule o terceiro lado.", steps: ["§c^2=5^2+8^2-2\\cdot5\\cdot8\\cos60^\\circ§.", "Com §\\cos60^\\circ=1/2§, resulta §c^2=25+64-40=49§.", "Logo, §c=7§."] },
        extraExample: { title: "Um ângulo a partir dos três lados", prompt: "Um triângulo tem lados 7, 8 e 13. Qual é o maior ângulo?", steps: ["O maior ângulo é oposto ao lado 13.", "§\\cos C=\\dfrac{49+64-169}{2\\cdot7\\cdot8}=\\dfrac{-56}{112}=-\\dfrac12§.", "Logo, §C=120^\\circ§. O cosseno negativo já indicava um ângulo obtuso."] },
      },
      {
        title: "Área de um triângulo pelo seno",
        paragraphs: [
          "A área de um triângulo é metade da base vezes a altura. Se você conhece dois lados a e b e o ângulo C entre eles, a altura relativa ao lado a mede §b\\operatorname{sen}C§. Daí sai a fórmula §\\text{Área}=\\tfrac12ab\\operatorname{sen}C§, que dispensa encontrar a altura separadamente e vale também para C obtuso.",
          "A fórmula explica dois fatos visuais. Para lados fixos, a área máxima ocorre com o ângulo reto, onde o seno vale 1. E ângulos suplementares, como 30° e 150°, dão a mesma área, porque têm o mesmo seno. Com os três lados conhecidos, você pode usar a lei dos cossenos para obter um ângulo e depois esta fórmula, ou usar a fórmula de Heron.",
        ],
        example: { title: "Área com dois lados e o ângulo entre eles", prompt: "Calcule a área do triângulo com lados 6 e 8 formando 30°.", steps: ["§\\text{Área}=\\tfrac12\\cdot6\\cdot8\\cdot\\operatorname{sen}30^\\circ§.", "Com §\\operatorname{sen}30^\\circ=1/2§, a área vale §24\\cdot\\tfrac12=12§.", "Com ângulo de 150°, a área também seria 12."] },
        extraExample: { title: "Confira com a fórmula de Heron", prompt: "Calcule de duas formas a área do triângulo de lados 5, 8 e 7.", steps: ["Já vimos que o ângulo entre os lados 5 e 8 mede 60°. A área é §\\tfrac12\\cdot5\\cdot8\\cdot\\tfrac{\\sqrt3}{2}=10\\sqrt3§.", "Por Heron, o semiperímetro é §p=10§ e a área é §\\sqrt{p(p-a)(p-b)(p-c)}=\\sqrt{10\\cdot5\\cdot2\\cdot3}=\\sqrt{300}§.", "Como §\\sqrt{300}=10\\sqrt3§, as duas formas concordam."] },
      },
      {
        title: "Tangente, secante, cossecante e cotangente",
        paragraphs: [
          "Além de seno e cosseno, há quatro razões derivadas: §\\operatorname{tg}\\theta=\\dfrac{\\operatorname{sen}\\theta}{\\cos\\theta}§, §\\sec\\theta=\\dfrac{1}{\\cos\\theta}§, §\\operatorname{cossec}\\theta=\\dfrac{1}{\\operatorname{sen}\\theta}§ e §\\operatorname{cotg}\\theta=\\dfrac{\\cos\\theta}{\\operatorname{sen}\\theta}§. Cada uma deixa de existir onde seu denominador zera. No triângulo retângulo, elas são as razões invertidas: a secante divide a hipotenusa pelo cateto adjacente, e a cotangente divide o adjacente pelo oposto. Nos livros de Cálculo, é comum encontrar as notações §\\sin§, §\\tan§, §\\csc§ e §\\cot§ para seno, tangente, cossecante e cotangente.",
          "Os gráficos herdam essas restrições como assíntotas verticais. A tangente tem período π e assíntotas em §\\pi/2+k\\pi§. A cotangente também tem período π, com assíntotas em §k\\pi§. Secante e cossecante têm período §2\\pi§ e nunca assumem valores entre −1 e 1, pois são recíprocas de números de módulo no máximo 1. Os sinais seguem os de seno e cosseno em cada quadrante.",
        ],
        example: { title: "As seis razões a partir de uma", prompt: "Se §\\operatorname{tg}\\theta=3/4§ e θ está no quadrante III, encontre as outras cinco razões.", steps: ["Um triângulo de referência tem catetos 3 e 4 e hipotenusa 5.", "No quadrante III, seno e cosseno são negativos: §\\operatorname{sen}\\theta=-3/5§ e §\\cos\\theta=-4/5§.", "As recíprocas são §\\operatorname{cossec}\\theta=-5/3§ e §\\sec\\theta=-5/4§.", "A cotangente é §4/3§, positiva como a tangente nesse quadrante."] },
        visual: { kind: "cards", caption: "Onde o denominador zera, o gráfico tem uma assíntota vertical.", items: [["§\\operatorname{tg}x§", "Período π, imagem ℝ, sem §x=\\pi/2+k\\pi§"], ["§\\operatorname{cotg}x§", "Período π, imagem ℝ, sem §x=k\\pi§"], ["§\\sec x§", "Período §2\\pi§, imagem §|y|\\ge1§, sem §x=\\pi/2+k\\pi§"], ["§\\operatorname{cossec}x§", "Período §2\\pi§, imagem §|y|\\ge1§, sem §x=k\\pi§"]] },
      },
      {
        title: "Identidades pitagóricas derivadas",
        paragraphs: [
          "Dividindo §\\operatorname{sen}^2x+\\cos^2x=1§ por §\\cos^2x§, obtemos §\\operatorname{tg}^2x+1=\\sec^2x§. Dividindo por §\\operatorname{sen}^2x§, obtemos §1+\\operatorname{cotg}^2x=\\operatorname{cossec}^2x§. Elas valem onde os denominadores não se anulam. Assim como a identidade original, elas permitem passar de uma razão para outra: conhecendo a tangente, você obtém o módulo da secante, e o quadrante decide o sinal. Essas identidades reaparecem no Cálculo, por exemplo na derivada da tangente e em substituições trigonométricas.",
          "Para provar uma identidade, trabalhe com um lado só e transforme-o até chegar ao outro. Não trate a identidade como equação, passando termos de um lado para o outro, porque isso supõe o que se quer provar. Uma estratégia segura é reescrever tudo em seno e cosseno, juntar frações e procurar §\\operatorname{sen}^2x+\\cos^2x§ ou uma de suas variantes.",
        ],
        example: { title: "Prove uma identidade convertendo para seno e cosseno", prompt: "Mostre que §(1-\\cos^2x)(1+\\operatorname{cotg}^2x)=1§ onde §\\operatorname{sen}x\\ne0§.", steps: ["O primeiro fator é §\\operatorname{sen}^2x§, pela identidade fundamental.", "O segundo fator é §\\operatorname{cossec}^2x=1/\\operatorname{sen}^2x§.", "O produto é §\\operatorname{sen}^2x\\cdot\\dfrac{1}{\\operatorname{sen}^2x}=1§."] },
        extraExample: { title: "Simplifique uma expressão mista", prompt: "Simplifique §\\sec x-\\operatorname{tg}x\\operatorname{sen}x§.", steps: ["Escreva tudo em seno e cosseno: §\\dfrac{1}{\\cos x}-\\dfrac{\\operatorname{sen}^2x}{\\cos x}§.", "Junte as frações: §\\dfrac{1-\\operatorname{sen}^2x}{\\cos x}=\\dfrac{\\cos^2x}{\\cos x}§.", "O resultado é §\\cos x§, válido onde §\\cos x\\ne0§."] },
      },
      {
        title: "Subtração, arco duplo e arco metade",
        paragraphs: [
          "Trocando b por −b nas fórmulas de adição e usando a paridade, saem as de subtração: §\\operatorname{sen}(a-b)=\\operatorname{sen}a\\cos b-\\cos a\\operatorname{sen}b§ e §\\cos(a-b)=\\cos a\\cos b+\\operatorname{sen}a\\operatorname{sen}b§. Com §a=b§ na adição do cosseno, obtemos §\\cos2a=\\cos^2a-\\operatorname{sen}^2a§, que também pode ser escrito como §2\\cos^2a-1§ ou §1-2\\operatorname{sen}^2a§. Escolha a versão que usa o dado disponível: se o problema fornece só o cosseno, a forma §2\\cos^2a-1§ evita calcular o seno e discutir o sinal dele.",
          "Isolando os quadrados nessas versões, chegamos às fórmulas de arco metade: §\\cos^2\\frac{x}{2}=\\frac{1+\\cos x}{2}§ e §\\operatorname{sen}^2\\frac{x}{2}=\\frac{1-\\cos x}{2}§. Elas trocam um quadrado por um cosseno de primeiro grau, truque essencial para integrar §\\operatorname{sen}^2x§ no Cálculo. Ao extrair a raiz, escolha o sinal pelo quadrante de §x/2§. Para tangente, §\\operatorname{tg}(a+b)=\\dfrac{\\operatorname{tg}a+\\operatorname{tg}b}{1-\\operatorname{tg}a\\operatorname{tg}b}§.",
        ],
        example: { title: "Arco duplo a partir de um seno", prompt: "Se §\\operatorname{sen}a=3/5§ e a está no quadrante I, calcule §\\operatorname{sen}2a§, §\\cos2a§ e §\\operatorname{tg}2a§.", steps: ["No quadrante I, §\\cos a=4/5§.", "§\\operatorname{sen}2a=2\\cdot\\tfrac35\\cdot\\tfrac45=\\tfrac{24}{25}§.", "§\\cos2a=1-2\\cdot\\tfrac{9}{25}=\\tfrac{7}{25}§.", "§\\operatorname{tg}2a=\\tfrac{24}{7}§. Confira: §(24/25)^2+(7/25)^2=1§."] },
        extraExample: { title: "Valor exato pelo arco metade", prompt: "Calcule §\\operatorname{sen}(\\pi/8)§.", steps: ["Use §x=\\pi/4§: §\\operatorname{sen}^2(\\pi/8)=\\dfrac{1-\\sqrt2/2}{2}=\\dfrac{2-\\sqrt2}{4}§.", "O ângulo §\\pi/8§ está no quadrante I, então o seno é positivo.", "§\\operatorname{sen}(\\pi/8)=\\dfrac{\\sqrt{2-\\sqrt2}}{2}\\approx0{,}383§."] },
      },
      {
        title: "Soluções gerais e arcos múltiplos",
        paragraphs: [
          "Toda equação básica tem uma solução geral. Se §\\operatorname{sen}x=\\operatorname{sen}\\alpha§, então §x=\\alpha+2k\\pi§ ou §x=\\pi-\\alpha+2k\\pi§. Se §\\cos x=\\cos\\alpha§, então §x=\\pm\\alpha+2k\\pi§. Se §\\operatorname{tg}x=\\operatorname{tg}\\alpha§, basta §x=\\alpha+k\\pi§, pois o período da tangente é π. Em todos os casos, k percorre os inteiros. Cada fórmula traduz uma simetria do círculo: dois pontos com a mesma altura, dois pontos com a mesma abscissa ou dois pontos opostos pela origem. Por isso, uma única solução de referência gera todas as outras.",
          "Quando o argumento é múltiplo, como §2x§, resolva primeiro para o argumento inteiro e só no fim divida. Se o intervalo pedido para x é §[0,2\\pi)§, o argumento §2x§ percorre §[0,4\\pi)§, duas voltas, e por isso aparecem mais soluções. Equações que envolvem quadrados de seno ou cosseno costumam virar equações do segundo grau com uma substituição.",
        ],
        example: { title: "Argumento dobrado em uma volta", prompt: "Resolva §\\operatorname{sen}2x=1/2§ em §[0,2\\pi)§.", steps: ["Com §u=2x§, procure u em §[0,4\\pi)§ com §\\operatorname{sen}u=1/2§.", "Na primeira volta: §u=\\pi/6§ e §u=5\\pi/6§. Na segunda: §13\\pi/6§ e §17\\pi/6§.", "Divida por 2: §x=\\pi/12§, §5\\pi/12§, §13\\pi/12§ e §17\\pi/12§.", "Confira uma delas: §\\operatorname{sen}(2\\cdot5\\pi/12)=\\operatorname{sen}(5\\pi/6)=1/2§."] },
        extraExample: { title: "Uma equação do segundo grau disfarçada", prompt: "Resolva §2\\cos^2x-\\cos x-1=0§ em §[0,2\\pi)§.", steps: ["Com §c=\\cos x§, a equação fica §2c^2-c-1=(2c+1)(c-1)=0§.", "Então §\\cos x=1§, que dá §x=0§, ou §\\cos x=-1/2§, que dá §x=2\\pi/3§ e §x=4\\pi/3§.", "As soluções são §0§, §2\\pi/3§ e §4\\pi/3§."] },
        visual: { kind: "choices", caption: "Cada função tem sua própria forma de solução geral, com k inteiro.", options: [
          { label: "Seno", result: "§x=\\alpha+2k\\pi§ ou §x=\\pi-\\alpha+2k\\pi§", detail: "Pontos com a mesma altura são simétricos em relação ao eixo vertical." },
          { label: "Cosseno", result: "§x=\\pm\\alpha+2k\\pi§", detail: "Pontos com a mesma abscissa são simétricos em relação ao eixo horizontal." },
          { label: "Tangente", result: "§x=\\alpha+k\\pi§", detail: "Pontos opostos pela origem têm a mesma tangente." },
        ] },
      },
      {
        title: "Componha arcos inversos com seno e cosseno",
        paragraphs: [
          "As funções inversas desfazem as diretas apenas dentro dos intervalos principais. Para todo x em §[-1,1]§, §\\operatorname{sen}(\\operatorname{arcsen}x)=x§. Já §\\operatorname{arcsen}(\\operatorname{sen}x)=x§ só vale quando x está em §[-\\pi/2,\\pi/2]§. Fora desse intervalo, o resultado é o ângulo principal que tem o mesmo seno, e não o x original.",
          "Expressões como §\\cos(\\operatorname{arcsen}x)§ se resolvem com um triângulo ou com a identidade fundamental. Chame §\\theta=\\operatorname{arcsen}x§: então §\\operatorname{sen}\\theta=x§ e θ está no intervalo principal, onde o cosseno é não negativo. Logo, §\\cos(\\operatorname{arcsen}x)=\\sqrt{1-x^2}§. Esse tipo de simplificação aparece ao derivar funções inversas e ao fazer substituições trigonométricas em integrais.",
        ],
        example: { title: "Ângulo principal e valor composto", prompt: "Calcule §\\operatorname{arcsen}(\\operatorname{sen}(5\\pi/6))§ e §\\cos(\\operatorname{arcsen}(3/5))§.", steps: ["§\\operatorname{sen}(5\\pi/6)=1/2§, e o ângulo de §[-\\pi/2,\\pi/2]§ com esse seno é §\\pi/6§. A resposta é §\\pi/6§, não §5\\pi/6§.", "Para a segunda, seja §\\theta=\\operatorname{arcsen}(3/5)§, um ângulo do quadrante I.", "§\\cos\\theta=\\sqrt{1-9/25}=4/5§, com sinal positivo pelo intervalo principal."] },
        extraExample: { title: "Arco cosseno e o sinal do seno", prompt: "Calcule §\\operatorname{sen}(\\arccos(-4/5))§.", steps: ["O arco cosseno devolve ângulos de §[0,\\pi]§, onde o seno é não negativo.", "Com §\\cos\\theta=-4/5§, temos §\\operatorname{sen}\\theta=\\sqrt{1-16/25}=3/5§.", "A resposta é §3/5§, embora o cosseno dado seja negativo."] },
      },
      {
        title: "Roda-gigante: um modelo completo",
        paragraphs: [
          "Modelar um movimento circular junta quase tudo desta aula. A altura de uma cadeira em uma roda-gigante é a altura do centro mais a projeção vertical do raio. Se a contagem começa no ponto mais baixo, o cosseno com sinal negativo é a escolha natural, pois §-\\cos0=-1§ dá o mínimo no instante inicial. O período T fixa o coeficiente de t dentro do cosseno, a frequência angular §\\omega=2\\pi/T§.",
          "Com a fórmula pronta, perguntas sobre o tempo viram equações e desigualdades trigonométricas. Resolva para o argumento, que é um ângulo, e só depois converta para o tempo. Interprete a resposta no contexto. Uma fração do período corresponde à mesma fração de volta, o que permite conferir o resultado de forma geométrica.",
        ],
        example: { title: "Quanto tempo a cadeira fica no alto?", prompt: "Uma roda tem raio 20 m, centro a 22 m do chão e dá uma volta a cada 4 min, partindo do ponto mais baixo. Por quanto tempo, em cada volta, a cadeira fica a pelo menos 32 m?", steps: ["O modelo é §h(t)=22-20\\cos(\\pi t/2)§, com t em minutos, pois §2\\pi/4=\\pi/2§.", "A condição §h\\ge32§ equivale a §\\cos(\\pi t/2)\\le-1/2§.", "Na primeira volta, isso ocorre para §2\\pi/3\\le\\pi t/2\\le4\\pi/3§, ou seja, §4/3\\le t\\le8/3§.", "São §4/3§ min, ou 80 s, a cada volta: um terço do período, que corresponde ao arco de 120° no alto da roda."] },
      },
      {
        title: "Por que sen x/x se aproxima de 1",
        paragraphs: [
          "Para x em radianos com §0<x<\\pi/2§, compare três áreas no círculo unitário: o triângulo inscrito de área §\\tfrac12\\operatorname{sen}x§, o setor de área §\\tfrac12x§ e o triângulo maior, tangente ao círculo, de área §\\tfrac12\\operatorname{tg}x§. Como cada figura contém a anterior, §\\operatorname{sen}x<x<\\operatorname{tg}x§. Dividindo por §\\operatorname{sen}x§ e invertendo, obtemos §\\cos x<\\dfrac{\\operatorname{sen}x}{x}<1§.",
          "Quando x se aproxima de zero, §\\cos x§ se aproxima de 1, e a razão fica presa entre dois valores que tendem a 1. Esse é o limite fundamental que o Cálculo usa para mostrar que a derivada do seno é o cosseno. Ele depende do radiano: em graus, a razão tenderia a §\\pi/180§, e as fórmulas de derivada ganhariam esse fator incômodo.",
        ],
        example: { title: "Verifique o aperto numericamente", prompt: "Calcule §\\operatorname{sen}(0{,}1)/0{,}1§ e compare com §\\cos(0{,}1)§.", steps: ["Com a calculadora em radianos, §\\operatorname{sen}(0{,}1)\\approx0{,}0998334§, então a razão é cerca de §0{,}998334§.", "§\\cos(0{,}1)\\approx0{,}995004§, e de fato §0{,}995<0{,}9983<1§.", "Com §x=0{,}01§, a razão já é cerca de §0{,}999983§.", "Em graus, §\\operatorname{sen}(1^\\circ)/1\\approx0{,}01745§, que é próximo de §\\pi/180§, não de 1."] },
        visual: { kind: "cards", caption: "Três regiões encaixadas no círculo unitário, com 0 < x < π/2.", items: [["Triângulo interno", "Área §\\tfrac12\\operatorname{sen}x§"], ["Setor circular", "Área §\\tfrac12x§"], ["Triângulo externo", "Área §\\tfrac12\\operatorname{tg}x§"], ["Conclusão", "§\\cos x<\\dfrac{\\operatorname{sen}x}{x}<1§"]] },
      },
    ],
    checks: [
      { prompt: "Em um círculo de raio 6, calcule o arco e a área do setor de ângulo central §2\\pi/3§.", solution: "O arco é §s=r\\theta=6\\cdot2\\pi/3=4\\pi§. A área é §r^2\\theta/2=36\\cdot(2\\pi/3)/2=12\\pi§. Como §2\\pi/3§ é um terço da volta, a área é um terço de §36\\pi§, o que confirma o valor." },
      { prompt: "Um triângulo tem lados 3, 5 e 7. Encontre o maior ângulo e a área.", solution: "O maior ângulo é oposto ao lado 7: §\\cos C=(9+25-49)/(2\\cdot3\\cdot5)=-15/30=-1/2§, logo §C=120^\\circ§. A área é §\\tfrac12\\cdot3\\cdot5\\cdot\\operatorname{sen}120^\\circ=\\tfrac{15}{2}\\cdot\\tfrac{\\sqrt3}{2}=\\tfrac{15\\sqrt3}{4}§." },
      { prompt: "Em um triângulo, §A=30^\\circ§, §B=45^\\circ§ e §a=8§. Calcule b.", solution: "Pela lei dos senos, §b=a\\operatorname{sen}B/\\operatorname{sen}A=8\\cdot(\\sqrt2/2)/(1/2)=8\\sqrt2\\approx11{,}31§. O lado b é maior que a porque B é maior que A." },
      { prompt: "Se §\\cos x=-1/3§, calcule §\\cos2x§.", solution: "Use a versão que só depende do cosseno: §\\cos2x=2\\cos^2x-1=2\\cdot\\tfrac19-1=-\\tfrac79§. Não é preciso saber o quadrante de x, pois o cosseno aparece ao quadrado." },
      { prompt: "Resolva §\\operatorname{tg}x=-1§ em §[0,2\\pi)§ e escreva a solução geral.", solution: "O ângulo de referência é §\\pi/4§. A tangente é negativa nos quadrantes II e IV, então §x=3\\pi/4§ ou §x=7\\pi/4§. Como o período é π, a solução geral é §x=3\\pi/4+k\\pi§, com k inteiro." },
      { prompt: "Prove que §\\sec x-\\cos x=\\operatorname{sen}x\\operatorname{tg}x§ onde §\\cos x\\ne0§.", solution: "Parta do lado esquerdo: §\\dfrac{1}{\\cos x}-\\cos x=\\dfrac{1-\\cos^2x}{\\cos x}=\\dfrac{\\operatorname{sen}^2x}{\\cos x}§. Separe um fator: §\\operatorname{sen}x\\cdot\\dfrac{\\operatorname{sen}x}{\\cos x}=\\operatorname{sen}x\\operatorname{tg}x§, que é o lado direito." },
    ],
  },
  "geometria-analitica": {
    sections: [
      {
        title: "Vetores no plano: deslocamentos com coordenadas",
        paragraphs: [
          "Um vetor registra um deslocamento: quanto se anda na horizontal e quanto na vertical. O vetor de A até B é §\\overrightarrow{AB}=B-A§, calculado coordenada a coordenada. Seu comprimento, ou norma, é §\\lVert(v_1,v_2)\\rVert=\\sqrt{v_1^2+v_2^2}§, a mesma conta da distância entre os pontos. Vetores com as mesmas componentes são iguais, mesmo que comecem em pontos diferentes.",
          "Somar vetores é encadear deslocamentos, somando componentes. Multiplicar por um número t estica o vetor, e um t negativo inverte o sentido. Com isso, os pontos de um segmento ficam fáceis de descrever: §P=A+t\\,\\overrightarrow{AB}§, com t entre 0 e 1. Em §t=1/2§ você reencontra o ponto médio, e outros valores de t dividem o segmento em qualquer razão.",
        ],
        example: { title: "Divida um segmento em três partes", prompt: "Para §A=(1,2)§ e §B=(7,5)§, calcule §\\overrightarrow{AB}§, seu comprimento e o ponto P com §AP=\\tfrac13AB§ sobre o segmento.", steps: ["§\\overrightarrow{AB}=(7-1,5-2)=(6,3)§.", "O comprimento é §\\sqrt{36+9}=\\sqrt{45}=3\\sqrt5§.", "§P=A+\\tfrac13(6,3)=(1,2)+(2,1)=(3,3)§.", "Confira: §\\overrightarrow{PB}=(4,2)§ é o dobro de §\\overrightarrow{AP}=(2,1)§."] },
      },
      {
        title: "Produto escalar e ângulo entre vetores",
        paragraphs: [
          "O produto escalar de §u=(u_1,u_2)§ e §v=(v_1,v_2)§ é o número §u\\cdot v=u_1v_1+u_2v_2§. Pela lei dos cossenos, ele também vale §\\lVert u\\rVert\\lVert v\\rVert\\cos\\theta§, em que θ é o ângulo entre os vetores. Igualando as duas expressões, você obtém o cosseno do ângulo apenas com coordenadas, sem desenhar nada. Note também que §u\\cdot u=\\lVert u\\rVert^2§: o produto de um vetor por ele mesmo é o quadrado do comprimento, o que liga essa operação à fórmula da distância.",
          "O sinal do produto escalar classifica o ângulo. Se ele é positivo, o ângulo é agudo. Se é negativo, obtuso. Se é zero, os vetores são perpendiculares. Esse teste substitui a regra das inclinações com produto −1 e funciona até com retas verticais. Ele também revela se um triângulo tem ângulo reto, bastando testar os vetores que saem de cada vértice.",
        ],
        example: { title: "Ângulo entre dois vetores", prompt: "Calcule o ângulo entre §u=(1,2)§ e §v=(3,1)§.", steps: ["§u\\cdot v=1\\cdot3+2\\cdot1=5§.", "§\\lVert u\\rVert=\\sqrt5§ e §\\lVert v\\rVert=\\sqrt{10}§.", "§\\cos\\theta=\\dfrac{5}{\\sqrt5\\sqrt{10}}=\\dfrac{5}{\\sqrt{50}}=\\dfrac{\\sqrt2}{2}§.", "O ângulo é 45°."] },
        extraExample: { title: "Teste de ângulo reto em um triângulo", prompt: "O triângulo §A=(1,1)§, §B=(3,2)§, §C=(2,4)§ é retângulo em B?", steps: ["Os vetores que saem de B são §\\overrightarrow{BA}=(-2,-1)§ e §\\overrightarrow{BC}=(-1,2)§.", "§\\overrightarrow{BA}\\cdot\\overrightarrow{BC}=2-2=0§.", "O produto é zero, então o ângulo em B é reto."] },
        visual: { kind: "choices", caption: "O sinal de u · v informa o tipo de ângulo sem calcular θ.", options: [
          { label: "Positivo", result: "ângulo agudo", detail: "Os vetores apontam para o mesmo lado: §\\cos\\theta>0§." },
          { label: "Zero", result: "ângulo reto", detail: "Vetores não nulos e perpendiculares: §\\cos\\theta=0§." },
          { label: "Negativo", result: "ângulo obtuso", detail: "Os vetores apontam para lados opostos: §\\cos\\theta<0§." },
        ] },
      },
      {
        title: "Área de triângulo por determinante",
        paragraphs: [
          "Se dois lados de um triângulo são dados pelos vetores §u=(u_1,u_2)§ e §v=(v_1,v_2)§, a área do paralelogramo que eles formam é §|u_1v_2-u_2v_1|§, o módulo de um determinante 2 por 2. O triângulo é metade desse paralelogramo. Essa fórmula vem de §\\tfrac12\\lVert u\\rVert\\lVert v\\rVert\\operatorname{sen}\\theta§, a área pelo seno, reescrita em coordenadas.",
          "Na prática, escolha um vértice, calcule os vetores até os outros dois e aplique a fórmula. O sinal do determinante, antes do módulo, indica a orientação: positivo quando o percurso de u para v é anti-horário. O módulo garante área positiva. Para polígonos, divida a figura em triângulos a partir de um mesmo vértice e some as áreas.",
        ],
        example: { title: "Área a partir dos vértices", prompt: "Calcule a área do triângulo §A=(1,1)§, §B=(5,2)§, §C=(2,6)§.", steps: ["§u=\\overrightarrow{AB}=(4,1)§ e §v=\\overrightarrow{AC}=(1,5)§.", "§u_1v_2-u_2v_1=4\\cdot5-1\\cdot1=19§.", "A área é §19/2=9{,}5§.", "O sinal positivo indica que o percurso A, B, C é anti-horário."] },
        visual: { kind: "cards", caption: "O mesmo determinante responde a três perguntas.", items: [["Área do paralelogramo", "§|u_1v_2-u_2v_1|§"], ["Área do triângulo", "Metade do valor anterior"], ["Determinante nulo", "Vetores paralelos, pontos alinhados"], ["Sinal", "Positivo no sentido anti-horário"]] },
      },
      {
        title: "Alinhamento de três pontos",
        paragraphs: [
          "Três pontos estão alinhados exatamente quando o triângulo que eles formam é degenerado, com área zero. Pelo critério do determinante, isso significa §u_1v_2-u_2v_1=0§ para os vetores que saem de um dos pontos. Equivalentemente, quando nenhum dos segmentos é vertical, as inclinações de AB e de AC são iguais.",
          "O teste do determinante tem uma vantagem: não divide por nada, então funciona mesmo com pontos na mesma vertical. Ele também permite escrever a equação de uma reta. Um ponto genérico §P=(x,y)§ está na reta AB se §A§, §B§ e §P§ estiverem alinhados. Anular o determinante produz uma equação de primeiro grau em x e y.",
        ],
        example: { title: "Encontre a coordenada que alinha os pontos", prompt: "Para que valor de k os pontos §(1,2)§, §(3,k)§ e §(6,12)§ estão alinhados?", steps: ["Os vetores a partir do primeiro ponto são §(2,k-2)§ e §(5,10)§.", "O determinante é §2\\cdot10-5(k-2)=30-5k§.", "Ele se anula em §k=6§.", "Confira pelas inclinações: §(6-2)/2=2§ e §(12-2)/5=2§."] },
        extraExample: { title: "Equação da reta pelo alinhamento", prompt: "Use o determinante para obter a reta por §A=(1,2)§ e §B=(3,6)§.", steps: ["Para §P=(x,y)§, os vetores são §\\overrightarrow{AB}=(2,4)§ e §\\overrightarrow{AP}=(x-1,y-2)§.", "A condição é §2(y-2)-4(x-1)=0§.", "Simplificando, §2y-4x=0§, ou seja, §y=2x§. Os dois pontos satisfazem a equação."] },
      },
      {
        title: "Mediatriz e lugares geométricos",
        paragraphs: [
          "Um lugar geométrico é o conjunto de pontos que cumprem uma condição. O método é sempre o mesmo: chame o ponto de §(x,y)§, traduza a condição em uma equação com distâncias e simplifique. Elevar distâncias ao quadrado elimina as raízes. As cônicas desta aula nasceram desse modo, e o método serve para condições novas.",
          "A mediatriz de um segmento AB reúne os pontos equidistantes de A e de B. Igualando os quadrados das distâncias, os termos §x^2§ e §y^2§ se cancelam e sobra uma reta. Ela passa pelo ponto médio e é perpendicular ao segmento. As três mediatrizes de um triângulo se encontram no circuncentro, centro da circunferência que passa pelos três vértices.",
        ],
        example: { title: "Mediatriz pela condição de distância", prompt: "Encontre a mediatriz de §A=(1,2)§ e §B=(5,6)§.", steps: ["A condição é §(x-1)^2+(y-2)^2=(x-5)^2+(y-6)^2§.", "Expandindo e cancelando os quadrados: §-2x-4y+5=-10x-12y+61§.", "Logo, §8x+8y=56§, isto é, §x+y=7§.", "Confira: o ponto médio §(3,4)§ satisfaz a equação, e a inclinação −1 é perpendicular à inclinação 1 de AB."] },
        extraExample: { title: "Um lugar geométrico que vira circunferência", prompt: "Descreva os pontos cuja distância a §O=(0,0)§ é o dobro da distância a §Q=(3,0)§.", steps: ["A condição é §x^2+y^2=4[(x-3)^2+y^2]§.", "Expandindo: §3x^2+3y^2-24x+36=0§, ou §x^2+y^2-8x+12=0§.", "Completando o quadrado: §(x-4)^2+y^2=4§, a circunferência de centro §(4,0)§ e raio 2.", "Teste com §(2,0)§: as distâncias são 2 e 1, e a primeira é o dobro da segunda."] },
      },
      {
        title: "Reta e circunferência: secante, tangente ou exterior",
        paragraphs: [
          "Uma reta e uma circunferência podem ter dois pontos comuns, um ou nenhum. O modo mais rápido de decidir é comparar a distância d do centro à reta com o raio r. Se §d<r§, a reta é secante. Se §d=r§, é tangente. Se §d>r§, é exterior. Esse teste usa a fórmula de distância de ponto a reta, já vista nesta aula.",
          "Para obter os pontos de interseção, resolva o sistema. Isole uma variável na equação da reta e substitua na circunferência. Surge uma equação do segundo grau cujo discriminante conta as interseções: positivo, nulo ou negativo. Os dois caminhos devem concordar, e usar um para conferir o outro é um bom hábito.",
        ],
        example: { title: "Interseção de uma reta com uma circunferência", prompt: "Encontre os pontos comuns a §y=x+1§ e §x^2+y^2=25§.", steps: ["Substitua: §x^2+(x+1)^2=25§, ou seja, §2x^2+2x-24=0§.", "Dividindo por 2: §x^2+x-12=(x+4)(x-3)=0§, logo §x=3§ ou §x=-4§.", "Os pontos são §(3,4)§ e §(-4,-3)§.", "Confira pela distância: §d=|0-0+1|/\\sqrt2\\approx0{,}71<5§, a reta é secante."] },
        visual: { kind: "cards", caption: "Compare a distância d do centro à reta com o raio r.", items: [["§d<r§", "Secante: dois pontos comuns"], ["§d=r§", "Tangente: um ponto comum"], ["§d>r§", "Exterior: nenhum ponto comum"], ["Pelo sistema", "Discriminante positivo, nulo ou negativo"]] },
      },
      {
        title: "Retas tangentes a uma circunferência",
        paragraphs: [
          "A reta tangente a uma circunferência em um ponto T é perpendicular ao raio que chega a T. Isso dá uma construção direta. O vetor do centro até T é normal à tangente e fornece os coeficientes da equação na forma geral. Para a circunferência §(x-h)^2+(y-k)^2=r^2§ e o ponto §T=(x_0,y_0)§, a tangente é §(x_0-h)(x-x_0)+(y_0-k)(y-y_0)=0§.",
          "Quando o problema fixa a inclinação em vez do ponto, escreva a família de retas com essa inclinação e imponha distância ao centro igual ao raio. Em geral aparecem duas soluções, uma de cada lado. No Cálculo, a inclinação da tangente será obtida por derivadas. Esta construção geométrica servirá para conferir aqueles resultados.",
        ],
        example: { title: "Tangente em um ponto dado", prompt: "Encontre a tangente a §(x-1)^2+(y-2)^2=25§ no ponto §(4,6)§.", steps: ["Confira que o ponto está na curva: §9+16=25§.", "O raio até o ponto é §(4-1,6-2)=(3,4)§, normal à tangente.", "A tangente é §3(x-4)+4(y-6)=0§, isto é, §3x+4y=36§.", "Confira: a distância do centro é §|3+8-36|/5=5§, igual ao raio."] },
        extraExample: { title: "Tangentes com inclinação fixa", prompt: "Encontre as retas de inclinação 2 tangentes a §x^2+y^2=5§.", steps: ["As retas são §y=2x+b§, ou §2x-y+b=0§.", "A distância da origem é §|b|/\\sqrt5§, que deve valer §\\sqrt5§.", "Logo §|b|=5§, e as tangentes são §y=2x+5§ e §y=2x-5§."] },
      },
      {
        title: "Posição relativa de duas circunferências",
        paragraphs: [
          "Para duas circunferências de raios §r_1§ e §r_2§, com centros a distância D, compare D com a soma e com a diferença dos raios. Se §D>r_1+r_2§, elas são exteriores. Se §D=r_1+r_2§, tangentes por fora. Se §|r_1-r_2|<D<r_1+r_2§, secantes. Se §D=|r_1-r_2|§, com §D>0§, tangentes por dentro. Se D é menor que isso, uma fica dentro da outra sem tocá-la.",
          "Quando são secantes, subtraia as duas equações. Os termos §x^2§ e §y^2§ se cancelam e resta a equação de uma reta, que passa pelos dois pontos de interseção. Resolver essa reta junto com uma das circunferências dá os pontos. Esse truque transforma um sistema com dois quadrados em um sistema com reta e circunferência.",
        ],
        example: { title: "Tangência externa e ponto de contato", prompt: "Classifique §x^2+y^2=9§ e §(x-4)^2+(y-3)^2=4§ e encontre o ponto comum.", steps: ["Os centros são §(0,0)§ e §(4,3)§, a distância §D=5§. Os raios são 3 e 2.", "Como §D=3+2§, elas são tangentes por fora.", "O ponto de contato fica sobre o segmento dos centros, a 3 unidades da origem: §\\tfrac35(4,3)=(12/5,9/5)§.", "Confira na segunda: §(12/5-4)^2+(9/5-3)^2=64/25+36/25=4§."] },
        extraExample: { title: "Pontos comuns de duas secantes", prompt: "Encontre os pontos comuns a §x^2+y^2=25§ e §(x-6)^2+y^2=13§.", steps: ["Subtraia: §x^2-(x-6)^2=12§, isto é, §12x-36=12§, logo §x=4§.", "Na primeira: §16+y^2=25§, então §y=\\pm3§.", "Os pontos são §(4,3)§ e §(4,-3)§. Na segunda: §(-2)^2+9=13§, como esperado."] },
        visual: { kind: "choices", caption: "A distância D entre os centros decide a posição, para raios r₁ e r₂.", options: [
          { label: "D maior que a soma", result: "exteriores", detail: "Nenhum ponto comum, uma fora da outra." },
          { label: "D igual à soma", result: "tangentes por fora", detail: "Um ponto comum, no segmento dos centros." },
          { label: "Entre diferença e soma", result: "secantes", detail: "Dois pontos comuns, sobre a reta obtida pela subtração." },
          { label: "D igual à diferença", result: "tangentes por dentro", detail: "Um ponto comum, com a menor dentro da maior." },
        ] },
      },
      {
        title: "Excentricidade: uma medida comum às cônicas",
        paragraphs: [
          "A excentricidade mede o quanto uma cônica se afasta da forma circular. Na elipse e na hipérbole, ela vale §e=c/a§, a distância do centro ao foco dividida pelo semieixo que contém os focos. Na elipse, §c<a§, então §0<e<1§. Na hipérbole, §c>a§, então §e>1§. A circunferência é o caso §e=0§, com os focos no centro.",
          "Há também uma definição única para as três cônicas: os pontos cuja distância a um foco é e vezes a distância a uma diretriz. Com §e=1§, recuperamos a parábola. Quanto mais perto de zero, mais redonda é a elipse. A órbita da Terra tem excentricidade cerca de §0{,}017§, quase circular, e a do cometa Halley, cerca de §0{,}97§, muito alongada.",
        ],
        example: { title: "Compare uma elipse e uma hipérbole", prompt: "Calcule a excentricidade de §x^2/25+y^2/16=1§ e de §x^2/16-y^2/9=1§.", steps: ["Na elipse, §c=\\sqrt{25-16}=3§ e §a=5§, logo §e=3/5§.", "Na hipérbole, §c=\\sqrt{16+9}=5§ e §a=4§, logo §e=5/4§.", "A primeira é menor que 1 e a segunda é maior, como previsto pelo tipo de cada curva."] },
        visual: { kind: "cards", caption: "A excentricidade separa as cônicas em faixas.", items: [["Circunferência", "§e=0§"], ["Elipse", "§0<e<1§"], ["Parábola", "§e=1§"], ["Hipérbole", "§e>1§"]] },
      },
      {
        title: "Refletores, órbitas e navegação",
        paragraphs: [
          "A parábola tem uma propriedade de reflexão: raios paralelos ao eixo que batem na curva são refletidos para o foco. Por isso antenas parabólicas concentram o sinal no receptor colocado no foco, e faróis fazem o caminho inverso, com a lâmpada no foco gerando um feixe paralelo. Para projetar uma antena, basta saber o diâmetro e a profundidade e calcular p.",
          "Na elipse, um raio que sai de um foco é refletido para o outro, o que explica salas de sussurro e um tratamento médico que quebra cálculos renais com ondas de choque. Planetas descrevem elipses com o Sol em um foco. A menor distância ao Sol é §a-c§ e a maior é §a+c§. A hipérbole aparece em sistemas de localização baseados em diferenças de tempo entre sinais.",
        ],
        example: { title: "Onde colocar o receptor?", prompt: "Uma antena parabólica tem 120 cm de diâmetro e 15 cm de profundidade. A que distância do vértice fica o foco?", steps: ["Coloque o vértice na origem e use §x^2=4py§.", "A borda da antena é o ponto §(60,15)§.", "Substituindo: §3600=60p§, logo §p=60§.", "O receptor fica 60 cm acima do vértice, sobre o eixo."] },
        extraExample: { title: "Distâncias extremas em uma órbita", prompt: "Uma órbita elíptica tem semieixo maior §a=5§ e excentricidade §e=0{,}6§. Calcule as distâncias mínima e máxima ao foco e o semieixo menor.", steps: ["§c=ae=3§.", "A distância mínima é §a-c=2§ e a máxima é §a+c=8§.", "O semieixo menor é §b=\\sqrt{a^2-c^2}=\\sqrt{16}=4§."] },
      },
    ],
    checks: [
      { prompt: "Calcule o ângulo entre §u=(2,0)§ e §v=(1,\\sqrt3)§.", solution: "§u\\cdot v=2§, §\\lVert u\\rVert=2§ e §\\lVert v\\rVert=\\sqrt{1+3}=2§. Então §\\cos\\theta=2/4=1/2§ e o ângulo é 60°." },
      { prompt: "Calcule a área do triângulo de vértices §(0,0)§, §(4,0)§ e §(1,3)§.", solution: "Os vetores a partir da origem são §(4,0)§ e §(1,3)§. O determinante é §4\\cdot3-0\\cdot1=12§, e a área é §12/2=6§. Confira com base e altura: base 4 no eixo x e altura 3 dão §4\\cdot3/2=6§." },
      { prompt: "Os pontos §(-1,3)§, §(1,1)§ e §(4,-2)§ estão alinhados?", solution: "Os vetores a partir do primeiro ponto são §(2,-2)§ e §(5,-5)§. O determinante é §2(-5)-(-2)(5)=-10+10=0§, logo os pontos estão alinhados, todos sobre a reta §y=-x+2§." },
      { prompt: "Encontre a mediatriz do segmento de §(-2,0)§ a §(4,2)§.", solution: "O ponto médio é §(1,1)§ e a inclinação do segmento é §2/6=1/3§. A mediatriz tem inclinação −3 e passa por §(1,1)§: §y-1=-3(x-1)§, ou §y=-3x+4§. Igualando os quadrados das distâncias, chega-se à mesma reta §3x+y=4§." },
      { prompt: "Qual é a posição da reta §x+y=4§ em relação à circunferência §x^2+y^2=8§?", solution: "A distância do centro à reta é §|0+0-4|/\\sqrt2=4/\\sqrt2=2\\sqrt2§, igual ao raio §\\sqrt8=2\\sqrt2§. A reta é tangente. Substituindo §y=4-x§: §2x^2-8x+8=0§, ou §(x-2)^2=0§, e o ponto de tangência é §(2,2)§." },
      { prompt: "Encontre a tangente a §x^2+y^2=10§ no ponto §(1,3)§ e a excentricidade de §x^2/9+y^2/5=1§.", solution: "O raio até o ponto é §(1,3)§, normal à tangente: §1(x-1)+3(y-3)=0§, ou §x+3y=10§. Na elipse, §c=\\sqrt{9-5}=2§ e §a=3§, então §e=2/3§." },
    ],
  },
  "sequencias-e-progressoes": {
    sections: [
      {
        title: "Propriedades do somatório e somas notáveis",
        paragraphs: [
          "O somatório é linear: §\\sum(a_k+b_k)=\\sum a_k+\\sum b_k§ e §\\sum c\\,a_k=c\\sum a_k§. Com isso, somas de polinômios em k se reduzem a três resultados clássicos: §\\sum_{k=1}^n k=\\frac{n(n+1)}{2}§, §\\sum_{k=1}^n k^2=\\frac{n(n+1)(2n+1)}{6}§ e §\\sum_{k=1}^n k^3=\\left(\\frac{n(n+1)}{2}\\right)^2§. O primeiro é a soma de uma PA. Os outros dois não vêm de progressões, mas podem ser deduzidos com somas telescópicas e confirmados por indução, como você verá adiante. Teste sempre com um n pequeno: para §n=3§, §1+4+9=14§ e a fórmula dá §3\\cdot4\\cdot7/6=14§.",
          "Quando o índice não começa em 1, subtraia a parte que falta: §\\sum_{k=m}^n=\\sum_{k=1}^n-\\sum_{k=1}^{m-1}§. Outra opção é trocar o índice, por exemplo §j=k-m+1§, para que a contagem comece em 1. Atenção: o somatório de um produto não é o produto dos somatórios, e o de um quadrado não é o quadrado do somatório.",
        ],
        example: { title: "Some um polinômio quadrático", prompt: "Calcule §\\sum_{k=1}^{10}(3k^2-2k+1)§.", steps: ["Separe: §3\\sum k^2-2\\sum k+\\sum1§.", "Com §n=10§: §\\sum k^2=\\frac{10\\cdot11\\cdot21}{6}=385§ e §\\sum k=55§. A soma de dez parcelas iguais a 1 vale 10.", "O total é §3\\cdot385-2\\cdot55+10=1155-110+10=1055§."] },
        extraExample: { title: "Índice que não começa em 1", prompt: "Calcule §\\sum_{k=5}^{12}k§.", steps: ["§\\sum_{k=1}^{12}k=\\frac{12\\cdot13}{2}=78§.", "Retire os quatro primeiros: §\\sum_{k=1}^{4}k=10§.", "O resultado é §78-10=68§. Confira como PA: 8 parcelas de 5 a 12, §8\\cdot17/2=68§."] },
        visual: { kind: "cards", caption: "Fórmulas fechadas para somas de potências de k, de 1 até n.", items: [["§\\sum1§", "§n§"], ["§\\sum k§", "§\\frac{n(n+1)}{2}§"], ["§\\sum k^2§", "§\\frac{n(n+1)(2n+1)}{6}§"], ["§\\sum k^3§", "§\\left(\\frac{n(n+1)}{2}\\right)^2§"]] },
      },
      {
        title: "Somas telescópicas",
        paragraphs: [
          "Se cada parcela é uma diferença de termos vizinhos, §u_k=b_{k+1}-b_k§, a soma desmorona como um telescópio fechando: §\\sum_{k=1}^n(b_{k+1}-b_k)=b_{n+1}-b_1§. Todos os termos intermediários aparecem uma vez com sinal positivo e uma vez com sinal negativo. Escrever as três primeiras e a última parcela por extenso deixa o cancelamento visível.",
          "O desafio é reconhecer a diferença escondida. Frações como §\\frac{1}{k(k+1)}§ se separam em §\\frac1k-\\frac{1}{k+1}§. Diferenças de raízes, como §\\sqrt{k+1}-\\sqrt k§, já estão prontas. A mesma ideia permite deduzir a fórmula de §\\sum k^2§ e é o coração do teorema fundamental do Cálculo, em que uma soma de variações é igual à variação total.",
        ],
        example: { title: "Uma soma de frações que encolhe", prompt: "Calcule §\\sum_{k=1}^{99}\\dfrac{1}{k(k+1)}§.", steps: ["Separe: §\\dfrac{1}{k(k+1)}=\\dfrac1k-\\dfrac{1}{k+1}§.", "A soma fica §(1-\\tfrac12)+(\\tfrac12-\\tfrac13)+\\cdots+(\\tfrac{1}{99}-\\tfrac{1}{100})§.", "Sobram o primeiro e o último termo: §1-\\tfrac{1}{100}=\\tfrac{99}{100}§.", "Para n parcelas, o resultado é §1-\\frac{1}{n+1}§, que tende a 1."] },
        extraExample: { title: "De onde vem a fórmula de Σk²", prompt: "Use §(k+1)^3-k^3=3k^2+3k+1§ para deduzir §\\sum_{k=1}^n k^2§.", steps: ["Somando de 1 a n, o lado esquerdo telescopa e dá §(n+1)^3-1§.", "O direito dá §3S+3\\cdot\\frac{n(n+1)}{2}+n§, em que S é a soma procurada.", "Como §(n+1)^3-1-n=n(n+1)(n+2)§, temos §3S=n(n+1)(n+2)-\\frac{3n(n+1)}{2}=\\frac{n(n+1)(2n+1)}{2}§.", "Logo §S=\\frac{n(n+1)(2n+1)}{6}§."] },
      },
      {
        title: "Indução matemática: a ideia do dominó",
        paragraphs: [
          "Para provar que uma afirmação §P(n)§ vale para todo inteiro §n\\ge1§, a indução usa duas etapas. A base verifica §P(1)§. O passo indutivo mostra que, se §P(n)§ vale para um n qualquer, então §P(n+1)§ também vale. Como em uma fila de dominós, o primeiro cai e cada um derruba o seguinte, então todos caem.",
          "No passo indutivo, a hipótese §P(n)§ é usada como ferramenta, não como algo a provar. Escreva o que você tem, escreva o que quer obter para §n+1§ e procure a ligação, que costuma ser acrescentar uma parcela ou multiplicar por um fator. Conferir alguns casos numéricos não é prova, mas é uma boa forma de descobrir a fórmula antes de demonstrá-la.",
        ],
        example: { title: "A soma dos ímpares é um quadrado", prompt: "Prove que §1+3+5+\\cdots+(2n-1)=n^2§ para todo §n\\ge1§.", steps: ["Base: para §n=1§, o lado esquerdo é 1 e o direito é §1^2=1§.", "Hipótese: suponha que a soma dos n primeiros ímpares vale §n^2§.", "A soma dos §n+1§ primeiros acrescenta o ímpar §2(n+1)-1=2n+1§.", "Pela hipótese, ela vale §n^2+2n+1=(n+1)^2§. A afirmação passa de n para §n+1§."] },
        extraExample: { title: "Indução com divisibilidade", prompt: "Prove que §4^n-1§ é múltiplo de 3 para todo §n\\ge1§.", steps: ["Base: §4^1-1=3§.", "Passo: §4^{n+1}-1=4\\cdot4^n-4+3=4(4^n-1)+3§.", "Pela hipótese, §4^n-1§ é múltiplo de 3, e 3 também é. A soma é múltiplo de 3."] },
      },
      {
        title: "Recorrências lineares e Fibonacci",
        paragraphs: [
          "Uma recorrência do tipo §a_{n+1}=qa_n+c§ mistura PG e PA. Ela aparece em doses de remédio, em populações com retirada fixa e em financiamentos. O truque é procurar o equilíbrio L, que satisfaz §L=qL+c§, ou seja, §L=c/(1-q)§ quando §q\\ne1§. A diferença §a_n-L§ é multiplicada por q a cada passo, logo forma uma PG. Daí sai uma fórmula explícita.",
          "A sequência de Fibonacci, com §F_1=F_2=1§ e §F_{n+1}=F_n+F_{n-1}§, depende dos dois termos anteriores. Ela cresce quase como uma PG: as razões §F_{n+1}/F_n§ se aproximam do número de ouro §\\varphi=(1+\\sqrt5)/2\\approx1{,}618§. Também satisfaz identidades curiosas, como §F_1+F_2+\\cdots+F_n=F_{n+2}-1§, que podem ser provadas por indução. Para recorrências de segunda ordem, você precisa de dois valores iniciais: mudar §F_2§ muda todos os termos seguintes, embora as razões continuem tendendo a φ.",
        ],
        example: { title: "Quantidade de remédio no organismo", prompt: "A cada dia, o corpo elimina 20% do remédio presente e uma dose de 10 mg é tomada. Com §a_1=10§ e §a_{n+1}=0{,}8a_n+10§, encontre a fórmula explícita.", steps: ["O equilíbrio satisfaz §L=0{,}8L+10§, logo §L=50§ mg.", "A diferença §a_n-50§ começa em §-40§ e é multiplicada por §0{,}8§ a cada dia.", "Assim, §a_n=50-40\\cdot0{,}8^{\\,n-1}§.", "Confira: §a_2=0{,}8\\cdot10+10=18§, e a fórmula dá §50-32=18§. A quantidade se aproxima de 50 mg."] },
        extraExample: { title: "Razões de Fibonacci", prompt: "Liste os oito primeiros termos de Fibonacci e compare as últimas razões com φ.", steps: ["Os termos são 1, 1, 2, 3, 5, 8, 13 e 21.", "§13/8=1{,}625§ e §21/13\\approx1{,}615§, valores que se alternam em torno de §\\varphi\\approx1{,}618§.", "A soma dos seis primeiros é §1+1+2+3+5+8=20=F_8-1§."] },
      },
      {
        title: "Juros compostos como progressão geométrica",
        paragraphs: [
          "Com taxa i por período, cada saldo é o anterior multiplicado por §1+i§. Os montantes formam uma PG de razão §1+i§, e após n períodos o capital C vira §M=C(1+i)^n§. Nos juros simples, ao contrário, soma-se sempre o mesmo valor §Ci§, e os montantes formam uma PA. Por isso a diferença entre os regimes cresce com o tempo.",
          "Para descobrir em quantos períodos um capital atinge certo valor, resolva §(1+i)^n=M/C§ com logaritmos: §n=\\log(M/C)/\\log(1+i)§. Como n conta períodos inteiros, arredonde para cima se o valor exato não for inteiro. A taxa e o número de períodos precisam estar na mesma unidade de tempo, como mês com mês.",
        ],
        example: { title: "Um ano de juros mensais", prompt: "Aplique R$ 1.000 a 2% ao mês por 12 meses. Compare juros compostos e simples e descubra quando o capital dobra.", steps: ["Compostos: §1000\\cdot1{,}02^{12}\\approx1268{,}24§ reais.", "Simples: §1000+12\\cdot20=1240§ reais. A PG supera a PA em cerca de R$ 28.", "Para dobrar: §n=\\log2/\\log1{,}02\\approx35{,}003§.", "Com 35 meses o fator é §1{,}02^{35}\\approx1{,}9999§, quase lá. São necessários 36 meses."] },
        visual: { kind: "choices", caption: "O mesmo capital de R$ 1.000 a 2% ao mês, após 12 meses.", options: [
          { label: "Juros simples", result: "§M=1240§", detail: "PA de razão 20: os juros incidem só sobre o capital inicial." },
          { label: "Juros compostos", result: "§M\\approx1268{,}24§", detail: "PG de razão §1{,}02§: os juros incidem sobre o saldo acumulado." },
        ] },
      },
      {
        title: "Anuidades: depósitos que formam uma PG",
        paragraphs: [
          "Se você deposita P ao fim de cada período, com taxa i, o primeiro depósito rende por §n-1§ períodos, o segundo por §n-2§ e o último não rende. O saldo final é §P+P(1+i)+\\cdots+P(1+i)^{n-1}§, a soma de uma PG de razão §1+i§. Pela fórmula da soma, o valor futuro é §VF=P\\,\\dfrac{(1+i)^n-1}{i}§.",
          "Um financiamento é o caminho inverso. As n parcelas iguais, trazidas ao valor de hoje, devem somar o valor emprestado. Isso dá outra PG, agora de razão §1/(1+i)§, e a fórmula §VP=P\\,\\dfrac{1-(1+i)^{-n}}{i}§. Isolando P, você obtém o valor da prestação. Os sistemas de financiamento com parcelas fixas usam exatamente essa conta.",
        ],
        example: { title: "Poupança com depósitos mensais", prompt: "Você deposita R$ 200 ao fim de cada mês durante 12 meses, a 1% ao mês. Quanto terá?", steps: ["É a soma de uma PG com primeiro termo 200, razão §1{,}01§ e 12 termos.", "§VF=200\\cdot\\dfrac{1{,}01^{12}-1}{0{,}01}\\approx200\\cdot12{,}6825§.", "O saldo é cerca de R$ 2.536,50, dos quais R$ 2.400 foram depositados e cerca de R$ 136,50 são juros."] },
        extraExample: { title: "Valor da prestação", prompt: "Um empréstimo de R$ 5.000 será pago em 10 parcelas mensais iguais a 2% ao mês. Qual é a parcela?", steps: ["§1{,}02^{-10}\\approx0{,}82035§, então §1-1{,}02^{-10}\\approx0{,}17965§.", "§P=\\dfrac{5000\\cdot0{,}02}{0{,}17965}\\approx556{,}63§ reais.", "O total pago é cerca de R$ 5.566,30, e a diferença para 5.000 corresponde aos juros."] },
      },
      {
        title: "Sequências monótonas, limitadas e convergentes",
        paragraphs: [
          "Uma sequência é crescente se §a_{n+1}\\ge a_n§ para todo n, e decrescente se §a_{n+1}\\le a_n§. Ela é limitada se existe um número M com §|a_n|\\le M§ para todo n. Dizemos que §a_n§ converge para L quando, para qualquer tolerância positiva, os termos acabam ficando a menos dessa tolerância de L a partir de certa posição. Essa é a primeira forma da ideia de limite.",
          "Um resultado central garante que toda sequência monótona e limitada converge. Mas cada propriedade sozinha não basta: §(-1)^n§ é limitada e oscila sem convergir, e §n^2§ é crescente e ilimitada. Para estudar uma sequência, reescreva o termo geral de forma que a tendência apareça, por exemplo separando uma constante de uma fração que encolhe.",
        ],
        example: { title: "A partir de que termo a tolerância é cumprida?", prompt: "Mostre que §a_n=\\dfrac{n}{n+1}§ converge para 1 e encontre a partir de que n temos §|a_n-1|<0{,}01§.", steps: ["Reescreva: §a_n=1-\\dfrac{1}{n+1}§. A sequência é crescente e limitada por 1.", "A distância até 1 é §\\dfrac{1}{n+1}§, que encolhe para zero.", "A condição §\\dfrac{1}{n+1}<0{,}01§ equivale a §n+1>100§.", "A partir de §n=100§, todos os termos estão a menos de §0{,}01§ do limite."] },
        visual: { kind: "cards", caption: "Quatro comportamentos típicos de sequências.", items: [["§\\frac{n}{n+1}§", "Crescente, limitada, converge para 1"], ["§(-1)^n§", "Limitada, oscila, não converge"], ["§n^2§", "Crescente e ilimitada"], ["§(-\\frac12)^n§", "Não monótona, converge para 0"]] },
      },
      {
        title: "Somas notáveis e a área sob uma parábola",
        paragraphs: [
          "As somas desta aula aparecem no início do cálculo integral. Para estimar a área sob §y=x^2§ entre 0 e 1, divida o intervalo em n faixas de largura §1/n§ e use retângulos com altura no extremo direito de cada faixa. A k-ésima altura é §(k/n)^2§, e a soma das áreas é §S_n=\\sum_{k=1}^n\\frac{k^2}{n^2}\\cdot\\frac1n=\\frac{1}{n^3}\\sum_{k=1}^n k^2§.",
          "Com a fórmula de §\\sum k^2§, obtemos §S_n=\\frac{(n+1)(2n+1)}{6n^2}§. Agora a pergunta vira um limite de sequência. Quando n cresce, o numerador se comporta como §2n^2§, e §S_n§ se aproxima de §2n^2/6n^2=1/3§. Essa é a área exata, que o Cálculo vai confirmar com a integral §\\int_0^1x^2\\,dx=\\frac13§.",
        ],
        example: { title: "Dez retângulos e o limite", prompt: "Calcule §S_{10}§ e o limite de §S_n§.", steps: ["§S_{10}=\\dfrac{11\\cdot21}{6\\cdot100}=\\dfrac{231}{600}=0{,}385§.", "Os retângulos pelo extremo direito sobram acima da curva, por isso §0{,}385>1/3§.", "Escreva §S_n=\\dfrac{1}{6}\\left(1+\\dfrac1n\\right)\\left(2+\\dfrac1n\\right)§.", "Quando n cresce, as frações §1/n§ tendem a zero e §S_n§ tende a §\\frac16\\cdot1\\cdot2=\\frac13§."] },
      },
    ],
    checks: [
      { prompt: "Calcule §\\sum_{k=1}^{20}(2k+3)§.", solution: "Pela linearidade, §2\\sum k+\\sum3=2\\cdot\\frac{20\\cdot21}{2}+20\\cdot3=420+60=480§. Como PA: os termos vão de 5 a 43, e §20\\cdot(5+43)/2=480§." },
      { prompt: "Calcule §\\sum_{k=1}^{99}(\\sqrt{k+1}-\\sqrt k)§.", solution: "A soma é telescópica. Os termos intermediários se cancelam e resta §\\sqrt{100}-\\sqrt1=10-1=9§." },
      { prompt: "Prove por indução que §1+2+4+\\cdots+2^{n-1}=2^n-1§ para §n\\ge1§.", solution: "Base: para §n=1§, os dois lados valem 1. Passo: supondo a fórmula para n, a soma até §2^n§ vale §(2^n-1)+2^n=2\\cdot2^n-1=2^{n+1}-1§, que é a fórmula para §n+1§." },
      { prompt: "Para §a_1=2§ e §a_{n+1}=0{,}5a_n+4§, encontre o equilíbrio, a fórmula explícita e §a_4§.", solution: "O equilíbrio satisfaz §L=0{,}5L+4§, logo §L=8§. A diferença §a_n-8§ começa em −6 e é multiplicada por §0{,}5§, então §a_n=8-6\\cdot0{,}5^{\\,n-1}§. Assim, §a_4=8-6/8=7{,}25§. Pela recorrência: 2, 5, §6{,}5§, §7{,}25§." },
      { prompt: "Quanto rende R$ 5.000 aplicados a 1% ao mês por 24 meses, em juros compostos?", solution: "Os saldos formam uma PG de razão §1{,}01§. O montante é §5000\\cdot1{,}01^{24}\\approx6348{,}67§ reais, ou seja, cerca de R$ 1.348,67 de juros. Em juros simples, seriam exatamente R$ 1.200." },
      { prompt: "A sequência §a_n=\\dfrac{2n+1}{n+3}§ é monótona? Ela converge?", solution: "Reescreva: §a_n=2-\\dfrac{5}{n+3}§. Como §5/(n+3)§ diminui quando n cresce, a sequência é crescente. Ela é limitada por 2, e a fração tende a zero, então §a_n§ converge para 2. O primeiro termo é §3/4§." },
    ],
  },
};
