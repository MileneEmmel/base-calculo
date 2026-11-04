import type { StudyLesson } from "./studyBasics";

export default {
  intro: "A derivada transforma a inclinação entre dois pontos em uma taxa instantânea. Você vai construí-la por limites, aprender quando cada regra vale e combinar regras em funções que exigem mais de uma etapa.",
  visual: { kind: "cards", caption: "Identifique a estrutura externa antes de derivar.", items: [
    ["Definição","§f'(a)=\\lim_{h\\to0}[f(a+h)-f(a)]/h§"],
    ["Produto","§(uv)'=u'v+uv'§"],
    ["Quociente","§(u/v)'=(u'v-uv')/v^2§"],
    ["Composição","§(f\\circ g)'(x)=f'(g(x))g'(x)§"],
  ] },
  sections: [
    {
      title: "Da taxa média à taxa instantânea",
      paragraphs: [
        "A diferença §f(b)-f(a)§ mede a variação da saída. Dividir por §b-a§ dá a taxa média e a inclinação da secante. Essa taxa descreve o intervalo inteiro, ainda que a função acelere ou desacelere dentro dele.",
        "Para encontrar a taxa instantânea em a, escreva §b=a+h§ e faça h tender a zero sem usar zero no quociente. Se o limite bilateral finito existir, ele é §f'(a)§.",
        "Em um gráfico, a secante liga duas posições da curva. Ao aproximar a segunda da primeira, você acompanha uma família de retas, cada uma com sua própria inclinação. Em uma curva quadrática, passos à direita e à esquerda dão inclinações diferentes para cada distância fixa, mas os dois lados se aproximam da mesma taxa quando essa distância diminui.",
      ],
      example: {
        title: "Uma secante que gira em direção à tangente",
        prompt: "Encontre §f'(1)§ para §f(x)=x^2§.",
        steps: [
          "A secante entre §1§ e §1+h§ tem inclinação §[(1+h)^2-1]/h§.",
          "Expandindo e cancelando h, obtemos §2+h§ para §h\\ne0§.",
          "O limite é 2. A taxa instantânea em 1 é 2 unidades de saída por unidade de entrada.",
        ],
      },
      visual: { kind: "calc-graph", model: "secant", caption: "Mude o segundo ponto da secante. Compare sua inclinação com a da tangente fixa em x = 1." },
    },
    {
      title: "Derive uma função inteira pela definição",
      paragraphs: [
        "Ao manter x como símbolo, a definição fornece uma regra para a taxa em cada ponto. Expanda §f(x+h)§ usando parênteses e só depois subtraia §f(x)§ inteiro.",
        "A forma final pode ser avaliada em qualquer entrada onde o limite exista. Essa etapa distingue §f'(x)§, uma função, de §f'(a)§, um número.",
        "Você pode conferir a expansão atribuindo um significado a cada termo. O termo independente de h é a altura inicial e deve desaparecer na subtração. Depois de dividir por h, o termo que ainda contém h descreve a diferença entre a taxa média e a instantânea. Ele desaparece só no limite. Esse raciocínio explica por que substituir §h=0§ antes de dividir perde a informação.",
      ],
      example: {
        title: "Uma derivada como regra",
        prompt: "Encontre a derivada de §f(x)=3x^2-4x§ pela definição.",
        steps: [
          "A diferença §f(x+h)-f(x)§ é §6xh+3h^2-4h§.",
          "Dividindo por h, sobra §6x+3h-4§.",
          "Fazendo §h\\to0§, resulta §f'(x)=6x-4§. Em 2, a taxa é 8.",
        ],
      },
    },
    {
      title: "Compare derivadas laterais",
      paragraphs: [
        "A definição usa passos positivos e negativos. Se os quocientes incrementais se aproximarem de valores diferentes, não há derivada no ponto, ainda que a função seja contínua.",
        "Verifique a continuidade antes de estudar um possível canto. Derivabilidade implica continuidade porque §f(a+h)-f(a)§ é h vezes um quociente que tende a um número finito.",
      ],
      example: {
        title: "Um canto deslocado",
        prompt: "Determine se §f(x)=|x-2|+1§ é derivável em 2.",
        steps: [
          "Temos §f(2)=1§ e §f(2+h)-f(2)=|h|§.",
          "O quociente é −1 para h negativo e 1 para h positivo.",
          "A função é contínua em 2, mas as derivadas laterais não coincidem.",
        ],
      },
      visual: { kind: "calc-graph", model: "corner", caption: "Explore a mesma geometria no vértice de f(x) = |x|, deslocado para a origem." },
    },
    {
      title: "Identifique uma inclinação sem limite finito",
      paragraphs: [
        "Mesmo sem um canto, a derivada usual pode falhar. Se o quociente incremental cresce sem limite em módulo, não existe derivada real finita. Em alguns desses casos a curva tem tangente vertical.",
        "O domínio também importa. Em uma extremidade, uma taxa unilateral pode fazer sentido no contexto, mas convém dizer de qual lado ela foi calculada.",
        "Tangente vertical e canto são falhas diferentes. No canto, as inclinações laterais podem ter valores reais distintos. Na tangente vertical, o módulo da inclinação cresce sem limite à medida que a secante se aproxima do ponto. O gráfico ainda pode ter uma direção geométrica bem definida, mas uma reta vertical não é descrita por uma inclinação real.",
      ],
      example: {
        title: "Uma tangente vertical na origem",
        prompt: "Examine §f(x)=\\sqrt[3]{x}§ em zero.",
        steps: [
          "O quociente incremental é §\\sqrt[3]{h}/h§.",
          "Escreva §h=(\\sqrt[3]{h})^3§. A fração fica §1/(\\sqrt[3]{h})^2§.",
          "A expressão tende a §+\\infty§ dos dois lados. A tangente é vertical e §f'(0)§ não é um número real.",
        ],
      },
    },
    {
      title: "Use potência, soma e fator constante",
      paragraphs: [
        "Para inteiros positivos n, §(x^n)'=nx^{n-1}§. A regra se estende a expoentes reais no intervalo §x>0§ e pode valer em outros pontos onde a potência está definida e é derivável.",
        "A derivada de uma constante é zero. Em uma soma, derive cada parcela e conserve os fatores constantes. Isso permite derivar polinômios rapidamente e conferir o resultado pela ordem dos graus.",
      ],
      example: {
        title: "Diminua o grau termo a termo",
        prompt: "Derive §f(x)=4x^5-3x^2+7x-9§.",
        steps: [
          "O primeiro termo dá §20x^4§.",
          "Os termos seguintes dão §-6x§, 7 e zero.",
          "Portanto, §f'(x)=20x^4-6x+7§.",
        ],
      },
    },
    {
      title: "Reescreva raízes e potências negativas",
      paragraphs: [
        "Uma raiz quadrada em x positivo pode ser escrita como §x^{1/2}§. Uma potência no denominador pode virar expoente negativo. A reescrita permite usar as mesmas regras de potência e soma.",
        "Conserve as restrições originais ao simplificar. Uma fórmula para a derivada em §x>0§ não prova que ela exista na extremidade zero. Ali, use um limite separado quando necessário.",
      ],
      example: {
        title: "Uma soma com dois tipos de potência",
        prompt: "Derive §f(x)=\\sqrt{x}+3/x^2§.",
        steps: [
          "O domínio é §x>0§ por causa da raiz e do denominador.",
          "Reescreva §f=x^{1/2}+3x^{-2}§.",
          "Derivando, §f'(x)=1/(2\\sqrt{x})-6/x^3§ para §x>0§.",
        ],
      },
    },
    {
      title: "Derive um produto de duas funções",
      paragraphs: [
        "Quando ambos os fatores mudam, há contribuição dos dois. A regra é §(uv)'=u'v+uv'§. Cada parcela deriva um fator enquanto conserva o outro.",
        "Você pode verificar com uma expansão quando os fatores forem polinômios. Em produtos com exponenciais ou funções trigonométricas, a regra costuma manter a resposta mais legível.",
        "Há um modo de enxergar a regra pelo incremento do produto. Escreva §u(x+h)=u(x)+\\Delta u§ e §v(x+h)=v(x)+\\Delta v§. Além das contribuições individuais, aparece o produto §\\Delta u\\Delta v§. Depois de dividir por h, essa última parcela tende a zero, pois um quociente incremental tende a uma taxa finita e o outro incremento tende a zero.",
      ],
      example: {
        title: "Polinômio multiplicado por exponencial",
        prompt: "Derive §f(x)=(x^2+1)e^x§.",
        steps: [
          "As derivadas dos fatores são §2x§ e §e^x§.",
          "Pela regra do produto, §f'=2xe^x+(x^2+1)e^x§.",
          "Coloque §e^x§ em evidência: §f'=(x^2+2x+1)e^x=(x+1)^2e^x§.",
        ],
      },
    },
    {
      title: "Mantenha a ordem no quociente",
      paragraphs: [
        "Para §u/v§, derive o numerador e multiplique pelo denominador. Subtraia o numerador vezes a derivada do denominador e divida por §v^2§.",
        "A ordem da subtração decide o sinal. Antes de aplicar a regra, veja se é possível simplificar legitimamente. Se houver restrições de domínio, leve-as até o resultado.",
        "Você também pode pensar em §u/v§ como §u\\cdot v^{-1}§. A cadeia produz §-v'/v^2§ para a derivada do segundo fator. O sinal de menos da regra do quociente vem dessa derivada do inverso multiplicativo. Esse caminho ajuda a reconstruir a fórmula quando você lembra das regras do produto e da cadeia, mas esquece a ordem dos termos.",
      ],
      example: {
        title: "Um quociente com derivada negativa",
        prompt: "Derive §f(x)=(x+1)/(x-2)§.",
        steps: [
          "No domínio §x\\ne2§, as derivadas do numerador e do denominador valem 1.",
          "O numerador da derivada é §(x-2)-(x+1)=-3§.",
          "Assim §f'(x)=-3/(x-2)^2§. Cada ramo tem taxa negativa em todos os seus pontos.",
        ],
      },
    },
    {
      title: "Siga as camadas da regra da cadeia",
      paragraphs: [
        "Uma composição muda primeiro a função interna e depois a externa. A taxa total combina a taxa externa, avaliada na saída interna, com a taxa da função interna.",
        "Identifique as camadas de fora para dentro. Uma escrita com uma variável auxiliar ajuda a não confundir §f'(g(x))§ com §f'(x)§ ou a esquecer um fator.",
        "Pense em duas conversões de unidade em sequência. A taxa interna diz quantas unidades de u mudam por unidade de x. A taxa externa diz quantas unidades de saída mudam por unidade de u. Multiplicá-las cancela a unidade intermediária e dá a taxa de saída por unidade de x. Em três camadas, cada taxa intermediária também entra no produto.",
      ],
      example: {
        title: "Uma potência de um polinômio",
        prompt: "Derive §F(x)=(3x^2-1)^5§.",
        steps: [
          "Chame §u=3x^2-1§. A derivada de §u^5§ em relação a u é §5u^4§.",
          "A derivada de u em relação a x é §6x§.",
          "O produto dá §F'(x)=30x(3x^2-1)^4§.",
        ],
      },
    },
    {
      title: "Combine produto com regra da cadeia",
      paragraphs: [
        "Uma função pode ser um produto e ter composições dentro dos fatores. Decida primeiro a operação que reúne a expressão inteira. Depois escolha as regras para cada fator.",
        "Organizar a derivada em parcelas ajuda a preservar os argumentos. Simplifique ao final apenas se isso tornar a expressão mais clara para o objetivo da questão.",
      ],
      example: {
        title: "Uma composição dentro de um fator",
        prompt: "Derive §f(x)=x^2\\sin(3x)§.",
        steps: [
          "Use produto: §f'=2x\\sin(3x)+x^2(\\sin(3x))'§.",
          "A cadeia fornece §(\\sin(3x))'=3\\cos(3x)§.",
          "Logo, §f'(x)=2x\\sin(3x)+3x^2\\cos(3x)§.",
        ],
      },
    },
    {
      title: "Derive funções trigonométricas em radianos",
      paragraphs: [
        "As fórmulas §(\\sin x)'=\\cos x§ e §(\\cos x)'=-\\sin x§ usam radianos. Essa unidade é necessária no limite §\\sin h/h\\to1§, que aparece na demonstração via fórmulas de adição.",
        "Como §\\tan x=\\sin x/\\cos x§, a regra do quociente dá §(\\tan x)'=\\sec^2 x§ onde §\\cos x\\ne0§. Para argumentos compostos, aplique a cadeia.",
      ],
      example: {
        title: "Tangente com um argumento que muda duas vezes mais rápido",
        prompt: "Derive §f(x)=\\tan(2x)§ e indique onde a fórmula vale.",
        steps: [
          "A regra externa fornece §\\sec^2(2x)§.",
          "Multiplique por 2, a taxa do argumento. Logo §f'(x)=2\\sec^2(2x)§.",
          "A fórmula vale onde §\\cos(2x)\\ne0§, isto é, fora de §x=\\pi/4+k\\pi/2§ para k inteiro.",
        ],
      },
    },
    {
      title: "Derive exponenciais e logaritmos",
      paragraphs: [
        "A exponencial natural é sua própria derivada. Como §a^x=e^{x\\ln a}§ para §a>0§, derivar uma exponencial de base a acrescenta o fator §\\ln a§.",
        "Para §u(x)>0§, a cadeia dá §(\\ln u)'=u'/u§. Em um intervalo em que §u\\ne0§, também temos §(\\ln|u|)'=u'/u§. O módulo permite usar um argumento originalmente negativo.",
        "Compare §a^x§, onde a base é constante e o expoente varia, com §x^p§, onde o expoente é constante. A primeira usa o fator §\\ln a§ e a segunda reduz o expoente em uma unidade. Quando base e expoente dependem de x, como em §x^x§ para §x>0§, reescreva como §e^{x\\ln x}§. A cadeia e o produto então dão §x^x(\\ln x+1)§.",
      ],
      example: {
        title: "Um logaritmo com dois intervalos de definição",
        prompt: "Derive §g(x)=\\ln|x^2-4|§.",
        steps: [
          "O argumento do logaritmo exclui §x=\\pm2§.",
          "Use §u=x^2-4§, cuja derivada é §2x§.",
          "Assim §g'(x)=2x/(x^2-4)§ nos três intervalos do domínio.",
        ],
      },
    },
    {
      title: "Use derivação implícita",
      paragraphs: [
        "Nem toda curva está dada como §y=f(x)§. Ao derivar uma equação que relaciona x e y, trate y localmente como uma função de x. A derivada de §y^2§ é §2yy'§, pela cadeia.",
        "Depois de derivar os dois lados, agrupe as parcelas que contêm §y'§ e isole o fator. Se a expressão exigir divisão por zero no ponto, examine a curva antes de concluir o que ocorre ali.",
        "O cálculo implícito produz uma relação entre x, y e a inclinação. Dois pontos com a mesma coordenada x podem ter inclinações diferentes porque estão em ramos distintos. Na circunferência, o ramo de cima e o de baixo têm sinais opostos para y, de modo que a fórmula §-x/y§ respeita o ramo sem precisar isolar y no começo.",
      ],
      example: {
        title: "Inclinação de uma circunferência",
        prompt: "Encontre a inclinação de §x^2+y^2=25§ em §(3,4)§.",
        steps: [
          "Derive: §2x+2yy'=0§.",
          "Para §y\\ne0§, obtemos §y'=-x/y§.",
          "No ponto pedido, a inclinação vale §-3/4§. O resultado também é perpendicular ao raio de inclinação §4/3§.",
        ],
      },
      visual: { kind: "calc-graph", model: "implicit", caption: "Desloque o ponto no semicírculo superior. Observe como a tangente continua perpendicular ao raio." },
    },
    {
      title: "Use a derivada de uma inversa",
      paragraphs: [
        "Quando f tem inversa local derivável e §f'(a)\\ne0§, a taxa da inversa em §b=f(a)§ é §1/f'(a)§. Isso vem de derivar §f^{-1}(f(x))=x§.",
        "Trocar x e y troca os papéis da entrada e da saída. Encontre a entrada original que produz b antes de calcular a derivada da inversa. Avaliar a derivada de f diretamente em b pode dar outro número.",
      ],
      example: {
        title: "A taxa da raiz cúbica fora da origem",
        prompt: "Use a inversa de §f(x)=x^3§ para calcular a derivada de §\\sqrt[3]{x}§ em 8.",
        steps: [
          "A entrada original que produz 8 é 2.",
          "A derivada de f em 2 é §3\\cdot2^2=12§.",
          "A derivada da inversa em 8 é §1/12§.",
        ],
      },
    },
    {
      title: "Derive de novo e interprete a unidade",
      paragraphs: [
        "A segunda derivada §f''§ é a derivada de §f'§. Se f é posição em metros e a entrada é tempo em segundos, a primeira derivada é velocidade em metros por segundo e a segunda é aceleração em metros por segundo ao quadrado.",
        "Sinal da velocidade indica o sentido do movimento. Sinal da aceleração indica se a velocidade aumenta ou diminui como número. Rapidez é o módulo da velocidade e depende dos dois sinais.",
      ],
      example: {
        title: "Do gráfico de posição à aceleração",
        prompt: "Seja §s(t)=t^3-6t^2+9t§ em metros. Calcule a velocidade e a aceleração em 2 s.",
        steps: [
          "Derive uma vez: §v(t)=3t^2-12t+9§.",
          "Derive novamente: §a(t)=6t-12§.",
          "Logo §v(2)=-3§ m/s e §a(2)=0§ m/s². O movimento nesse instante tem sentido negativo.",
        ],
      },
    },
    {
      title: "Analise derivabilidade em funções por partes",
      paragraphs: [
        "Em uma fronteira, confira continuidade primeiro. Depois compare as derivadas laterais. Se cada fórmula estende-se de forma derivável até a fronteira e as alturas coincidem, as derivadas das extensões dão as taxas laterais.",
        "Uma condição de continuidade iguala valores. Uma condição de derivabilidade também iguala inclinações. Quando há dois parâmetros, essas duas informações podem determinar ambos.",
        "O ajuste com duas condições tem uma interpretação geométrica. A igualdade das alturas força a reta a passar pelo ponto de junção. A igualdade das inclinações força a reta a ser tangente à parábola ali. Uma reta que apenas cruza o ponto resolve a continuidade, mas gera um canto se a taxa do outro trecho for diferente.",
      ],
      example: {
        title: "Una uma reta à parábola sem canto",
        prompt: "Escolha a e b para unir §ax+b§ em §x<1§ e §x^2§ em §x\\ge1§ de modo derivável.",
        steps: [
          "A continuidade exige §a+b=1§.",
          "A inclinação da reta é a. A taxa da parábola em 1 é 2, então §a=2§.",
          "Substitua na primeira condição: §b=-1§. A reta §2x-1§ passa pela junção com a mesma inclinação.",
        ],
      },
    },
  ],
  pitfall: "Ao usar a regra da cadeia, derive cada camada. Em §\\sin(x^2)§, o cosseno conserva o argumento §x^2§, e ainda falta multiplicar por §2x§.",
  checks: [
    { prompt: "Use a definição para derivar §f(x)=x^2§ em 3.", solution: "§[(3+h)^2-9]/h=6+h§ para §h\\ne0§. O limite é 6." },
    { prompt: "Derive §5x^4-2x+7§.", solution: "Pela soma e potência, §20x^3-2§." },
    { prompt: "Derive §x^{-3}+2\\sqrt{x}§ em §x>0§.", solution: "O resultado é §-3x^{-4}+1/\\sqrt{x}§." },
    { prompt: "Derive §x^3\\ln x§.", solution: "Em §x>0§, a regra do produto dá §3x^2\\ln x+x^2§." },
    { prompt: "Derive §x/(x^2+1)§.", solution: "O numerador da derivada é §x^2+1-2x^2=1-x^2§. Divida por §(x^2+1)^2§." },
    { prompt: "Derive §e^{x^2-3x}§.", solution: "Pela cadeia, §(2x-3)e^{x^2-3x}§." },
    { prompt: "Derive §\\cos(4x^2)§.", solution: "A cadeia dá §-8x\\sin(4x^2)§." },
    { prompt: "Derive §\\ln(1+x^2)§.", solution: "A cadeia dá §2x/(1+x^2)§ em toda a reta." },
    { prompt: "Determine a inclinação de §x^2+y^2=13§ em §(2,3)§.", solution: "§2x+2yy'=0§ dá §y'=-x/y=-2/3§." },
    { prompt: "Se §f(4)=9§ e §f'(4)=5§, qual é a taxa da inversa local em 9?", solution: "A entrada original é 4, então a taxa da inversa é §1/5§." },
    { prompt: "Qual é a segunda derivada de §x^4-3x^2§?", solution: "A primeira é §4x^3-6x§ e a segunda é §12x^2-6§." },
    { prompt: "É derivável em zero a função §f(x)=x§ para §x<0§ e §f(x)=2x§ para §x\\ge0§?", solution: "É contínua em zero, mas as taxas laterais são 1 e 2. A derivada não existe." },
  ],
} satisfies StudyLesson;
