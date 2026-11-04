import type { StudyLesson } from "./studyBasics";

export default {
  intro: "Quando a entrada se aproxima de um número ou cresce sem limite, o que acontece com a saída? Você vai distinguir os tipos de limite, escolher uma técnica de cálculo e justificar a resposta pelos dois lados do ponto.",
  visual: { kind: "cards", caption: "Comece pela aproximação. Depois decida se a álgebra, a comparação ou os limites laterais resolvem a questão.", items: [
    ["Ideia central","§x\\to a§ descreve uma aproximação, e não exige §x=a§."],
    ["Dois lados","§\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)=L§"],
    ["Indeterminação","§0/0§ pede investigação. Não é valor de limite."],
    ["Comparação","Se §g\\le f\\le h§ e os extremos tendem a L, f tende a L."],
  ] },
  sections: [
    {
      title: "Leia a aproximação antes de calcular",
      paragraphs: [
        "Em §\\lim_{x\\to a}f(x)=L§, L descreve o que ocorre com a saída quando x fica arbitrariamente perto de a. A regra pode não estar definida em a. Se estiver, seu valor naquele ponto pode até ser diferente de L.",
        "Uma tabela sugere o comportamento. Escolha valores próximos por ambos os lados e compare as saídas, mas lembre que uma lista finita de amostras não substitui uma justificativa.",
        "É útil separar três perguntas ao ler o gráfico: para onde vai x, para onde vai a altura e se existe uma marca preenchida exatamente na entrada. Use a terceira pergunta para identificar o valor da função e as duas primeiras para ler o limite. Se a função vale 9 só no ponto 1, o restante da curva ainda pode se aproximar de 2.",
      ],
      example: {
        title: "Um buraco no gráfico",
        prompt: "Investigue §f(x)=(x^2-1)/(x-1)§ perto de 1.",
        steps: [
          "Para §x\\ne1§, fatorar dá §f(x)=x+1§.",
          "Em 0,99 e 1,01, as saídas são 1,99 e 2,01.",
          "A reta se aproxima da altura 2 dos dois lados. Assim o limite é 2, embora §f(1)§ não exista.",
        ],
      },
      visual: { kind: "calc-graph", model: "hole", caption: "Aproxime x de 1. O buraco permanece na mesma altura mesmo quando a entrada chega perto dele." },
    },
    {
      title: "Separe aproximações pela esquerda e pela direita",
      paragraphs: [
        "O sinal menos em §x\\to a^-§ indica valores menores que a. O mais indica valores maiores. Para um limite bilateral real existir, os limites laterais devem existir como números e coincidir.",
        "Em regras por partes, a condição com igualdade decide o valor do ponto. Para calcular limites laterais, use a expressão válida nas entradas vizinhas de cada lado.",
      ],
      example: {
        title: "Duas regras em torno de zero",
        prompt: "Seja §f(x)=x+2§ para §x<0§ e §f(x)=3-x§ para §x\\ge0§. Determine os limites laterais.",
        steps: [
          "Pela esquerda, a expressão §x+2§ tende a 2.",
          "Pela direita, §3-x§ tende a 3. O valor no ponto também é 3.",
          "Como 2 e 3 são diferentes, o limite bilateral não existe.",
        ],
      },
      visual: { kind: "calc-graph", model: "jump", caption: "Cruze a fronteira em zero e compare as duas alturas." },
    },
    {
      title: "Combine limites com as leis algébricas",
      paragraphs: [
        "Se dois limites são finitos, a soma e o produto têm limites dados pela soma e pelo produto desses valores. Para quocientes, é preciso que o limite do denominador seja diferente de zero.",
        "Polinômios permitem substituição direta em toda entrada real. Funções racionais também permitem substituir quando o denominador é não nulo no ponto. Simplifique apenas se a substituição direta não resolver.",
      ],
      example: {
        title: "Uma substituição com justificativa",
        prompt: "Calcule §\\lim_{x\\to2}(3x^2-x)/(x+1)§.",
        steps: [
          "As parcelas são polinômios, então seus limites vêm da substituição.",
          "O numerador tende a 10. O denominador tende a 3.",
          "O limite do denominador é não nulo, portanto o quociente tende a §10/3§.",
        ],
      },
    },
    {
      title: "Fatore os termos quando a substituição produz 0/0",
      paragraphs: [
        "A escrita §0/0§ indica que a substituição não determinou o comportamento do quociente. Em uma fração polinomial, procure fatores comuns associados ao ponto de aproximação.",
        "Cancelar um fator só vale quando ele é não nulo. Isso é suficiente no cálculo do limite, pois o ponto está excluído da aproximação. O cancelamento pode revelar uma extensão, mas não redefine a função original.",
        "Um bom teste para encontrar o fator é notar que, se um polinômio P zera em a, §x-a§ divide P. Se o denominador contiver esse fator duas vezes e o numerador apenas uma, ainda sobra um fator no denominador. Examine seu sinal para descobrir de que lado o quociente tende a §+\\infty§ ou §-\\infty§.",
      ],
      example: {
        title: "Da diferença de cubos ao limite",
        prompt: "Calcule §\\lim_{x\\to2}(x^3-8)/(x-2)§.",
        steps: [
          "Fatore o numerador em §(x-2)(x^2+2x+4)§.",
          "Para §x\\ne2§, cancele §x-2§. O limite se torna o de um polinômio.",
          "Em 2, o polinômio vale §4+4+4=12§.",
        ],
      },
    },
    {
      title: "Use o conjugado com raízes",
      paragraphs: [
        "Uma diferença entre raízes pode esconder um fator linear. Multiplique pelo conjugado no numerador e no denominador, onde ele for não nulo, e use §(u-v)(u+v)=u^2-v^2§.",
        "Confira o domínio da raiz antes de decidir quais aproximações são possíveis. Se o ponto fica na extremidade do domínio, explicite o lado de aproximação que você está usando.",
      ],
      example: {
        title: "Uma diferença pequena no numerador",
        prompt: "Calcule §\\lim_{x\\to0}(\\sqrt{4+x}-2)/x§.",
        steps: [
          "Multiplique pelo conjugado §\\sqrt{4+x}+2§ em cima e embaixo.",
          "A diferença dos quadrados dá x. Para §x\\ne0§, a expressão fica §1/(\\sqrt{4+x}+2)§.",
          "O denominador tende a 4, portanto o limite é §1/4§.",
        ],
      },
    },
    {
      title: "Simplifique diferenças de frações",
      paragraphs: [
        "Se duas frações se aproximam de termos grandes, seus valores podem se cancelar. Coloque-as sobre um denominador comum antes de analisar o limite. Subtrair símbolos de infinito não resolve o problema.",
        "Quando houver uma fração complexa, resolva primeiro o numerador e depois a divisão externa. Em cada etapa, conserve as condições de existência das frações originais.",
      ],
      example: {
        title: "Uma diferença que tende a zero antes de ser dividida",
        prompt: "Calcule §\\lim_{h\\to0}\\frac{1/(2+h)-1/2}{h}§.",
        steps: [
          "A diferença no numerador é §-h/[2(2+h)]§.",
          "Dividindo por h para §h\\ne0§, obtemos §-1/[2(2+h)]§.",
          "Por substituição na forma simplificada, o limite é §-1/4§.",
        ],
      },
    },
    {
      title: "Analise o sinal perto de uma assíntota vertical",
      paragraphs: [
        "Se o numerador tende a um número não nulo e o denominador tende a zero, o módulo do quociente cresce sem limite. Para saber em qual direção, avalie o sinal do quociente em cada lado.",
        "Um fator de multiplicidade ímpar troca de sinal na raiz. Um fator de multiplicidade par mantém o sinal. Use esse teste depois de cancelar fatores comuns válidos nas proximidades.",
      ],
      example: {
        title: "Compare uma raiz simples e uma dupla",
        prompt: "Determine os limites laterais de §1/(x-2)§ e §1/(x-2)^2§ em 2.",
        steps: [
          "Na primeira fração, §x-2§ é negativo à esquerda e positivo à direita.",
          "Os limites são §-\\infty§ e §+\\infty§, respectivamente. Não há um único comportamento bilateral.",
          "Na segunda fração, o denominador é positivo dos dois lados. Os dois limites laterais são §+\\infty§.",
        ],
      },
      visual: { kind: "calc-graph", model: "pole", caption: "Explore os lados do polo. O gráfico é interrompido no ponto onde a função não existe." },
    },
    {
      title: "Decida quando existe assíntota horizontal",
      paragraphs: [
        "Uma assíntota horizontal §y=L§ descreve uma saída que tende a L quando x vai para §+\\infty§ ou para §-\\infty§. Analise as duas extremidades separadamente, pois elas podem ter comportamentos diferentes.",
        "Em uma função racional, dividir numerador e denominador pela maior potência do denominador evidencia o termo dominante. As potências inversas de x tendem a zero nas duas extremidades.",
        "Uma curva pode cruzar uma assíntota horizontal em uma entrada finita. O limite descreve apenas as pontas da curva. Por exemplo, §1+(x-2)/(x^2+1)§ tende a 1 no infinito e vale 1 exatamente quando §x=2§. A definição de assíntota não exige que a função fique para sempre de um mesmo lado da reta em todo o domínio.",
      ],
      example: {
        title: "Mesmos graus, razão entre os coeficientes líderes",
        prompt: "Calcule §\\lim_{x\\to\\pm\\infty}(5x^2-x)/(2x^2+7)§.",
        steps: [
          "Divida a fração por §x^2§ em cima e embaixo.",
          "A escrita vira §(5-1/x)/(2+7/x^2)§.",
          "Os termos inversos tendem a zero. Em ambos os sentidos, o limite vale §5/2§.",
        ],
      },
    },
    {
      title: "Reconheça crescimento e assíntota inclinada",
      paragraphs: [
        "Quando o grau do numerador supera o grau do denominador por uma unidade, a divisão polinomial produz uma parte linear e um resto dividido pelo denominador. Se esse último termo tende a zero, a reta é uma assíntota inclinada.",
        "O limite da própria função pode ser infinito mesmo que a distância vertical entre a curva e a reta tenda a zero. Identifique qual das duas expressões a questão pede.",
      ],
      example: {
        title: "Uma reta escondida em uma fração",
        prompt: "Encontre a assíntota inclinada de §f(x)=(x^2+1)/(x-1)§.",
        steps: [
          "Divida para obter §f(x)=x+1+2/(x-1)§.",
          "Em ambas as extremidades, §2/(x-1)§ tende a zero.",
          "A assíntota é §y=x+1§. A função cresce para §+\\infty§ à direita e decresce para §-\\infty§ em valor à esquerda.",
        ],
      },
    },
    {
      title: "Cuide do sinal ao extrair uma raiz",
      paragraphs: [
        "Ao colocar §x^2§ em evidência sob uma raiz quadrada, lembre que §\\sqrt{x^2}=|x|§. Perto de §+\\infty§, isso vale x. Perto de §-\\infty§, vale −x.",
        "Essa diferença explica por que expressões com radical e potências podem ter duas assíntotas horizontais distintas, mesmo quando o interior da raiz depende apenas de §x^2§.",
      ],
      example: {
        title: "Uma curva com dois níveis assintóticos",
        prompt: "Calcule os dois limites de §\\sqrt{x^2+4}/x§ no infinito.",
        steps: [
          "Para §x\\ne0§, escreva §(|x|/x)\\sqrt{1+4/x^2}§.",
          "O fator com raiz tende a 1 nas duas extremidades.",
          "Como §|x|/x§ vale 1 à direita e −1 à esquerda, os limites são 1 e −1.",
        ],
      },
    },
    {
      title: "Use o teorema do confronto",
      paragraphs: [
        "Se uma expressão está entre duas funções que tendem ao mesmo número, ela também tende a esse número. A desigualdade precisa valer apenas perto do ponto e pode excluir o próprio ponto.",
        "Para um produto entre uma função limitada e outra que tende a zero, limite o módulo do produto. O resultado pode existir mesmo que o fator limitado oscile indefinidamente.",
      ],
      example: {
        title: "Uma oscilação de amplitude cada vez menor",
        prompt: "Calcule §\\lim_{x\\to0}x^2\\sin(1/x)§.",
        steps: [
          "O seno tem módulo menor ou igual a 1.",
          "Então §-x^2\\le x^2\\sin(1/x)\\le x^2§ para §x\\ne0§.",
          "Como os dois extremos tendem a zero, o limite é zero.",
        ],
      },
      visual: { kind: "calc-graph", model: "squeeze", caption: "Diminua o módulo da entrada. Os limites superior e inferior apertam o ponto do meio." },
    },
    {
      title: "Entenda quando a oscilação impede o limite",
      paragraphs: [
        "O gráfico pode continuar oscilando com amplitude fixa, por mais perto que x esteja do ponto. Nesse caso, procure duas sequências de entradas convergindo ao mesmo ponto, com saídas de limites diferentes.",
        "Essa é uma forma de provar que nem mesmo um limite lateral existe. Escolha ângulos em que a função trigonométrica tenha valores exatos e converta esses ângulos nas entradas desejadas.",
      ],
      example: {
        title: "Duas sequências no mesmo lado",
        prompt: "Mostre que §\\sin(1/x)§ não tem limite pela direita em 0.",
        steps: [
          "Use §x_n=1/(2\\pi n+\\pi/2)§. Essas entradas positivas tendem a zero e dão seno 1.",
          "Use §y_n=1/(2\\pi n+3\\pi/2)§. Elas também tendem a zero pela direita e dão seno −1.",
          "As saídas teriam de tender ao mesmo número se o limite lateral existisse. Logo ele não existe.",
        ],
      },
    },
    {
      title: "Use o limite trigonométrico em radianos",
      paragraphs: [
        "Em radianos, §\\lim_{u\\to0}\\sin u/u=1§. No círculo unitário, a comparação entre a área de triângulos e a área do setor fornece §\\cos u\\le\\sin u/u\\le1§ para §0<u<\\pi/2§. O quociente é par, então vale também a aproximação pela esquerda.",
        "Para usar o limite com argumento diferente de x, ponha o mesmo argumento no numerador e no denominador. Trate o fator restante como uma constante ou pela lei do produto.",
      ],
      example: {
        title: "Ajuste dois coeficientes diferentes",
        prompt: "Calcule §\\lim_{x\\to0}\\sin(5x)/(2x)§.",
        steps: [
          "Introduza o argumento completo no denominador: §\\sin(5x)/(2x)=(5/2)\\sin(5x)/(5x)§.",
          "Como §5x\\to0§, o segundo fator tende a 1.",
          "O limite é §5/2§.",
        ],
      },
    },
    {
      title: "Transforme uma expressão com cosseno",
      paragraphs: [
        "Quando aparece §1-\\cos x§, a identidade §1-\\cos^2 x=\\sin^2 x§ permite transformar o numerador em um quadrado. Use o conjugado §1+\\cos x§ perto de zero, onde ele não se anula.",
        "O denominador do problema decide o que sobra. Se for §x^2§, surgem dois fatores do limite fundamental. Se for x, resta um fator que tende a zero.",
      ],
      example: {
        title: "O limite quadrático do cosseno",
        prompt: "Calcule §\\lim_{x\\to0}(1-\\cos x)/x^2§.",
        steps: [
          "Multiplique numerador e denominador por §1+\\cos x§.",
          "A fração vira §(\\sin x/x)^2/(1+\\cos x)§.",
          "O numerador tende a 1 e o denominador a 2, dando §1/2§.",
        ],
      },
    },
    {
      title: "Passe da intuição à definição formal",
      paragraphs: [
        "A definição §\\varepsilon§–§\\delta§ diz que para cada erro de saída §\\varepsilon>0§ existe uma margem de entrada §\\delta>0§ que garante §|f(x)-L|<\\varepsilon§ sempre que §0<|x-a|<\\delta§.",
        "Para funções lineares, o erro de saída é um múltiplo do erro de entrada. Para polinômios, é comum escolher primeiro uma vizinhança fixa para limitar o fator restante, e depois reduzir a margem.",
        "Leia a ordem da definição como um jogo de precisão. Alguém escolhe a tolerância da saída primeiro. Sua tarefa é escolher uma faixa de entrada que funcione para todos os pontos permitidos nessa faixa. Diminuir uma margem que já funciona continua valendo. Uma faixa escolhida por tentativa para um único ponto não atende ao requisito.",
      ],
      example: {
        title: "Garanta uma precisão para a função quadrática",
        prompt: "Prove que §\\lim_{x\\to2}x^2=4§.",
        steps: [
          "Se §|x-2|<1§, então §1<x<3§ e §|x+2|<5§.",
          "Logo §|x^2-4|=|x-2||x+2|<5|x-2|§.",
          "Dado §\\varepsilon>0§, escolha §\\delta=\\min(1,\\varepsilon/5)§. Assim §0<|x-2|<\\delta§ garante erro menor que §\\varepsilon§.",
        ],
      },
    },
    {
      title: "Escolha uma técnica sem se prender à primeira forma",
      paragraphs: [
        "Comece perguntando onde a entrada vai e se a substituição é válida. Se obtiver uma indeterminação, procure o que a expressão esconde, como um fator comum, um radical que pode ser racionalizado ou uma diferença de ordens de crescimento.",
        "Ao terminar, confira a direção e o sinal da resposta. Um limite de uma função positiva não pode ser negativo. Uma resposta numérica proposta por um gráfico só merece confiança depois de uma justificativa adequada ao caso.",
      ],
      example: {
        title: "Compare dois problemas quase iguais",
        prompt: "Calcule §\\lim_{x\\to1}(x^2-1)/(x-1)§ e §\\lim_{x\\to1}(x^2-1)/(x-1)^2§.",
        steps: [
          "Fatore o numerador. A primeira fração fica §x+1§ para §x\\ne1§ e tende a 2.",
          "A segunda ainda tem um fator §x-1§ no denominador e numerador tendendo a 2.",
          "Ela tende a §-\\infty§ à esquerda e a §+\\infty§ à direita. O limite bilateral não existe.",
        ],
      },
    },
    {
      title: "Retome os limites após aprender a regra de L’Hôpital",
      paragraphs: [
        "Esta técnica usa as derivadas estudadas na terceira aula. Ela se aplica a certos quocientes em que numerador e denominador tendem ambos a zero ou ambos crescem sem limite em módulo. Os dois precisam ser deriváveis na vizinhança usada para a aproximação, com derivada do denominador não nula ali.",
        "Se o quociente das derivadas tem limite, finito ou infinito, a regra dá esse mesmo limite ao quociente original sob essas hipóteses. Derive numerador e denominador separadamente. Antes de repetir o procedimento, confirme que a nova razão ainda tem uma das formas adequadas.",
        "Se a expressão aparecer como diferença de dois termos ilimitados ou como produto de um fator que tende a zero por outro ilimitado, você pode procurar uma reescrita como quociente. Essa etapa é algébrica. A regra só entra depois que a forma do quociente está clara.",
      ],
      example: {
        title: "Verifique a forma antes de derivar de novo",
        prompt: "Calcule §\\lim_{x\\to0}(e^x-1-x)/x^2§ com L’Hôpital.",
        steps: [
          "Numerador e denominador tendem a zero. Suas derivadas são §e^x-1§ e §2x§, com §2x\\ne0§ para §x\\ne0§.",
          "O novo quociente ainda tem forma §0/0§. Derive suas duas partes para obter §e^x/2§.",
          "Agora a substituição direta funciona e dá §1/2§. As duas aplicações da regra transferem esse limite para o quociente inicial.",
        ],
      },
      extraExample: {
        title: "Compare um logaritmo com uma potência",
        prompt: "Calcule §\\lim_{x\\to+\\infty}(\\ln x)/\\sqrt{x}§.",
        steps: [
          "Para x positivo, as duas funções são deriváveis e crescem sem limite quando x vai para §+\\infty§.",
          "O quociente de suas derivadas é §(1/x)/(1/(2\\sqrt{x}))=2/\\sqrt{x}§.",
          "A última expressão tende a zero. O quociente original também tende a zero, embora o logaritmo cresça indefinidamente.",
        ],
      },
    },
  ],
  pitfall: "Não confunda limite infinito com limite no infinito. Em §x\\to 2^+§ a entrada se aproxima de 2, mesmo que a saída cresça sem limite. Em §x\\to+\\infty§ é a entrada que cresce sem limite, e a saída pode se aproximar de um número.",
  checks: [
    { prompt: "Calcule §\\lim_{x\\to-2}(x^2+3x-1)§.", solution: "O polinômio permite substituir. O resultado é §4-6-1=-3§." },
    { prompt: "Calcule §\\lim_{x\\to4}(x^2-16)/(x-4)§.", solution: "Cancele §x-4§ para entradas diferentes de 4. Sobra §x+4§, que tende a 8." },
    { prompt: "Calcule §\\lim_{x\\to9}(\\sqrt{x}-3)/(x-9)§.", solution: "Racionalize. A expressão vira §1/(\\sqrt{x}+3)§ perto de 9 e tende a §1/6§." },
    { prompt: "Calcule §\\lim_{h\\to0}[1/(3+h)-1/3]/h§.", solution: "A diferença das frações é §-h/[3(3+h)]§. Depois de dividir por h, o limite é §-1/9§." },
    { prompt: "Qual é §\\lim_{x\\to3^-}2/(x-3)§?", solution: "O denominador é negativo e seu módulo tende a zero. O limite é §-\\infty§." },
    { prompt: "Qual é §\\lim_{x\\to3}(-2)/(x-3)^2§?", solution: "O denominador é positivo em ambos os lados. O limite é §-\\infty§." },
    { prompt: "Calcule §\\lim_{x\\to-\\infty}(2x+1)/(3x^2-4)§.", solution: "Divida por §x^2§. O numerador tende a zero, o denominador a 3 e o limite é zero." },
    { prompt: "Calcule §\\lim_{x\\to-\\infty}x/\\sqrt{x^2+1}§.", solution: "Escreva §(x/|x|)/\\sqrt{1+1/x^2}§. O primeiro fator é −1 e o segundo tende a 1. O limite é −1." },
    { prompt: "Calcule §\\lim_{x\\to0}\\sin(3x)/(7x)§.", solution: "Escreva §(3/7)\\sin(3x)/(3x)§. O resultado é §3/7§." },
    { prompt: "Calcule §\\lim_{x\\to0}x\\cos(1/x)§.", solution: "O módulo do produto é no máximo §|x|§, que tende a zero. Use confronto." },
    { prompt: "Se os limites laterais em a são 4 e 4, mas §f(a)=7§, qual é o limite?", solution: "Os dois limites laterais coincidem. O limite bilateral vale 4." },
    { prompt: "Para provar §\\lim_{x\\to1}(4x-1)=3§, qual margem serve para um erro §\\varepsilon§?", solution: "O erro é §4|x-1|§. Escolha §\\delta=\\varepsilon/4§." },
  ],
} satisfies StudyLesson;
