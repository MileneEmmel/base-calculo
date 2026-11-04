import type { StudyLesson } from "./studyBasics";

export default {
  intro: "Uma integral pode medir uma área, um volume, a distância percorrida ou a quantidade que entrou em um sistema. Você vai partir de uma fatia pequena, escrever sua contribuição com as unidades corretas e somar todas as fatias do intervalo.",
  visual: { kind: "cards", caption: "Desenhe uma fatia antes de escolher o integrando.", items: [
    ["Área entre curvas","§A=\\int_a^b(\\text{superior}-\\text{inferior})\\,dx§"],
    ["Volume por seções","§V=\\int_a^b A(x)\\,dx§"],
    ["Arruelas","§A(x)=\\pi[R(x)^2-r(x)^2]§"],
    ["Acumulação","§Q(b)=Q(a)+\\int_a^b Q'(t)\\,dt§"],
  ] },
  sections: [
    {
      title: "Meça a altura de uma fatia vertical",
      paragraphs: [
        "Para calcular a área entre duas curvas, escolha fatias verticais quando cada x tem uma fronteira superior e uma inferior fáceis de descrever. A altura é a diferença entre as saídas e a largura é §dx§.",
        "Encontre as interseções resolvendo a igualdade das curvas. Teste um ponto interno para decidir qual fica acima. Uma área geométrica tem integrando não negativo no intervalo escolhido.",
        "As interseções não bastam para escolher uma área quando o enunciado especifica outras fronteiras, como retas verticais. Esboce o contorno fechado e use os valores de x realmente percorridos pela região. Depois, em uma fatia interna, marque as duas alturas no mesmo x. Essa comparação evita subtrair entradas de alturas ou trocar as curvas por suas inversas no meio do cálculo.",
      ],
      example: {
        title: "Uma reta acima da parábola",
        prompt: "Encontre a área entre §y=x§ e §y=x^2§.",
        steps: [
          "A igualdade §x=x^2§ dá 0 e 1. Entre esses pontos, x é maior que §x^2§.",
          "A área é §\\int_0^1(x-x^2)\\,dx=[x^2/2-x^3/3]_0^1§.",
          "O resultado é §1/6§ unidade de área.",
        ],
      },
      visual: { kind: "calc-graph", model: "between", caption: "Desloque a ponta da faixa sombreada para ver a área parcial crescer até a interseção." },
    },
    {
      title: "Divida a região quando as curvas trocam de ordem",
      paragraphs: [
        "Se as curvas se cruzam dentro do intervalo, a fronteira superior pode mudar. Separe o cálculo nas interseções, determine a ordem em cada trecho e some as áreas. É a mesma ideia de integrar o módulo da diferença.",
        "Uma única integral da diferença pode cancelar partes e medir apenas uma área orientada. O enunciado é que define se você quer o saldo ou a soma de todas as regiões.",
      ],
      example: {
        title: "Duas regiões em lados opostos",
        prompt: "Encontre a área entre §y=x§ e §y=x^3§ em §[-1,1]§.",
        steps: [
          "As curvas se cruzam em −1, 0 e 1. Entre −1 e 0, §x^3>x§. Entre 0 e 1, §x>x^3§.",
          "Por simetria, as áreas são iguais. Calcule §2\\int_0^1(x-x^3)\\,dx§.",
          "O resultado é §2(1/2-1/4)=1/2§. A integral de §x-x^3§ no intervalo inteiro daria zero.",
        ],
      },
    },
    {
      title: "Escolha fatias horizontais quando elas simplificarem o contorno",
      paragraphs: [
        "Ao integrar em y, a largura da fatia é a coordenada da direita menos a da esquerda. Você precisa escrever as curvas como expressões para x em função de y, escolhendo o ramo que faz parte da região.",
        "O intervalo de integração passa a usar alturas. Se uma fatia corta duas regiões separadas, some os comprimentos adequados ou divida o intervalo. Compare as duas direções antes de decidir.",
        "Para comparar as duas direções, imagine um segmento deslizando pela região. Se a identidade da fronteira muda no meio do percurso, você precisará de mais de uma integral naquela direção. No caso de uma parábola deitada, a fatia horizontal costuma usar a própria equação da parábola, enquanto uma vertical exige isolar y e usar dois ramos que precisam ser identificados separadamente.",
      ],
      example: {
        title: "Uma parábola vista de lado",
        prompt: "Encontre a área delimitada por §x=y^2§ e §x=4§ usando y.",
        steps: [
          "As interseções têm §y=-2§ e §y=2§.",
          "O lado direito é 4 e o esquerdo é §y^2§. Integre §\\int_{-2}^2(4-y^2)\\,dy§.",
          "A primitiva §4y-y^3/3§ dá área §32/3§.",
        ],
      },
      extraExample: {
        title: "Confira mudando a direção das fatias",
        prompt: "Calcule a mesma área usando x.",
        steps: [
          "Agora §0\\le x\\le4§. O teto é §y=\\sqrt{x}§ e o piso é §y=-\\sqrt{x}§.",
          "A altura é §2\\sqrt{x}§ e sua primitiva é §4x^{3/2}/3§.",
          "A diferença entre 4 e 0 volta a dar §32/3§.",
        ],
      },
    },
    {
      title: "Some volumes por áreas de seções",
      paragraphs: [
        "Um sólido pode ser cortado por planos perpendiculares a um eixo. Se a seção na posição x tem área §A(x)§, a fatia fina tem volume aproximado §A(x)\\Delta x§.",
        "A integral soma essas fatias no limite. Use a área da forma transversal, que pode ser um quadrado, um círculo ou um triângulo. A unidade é área vezes comprimento.",
        "Ao ler um problema de seções, diferencie a região desenhada no plano da forma de cada corte. No exemplo, o triângulo da base serve para descobrir o lado do quadrado. A área que entra na integral é a do quadrado perpendicular, não a do triângulo da base. Se o corte fosse um semicírculo com o mesmo diâmetro, o integrando seria §\\pi(2-x)^2/8§.",
      ],
      example: {
        title: "Seções quadradas sobre uma base triangular",
        prompt: "A base é limitada por §y=0§, §y=2-x§ e §x=0§. As seções perpendiculares ao eixo x são quadrados. Encontre o volume.",
        steps: [
          "Em §0\\le x\\le2§, o lado do quadrado é a distância vertical §2-x§.",
          "Logo, a seção tem área §A(x)=(2-x)^2§.",
          "A integral §\\int_0^2(2-x)^2\\,dx§ vale §8/3§ unidades cúbicas.",
        ],
      },
    },
    {
      title: "Use discos quando a região toca o eixo de rotação",
      paragraphs: [
        "Ao girar uma fatia perpendicular ao eixo de rotação, se o segmento começa no eixo, a seção é um disco. Seu raio é a distância da outra ponta da fatia até o eixo.",
        "A área do disco é §\\pi R^2§. Se você integrou uma área de seção em x, o eixo de rotação deve ser paralelo ao eixo x para usar esse formato de fatia. Para um eixo vertical, discos usam alturas y.",
      ],
      example: {
        title: "Um cone criado por uma reta",
        prompt: "Gire a região entre §y=x§ e o eixo x, para §0\\le x\\le3§, em torno do eixo x.",
        steps: [
          "A seção em x tem raio x e área §\\pi x^2§.",
          "O volume é §\\pi\\int_0^3 x^2\\,dx=9\\pi§.",
          "O resultado coincide com a fórmula do cone de altura 3 e raio 3, §\\pi(3^2)(3)/3§.",
        ],
      },
    },
    {
      title: "Use arruelas quando houver um furo",
      paragraphs: [
        "Se uma fatia não toca o eixo, sua rotação deixa um círculo vazio no meio. O raio externo é a maior distância até o eixo, e o interno é a menor. Se a fatia cruzar o eixo, o raio interno passa a ser zero.",
        "Desenhe a posição do eixo antes de calcular distâncias. Para um eixo deslocado, como §y=-1§, subtraia a altura do eixo das alturas das curvas se toda a região estiver acima.",
        "Se o eixo estiver acima da região, a curva de menor altura pode dar o raio maior. Calcule a distância de cada fronteira ao eixo em vez de usar automaticamente a ordem superior menos inferior. Se o eixo cruzar o interior de uma fatia, o raio externo é a maior das duas distâncias e o corte é um disco. A fronteira que fica mais longe pode mudar ao longo do intervalo.",
      ],
      example: {
        title: "Uma rotação em torno de um eixo deslocado",
        prompt: "Gire em torno de §y=-1§ a região entre §y=x§ e §y=0§ para §0\\le x\\le2§.",
        steps: [
          "O raio externo é §R=x+1§ e o interno é §r=1§.",
          "A seção tem área §\\pi[(x+1)^2-1]=\\pi(x^2+2x)§.",
          "Integre de 0 a 2: §V=\\pi(8/3+4)=20\\pi/3§.",
        ],
      },
      visual: { kind: "calc-graph", model: "washer", caption: "Mova o corte e compare os dois raios com a seção transversal que eles produzem." },
    },
    {
      title: "Considere cascas quando a fatia for paralela ao eixo",
      paragraphs: [
        "Uma fatia paralela ao eixo, ao girar, forma uma casca cilíndrica fina. A contribuição é aproximadamente circunferência §2\\pi r§ vezes altura h vezes espessura. Integre §2\\pi rh§ na direção perpendicular ao eixo.",
        "Quando a região está inteiramente em um lado do eixo, cada distância corresponde a uma casca. Se a região atravessa o eixo, verifique se fatias em lados opostos gerariam cascas sobrepostas.",
        "Em um mesmo sólido, cascas e discos medem o mesmo volume de maneiras diferentes. As cascas usam circunferência e altura de uma fatia paralela. Os discos ou arruelas usam áreas de cortes perpendiculares. Escolha a direção que descreve as fronteiras com menos mudanças de fórmula. Quando as duas direções são simples, usar ambas é uma boa conferência.",
      ],
      example: {
        title: "Volume por cascas em torno do eixo y",
        prompt: "Gire a região sob §y=x§, de 0 a 2, em torno do eixo y.",
        steps: [
          "Uma fatia vertical gera raio x e altura x.",
          "O volume é §2\\pi\\int_0^2 x^2\\,dx=16\\pi/3§.",
          "As unidades vêm de comprimento vezes comprimento vezes comprimento.",
        ],
      },
      extraExample: {
        title: "Confira o mesmo volume com arruelas",
        prompt: "Use agora fatias horizontais para a mesma rotação.",
        steps: [
          "Para §0\\le y\\le2§, a região vai de §x=y§ até §x=2§.",
          "A arruela tem raios 2 e y. Integre §\\pi\\int_0^2(4-y^2)\\,dy§.",
          "O volume vale §\\pi(8-8/3)=16\\pi/3§, igual ao valor pelas cascas.",
        ],
      },
    },
    {
      title: "Transforme taxas em saldos",
      paragraphs: [
        "Se Q muda a uma taxa §Q'(t)§, a integral da taxa de a até b fornece §Q(b)-Q(a)§. Some o saldo ao valor inicial para encontrar a quantidade final. Se há entrada e saída, integre a taxa líquida.",
        "Sinais ajudam a interpretar o resultado. A quantidade cresce quando a taxa líquida é positiva e diminui quando é negativa. Um saldo nulo pode esconder entrada e saída consideráveis ao longo do intervalo.",
      ],
      example: {
        title: "Um reservatório com entrada e saída",
        prompt: "Um tanque tem 20 L. A entrada é §6+t§ L/min e a saída é 8 L/min. Quanto há após 5 min?",
        steps: [
          "A taxa líquida é §t-2§ L/min, negativa antes de 2 e positiva depois.",
          "A variação é §\\int_0^5(t-2)\\,dt=25/2-10=5/2§ L.",
          "O tanque termina com 22,5 L. O menor volume ocorre em 2 min, quando ele tem 18 L.",
        ],
      },
      visual: { kind: "calc-graph", model: "signed-area", caption: "Observe em um modelo linear como contribuições negativas e positivas entram no saldo." },
    },
    {
      title: "Distinga deslocamento de distância percorrida",
      paragraphs: [
        "Integrar velocidade com sinal dá deslocamento. Para encontrar a distância total, integre o módulo da velocidade. Divida o intervalo nos instantes em que a velocidade muda de sinal e some os comprimentos positivos.",
        "O objeto pode voltar à posição inicial e ainda ter percorrido uma distância positiva. Uma mudança de sentido pode ser descoberta resolvendo §v(t)=0§ e testando o sinal dos dois lados.",
        "Em uma tabela de velocidades, você pode aproximar a distância somando áreas sob o módulo da velocidade. Ao usar trechos lineares entre medições de sinais opostos, localize o zero do segmento e divida o trapézio em dois triângulos. Tomar o módulo só no final da soma ainda deixa que trechos percorridos em sentidos opostos se cancelem.",
      ],
      example: {
        title: "Um móvel que volta ao ponto inicial",
        prompt: "Seja §v(t)=t-2§ m/s em §[0,4]§. Calcule deslocamento e distância.",
        steps: [
          "O sinal troca em 2. A integral de 0 até 2 vale −2 m e a de 2 até 4 vale 2 m.",
          "O deslocamento é §-2+2=0§ m.",
          "A distância é §|-2|+|2|=4§ m.",
        ],
      },
    },
    {
      title: "Calcule trabalho com força variável",
      paragraphs: [
        "Uma força que age na direção do deslocamento faz trabalho aproximado §F(x)\\Delta x§ em uma pequena etapa. A integral soma essas etapas. Em metros e newtons, o trabalho sai em joules.",
        "Uma força constante produz o produto usual força vezes distância. Para uma mola ideal, a força externa necessária para esticar devagar cresce linearmente com o alongamento, segundo a lei de Hooke.",
      ],
      example: {
        title: "Uma mola com força crescente",
        prompt: "Uma mola tem constante §k=200§ N/m. Calcule o trabalho externo para alongá-la de 0 até 0,3 m.",
        steps: [
          "Use §F(x)=200x§, onde x mede o alongamento a partir do repouso.",
          "O trabalho é §\\int_0^{0{,}3}200x\\,dx=[100x^2]_0^{0{,}3}§.",
          "O resultado é 9 J. Multiplicar a força final pela distância daria o dobro porque a força inicial era zero.",
        ],
      },
    },
    {
      title: "Encontre massa e centro com densidade variável",
      paragraphs: [
        "Se uma barra tem densidade linear §\\rho(x)§ em kg/m, a massa de uma fatia é aproximadamente §\\rho(x)\\Delta x§. A massa total é a integral da densidade.",
        "O momento em relação à origem soma massa vezes posição. Dividir o momento pela massa total dá a coordenada do centro de massa. O centro tende a ficar mais próximo das regiões mais densas.",
      ],
      example: {
        title: "Uma barra mais densa à direita",
        prompt: "Em §0\\le x\\le2§, uma barra tem densidade §\\rho(x)=1+x§ kg/m. Ache a massa e o centro.",
        steps: [
          "A massa é §\\int_0^2(1+x)\\,dx=4§ kg.",
          "O momento é §\\int_0^2 x(1+x)\\,dx=2+8/3=14/3§ kg·m.",
          "O centro é §(14/3)/4=7/6§ m, à direita do ponto médio 1 m.",
        ],
      },
    },
    {
      title: "Meça o comprimento de uma curva suave",
      paragraphs: [
        "Perto de x, uma curva derivável se comporta como uma reta de inclinação §f'(x)§. Um trecho tem avanço horizontal §\\Delta x§ e avanço vertical aproximadamente §f'(x)\\Delta x§. Pelo teorema de Pitágoras, seu comprimento aproxima §\\sqrt{1+f'(x)^2}\\,\\Delta x§.",
        "Quando a derivada é contínua, integre essa expressão para encontrar o comprimento. A raiz aparece porque a medida soma distâncias, mesmo em trechos onde a função cai.",
      ],
      example: {
        title: "Uma curva cujo comprimento pode ser calculado",
        prompt: "Calcule o comprimento de §y=(2/3)x^{3/2}§ em §[0,3]§.",
        steps: [
          "A derivada é §\\sqrt{x}§ e o fator de comprimento é §\\sqrt{1+x}§.",
          "Uma primitiva é §(2/3)(1+x)^{3/2}§.",
          "O comprimento é §(2/3)(8-1)=14/3§. Ele é maior que o avanço horizontal de 3 unidades.",
        ],
      },
    },
    {
      title: "Confira o modelo com dimensões e estimativas",
      paragraphs: [
        "Uma área usa unidades quadradas, um volume usa unidades cúbicas, e um saldo conserva a unidade da quantidade acumulada. Se as unidades não fecharem, reveja o significado da fatia ou da taxa.",
        "Você também pode comparar com uma forma simples que contenha a região. Para uma área sob uma curva positiva, retângulos fornecem cotas imediatas. Para um volume, compare com um cilindro de mesma altura e raio maior que todos os cortes.",
      ],
      example: {
        title: "Uma estimativa antes do cálculo exato",
        prompt: "Estime e calcule o volume de rotação sob §y=1+x§ para §0\\le x\\le1§ em torno do eixo x.",
        steps: [
          "O raio está entre 1 e 2, então o volume está entre §\\pi§ e §4\\pi§.",
          "A seção é §\\pi(1+x)^2§. Integre para obter §\\pi[(1+x)^3/3]_0^1§.",
          "O valor exato é §7\\pi/3§, que respeita a faixa prevista e tem unidade cúbica.",
        ],
      },
    },
  ],
  pitfall: "Em volumes de rotação, raio é a distância até o eixo escolhido. Para arruelas, subtraia as áreas dos dois discos: §\\pi(R^2-r^2)§. Usar §\\pi(R-r)^2§ calcula a área de outro disco.",
  checks: [
    { prompt: "Qual é a área entre §y=4§ e §y=x^2§?", solution: "As interseções são ±2. Integre §4-x^2§ de −2 a 2 e obtenha §32/3§." },
    { prompt: "Qual é a área entre §y=x§ e §y=-x§ em §[-1,1]§?", solution: "A altura é §2|x|§. Os dois triângulos têm área 1 cada. A área total é 2." },
    { prompt: "Ache o volume de um sólido com seções de área §A(x)=3x^2§ em §[0,2]§.", solution: "§\\int_0^2 3x^2\\,dx=[x^3]_0^2=8§ unidades cúbicas." },
    { prompt: "Gire a região sob §y=\\sqrt{x}§ de 0 a 4 em torno do eixo x. Qual é o volume?", solution: "O raio ao quadrado é x, então §V=\\pi\\int_0^4 x\\,dx=8\\pi§." },
    { prompt: "Uma arruela tem raios externo 4 e interno 2. Qual é sua área?", solution: "§\\pi(4^2-2^2)=12\\pi§ unidades quadradas." },
    { prompt: "Gire a região sob §y=1§ de §x=0§ a §x=3§ em torno do eixo y. Use cascas.", solution: "O raio é x e a altura é 1. §2\\pi\\int_0^3 x\\,dx=9\\pi§." },
    { prompt: "Um tanque começa com 30 L e tem taxa líquida §2t-3§ L/min. Quanto há em 4 min?", solution: "A variação é §[t^2-3t]_0^4=4§ L. O volume final é 34 L." },
    { prompt: "Para §v(t)=2-t§ em §[0,3]§, ache distância e deslocamento.", solution: "A integral até 2 é 2 e de 2 até 3 é −0,5. A distância é 2,5 e o deslocamento é 1,5." },
    { prompt: "Qual é o trabalho feito por §F(x)=3x^2§ N de 0 a 2 m?", solution: "§\\int_0^2 3x^2\\,dx=8§ J." },
    { prompt: "Qual é a massa de uma barra em §[0,3]§ com densidade §\\rho(x)=2x§ kg/m?", solution: "§\\int_0^3 2x\\,dx=[x^2]_0^3=9§ kg." },
  ],
} satisfies StudyLesson;
