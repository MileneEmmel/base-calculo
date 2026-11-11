import type { LessonDeepening } from "./studyBasics";

// Aprofundamento das aulas: seções e atividades acrescentadas ao fim de cada aula.
// Texto original em português. Os trechos entre § são TeX inline.
export const deepening: Record<string, LessonDeepening> = {
  limites: {
    sections: [
      {
        title: "Reconheça o número e como um limite",
        paragraphs: [
          "Alguns limites no infinito têm a forma §1^\\infty§: a base tende a 1 enquanto o expoente cresce sem limite. Essa escrita é uma indeterminação, porque as duas tendências competem. A base próxima de 1 puxa a potência para 1, e o expoente grande amplia qualquer pequeno excesso sobre 1. O caso mais importante é §\\lim_{n\\to\\infty}(1+1/n)^n=e§, que define o número §e\\approx2{,}71828§.",
          "Uma tabela mostra que a convergência é lenta. Com n igual a 1, 10, 100 e 1000, as potências valem 2, cerca de 2,5937, 2,7048 e 2,7169. O mesmo limite vale quando x real tende a §+\\infty§ ou a §-\\infty§. Trocando a variável, você obtém a forma geral §\\lim_{x\\to\\infty}(1+a/x)^x=e^a§, válida para qualquer constante real a.",
          "Para usar a forma geral, ajuste o expoente até que ele seja o inverso exato da parcela pequena da base. Escreva a potência original como uma potência dessa forma ajustada e use, no fim, a continuidade da função potência. Se a base não tender a 1, não há indeterminação: §(1/2)^x§ tende a zero e §2^x§ cresce sem limite quando x vai para §+\\infty§.",
        ],
        example: {
          title: "Ajuste o expoente ao denominador",
          prompt: "Calcule §\\lim_{x\\to\\infty}(1+2/x)^{3x}§.",
          steps: [
            "A base tende a 1 e o expoente cresce sem limite. A forma é §1^\\infty§.",
            "Escreva §(1+2/x)^{3x}=[(1+2/x)^{x}]^3§.",
            "Pela forma geral com §a=2§, o colchete tende a §e^2§.",
            "Como elevar ao cubo é contínuo, o limite é §(e^2)^3=e^6§.",
          ],
        },
        extraExample: {
          title: "Juros que se acumulam continuamente",
          prompt: "Um capital de R$ 1000 rende 12% ao ano, capitalizados n vezes por ano. Qual é o limite do montante após um ano quando n cresce?",
          steps: [
            "Com n capitalizações, cada período rende §0{,}12/n§ e o montante é §1000(1+0{,}12/n)^n§.",
            "Pela forma geral com §a=0{,}12§, a potência tende a §e^{0{,}12}§.",
            "O montante tende a §1000e^{0{,}12}\\approx1127{,}50§ reais. Capitalizar mais vezes aumenta o valor, mas ele permanece limitado.",
          ],
        },
      },
      {
        title: "Use os limites fundamentais de exponencial e logaritmo",
        paragraphs: [
          "Dois limites de forma §0/0§ aparecem com muita frequência: §\\lim_{h\\to0}(e^h-1)/h=1§ e §\\lim_{h\\to0}\\ln(1+h)/h=1§. O primeiro diz que a inclinação da exponencial natural em zero vale 1, e é exatamente essa propriedade que distingue a base e das outras. O segundo sai do primeiro pela troca §u=\\ln(1+h)§, pois então §h=e^u-1§ e u tende a zero junto com h.",
          "Para outra base positiva a, escreva §a^h=e^{h\\ln a}§. A troca §u=h\\ln a§ dá §\\lim_{h\\to0}(a^h-1)/h=\\ln a§. Esse número é a inclinação de §a^x§ na origem e explica o fator §\\ln a§ que aparece ao derivar exponenciais de outras bases. Para §a=2§, por exemplo, a inclinação na origem é §\\ln2\\approx0{,}69§.",
          "Como no limite trigonométrico, o argumento precisa coincidir com o denominador. Multiplique e divida pelo fator que falta e trate cada quociente pela lei do produto. Os limites fundamentais continuam valendo quando, no lugar de h, aparece qualquer expressão que tenda a zero sem se anular perto do ponto.",
        ],
        example: {
          title: "Combine dois limites fundamentais",
          prompt: "Calcule §\\lim_{x\\to0}(e^{3x}-1)/\\sin(2x)§.",
          steps: [
            "A substituição dá §0/0§. Para §x\\ne0§ perto de zero, separe em três fatores: §\\frac{e^{3x}-1}{3x}\\cdot\\frac{2x}{\\sin(2x)}\\cdot\\frac{3x}{2x}§.",
            "O primeiro fator tende a 1 porque §3x\\to0§. O segundo também tende a 1, pelo limite trigonométrico.",
            "O último fator vale §3/2§ para §x\\ne0§. Portanto, o limite é §3/2§.",
          ],
        },
        extraExample: {
          title: "Um logaritmo com argumento escalado",
          prompt: "Calcule §\\lim_{x\\to0}\\ln(1+4x)/x§.",
          steps: [
            "Escreva a expressão como §4\\cdot\\ln(1+4x)/(4x)§.",
            "Com §h=4x§, o quociente tende a 1.",
            "O limite é 4.",
          ],
        },
      },
      {
        title: "Leia exponenciais e logaritmos nas extremidades",
        paragraphs: [
          "Os gráficos de §e^x§ e de §\\ln x§ resumem limites que você deve reconhecer de imediato. A exponencial tende a zero quando x vai para §-\\infty§ e cresce sem limite quando x vai para §+\\infty§. O logaritmo natural tende a §-\\infty§ quando x tende a zero pela direita e cresce sem limite, embora muito devagar, quando x vai para §+\\infty§. Algumas funções limitadas também têm níveis assintóticos: §\\arctan x§ tende a §\\pi/2§ à direita e a §-\\pi/2§ à esquerda. Já §\\sin x§, também limitada, não tem limite no infinito.",
          "Em uma composição, descubra primeiro para onde vai o expoente ou o argumento e só então aplique a função externa. Em §e^{1/x}§, o expoente tende a §+\\infty§ pela direita de zero e a §-\\infty§ pela esquerda. Assim, os limites laterais são §+\\infty§ e 0. Esse tipo de análise lateral é comum quando uma exponencial ou um logaritmo recebe um argumento com polo.",
        ],
        example: {
          title: "Uma exponencial com dois comportamentos laterais",
          prompt: "Estude §f(x)=\\frac{1}{1+e^{1/x}}§ perto de zero.",
          steps: [
            "Pela direita, §1/x\\to+\\infty§ e §e^{1/x}§ cresce sem limite. A fração tende a zero.",
            "Pela esquerda, §1/x\\to-\\infty§ e §e^{1/x}\\to0§. A fração tende a 1.",
            "Os limites laterais existem, mas são diferentes. Não há limite bilateral e o gráfico tem um salto em zero.",
          ],
        },
        visual: { kind: "cards", caption: "Quatro comportamentos de referência. Combine-os com a direção do argumento.", items: [
          ["§e^x§ em §-\\infty§", "Tende a 0."],
          ["§e^x§ em §+\\infty§", "Cresce sem limite."],
          ["§\\ln x§ em §0^+§", "Tende a §-\\infty§."],
          ["§\\arctan x§ em §\\pm\\infty§", "Tende a §\\pm\\pi/2§."],
        ] },
      },
      {
        title: "Compare as ordens de crescimento",
        paragraphs: [
          "Quando x vai para §+\\infty§, logaritmos, potências e exponenciais crescem sem limite, mas em ritmos muito diferentes. Para quaisquer constantes §p>0§ e §a>1§, valem §\\ln x/x^p\\to0§ e §x^p/a^x\\to0§. Em palavras, qualquer potência positiva vence o logaritmo, e qualquer exponencial de base maior que 1 vence qualquer potência, por maior que seja o expoente.",
          "Esses resultados saem da regra de L’Hôpital, vista na parte “Retome os limites após aprender a regra de L’Hôpital”. Em §x^{10}/e^x§, cada aplicação reduz o grau do numerador em uma unidade e mantém §e^x§ no denominador. Depois de dez etapas, sobra §10!/e^x§, que tende a zero. Uma tabela pode enganar nesse caso, pois §x^{10}§ ainda supera §e^x§ em §x=30§. A vitória da exponencial só aparece mais adiante.",
          "Na prática, identifique o termo dominante do numerador e o do denominador e divida tudo pelo que cresce mais rápido. As parcelas mais lentas viram quocientes que tendem a zero. É o mesmo raciocínio usado nas funções racionais, agora com uma escala de comparação mais ampla.",
        ],
        example: {
          title: "Divida pelo termo mais rápido",
          prompt: "Calcule §\\lim_{x\\to\\infty}\\frac{e^x+x^3}{2e^x-\\ln x}§.",
          steps: [
            "Em cima e embaixo, o termo dominante é §e^x§. Divida as duas partes por ele.",
            "A fração vira §\\frac{1+x^3/e^x}{2-(\\ln x)/e^x}§.",
            "Pela hierarquia, §x^3/e^x\\to0§ e §(\\ln x)/e^x\\to0§.",
            "O limite é §1/2§.",
          ],
        },
        visual: { kind: "choices", caption: "Escolha um par e veja qual termo domina quando x vai para +∞.", options: [
          { label: "§\\ln x§ contra §\\sqrt x§", result: "§\\sqrt x§ domina", detail: "§\\ln x/\\sqrt x\\to0§, como mostrou a regra de L’Hôpital." },
          { label: "§x^{10}§ contra §e^x§", result: "§e^x§ domina", detail: "Dez aplicações da regra deixam §10!/e^x§, que tende a zero." },
          { label: "§2^x§ contra §3^x§", result: "§3^x§ domina", detail: "O quociente é §(2/3)^x§, que tende a zero." },
        ] },
      },
      {
        title: "Elimine o módulo pelos dois lados",
        paragraphs: [
          "O módulo é uma função por partes: §|u|=u§ quando §u\\ge0§ e §|u|=-u§ quando §u<0§. Perto de um ponto em que a expressão interna zera, cada lado pode usar uma regra diferente. Por isso, limites com módulo pedem quase sempre um cálculo pela esquerda e outro pela direita, cada um feito com a fórmula sem barras correspondente àquele lado.",
          "Determine o sinal da expressão interna em cada lado com um ponto de teste ou com um quadro de sinais. Se a expressão não troca de sinal perto do ponto, o módulo vira uma única fórmula e a análise lateral é desnecessária. Se a expressão interna tende a um número, a continuidade do módulo permite escrever §\\lim|u|=|\\lim u|§, sem separar casos.",
        ],
        example: {
          title: "Um quociente que salta",
          prompt: "Calcule os limites laterais de §\\frac{|x^2-4|}{x-2}§ em 2.",
          steps: [
            "Fatore: §|x^2-4|=|x-2|\\,|x+2|§. Perto de 2, §x+2§ é positivo e §|x+2|=x+2§.",
            "Pela direita, §|x-2|=x-2§ e a expressão vale §x+2§, que tende a 4.",
            "Pela esquerda, §|x-2|=-(x-2)§ e a expressão vale §-(x+2)§, que tende a −4.",
            "Os limites laterais diferem, então o limite bilateral não existe.",
          ],
        },
      },
      {
        title: "Racionalize também quando x vai ao infinito",
        paragraphs: [
          "A diferença §\\sqrt{x^2+6x}-x§ tem forma §\\infty-\\infty§ quando x vai para §+\\infty§: os dois termos crescem e quase se anulam. O conjugado transforma a diferença em um quociente, como no caso de raízes perto de um ponto. Depois disso, divida numerador e denominador pela potência dominante, lembrando que §\\sqrt{x^2}=|x|§.",
          "O sentido da aproximação pode mudar a resposta. Para x muito negativo, §\\sqrt{x^2+6x}§ é positivo e §-x§ também é positivo. Os dois termos se somam, não há cancelamento e a expressão cresce sem limite. Antes de procurar uma indeterminação, confira sempre o sinal de cada parcela na extremidade pedida.",
        ],
        example: {
          title: "Uma diferença com limite finito",
          prompt: "Calcule §\\lim_{x\\to+\\infty}(\\sqrt{x^2+6x}-x)§.",
          steps: [
            "Multiplique e divida por §\\sqrt{x^2+6x}+x§. O numerador vira §x^2+6x-x^2=6x§.",
            "A expressão fica §6x/(\\sqrt{x^2+6x}+x)§.",
            "Para §x>0§, divida por x: §6/(\\sqrt{1+6/x}+1)§.",
            "O denominador tende a 2 e o limite é 3. À direita, a curva §y=\\sqrt{x^2+6x}§ tem a assíntota inclinada §y=x+3§.",
          ],
        },
      },
    ],
    checks: [
      { prompt: "Calcule §\\lim_{x\\to\\infty}(1+1/(2x))^x§.", solution: "Escreva §[(1+1/(2x))^{2x}]^{1/2}§. O colchete tende a e, então o limite é §e^{1/2}=\\sqrt e§." },
      { prompt: "Calcule §\\lim_{x\\to0}(e^{5x}-1)/x§.", solution: "Escreva §5\\cdot(e^{5x}-1)/(5x)§. O quociente tende a 1 e o limite é 5." },
      { prompt: "Calcule §\\lim_{x\\to+\\infty}(\\sqrt{x^2+4x}-x)§.", solution: "O conjugado dá §4x/(\\sqrt{x^2+4x}+x)§. Dividindo por x, obtemos §4/(\\sqrt{1+4/x}+1)§, que tende a 2." },
      { prompt: "Calcule §\\lim_{x\\to\\infty}(3^x+x^5)/(3^x+2^x)§.", solution: "Divida por §3^x§: §(1+x^5/3^x)/(1+(2/3)^x)§. As parcelas extras tendem a zero, pois a exponencial vence a potência. O limite é 1." },
    ],
  },

  continuidade: {
    sections: [
      {
        title: "Reconheça as funções contínuas em seus domínios",
        paragraphs: [
          "Você não precisa refazer a definição para cada função elementar. Polinômios, funções racionais, raízes, exponenciais, logaritmos, seno, cosseno e as demais funções trigonométricas são contínuos em todos os pontos de seus domínios. As inversas trigonométricas, como §\\arcsin§ em §[-1,1]§ e §\\arctan§ em toda a reta, também são. Somas, produtos, quocientes e composições herdam a continuidade onde estão definidos.",
          "A continuidade das inversas tem uma justificativa geométrica. Se f é contínua e estritamente monótona em um intervalo, sua inversa é contínua no intervalo imagem. O gráfico da inversa é o reflexo do gráfico de f na reta §y=x§, e uma reflexão não cria rupturas. Isso explica de uma vez a continuidade de §\\ln x§, inversa de §e^x§, e a das funções arco.",
          "Assim, a pergunta prática sobre continuidade quase sempre vira uma pergunta sobre domínio. Liste as restrições de cada peça: denominadores não nulos, radicandos não negativos em raízes de índice par, logaritmandos positivos e argumentos de arco seno entre −1 e 1. A interseção dessas condições é o conjunto de continuidade.",
        ],
        example: {
          title: "Duas restrições de naturezas diferentes",
          prompt: "Determine onde §f(x)=\\tan x+\\arcsin(x/2)§ é contínua.",
          steps: [
            "O arco seno exige §-1\\le x/2\\le1§, isto é, §-2\\le x\\le2§.",
            "A tangente exclui os pontos em que §\\cos x=0§. Em §[-2,2]§, eles são §\\pm\\pi/2§, pois §\\pi/2\\approx1{,}57§.",
            "A função é contínua em §[-2,-\\pi/2)\\cup(-\\pi/2,\\pi/2)\\cup(\\pi/2,2]§. Nas pontas ±2, vale a continuidade lateral.",
          ],
        },
        visual: { kind: "cards", caption: "Cada família é contínua no próprio domínio. Procure as restrições.", items: [
          ["Racionais", "Exclua os zeros do denominador."],
          ["Raízes de índice par", "Exija radicando maior ou igual a zero."],
          ["Logaritmos", "Exija argumento positivo."],
          ["Arco seno e arco cosseno", "Exija argumento em §[-1,1]§."],
        ] },
      },
      {
        title: "Leve o limite para dentro de uma função contínua",
        paragraphs: [
          "Se §\\lim_{x\\to a}g(x)=L§ e f é contínua em L, então §\\lim_{x\\to a}f(g(x))=f(L)§. Você pode calcular primeiro o limite da parte interna, mesmo que ele exija simplificação, e só depois aplicar a função externa. A regra continua valendo quando x tende ao infinito, desde que a parte interna tenda a um número L.",
          "A hipótese recai sobre a função externa no valor L, e não sobre o ponto a. A parte interna pode até não estar definida em a. Se f não for contínua em L, a troca pode falhar. Com §f(u)=\\lfloor u\\rfloor§, o maior inteiro menor ou igual a u, e §g(x)=1-x^2§, temos §g(x)\\to1§ quando §x\\to0§, mas §g(x)<1§ para §x\\ne0§. As saídas compostas valem 0, enquanto §f(1)=1§.",
        ],
        example: {
          title: "Uma exponencial de um limite trigonométrico",
          prompt: "Calcule §\\lim_{x\\to0}e^{\\sin(3x)/x}§.",
          steps: [
            "O expoente tem forma §0/0§. Escreva §\\sin(3x)/x=3\\cdot\\sin(3x)/(3x)§, que tende a 3.",
            "A exponencial é contínua em 3.",
            "Logo o limite é §e^3§.",
          ],
        },
        extraExample: {
          title: "Um argumento que se estabiliza no infinito",
          prompt: "Calcule §\\lim_{x\\to\\infty}\\cos\\left(\\frac{\\pi x}{2x+1}\\right)§.",
          steps: [
            "O argumento é uma fração com graus iguais. Ele tende a §\\pi/2§, a razão entre os coeficientes líderes.",
            "O cosseno é contínuo em §\\pi/2§.",
            "Portanto, o limite é §\\cos(\\pi/2)=0§.",
          ],
        },
      },
      {
        title: "Escolha parâmetros que criem uma descontinuidade removível",
        paragraphs: [
          "Em §f(x)=(x^2+bx-6)/(x-2)§, o denominador zera em 2. Se o numerador tender a um número diferente de zero, o quociente cresce sem limite em módulo e nenhum valor em 2 resolve o problema. Um limite finito só é possível quando o numerador também zera no ponto. Essa condição necessária costuma determinar o parâmetro.",
          "Depois de impor o zero do numerador, fatore, cancele e calcule o limite. Esse número é o único valor que completa a extensão contínua. Em problemas com seno, o raciocínio é parecido: §\\sin(ax)/x§ tende a a quando x tende a zero, então exigir uma extensão contínua com §f(0)=6§ obriga §a=6§.",
        ],
        example: {
          title: "Um parâmetro que cria o fator comum",
          prompt: "Encontre b e o valor §f(2)§ que tornam contínua a função §f(x)=(x^2+bx-6)/(x-2)§, definida assim para §x\\ne2§.",
          steps: [
            "Para haver limite finito, o numerador deve zerar em 2: §4+2b-6=0§, logo §b=1§.",
            "Com §b=1§, o numerador é §(x-2)(x+3)§. Para §x\\ne2§, a função vale §x+3§.",
            "O limite em 2 é 5. Defina §f(2)=5§.",
            "Com outro valor de b, o numerador tenderia a §2b-2\\ne0§ e haveria um polo em 2.",
          ],
        },
      },
      {
        title: "Resolva equações sem fórmula pelo valor intermediário",
        paragraphs: [
          "Equações que misturam tipos de funções, como §\\cos x=x§ ou §e^x=3-x§, não se resolvem por manipulação algébrica. Reescreva-as como §g(x)=0§, passando tudo para um lado. Se g for contínua em um intervalo fechado e tiver sinais opostos nas pontas, o teorema do valor intermediário garante uma solução entre elas.",
          "Escolha pontas em que os valores sejam fáceis de calcular, como 0, 1 ou múltiplos de §\\pi§. Para provar unicidade, mostre que g é estritamente monótona no intervalo, por exemplo como soma de funções estritamente decrescentes. Depois, a bisseção localiza a solução com a precisão desejada.",
          "O teorema também prova que todo polinômio de grau ímpar tem raiz real. O termo líder domina nas duas extremidades e tem sinais opostos em §-\\infty§ e em §+\\infty§. Assim existem entradas com saídas negativas e entradas com saídas positivas, e entre elas há um zero.",
        ],
        example: {
          title: "Onde o cosseno encontra a reta",
          prompt: "Mostre que §\\cos x=x§ tem exatamente uma solução em §[0,\\pi/2]§.",
          steps: [
            "Defina §g(x)=\\cos x-x§, contínua em toda a reta.",
            "Temos §g(0)=1>0§ e §g(\\pi/2)=-\\pi/2<0§. Pelo teorema, há uma raiz no intervalo.",
            "Em §[0,\\pi/2]§, o cosseno decresce e §-x§ também decresce. A soma é estritamente decrescente e só pode zerar uma vez.",
            "A raiz fica perto de 0,739, como algumas etapas de bisseção confirmariam.",
          ],
        },
      },
      {
        title: "Aplique o valor intermediário a situações reais",
        paragraphs: [
          "O teorema não se limita a equações escritas. Ele vale para qualquer grandeza que varia continuamente, como temperatura, altitude ou posição. A estratégia é montar uma função diferença entre duas grandezas contínuas e mostrar que ela troca de sinal. O zero dessa diferença é o instante ou o lugar em que as grandezas coincidem.",
          "Deixe clara a hipótese de continuidade, pois ela é a parte física do argumento. Uma pessoa não salta de um ponto a outro de uma trilha, e uma temperatura não muda instantaneamente. Lembre também que o teorema prova a existência do instante procurado, mas não diz quando ele acontece nem se é único.",
        ],
        example: {
          title: "Uma trilha percorrida em dois dias",
          prompt: "Uma pessoa sobe uma trilha das 6h às 12h em um dia e desce pelo mesmo caminho das 6h às 12h no dia seguinte. Prove que existe um horário em que ela estava no mesmo ponto nos dois dias.",
          steps: [
            "Meça a posição pela distância ao longo da trilha a partir da base. Sejam §s_1(t)§ e §s_2(t)§ as posições no horário t de cada dia. Ambas são contínuas.",
            "Defina §d(t)=s_1(t)-s_2(t)§ em §[6,12]§. Às 6h, §d(6)=0-D<0§, em que D é o comprimento da trilha.",
            "Às 12h, §d(12)=D-0>0§. O teorema garante um horário §t_0§ com §d(t_0)=0§.",
            "Nesse horário as posições coincidem. O argumento funciona com qualquer ritmo, com paradas ou mesmo com recuos.",
          ],
        },
        visual: { kind: "choices", caption: "A conclusão depende de a grandeza variar continuamente.", options: [
          { label: "Temperatura de 18 °C às 6h e 30 °C às 14h", result: "Passou por 25 °C", detail: "A temperatura varia continuamente, e 25 está entre 18 e 30." },
          { label: "Preço de R$ 8 que passa a R$ 12", result: "Não precisa ter valido R$ 10", detail: "Preços mudam em saltos. Sem continuidade, o teorema não se aplica." },
          { label: "Altitude de um avião de 0 a 10 000 m", result: "Passou por 3000 m", detail: "A altitude é contínua no tempo, então todo valor intermediário é atingido." },
        ] },
      },
      {
        title: "Distinga continuidade à esquerda e à direita",
        paragraphs: [
          "Uma função é contínua à direita em a quando §\\lim_{x\\to a^+}f(x)=f(a)§, e contínua à esquerda quando o limite pela esquerda coincide com §f(a)§. Em um ponto interior, ser contínua equivale a ter as duas propriedades ao mesmo tempo. Em um salto, a função pode ser contínua de um lado e não do outro, conforme a regra que inclui o ponto.",
          "A função maior inteiro §\\lfloor x\\rfloor§ devolve o maior inteiro menor ou igual a x. Ela é constante entre inteiros consecutivos e salta uma unidade em cada inteiro. Como §\\lfloor n\\rfloor=n§ e os valores logo à direita de n também valem n, ela é contínua à direita em todo inteiro. Logo à esquerda de n, os valores são §n-1§, e a continuidade à esquerda falha.",
        ],
        example: {
          title: "A parte fracionária de um número",
          prompt: "Estude a continuidade de §f(x)=x-\\lfloor x\\rfloor§ em §x=2§.",
          steps: [
            "Temos §f(2)=2-2=0§.",
            "Para §2\\le x<3§, §\\lfloor x\\rfloor=2§ e §f(x)=x-2§. O limite pela direita é 0, igual a §f(2)§.",
            "Para §1\\le x<2§, §f(x)=x-1§. O limite pela esquerda é 1.",
            "A função é contínua à direita, mas não à esquerda. O gráfico tem forma de dente de serra, com salto de 1 em cada inteiro.",
          ],
        },
      },
    ],
    checks: [
      { prompt: "Escolha b para que §(x^2+bx+8)/(x+2)§ tenha descontinuidade removível em −2 e dê o valor da extensão contínua.", solution: "O numerador deve zerar em −2: §4-2b+8=0§, logo §b=6§. Então §x^2+6x+8=(x+2)(x+4)§ e o limite é §-2+4=2§. Defina o valor 2 no ponto." },
      { prompt: "Mostre que §e^x=3-x§ tem solução em §[0,1]§.", solution: "Seja §g(x)=e^x+x-3§, contínua. Temos §g(0)=-2<0§ e §g(1)=e-2>0§. Pelo teorema do valor intermediário, g zera no intervalo." },
      { prompt: "Calcule §\\lim_{x\\to0}\\cos(\\pi\\sin x/x)§.", solution: "O argumento tende a §\\pi§ porque §\\sin x/x\\to1§. O cosseno é contínuo em §\\pi§, então o limite é §\\cos\\pi=-1§." },
      { prompt: "De que lado §\\lfloor x\\rfloor§ é contínua em §x=3§?", solution: "Só à direita. O valor é 3, o limite pela direita é 3 e o limite pela esquerda é 2." },
    ],
  },

  derivadas: {
    sections: [
      {
        title: "Complete a tabela das derivadas trigonométricas",
        paragraphs: [
          "Com as derivadas do seno e do cosseno e a regra do quociente, você obtém as outras funções trigonométricas. Escrevendo §\\sec x=1/\\cos x§, a derivada é §\\sin x/\\cos^2 x§, que se reorganiza como §\\sec x\\tan x§. Do mesmo modo, §(\\csc x)'=-\\csc x\\cot x§ e §(\\cot x)'=-\\csc^2 x§. Com a tangente, que você já conhece, a tabela fica completa.",
          "Há um padrão útil para memorizar. As funções cujo nome começa por co, isto é, cosseno, cotangente e cossecante, têm derivadas com sinal negativo, e cada uma espelha a derivada da função sem o prefixo. Todas as fórmulas valem apenas onde a função está definida, ou seja, fora dos zeros do denominador correspondente.",
        ],
        example: {
          title: "Um produto com secante",
          prompt: "Derive §f(x)=x\\sec x§ e calcule §f'(0)§.",
          steps: [
            "Pela regra do produto, §f'(x)=\\sec x+x\\sec x\\tan x§.",
            "Coloque em evidência: §f'(x)=\\sec x\\,(1+x\\tan x)§, válido onde §\\cos x\\ne0§.",
            "Em zero, §\\sec0=1§ e §\\tan0=0§. Logo §f'(0)=1§.",
          ],
        },
        visual: { kind: "cards", caption: "Derivadas das quatro funções trigonométricas restantes, em radianos.", items: [
          ["§(\\tan x)'§", "§\\sec^2 x§"],
          ["§(\\sec x)'§", "§\\sec x\\tan x§"],
          ["§(\\cot x)'§", "§-\\csc^2 x§"],
          ["§(\\csc x)'§", "§-\\csc x\\cot x§"],
        ] },
      },
      {
        title: "Derive as funções trigonométricas inversas",
        paragraphs: [
          "Para derivar §y=\\arcsin x§, escreva §\\sin y=x§ com §-\\pi/2\\le y\\le\\pi/2§ e derive implicitamente: §\\cos y\\cdot y'=1§. Nesse intervalo, o cosseno é não negativo, então §\\cos y=\\sqrt{1-\\sin^2y}=\\sqrt{1-x^2}§. Para §-1<x<1§, resulta §(\\arcsin x)'=1/\\sqrt{1-x^2}§. Nas pontas ±1, a tangente é vertical e não há derivada finita.",
          "O mesmo método dá §(\\arctan x)'=1/(1+x^2)§ em toda a reta, usando §\\sec^2y=1+\\tan^2y§. Para o arco cosseno, a derivada é o oposto da derivada do arco seno, porque §\\arcsin x+\\arccos x=\\pi/2§. Com argumentos compostos, multiplique pela derivada interna, como em qualquer aplicação da regra da cadeia.",
          "Repare que essas derivadas são algébricas, embora as funções sejam trigonométricas. Esse fato explica por que a arco tangente aparece ao integrar §1/(1+x^2)§ e o arco seno aparece ao integrar §1/\\sqrt{1-x^2}§. Lidas ao contrário, as fórmulas mostram que uma fração racional simples pode ter primitiva fora da família dos polinômios e logaritmos. Por isso vale a pena guardar as três derivadas junto com as derivadas de potências e exponenciais.",
        ],
        example: {
          title: "Uma inversa com argumento escalado",
          prompt: "Derive §f(x)=\\arcsin(x/3)§.",
          steps: [
            "A regra externa dá §1/\\sqrt{1-x^2/9}§. A cadeia multiplica por §1/3§.",
            "Simplifique: §\\frac{1}{3\\sqrt{1-x^2/9}}=\\frac{1}{\\sqrt{9-x^2}}§.",
            "A fórmula vale em §-3<x<3§.",
          ],
        },
        extraExample: {
          title: "Uma soma com derivada zero",
          prompt: "Derive §g(x)=\\arctan x+\\arctan(1/x)§ para §x\\ne0§ e interprete.",
          steps: [
            "A segunda parcela dá §\\frac{1}{1+1/x^2}\\cdot\\left(-\\frac{1}{x^2}\\right)=-\\frac{1}{x^2+1}§.",
            "Somando com §1/(1+x^2)§, obtemos §g'(x)=0§ em cada intervalo do domínio.",
            "Logo g é constante em cada lado de zero. Avaliando em 1 e em −1, vale §\\pi/2§ para §x>0§ e §-\\pi/2§ para §x<0§.",
          ],
        },
      },
      {
        title: "Use a derivação logarítmica",
        paragraphs: [
          "Quando uma função é um longo produto ou quociente de potências, aplicar o logaritmo antes de derivar simplifica a conta. Em um intervalo em que §y>0§, as propriedades do logaritmo transformam produtos em somas e potências em fatores. Derivando §\\ln y§ pela cadeia, aparece §y'/y§ no lado esquerdo. Basta então multiplicar o resultado pela própria função.",
          "A técnica é indispensável quando base e expoente variam, como em §x^{\\sin x}§. Nem a regra da potência nem a da exponencial se aplicam a esse formato. Com o logaritmo, §\\ln y=\\sin x\\ln x§, e a regra do produto resolve a derivada. Se a função assumir valores negativos, use §\\ln|y|§: a expressão de §y'/y§ continua a mesma onde §y\\ne0§.",
        ],
        example: {
          title: "Um quociente de três potências",
          prompt: "Calcule §y'(0)§ para §y=\\frac{(x+1)^2(x+2)^3}{(x+3)^4}§.",
          steps: [
            "Perto de zero, y é positivo. Tome logaritmos: §\\ln y=2\\ln(x+1)+3\\ln(x+2)-4\\ln(x+3)§.",
            "Derive: §y'/y=\\frac{2}{x+1}+\\frac{3}{x+2}-\\frac{4}{x+3}§.",
            "Em zero, §y(0)=8/81§ e §y'/y=2+3/2-4/3=13/6§.",
            "Logo §y'(0)=\\frac{8}{81}\\cdot\\frac{13}{6}=\\frac{52}{243}§.",
          ],
        },
        extraExample: {
          title: "Base e expoente variáveis",
          prompt: "Derive §y=x^{\\sin x}§ para §x>0§.",
          steps: [
            "Tome logaritmos: §\\ln y=\\sin x\\,\\ln x§.",
            "Derive os dois lados: §y'/y=\\cos x\\ln x+\\sin x/x§.",
            "Multiplique por y: §y'=x^{\\sin x}\\left(\\cos x\\ln x+\\frac{\\sin x}{x}\\right)§.",
          ],
        },
      },
      {
        title: "Encontre padrões nas derivadas de ordem superior",
        paragraphs: [
          "Derivando repetidamente, escrevemos §f'''§ ou §f^{(n)}§ para a derivada de ordem n. Um polinômio de grau k perde um grau a cada etapa, então §f^{(k)}§ é constante e todas as derivadas a partir da ordem §k+1§ são nulas. Exponenciais e senos nunca se anulam dessa forma e costumam formar padrões que você descobre calculando poucas derivadas.",
          "Para §e^{ax}§, cada derivada multiplica por a, logo §(e^{ax})^{(n)}=a^ne^{ax}§. O seno repete um ciclo de quatro etapas: cosseno, menos seno, menos cosseno e seno de novo. Basta olhar o resto da divisão de n por 4. Para §1/(1-x)§, cada etapa acrescenta um fator ao numerador e aumenta o expoente do denominador, produzindo §n!/(1-x)^{n+1}§.",
          "Ao propor um padrão, confira os primeiros casos e, se possível, mostre que derivar a fórmula de ordem n produz a fórmula de ordem §n+1§. Essa verificação é um argumento por indução e transforma uma suspeita em uma prova. Em §1/(1-x)§, por exemplo, derivar §n!(1-x)^{-(n+1)}§ produz §n!(n+1)(1-x)^{-(n+2)}§, que é exatamente §(n+1)!/(1-x)^{n+2}§, a fórmula da ordem seguinte.",
        ],
        example: {
          title: "Use o ciclo do seno",
          prompt: "Calcule a derivada de ordem 27 de §\\sin x§.",
          steps: [
            "As derivadas formam o ciclo §\\cos x§, §-\\sin x§, §-\\cos x§, §\\sin x§, que se repete a cada quatro ordens.",
            "Como §27=4\\cdot6+3§, a ordem 27 ocupa a mesma posição da ordem 3.",
            "Logo §(\\sin x)^{(27)}=-\\cos x§.",
          ],
        },
        extraExample: {
          title: "Um fatorial que aparece",
          prompt: "Encontre §f^{(4)}(x)§ para §f(x)=1/(1-x)§.",
          steps: [
            "Escreva §f=(1-x)^{-1}§. Cada derivada multiplica pelo expoente negativo e pelo fator −1 da cadeia, e os dois sinais se cancelam.",
            "Obtemos §f'=(1-x)^{-2}§, §f''=2(1-x)^{-3}§ e §f'''=6(1-x)^{-4}§.",
            "A quarta derivada é §24(1-x)^{-5}=4!/(1-x)^5§.",
          ],
        },
      },
      {
        title: "Leia o gráfico de f para esboçar o de f′",
        paragraphs: [
          "Você pode desenhar o gráfico da derivada sem fórmula, apenas observando inclinações. Onde f cresce, o gráfico de §f'§ fica acima do eixo. Onde f decresce, fica abaixo. Nos topos e fundos com tangente horizontal, §f'§ cruza ou toca o eixo. Um trecho muito íngreme de f corresponde a um valor de §f'§ com módulo grande.",
          "Os defeitos de f também aparecem em §f'§. Em um canto, a derivada não existe e seu gráfico costuma saltar. Em uma tangente vertical, o gráfico de §f'§ cresce sem limite em módulo. O raciocínio inverso também funciona: conhecendo o sinal de §f'§, você sabe onde f sobe e desce, mas não sabe a altura de f, que depende de uma constante.",
        ],
        example: {
          title: "De uma cúbica a uma parábola",
          prompt: "O gráfico de §f(x)=x^3-3x§ sobe até §x=-1§, desce até §x=1§ e volta a subir. Descreva o gráfico de §f'§.",
          steps: [
            "As tangentes horizontais em −1 e em 1 dão zeros de §f'§.",
            "Entre −1 e 1, f desce, então §f'§ é negativa. Fora desse intervalo, é positiva.",
            "A descida é mais íngreme em zero, onde a inclinação vale −3. O gráfico de §f'§ é uma parábola com vértice em §(0,-3)§.",
            "De fato, §f'(x)=3x^2-3§ confirma a leitura.",
          ],
        },
        visual: { kind: "choices", caption: "Leia uma característica de f e conclua o que ela diz sobre f′.", options: [
          { label: "f crescente em um intervalo", result: "§f'\\ge0§ onde existir", detail: "As secantes têm inclinação positiva, e o limite delas não pode ser negativo." },
          { label: "Tangente horizontal em c", result: "§f'(c)=0§", detail: "O gráfico de f′ toca ou cruza o eixo nessa entrada." },
          { label: "Canto em c", result: "§f'(c)§ não existe", detail: "As inclinações laterais diferem, e o gráfico de f′ salta." },
        ] },
      },
      {
        title: "Interprete a derivada como taxa marginal",
        paragraphs: [
          "Em economia, a derivada do custo total §C(q)§ em relação à quantidade produzida chama-se custo marginal. Ela estima quanto custa produzir uma unidade a mais a partir do nível atual, pois a linearização dá §C(q+1)-C(q)\\approx C'(q)\\cdot1§. A mesma leitura vale para a receita marginal e para o lucro marginal.",
          "A unidade da derivada é reais por unidade produzida. Um custo marginal crescente indica que cada nova unidade sai mais cara que a anterior, o que costuma ocorrer quando a capacidade da fábrica fica saturada. O lucro tende a ser máximo quando a receita marginal iguala o custo marginal, que é a condição §L'(q)=0§ escrita na linguagem econômica.",
        ],
        example: {
          title: "Compare a estimativa com o custo exato",
          prompt: "Uma fábrica tem custo §C(q)=0{,}01q^2+5q+200§ reais. Estime e calcule o custo da unidade 101.",
          steps: [
            "Derive: §C'(q)=0{,}02q+5§. Em §q=100§, o custo marginal é 7 reais por unidade.",
            "O custo exato da unidade adicional é §C(101)-C(100)=7{,}01§ reais.",
            "A estimativa erra apenas 1 centavo, porque a curva de custo é quase reta no intervalo de uma unidade.",
          ],
        },
      },
    ],
    checks: [
      { prompt: "Derive §\\arctan(3x)§.", solution: "Pela cadeia, §\\frac{1}{1+(3x)^2}\\cdot3=\\frac{3}{1+9x^2}§." },
      { prompt: "Calcule a derivada de §\\sec x§ em §\\pi/4§.", solution: "§(\\sec x)'=\\sec x\\tan x§. Em §\\pi/4§, vale §\\sqrt2\\cdot1=\\sqrt2§." },
      { prompt: "Derive §y=x^{\\ln x}§ para §x>0§.", solution: "§\\ln y=(\\ln x)^2§. Derivando, §y'/y=2\\ln x/x§. Logo §y'=2x^{\\ln x}\\ln x/x§." },
      { prompt: "Qual é a quarta derivada de §\\sin(2x)§?", solution: "Cada derivada multiplica por 2 e avança uma posição no ciclo do seno. Após quatro etapas, o ciclo volta ao seno com fator §2^4§. O resultado é §16\\sin(2x)§." },
    ],
  },

  "aplicacoes-da-derivada": {
    sections: [
      {
        title: "Aplique L’Hôpital a produtos e diferenças",
        paragraphs: [
          "A regra de L’Hôpital trata quocientes das formas §0/0§ e §\\infty/\\infty§. Produtos do tipo §0\\cdot\\infty§ precisam ser reescritos antes. Mova um dos fatores para o denominador como recíproco, usando §fg=f/(1/g)§. Escolha a reescrita que torna as derivadas mais simples. Em geral, convém deixar um logaritmo no numerador, porque sua derivada é mais simples que a de seu recíproco.",
          "Diferenças §\\infty-\\infty§ pedem um denominador comum ou uma fatoração que produza um quociente. Depois da reescrita, confirme a forma, aplique a regra quantas vezes forem necessárias e simplifique entre as etapas. Simplificar cedo evita derivadas que ficam maiores a cada aplicação. Se o quociente das derivadas não tiver limite, a regra não decide nada, e outro método precisa ser usado.",
        ],
        example: {
          title: "Um produto com logaritmo perto de zero",
          prompt: "Calcule §\\lim_{x\\to0^+}x\\ln x§.",
          steps: [
            "A forma é §0\\cdot(-\\infty)§. Escreva §x\\ln x=\\frac{\\ln x}{1/x}§, de forma §-\\infty/\\infty§.",
            "As derivadas são §1/x§ e §-1/x^2§. O novo quociente é §\\frac{1/x}{-1/x^2}=-x§.",
            "Como §-x\\to0§, o limite original é zero. O fator x vence o logaritmo.",
          ],
        },
        extraExample: {
          title: "Uma diferença de frações",
          prompt: "Calcule §\\lim_{x\\to0}\\left(\\frac1x-\\frac{1}{e^x-1}\\right)§.",
          steps: [
            "Com denominador comum, a expressão vira §\\frac{e^x-1-x}{x(e^x-1)}§, de forma §0/0§.",
            "Derivando, obtemos §\\frac{e^x-1}{e^x-1+xe^x}§, ainda de forma §0/0§.",
            "Derivando de novo, obtemos §\\frac{e^x}{2e^x+xe^x}§, que tende a §1/2§.",
          ],
        },
        visual: { kind: "choices", caption: "Antes de derivar, confirme se a regra se aplica.", options: [
          { label: "§\\lim_{x\\to0}\\frac{x+1}{x+2}§", result: "Não use a regra", detail: "Não há indeterminação: a substituição dá §1/2§. Derivar daria 1, um valor errado." },
          { label: "§\\lim_{x\\to\\infty}\\frac{x+\\sin x}{x}§", result: "A regra não decide", detail: "O quociente das derivadas, §1+\\cos x§, oscila. Dividindo por x, o limite é 1." },
          { label: "§\\lim_{x\\to0}\\frac{\\sin x}{x^2+x}§", result: "Use a regra", detail: "A forma é §0/0§ e as derivadas dão §\\cos x/(2x+1)\\to1§." },
        ] },
      },
      {
        title: "Trate potências indeterminadas com logaritmo",
        paragraphs: [
          "As formas §1^\\infty§, §0^0§ e §\\infty^0§ aparecem quando base e expoente variam ao mesmo tempo. Para §y=f(x)^{g(x)}§ com base positiva, calcule primeiro o limite de §\\ln y=g(x)\\ln f(x)§. Esse produto tem forma §0\\cdot\\infty§ nos três casos e pode ser reescrito como quociente para usar L’Hôpital.",
          "Se §\\ln y§ tende a L, a continuidade da exponencial garante que y tende a §e^L§. Não esqueça essa última etapa, pois o limite do logaritmo ainda não é a resposta. Se §\\ln y§ tende a §-\\infty§, então y tende a zero. Se §\\ln y§ cresce sem limite, y também cresce sem limite.",
        ],
        example: {
          title: "Uma base que tende a 1",
          prompt: "Calcule §\\lim_{x\\to0}(\\cos x)^{1/x^2}§.",
          steps: [
            "A forma é §1^\\infty§. Perto de zero, §\\cos x>0§ e §\\ln y=\\frac{\\ln(\\cos x)}{x^2}§, de forma §0/0§.",
            "Derivando, obtemos §\\frac{-\\tan x}{2x}§, que tende a §-1/2§ porque §\\tan x/x\\to1§.",
            "Logo §\\ln y\\to-1/2§ e §y\\to e^{-1/2}=1/\\sqrt e§.",
          ],
        },
        extraExample: {
          title: "Zero elevado a zero",
          prompt: "Calcule §\\lim_{x\\to0^+}x^x§.",
          steps: [
            "Com §y=x^x§, temos §\\ln y=x\\ln x§.",
            "Pelo exemplo da seção anterior, §x\\ln x\\to0§.",
            "Assim §y\\to e^0=1§. A forma §0^0§ não tem valor fixo, mas neste caso o limite é 1.",
          ],
        },
      },
      {
        title: "Siga um roteiro completo para esboçar o gráfico",
        paragraphs: [
          "Um esboço confiável reúne informações de várias aulas. Comece pelo domínio, pelas interseções com os eixos e por simetrias, como paridade. Em seguida, estude os limites nas pontas do domínio e perto das entradas excluídas para encontrar assíntotas horizontais, verticais ou inclinadas. Essas informações dão o esqueleto do desenho.",
          "Depois, use o sinal de §f'§ para obter os intervalos de crescimento e os extremos locais, e o sinal de §f''§ para a concavidade e as inflexões. Calcule as alturas dos pontos especiais. Por fim, ligue as informações da esquerda para a direita, respeitando as assíntotas. Se algum dado parecer contraditório, como uma função crescente que precisa descer até uma assíntota, revise o cálculo antes de desenhar.",
        ],
        example: {
          title: "Um produto de polinômio e exponencial",
          prompt: "Esboce §f(x)=xe^{-x}§.",
          steps: [
            "O domínio é a reta toda e o gráfico passa pela origem. Quando §x\\to+\\infty§, §x/e^x\\to0§, então §y=0§ é assíntota à direita. Quando §x\\to-\\infty§, f tende a §-\\infty§.",
            "A derivada é §f'(x)=(1-x)e^{-x}§. A função cresce antes de 1 e decresce depois, com máximo §f(1)=1/e\\approx0{,}37§.",
            "A segunda derivada é §f''(x)=(x-2)e^{-x}§. O gráfico é côncavo para baixo antes de 2 e para cima depois.",
            "A inflexão fica em §(2,\\,2e^{-2})§, com altura perto de §0{,}27§. A curva sobe da esquerda, atinge o topo em 1 e se achata sobre o eixo.",
          ],
        },
        extraExample: {
          title: "Uma função racional com três assíntotas",
          prompt: "Esboce §g(x)=x^2/(x^2-4)§.",
          steps: [
            "O domínio exclui ±2 e a função é par. Nas duas pontas, g tende a 1, então §y=1§ é assíntota horizontal.",
            "Perto de 2, o numerador tende a 4. O denominador é negativo à esquerda e positivo à direita, dando §-\\infty§ e §+\\infty§. Em −2, pela simetria, o lado de fora vai para §+\\infty§ e o de dentro para §-\\infty§.",
            "A derivada §g'(x)=-8x/(x^2-4)^2§ muda de positiva para negativa em zero. Há máximo local §g(0)=0§.",
            "A segunda derivada §8(3x^2+4)/(x^2-4)^3§ é negativa em §(-2,2)§ e positiva fora. Não há inflexão, pois a troca de concavidade ocorre só nas assíntotas.",
          ],
        },
        visual: { kind: "cards", caption: "Um roteiro em quatro etapas para esboçar gráficos.", items: [
          ["1. Domínio e simetria", "Exclusões, paridade e interseções com os eixos."],
          ["2. Assíntotas", "Limites nas pontas e perto das entradas excluídas."],
          ["3. Sinal de f′", "Crescimento, decrescimento e extremos locais."],
          ["4. Sinal de f″", "Concavidade e pontos de inflexão."],
        ] },
      },
      {
        title: "Propague erros de medida com diferenciais",
        paragraphs: [
          "A diferencial reescreve a linearização em uma notação compacta. Se §y=f(x)§ e dx é uma pequena variação da entrada, define-se §dy=f'(x)\\,dx§. Enquanto §\\Delta y§ é a variação exata da saída, dy é a variação ao longo da reta tangente. Para dx pequeno, as duas ficam próximas, e dy é muito mais fácil de calcular.",
          "Em medições, dx representa a incerteza do instrumento e dy estima a incerteza propagada para uma grandeza calculada. O erro relativo §dy/y§ costuma ser mais informativo que o absoluto. Para potências §y=kx^n§, vale §dy/y=n\\,dx/x§: o erro relativo da entrada é multiplicado pelo expoente. Por isso, medir com cuidado é mais importante quando a fórmula eleva a medida a uma potência alta.",
        ],
        example: {
          title: "O volume de um cubo medido com régua",
          prompt: "A aresta de um cubo mede 10 cm, com erro possível de 0,1 cm. Estime o erro no volume.",
          steps: [
            "Com §V=x^3§, temos §dV=3x^2\\,dx=3(100)(0{,}1)=30§ cm³.",
            "O volume calculado é 1000 cm³, então o erro relativo é cerca de §30/1000=3\\%§.",
            "O erro relativo da aresta era 1%. O expoente 3 triplicou esse valor, como prevê §dV/V=3\\,dx/x§.",
          ],
        },
        extraExample: {
          title: "O período de um pêndulo",
          prompt: "O período de um pêndulo simples é §T=2\\pi\\sqrt{L/g}§. Se o comprimento L for medido com erro relativo de 2%, qual é o erro relativo em T?",
          steps: [
            "Como g é constante, T é proporcional a §L^{1/2}§.",
            "Pela regra das potências, §dT/T=\\tfrac12\\,dL/L§.",
            "O erro relativo do período é cerca de 1%.",
          ],
        },
      },
      {
        title: "Resolva problemas clássicos de otimização",
        paragraphs: [
          "Muitos problemas de otimização seguem o mesmo roteiro: desenhe a situação, nomeie as variáveis, escreva a quantidade a otimizar e use as restrições para deixá-la em uma única variável. O domínio físico, como comprimentos positivos ou cortes menores que a folha, precisa ser registrado, pois um extremo pode ocorrer em uma ponta.",
          "Em uma caixa feita de uma folha quadrada, cortar quadrados maiores nos cantos aumenta a altura e diminui a base. O volume começa em zero, cresce e volta a zero, então há um máximo interno. Em uma lata cilíndrica com volume fixo, um raio pequeno exige uma altura enorme e um raio grande exige tampas enormes. O material gasto é mínimo em um raio intermediário.",
        ],
        example: {
          title: "A caixa sem tampa de maior volume",
          prompt: "De uma folha quadrada de 12 cm de lado, cortam-se quadrados de lado x nos cantos e dobram-se as abas. Qual x dá o maior volume?",
          steps: [
            "A base tem lado §12-2x§ e a altura é x. O volume é §V(x)=x(12-2x)^2§ em §0<x<6§.",
            "Derivando e fatorando, §V'(x)=12(x-2)(x-6)§. No domínio, o único ponto crítico é §x=2§.",
            "§V'§ é positiva antes de 2 e negativa depois, então há máximo.",
            "O corte ideal é de 2 cm, e o volume máximo é §V(2)=2\\cdot8^2=128§ cm³.",
          ],
        },
        extraExample: {
          title: "A lata de 1 litro com menos material",
          prompt: "Uma lata cilíndrica fechada deve ter 1000 cm³. Que raio minimiza a área total?",
          steps: [
            "A restrição §\\pi r^2h=1000§ dá §h=1000/(\\pi r^2)§. A área é §A(r)=2\\pi r^2+2000/r§ para §r>0§.",
            "Derive: §A'(r)=4\\pi r-2000/r^2§. Ela zera quando §r^3=500/\\pi§, ou seja, §r\\approx5{,}42§ cm.",
            "§A'§ é negativa antes e positiva depois, então há mínimo. Nesse raio, §h=2r\\approx10{,}84§ cm: a altura ótima é igual ao diâmetro.",
          ],
        },
      },
      {
        title: "Recupere o movimento a partir da aceleração",
        paragraphs: [
          "O processo inverso da derivação permite reconstruir um movimento. Se a aceleração é conhecida, uma primitiva dá a velocidade, e uma primitiva da velocidade dá a posição. Cada etapa introduz uma constante arbitrária, então você precisa de duas informações, normalmente a velocidade inicial e a posição inicial.",
          "Perto da superfície da Terra, desprezando a resistência do ar, a aceleração vertical é constante e vale cerca de §-9{,}8§ m/s², com o eixo apontando para cima. Dessa única informação saem as fórmulas de lançamento vertical, sem precisar memorizá-las. A altura máxima ocorre quando a velocidade zera, e o retorno ao solo ocorre quando a posição volta a zero.",
        ],
        example: {
          title: "Uma bola lançada para cima",
          prompt: "Uma bola é lançada do solo para cima a 19,6 m/s. Encontre a altura máxima e o instante em que ela volta ao solo.",
          steps: [
            "Integre §a(t)=-9{,}8§: §v(t)=-9{,}8t+C_1§. A condição §v(0)=19{,}6§ dá §C_1=19{,}6§.",
            "Integre de novo: §s(t)=-4{,}9t^2+19{,}6t+C_2§, com §s(0)=0§, então §C_2=0§.",
            "A velocidade zera em §t=2§ s, e a altura máxima é §s(2)=-19{,}6+39{,}2=19{,}6§ m.",
            "A posição volta a zero quando §4{,}9t(4-t)=0§, ou seja, em §t=4§ s.",
          ],
        },
      },
    ],
    checks: [
      { prompt: "Calcule §\\lim_{x\\to0^+}x^2\\ln x§.", solution: "Escreva §\\ln x/x^{-2}§, de forma §-\\infty/\\infty§. As derivadas dão §(1/x)/(-2x^{-3})=-x^2/2§, que tende a zero." },
      { prompt: "Calcule §\\lim_{x\\to0^+}(1+\\sin x)^{1/x}§.", solution: "Com §\\ln y=\\ln(1+\\sin x)/x§, de forma §0/0§, a regra dá §\\cos x/(1+\\sin x)\\to1§. Logo o limite é §e^1=e§." },
      { prompt: "De uma folha quadrada de 24 cm, cortam-se quadrados de lado x nos cantos para formar uma caixa sem tampa. Qual é o volume máximo?", solution: "§V(x)=x(24-2x)^2§ em §0<x<12§ e §V'(x)=12(x-4)(x-12)§. O máximo ocorre em §x=4§, com §V=4\\cdot16^2=1024§ cm³." },
      { prompt: "O raio de um disco mede 5 cm, com erro de 0,05 cm. Estime o erro na área e o erro relativo.", solution: "§dA=2\\pi r\\,dr=2\\pi(5)(0{,}05)=0{,}5\\pi§ cm², cerca de 1,57 cm². Como §A=25\\pi§, o erro relativo é 2%, o dobro do erro relativo do raio." },
    ],
  },

  integrais: {
    sections: [
      {
        title: "Amplie a tabela de primitivas",
        paragraphs: [
          "Cada fórmula de derivada lida ao contrário produz uma primitiva. Assim, §\\int e^x\\,dx=e^x+C§, §\\int\\cos x\\,dx=\\sin x+C§ e §\\int\\sin x\\,dx=-\\cos x+C§. Repare no sinal da última: a derivada de §-\\cos x§ é §\\sin x§. Da derivada da tangente vem §\\int\\sec^2x\\,dx=\\tan x+C§, e da derivada da secante vem §\\int\\sec x\\tan x\\,dx=\\sec x+C§. Cada uma dessas fórmulas vale em qualquer intervalo em que o integrando é contínuo.",
          "As inversas trigonométricas trazem duas primitivas algébricas importantes: §\\int dx/(1+x^2)=\\arctan x+C§ e §\\int dx/\\sqrt{1-x^2}=\\arcsin x+C§ em §(-1,1)§. Para uma exponencial de base §a>0§ com §a\\ne1§, a primitiva é §a^x/\\ln a+C§. Com a linearidade, essas fórmulas resolvem qualquer combinação de termos da tabela.",
          "Toda fórmula da tabela pode ser conferida derivando o resultado. Esse hábito pega os erros mais comuns, como trocar §-\\cos x§ por §\\cos x§ ou esquecer o fator §\\ln a§ em uma exponencial de outra base. Quando o argumento for linear, como em §\\cos(3x)§, a tabela continua servindo, mas é preciso dividir pelo coeficiente: §\\int\\cos(3x)\\,dx=\\sin(3x)/3+C§. A aula de técnicas de integração generaliza essa correção pela substituição.",
        ],
        example: {
          title: "Uma combinação de três famílias",
          prompt: "Calcule §\\int\\left(3\\cos x-2e^x+\\frac{4}{1+x^2}\\right)dx§.",
          steps: [
            "Integre termo a termo, conservando os coeficientes.",
            "Obtemos §3\\sin x-2e^x+4\\arctan x+C§.",
            "Derivando, voltamos a §3\\cos x-2e^x+4/(1+x^2)§.",
          ],
        },
        extraExample: {
          title: "A área sob um arco de seno",
          prompt: "Calcule §\\int_0^\\pi\\sin x\\,dx§.",
          steps: [
            "Uma primitiva é §-\\cos x§.",
            "O resultado é §-\\cos\\pi-(-\\cos0)=1+1=2§.",
            "O seno é não negativo em §[0,\\pi]§, então um arco de seno limita uma região de área 2.",
          ],
        },
        visual: { kind: "cards", caption: "Primitivas que saem da leitura inversa das derivadas.", items: [
          ["§\\int\\cos x\\,dx§", "§\\sin x+C§"],
          ["§\\int\\sin x\\,dx§", "§-\\cos x+C§"],
          ["§\\int\\sec^2x\\,dx§", "§\\tan x+C§"],
          ["§\\int\\frac{dx}{1+x^2}§", "§\\arctan x+C§"],
        ] },
      },
      {
        title: "Use fórmulas de somatório no limite das somas",
        paragraphs: [
          "Para calcular integrais de potências diretamente pela definição, você precisa somar potências de inteiros consecutivos. As fórmulas clássicas são §\\sum_{i=1}^n i=n(n+1)/2§, §\\sum_{i=1}^n i^2=n(n+1)(2n+1)/6§ e §\\sum_{i=1}^n i^3=[n(n+1)/2]^2§. Elas transformam uma soma com n parcelas em uma expressão fechada em n, cujo limite é fácil de calcular.",
          "O roteiro tem quatro etapas: escreva a largura §\\Delta x=(b-a)/n§, escreva o ponto amostral §x_i=a+i\\Delta x§, substitua na soma e aplique as fórmulas. Constantes que não dependem de i saem do somatório. O resultado confirma o teorema fundamental em casos simples e mostra, com números, que a integral é de fato um limite de somas.",
        ],
        example: {
          title: "A integral de x² pela definição",
          prompt: "Calcule §\\int_0^3x^2\\,dx§ usando extremos direitos.",
          steps: [
            "A largura é §3/n§ e o ponto i é §3i/n§. A soma é §\\sum_{i=1}^n(3i/n)^2(3/n)=\\frac{27}{n^3}\\sum_{i=1}^n i^2§.",
            "Pela fórmula, a soma vale §\\frac{27}{n^3}\\cdot\\frac{n(n+1)(2n+1)}{6}=\\frac{9(n+1)(2n+1)}{2n^2}§.",
            "Quando n cresce, §(n+1)(2n+1)/n^2\\to2§. O limite é §9\\cdot2/2=9§.",
            "O teorema fundamental confirma: §[x^3/3]_0^3=9§.",
          ],
        },
      },
      {
        title: "Aproveite a simetria de funções pares e ímpares",
        paragraphs: [
          "Uma função é par quando §f(-x)=f(x)§, e seu gráfico é simétrico em relação ao eixo y. É ímpar quando §f(-x)=-f(x)§, com gráfico simétrico em relação à origem. Em um intervalo simétrico §[-a,a]§, as áreas com sinal de uma função ímpar se cancelam, e as de uma função par se repetem nas duas metades.",
          "Assim, §\\int_{-a}^af=0§ para f ímpar e contínua, e §\\int_{-a}^af=2\\int_0^af§ para f par e contínua. Para usar a propriedade, separe o integrando em parcelas pares e ímpares. Potências pares, cosseno e módulo são pares. Potências ímpares, seno e tangente são ímpares. Um produto de duas funções de mesma paridade é par, e de paridades diferentes é ímpar.",
        ],
        example: {
          title: "Descarte as parcelas ímpares",
          prompt: "Calcule §\\int_{-2}^2(x^5-3x^3+x^2+\\sin x)\\,dx§.",
          steps: [
            "As parcelas §x^5§, §-3x^3§ e §\\sin x§ são ímpares e contribuem com zero.",
            "Resta a parcela par: §\\int_{-2}^2x^2\\,dx=2\\int_0^2x^2\\,dx§.",
            "O resultado é §2\\cdot8/3=16/3§.",
          ],
        },
        extraExample: {
          title: "Um produto ímpar",
          prompt: "Calcule §\\int_{-\\pi}^{\\pi}x^2\\sin x\\,dx§.",
          steps: [
            "§x^2§ é par e §\\sin x§ é ímpar, então o produto é ímpar.",
            "O intervalo é simétrico e o integrando é contínuo.",
            "A integral vale zero, sem precisar de integração por partes.",
          ],
        },
        visual: { kind: "choices", caption: "Identifique a paridade antes de integrar em [−a, a].", options: [
          { label: "f par", result: "§\\int_{-a}^af=2\\int_0^af§", detail: "As duas metades têm a mesma área com sinal." },
          { label: "f ímpar", result: "§\\int_{-a}^af=0§", detail: "A metade da esquerda é o oposto da metade da direita." },
          { label: "Nem par nem ímpar", result: "Separe as parcelas", detail: "Integre a parte par pela simetria e descarte a parte ímpar." },
        ] },
      },
      {
        title: "Integre um módulo dividindo nas raízes",
        paragraphs: [
          "Para calcular §\\int_a^b|f(x)|\\,dx§, encontre as raízes de f no intervalo e o sinal de f em cada trecho entre elas. Onde f é negativa, troque §|f|§ por §-f§. Onde é positiva, mantenha f. O resultado é uma soma de integrais comuns, cada uma com um integrando sem barras e uma primitiva conhecida.",
          "Esse cálculo responde a perguntas de área total e de distância percorrida, em que contribuições negativas não podem cancelar as positivas. Compare sempre com a integral sem módulo. A diferença entre as duas é o dobro da área das partes que estavam abaixo do eixo, o que serve como conferência rápida.",
        ],
        example: {
          title: "Uma parábola que cruza o eixo",
          prompt: "Calcule §\\int_0^3|x^2-1|\\,dx§.",
          steps: [
            "A raiz em §[0,3]§ é §x=1§. Em §[0,1]§, §x^2-1\\le0§ e o módulo é §1-x^2§.",
            "O primeiro trecho dá §\\int_0^1(1-x^2)\\,dx=2/3§.",
            "O segundo dá §\\int_1^3(x^2-1)\\,dx=[x^3/3-x]_1^3=6+2/3=20/3§.",
            "A soma é §22/3§. Sem o módulo, a integral seria 6, pois a parte §-2/3§ entraria subtraindo.",
          ],
        },
      },
      {
        title: "Aproxime com ponto médio e regra de Simpson",
        paragraphs: [
          "A regra do ponto médio usa n retângulos com altura no centro de cada subintervalo: §M_n=\\Delta x[f(m_1)+\\cdots+f(m_n)]§. Ela costuma errar menos que os trapézios com o mesmo n e, quando a concavidade não muda, erra no sentido contrário. A regra de Simpson troca os segmentos de reta por arcos de parábola que passam por três pontos consecutivos do gráfico.",
          "Com n par e §\\Delta x=(b-a)/n§, Simpson usa §S_n=\\frac{\\Delta x}{3}[f(x_0)+4f(x_1)+2f(x_2)+\\cdots+4f(x_{n-1})+f(x_n)]§. Os pesos alternam entre 4 e 2 no interior, e as pontas têm peso 1. A regra é exata para polinômios de grau até 3, o que explica sua grande precisão em funções suaves.",
        ],
        example: {
          title: "Três aproximações para ln 2",
          prompt: "Aproxime §\\int_1^2dx/x=\\ln2\\approx0{,}693147§ com §n=4§.",
          steps: [
            "Com §\\Delta x=0{,}25§, as alturas nos nós são 1; 0,8; 0,6667; 0,5714 e 0,5.",
            "Os trapézios dão §T_4\\approx0{,}697024§, uma estimativa acima, pois §1/x§ é côncava para cima.",
            "O ponto médio, com centros em 1,125; 1,375; 1,625 e 1,875, dá §M_4\\approx0{,}691220§, abaixo do valor.",
            "Simpson dá §\\frac{0{,}25}{3}[1+4(0{,}8)+2(0{,}6667)+4(0{,}5714)+0{,}5]\\approx0{,}693254§, com erro perto de §10^{-4}§.",
          ],
        },
        extraExample: {
          title: "Simpson exato em uma cúbica",
          prompt: "Use Simpson com §n=2§ em §\\int_0^2x^3\\,dx§.",
          steps: [
            "Os nós são 0, 1 e 2, com alturas 0, 1 e 8, e §\\Delta x=1§.",
            "A fórmula dá §\\frac13(0+4\\cdot1+8)=4§.",
            "O valor exato é §[x^4/4]_0^2=4§. A aproximação coincide porque o integrando tem grau 3.",
          ],
        },
      },
      {
        title: "Controle o erro das regras numéricas",
        paragraphs: [
          "Para garantir uma precisão sem conhecer o valor exato, use cotas de erro. Se §|f''|\\le K§ em §[a,b]§, o erro dos trapézios satisfaz §|E_T|\\le K(b-a)^3/(12n^2)§, e o do ponto médio tem metade dessa cota. Se §|f^{(4)}|\\le M§, o erro de Simpson satisfaz §|E_S|\\le M(b-a)^5/(180n^4)§.",
          "As potências de n mostram a diferença de eficiência. Dobrar n divide a cota dos trapézios e a do ponto médio por 4, e a de Simpson por 16. Para escolher n, resolva a desigualdade entre a cota e a tolerância desejada e arredonde para cima. Em Simpson, arredonde para o próximo número par.",
        ],
        example: {
          title: "Quantos subintervalos garantem a precisão?",
          prompt: "Determine n para aproximar §\\int_1^2dx/x§ com erro menor que §10^{-4}§.",
          steps: [
            "Temos §f''(x)=2/x^3\\le2§ e §f^{(4)}(x)=24/x^5\\le24§ em §[1,2]§.",
            "Nos trapézios, §2/(12n^2)<10^{-4}§ exige §n^2>1666{,}7§, logo §n\\ge41§.",
            "Em Simpson, §24/(180n^4)<10^{-4}§ exige §n^4>1333{,}3§, logo §n\\ge7§. Como n deve ser par, use §n=8§.",
            "Simpson precisa de bem menos pontos para garantir a mesma precisão.",
          ],
        },
      },
    ],
    checks: [
      { prompt: "Calcule §\\int_0^{\\pi/2}(\\cos x+2\\sin x)\\,dx§.", solution: "Uma primitiva é §\\sin x-2\\cos x§. Em §\\pi/2§ ela vale 1 e em zero vale −2. A integral é §1-(-2)=3§." },
      { prompt: "Calcule §\\int_{-1}^1(x^3+4x^2-x)\\,dx§ usando simetria.", solution: "As parcelas §x^3§ e §-x§ são ímpares e contribuem com zero. Resta §2\\int_0^14x^2\\,dx=8/3§." },
      { prompt: "Calcule §\\int_{-1}^2|x|\\,dx§.", solution: "Divida em zero. De −1 a 0 há um triângulo de área §1/2§ e de 0 a 2 um triângulo de área 2. O total é §5/2§." },
      { prompt: "Aproxime §\\int_0^1x^4\\,dx§ pela regra de Simpson com §n=2§ e compare com o valor exato.", solution: "Com §\\Delta x=1/2§, §S_2=\\frac16[0+4(1/16)+1]=5/24\\approx0{,}2083§. O valor exato é §1/5=0{,}2§. Há erro porque o grau do integrando é 4." },
    ],
  },

  "tecnicas-de-integracao": {
    sections: [
      {
        title: "Combine potências de tangente e secante",
        paragraphs: [
          "Em §\\int\\tan^mx\\sec^nx\\,dx§, a escolha depende da paridade dos expoentes. Se n é par e positivo, separe um fator §\\sec^2x§, escreva os demais com §\\sec^2x=1+\\tan^2x§ e use §u=\\tan x§. Se m é ímpar e §n\\ge1§, separe §\\sec x\\tan x§, escreva as tangentes restantes com §\\tan^2x=\\sec^2x-1§ e use §u=\\sec x§.",
          "Duas primitivas básicas completam o quadro: §\\int\\tan x\\,dx=\\ln|\\sec x|+C§ e §\\int\\sec x\\,dx=\\ln|\\sec x+\\tan x|+C§. A segunda pode ser conferida por derivação e aparece com frequência depois de substituições trigonométricas. Quando nenhuma regra de paridade se aplica, reescreva tudo em seno e cosseno e procure outra estratégia.",
        ],
        example: {
          title: "Uma potência par de secante",
          prompt: "Calcule §\\int\\tan^2x\\sec^4x\\,dx§.",
          steps: [
            "Separe §\\sec^2x§ e escreva o outro §\\sec^2x§ como §1+\\tan^2x§.",
            "Com §u=\\tan x§ e §du=\\sec^2x\\,dx§, a integral vira §\\int u^2(1+u^2)\\,du§.",
            "Integre e volte para x: §\\frac{\\tan^3x}{3}+\\frac{\\tan^5x}{5}+C§.",
          ],
        },
        extraExample: {
          title: "Uma potência ímpar de tangente",
          prompt: "Calcule §\\int\\tan^3x\\sec x\\,dx§.",
          steps: [
            "Separe §\\sec x\\tan x§ e escreva §\\tan^2x=\\sec^2x-1§.",
            "Com §u=\\sec x§ e §du=\\sec x\\tan x\\,dx§, a integral vira §\\int(u^2-1)\\,du§.",
            "O resultado é §\\frac{\\sec^3x}{3}-\\sec x+C§.",
          ],
        },
        visual: { kind: "cards", caption: "Escolha a substituição pela paridade dos expoentes.", items: [
          ["§\\sin^m\\cos^n§, m ímpar", "Separe §\\sin x§ e use §u=\\cos x§."],
          ["§\\sin^m\\cos^n§, ambos pares", "Reduza com as fórmulas de ângulo duplo."],
          ["§\\tan^m\\sec^n§, n par", "Separe §\\sec^2x§ e use §u=\\tan x§."],
          ["§\\tan^m\\sec^n§, m ímpar", "Separe §\\sec x\\tan x§ e use §u=\\sec x§."],
        ] },
      },
      {
        title: "Transforme produtos de senos e cossenos em somas",
        paragraphs: [
          "Quando os argumentos são diferentes, como em §\\sin(3x)\\cos x§, as regras de paridade não ajudam. As fórmulas de produto em soma resolvem o problema: §\\sin A\\cos B=\\frac12[\\sin(A-B)+\\sin(A+B)]§, §\\sin A\\sin B=\\frac12[\\cos(A-B)-\\cos(A+B)]§ e §\\cos A\\cos B=\\frac12[\\cos(A-B)+\\cos(A+B)]§. Elas vêm de somar ou subtrair as fórmulas de adição.",
          "Depois da troca, cada parcela é um seno ou um cosseno de argumento linear, com primitiva imediata. Esse cálculo é a base das séries de Fourier: para inteiros positivos distintos m e n, a integral de §\\sin(mx)\\sin(nx)§ em §[0,\\pi]§ é zero. Diz-se que essas funções são ortogonais nesse intervalo.",
        ],
        example: {
          title: "Argumentos 3x e x",
          prompt: "Calcule §\\int\\sin(3x)\\cos x\\,dx§.",
          steps: [
            "Com §A=3x§ e §B=x§, o integrando é §\\frac12[\\sin(2x)+\\sin(4x)]§.",
            "Integre cada parcela: §\\int\\sin(2x)\\,dx=-\\cos(2x)/2§ e §\\int\\sin(4x)\\,dx=-\\cos(4x)/4§.",
            "O resultado é §-\\frac{\\cos(2x)}{4}-\\frac{\\cos(4x)}{8}+C§.",
          ],
        },
        extraExample: {
          title: "Uma integral que se anula",
          prompt: "Calcule §\\int_0^\\pi\\sin(2x)\\sin(3x)\\,dx§.",
          steps: [
            "O produto vale §\\frac12[\\cos x-\\cos(5x)]§, pois §\\cos(-x)=\\cos x§.",
            "Uma primitiva é §\\frac12[\\sin x-\\sin(5x)/5]§.",
            "Nas pontas 0 e §\\pi§, todos os senos zeram. A integral é zero.",
          ],
        },
      },
      {
        title: "Organize partes repetidas no método tabular",
        paragraphs: [
          "Quando um fator é um polinômio e o outro pode ser integrado repetidamente, como §e^{2x}§, §\\sin x§ ou §\\cos x§, a integração por partes exige várias etapas. O método tabular organiza essas etapas em duas colunas. Na primeira, derive o polinômio até chegar a zero. Na segunda, integre o outro fator o mesmo número de vezes.",
          "Multiplique cada entrada da primeira coluna pela entrada da segunda coluna uma linha abaixo, alternando os sinais +, −, +, − a partir do primeiro produto. A soma desses produtos é a primitiva. O método é apenas uma escrita compacta de partes repetidas e termina porque a coluna do polinômio chega a zero, eliminando a última integral.",
        ],
        example: {
          title: "Uma cúbica vezes uma exponencial",
          prompt: "Calcule §\\int x^3e^{2x}\\,dx§.",
          steps: [
            "Derivadas: §x^3§, §3x^2§, §6x§, 6 e 0. Primitivas sucessivas de §e^{2x}§: §e^{2x}/2§, §e^{2x}/4§, §e^{2x}/8§ e §e^{2x}/16§.",
            "Produtos diagonais com sinais alternados: §+x^3e^{2x}/2§, §-3x^2e^{2x}/4§, §+6xe^{2x}/8§ e §-6e^{2x}/16§.",
            "Some e coloque em evidência: §e^{2x}\\left(\\frac{x^3}{2}-\\frac{3x^2}{4}+\\frac{3x}{4}-\\frac38\\right)+C§.",
            "Derivando, os termos se cancelam em cadeia e sobra §x^3e^{2x}§.",
          ],
        },
      },
      {
        title: "Complete as substituições trigonométricas",
        paragraphs: [
          "Além de §\\sqrt{a^2-x^2}§, há outros dois radicais quadráticos típicos, sempre com §a>0§. Para §\\sqrt{a^2+x^2}§, use §x=a\\tan\\theta§ com §-\\pi/2<\\theta<\\pi/2§: como §1+\\tan^2\\theta=\\sec^2\\theta§, o radical vira §a\\sec\\theta§. Para §\\sqrt{x^2-a^2}§ com §x\\ge a§, use §x=a\\sec\\theta§ com §0\\le\\theta<\\pi/2§, e o radical vira §a\\tan\\theta§. Nos dois casos, o intervalo de §\\theta§ foi escolhido para que a função trigonométrica resultante seja não negativa e o módulo desapareça sem troca de sinal.",
          "Para voltar a x, desenhe um triângulo retângulo coerente com a substituição. Com §\\tan\\theta=x/a§, os catetos são x e a, e a hipotenusa é §\\sqrt{a^2+x^2}§. As demais razões trigonométricas saem desse triângulo. Se o radicando tiver um termo linear, complete o quadrado antes de escolher a substituição.",
        ],
        example: {
          title: "Um radical com soma de quadrados",
          prompt: "Calcule §\\int\\frac{dx}{x^2\\sqrt{x^2+4}}§.",
          steps: [
            "Use §x=2\\tan\\theta§, §dx=2\\sec^2\\theta\\,d\\theta§ e §\\sqrt{x^2+4}=2\\sec\\theta§.",
            "A integral vira §\\int\\frac{2\\sec^2\\theta}{4\\tan^2\\theta\\cdot2\\sec\\theta}\\,d\\theta=\\frac14\\int\\frac{\\cos\\theta}{\\sin^2\\theta}\\,d\\theta§.",
            "Com §u=\\sin\\theta§, a primitiva é §-\\frac{1}{4\\sin\\theta}+C§.",
            "No triângulo, §\\sin\\theta=x/\\sqrt{x^2+4}§. O resultado é §-\\frac{\\sqrt{x^2+4}}{4x}+C§.",
          ],
        },
        visual: { kind: "choices", caption: "O formato do radical indica a substituição.", options: [
          { label: "§\\sqrt{a^2-x^2}§", result: "§x=a\\sin\\theta§", detail: "§1-\\sin^2\\theta=\\cos^2\\theta§ elimina a raiz." },
          { label: "§\\sqrt{a^2+x^2}§", result: "§x=a\\tan\\theta§", detail: "§1+\\tan^2\\theta=\\sec^2\\theta§ elimina a raiz." },
          { label: "§\\sqrt{x^2-a^2}§", result: "§x=a\\sec\\theta§", detail: "§\\sec^2\\theta-1=\\tan^2\\theta§ elimina a raiz." },
        ] },
      },
      {
        title: "Decida a convergência pelas integrais p",
        paragraphs: [
          "As integrais §\\int_1^\\infty x^{-p}\\,dx§ servem de régua para comparar outras. Para §p\\ne1§, a integral até b vale §(b^{1-p}-1)/(1-p)§. Se §p>1§, a potência §b^{1-p}§ tende a zero e a integral converge para §1/(p-1)§. Se §p<1§, ela cresce sem limite. O caso §p=1§ dá §\\ln b§ e também diverge.",
          "Perto de zero, a situação se inverte. A integral §\\int_0^1x^{-p}\\,dx§ converge para §1/(1-p)§ quando §p<1§ e diverge quando §p\\ge1§. Em resumo, no infinito o integrando precisa decair mais rápido que §1/x§, e perto de zero precisa explodir mais devagar que §1/x§. A própria função §1/x§ fica na fronteira e diverge nos dois casos.",
        ],
        example: {
          title: "Dois expoentes, duas regiões",
          prompt: "Decida se §\\int_1^\\infty x^{-3/2}\\,dx§ e §\\int_0^1x^{-3/2}\\,dx§ convergem.",
          steps: [
            "No infinito, §p=3/2>1§. A integral converge para §1/(3/2-1)=2§.",
            "Confira: até b, §[-2x^{-1/2}]_1^b=2-2/\\sqrt b\\to2§.",
            "Perto de zero, §p=3/2\\ge1§. A integral de a até 1 é §2/\\sqrt a-2§, que cresce sem limite quando §a\\to0^+§. Ela diverge.",
          ],
        },
      },
      {
        title: "Compare integrandos para decidir a convergência",
        paragraphs: [
          "Muitas integrais impróprias não têm primitiva elementar, mas você ainda pode decidir se convergem. Pelo teste da comparação, se §0\\le f(x)\\le g(x)§ para §x\\ge a§ e §\\int_a^\\infty g§ converge, então §\\int_a^\\infty f§ converge. Se §\\int_a^\\infty f§ diverge, a integral da função maior também diverge. As integrais p e as exponenciais são as referências usuais.",
          "Quando a desigualdade direta é trabalhosa, use a comparação no limite. Se f e g são positivas e §f/g§ tende a um número positivo e finito, as duas integrais convergem ou divergem juntas. Na prática, troque o integrando pelo seu termo dominante no infinito e analise a integral p resultante. O teste diz se a integral converge, mas não informa seu valor.",
        ],
        example: {
          title: "Uma gaussiana limitada por uma exponencial",
          prompt: "Mostre que §\\int_1^\\infty e^{-x^2}\\,dx§ converge.",
          steps: [
            "Para §x\\ge1§, temos §x^2\\ge x§, logo §0<e^{-x^2}\\le e^{-x}§.",
            "A integral §\\int_1^\\infty e^{-x}\\,dx§ vale §\\lim_{b\\to\\infty}(e^{-1}-e^{-b})=1/e§.",
            "Pela comparação, a integral original converge e vale no máximo §1/e\\approx0{,}37§.",
          ],
        },
        extraExample: {
          title: "Uma comparação no limite",
          prompt: "Decida se §\\int_1^\\infty\\frac{dx}{\\sqrt{x^3+1}}§ converge.",
          steps: [
            "Para x grande, o integrando se comporta como §x^{-3/2}§.",
            "O quociente §\\frac{1/\\sqrt{x^3+1}}{x^{-3/2}}=\\sqrt{\\frac{x^3}{x^3+1}}§ tende a 1.",
            "Como §\\int_1^\\infty x^{-3/2}\\,dx§ converge, a integral dada também converge.",
          ],
        },
      },
    ],
    checks: [
      { prompt: "Calcule §\\int\\sin^2x\\cos^3x\\,dx§.", solution: "Separe §\\cos x§ e use §\\cos^2x=1-\\sin^2x§. Com §u=\\sin x§, fica §\\int(u^2-u^4)\\,du=\\frac{\\sin^3x}{3}-\\frac{\\sin^5x}{5}+C§." },
      { prompt: "Calcule §\\int\\tan x\\sec^3x\\,dx§.", solution: "Separe §\\sec x\\tan x§ e use §u=\\sec x§. A integral vira §\\int u^2\\,du=\\sec^3x/3+C§." },
      { prompt: "Calcule §\\int_0^\\infty xe^{-x}\\,dx§.", solution: "Por partes, uma primitiva é §-(x+1)e^{-x}§. Até b, a integral vale §1-(b+1)e^{-b}§. Como a exponencial vence a potência, o limite é 1." },
      { prompt: "A integral §\\int_0^1x^{-1/3}\\,dx§ converge? E §\\int_1^\\infty x^{-1/3}\\,dx§?", solution: "A primeira tem §p=1/3<1§ perto de zero e converge para §1/(1-1/3)=3/2§. A segunda tem §p\\le1§ no infinito e diverge." },
    ],
  },

  "aplicacoes-da-integral": {
    sections: [
      {
        title: "Calcule a área de uma superfície de revolução",
        paragraphs: [
          "Ao girar o gráfico de §y=f(x)\\ge0§ em torno do eixo x, cada pequeno trecho de comprimento §ds=\\sqrt{1+f'(x)^2}\\,dx§ gera uma faixa estreita, parecida com um tronco de cone. Essa faixa tem área aproximada de circunferência vezes largura, isto é, §2\\pi f(x)\\,ds§. Somando as faixas, obtemos §S=2\\pi\\int_a^bf(x)\\sqrt{1+f'(x)^2}\\,dx§.",
          "Note a diferença em relação ao volume por discos. Lá, a espessura é dx porque o corte é perpendicular ao eixo. Aqui, a largura da faixa é o comprimento inclinado ds, pois a superfície acompanha a curva. Usar dx no lugar de ds subestima a área sempre que a curva é inclinada. Para um giro em torno do eixo y, o raio da faixa passa a ser x.",
        ],
        example: {
          title: "Um paraboloide",
          prompt: "Calcule a área da superfície gerada pela rotação de §y=\\sqrt x§, §0\\le x\\le4§, em torno do eixo x.",
          steps: [
            "A derivada é §1/(2\\sqrt x)§. O produto §\\sqrt x\\sqrt{1+1/(4x)}§ simplifica para §\\sqrt{x+1/4}§.",
            "A área é §S=2\\pi\\int_0^4\\sqrt{x+1/4}\\,dx=\\frac{4\\pi}{3}[(x+1/4)^{3/2}]_0^4§.",
            "Como §(17/4)^{3/2}=17\\sqrt{17}/8§ e §(1/4)^{3/2}=1/8§, obtemos §S=\\frac{\\pi}{6}(17\\sqrt{17}-1)\\approx36{,}18§ unidades quadradas.",
          ],
        },
        extraExample: {
          title: "Confira com a área lateral de um cone",
          prompt: "Gire §y=x§, §0\\le x\\le3§, em torno do eixo x.",
          steps: [
            "O fator de comprimento é §\\sqrt2§, então §S=2\\pi\\int_0^3x\\sqrt2\\,dx=9\\sqrt2\\,\\pi§.",
            "O cone gerado tem raio 3 e geratriz §3\\sqrt2§.",
            "A fórmula geométrica §\\pi rg=\\pi\\cdot3\\cdot3\\sqrt2§ dá o mesmo valor.",
          ],
        },
      },
      {
        title: "Calcule o trabalho para bombear um líquido",
        paragraphs: [
          "Esvaziar um tanque bombeando o líquido pela borda exige trabalhos diferentes para cada camada, porque a água do fundo percorre uma distância maior que a da superfície. Corte o líquido em camadas horizontais de espessura dy. Cada camada tem peso aproximado §\\rho g\\,A(y)\\,dy§, em que §A(y)§ é a área da seção na altura y e §\\rho g§ é o peso por unidade de volume.",
          "O trabalho de uma camada é esse peso vezes a distância que ela precisa subir. Integre ao longo das alturas ocupadas pelo líquido. Para a água, §\\rho=1000§ kg/m³ e §g=9{,}8§ m/s², então §\\rho g=9800§ N/m³. Escolha a origem do eixo com cuidado e escreva a distância percorrida como função de y antes de integrar.",
        ],
        example: {
          title: "Um tanque cilíndrico cheio",
          prompt: "Um tanque cilíndrico vertical tem raio 2 m e altura 5 m e está cheio de água. Qual é o trabalho para bombear toda a água até a borda superior?",
          steps: [
            "Meça y a partir do fundo. A camada na altura y tem área §4\\pi§ m² e precisa subir §5-y§ metros.",
            "O trabalho da camada é §9800\\cdot4\\pi(5-y)\\,dy§.",
            "Integre: §W=39200\\pi\\int_0^5(5-y)\\,dy=39200\\pi\\cdot12{,}5=490000\\pi§ J.",
            "O resultado é cerca de §1{,}54\\times10^6§ J. Ele equivale a erguer todo o peso da água pela distância média de 2,5 m.",
          ],
        },
      },
      {
        title: "Calcule a força de um fluido sobre uma placa",
        paragraphs: [
          "A pressão em um líquido parado cresce com a profundidade: a uma profundidade h, ela vale §p=\\rho gh§. Em uma placa horizontal, a pressão é a mesma em todos os pontos e a força é pressão vezes área. Em uma placa vertical, cada faixa horizontal está a uma profundidade diferente, então a força precisa ser somada por uma integral.",
          "Tome uma faixa na profundidade h, com largura §w(h)§ e espessura dh. Sua área é §w(h)\\,dh§ e a força sobre ela é §\\rho gh\\,w(h)\\,dh§. A força total é §F=\\int\\rho gh\\,w(h)\\,dh§ ao longo das profundidades ocupadas pela placa. A largura vem da geometria da placa, muitas vezes por semelhança de triângulos.",
        ],
        example: {
          title: "Uma comporta retangular",
          prompt: "Uma comporta vertical de 2 m de largura e 3 m de altura tem a borda superior na superfície da água. Calcule a força sobre ela.",
          steps: [
            "A largura é constante: §w(h)=2§ para §0\\le h\\le3§.",
            "A força é §F=\\int_0^39800\\cdot h\\cdot2\\,dh=9800[h^2]_0^3§.",
            "O resultado é §88200§ N. Usar a pressão do fundo em toda a placa daria o dobro.",
          ],
        },
        extraExample: {
          title: "Uma placa triangular",
          prompt: "Uma placa triangular vertical tem base de 4 m na superfície e vértice 3 m abaixo dela. Calcule a força.",
          steps: [
            "Por semelhança de triângulos, a largura na profundidade h é §w(h)=4(3-h)/3§.",
            "A força é §9800\\cdot\\frac43\\int_0^3h(3-h)\\,dh=9800\\cdot\\frac43\\cdot\\frac92§.",
            "O resultado é §58800§ N.",
          ],
        },
        visual: { kind: "cards", caption: "Grandezas da força hidrostática em unidades do SI.", items: [
          ["Pressão", "§p=\\rho gh§, em pascal (N/m²)."],
          ["Faixa", "Área §w(h)\\,dh§ na profundidade h."],
          ["Força da faixa", "§\\rho gh\\,w(h)\\,dh§, em newtons."],
          ["Água", "§\\rho g=9800§ N/m³."],
        ] },
      },
      {
        title: "Resolva equações diferenciais por separação de variáveis",
        paragraphs: [
          "Uma equação diferencial relaciona uma função com suas derivadas. Ela é separável quando pode ser escrita como §dy/dx=g(x)h(y)§. Nesse caso, passe os termos em y para um lado e os termos em x para o outro, §dy/h(y)=g(x)\\,dx§, integre os dois lados e use a condição inicial para fixar a constante.",
          "O modelo mais importante é §dy/dt=ky§: a taxa é proporcional à quantidade. Separando, §\\ln|y|=kt+C§, de onde §y=y_0e^{kt}§. Com §k>0§, há crescimento exponencial, como em populações com recursos abundantes. Com §k<0§, há decaimento, como em substâncias radioativas. A meia-vida vale §\\ln2/|k|§ e não depende da quantidade inicial.",
          "A lei de resfriamento de Newton diz que a temperatura de um corpo muda a uma taxa proporcional à diferença entre ela e a temperatura do ambiente: §dT/dt=-k(T-T_a)§ com §k>0§. Separando como antes, obtemos §T(t)=T_a+(T_0-T_a)e^{-kt}§. É a diferença de temperatura que decai exponencialmente.",
        ],
        example: {
          title: "Uma substância com meia-vida de 10 anos",
          prompt: "Há 80 g de uma substância cuja meia-vida é 10 anos. Quanto resta após 25 anos?",
          steps: [
            "Pelo modelo, §y(t)=80e^{-kt}§ com §k=\\ln2/10§.",
            "Como §e^{-kt}=2^{-t/10}§, após 25 anos resta §80\\cdot2^{-2{,}5}§.",
            "Como §2^{2{,}5}=4\\sqrt2§, a massa é §80/(4\\sqrt2)=10\\sqrt2\\approx14{,}1§ g.",
          ],
        },
        extraExample: {
          title: "Um café esfriando",
          prompt: "Um café a 90 °C está em uma sala a 20 °C. Após 10 min, está a 55 °C. Quando chegará a 30 °C?",
          steps: [
            "Pelo modelo, §T(t)=20+70e^{-kt}§. Em 10 min, §35=70e^{-10k}§, logo §e^{-10k}=1/2§ e §k=\\ln2/10§.",
            "Para §T=30§, é preciso §70e^{-kt}=10§, isto é, §e^{-kt}=1/7§.",
            "Assim §t=\\ln7/k=10\\ln7/\\ln2\\approx28{,}1§ min.",
          ],
        },
      },
      {
        title: "Calcule excedente do consumidor e valor presente",
        paragraphs: [
          "Uma curva de demanda §p=D(q)§ informa quanto os consumidores estariam dispostos a pagar pela unidade q. Se o preço de mercado é §p^*§ e a quantidade vendida é §q^*§, quem pagaria mais que §p^*§ economiza a diferença. O excedente do consumidor soma essas economias: §EC=\\int_0^{q^*}[D(q)-p^*]\\,dq§, que é a área entre a curva de demanda e a reta do preço.",
          "Valores recebidos no futuro valem menos hoje, porque o dinheiro presente pode render juros. Com juros compostos continuamente à taxa r, um valor V recebido no instante t equivale hoje a §Ve^{-rt}§. Para um fluxo contínuo de receita §R(t)§ por ano durante T anos, o valor presente é §VP=\\int_0^TR(t)e^{-rt}\\,dt§, a soma das pequenas parcelas descontadas.",
        ],
        example: {
          title: "Excedente com demanda linear",
          prompt: "A demanda é §p=50-0{,}5q§ reais e o preço de mercado é 30 reais. Calcule o excedente do consumidor.",
          steps: [
            "O preço 30 corresponde a §50-0{,}5q=30§, ou seja, §q^*=40§ unidades.",
            "O excedente é §\\int_0^{40}(20-0{,}5q)\\,dq=[20q-0{,}25q^2]_0^{40}§.",
            "O resultado é §800-400=400§ reais, a área de um triângulo de base 40 e altura 20.",
          ],
        },
        extraExample: {
          title: "Um fluxo de receita descontado",
          prompt: "Um contrato paga continuamente R$ 10 000 por ano durante 5 anos. Com juros contínuos de 5% ao ano, qual é o valor presente?",
          steps: [
            "Integre: §\\int_0^510000e^{-0{,}05t}\\,dt=\\frac{10000}{0{,}05}[1-e^{-0{,}25}]§.",
            "Isso dá §200000(1-e^{-0{,}25})§.",
            "O valor presente é cerca de R$ 44 240, menos que os R$ 50 000 pagos ao todo.",
          ],
        },
      },
      {
        title: "Interprete uma densidade de probabilidade",
        paragraphs: [
          "Uma variável aleatória contínua, como um tempo de espera, é descrita por uma função densidade f. Ela é não negativa e sua integral em toda a reta vale 1. A probabilidade de a variável cair entre a e b é a área §P(a\\le X\\le b)=\\int_a^bf(x)\\,dx§. A probabilidade de um valor exato é zero, pois a área sobre um único ponto é nula.",
          "A média, ou valor esperado, é §\\mu=\\int xf(x)\\,dx§, a mesma ideia do centro de massa com densidade f e massa total 1. Um modelo comum para tempos de espera é a densidade exponencial §f(t)=\\frac{1}{\\mu}e^{-t/\\mu}§ para §t\\ge0§, cuja média é μ. Ao montar uma densidade, encontre a constante que faz a área total valer 1.",
        ],
        example: {
          title: "Esperar pelo ônibus",
          prompt: "O tempo de espera, em minutos, tem densidade §f(t)=\\frac14e^{-t/4}§ para §t\\ge0§. Qual é a probabilidade de esperar no máximo 2 minutos?",
          steps: [
            "Calcule §\\int_0^2\\frac14e^{-t/4}\\,dt=[-e^{-t/4}]_0^2§.",
            "O resultado é §1-e^{-1/2}\\approx0{,}39§.",
            "Há cerca de 39% de chance. A espera média é de 4 minutos, como confirma §\\int_0^\\infty t\\,f(t)\\,dt=4§.",
          ],
        },
        extraExample: {
          title: "Normalize uma densidade",
          prompt: "Encontre c para que §f(x)=cx(2-x)§ em §[0,2]§, e zero fora, seja uma densidade. Depois calcule §P(X\\le1/2)§.",
          steps: [
            "A integral é §\\int_0^2x(2-x)\\,dx=4-8/3=4/3§. Para área 1, §c=3/4§.",
            "A probabilidade é §\\frac34\\int_0^{1/2}(2x-x^2)\\,dx=\\frac34\\left(\\frac14-\\frac1{24}\\right)§.",
            "O resultado é §\\frac34\\cdot\\frac5{24}=\\frac5{32}\\approx0{,}16§.",
          ],
        },
        visual: { kind: "cards", caption: "Propriedades de uma função densidade f.", items: [
          ["Sinal", "§f(x)\\ge0§ para todo x."],
          ["Normalização", "§\\int_{-\\infty}^{\\infty}f(x)\\,dx=1§"],
          ["Probabilidade", "§P(a\\le X\\le b)=\\int_a^bf(x)\\,dx§"],
          ["Média", "§\\mu=\\int_{-\\infty}^{\\infty}xf(x)\\,dx§"],
        ] },
      },
    ],
    checks: [
      { prompt: "Calcule a área da superfície gerada ao girar §y=2x§, §0\\le x\\le1§, em torno do eixo x.", solution: "O fator de comprimento é §\\sqrt5§, então §S=2\\pi\\int_0^12x\\sqrt5\\,dx=2\\sqrt5\\,\\pi§. Confere com o cone de raio 2 e geratriz §\\sqrt5§: §\\pi\\cdot2\\cdot\\sqrt5§." },
      { prompt: "Uma placa quadrada de 1 m de lado está na vertical, com a borda superior 2 m abaixo da superfície da água. Qual é a força sobre ela?", solution: "A largura é 1 para §2\\le h\\le3§. §F=\\int_2^39800h\\,dh=9800\\cdot2{,}5=24500§ N." },
      { prompt: "Resolva §dy/dx=xy§ com §y(0)=3§.", solution: "Separando, §dy/y=x\\,dx§ e §\\ln|y|=x^2/2+C§. Logo §y=Ae^{x^2/2}§, e a condição dá §A=3§: §y=3e^{x^2/2}§." },
      { prompt: "Para a densidade §f(x)=2x§ em §[0,1]§, calcule §P(X>1/2)§ e a média.", solution: "§P=\\int_{1/2}^12x\\,dx=1-1/4=3/4§. A média é §\\int_0^1x\\cdot2x\\,dx=2/3§." },
    ],
  },
};
