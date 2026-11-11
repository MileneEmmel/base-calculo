import type { StudyLesson } from "./studyBasics";

export const basicExpansions: Record<string, Pick<StudyLesson, "sections" | "checks">> = {
  "fracoes-e-numeros-decimais": {
    sections: [
      {
        title: "Ordene frações com sinal",
        paragraphs: [
          "Comece escrevendo as frações com denominador positivo. Em seguida, separe valores negativos, zero e positivos. Entre dois negativos, o de maior módulo fica mais à esquerda na reta. Isso evita inverter o resultado sem perceber.",
          "Quando comparar por produtos cruzados, multiplicar pelos denominadores positivos preserva a ordem. A comparação funciona também para numeradores negativos. Você pode conferir usando uma referência, como zero, meio ou uma unidade.",
        ],
        example: { title: "A maior magnitude pode dar o menor número", prompt: "Ordene §-\\frac23§, §-\\frac35§ e §\\frac16§.", steps: ["As duas primeiras são negativas e ficam antes de §1/6§.", "Passe a quinze avos: §-\\frac23=-\\frac{10}{15}§ e §-\\frac35=-\\frac9{15}§.", "Como §-10<-9§, a ordem é §-\\frac23<-\\frac35<\\frac16§."] },
      },
      {
        title: "Acompanhe os restos de uma divisão decimal",
        paragraphs: [
          "Quando a divisão não é exata, multiplique o resto por 10 para obter a próxima casa decimal. Se o resto chegar a zero, o decimal termina. Quando um resto reaparece, a partir dele se repetem os mesmos algarismos e restos.",
          "Como há uma quantidade finita de restos possíveis, a divisão de inteiros termina ou se torna periódica. Identificar o primeiro resto repetido mostra onde começa o período, mesmo quando existe uma parte inicial sem repetição.",
        ],
        example: { title: "Veja o período aparecer em sétimos", prompt: "Encontre o primeiro bloco que se repete em §2/7§.", steps: ["Comece com resto 2. Ao continuar a divisão, os três primeiros algarismos são 2, 8 e 5, com restos 6, 4 e 5.", "Depois vêm 7, 1 e 4, com restos 1, 3 e 2.", "O resto inicial reapareceu. Então §2/7=0{,}\\overline{285714}§."] },
        visual: { kind: "choices", caption: "Siga os restos para localizar onde a dízima começa a repetir.", options: [
          { label: "Primeira casa", result: "§20=7\\cdot2+6§", detail: "Escrevemos 2 e levamos o resto 6 à casa seguinte." },
          { label: "Segunda casa", result: "§60=7\\cdot8+4§", detail: "Escrevemos 8. O resto 4 ainda é novo." },
          { label: "Sexta casa", result: "§30=7\\cdot4+2§", detail: "O resto volta a 2. Daqui em diante, o bloco 285714 se repete." },
        ] },
      },
    ],
    checks: [
      { prompt: "Calcule §5/6-7/9§.", solution: "O denominador comum 18 dá §15/18-14/18=1/18§." },
      { prompt: "A fração reduzida §7/40§ gera decimal finito? Qual é ele?", solution: "Sim. §40=2^3\\cdot5§ e §7/40=175/1000=0{,}175§." },
    ],
  },
  "razao-proporcao-e-porcentagem": {
    sections: [
      {
        title: "Mantenha a referência ao comparar percentuais",
        paragraphs: [
          "Um percentual é sempre relativo a uma base. Ao comparar duas turmas, calcule a proporção dentro de cada turma antes de comparar. Ao juntar as turmas, recalcule a proporção pelos totais. Uma média simples dos percentuais só vale quando os grupos têm o mesmo tamanho.",
          "A mesma lógica serve para médias de acertos, taxas de ocupação ou rendimentos. Um grupo maior pesa mais no resultado conjunto. Escreva a fração de cada grupo e a fração geral para deixar explícito qual é o denominador.",
        ],
        example: { title: "Combine grupos de tamanhos diferentes", prompt: "Em uma turma, 12 de 20 estudantes acertaram. Em outra, 27 de 30 acertaram. Qual foi a taxa de acerto geral?", steps: ["As taxas das turmas são 60% e 90%.", "Some os acertos e os totais: §(12+27)/(20+30)=39/50§.", "A taxa geral é 78%. Ela fica mais próxima de 90% porque a segunda turma é maior."] },
      },
      {
        title: "Calcule a taxa que desfaz uma variação",
        paragraphs: [
          "Se um valor é multiplicado por m, desfazer a mudança exige multiplicar por §1/m§, desde que §m>0§. A taxa de recuperação costuma ter módulo diferente da taxa inicial. Isso acontece porque a segunda porcentagem usa um novo valor de referência.",
          "Você pode verificar escolhendo um valor inicial conveniente, como 100. Calcule o valor após a mudança e divida a diferença de volta ao inicial pela nova base. Esse método também permite identificar quando um problema usa uma porcentagem sobre o total ou sobre uma parcela.",
        ],
        example: { title: "Qual aumento desfaz um desconto de 20%?", prompt: "Um preço caiu de R$ 100 para R$ 80. Qual taxa de aumento o recupera?", steps: ["A diferença a recuperar é 20 reais.", "Use o preço atual como base: §20/80=1/4§.", "O aumento necessário é 25%. De fato, §80\\cdot1{,}25=100§."] },
      },
    ],
    checks: [
      { prompt: "Um valor aumenta 25% e depois cai 20%. Qual é a variação total?", solution: "Os fatores são §1{,}25§ e §0{,}80§. Seu produto vale 1, então a variação total é zero." },
      { prompt: "Após um acréscimo de 15%, o valor ficou em R$ 230. Qual era o valor inicial?", solution: "Divida pelo fator §1{,}15§: §230/1{,}15=200§ reais." },
    ],
  },
  "potenciacao-e-radiciacao": {
    sections: [
      {
        title: "Expoentes fracionários com bases não positivas",
        paragraphs: [
          "Para base positiva, toda potência de expoente racional tem uma interpretação real pela raiz. Para base negativa, quando definimos uma potência racional por raízes reais, escrevemos o expoente na forma irredutível. Um denominador ímpar permite extrair a raiz real negativa. Um denominador par não permite.",
          "Não use indiscriminadamente as leis de expoentes fracionários com bases negativas. Aplicar a regra de potência de potência fora das condições pode trocar o sinal ou criar uma expressão indefinida. Na base zero, expoentes positivos dão zero e expoentes negativos exigiriam divisão por zero.",
        ],
        example: { title: "Compare dois denominadores", prompt: "Calcule §(-8)^{2/3}§ e analise §(-8)^{1/2}§ nos reais.", steps: ["A raiz cúbica de −8 é −2. Elevando ao quadrado, resulta 4.", "A raiz quadrada de −8 não existe nos reais.", "A diferença vem da paridade do índice da raiz, não só do sinal da base."] },
      },
      {
        title: "Racionalize usando um fator que vale 1",
        paragraphs: [
          "Racionalizar é escrever uma fração equivalente sem radical no denominador. Quando o denominador é uma raiz quadrada não nula, multiplique em cima e embaixo pela mesma raiz. O produto das duas raízes vira o radicando.",
          "Quando o denominador é uma soma ou diferença, use seu conjugado. O produto de conjugados é uma diferença de quadrados. O fator escolhido deve ser não nulo para representar uma multiplicação por 1. Simplifique antes se a forma original já permite cancelar fatores.",
        ],
        example: { title: "Use o conjugado para eliminar uma raiz", prompt: "Racionalize §\\frac{2}{\\sqrt5-1}§.", steps: ["O conjugado do denominador é §\\sqrt5+1§, que é não nulo.", "Multiplique por §(\\sqrt5+1)/(\\sqrt5+1)§. O denominador vira §5-1=4§.", "Simplifique §\\frac{2(\\sqrt5+1)}4=\\frac{\\sqrt5+1}2§."] },
      },
    ],
    checks: [
      { prompt: "Calcule §27^{-2/3}§.", solution: "A raiz cúbica é 3, seu quadrado é 9 e o expoente negativo pede o inverso. O valor é §1/9§." },
      { prompt: "Racionalize §1/(\\sqrt3+1)§.", solution: "Multiplique pelo conjugado sobre ele mesmo e obtenha §(\\sqrt3-1)/(3-1)=(\\sqrt3-1)/2§." },
    ],
  },
  "expressoes-algebricas": {
    sections: [
      {
        title: "Leia grau e estrutura antes de calcular",
        paragraphs: [
          "Em um termo polinomial, o grau total é a soma dos expoentes das variáveis. Em §4x^2y§, por exemplo, os expoentes 2 e 1 dão grau 3. O grau de um polinômio não nulo é o maior grau dos termos que sobram depois de reduzir.",
          "O grau não informa sozinho quais termos podem ser somados. §x^2y§ e §xy^2§ têm o mesmo grau total, mas partes literais diferentes. Reduza apenas termos semelhantes e só depois identifique o grau da expressão final.",
        ],
        example: { title: "Um cancelamento pode reduzir o grau", prompt: "Simplifique §4x^2y+2xy^2-4x^2y-3y+1§ e determine o grau total.", steps: ["Os dois termos em §x^2y§ se cancelam.", "Resta §2xy^2-3y+1§. O termo §2xy^2§ tem grau 3.", "Os demais têm graus 1 e 0. Portanto, o grau total é 3."] },
      },
      {
        title: "Traduza uma situação em uma expressão",
        paragraphs: [
          "Escolha o que cada letra representa e anote a unidade. A frase “três a mais que o dobro de x” vira §2x+3§. Já “o dobro da soma de x com três” precisa ser escrito como §2(x+3)§. Reformular a frase ajuda a decidir onde entram os parênteses.",
          "Depois de escrever a fórmula, teste uma entrada que você consegue calcular mentalmente. Faça também uma verificação de unidades. A soma de comprimentos dá um comprimento, enquanto o produto de dois comprimentos pode dar uma área.",
        ],
        example: { title: "Do desenho à área", prompt: "Um retângulo tem largura x metros e comprimento 3 metros maior. Escreva perímetro e área.", steps: ["Os lados são §x§ e §x+3§, com §x>0§.", "O perímetro é §2x+2(x+3)=4x+6§ metros.", "A área é §x(x+3)=x^2+3x§ metros quadrados. Com largura 2, obtemos 14 m de perímetro e 10 m² de área."] },
      },
    ],
    checks: [
      { prompt: "Simplifique §2xy-4yx+3x§.", solution: "Como §yx=xy§, os dois primeiros termos dão §-2xy§. O resultado é §-2xy+3x§." },
      { prompt: "Qual é o domínio real de §\\sqrt{x-2}/(x-5)§?", solution: "A raiz exige §x\\ge2§ e o denominador exclui 5. O domínio é §[2,5)\\cup(5,\\infty)§." },
    ],
  },
  fatoracao: {
    sections: [
      {
        title: "Separe o termo central quando o primeiro coeficiente não é 1",
        paragraphs: [
          "Em §ax^2+bx+c§ com coeficientes inteiros, procure dois inteiros de soma b e produto ac. Se encontrar, reescreva o termo central como a soma dos dois termos correspondentes e tente fatorar por agrupamento.",
          "O método vem da distributividade. Em §(px+q)(rx+s)§, os termos cruzados têm coeficientes §ps§ e §qr§. A soma deles é b e o produto é §(pr)(qs)=ac§. Se não houver par inteiro, use as raízes reais para decidir se é possível fatorar nos reais.",
        ],
        example: { title: "Divida o termo do meio", prompt: "Fatore §6x^2+x-2§ por agrupamento.", steps: ["O produto ac é −12. O par 4 e −3 soma 1 e multiplica para −12.", "Escreva §6x^2+4x-3x-2=2x(3x+2)-(3x+2)§.", "Extraia o parêntese comum. O resultado é §(2x-1)(3x+2)§."] },
        visual: { kind: "choices", caption: "Confira as duas condições antes de dividir o termo central.", options: [
          { label: "2 e −6", result: "§2(-6)=-12§", detail: "O produto serve, mas a soma é −4." },
          { label: "4 e −3", result: "§4+(-3)=1§", detail: "O produto é −12 e a soma é 1. Separe x em §4x-3x§." },
          { label: "Ver agrupamento", result: "§2x(3x+2)-1(3x+2)§", detail: "O mesmo parêntese aparece nos dois grupos." },
        ] },
      },
      {
        title: "Reconheça soma e diferença de cubos",
        paragraphs: [
          "A diferença de cubos é §a^3-b^3=(a-b)(a^2+ab+b^2)§. A soma é §a^3+b^3=(a+b)(a^2-ab+b^2)§. A expansão mostra que os termos mistos se cancelam, por isso só restam os dois cubos.",
          "Não confunda soma de cubos com cubo da soma. A primeira tem dois termos antes de fatorar. A segunda, ao expandir, tem quatro. Para identificar a técnica, escreva cada parcela como cubo de sua base.",
        ],
        example: { title: "Fatore uma soma de cubos", prompt: "Fatore §8x^3+27§.", steps: ["As bases são §2x§ e 3.", "A soma de cubos dá §(2x+3)((2x)^2-(2x)3+3^2)§.", "O produto é §(2x+3)(4x^2-6x+9)§. Ao expandir, os termos em §x^2§ e x se cancelam."] },
      },
      {
        title: "Use substituição para revelar um trinômio",
        paragraphs: [
          "Quando os expoentes aparecem em múltiplos de um mesmo número, procure uma variável intermediária. Em §x^4+px^2+q§, escreva §u=x^2§ e fatore o trinômio §u^2+pu+q§. Depois substitua x de volta.",
          "Verifique se os fatores obtidos ainda se decompõem no conjunto pedido. Por exemplo, §x^2-4§ é diferença de quadrados nos reais. Já §x^2+4§ é positivo para todo real e não tem fatores lineares reais.",
        ],
        example: { title: "Um trinômio de quarto grau", prompt: "Fatore §x^4-5x^2+4§ nos reais.", steps: ["Com §u=x^2§, temos §u^2-5u+4=(u-1)(u-4)§.", "Volte para x: §(x^2-1)(x^2-4)§.", "Fatore os dois fatores: §(x-1)(x+1)(x-2)(x+2)§."] },
      },
    ],
    checks: [
      { prompt: "Fatore §3x^2-11x+6§.", solution: "Use −9 e −2, de soma −11 e produto 18. O agrupamento resulta em §(3x-2)(x-3)§." },
      { prompt: "Fatore §x^3-64§.", solution: "A diferença de cubos com bases x e 4 dá §(x-4)(x^2+4x+16)§." },
    ],
  },

  "equacoes-e-inequacoes": {
    sections: [
      {
        title: "Registre as restrições antes de cancelar",
        paragraphs: [
          "Numa equação com frações algébricas, anote primeiro quais valores zeram algum denominador. Esses valores ficam fora do domínio mesmo que, depois de simplificar, já não apareçam no denominador.",
          "Trabalhe com os valores permitidos. Neles, você pode multiplicar a equação inteira pelo denominador comum e resolver a equação resultante. Confira cada candidato na expressão original.",
        ],
        example: { title: "Um candidato que não pode ser usado", prompt: "Resolva §\\frac{x^2-4}{x-2}=4§.", steps: ["O denominador exige §x\\ne2§.", "Como §x^2-4=(x-2)(x+2)§, a equação se reduz a §x+2=4§ no domínio.", "O único candidato é 2, valor excluído. Logo, §S=\\varnothing§."] },
      },
      {
        title: "Complete o quadrado para resolver",
        paragraphs: [
          "Em §x^2+bx§, a expressão vira um quadrado perfeito se você acrescentar §(b/2)^2§: o termo do meio de §(x+b/2)^2§ é exatamente bx. Numa equação, acrescente o mesmo valor dos dois lados.",
          "Quando o coeficiente de §x^2§ é diferente de 1, você pode dividir a equação inteira por ele primeiro. Ao chegar a §u^2=k§, há duas possibilidades se §k>0§, uma se §k=0§ e nenhuma solução real se §k<0§.",
        ],
        example: { title: "Da equação à distância até um ponto", prompt: "Resolva §x^2-6x+5=0§ completando o quadrado.", steps: ["Escreva §x^2-6x=-5§ e some 9 nos dois lados.", "Fica §(x-3)^2=4§. A distância de x a 3 é 2.", "Então §x=3-2=1§ ou §x=3+2=5§."] },
      },
      {
        title: "Combine condições com interseção ou união",
        paragraphs: [
          "Quando duas condições precisam valer ao mesmo tempo, marque cada conjunto na reta e fique com a interseção. Numa desigualdade em cadeia, como §-2\\le 3x+1<7§, os dois lados precisam valer.",
          "Quando pelo menos uma condição basta, faça a união. Em ambos os casos, verifique separadamente se cada extremo entra: §\\le§ inclui a igualdade e §<§ não inclui.",
        ],
        example: { title: "Dois limites para a mesma expressão", prompt: "Resolva §-2\\le 3x+1<7§.", steps: ["Subtraia 1 dos três membros: §-3\\le3x<6§.", "Divida tudo por 3, que é positivo: §-1\\le x<2§.", "O intervalo é §[-1,2)§. Em §x=-1§, a expressão vale −2; em §x=2§, vale 7, que está excluído."] },
      },
    ],
    checks: [
      { prompt: "Resolva §\\frac{x+5}{x-1}=3§.", solution: "Exclua §x=1§. Multiplique por §x-1§: §x+5=3x-3§, logo §x=4§. Na equação original, §9/3=3§." },
      { prompt: "Resolva §-4<2-2x\\le8§.", solution: "Subtraia 2 e divida por −2, invertendo os sinais. Reordenando, §-3\\le x<3§." },
    ],
  },
  "sistemas-lineares": {
    sections: [
      {
        title: "Resolva uma incógnita de cada vez em três equações",
        paragraphs: [
          "Escolha uma incógnita que seja fácil eliminar, de preferência com coeficiente 1 ou −1. Use uma das equações como referência e combine-a com cada uma das outras. O objetivo é obter duas equações que dependam só das duas incógnitas restantes.",
          "Resolva o sistema reduzido, volte a uma equação original para achar a terceira incógnita e confira a solução nas três. Em problemas de contexto, verifique se ela faz sentido nas unidades pedidas.",
        ],
        example: { title: "De três incógnitas para duas", prompt: "Resolva §\\begin{cases}x+y+z=6\\\\ x-y+z=2\\\\ x+y-z=0\\end{cases}§.", steps: ["Subtraia a segunda da primeira: §2y=4§, logo §y=2§.", "Subtraia a terceira da primeira: §2z=6§, logo §z=3§.", "Na primeira, §x+2+3=6§, então §x=1§. A tripla §(1,2,3)§ também dá 2 na segunda e 0 na terceira."] },
      },
      {
        title: "Use os coeficientes para prever se a solução é única",
        paragraphs: [
          "Em §ax+by=e§ e §cx+dy=f§, supondo que cada equação descreva uma reta, calcule §D=ad-bc§. Se D é diferente de zero, as duas retas se cruzam uma única vez. O número D aparece ao eliminar uma variável: multiplicar a primeira por d e subtrair a segunda multiplicada por b dá §Dx=de-bf§.",
          "Se §D=0§, as duas retas têm a mesma direção. Faça a eliminação também nos termos independentes. Se sobrar uma contradição, são paralelas distintas; se sobrar §0=0§, são a mesma reta e há infinitas soluções.",
        ],
        example: { title: "Mesma direção, soluções diferentes", prompt: "Compare §x-2y=3§ com §2x-4y=6§ e depois com §2x-4y=5§.", steps: ["Os coeficientes da segunda reta são o dobro dos da primeira, então §D=0§ em ambos os casos.", "Com termo independente 6, subtrair duas vezes a primeira equação dá §0=0§: todas as soluções da primeira servem.", "Com termo independente 5, a mesma operação dá §0=-1§: não existe ponto comum."] },
      },
      {
        title: "Simplifique os coeficientes antes de resolver",
        paragraphs: [
          "Se uma equação tem frações, multiplique todos os seus termos, inclusive o lado direito, por um múltiplo comum dos denominadores. Isso dá uma equação equivalente porque multiplicar por um número não nulo pode ser desfeito.",
          "As equações podem ser simplificadas separadamente. Depois escolha substituição se for fácil isolar uma incógnita ou eliminação se algum par de coeficientes já for igual ou oposto.",
        ],
        example: { title: "Elimine as frações e depois as incógnitas", prompt: "Resolva §x/2+y/3=3§ e §x/2-y/3=1§.", steps: ["Multiplique cada equação por 6: §3x+2y=18§ e §3x-2y=6§.", "Some as duas: §6x=24§ e, portanto, §x=4§.", "Na primeira original, §2+y/3=3§, logo §y=3§. Na segunda, §2-1=1§ confirma o resultado."] },
      },
    ],
    checks: [
      { prompt: "Quantas soluções tem o sistema §2x+y=7§ e §-4x-2y=-14§?", solution: "A segunda é a primeira multiplicada por −2. São a mesma reta e há infinitas soluções: qualquer x com §y=7-2x§." },
      { prompt: "Resolva §x+y+z=9§, §x-y+z=5§ e §x+y-z=3§.", solution: "Subtraindo a segunda da primeira, §2y=4§. Subtraindo a terceira da primeira, §2z=6§. Da primeira, §x=4§. A tripla é §(4,2,3)§." },
    ],
  },
};
