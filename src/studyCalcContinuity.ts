import type { StudyLesson } from "./studyBasics";

export default {
  intro: "Uma função contínua preserva a proximidade: perto de uma entrada, suas saídas ficam perto do valor naquela entrada. Você vai identificar por que essa propriedade falha, ajustar funções por partes e usar a continuidade para garantir valores e extremos.",
  visual: { kind: "cards", caption: "Para verificar a continuidade em a, compare as informações do gráfico e do domínio.", items: [
    ["Valor no ponto","§f(a)§ precisa existir."],
    ["Limite","§\\lim_{x\\to a}f(x)§ precisa existir."],
    ["Correspondência","§\\lim_{x\\to a}f(x)=f(a)§"],
    ["Extremidades","Em §[a,b]§, use a direita em a e a esquerda em b."],
  ] },
  sections: [
    {
      title: "Verifique as três condições no mesmo ponto",
      paragraphs: [
        "Primeiro, substitua a na função ou consulte sua definição para saber se §f(a)§ existe. Depois calcule o limite nas proximidades de a. Por fim, compare os números obtidos.",
        "Uma tabela perto de a pode ajudar a estimar o limite. Ela não mostra necessariamente o valor em a. Em um gráfico, um ponto fechado indica valor atribuído, enquanto um círculo aberto indica uma altura excluída.",
      ],
      example: {
        title: "Uma mudança só no ponto",
        prompt: "Seja §f(x)=x+1§ para §x\\ne2§ e §f(2)=5§. A função é contínua em 2?",
        steps: [
          "A função está definida em 2 e seu valor é 5.",
          "Para entradas vizinhas diferentes de 2, a expressão §x+1§ tende a 3.",
          "Como §3\\ne5§, a função é descontínua em 2. Trocar apenas §f(2)§ para 3 resolveria o problema.",
        ],
      },
    },
    {
      title: "Comece pelo domínio",
      paragraphs: [
        "Uma afirmação de continuidade sempre se refere a pontos onde a função está definida. Em um polinômio, isso não exclui valores reais. Em uma função racional, o denominador exclui suas raízes.",
        "Uma simplificação pode produzir uma fórmula válida em um domínio maior. Diferencie a função original da extensão obtida com a fórmula simplificada, pois elas não têm necessariamente as mesmas entradas.",
      ],
      example: {
        title: "O domínio continua tendo uma exceção",
        prompt: "Determine onde §f(x)=(x^2-9)/(x-3)§ é contínua.",
        steps: [
          "O denominador exclui 3, e a função racional é contínua em todo o restante do domínio.",
          "Para §x\\ne3§, a expressão equivale a §x+3§. O limite em 3 vale 6.",
          "Definir um novo valor 6 em 3 cria uma extensão contínua em todos os reais.",
        ],
      },
      visual: { kind: "calc-graph", model: "hole", caption: "A saída se aproxima da altura do buraco. Essa altura seria o valor da extensão." },
    },
    {
      title: "Considere o lado disponível nas extremidades",
      paragraphs: [
        "Em um intervalo fechado §[a,b]§, os pontos internos usam aproximação bilateral. Na ponta esquerda só entram valores do lado direito, e na ponta direita só entram valores do lado esquerdo.",
        "A mesma ideia vale para domínios que começam em uma ponta, como uma raiz quadrada. Exigir valores da função fora do domínio atribuiria um teste impossível a uma função que é contínua no próprio domínio.",
      ],
      example: {
        title: "Continuidade na ponta de um radical",
        prompt: "Justifique a continuidade de §f(x)=\\sqrt{x-2}§ em §[2,6]§.",
        steps: [
          "No interior, composição de funções contínuas dá continuidade.",
          "Quando x tende a 2 pela direita, §x-2§ tende a zero por valores positivos e §f(x)\\to0=f(2)§.",
          "Quando x tende a 6 pela esquerda, §f(x)\\to2=f(6)§. As duas pontas passam no teste adequado.",
        ],
      },
    },
    {
      title: "Corrija um buraco com uma extensão",
      paragraphs: [
        "Uma descontinuidade é removível quando existe limite bilateral finito, mas o valor do ponto está ausente ou difere do limite. A única extensão que torna a função contínua naquele ponto deve usar o limite como valor.",
        "Essa correção altera um ponto isolado. As saídas vizinhas mantêm suas alturas, então o limite não muda. Se os limites laterais discordarem, preencher o ponto não basta.",
      ],
      example: {
        title: "Um parâmetro que preenche a altura correta",
        prompt: "Para §x\\ne1§, use §f(x)=(x^3-1)/(x-1)§. Escolha §f(1)=k§ para ter continuidade.",
        steps: [
          "Fatore o numerador como §(x-1)(x^2+x+1)§.",
          "O quociente para §x\\ne1§ é §x^2+x+1§ e o limite em 1 é 3.",
          "O único valor que coincide com o limite é §k=3§.",
        ],
      },
    },
    {
      title: "Identifique um salto",
      paragraphs: [
        "Uma descontinuidade por salto tem limites laterais finitos e diferentes. O valor no ponto pode coincidir com o limite de um lado ou com nenhum deles. Em todos esses casos o limite bilateral continua ausente.",
        "Em um modelo de tarifa por faixas, um salto pode representar uma mudança real da regra. É útil indicar a altura de cada patamar e qual condição inclui o preço na fronteira.",
      ],
      example: {
        title: "Uma tarifa com degrau",
        prompt: "Use §T(q)=8§ para §0\\le q<3§ e §T(q)=12§ para §q\\ge3§. Analise o ponto 3.",
        steps: [
          "À esquerda, a tarifa permanece 8, então o limite lateral é 8.",
          "À direita, ela permanece 12. O preço em 3 é 12 porque a segunda faixa inclui a igualdade.",
          "Os limites laterais diferem. Há um salto de 4 e nenhuma mudança isolada em §T(3)§ resolve a descontinuidade.",
        ],
      },
      visual: { kind: "calc-graph", model: "jump", caption: "Compare a fronteira desta função por partes com o degrau da tarifa. Em ambas, as alturas laterais discordam." },
    },
    {
      title: "Distinga polos de buracos",
      paragraphs: [
        "Depois de cancelar fatores comuns, examine o que sobrou no denominador. Um zero eliminado pode produzir um buraco. Um fator que ainda zera e tem numerador não nulo produz crescimento ilimitado em módulo.",
        "As duas descontinuidades podem aparecer na mesma função. Registre primeiro todas as restrições originais e depois classifique cada ponto pela forma simplificada e pelos limites laterais.",
      ],
      example: {
        title: "Uma função, dois tipos de descontinuidade",
        prompt: "Classifique as descontinuidades de §(x-1)/[(x-1)(x+2)]§.",
        steps: [
          "O domínio exclui 1 e −2. A função coincide com §1/(x+2)§ nas entradas permitidas.",
          "Em 1, o limite finito é §1/3§ e há um buraco.",
          "Em −2, o denominador ainda zera. O limite pela esquerda é §-\\infty§ e pela direita é §+\\infty§.",
        ],
      },
      visual: { kind: "calc-graph", model: "pole", caption: "Veja por que uma altura isolada não elimina o comportamento ilimitado perto de um polo." },
    },
    {
      title: "Reconheça a descontinuidade oscilatória",
      paragraphs: [
        "Nem todo limite ausente vem de salto ou polo. Uma oscilação com valores limitados pode impedir a aproximação de uma altura única. Para demonstrar isso, use sequências de entradas de um mesmo lado com saídas diferentes.",
        "Uma multiplicação por uma amplitude que tende a zero pode mudar o tipo de comportamento. A oscilação continua, mas a faixa de valores diminui até uma única altura, o que permite uma extensão contínua.",
      ],
      example: {
        title: "Uma oscilação que pode ser domada",
        prompt: "Compare §\\sin(1/x)§ e §x\\sin(1/x)§ em torno de zero.",
        steps: [
          "Na primeira, entradas §1/(\\pi/2+2\\pi n)§ e §1/(3\\pi/2+2\\pi n)§ tendem a zero com saídas 1 e −1.",
          "Na segunda, §|x\\sin(1/x)|\\le |x|§, então o limite vale zero.",
          "Só a segunda admite extensão contínua em zero. Basta atribuir valor zero ao ponto.",
        ],
      },
    },
    {
      title: "Use continuidade das operações",
      paragraphs: [
        "Soma, produto e diferença de funções contínuas são contínuos nos pontos em que ambas são contínuas. Para quocientes, verifique também se o denominador é diferente de zero.",
        "Uma boa justificativa identifica as peças e as restrições. No denominador, provar que uma expressão é sempre positiva pode ser mais direto que resolver uma equação para procurar zeros.",
      ],
      example: {
        title: "Uma fração definida em toda a reta",
        prompt: "Determine o conjunto de continuidade de §(x^3-2)/(x^2+1)§.",
        steps: [
          "O numerador e o denominador são polinômios, contínuos em toda a reta.",
          "Como §x^2\\ge0§, o denominador é no mínimo 1.",
          "Assim o quociente é contínuo para todo x real.",
        ],
      },
    },
    {
      title: "Siga a ordem de uma composição",
      paragraphs: [
        "Em §g(f(x))§, primeiro descubra onde a função interna f existe. Depois exija que o valor produzido pertença ao domínio de g. A composição é contínua quando as funções são contínuas nos pontos correspondentes.",
        "Se houver mais de uma restrição, encontre a interseção das condições. Uma raiz no denominador exige radicando estritamente positivo, enquanto uma raiz no numerador permite zero.",
      ],
      example: {
        title: "Logaritmo dentro de uma raiz",
        prompt: "Determine o domínio e a continuidade de §F(x)=\\sqrt{\\ln x}§.",
        steps: [
          "O logaritmo pede §x>0§. A raiz pede §\\ln x\\ge0§.",
          "Como o logaritmo natural é crescente e §\\ln1=0§, o domínio é §[1,\\infty)§.",
          "No interior vale continuidade da composição. Na extremidade 1, o limite pela direita coincide com §F(1)=0§.",
        ],
      },
    },
    {
      title: "Encontre parâmetros em uma fronteira",
      paragraphs: [
        "Se cada fórmula já é contínua dentro de sua faixa, resta investigar a fronteira. Escreva o limite pela esquerda, o limite pela direita e o valor da função, observando a desigualdade que inclui a igualdade.",
        "Iguale os limites laterais e depois confira o valor no ponto. Quando a fórmula de um lado já inclui o ponto e é contínua ali, verificar esse último passo costuma ser uma substituição simples.",
      ],
      example: {
        title: "Uma reta e uma parábola se encontram",
        prompt: "Escolha a em §f(x)=ax+1§ para §x<2§ e §f(x)=x^2-1§ para §x\\ge2§.",
        steps: [
          "O limite à esquerda é §2a+1§. O da direita é §2^2-1=3§.",
          "Igualando, §2a+1=3§ dá §a=1§.",
          "Nesse caso, §f(2)=3§ coincide com o limite. Como os trechos são contínuos fora da fronteira, f é contínua em toda a reta.",
        ],
      },
    },
    {
      title: "Resolva duas junções ao mesmo tempo",
      paragraphs: [
        "Uma função com três trechos pode ter duas fronteiras e duas condições independentes. Faça uma equação por fronteira e resolva o sistema. Ajustar uma junção sem testar a outra deixa a análise incompleta.",
        "Ao fim, substitua os parâmetros encontrados nos dois pares de regras. Essa conferência também revela casos em que as condições seriam incompatíveis e não haveria função contínua daquele formato.",
      ],
      example: {
        title: "Ligue dois patamares com um trecho linear",
        prompt: "Use altura 2 para §x\\le0§, §ax+b§ para §0<x<3§ e altura 8 para §x\\ge3§. Determine a e b.",
        steps: [
          "Em zero, o limite do trecho central é b e deve coincidir com 2. Assim §b=2§.",
          "Em 3, o limite do trecho central é §3a+b§ e deve coincidir com 8.",
          "Substitua b: §3a+2=8§ dá §a=2§. A regra intermediária é §2x+2§.",
        ],
      },
    },
    {
      title: "Aplique o teorema do valor intermediário",
      paragraphs: [
        "Se f é contínua em §[a,b]§, ela assume todo valor entre §f(a)§ e §f(b)§ em algum ponto do intervalo. O teorema garante existência, mesmo quando ainda não sabemos calcular o ponto.",
        "Uma mudança de sinal é o caso em que o valor alvo é zero. Para concluir que existe apenas uma raiz, use informação adicional, como monotonicidade estrita. Continuidade sozinha permite que a curva atravesse o nível várias vezes.",
      ],
      example: {
        title: "Garanta a existência de uma raiz",
        prompt: "Prove que §x^3+x-1=0§ tem uma raiz entre zero e um.",
        steps: [
          "O polinômio §p(x)=x^3+x-1§ é contínuo em §[0,1]§.",
          "As saídas são §p(0)=-1§ e §p(1)=1§. Zero fica entre elas.",
          "Pelo teorema existe uma raiz interna. Como x e §x^3§ são crescentes estritos, a soma também é, garantindo unicidade.",
        ],
      },
    },
    {
      title: "Localize uma raiz por bisseção",
      paragraphs: [
        "Com continuidade e sinais opostos nas pontas, divida o intervalo ao meio. Se a saída no ponto médio for zero, a raiz foi encontrada. Senão, mantenha a metade em que os sinais ainda são opostos.",
        "Cada iteração reduz a largura pela metade. O ponto médio do intervalo atual aproxima uma raiz com erro de no máximo metade dessa largura. O método precisa de um intervalo inicial que satisfaça as hipóteses.",
      ],
      example: {
        title: "Aproxime a raiz quadrada de 2",
        prompt: "Faça duas etapas de bisseção para §f(x)=x^2-2§ em §[1,2]§.",
        steps: [
          "Os sinais iniciais são negativo em 1 e positivo em 2.",
          "Em 1,5, o valor é 0,25. A raiz fica em §[1,1{,}5]§.",
          "Em 1,25, o valor é −0,4375. A raiz fica em §[1{,}25,1{,}5]§. O novo ponto médio é 1,375, com erro de no máximo 0,125.",
        ],
      },
      visual: { kind: "calc-graph", model: "bisection", caption: "Percorra as etapas e veja o intervalo com sinais opostos encolher." },
    },
    {
      title: "Observe quando um teorema não se aplica",
      paragraphs: [
        "Testar hipóteses evita deduzir uma conclusão a partir de um salto ou de um ponto ausente. Em particular, a função precisa estar definida e ser contínua em todo o intervalo em que usamos o valor intermediário.",
        "A falta de uma hipótese impede usar o teorema, mas sozinha não determina se a conclusão é verdadeira. Para negar a existência de uma raiz, mostre que a função nunca assume zero.",
      ],
      example: {
        title: "Sinais opostos sem raiz",
        prompt: "Pode-se usar o teorema do valor intermediário para §f(x)=1/x§ em §[-1,1]§?",
        steps: [
          "Temos §f(-1)=-1§ e §f(1)=1§, com sinais opostos.",
          "A função não está definida em zero, então não é contínua em todo o intervalo.",
          "O quociente nunca vale zero em seu domínio. Este caso mostra por que verificar a continuidade é necessário.",
        ],
      },
    },
    {
      title: "Garanta máximos e mínimos em intervalos fechados",
      paragraphs: [
        "Uma função contínua em um intervalo fechado e limitado atinge um máximo e um mínimo absolutos. Esses valores podem ocorrer nas pontas ou no interior. O teorema garante que eles existem, mas não fornece suas posições.",
        "Uma ponta removida pode transformar um extremo em um valor apenas aproximado. A diferença prática é perguntar se há uma entrada do intervalo que produz exatamente a maior ou menor saída.",
      ],
      example: {
        title: "Compare um intervalo fechado com um aberto",
        prompt: "Analise os extremos de §f(x)=x^2§ em §[-1,2]§ e em §(-1,2)§.",
        steps: [
          "Em ambos, zero pertence ao intervalo, então o mínimo é §f(0)=0§.",
          "No fechado, o maior módulo de x é 2. O máximo é §f(2)=4§.",
          "No aberto, todas as saídas são menores que 4, mas se aproximam de 4 quando x se aproxima de 2. Não há máximo.",
        ],
      },
    },
    {
      title: "Diferencie continuidade de suavidade",
      paragraphs: [
        "Uma curva pode ser contínua e ainda ter um canto. Continuidade compara alturas. A derivada compara taxas de variação quando o tamanho do passo tende a zero. As duas verificações usam limites diferentes.",
        "Se uma derivada finita existe em um ponto interior, a função é contínua ali. A recíproca falha quando as inclinações laterais discordam, mesmo que as alturas dos dois lados coincidam.",
      ],
      example: {
        title: "Uma ponta sem ruptura",
        prompt: "Compare os limites de §|x|§ e de §|x|/x§ perto de zero.",
        steps: [
          "Como §|x|\\to0=f(0)§, a função módulo é contínua em zero.",
          "O quociente §[f(x)-f(0)]/(x-0)§ vale −1 à esquerda e 1 à direita.",
          "As inclinações laterais diferem, então não existe derivada em zero.",
        ],
      },
      visual: { kind: "calc-graph", model: "corner", caption: "Veja a saída se aproximar do vértice enquanto a inclinação depende do lado." },
    },
  ],
  pitfall: "O teorema do valor intermediário exige continuidade em todo o intervalo usado. Sinais opostos nas pontas, por si sós, não garantem uma raiz. Um salto pode passar de negativo a positivo sem assumir zero.",
  checks: [
    { prompt: "É contínua em 1 a função §f(x)=x^2§ para §x\\ne1§ e §f(1)=3§?", solution: "Não. O limite é 1 e difere do valor 3. A descontinuidade é removível." },
    { prompt: "Qual valor remove o buraco de §(x^2-4)/(x-2)§ em 2?", solution: "A forma simplificada é §x+2§. A extensão contínua usa §f(2)=4§." },
    { prompt: "A função §\\sqrt{5-x}§ é contínua em 5 dentro do seu domínio?", solution: "Sim. A aproximação pela esquerda dá zero, que é o valor no ponto." },
    { prompt: "Classifique a descontinuidade de §1/(x+1)^2§ em −1.", solution: "O quociente tende a §+\\infty§ dos dois lados. É uma descontinuidade infinita." },
    { prompt: "Os limites laterais em 2 são 4 e 7. Que valor em 2 elimina a descontinuidade?", solution: "Nenhum. Como os limites laterais discordam, alterar um ponto não elimina o salto." },
    { prompt: "Qual é o conjunto de continuidade de §1/\\sqrt{x-3}§?", solution: "O denominador exige §x-3>0§. A função é contínua em §(3,\\infty)§." },
    { prompt: "Ache k para unir §x+k§ em §x<1§ a §3x^2§ em §x\\ge1§.", solution: "Igualando os limites, §1+k=3§. Logo §k=2§ e o valor da segunda regra em 1 é 3." },
    { prompt: "Uma função contínua em §[2,5]§ tem saídas 1 e 9 nas pontas. Ela assume 6?", solution: "Sim. O valor 6 está entre as duas saídas, então é atingido em algum ponto interno." },
    { prompt: "Faça a primeira bisseção de §x^2-3§ em §[1,2]§.", solution: "Em 1,5 a saída é −0,75 e em 2 é positiva. O novo intervalo é §[1{,}5,2]§." },
    { prompt: "Por que §f(x)=x§ em §[0,1)§ não tem máximo?", solution: "Para qualquer x do intervalo existe entrada maior, por exemplo §(x+1)/2§, com saída maior. O valor 1 não é atingido." },
    { prompt: "Dê um exemplo de função contínua que não tem derivada em zero.", solution: "§f(x)=|x|§. O valor e o limite são zero, mas os quocientes laterais são −1 e 1." },
    { prompt: "Como estender §x^2\\cos(1/x)§ continuamente em zero?", solution: "O módulo é limitado por §x^2§, então o limite vale zero. Defina §f(0)=0§." },
  ],
} satisfies StudyLesson;
